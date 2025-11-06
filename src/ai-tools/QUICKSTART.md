# 🚀 本地大模型系统快速开始指南

这是一个5分钟快速上手指南，帮助你在Mac M2上快速部署本地大模型系统。

## 📋 前置要求

- Mac M2/M3 芯片（推荐）
- macOS 12.0 或更高版本
- 8GB+ 内存（推荐16GB+）
- 20GB+ 可用存储空间

## ⚡ 一键部署

### 方式1: 脚本自动部署（推荐）

```bash
# 1. 下载部署脚本
curl -O https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/setup-local-llm.sh

# 2. 给执行权限
chmod +x setup-local-llm.sh

# 3. 一键部署
./setup-local-llm.sh install
```

### 方式2: 手动部署

```bash
# 1. 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 2. 启动 Ollama
ollama serve &

# 3. 下载模型
ollama pull llama3.1:8b
ollama pull qwen2.5:7b

# 4. 安装 Python 依赖
pip install fastapi uvicorn httpx pydantic psutil

# 5. 下载代理服务
curl -O https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/local_llm_proxy.py

# 6. 启动代理服务
python local_llm_proxy.py
```

## 🧪 快速测试

部署完成后，可以进行以下测试：

### 1. 健康检查
```bash
curl http://localhost:8000/health
```

期望输出：
```json
{
  "status": "healthy",
  "timestamp": "2024-10-28T10:30:00",
  "ollama_connected": true,
  "total_requests": 0
}
```

### 2. 文本生成测试
```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "你好，请介绍一下你自己",
    "model": "qwen2.5:7b",
    "temperature": 0.7,
    "max_tokens": 100
  }'
```

### 3. 代码审查测试
```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "请审查以下Python代码：\ndef hello():\n    print(\"Hello World\")",
    "model": "deepseek-coder:6.7b",
    "temperature": 0.3
  }'
```

## 🔧 基础使用

### Python集成示例

```python
import httpx
import asyncio

async def call_local_llm(prompt, model="llama3.1:8b"):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8000/api/generate",
            json={
                "prompt": prompt,
                "model": model,
                "temperature": 0.7,
                "max_tokens": 500
            }
        )
        return response.json()

# 使用示例
async def main():
    result = await call_local_llm("写一个Python的快速排序算法")
    print(result["response"])

asyncio.run(main())
```

### curl命令示例

```bash
# 中文对话
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "解释什么是机器学习", "model": "qwen2.5:7b"}'

# 代码生成
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "写一个JavaScript的冒泡排序", "model": "deepseek-coder:6.7b"}'

# 文本翻译
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "翻译成英文：今天天气很好", "model": "qwen2.5:7b"}'
```

## 📊 监控面板

访问以下地址查看系统状态：

- **API文档**: http://localhost:8000/docs
- **系统状态**: http://localhost:8000/api/status
- **模型列表**: http://localhost:8000/api/models

## 🎛️ 常用管理命令

```bash
# 查看运行状态
./setup-local-llm.sh monitor

# 启动服务
./setup-local-llm.sh start

# 停止服务
./setup-local-llm.sh stop

# 运行测试
./setup-local-llm.sh test

# 清理系统
./setup-local-llm.sh clean
```

## 🔄 切换模型

系统支持智能模型路由，也可以手动指定：

```bash
# 使用 Llama 3.1（通用任务）
curl -X POST http://localhost:8000/api/generate \
  -d '{"prompt": "你好", "model": "llama3.1:8b"}'

# 使用 Qwen 2.5（中文优化）
curl -X POST http://localhost:8000/api/generate \
  -d '{"prompt": "写一首古诗", "model": "qwen2.5:7b"}'

# 使用 DeepSeek Coder（代码专用）
curl -X POST http://localhost:8000/api/generate \
  -d '{"prompt": "解释这段代码", "model": "deepseek-coder:6.7b"}'
```

## ⚠️ 常见问题

### 1. 端口被占用
```bash
# 查看端口占用
lsof -i :11434
lsof -i :8000

# 更改端口
python local_llm_proxy.py --port 8001
```

### 2. 内存不足
```bash
# 使用量化模型
ollama pull llama3.1:8b-q4_0

# 减少并发数
export OLLAMA_NUM_PARALLEL=1
```

### 3. 响应慢
```bash
# 检查GPU使用
system_profiler SPDisplaysDataType

# 优化设置
export OLLAMA_GPU_LAYERS=99
```

## 📈 性能调优

### 内存优化
```bash
# 8GB 内存配置
export OLLAMA_MAX_LOADED_MODELS=1
ollama pull llama3.1:8b-q4_0

# 16GB 内存配置
export OLLAMA_MAX_LOADED_MODELS=2
ollama pull llama3.1:8b
ollama pull qwen2.5:7b

# 24GB+ 内存配置
export OLLAMA_MAX_LOADED_MODELS=3
ollama pull llama3.1:8b
ollama pull qwen2.5:14b
ollama pull deepseek-coder:6.7b
```

### 并发优化
```bash
# 根据CPU核心数调整
export OLLAMA_NUM_PARALLEL=2  # M2 推荐值
export OLLAMA_NUM_PARALLEL=4  # M2 Pro/Max 推荐值
```

## 🔗 下一步

1. **集成到现有项目**: 查看 [Claude Tools集成指南](./claude_tools_integration.py)
2. **Docker部署**: 使用 [docker-compose.yml](./docker-compose.yml) 进行容器化部署
3. **生产环境**: 参考 [完整架构文档](./LOCAL_LLM_ARCHITECTURE.md)
4. **监控运维**: 配置 Prometheus + Grafana 监控

## 💡 使用建议

1. **任务分配**：复杂推理使用Claude API，简单任务使用本地模型
2. **模型选择**：代码相关用DeepSeek，中文任务用Qwen，其他用Llama
3. **参数调优**：代码生成用低temperature(0.1-0.3)，创意写作用高temperature(0.7-0.9)
4. **批量处理**：使用本地模型处理大量重复性任务，节省API费用

---

🎉 **恭喜！你已经成功部署了本地大模型系统！**

现在可以享受高性能、低成本、隐私安全的AI工具链了。