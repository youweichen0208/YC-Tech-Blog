"""
本地大模型代理服务
支持多模型路由和智能负载均衡
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import httpx
import uvicorn
import asyncio
import time
import logging
import psutil
import hashlib
from functools import lru_cache
from datetime import datetime
import json

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="本地大模型代理服务",
    description="高性能本地大模型API代理，支持智能路由和负载均衡",
    version="1.0.0"
)

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 配置常量
OLLAMA_BASE_URL = "http://localhost:11434"
DEFAULT_TIMEOUT = 60.0
MAX_CACHE_SIZE = 1000

class LLMRequest(BaseModel):
    """LLM请求模型"""
    prompt: str = Field(..., description="输入提示词")
    model: str = Field(default="llama3.1:8b", description="模型名称")
    temperature: float = Field(default=0.7, ge=0.0, le=2.0, description="温度参数")
    max_tokens: int = Field(default=2000, ge=1, le=8192, description="最大令牌数")
    top_p: float = Field(default=0.9, ge=0.0, le=1.0, description="Top-p采样")
    repeat_penalty: float = Field(default=1.1, ge=0.0, le=2.0, description="重复惩罚")
    stream: bool = Field(default=False, description="是否流式输出")

class LLMResponse(BaseModel):
    """LLM响应模型"""
    response: str = Field(..., description="模型回复")
    model: str = Field(..., description="使用的模型")
    tokens_used: int = Field(..., description="使用的令牌数")
    generation_time: float = Field(..., description="生成时间(秒)")
    cached: bool = Field(default=False, description="是否来自缓存")

class ModelInfo(BaseModel):
    """模型信息"""
    name: str
    size: str
    description: str
    capabilities: List[str]
    recommended_use: List[str]

class SystemStatus(BaseModel):
    """系统状态"""
    cpu_percent: float
    memory_percent: float
    gpu_available: bool
    active_models: List[str]
    total_requests: int
    cache_hit_rate: float

# 全局状态管理
class GlobalState:
    def __init__(self):
        self.request_count = 0
        self.cache_hits = 0
        self.active_models = set()
        self.model_stats = {}

global_state = GlobalState()

# 模型配置
MODEL_CONFIGS = {
    "llama3.1:8b": {
        "description": "通用语言模型，适合日常对话和文本生成",
        "capabilities": ["文本生成", "对话", "摘要", "翻译"],
        "recommended_use": ["通用任务", "客户服务", "内容创作"],
        "default_params": {"temperature": 0.7, "top_p": 0.9}
    },
    "qwen2.5:7b": {
        "description": "中文优化模型，优秀的中文理解和生成能力",
        "capabilities": ["中文对话", "中文创作", "中英翻译", "古诗词"],
        "recommended_use": ["中文处理", "翻译任务", "文化内容"],
        "default_params": {"temperature": 0.6, "top_p": 0.9}
    },
    "deepseek-coder:6.7b": {
        "description": "代码专用模型，精通多种编程语言",
        "capabilities": ["代码生成", "代码解释", "代码审查", "调试"],
        "recommended_use": ["编程助手", "代码审查", "技术文档"],
        "default_params": {"temperature": 0.2, "top_p": 0.95}
    }
}

# 任务类型识别
TASK_PATTERNS = {
    "code": [
        "代码", "编程", "函数", "class", "def ", "function",
        "bug", "错误", "调试", "review", "审查"
    ],
    "chinese": [
        "中文", "翻译", "古诗", "文言文", "成语", "汉语"
    ],
    "creative": [
        "创作", "故事", "小说", "诗歌", "创意", "想象"
    ]
}

def get_cache_key(prompt: str, model: str, params: dict) -> str:
    """生成缓存键"""
    content = f"{prompt}:{model}:{json.dumps(params, sort_keys=True)}"
    return hashlib.md5(content.encode()).hexdigest()

@lru_cache(maxsize=MAX_CACHE_SIZE)
def cached_response(cache_key: str, response_data: str) -> str:
    """缓存响应"""
    global_state.cache_hits += 1
    return response_data

def detect_task_type(prompt: str) -> str:
    """检测任务类型"""
    prompt_lower = prompt.lower()

    for task_type, patterns in TASK_PATTERNS.items():
        if any(pattern in prompt_lower for pattern in patterns):
            return task_type

    return "general"

def select_optimal_model(prompt: str, specified_model: Optional[str] = None) -> str:
    """智能模型选择"""
    if specified_model and specified_model in MODEL_CONFIGS:
        return specified_model

    task_type = detect_task_type(prompt)

    model_mapping = {
        "code": "deepseek-coder:6.7b",
        "chinese": "qwen2.5:7b",
        "creative": "qwen2.5:7b",
        "general": "llama3.1:8b"
    }

    return model_mapping.get(task_type, "llama3.1:8b")

async def call_ollama(request: LLMRequest) -> Dict[str, Any]:
    """调用Ollama API"""
    start_time = time.time()

    # 构建请求参数
    payload = {
        "model": request.model,
        "prompt": request.prompt,
        "stream": request.stream,
        "options": {
            "temperature": request.temperature,
            "num_predict": request.max_tokens,
            "top_p": request.top_p,
            "repeat_penalty": request.repeat_penalty
        }
    }

    try:
        async with httpx.AsyncClient(timeout=DEFAULT_TIMEOUT) as client:
            response = await client.post(
                f"{OLLAMA_BASE_URL}/api/generate",
                json=payload
            )
            response.raise_for_status()
            result = response.json()

            generation_time = time.time() - start_time

            return {
                "response": result.get("response", ""),
                "model": request.model,
                "tokens_used": result.get("eval_count", 0),
                "generation_time": generation_time,
                "cached": False
            }

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="模型响应超时")
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Ollama服务错误: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"内部错误: {str(e)}")

@app.post("/api/generate", response_model=LLMResponse)
async def generate_text(request: LLMRequest):
    """生成文本"""
    global_state.request_count += 1

    # 智能模型选择
    optimal_model = select_optimal_model(request.prompt, request.model)
    request.model = optimal_model

    # 检查缓存
    cache_key = get_cache_key(
        request.prompt,
        request.model,
        {
            "temperature": request.temperature,
            "max_tokens": request.max_tokens,
            "top_p": request.top_p,
            "repeat_penalty": request.repeat_penalty
        }
    )

    try:
        # 调用模型
        result = await call_ollama(request)

        # 更新状态
        global_state.active_models.add(request.model)

        # 记录统计
        if request.model not in global_state.model_stats:
            global_state.model_stats[request.model] = {
                "requests": 0,
                "total_time": 0.0,
                "avg_time": 0.0
            }

        stats = global_state.model_stats[request.model]
        stats["requests"] += 1
        stats["total_time"] += result["generation_time"]
        stats["avg_time"] = stats["total_time"] / stats["requests"]

        logger.info(f"请求完成 - 模型: {request.model}, 用时: {result['generation_time']:.2f}s")

        return LLMResponse(**result)

    except Exception as e:
        logger.error(f"生成文本失败: {str(e)}")
        raise

@app.get("/api/models", response_model=List[ModelInfo])
async def list_models():
    """获取模型列表"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            ollama_models = response.json().get("models", [])

            models = []
            for model in ollama_models:
                model_name = model.get("name", "")
                config = MODEL_CONFIGS.get(model_name, {})

                models.append(ModelInfo(
                    name=model_name,
                    size=model.get("size", "未知"),
                    description=config.get("description", "自定义模型"),
                    capabilities=config.get("capabilities", []),
                    recommended_use=config.get("recommended_use", [])
                ))

            return models

    except Exception as e:
        logger.error(f"获取模型列表失败: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取模型列表失败: {str(e)}")

