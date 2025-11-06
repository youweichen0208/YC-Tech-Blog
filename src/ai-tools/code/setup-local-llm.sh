#!/bin/bash

# 本地大模型系统一键部署脚本
# 适用于 Mac M2 芯片

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # 无颜色

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# 检查系统环境
check_system() {
    log_step "检查系统环境..."

    # 检查是否为macOS
    if [[ "$OSTYPE" != "darwin"* ]]; then
        log_error "此脚本仅支持 macOS 系统"
        exit 1
    fi

    # 检查M2芯片
    chip_info=$(sysctl -n machdep.cpu.brand_string)
    if [[ $chip_info == *"Apple M"* ]]; then
        log_info "检测到 Apple Silicon 芯片: $chip_info"
    else
        log_warn "未检测到 Apple Silicon 芯片，性能可能受限"
    fi

    # 检查内存
    memory_gb=$(( $(sysctl -n hw.memsize) / 1024 / 1024 / 1024 ))
    log_info "系统内存: ${memory_gb}GB"

    if [ $memory_gb -lt 8 ]; then
        log_error "系统内存不足8GB，无法运行大模型"
        exit 1
    elif [ $memory_gb -lt 16 ]; then
        log_warn "建议使用16GB或更多内存以获得更好性能"
    fi
}

# 安装依赖
install_dependencies() {
    log_step "安装系统依赖..."

    # 检查Homebrew
    if ! command -v brew &> /dev/null; then
        log_info "正在安装 Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    else
        log_info "Homebrew 已安装"
    fi

    # 检查Python3
    if ! command -v python3 &> /dev/null; then
        log_info "正在安装 Python3..."
        brew install python3
    else
        python_version=$(python3 --version)
        log_info "Python3 已安装: $python_version"
    fi

    # 检查pip
    if ! command -v pip3 &> /dev/null; then
        log_info "正在安装 pip..."
        python3 -m ensurepip
    fi
}

# 安装Ollama
install_ollama() {
    log_step "安装 Ollama..."

    if ! command -v ollama &> /dev/null; then
        log_info "正在下载并安装 Ollama..."
        curl -fsSL https://ollama.com/install.sh | sh

        # 等待安装完成
        sleep 3

        if command -v ollama &> /dev/null; then
            log_info "Ollama 安装成功"
        else
            log_error "Ollama 安装失败"
            exit 1
        fi
    else
        log_info "Ollama 已安装"
    fi

    # 启动Ollama服务（如果未运行）
    if ! pgrep -f "ollama serve" > /dev/null; then
        log_info "启动 Ollama 服务..."
        ollama serve &
        sleep 5
    else
        log_info "Ollama 服务已运行"
    fi
}

# 下载模型
download_models() {
    log_step "下载推荐模型..."

    # 模型列表（根据内存大小选择）
    memory_gb=$(( $(sysctl -n hw.memsize) / 1024 / 1024 / 1024 ))

    if [ $memory_gb -ge 24 ]; then
        models=("llama3.1:8b" "qwen2.5:14b" "deepseek-coder:6.7b")
    elif [ $memory_gb -ge 16 ]; then
        models=("llama3.1:8b" "qwen2.5:7b" "deepseek-coder:6.7b")
    else
        models=("llama3.1:8b" "qwen2.5:7b")
    fi

    for model in "${models[@]}"; do
        log_info "下载模型: $model"

        # 检查模型是否已存在
        if ollama list | grep -q "$model"; then
            log_info "模型 $model 已存在，跳过下载"
        else
            ollama pull "$model"
            if [ $? -eq 0 ]; then
                log_info "模型 $model 下载成功"
            else
                log_error "模型 $model 下载失败"
            fi
        fi
    done

    # 列出已安装的模型
    log_info "已安装的模型:"
    ollama list
}

# 安装Python依赖
install_python_deps() {
    log_step "安装 Python 依赖..."

    # 创建虚拟环境（可选）
    if [ ! -d "venv" ]; then
        log_info "创建虚拟环境..."
        python3 -m venv venv
    fi

    # 激活虚拟环境
    source venv/bin/activate 2>/dev/null || true

    # 安装依赖
    log_info "安装 Python 包..."
    pip3 install fastapi uvicorn httpx pydantic psutil

    log_info "Python 依赖安装完成"
}

