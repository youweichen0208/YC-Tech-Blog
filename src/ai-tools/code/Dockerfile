# Claude Tools + 本地大模型 代理服务镜像
# 优化版本：支持多架构、Claude Tools集成、生产就绪

FROM python:3.11-slim as base

# 构建参数
ARG CLAUDE_TOOLS_VERSION=latest
ARG TARGETPLATFORM

# 设置标签
LABEL maintainer="youweichen0208@gmail.com"
LABEL description="Claude Tools Local LLM Proxy Service"
LABEL version="1.0.0"

# 环境变量
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    POETRY_NO_INTERACTION=1

# 工作目录
WORKDIR /app

# 系统依赖安装阶段
FROM base as system-deps

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    gcc \
    g++ \
    libc6-dev \
    libffi-dev \
    libssl-dev \
    ca-certificates \
    git \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Python依赖安装阶段
FROM system-deps as python-deps

# 创建非root用户
RUN groupadd --gid 1000 appuser \
    && useradd --uid 1000 --gid appuser --shell /bin/bash --create-home appuser

# 复制依赖文件
COPY requirements.txt .

# 安装Python依赖
RUN pip install --no-cache-dir --upgrade pip setuptools wheel \
    && pip install --no-cache-dir -r requirements.txt

# 应用构建阶段
FROM python-deps as app

# 复制应用代码
COPY local_llm_proxy.py .
COPY claude_tools_integration.py .

# 创建必要目录
RUN mkdir -p /app/logs /app/config /app/cache \
    && chown -R appuser:appuser /app

# 复制配置文件
COPY config/ ./config/

# 创建启动脚本
RUN cat > /app/start.sh << 'EOF'
#!/bin/bash
set -e

echo "🚀 启动 Claude Tools 本地大模型代理服务..."

# 健康检查函数
health_check() {
    local service=$1
    local url=$2
    local max_attempts=30
    local attempt=1

    echo "⏳ 等待 $service 服务启动..."
    while [ $attempt -le $max_attempts ]; do
        if curl -f "$url" >/dev/null 2>&1; then
            echo "✅ $service 服务已启动"
            return 0
        fi
        echo "   尝试 $attempt/$max_attempts ..."
        sleep 2
        ((attempt++))
    done
    echo "❌ $service 服务启动超时"
    return 1
}

# 等待依赖服务
if [ "$OLLAMA_HOST" ]; then
    health_check "Ollama" "http://${OLLAMA_HOST}/api/tags"
fi

if [ "$REDIS_URL" ]; then
    redis_host=$(echo $REDIS_URL | cut -d'/' -f3 | cut -d':' -f1)
    redis_port=$(echo $REDIS_URL | cut -d'/' -f3 | cut -d':' -f2)
    health_check "Redis" "http://${redis_host}:${redis_port}"
fi

# 启动应用
echo "🔥 启动代理服务..."
exec python local_llm_proxy.py \
    --host "${PROXY_HOST:-0.0.0.0}" \
    --port "${PROXY_PORT:-8000}" \
    --log-level "${LOG_LEVEL:-info}"
EOF

RUN chmod +x /app/start.sh

# 生产阶段
FROM app as production

# 切换到非root用户
USER appuser

# 暴露端口
EXPOSE 8000

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# 容器标签
LABEL claude-tools.enabled="true" \
      claude-tools.version="${CLAUDE_TOOLS_VERSION}" \
      build.date="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
      build.platform="${TARGETPLATFORM}"

# 启动命令
CMD ["/app/start.sh"]

# 开发阶段（可选）
FROM app as development

# 安装开发依赖
RUN pip install --no-cache-dir \
    pytest \
    pytest-asyncio \
    black \
    flake8 \
    mypy

# 开发模式启动
CMD ["python", "-m", "uvicorn", "local_llm_proxy:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]