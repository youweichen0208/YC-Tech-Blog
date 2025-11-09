---
title: Claude CLI + LiteLLM + 本地大模型集成指南
icon: rocket
order: 3
---

# Claude CLI + LiteLLM + 本地大模型集成指南

## 📖 概述

本指南介绍如何使用 **LiteLLM** 作为统一代理层，让 **Claude CLI** 能够调用本地部署的开源大模型，实现：

- ✅ 统一 API 接口（OpenAI/Anthropic 格式）
- ✅ 多模型路由和负载均衡
- ✅ 成本跟踪和监控
- ✅ 流式响应支持
- ✅ Claude CLI 无缝集成

## 🏗️ 架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                       Claude CLI                             │
│  (通过 ANTHROPIC_BASE_URL 指向 LiteLLM 代理)                 │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP API
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                     LiteLLM 代理层                           │
│  • 统一 API 格式转换                                         │
│  • 智能路由和负载均衡                                        │
│  • 成本跟踪和监控                                            │
│  • 流式响应处理                                              │
└──────┬──────────────┬──────────────┬──────────────┬─────────┘
       │              │              │              │
       ↓              ↓              ↓              ↓
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  Ollama  │  │  vLLM    │  │  Claude  │  │ OpenAI   │
│  (本地)  │  │  (本地)  │  │  (官方)  │  │  (官方)  │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

## 💻 算力平台选择

在部署本地大模型之前，需要选择合适的算力平台。以下是主流算力平台对比：

### 平台兼容性对比

| 算力平台 | Ollama | vLLM | 推理性能 | 推荐场景 |
|---------|--------|------|---------|---------|
| 🎮 **英伟达 GPU** | ✅ 完美支持 | ✅ 完美支持 | ⭐⭐⭐⭐⭐ | 🏆 首选方案 |
| 🇨🇳 **华为升腾 NPU** | ❌ 不支持 | ⚠️ 部分支持 | ⭐⭐⭐⭐ | 国产化需求 |
| 🍎 **Apple Silicon (M1/M2/M3)** | ✅ 原生支持 | ❌ 不支持 | ⭐⭐⭐ | 个人开发 |
| 🔴 **AMD GPU (ROCm)** | ⚠️ 需编译 | ⚠️ 需编译 | ⭐⭐⭐ | AMD 设备 |
| ⚡ **Intel GPU (oneAPI)** | ❌ 实验性 | ❌ 实验性 | ⭐⭐ | Intel Arc |
| 🖥️ **CPU (纯CPU)** | ✅ 支持 | ✅ 支持 | ⭐ | 测试环境 |

### 1. 英伟达 GPU 部署 🎮 (推荐)

**硬件要求：**
- GPU 显存：≥ 16GB (推荐 24GB+)
- 推荐型号：RTX 4090 / A100 / A6000 / V100

**云服务器推荐：**
- 阿里云 GPU 云服务器 (ecs.gn7i-c8g1.2xlarge)
- 腾讯云 GPU 云服务器 (GN10Xp)
- AWS EC2 (p3.2xlarge / g5.xlarge)
- Google Cloud Compute Engine (n1-standard-8 + T4)

**部署步骤：**

```bash
# 1. 验证 NVIDIA 驱动
nvidia-smi

# 2. 安装 CUDA Toolkit (如未安装)
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/3bf863cc.pub
sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/ /"
sudo apt-get update
sudo apt-get install cuda-12-2

# 3. 安装 Ollama (自动使用 CUDA)
curl -fsSL https://ollama.com/install.sh | sh

# 4. 下载模型
ollama pull qwen2.5:7b       # 需要 ~5GB 显存
ollama pull deepseek-coder:6.7b  # 需要 ~4GB 显存
ollama pull llama3.1:8b      # 需要 ~5GB 显存

# 5. 验证 GPU 加速
ollama run qwen2.5:7b "测试GPU加速"
# 使用 nvidia-smi 观察 GPU 使用率
watch -n 1 nvidia-smi
```

