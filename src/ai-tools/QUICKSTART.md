# 🐳 Claude Tools + 本地大模型 Docker 快速部署指南

这是一个**5分钟快速部署指南**，帮助你通过 Docker 容器化方式部署 Claude Tools 与本地大模型集成系统。

## 📋 前置要求

### 系统要求
- **Docker Desktop** 4.20+
- **内存**: 8GB+（推荐16GB+）
- **存储**: 20GB+ 可用空间
- **平台**: Mac M1/M2、Linux x86_64、Windows WSL2

### Docker 环境检查
```bash
# 检查 Docker 版本
docker --version
docker compose version

# 检查系统资源
docker system df
docker system info | grep "Total Memory"
```

## ⚡ 一键 Docker 部署

### 方式1: 使用预构建镜像（推荐）

```bash
# 1. 下载配置文件
curl -O https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/docker-compose.yml

# 2. 一键启动 AI 工具链
docker compose up -d

# 3. 查看启动状态
docker compose ps
```

### 方式2: 从源码构建

```bash
# 1. 克隆项目
git clone https://github.com/youweichen0208/YC-Tech-Blog.git
cd YC-Tech-Blog/src/ai-tools/code

# 2. 构建并启动
docker compose up -d --build

# 3. 等待模型下载完成
docker compose logs -f ollama
```

## 📊 部署验证

### 1. 服务健康检查
```bash
# 检查所有容器状态
docker compose ps

# 验证 API 服务
curl http://localhost:8000/health

# 期望输出
{
  "status": "healthy",
  "claude_tools_ready": true,
  "ollama_connected": true,
  "models_loaded": ["llama3.1:8b", "qwen2.5:7b"]
}
```

### 2. Claude Tools 集成测试
```bash
# 测试代码审查工具
curl -X POST http://localhost:8000/claude-tools/code-review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "def hello():\n    print(\"Hello World\")",
    "language": "python"
  }'

# 测试翻译工具
curl -X POST http://localhost:8000/claude-tools/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, how are you?",
    "target_lang": "chinese"
  }'
```

### 3. 模型直接调用测试
```bash
# 测试智能路由
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "写一个Python快速排序算法",
    "task_type": "code",
    "temperature": 0.2
  }'
```

## 🤖 Claude Tools 集成使用

### 在 Claude Code 中使用本地大模型

```typescript
// Claude Tools 配置
const localLLMTool = {
  name: "local_llm",
  description: "调用本地Docker部署的大模型",
  endpoint: "http://localhost:8000",
  timeout: 30000
};

// 代码审查示例
const reviewResult = await callLocalLLM({
  tool: "code_review",
  code: `
    def fibonacci(n):
        if n <= 1:
            return n
        return fibonacci(n-1) + fibonacci(n-2)
  `,
  language: "python",
  focus: ["performance", "security"]
});

// 翻译助手示例
const translation = await callLocalLLM({
  tool: "translate",
  text: "Machine Learning is transforming the world",
  target: "chinese"
});

// 技术文档生成
const documentation = await callLocalLLM({
  tool: "document",
  code: functionCode,
  style: "detailed",
  format: "markdown"
});
```

### Docker 容器管理

```bash
# 查看容器状态
docker compose ps

# 查看日志
docker compose logs local-llm-proxy
docker compose logs ollama

# 重启服务
docker compose restart local-llm-proxy

# 更新模型
docker compose exec ollama ollama pull qwen2.5:14b

# 扩容服务（如需要）
docker compose up -d --scale local-llm-proxy=3
```

## 📊 监控与管理

### 访问监控面板
- **API 文档**: http://localhost:8000/docs
- **Prometheus 监控**: http://localhost:9090
- **Grafana 仪表板**: http://localhost:3000 (admin/admin)
- **容器状态**: `docker compose ps`

### 性能调优配置
```bash
# 优化内存使用
export OLLAMA_NUM_PARALLEL=2
export OLLAMA_MAX_LOADED_MODELS=2

# 优化并发处理
export PROXY_WORKERS=4
export PROXY_MAX_REQUESTS=100

# 重新启动以应用配置
docker compose down && docker compose up -d
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