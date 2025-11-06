"""
Claude Tools 本地大模型集成工具
为 Claude Code 提供本地大模型调用能力
"""

import asyncio
import json
from typing import Dict, Any, Optional, List
import httpx
from dataclasses import dataclass
from enum import Enum


class TaskType(Enum):
    """任务类型枚举"""
    CODE_REVIEW = "code_review"
    TRANSLATION = "translation"
    SUMMARIZATION = "summarization"
    QUESTION_ANSWER = "question_answer"
    CREATIVE_WRITING = "creative_writing"
    DATA_EXTRACTION = "data_extraction"
    GENERAL = "general"


class ModelType(Enum):
    """模型类型枚举"""
    LLAMA = "llama3.1:8b"
    QWEN = "qwen2.5:7b"
    DEEPSEEK_CODER = "deepseek-coder:6.7b"


@dataclass
class LocalLLMConfig:
    """本地大模型配置"""
    base_url: str = "http://localhost:8000"
    timeout: float = 60.0
    max_retries: int = 3
    default_model: str = ModelType.LLAMA.value
    temperature: float = 0.7
    max_tokens: int = 2000


class LocalLLMClient:
    """本地大模型客户端"""

    def __init__(self, config: Optional[LocalLLMConfig] = None):
        self.config = config or LocalLLMConfig()
        self.client = httpx.AsyncClient(timeout=self.config.timeout)

        # 任务类型到模型的映射
        self.task_model_mapping = {
            TaskType.CODE_REVIEW: ModelType.DEEPSEEK_CODER.value,
            TaskType.TRANSLATION: ModelType.QWEN.value,
            TaskType.SUMMARIZATION: ModelType.LLAMA.value,
            TaskType.QUESTION_ANSWER: ModelType.QWEN.value,
            TaskType.CREATIVE_WRITING: ModelType.QWEN.value,
            TaskType.DATA_EXTRACTION: ModelType.LLAMA.value,
            TaskType.GENERAL: ModelType.LLAMA.value,
        }

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.client.aclose()

    async def generate(
        self,
        prompt: str,
        task_type: TaskType = TaskType.GENERAL,
        model: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> Dict[str, Any]:
        """
        生成文本

        Args:
            prompt: 输入提示词
            task_type: 任务类型
            model: 指定模型（可选）
            temperature: 温度参数（可选）
            max_tokens: 最大令牌数（可选）
            **kwargs: 其他参数

        Returns:
            生成结果字典
        """
        # 选择最适合的模型
        selected_model = model or self.task_model_mapping[task_type]

        # 构建请求参数
        request_data = {
            "prompt": prompt,
            "model": selected_model,
            "temperature": temperature or self.config.temperature,
            "max_tokens": max_tokens or self.config.max_tokens,
            **kwargs
        }

        # 发送请求
        for attempt in range(self.config.max_retries):
            try:
                response = await self.client.post(
                    f"{self.config.base_url}/api/generate",
                    json=request_data
                )
                response.raise_for_status()
                return response.json()

            except httpx.HTTPError as e:
                if attempt == self.config.max_retries - 1:
                    raise Exception(f"请求失败: {str(e)}")
                await asyncio.sleep(2 ** attempt)  # 指数退避

    async def chat(
        self,
        messages: List[Dict[str, str]],
        task_type: TaskType = TaskType.GENERAL,
        **kwargs
    ) -> Dict[str, Any]:
        """
        多轮对话

        Args:
            messages: 对话消息列表
            task_type: 任务类型
            **kwargs: 其他参数

        Returns:
            对话结果
        """
        # 将消息列表转换为单个prompt
        prompt = self._format_messages(messages)
        return await self.generate(prompt, task_type, **kwargs)

    def _format_messages(self, messages: List[Dict[str, str]]) -> str:
        """格式化对话消息"""
        formatted = []
        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")

            if role == "system":
                formatted.append(f"System: {content}")
            elif role == "user":
                formatted.append(f"User: {content}")
            elif role == "assistant":
                formatted.append(f"Assistant: {content}")

        return "\n".join(formatted) + "\nAssistant:"

    async def get_models(self) -> List[Dict[str, Any]]:
        """获取可用模型列表"""
        try:
            response = await self.client.get(f"{self.config.base_url}/api/models")
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise Exception(f"获取模型列表失败: {str(e)}")

    async def get_status(self) -> Dict[str, Any]:
        """获取系统状态"""
        try:
            response = await self.client.get(f"{self.config.base_url}/api/status")
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise Exception(f"获取系统状态失败: {str(e)}")

    async def health_check(self) -> bool:
        """健康检查"""
        try:
            response = await self.client.get(f"{self.config.base_url}/health")
            return response.status_code == 200
        except:
            return False


class ClaudeToolsIntegration:
    """Claude Tools 集成类"""

    def __init__(self, llm_client: LocalLLMClient):
        self.llm_client = llm_client

    async def code_review_tool(
        self,
        code: str,
        language: str = "python",
        focus_areas: Optional[List[str]] = None
    ) -> str:
        """
        代码审查工具

        Args:
            code: 要审查的代码
            language: 编程语言
            focus_areas: 重点关注领域

        Returns:
            审查结果
        """
        focus_text = ""
        if focus_areas:
            focus_text = f"重点关注: {', '.join(focus_areas)}\n"

        prompt = f"""请对以下{language}代码进行详细审查：

{focus_text}
代码：
```{language}
{code}
```

请从以下方面进行分析：
1. 代码安全性
2. 性能优化建议
3. 代码规范性
4. 潜在bug
5. 可维护性

请提供具体的改进建议。"""

        result = await self.llm_client.generate(
            prompt=prompt,
            task_type=TaskType.CODE_REVIEW,
            temperature=0.3
        )

        return result.get("response", "")

    async def translation_tool(
        self,
        text: str,
        source_lang: str = "auto",
        target_lang: str = "english"
    ) -> str:
        """
        翻译工具

        Args:
            text: 要翻译的文本
            source_lang: 源语言
            target_lang: 目标语言

        Returns:
            翻译结果
        """
        prompt = f"""请将以下文本从{source_lang}翻译成{target_lang}：

原文：
{text}

要求：
1. 保持原文的语义和语调
2. 使用地道的表达
3. 如果有专业术语，请保持准确性
4. 只返回翻译结果，不要添加解释

翻译："""

        result = await self.llm_client.generate(
            prompt=prompt,
            task_type=TaskType.TRANSLATION,
            temperature=0.3
        )

        return result.get("response", "")

    async def summarization_tool(
        self,
        text: str,
        summary_type: str = "brief",
        max_length: int = 200
    ) -> str:
        """
        文本摘要工具

        Args:
            text: 要摘要的文本
            summary_type: 摘要类型（brief, detailed, bullet_points）
            max_length: 最大长度

        Returns:
            摘要结果
        """
        type_instructions = {
            "brief": "提供简洁的摘要",
            "detailed": "提供详细的摘要",
            "bullet_points": "使用要点形式总结"
        }

        instruction = type_instructions.get(summary_type, "提供摘要")

        prompt = f"""请对以下文本进行摘要：

文本：
{text}

要求：
1. {instruction}
2. 控制在{max_length}字以内
3. 保留关键信息
4. 使用清晰的语言

摘要："""

        result = await self.llm_client.generate(
            prompt=prompt,
            task_type=TaskType.SUMMARIZATION,
            temperature=0.5,
            max_tokens=max_length * 2
        )

        return result.get("response", "")

    async def qa_tool(
        self,
        question: str,
        context: Optional[str] = None,
        language: str = "chinese"
    ) -> str:
        """
        问答工具

        Args:
            question: 问题
            context: 上下文信息
            language: 回答语言

        Returns:
            答案
        """
        context_text = f"\n\n上下文信息：\n{context}" if context else ""

        prompt = f"""请回答以下问题，使用{language}回答：

问题：{question}{context_text}

要求：
1. 回答要准确、详细
2. 如果不确定，请说明
3. 提供实用的建议或信息
4. 使用清晰的语言组织

回答："""

        result = await self.llm_client.generate(
            prompt=prompt,
            task_type=TaskType.QUESTION_ANSWER,
            temperature=0.6
        )

        return result.get("response", "")

    async def data_extraction_tool(
        self,
        text: str,
        extraction_fields: List[str],
        output_format: str = "json"
    ) -> str:
        """
        数据提取工具

        Args:
            text: 源文本
            extraction_fields: 要提取的字段
            output_format: 输出格式

        Returns:
            提取结果
        """
        fields_text = "、".join(extraction_fields)

        prompt = f"""请从以下文本中提取指定信息：

文本：
{text}

需要提取的字段：{fields_text}

要求：
1. 以{output_format}格式输出
2. 如果某个字段没有找到，标记为null
3. 保持数据的准确性
4. 只返回提取结果，不要添加解释

提取结果："""

        result = await self.llm_client.generate(
            prompt=prompt,
            task_type=TaskType.DATA_EXTRACTION,
            temperature=0.2
        )

        return result.get("response", "")


# 使用示例和工具函数
async def create_local_llm_tool(config: Optional[LocalLLMConfig] = None):
    """创建本地大模型工具实例"""
    client = LocalLLMClient(config)
    return ClaudeToolsIntegration(client)


# 便捷函数
async def local_code_review(code: str, language: str = "python") -> str:
    """便捷的代码审查函数"""
    async with LocalLLMClient() as client:
        integration = ClaudeToolsIntegration(client)
        return await integration.code_review_tool(code, language)


async def local_translate(text: str, target_lang: str = "english") -> str:
    """便捷的翻译函数"""
    async with LocalLLMClient() as client:
        integration = ClaudeToolsIntegration(client)
        return await integration.translation_tool(text, target_lang=target_lang)


async def local_summarize(text: str, max_length: int = 200) -> str:
    """便捷的摘要函数"""
    async with LocalLLMClient() as client:
        integration = ClaudeToolsIntegration(client)
        return await integration.summarization_tool(text, max_length=max_length)


async def local_qa(question: str, context: Optional[str] = None) -> str:
    """便捷的问答函数"""
    async with LocalLLMClient() as client:
        integration = ClaudeToolsIntegration(client)
        return await integration.qa_tool(question, context)


# 测试和示例代码
async def test_integration():
    """测试集成功能"""
    print("🧪 测试本地大模型集成...")

    config = LocalLLMConfig(base_url="http://localhost:8000")

    async with LocalLLMClient(config) as client:
        # 健康检查
        if not await client.health_check():
            print("❌ 服务未运行，请先启动本地大模型服务")
            return

        print("✅ 服务连接正常")

        integration = ClaudeToolsIntegration(client)

        # 测试代码审查
        test_code = """
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
"""

        print("\n📝 测试代码审查...")
        review_result = await integration.code_review_tool(test_code, "python")
        print(f"审查结果：{review_result[:200]}...")

        # 测试翻译
        print("\n🌐 测试翻译功能...")
        translation_result = await integration.translation_tool(
            "Hello, how are you today?",
            target_lang="chinese"
        )
        print(f"翻译结果：{translation_result}")

        # 测试问答
        print("\n❓ 测试问答功能...")
        qa_result = await integration.qa_tool("什么是机器学习？")
        print(f"问答结果：{qa_result[:200]}...")

        print("\n🎉 所有测试完成！")


if __name__ == "__main__":
    # 运行测试
    asyncio.run(test_integration())