**性能基准（英伟达 RTX 4090）：**
- Qwen2.5 7B: ~80-100 tokens/s
- DeepSeek-Coder 6.7B: ~90-110 tokens/s
- Llama 3.1 8B: ~75-95 tokens/s

### 2. 华为升腾 NPU 部署 🇨🇳

**硬件要求：**
- 升腾 310P / 910B
- 驱动版本：CANN 7.0+

**云服务器推荐：**
- 华为云耀云服务器 L 实例 (ai1s.xlarge)
- 华为云 ECS 通用计算增强型 (c7.xlarge.2)

**部署步骤（vLLM）：**

```bash
# 1. 安装 CANN 驱动和固件
# 参考华为官方文档：https://www.hiascend.com/document

# 2. 验证 NPU 状态
npu-smi info

# 3. 安装支持升腾的 vLLM (需要特殊编译版本)
pip install vllm-ascend  # 华为提供的适配版本

# 4. 启动 vLLM 服务
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-7B-Instruct \
  --device ascend \
  --tensor-parallel-size 1 \
  --port 8001

# 5. 配置 LiteLLM 连接 vLLM
# 见后续配置章节
```

**⚠️ 注意事项：**
- Ollama 目前不支持华为升腾
- vLLM 需要使用华为官方适配版本
- 部分模型可能需要转换格式（ONNX → OM）
- 性能约为同级别英伟达 GPU 的 70-80%

### 3. Apple Silicon 部署 🍎 (个人开发)

**硬件要求：**
- M1/M2/M3 系列芯片
- 统一内存：≥ 16GB (推荐 32GB+)

**部署步骤：**

```bash
# 1. 安装 Ollama (原生支持 Metal)
curl -fsSL https://ollama.com/install.sh | sh

# 2. 下载模型
ollama pull qwen2.5:7b
ollama pull deepseek-coder:6.7b

# 3. 验证 Metal 加速
ollama run qwen2.5:7b "测试Metal加速"
# 使用 Activity Monitor 观察 GPU 使用率
```

**性能基准（M2 Max 32GB）：**
- Qwen2.5 7B: ~25-35 tokens/s
- DeepSeek-Coder 6.7B: ~30-40 tokens/s

### 4. AMD GPU 部署 🔴

**硬件要求：**
- AMD Radeon RX 7900 XTX / MI250X
- ROCm 5.7+

**部署步骤：**

```bash
# 1. 安装 ROCm
sudo apt-get install rocm-hip-sdk

# 2. 从源码编译 Ollama (ROCm 支持)
git clone https://github.com/ollama/ollama.git
cd ollama
USE_ROCM=1 make

# 3. 启动服务
./ollama serve
```

### 5. 纯 CPU 部署 🖥️ (测试环境)

**适用场景：**
- 开发测试
- 低频使用
- 无 GPU 环境

```bash
# 安装 Ollama (自动使用 CPU)
curl -fsSL https://ollama.com/install.sh | sh

# 下载较小的模型
ollama pull qwen2.5:1.5b  # CPU 友好
ollama pull llama3.2:3b   # CPU 友好
```

**性能基准（32核 CPU）：**
- Qwen2.5 7B: ~5-8 tokens/s ⚠️ 较慢

## 🚀 快速开始

### 1. 安装 LiteLLM

```bash
# 使用 pip 安装
pip install litellm[proxy]

# 或使用 Docker
docker pull ghcr.io/berriai/litellm:main-latest
```

### 2. 部署本地模型推理服务

根据你的算力平台，选择对应的部署方式：

#### 方案 A：Ollama (推荐用于英伟达 GPU / Mac M 系列)

```bash
# 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 下载模型
ollama pull qwen2.5:7b
ollama pull deepseek-coder:6.7b
ollama pull llama3.1:8b

# 验证服务
curl http://localhost:11434/api/tags
```

#### 方案 B：vLLM (推荐用于华为升腾 / 高性能场景)

```bash
# 安装 vLLM
pip install vllm

# 启动推理服务
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-7B-Instruct \
  --port 8001

# 验证服务
curl http://localhost:8001/v1/models
```

### 3. 配置 LiteLLM

创建 `litellm_config.yaml`，根据你的推理服务配置：