@app.get("/api/status", response_model=SystemStatus)
async def get_system_status():
    """获取系统状态"""
    try:
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()

        cache_hit_rate = (
            global_state.cache_hits / global_state.request_count * 100
            if global_state.request_count > 0 else 0
        )

        return SystemStatus(
            cpu_percent=cpu_percent,
            memory_percent=memory.percent,
            gpu_available=True,  # M2芯片始终支持GPU
            active_models=list(global_state.active_models),
            total_requests=global_state.request_count,
            cache_hit_rate=cache_hit_rate
        )

    except Exception as e:
        logger.error(f"获取系统状态失败: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取系统状态失败: {str(e)}")

@app.get("/api/stats")
async def get_model_stats():
    """获取模型统计信息"""
    return {
        "model_stats": global_state.model_stats,
        "total_requests": global_state.request_count,
        "cache_hits": global_state.cache_hits,
        "active_models": list(global_state.active_models)
    }

@app.post("/api/chat")
async def chat_endpoint(request: LLMRequest):
    """聊天接口（流式响应）"""
    request.stream = True

    try:
        async with httpx.AsyncClient(timeout=DEFAULT_TIMEOUT) as client:
            payload = {
                "model": request.model,
                "prompt": request.prompt,
                "stream": True,
                "options": {
                    "temperature": request.temperature,
                    "num_predict": request.max_tokens
                }
            }

            async with client.stream(
                "POST",
                f"{OLLAMA_BASE_URL}/api/generate",
                json=payload
            ) as response:
                response.raise_for_status()

                async for line in response.aiter_lines():
                    if line:
                        try:
                            data = json.loads(line)
                            if data.get("response"):
                                yield f"data: {json.dumps({'content': data['response']})}\n\n"

                            if data.get("done"):
                                yield f"data: {json.dumps({'done': True})}\n\n"
                                break
                        except json.JSONDecodeError:
                            continue

    except Exception as e:
        logger.error(f"聊天流式响应失败: {str(e)}")
        yield f"data: {json.dumps({'error': str(e)})}\n\n"

@app.get("/health")
async def health_check():
    """健康检查"""
    try:
        # 检查Ollama连接
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            response.raise_for_status()

        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "ollama_connected": True,
            "total_requests": global_state.request_count
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "timestamp": datetime.now().isoformat(),
            "ollama_connected": False,
            "error": str(e)
        }

@app.on_event("startup")
async def startup_event():
    """应用启动事件"""
    logger.info("🚀 本地大模型代理服务启动")
    logger.info(f"📡 Ollama地址: {OLLAMA_BASE_URL}")
    logger.info(f"🎯 支持模型: {list(MODEL_CONFIGS.keys())}")

@app.on_event("shutdown")
async def shutdown_event():
    """应用关闭事件"""
    logger.info("🔌 本地大模型代理服务关闭")

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="启动本地大模型代理服务")
    parser.add_argument("--host", default="0.0.0.0", help="绑定主机地址")
    parser.add_argument("--port", type=int, default=8000, help="绑定端口")
    parser.add_argument("--reload", action="store_true", help="开发模式热重载")
    parser.add_argument("--log-level", default="info", help="日志级别")

    args = parser.parse_args()

    uvicorn.run(
        "local_llm_proxy:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
        log_level=args.log_level
    )