#!/bin/bash

# Claude Tools + 本地大模型 模型初始化脚本
# 自动下载和配置推荐模型

set -e

echo "🚀 开始初始化Claude Tools本地大模型..."

# 等待 Ollama 服务启动
echo "⏳ 等待 Ollama 服务启动..."
until curl -f http://ollama:11434/api/tags >/dev/null 2>&1; do
    echo "   等待 Ollama 服务..."
    sleep 5
done

echo "✅ Ollama 服务已启动"

# 设置 OLLAMA 环境变量
export OLLAMA_HOST=ollama:11434

# 检查系统资源并选择合适的模型
echo "🔍 检测系统资源..."

# 模型配置
declare -A MODELS=(
    ["llama3.1:8b"]="通用AI助手 - 8GB模型，适合日常对话和文本处理"
    ["qwen2.5:7b"]="中文专家 - 7GB模型，中文理解和生成优化"
    ["deepseek-coder:6.7b"]="代码专家 - 6.7GB模型，专精编程和代码审查"
)

# 下载函数
download_model() {
    local model=$1
    local description=$2

    echo "📥 下载模型: $model"
    echo "   描述: $description"

    # 检查模型是否已存在
    if curl -s http://ollama:11434/api/tags | grep -q "\"name\":\"$model\""; then
        echo "   ✅ 模型 $model 已存在，跳过下载"
        return 0
    fi

    # 下载模型
    echo "   🔽 正在下载 $model..."
    if curl -X POST http://ollama:11434/api/pull \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$model\"}" >/dev/null 2>&1; then
        echo "   ✅ 模型 $model 下载完成"
    else
        echo "   ❌ 模型 $model 下载失败"
        return 1
    fi
}

# 验证模型函数
verify_model() {
    local model=$1

    echo "🧪 验证模型: $model"

    # 测试模型推理
    local test_prompt="Hello"
    local response=$(curl -s -X POST http://ollama:11434/api/generate \
        -H "Content-Type: application/json" \
        -d "{\"model\":\"$model\",\"prompt\":\"$test_prompt\",\"stream\":false}")

    if echo "$response" | grep -q "response"; then
        echo "   ✅ 模型 $model 验证成功"
        return 0
    else
        echo "   ❌ 模型 $model 验证失败"
        return 1
    fi
}

# 主下载流程
echo "📦 开始下载模型..."
success_count=0
total_count=${#MODELS[@]}

for model in "${!MODELS[@]}"; do
    description="${MODELS[$model]}"

    if download_model "$model" "$description"; then
        if verify_model "$model"; then
            ((success_count++))
        fi
    fi
done

# 生成配置文件
echo "⚙️ 生成配置文件..."

cat > /tmp/claude-tools-config.json << EOF
{
  "claude_tools": {
    "version": "1.0.0",
    "local_llm": {
      "enabled": true,
      "endpoint": "http://ollama:11434",
      "models": {
        "code_review": "deepseek-coder:6.7b",
        "translation": "qwen2.5:7b",
        "general": "llama3.1:8b",
        "chinese": "qwen2.5:7b"
      },
      "routing": {
        "auto_route": true,
        "fallback_to_claude": true,
        "cache_enabled": true,
        "cache_ttl": 3600
      }
    }
  },
  "initialized_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "models_installed": $success_count,
  "total_models": $total_count
}
EOF

# 复制配置文件到持久化位置
if [ -d "/root/.ollama" ]; then
    cp /tmp/claude-tools-config.json /root/.ollama/
    echo "✅ 配置文件已保存到 /root/.ollama/"
fi

# 输出最终状态
echo ""
echo "🎉 模型初始化完成！"
echo "================================"
echo "✅ 成功安装: $success_count/$total_count 个模型"
echo ""

# 列出已安装的模型
echo "📋 已安装的模型列表:"
for model in "${!MODELS[@]}"; do
    if curl -s http://ollama:11434/api/tags | grep -q "\"name\":\"$model\""; then
        echo "   ✅ $model - ${MODELS[$model]}"
    else
        echo "   ❌ $model - 安装失败"
    fi
done

echo ""
echo "🔗 Claude Tools 集成就绪！"
echo "   API 端点: http://localhost:8000"
echo "   健康检查: http://localhost:8000/health"
echo "   API 文档: http://localhost:8000/docs"
echo ""

# 最后验证整体系统
echo "🔍 最终系统验证..."
if [ $success_count -gt 0 ]; then
    echo "✅ 系统初始化成功，可以开始使用 Claude Tools + 本地大模型！"
    exit 0
else
    echo "❌ 系统初始化失败，请检查网络连接和系统资源"
    exit 1
fi