#### 配置 A：对接 Ollama

```yaml
model_list:
  # Anthropic 格式的模型映射到 Ollama
  - model_name: claude-3-5-sonnet-20241022
    litellm_params:
      model: ollama/qwen2.5:7b
      api_base: http://localhost:11434

  - model_name: claude-3-opus-20240229
    litellm_params:
      model: ollama/deepseek-coder:6.7b
      api_base: http://localhost:11434

  # 也可以同时支持官方 Claude API（回退方案）
  - model_name: claude-3-5-sonnet-20241022-official
    litellm_params:
      model: anthropic/claude-3-5-sonnet-20241022
      api_key: ${ANTHROPIC_API_KEY}
```

#### 配置 B：对接 vLLM (华为升腾等)

```yaml
model_list:
  # 映射到 vLLM 服务
  - model_name: claude-3-5-sonnet-20241022
    litellm_params:
      model: openai/Qwen/Qwen2.5-7B-Instruct
      api_base: http://localhost:8001/v1

  - model_name: claude-3-opus-20240229
    litellm_params:
      model: openai/deepseek-ai/deepseek-coder-6.7b-instruct
      api_base: http://localhost:8001/v1

  # 回退到官方 API
  - model_name: claude-3-5-sonnet-20241022-official
    litellm_params:
      model: anthropic/claude-3-5-sonnet-20241022
      api_key: ${ANTHROPIC_API_KEY}
```

#### 通用配置（两种方案共用）

```yaml
# 通用配置
litellm_settings:
  # 流式响应支持
  stream: true

  # 成本跟踪
  success_callback: ["langfuse"]

  # 重试策略
  num_retries: 3
  request_timeout: 600

  # 并发限制
  max_parallel_requests: 10

  # 缓存配置（可选）
  cache: true
  cache_params:
    type: redis
    host: localhost
    port: 6379

# 路由策略
router_settings:
  routing_strategy: least-busy
  model_group_alias:
    gpt-4: ollama/qwen2.5:7b
    gpt-3.5-turbo: ollama/llama3.1:8b

# 监控配置
general_settings:
  master_key: sk-1234  # 用于认证的主密钥
  database_url: sqlite:///litellm.db  # 存储请求日志
```

### 4. 启动 LiteLLM 代理

```bash
# 方式1：直接启动
litellm --config litellm_config.yaml --port 8000

# 方式2：生产模式（使用 gunicorn）
litellm --config litellm_config.yaml --port 8000 --num_workers 4

# 方式3：Docker 启动
docker run -d \
  --name litellm-proxy \
  -p 8000:8000 \
  -v $(pwd)/litellm_config.yaml:/app/config.yaml \
  -e ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY} \
  ghcr.io/berriai/litellm:main-latest \
  --config /app/config.yaml --port 8000
```

### 5. 配置 Claude CLI

编辑 `~/.claude/config.json` 或项目的 `.claude/config.json`：

```json
{
  "apiKey": "sk-1234",  // 与 litellm_config.yaml 中的 master_key 一致
  "baseURL": "http://localhost:8000/v1"
}
```

或使用环境变量：

```bash
export ANTHROPIC_BASE_URL="http://localhost:8000/v1"
export ANTHROPIC_AUTH_TOKEN="sk-1234"
```

### 6. 测试集成

```bash
# 测试 LiteLLM 代理是否正常
curl http://localhost:8000/health

# 测试模型列表
curl http://localhost:8000/v1/models \
  -H "Authorization: Bearer sk-1234"

# 使用 Claude CLI 测试
claude "用一句话介绍什么是 LiteLLM"
```

## ⚙️ 高级配置

### 智能路由策略

LiteLLM 支持多种路由策略：

```yaml
router_settings:
  # 策略1：最少忙碌（推荐）
  routing_strategy: least-busy

  # 策略2：轮询
  # routing_strategy: simple-shuffle

  # 策略3：成本优先
  # routing_strategy: cost-based

  # 策略4：延迟优先
  # routing_strategy: latency-based

  # 回退配置
  allowed_fails: 3
  cooldown_time: 30  # 失败后冷却时间（秒）
```