# 创建配置文件
create_configs() {
    log_step "创建配置文件..."

    # 创建环境配置
    cat > .env << EOF
# Ollama 配置
OLLAMA_HOST=http://localhost:11434
OLLAMA_GPU_LAYERS=99
OLLAMA_NUM_PARALLEL=2
OLLAMA_MAX_LOADED_MODELS=3

# 代理服务配置
PROXY_HOST=0.0.0.0
PROXY_PORT=8000
LOG_LEVEL=info

# 缓存配置
CACHE_SIZE=1000
ENABLE_CACHE=true

# 性能调优
DEFAULT_TEMPERATURE=0.7
DEFAULT_MAX_TOKENS=2000
REQUEST_TIMEOUT=60
EOF

    # 创建启动脚本
    cat > start.sh << 'EOF'
#!/bin/bash

# 启动本地大模型系统

# 加载环境变量
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
fi

# 启动Ollama（如果未运行）
if ! pgrep -f "ollama serve" > /dev/null; then
    echo "启动 Ollama 服务..."
    ollama serve &
    sleep 5
fi

# 启动代理服务
echo "启动代理服务..."
python3 local_llm_proxy.py --host $PROXY_HOST --port $PROXY_PORT --log-level $LOG_LEVEL
EOF

    chmod +x start.sh

    # 创建停止脚本
    cat > stop.sh << 'EOF'
#!/bin/bash

echo "停止本地大模型系统..."

# 停止代理服务
pkill -f "local_llm_proxy.py"

# 停止Ollama服务
pkill -f "ollama serve"

echo "服务已停止"
EOF

    chmod +x stop.sh

    # 创建测试脚本
    cat > test.sh << 'EOF'
#!/bin/bash

echo "测试本地大模型系统..."

# 等待服务启动
sleep 3

# 测试健康检查
echo "1. 测试健康检查..."
curl -s http://localhost:8000/health | python3 -m json.tool

echo -e "\n2. 测试模型列表..."
curl -s http://localhost:8000/api/models | python3 -m json.tool

echo -e "\n3. 测试文本生成..."
curl -X POST http://localhost:8000/api/generate \
    -H "Content-Type: application/json" \
    -d '{
        "prompt": "你好，请介绍一下你自己",
        "model": "qwen2.5:7b",
        "temperature": 0.7,
        "max_tokens": 100
    }' | python3 -m json.tool

echo -e "\n4. 测试系统状态..."
curl -s http://localhost:8000/api/status | python3 -m json.tool

echo -e "\n测试完成！"
EOF

    chmod +x test.sh

    log_info "配置文件创建完成"
}

# 系统优化
optimize_system() {
    log_step "优化系统性能..."

    # 设置环境变量
    export OLLAMA_GPU_LAYERS=99
    export OLLAMA_NUM_PARALLEL=2
    export OLLAMA_MAX_LOADED_MODELS=3

    # 创建性能监控脚本
    cat > monitor.sh << 'EOF'
#!/bin/bash

echo "本地大模型系统性能监控"
echo "=========================="

while true; do
    clear
    echo "时间: $(date)"
    echo ""

    # CPU和内存使用率
    echo "系统资源:"
    top -l 1 | grep "CPU usage"
    top -l 1 | grep "PhysMem"
    echo ""

    # Ollama进程状态
    echo "Ollama 进程:"
    ps aux | grep ollama | grep -v grep || echo "Ollama 未运行"
    echo ""

    # 代理服务状态
    echo "代理服务状态:"
    curl -s http://localhost:8000/health 2>/dev/null | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(f'状态: {data[\"status\"]}')
    print(f'请求总数: {data[\"total_requests\"]}')
except:
    print('代理服务未响应')
" || echo "代理服务未运行"

    echo ""
    echo "按 Ctrl+C 退出监控"
    sleep 5
done
EOF

    chmod +x monitor.sh

    log_info "性能优化完成"
}

