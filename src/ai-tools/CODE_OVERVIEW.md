# 💻 核心代码总览

本页面提供Claude Tools + 本地大模型系统的核心代码文件链接和说明。

## 🚀 核心服务代码

### 1. 本地大模型代理服务
**文件**: `local_llm_proxy.py`

高性能FastAPI代理服务，提供Claude Tools与本地大模型的桥接功能。

**核心功能**：
- 智能任务路由
- 多模型管理
- 请求缓存优化
- 健康检查和监控
- Claude Tools专用接口

**关键特性**：
```python
# 智能模型选择
def select_optimal_model(prompt: str) -> str:
    task_type = detect_task_type(prompt)
    model_mapping = {
        "code": "deepseek-coder:6.7b",
        "chinese": "qwen2.5:7b",
        "general": "llama3.1:8b"
    }
    return model_mapping.get(task_type, "llama3.1:8b")
```

### 2. Claude Tools 集成层
**文件**: `claude_tools_integration.py`

专门为Claude Tools设计的集成适配器，提供无缝的工具调用体验。

**集成工具**：
- 代码审查工具
- 翻译助手
- 文档生成器
- 创意写作助手
- 数据提取工具

**使用示例**：
```python
# Claude Tools调用本地模型
async def code_review_tool(code: str, language: str):
    result = await integration.code_review_tool(
        code=code,
        language=language,
        focus_areas=["security", "performance"]
    )
    return result
```

## 🛠️ 部署和配置

### 3. 一键部署脚本
**文件**: `setup-local-llm.sh`

智能部署脚本，自动检测系统环境并配置最优设置。

**功能特性**：
- 系统环境检测
- 自动依赖安装
- 模型智能选择
- 性能优化配置
- 健康检查验证

### 4. Docker 容器化配置
**文件**: `docker-compose.yml`

企业级Docker部署配置，支持完整的监控和扩容。

**服务组件**：
- `claude-local-llm-proxy`: 代理服务容器
- `claude-ollama`: 模型运行时容器
- `claude-redis`: 缓存服务容器
- `claude-prometheus`: 监控服务容器
- `claude-grafana`: 可视化仪表板容器

### 5. Python 环境配置
**文件**: `requirements.txt`

精心选择的Python依赖包，确保最佳性能和稳定性。

**核心依赖**：
```
fastapi==0.104.1          # 高性能Web框架
uvicorn[standard]==0.24.0 # ASGI服务器
httpx==0.25.2             # 异步HTTP客户端
pydantic==2.5.0           # 数据验证
psutil==5.9.6             # 系统监控
```

### 6. 容器镜像配置
**文件**: `Dockerfile`

多阶段构建的Docker镜像，优化大小和安全性。

**构建特性**：
- 多阶段构建减少镜像大小
- 非root用户运行提升安全性
- 健康检查和依赖等待
- 开发和生产双模式支持

## 📋 代码文件下载

你可以直接从GitHub仓库下载这些文件：

### 一键下载命令

```bash
# 下载所有核心文件
git clone https://github.com/youweichen0208/YC-Tech-Blog.git
cd YC-Tech-Blog/src/ai-tools/code

# 或者单独下载文件
curl -O https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/local_llm_proxy.py
curl -O https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/claude_tools_integration.py
curl -O https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/docker-compose.yml
curl -O https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/requirements.txt
curl -O https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/Dockerfile
```

### 文件结构

```
ai-tools/code/
├── local_llm_proxy.py           # 主服务文件
├── claude_tools_integration.py  # Claude Tools集成
├── docker-compose.yml           # Docker编排配置
├── Dockerfile                   # 容器镜像定义
├── requirements.txt             # Python依赖
├── setup-local-llm.sh          # 部署脚本
└── scripts/
    └── init-models.sh           # 模型初始化脚本
```

## 🔧 快速开始

### 1. Docker 一键部署
```bash
# 下载配置文件
curl -O https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/docker-compose.yml

# 启动服务
docker compose up -d

# 验证部署
curl http://localhost:8000/health
```

### 2. 开发环境设置
```bash
# 克隆代码
git clone https://github.com/youweichen0208/YC-Tech-Blog.git
cd YC-Tech-Blog/src/ai-tools/code

# 安装依赖
pip install -r requirements.txt

# 启动开发服务
python local_llm_proxy.py --reload
```

## 📚 相关文档

- [🏗️ 完整架构设计](LOCAL_LLM_ARCHITECTURE.md)
- [⚡ 快速部署指南](QUICKSTART.md)
- [🐳 Docker部署详解](DOCKER_DEPLOYMENT.md)

## 🤝 贡献代码

欢迎提交PR和建议！

- 📧 **邮箱**: youweichen0208@gmail.com
- 🐛 **问题反馈**: [GitHub Issues](https://github.com/youweichen0208/YC-Tech-Blog/issues)
- 💡 **功能建议**: [GitHub Discussions](https://github.com/youweichen0208/YC-Tech-Blog/discussions)

---

*所有代码均采用MIT开源协议，欢迎自由使用和修改。*