### 模型组和负载均衡

```yaml
model_list:
  # 同一个模型名可以映射到多个后端
  - model_name: claude-3-5-sonnet-20241022
    litellm_params:
      model: ollama/qwen2.5:7b
      api_base: http://localhost:11434

  - model_name: claude-3-5-sonnet-20241022
    litellm_params:
      model: ollama/deepseek-coder:6.7b
      api_base: http://localhost:11434

  - model_name: claude-3-5-sonnet-20241022
    litellm_params:
      model: anthropic/claude-3-5-sonnet-20241022
      api_key: ${ANTHROPIC_API_KEY}
```

### 成本跟踪集成

```yaml
litellm_settings:
  # 使用 Langfuse 跟踪
  success_callback: ["langfuse"]
  langfuse_public_key: ${LANGFUSE_PUBLIC_KEY}
  langfuse_secret_key: ${LANGFUSE_SECRET_KEY}
  langfuse_host: https://cloud.langfuse.com
```

### Redis 缓存加速

```yaml
litellm_settings:
  cache: true
  cache_params:
    type: redis
    host: localhost
    port: 6379
    password: ${REDIS_PASSWORD}
    ttl: 3600  # 缓存时间（秒）

    # 缓存键策略
    supported_call_types: ["completion", "acompletion", "embedding"]
```

## 🐳 Docker Compose 部署

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  # LiteLLM 代理
  litellm:
    image: ghcr.io/berriai/litellm:main-latest
    container_name: litellm-proxy
    ports:
      - "8000:8000"
    volumes:
      - ./litellm_config.yaml:/app/config.yaml
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    command: --config /app/config.yaml --port 8000 --num_workers 4
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Redis 缓存（可选）
  redis:
    image: redis:7-alpine
    container_name: litellm-redis
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes
    restart: unless-stopped

  # Prometheus 监控（可选）
  prometheus:
    image: prom/prometheus:latest
    container_name: litellm-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
    restart: unless-stopped

  # Grafana 可视化（可选）
  grafana:
    image: grafana/grafana:latest
    container_name: litellm-grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana
    restart: unless-stopped

volumes:
  redis-data:
  prometheus-data:
  grafana-data:
```

启动服务：

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f litellm

# 停止服务
docker-compose down
```

## 📊 监控和日志

### 内置监控端点

```bash
# 健康检查
curl http://localhost:8000/health

# 模型列表
curl http://localhost:8000/v1/models -H "Authorization: Bearer sk-1234"

# 统计信息
curl http://localhost:8000/stats -H "Authorization: Bearer sk-1234"

# 请求日志
curl http://localhost:8000/logs -H "Authorization: Bearer sk-1234"
```

### Prometheus 指标

LiteLLM 自动暴露 Prometheus 指标：

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'litellm'
    static_configs:
      - targets: ['litellm:8000']
    metrics_path: '/metrics'
```

可用指标：
- `litellm_requests_total` - 总请求数
- `litellm_requests_duration_seconds` - 请求延迟
- `litellm_requests_errors_total` - 错误数
- `litellm_model_requests_total` - 每个模型的请求数
- `litellm_cost_total` - 总成本

## 🔧 故障排查

### 问题1：LiteLLM 无法连接到 Ollama

**症状：**
```
Error: Connection refused to http://localhost:11434
```

**解决方案：**
```bash
# 检查 Ollama 是否运行
ps aux | grep ollama

# 重启 Ollama
ollama serve

# 测试连接
curl http://localhost:11434/api/tags
```

### 问题2：Claude CLI 报错 401 Unauthorized

**症状：**
```
Error: Unauthorized (401)
```

**解决方案：**
```bash
# 确保 API Key 匹配
# 1. 检查 litellm_config.yaml 中的 master_key
# 2. 检查 Claude CLI 配置中的 apiKey

# 方式1：更新 config.json
cat ~/.claude/config.json