# 启动服务
start_services() {
    log_step "启动服务..."

    # 检查端口是否被占用
    if lsof -i :11434 >/dev/null 2>&1; then
        log_info "Ollama 服务已在运行"
    else
        log_info "启动 Ollama 服务..."
        ollama serve &
        sleep 5
    fi

    if lsof -i :8000 >/dev/null 2>&1; then
        log_warn "端口 8000 已被占用，请检查或更改端口"
    else
        log_info "启动代理服务..."
        python3 local_llm_proxy.py &
        sleep 3
    fi
}

# 运行测试
run_tests() {
    log_step "运行系统测试..."

    # 等待服务完全启动
    sleep 5

    # 健康检查
    if curl -s http://localhost:8000/health | grep -q "healthy"; then
        log_info "✅ 健康检查通过"
    else
        log_error "❌ 健康检查失败"
        return 1
    fi

    # 模型测试
    if curl -s http://localhost:8000/api/models | grep -q "llama"; then
        log_info "✅ 模型列表获取成功"
    else
        log_error "❌ 模型列表获取失败"
        return 1
    fi

    # 简单文本生成测试
    response=$(curl -s -X POST http://localhost:8000/api/generate \
        -H "Content-Type: application/json" \
        -d '{
            "prompt": "Hello",
            "model": "llama3.1:8b",
            "max_tokens": 10
        }')

    if echo "$response" | grep -q "response"; then
        log_info "✅ 文本生成测试通过"
    else
        log_error "❌ 文本生成测试失败"
        return 1
    fi

    log_info "🎉 所有测试通过！"
    return 0
}

# 显示使用信息
show_usage() {
    echo ""
    log_info "=========================================="
    log_info "🎉 本地大模型系统部署完成！"
    log_info "=========================================="
    echo ""
    echo "📡 服务地址:"
    echo "   - 代理服务: http://localhost:8000"
    echo "   - Ollama服务: http://localhost:11434"
    echo "   - API文档: http://localhost:8000/docs"
    echo ""
    echo "🛠️ 管理命令:"
    echo "   - 启动服务: ./start.sh"
    echo "   - 停止服务: ./stop.sh"
    echo "   - 运行测试: ./test.sh"
    echo "   - 性能监控: ./monitor.sh"
    echo ""
    echo "📚 快速测试:"
    echo "   curl -X POST http://localhost:8000/api/generate \\"
    echo "     -H 'Content-Type: application/json' \\"
    echo "     -d '{\"prompt\": \"你好\", \"model\": \"qwen2.5:7b\"}'"
    echo ""
    echo "🔧 配置文件:"
    echo "   - 环境配置: .env"
    echo "   - 服务代码: local_llm_proxy.py"
    echo ""
}

# 清理函数
cleanup() {
    log_info "清理临时文件..."
    # 这里可以添加清理逻辑
}

# 错误处理
error_handler() {
    log_error "部署过程中出现错误，正在清理..."
    cleanup
    exit 1
}

# 设置错误处理
trap error_handler ERR

# 主程序
main() {
    echo "🚀 开始部署本地大模型系统..."
    echo "=================================="

    check_system
    install_dependencies
    install_ollama
    download_models
    install_python_deps
    create_configs
    optimize_system
    start_services

    if run_tests; then
        show_usage
    else
        log_error "部署完成但测试失败，请检查系统状态"
        exit 1
    fi
}

# 命令行参数处理
case "${1:-}" in
    "install")
        main
        ;;
    "start")
        ./start.sh
        ;;
    "stop")
        ./stop.sh
        ;;
    "test")
        ./test.sh
        ;;
    "monitor")
        ./monitor.sh
        ;;
    "clean")
        log_info "清理系统..."
        ./stop.sh
        rm -f .env start.sh stop.sh test.sh monitor.sh
        log_info "清理完成"
        ;;
    *)
        echo "用法: $0 {install|start|stop|test|monitor|clean}"
        echo ""
        echo "命令说明:"
        echo "  install  - 一键安装和部署系统"
        echo "  start    - 启动服务"
        echo "  stop     - 停止服务"
        echo "  test     - 运行测试"
        echo "  monitor  - 性能监控"
        echo "  clean    - 清理系统"
        exit 1
        ;;
esac