# 方式2：使用环境变量
export ANTHROPIC_AUTH_TOKEN="sk-1234"
```

### 问题3：响应速度慢

**可能原因和解决方案：**

1. **模型加载时间长**
   ```bash
   # 预热模型
   curl -X POST http://localhost:11434/api/generate \
     -d '{"model": "qwen2.5:7b", "prompt": "hello", "stream": false}'
   ```

2. **启用 Redis 缓存**
   ```yaml
   litellm_settings:
     cache: true
     cache_params:
       type: redis
       host: localhost
       port: 6379
   ```

3. **增加并发处理**
   ```bash
   # 启动时增加 worker 数量
   litellm --config litellm_config.yaml --num_workers 4
   ```

### 问题4：流式响应不工作

**解决方案：**
```yaml
# 确保配置中启用了流式响应
litellm_settings:
  stream: true

# 测试流式 API
curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Authorization: Bearer sk-1234" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": true
  }'
```

### 问题5：Docker 容器内无法访问宿主机服务

**解决方案：**
```yaml
# 使用 host.docker.internal（Mac/Windows）
model_list:
  - model_name: claude-3-5-sonnet-20241022
    litellm_params:
      model: ollama/qwen2.5:7b
      api_base: http://host.docker.internal:11434

# 或使用网络模式（Linux）
# docker-compose.yml
services:
  litellm:
    network_mode: host
```

## 🎯 最佳实践

### 1. 模型选择策略

```yaml
# 按任务类型路由到不同模型
model_list:
  # 代码生成任务
  - model_name: claude-3-5-sonnet-code
    litellm_params:
      model: ollama/deepseek-coder:6.7b
      api_base: http://localhost:11434

  # 通用对话任务
  - model_name: claude-3-5-sonnet-chat
    litellm_params:
      model: ollama/qwen2.5:7b
      api_base: http://localhost:11434

  # 长文本处理
  - model_name: claude-3-opus-long
    litellm_params:
      model: ollama/llama3.1:8b
      api_base: http://localhost:11434
```

在 Claude CLI 中指定模型：
```bash
claude --model claude-3-5-sonnet-code "写一个快速排序算法"
```

### 2. 成本优化

```yaml
# 优先使用本地模型，失败时回退到云端
model_list:
  - model_name: claude-3-5-sonnet-20241022
    litellm_params:
      model: ollama/qwen2.5:7b
      api_base: http://localhost:11434

  - model_name: claude-3-5-sonnet-20241022
    litellm_params:
      model: anthropic/claude-3-5-sonnet-20241022
      api_key: ${ANTHROPIC_API_KEY}

router_settings:
  routing_strategy: cost-based
  fallbacks: true
  allowed_fails: 2
```

### 3. 性能优化

```yaml
litellm_settings:
  # 启用缓存
  cache: true
  cache_params:
    type: redis
    ttl: 3600

  # 批处理
  batch_size: 5

  # 超时控制
  request_timeout: 300

  # 连接池
  max_parallel_requests: 20
```

### 4. 安全配置

```yaml
general_settings:
  # API 密钥管理
  master_key: ${LITELLM_MASTER_KEY}  # 从环境变量读取

  # 用户认证
  user_api_key_auth: true

  # 速率限制
  rpm: 100  # 每分钟请求数
  tpm: 100000  # 每分钟 token 数

  # IP 白名单
  allowed_ips: ["127.0.0.1", "192.168.1.0/24"]
```

## 📚 相关资源

- 📖 [LiteLLM 官方文档](https://docs.litellm.ai/)
- 🐙 [LiteLLM GitHub](https://github.com/BerriAI/litellm)
- 🦙 [Ollama 文档](https://ollama.com/docs)
- 🤖 [Claude CLI 文档](https://docs.claude.com/claude-code)

## 🎉 总结

通过 LiteLLM 集成本地大模型，您可以：

✅ **降低成本** - 本地推理节省 99%+ API 费用
✅ **保护隐私** - 敏感数据完全本地处理
✅ **提升灵活性** - 统一接口调用多种模型
✅ **优化性能** - 智能路由和缓存加速
✅ **无缝集成** - Claude CLI 零改动使用

现在开始使用 LiteLLM，让 Claude CLI 更强大！🚀
