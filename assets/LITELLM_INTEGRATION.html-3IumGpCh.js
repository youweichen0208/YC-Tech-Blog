import{_ as l,r as i,o as p,c,a as n,b as s,d as e,e as t}from"./app-t6_zvxwT.js";const o={},u=t(`<h1 id="claude-cli-litellm-本地大模型集成指南" tabindex="-1"><a class="header-anchor" href="#claude-cli-litellm-本地大模型集成指南" aria-hidden="true">#</a> Claude CLI + LiteLLM + 本地大模型集成指南</h1><h2 id="📖-概述" tabindex="-1"><a class="header-anchor" href="#📖-概述" aria-hidden="true">#</a> 📖 概述</h2><p>本指南介绍如何使用 <strong>LiteLLM</strong> 作为统一代理层，让 <strong>Claude CLI</strong> 能够调用本地部署的开源大模型，实现：</p><ul><li>✅ 统一 API 接口（OpenAI/Anthropic 格式）</li><li>✅ 多模型路由和负载均衡</li><li>✅ 成本跟踪和监控</li><li>✅ 流式响应支持</li><li>✅ Claude CLI 无缝集成</li></ul><h2 id="🏗️-架构设计" tabindex="-1"><a class="header-anchor" href="#🏗️-架构设计" aria-hidden="true">#</a> 🏗️ 架构设计</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>┌─────────────────────────────────────────────────────────────┐
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="💻-算力平台选择" tabindex="-1"><a class="header-anchor" href="#💻-算力平台选择" aria-hidden="true">#</a> 💻 算力平台选择</h2><p>在部署本地大模型之前，需要选择合适的算力平台。以下是主流算力平台对比：</p><h3 id="平台兼容性对比" tabindex="-1"><a class="header-anchor" href="#平台兼容性对比" aria-hidden="true">#</a> 平台兼容性对比</h3><table><thead><tr><th>算力平台</th><th>Ollama</th><th>vLLM</th><th>推理性能</th><th>推荐场景</th></tr></thead><tbody><tr><td>🎮 <strong>英伟达 GPU</strong></td><td>✅ 完美支持</td><td>✅ 完美支持</td><td>⭐⭐⭐⭐⭐</td><td>🏆 首选方案</td></tr><tr><td>🇨🇳 <strong>华为升腾 NPU</strong></td><td>❌ 不支持</td><td>⚠️ 部分支持</td><td>⭐⭐⭐⭐</td><td>国产化需求</td></tr><tr><td>🍎 <strong>Apple Silicon (M1/M2/M3)</strong></td><td>✅ 原生支持</td><td>❌ 不支持</td><td>⭐⭐⭐</td><td>个人开发</td></tr><tr><td>🔴 <strong>AMD GPU (ROCm)</strong></td><td>⚠️ 需编译</td><td>⚠️ 需编译</td><td>⭐⭐⭐</td><td>AMD 设备</td></tr><tr><td>⚡ <strong>Intel GPU (oneAPI)</strong></td><td>❌ 实验性</td><td>❌ 实验性</td><td>⭐⭐</td><td>Intel Arc</td></tr><tr><td>🖥️ <strong>CPU (纯CPU)</strong></td><td>✅ 支持</td><td>✅ 支持</td><td>⭐</td><td>测试环境</td></tr></tbody></table><h3 id="_1-英伟达-gpu-部署-🎮-推荐" tabindex="-1"><a class="header-anchor" href="#_1-英伟达-gpu-部署-🎮-推荐" aria-hidden="true">#</a> 1. 英伟达 GPU 部署 🎮 (推荐)</h3><p><strong>硬件要求：</strong></p><ul><li>GPU 显存：≥ 16GB (推荐 24GB+)</li><li>推荐型号：RTX 4090 / A100 / A6000 / V100</li></ul><p><strong>云服务器推荐：</strong></p><ul><li>阿里云 GPU 云服务器 (ecs.gn7i-c8g1.2xlarge)</li><li>腾讯云 GPU 云服务器 (GN10Xp)</li><li>AWS EC2 (p3.2xlarge / g5.xlarge)</li><li>Google Cloud Compute Engine (n1-standard-8 + T4)</li></ul><p><strong>部署步骤：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 验证 NVIDIA 驱动</span>
nvidia-smi

<span class="token comment"># 2. 安装 CUDA Toolkit (如未安装)</span>
<span class="token function">wget</span> https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
<span class="token function">sudo</span> <span class="token function">mv</span> cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
<span class="token function">sudo</span> apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/3bf863cc.pub
<span class="token function">sudo</span> add-apt-repository <span class="token string">&quot;deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/ /&quot;</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> cuda-12-2

<span class="token comment"># 3. 安装 Ollama (自动使用 CUDA)</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://ollama.com/install.sh <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># 4. 下载模型</span>
ollama pull qwen2.5:7b       <span class="token comment"># 需要 ~5GB 显存</span>
ollama pull deepseek-coder:6.7b  <span class="token comment"># 需要 ~4GB 显存</span>
ollama pull llama3.1:8b      <span class="token comment"># 需要 ~5GB 显存</span>

<span class="token comment"># 5. 验证 GPU 加速</span>
ollama run qwen2.5:7b <span class="token string">&quot;测试GPU加速&quot;</span>
<span class="token comment"># 使用 nvidia-smi 观察 GPU 使用率</span>
<span class="token function">watch</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> nvidia-smi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>性能基准（英伟达 RTX 4090）：</strong></p><ul><li>Qwen2.5 7B: ~80-100 tokens/s</li><li>DeepSeek-Coder 6.7B: ~90-110 tokens/s</li><li>Llama 3.1 8B: ~75-95 tokens/s</li></ul><h3 id="_2-华为升腾-npu-部署-🇨🇳" tabindex="-1"><a class="header-anchor" href="#_2-华为升腾-npu-部署-🇨🇳" aria-hidden="true">#</a> 2. 华为升腾 NPU 部署 🇨🇳</h3><p><strong>硬件要求：</strong></p><ul><li>升腾 310P / 910B</li><li>驱动版本：CANN 7.0+</li></ul><p><strong>云服务器推荐：</strong></p><ul><li>华为云耀云服务器 L 实例 (ai1s.xlarge)</li><li>华为云 ECS 通用计算增强型 (c7.xlarge.2)</li></ul><p><strong>部署步骤（vLLM）：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 安装 CANN 驱动和固件</span>
<span class="token comment"># 参考华为官方文档：https://www.hiascend.com/document</span>

<span class="token comment"># 2. 验证 NPU 状态</span>
npu-smi info

<span class="token comment"># 3. 安装支持升腾的 vLLM (需要特殊编译版本)</span>
pip <span class="token function">install</span> vllm-ascend  <span class="token comment"># 华为提供的适配版本</span>

<span class="token comment"># 4. 启动 vLLM 服务</span>
python <span class="token parameter variable">-m</span> vllm.entrypoints.openai.api_server <span class="token punctuation">\\</span>
  <span class="token parameter variable">--model</span> Qwen/Qwen2.5-7B-Instruct <span class="token punctuation">\\</span>
  <span class="token parameter variable">--device</span> ascend <span class="token punctuation">\\</span>
  --tensor-parallel-size <span class="token number">1</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--port</span> <span class="token number">8001</span>

<span class="token comment"># 5. 配置 LiteLLM 连接 vLLM</span>
<span class="token comment"># 见后续配置章节</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>⚠️ 注意事项：</strong></p><ul><li>Ollama 目前不支持华为升腾</li><li>vLLM 需要使用华为官方适配版本</li><li>部分模型可能需要转换格式（ONNX → OM）</li><li>性能约为同级别英伟达 GPU 的 70-80%</li></ul><h3 id="_3-apple-silicon-部署-🍎-个人开发" tabindex="-1"><a class="header-anchor" href="#_3-apple-silicon-部署-🍎-个人开发" aria-hidden="true">#</a> 3. Apple Silicon 部署 🍎 (个人开发)</h3><p><strong>硬件要求：</strong></p><ul><li>M1/M2/M3 系列芯片</li><li>统一内存：≥ 16GB (推荐 32GB+)</li></ul><p><strong>部署步骤：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 安装 Ollama (原生支持 Metal)</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://ollama.com/install.sh <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># 2. 下载模型</span>
ollama pull qwen2.5:7b
ollama pull deepseek-coder:6.7b

<span class="token comment"># 3. 验证 Metal 加速</span>
ollama run qwen2.5:7b <span class="token string">&quot;测试Metal加速&quot;</span>
<span class="token comment"># 使用 Activity Monitor 观察 GPU 使用率</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>性能基准（M2 Max 32GB）：</strong></p><ul><li>Qwen2.5 7B: ~25-35 tokens/s</li><li>DeepSeek-Coder 6.7B: ~30-40 tokens/s</li></ul><h3 id="_4-amd-gpu-部署-🔴" tabindex="-1"><a class="header-anchor" href="#_4-amd-gpu-部署-🔴" aria-hidden="true">#</a> 4. AMD GPU 部署 🔴</h3><p><strong>硬件要求：</strong></p><ul><li>AMD Radeon RX 7900 XTX / MI250X</li><li>ROCm 5.7+</li></ul><p><strong>部署步骤：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 安装 ROCm</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> rocm-hip-sdk

<span class="token comment"># 2. 从源码编译 Ollama (ROCm 支持)</span>
<span class="token function">git</span> clone https://github.com/ollama/ollama.git
<span class="token builtin class-name">cd</span> ollama
<span class="token assign-left variable">USE_ROCM</span><span class="token operator">=</span><span class="token number">1</span> <span class="token function">make</span>

<span class="token comment"># 3. 启动服务</span>
./ollama serve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-纯-cpu-部署-🖥️-测试环境" tabindex="-1"><a class="header-anchor" href="#_5-纯-cpu-部署-🖥️-测试环境" aria-hidden="true">#</a> 5. 纯 CPU 部署 🖥️ (测试环境)</h3><p><strong>适用场景：</strong></p><ul><li>开发测试</li><li>低频使用</li><li>无 GPU 环境</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 Ollama (自动使用 CPU)</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://ollama.com/install.sh <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># 下载较小的模型</span>
ollama pull qwen2.5:1.5b  <span class="token comment"># CPU 友好</span>
ollama pull llama3.2:3b   <span class="token comment"># CPU 友好</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>性能基准（32核 CPU）：</strong></p><ul><li>Qwen2.5 7B: ~5-8 tokens/s ⚠️ 较慢</li></ul><h2 id="🚀-快速开始" tabindex="-1"><a class="header-anchor" href="#🚀-快速开始" aria-hidden="true">#</a> 🚀 快速开始</h2><h3 id="_1-安装-litellm" tabindex="-1"><a class="header-anchor" href="#_1-安装-litellm" aria-hidden="true">#</a> 1. 安装 LiteLLM</h3><h4 id="部署位置选择-💡" tabindex="-1"><a class="header-anchor" href="#部署位置选择-💡" aria-hidden="true">#</a> 部署位置选择 💡</h4><p>首先明确一个概念：<strong>&quot;宿主机&quot; 是指运行 Docker 的那台机器</strong>，可以是：</p><ul><li>你的本地 Mac（本地是宿主机）</li><li>云服务器（云服务器是宿主机）</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>┌─────────────────────────────────┐
│      宿主机 (Host Machine)       │  ← 可以是本地Mac或云服务器
│  ┌──────────────────────────┐   │
│  │   Docker Engine          │   │
│  │  ┌────────────────────┐  │   │
│  │  │  LiteLLM 容器      │  │   │  ← 容器运行在宿主机上
│  │  └────────────────────┘  │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>🎯 决策原则：LiteLLM 和模型推理服务要在同一台机器上</strong></p><table><thead><tr><th>模型部署位置</th><th>LiteLLM 安装位置</th><th>Claude CLI 配置</th></tr></thead><tbody><tr><td>本地 Mac</td><td>本地 Mac</td><td><code>http://localhost:8000/v1</code></td></tr><tr><td>云服务器</td><td>云服务器</td><td><code>http://云服务器IP:8000/v1</code></td></tr></tbody></table><h4 id="部署方式选择-docker-vs-原生部署" tabindex="-1"><a class="header-anchor" href="#部署方式选择-docker-vs-原生部署" aria-hidden="true">#</a> 部署方式选择：Docker vs 原生部署</h4><h5 id="📊-对比分析" tabindex="-1"><a class="header-anchor" href="#📊-对比分析" aria-hidden="true">#</a> 📊 对比分析</h5><table><thead><tr><th>指标</th><th>Docker 容器化</th><th>原生部署（pip安装）</th><th>推荐场景</th></tr></thead><tbody><tr><td><strong>稳定性</strong></td><td>⭐⭐⭐⭐⭐ 自动重启</td><td>⭐⭐⭐ 需手动管理</td><td>Docker胜出</td></tr><tr><td><strong>运维成本</strong></td><td>⭐⭐⭐⭐⭐ 一键管理</td><td>⭐⭐ 复杂配置</td><td>Docker胜出</td></tr><tr><td><strong>推理性能</strong></td><td>95-98% (2-5%开销)</td><td>100%</td><td>原生略优</td></tr><tr><td><strong>资源隔离</strong></td><td>⭐⭐⭐⭐⭐ 完全隔离</td><td>⭐ 环境污染</td><td>Docker胜出</td></tr><tr><td><strong>版本管理</strong></td><td>⭐⭐⭐⭐⭐ 秒级回滚</td><td>⭐⭐ 手动切换</td><td>Docker胜出</td></tr><tr><td><strong>迁移便捷性</strong></td><td>⭐⭐⭐⭐⭐ 一键复制</td><td>⭐⭐ 重新配置</td><td>Docker胜出</td></tr><tr><td><strong>学习成本</strong></td><td>⭐⭐⭐ 需懂Docker</td><td>⭐⭐⭐⭐⭐ 简单直接</td><td>原生易上手</td></tr></tbody></table><h5 id="🎯-推荐方案" tabindex="-1"><a class="header-anchor" href="#🎯-推荐方案" aria-hidden="true">#</a> 🎯 推荐方案</h5><p><strong>场景1：长期稳定运行（生产环境）</strong> → <strong>强烈推荐 Docker</strong> 🐳</p><ul><li>✅ 自动重启和故障恢复</li><li>✅ 统一日志管理</li><li>✅ 健康检查和监控</li><li>✅ 2-5%性能损失完全值得（换来99.9%稳定性）</li></ul><p><strong>场景2：临时测试/学习</strong> → 原生安装即可</p><ul><li>✅ 安装简单快速</li><li>✅ 无需学习Docker</li><li>⚠️ 不适合长期运行</li></ul><h5 id="云服务器操作流程-💡" tabindex="-1"><a class="header-anchor" href="#云服务器操作流程-💡" aria-hidden="true">#</a> 云服务器操作流程 💡</h5><p>如果选择在<strong>云服务器</strong>上部署（推荐用于生产环境），操作流程：</p><p><strong>步骤1：使用SSH工具连接云服务器</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 方式1：使用 macOS/Linux 终端</span>
<span class="token function">ssh</span> root@你的云服务器IP
<span class="token comment"># 或</span>
<span class="token function">ssh</span> <span class="token parameter variable">-i</span> ~/.ssh/your-key.pem ubuntu@你的云服务器IP

<span class="token comment"># 方式2：Windows 用户使用 XShell/PuTTY/MobaXterm</span>
<span class="token comment"># - 打开 XShell → 新建会话</span>
<span class="token comment"># - 输入云服务器IP和端口(默认22)</span>
<span class="token comment"># - 输入用户名和密码（或使用SSH密钥）</span>
<span class="token comment"># - 点击连接</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤2：在云服务器上安装Docker</strong></p><p>连接成功后，在SSH终端执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 Docker</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://get.docker.com <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># 添加当前用户到docker组（避免每次sudo）</span>
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-aG</span> <span class="token function">docker</span> <span class="token environment constant">$USER</span>
newgrp <span class="token function">docker</span>  <span class="token comment"># 刷新组权限</span>

<span class="token comment"># 验证安装</span>
<span class="token function">docker</span> <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤3：安装NVIDIA Container Toolkit（vGPU支持）</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">distribution</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">.</span> /etc/os-release<span class="token punctuation">;</span><span class="token builtin class-name">echo</span> $ID$VERSION_ID<span class="token variable">)</span></span>
<span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-L</span> https://nvidia.github.io/nvidia-docker/gpgkey <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-L</span> https://nvidia.github.io/nvidia-docker/<span class="token variable">$distribution</span>/nvidia-docker.list <span class="token operator">|</span> <span class="token punctuation">\\</span>
  <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/nvidia-docker.list

<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> nvidia-container-toolkit
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>

<span class="token comment"># 验证GPU可用</span>
<span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">--gpus</span> all nvidia/cuda:11.8.0-base-ubuntu22.04 nvidia-smi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="安装方式" tabindex="-1"><a class="header-anchor" href="#安装方式" aria-hidden="true">#</a> 安装方式</h5><p>根据你的场景选择：</p><p><strong>方案A：Docker部署（推荐生产环境）</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 拉取镜像</span>
<span class="token function">docker</span> pull ollama/ollama:latest
<span class="token function">docker</span> pull ghcr.io/berriai/litellm:main-latest

<span class="token comment"># 2. 创建docker-compose.yml（见后续章节）</span>
<span class="token comment"># 3. 一键启动</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方案B：原生安装（适合临时测试）</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 安装Ollama</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://ollama.com/install.sh <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># 2. 安装LiteLLM</span>
pip <span class="token function">install</span> litellm<span class="token punctuation">[</span>proxy<span class="token punctuation">]</span>

<span class="token comment"># 3. 启动服务</span>
ollama serve <span class="token operator">&amp;</span>
litellm <span class="token parameter variable">--config</span> litellm_config.yaml <span class="token parameter variable">--port</span> <span class="token number">8000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-部署本地模型推理服务" tabindex="-1"><a class="header-anchor" href="#_2-部署本地模型推理服务" aria-hidden="true">#</a> 2. 部署本地模型推理服务</h3><p>根据你的算力平台，选择对应的部署方式：</p><h4 id="方案-a-ollama-推荐用于英伟达-gpu-mac-m-系列" tabindex="-1"><a class="header-anchor" href="#方案-a-ollama-推荐用于英伟达-gpu-mac-m-系列" aria-hidden="true">#</a> 方案 A：Ollama (推荐用于英伟达 GPU / Mac M 系列)</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 Ollama</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://ollama.com/install.sh <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># 下载模型</span>
ollama pull qwen2.5:7b
ollama pull deepseek-coder:6.7b
ollama pull llama3.1:8b

<span class="token comment"># 验证服务</span>
<span class="token function">curl</span> http://localhost:11434/api/tags
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方案-b-vllm-推荐用于华为升腾-高性能场景" tabindex="-1"><a class="header-anchor" href="#方案-b-vllm-推荐用于华为升腾-高性能场景" aria-hidden="true">#</a> 方案 B：vLLM (推荐用于华为升腾 / 高性能场景)</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 vLLM</span>
pip <span class="token function">install</span> vllm

<span class="token comment"># 启动推理服务</span>
python <span class="token parameter variable">-m</span> vllm.entrypoints.openai.api_server <span class="token punctuation">\\</span>
  <span class="token parameter variable">--model</span> Qwen/Qwen2.5-7B-Instruct <span class="token punctuation">\\</span>
  <span class="token parameter variable">--port</span> <span class="token number">8001</span>

<span class="token comment"># 验证服务</span>
<span class="token function">curl</span> http://localhost:8001/v1/models
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-配置-litellm" tabindex="-1"><a class="header-anchor" href="#_3-配置-litellm" aria-hidden="true">#</a> 3. 配置 LiteLLM</h3><p>创建 <code>litellm_config.yaml</code>，根据你的推理服务配置：</p><h4 id="配置-a-对接-ollama" tabindex="-1"><a class="header-anchor" href="#配置-a-对接-ollama" aria-hidden="true">#</a> 配置 A：对接 Ollama</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">model_list</span><span class="token punctuation">:</span>
  <span class="token comment"># Anthropic 格式的模型映射到 Ollama</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> ollama/qwen2.5<span class="token punctuation">:</span>7b
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">11434</span>

  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>opus<span class="token punctuation">-</span><span class="token number">20240229</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> ollama/deepseek<span class="token punctuation">-</span>coder<span class="token punctuation">:</span>6.7b
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">11434</span>

  <span class="token comment"># 也可以同时支持官方 Claude API（回退方案）</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span>20241022<span class="token punctuation">-</span>official
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> anthropic/claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
      <span class="token key atrule">api_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ANTHROPIC_API_KEY<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置-b-对接-vllm-华为升腾等" tabindex="-1"><a class="header-anchor" href="#配置-b-对接-vllm-华为升腾等" aria-hidden="true">#</a> 配置 B：对接 vLLM (华为升腾等)</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">model_list</span><span class="token punctuation">:</span>
  <span class="token comment"># 映射到 vLLM 服务</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> openai/Qwen/Qwen2.5<span class="token punctuation">-</span>7B<span class="token punctuation">-</span>Instruct
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>8001/v1

  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>opus<span class="token punctuation">-</span><span class="token number">20240229</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> openai/deepseek<span class="token punctuation">-</span>ai/deepseek<span class="token punctuation">-</span>coder<span class="token punctuation">-</span>6.7b<span class="token punctuation">-</span>instruct
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>8001/v1

  <span class="token comment"># 回退到官方 API</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span>20241022<span class="token punctuation">-</span>official
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> anthropic/claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
      <span class="token key atrule">api_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ANTHROPIC_API_KEY<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通用配置-两种方案共用" tabindex="-1"><a class="header-anchor" href="#通用配置-两种方案共用" aria-hidden="true">#</a> 通用配置（两种方案共用）</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 通用配置</span>
<span class="token key atrule">litellm_settings</span><span class="token punctuation">:</span>
  <span class="token comment"># 流式响应支持</span>
  <span class="token key atrule">stream</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

  <span class="token comment"># 成本跟踪</span>
  <span class="token key atrule">success_callback</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;langfuse&quot;</span><span class="token punctuation">]</span>

  <span class="token comment"># 重试策略</span>
  <span class="token key atrule">num_retries</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">request_timeout</span><span class="token punctuation">:</span> <span class="token number">600</span>

  <span class="token comment"># 并发限制</span>
  <span class="token key atrule">max_parallel_requests</span><span class="token punctuation">:</span> <span class="token number">10</span>

  <span class="token comment"># 缓存配置（可选）</span>
  <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">cache_params</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>

<span class="token comment"># 路由策略</span>
<span class="token key atrule">router_settings</span><span class="token punctuation">:</span>
  <span class="token key atrule">routing_strategy</span><span class="token punctuation">:</span> least<span class="token punctuation">-</span>busy
  <span class="token key atrule">model_group_alias</span><span class="token punctuation">:</span>
    <span class="token key atrule">gpt-4</span><span class="token punctuation">:</span> ollama/qwen2.5<span class="token punctuation">:</span>7b
    <span class="token key atrule">gpt-3.5-turbo</span><span class="token punctuation">:</span> ollama/llama3.1<span class="token punctuation">:</span>8b

<span class="token comment"># 监控配置</span>
<span class="token key atrule">general_settings</span><span class="token punctuation">:</span>
  <span class="token key atrule">master_key</span><span class="token punctuation">:</span> sk<span class="token punctuation">-</span><span class="token number">1234</span>  <span class="token comment"># 用于认证的主密钥</span>
  <span class="token key atrule">database_url</span><span class="token punctuation">:</span> sqlite<span class="token punctuation">:</span>///litellm.db  <span class="token comment"># 存储请求日志</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-启动-litellm-代理" tabindex="-1"><a class="header-anchor" href="#_4-启动-litellm-代理" aria-hidden="true">#</a> 4. 启动 LiteLLM 代理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 方式1：直接启动</span>
litellm <span class="token parameter variable">--config</span> litellm_config.yaml <span class="token parameter variable">--port</span> <span class="token number">8000</span>

<span class="token comment"># 方式2：生产模式（使用 gunicorn）</span>
litellm <span class="token parameter variable">--config</span> litellm_config.yaml <span class="token parameter variable">--port</span> <span class="token number">8000</span> <span class="token parameter variable">--num_workers</span> <span class="token number">4</span>

<span class="token comment"># 方式3：Docker 启动</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> litellm-proxy <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">8000</span>:8000 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/litellm_config.yaml:/app/config.yaml <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">ANTHROPIC_API_KEY</span><span class="token operator">=</span><span class="token variable">\${ANTHROPIC_API_KEY}</span> <span class="token punctuation">\\</span>
  ghcr.io/berriai/litellm:main-latest <span class="token punctuation">\\</span>
  <span class="token parameter variable">--config</span> /app/config.yaml <span class="token parameter variable">--port</span> <span class="token number">8000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-配置-claude-cli" tabindex="-1"><a class="header-anchor" href="#_5-配置-claude-cli" aria-hidden="true">#</a> 5. 配置 Claude CLI</h3><p>编辑 <code>~/.claude/config.json</code> 或项目的 <code>.claude/config.json</code>：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;apiKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sk-1234&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 与 litellm_config.yaml 中的 master_key 一致</span>
  <span class="token property">&quot;baseURL&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://localhost:8000/v1&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或使用环境变量：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">ANTHROPIC_BASE_URL</span><span class="token operator">=</span><span class="token string">&quot;http://localhost:8000/v1&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ANTHROPIC_AUTH_TOKEN</span><span class="token operator">=</span><span class="token string">&quot;sk-1234&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-测试集成" tabindex="-1"><a class="header-anchor" href="#_6-测试集成" aria-hidden="true">#</a> 6. 测试集成</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 测试 LiteLLM 代理是否正常</span>
<span class="token function">curl</span> http://localhost:8000/health

<span class="token comment"># 测试模型列表</span>
<span class="token function">curl</span> http://localhost:8000/v1/models <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer sk-1234&quot;</span>

<span class="token comment"># 使用 Claude CLI 测试</span>
claude <span class="token string">&quot;用一句话介绍什么是 LiteLLM&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="⚙️-高级配置" tabindex="-1"><a class="header-anchor" href="#⚙️-高级配置" aria-hidden="true">#</a> ⚙️ 高级配置</h2><h3 id="智能路由策略" tabindex="-1"><a class="header-anchor" href="#智能路由策略" aria-hidden="true">#</a> 智能路由策略</h3><p>LiteLLM 支持多种路由策略：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">router_settings</span><span class="token punctuation">:</span>
  <span class="token comment"># 策略1：最少忙碌（推荐）</span>
  <span class="token key atrule">routing_strategy</span><span class="token punctuation">:</span> least<span class="token punctuation">-</span>busy

  <span class="token comment"># 策略2：轮询</span>
  <span class="token comment"># routing_strategy: simple-shuffle</span>

  <span class="token comment"># 策略3：成本优先</span>
  <span class="token comment"># routing_strategy: cost-based</span>

  <span class="token comment"># 策略4：延迟优先</span>
  <span class="token comment"># routing_strategy: latency-based</span>

  <span class="token comment"># 回退配置</span>
  <span class="token key atrule">allowed_fails</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">cooldown_time</span><span class="token punctuation">:</span> <span class="token number">30</span>  <span class="token comment"># 失败后冷却时间（秒）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模型组和负载均衡" tabindex="-1"><a class="header-anchor" href="#模型组和负载均衡" aria-hidden="true">#</a> 模型组和负载均衡</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">model_list</span><span class="token punctuation">:</span>
  <span class="token comment"># 同一个模型名可以映射到多个后端</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> ollama/qwen2.5<span class="token punctuation">:</span>7b
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">11434</span>

  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> ollama/deepseek<span class="token punctuation">-</span>coder<span class="token punctuation">:</span>6.7b
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">11434</span>

  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> anthropic/claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
      <span class="token key atrule">api_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ANTHROPIC_API_KEY<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="成本跟踪集成" tabindex="-1"><a class="header-anchor" href="#成本跟踪集成" aria-hidden="true">#</a> 成本跟踪集成</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">litellm_settings</span><span class="token punctuation">:</span>
  <span class="token comment"># 使用 Langfuse 跟踪</span>
  <span class="token key atrule">success_callback</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;langfuse&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">langfuse_public_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>LANGFUSE_PUBLIC_KEY<span class="token punctuation">}</span>
  <span class="token key atrule">langfuse_secret_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>LANGFUSE_SECRET_KEY<span class="token punctuation">}</span>
  <span class="token key atrule">langfuse_host</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//cloud.langfuse.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redis-缓存加速" tabindex="-1"><a class="header-anchor" href="#redis-缓存加速" aria-hidden="true">#</a> Redis 缓存加速</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">litellm_settings</span><span class="token punctuation">:</span>
  <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">cache_params</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>REDIS_PASSWORD<span class="token punctuation">}</span>
    <span class="token key atrule">ttl</span><span class="token punctuation">:</span> <span class="token number">3600</span>  <span class="token comment"># 缓存时间（秒）</span>

    <span class="token comment"># 缓存键策略</span>
    <span class="token key atrule">supported_call_types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;completion&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;acompletion&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;embedding&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🐳-生产级-docker-compose-部署" tabindex="-1"><a class="header-anchor" href="#🐳-生产级-docker-compose-部署" aria-hidden="true">#</a> 🐳 生产级 Docker Compose 部署</h2><h3 id="完整的-docker-compose-yml-配置" tabindex="-1"><a class="header-anchor" href="#完整的-docker-compose-yml-配置" aria-hidden="true">#</a> 完整的 docker-compose.yml 配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token comment"># Ollama 模型推理服务</span>
  <span class="token key atrule">ollama</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ollama/ollama<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ollama
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;11434:11434&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ollama<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/root/.ollama
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">reservations</span><span class="token punctuation">:</span>
          <span class="token key atrule">devices</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">driver</span><span class="token punctuation">:</span> nvidia
              <span class="token key atrule">count</span><span class="token punctuation">:</span> all
              <span class="token key atrule">capabilities</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>gpu<span class="token punctuation">]</span>
    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span>
      <span class="token key atrule">test</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;curl&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-f&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://localhost:11434/api/tags&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 30s
      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 10s
      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">3</span>
      <span class="token key atrule">start_period</span><span class="token punctuation">:</span> 40s

  <span class="token comment"># LiteLLM 代理服务</span>
  <span class="token key atrule">litellm</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ghcr.io/berriai/litellm<span class="token punctuation">:</span>main<span class="token punctuation">-</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> litellm<span class="token punctuation">-</span>proxy
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8000:8000&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./litellm_config.yaml<span class="token punctuation">:</span>/app/config.yaml<span class="token punctuation">:</span>ro
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ANTHROPIC_API_KEY=$<span class="token punctuation">{</span>ANTHROPIC_API_KEY<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> OPENAI_API_KEY=$<span class="token punctuation">{</span>OPENAI_API_KEY<span class="token punctuation">}</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>config /app/config.yaml <span class="token punctuation">-</span><span class="token punctuation">-</span>port 8000 <span class="token punctuation">-</span><span class="token punctuation">-</span>num_workers 4
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token key atrule">ollama</span><span class="token punctuation">:</span>
        <span class="token key atrule">condition</span><span class="token punctuation">:</span> service_healthy
    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span>
      <span class="token key atrule">test</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;curl&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-f&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://localhost:8000/health&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 30s
      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 10s
      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">3</span>
      <span class="token key atrule">start_period</span><span class="token punctuation">:</span> 20s

  <span class="token comment"># Redis 缓存（可选，提升性能）</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>7<span class="token punctuation">-</span>alpine
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> litellm<span class="token punctuation">-</span>redis
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;6379:6379&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/data
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>appendonly yes <span class="token punctuation">-</span><span class="token punctuation">-</span>maxmemory 2gb <span class="token punctuation">-</span><span class="token punctuation">-</span>maxmemory<span class="token punctuation">-</span>policy allkeys<span class="token punctuation">-</span>lru
    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span>
      <span class="token key atrule">test</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;redis-cli&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ping&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 10s
      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 5s
      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">3</span>

  <span class="token comment"># Prometheus 监控（可选）</span>
  <span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/prometheus<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> litellm<span class="token punctuation">-</span>prometheus
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9090:9090&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./prometheus.yml<span class="token punctuation">:</span>/etc/prometheus/prometheus.yml<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> prometheus<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/prometheus
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--config.file=/etc/prometheus/prometheus.yml&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.path=/prometheus&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.retention.time=30d&#39;</span>

  <span class="token comment"># Grafana 可视化（可选）</span>
  <span class="token key atrule">grafana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/grafana<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> litellm<span class="token punctuation">-</span>grafana
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3000:3000&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> GF_SECURITY_ADMIN_PASSWORD=admin
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> grafana<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/grafana

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">ollama-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">prometheus-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">grafana-data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用说明" tabindex="-1"><a class="header-anchor" href="#使用说明" aria-hidden="true">#</a> 使用说明</h3><h4 id="_1-启动服务" tabindex="-1"><a class="header-anchor" href="#_1-启动服务" aria-hidden="true">#</a> 1. 启动服务</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动所有服务</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>

<span class="token comment"># 查看服务状态</span>
<span class="token function">docker-compose</span> <span class="token function">ps</span>

<span class="token comment"># 查看实时日志</span>
<span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span>

<span class="token comment"># 查看特定服务日志</span>
<span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> litellm
<span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> ollama
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-下载模型" tabindex="-1"><a class="header-anchor" href="#_2-下载模型" aria-hidden="true">#</a> 2. 下载模型</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在Ollama容器内下载模型</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> ollama ollama pull qwen2.5:7b
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> ollama ollama pull deepseek-coder:6.7b
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> ollama ollama pull llama3.1:8b

<span class="token comment"># 查看已下载的模型</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> ollama ollama list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-验证服务" tabindex="-1"><a class="header-anchor" href="#_3-验证服务" aria-hidden="true">#</a> 3. 验证服务</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 测试Ollama</span>
<span class="token function">curl</span> http://localhost:11434/api/tags

<span class="token comment"># 测试LiteLLM</span>
<span class="token function">curl</span> http://localhost:8000/health

<span class="token comment"># 测试模型列表</span>
<span class="token function">curl</span> http://localhost:8000/v1/models <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer sk-1234&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-日常运维" tabindex="-1"><a class="header-anchor" href="#_4-日常运维" aria-hidden="true">#</a> 4. 日常运维</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重启服务</span>
<span class="token function">docker-compose</span> restart litellm

<span class="token comment"># 停止所有服务</span>
<span class="token function">docker-compose</span> down

<span class="token comment"># 停止并删除数据卷</span>
<span class="token function">docker-compose</span> down <span class="token parameter variable">-v</span>

<span class="token comment"># 更新到最新版本</span>
<span class="token function">docker-compose</span> pull
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>

<span class="token comment"># 查看资源占用</span>
<span class="token function">docker</span> stats
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose-优势" tabindex="-1"><a class="header-anchor" href="#docker-compose-优势" aria-hidden="true">#</a> Docker Compose 优势</h3><p>✅ <strong>自动重启</strong> - 服务崩溃自动恢复 ✅ <strong>健康检查</strong> - 自动检测服务状态 ✅ <strong>依赖管理</strong> - LiteLLM等待Ollama启动完成 ✅ <strong>统一日志</strong> - 集中查看所有服务日志 ✅ <strong>一键部署</strong> - 单条命令启动完整环境 ✅ <strong>资源限制</strong> - 防止单个服务占用过多资源 ✅ <strong>持久化存储</strong> - 数据不会因容器重启丢失</p><h3 id="旧版-docker-compose-精简版" tabindex="-1"><a class="header-anchor" href="#旧版-docker-compose-精简版" aria-hidden="true">#</a> 旧版 Docker Compose（精简版）</h3><p>如果不需要监控，可以使用精简版：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">ollama</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ollama/ollama<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ollama
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;11434:11434&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ollama<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/root/.ollama
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">reservations</span><span class="token punctuation">:</span>
          <span class="token key atrule">devices</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">driver</span><span class="token punctuation">:</span> nvidia
              <span class="token key atrule">count</span><span class="token punctuation">:</span> all
              <span class="token key atrule">capabilities</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>gpu<span class="token punctuation">]</span>

  <span class="token key atrule">litellm</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ghcr.io/berriai/litellm<span class="token punctuation">:</span>main<span class="token punctuation">-</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> litellm<span class="token punctuation">-</span>proxy
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8000:8000&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./litellm_config.yaml<span class="token punctuation">:</span>/app/config.yaml<span class="token punctuation">:</span>ro
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>config /app/config.yaml <span class="token punctuation">-</span><span class="token punctuation">-</span>port 8000 <span class="token punctuation">-</span><span class="token punctuation">-</span>num_workers 4
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ollama

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">ollama-data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="停止服务" tabindex="-1"><a class="header-anchor" href="#停止服务" aria-hidden="true">#</a> 停止服务</h1><p>docker-compose down</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
## 📊 监控和日志

### 内置监控端点

\`\`\`bash
# 健康检查
curl http://localhost:8000/health

# 模型列表
curl http://localhost:8000/v1/models -H &quot;Authorization: Bearer sk-1234&quot;

# 统计信息
curl http://localhost:8000/stats -H &quot;Authorization: Bearer sk-1234&quot;

# 请求日志
curl http://localhost:8000/logs -H &quot;Authorization: Bearer sk-1234&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prometheus-指标" tabindex="-1"><a class="header-anchor" href="#prometheus-指标" aria-hidden="true">#</a> Prometheus 指标</h3><p>LiteLLM 自动暴露 Prometheus 指标：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># prometheus.yml</span>
<span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;litellm&#39;</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;litellm:8000&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/metrics&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可用指标：</p><ul><li><code>litellm_requests_total</code> - 总请求数</li><li><code>litellm_requests_duration_seconds</code> - 请求延迟</li><li><code>litellm_requests_errors_total</code> - 错误数</li><li><code>litellm_model_requests_total</code> - 每个模型的请求数</li><li><code>litellm_cost_total</code> - 总成本</li></ul><h2 id="🔧-故障排查" tabindex="-1"><a class="header-anchor" href="#🔧-故障排查" aria-hidden="true">#</a> 🔧 故障排查</h2><h3 id="问题1-litellm-无法连接到-ollama" tabindex="-1"><a class="header-anchor" href="#问题1-litellm-无法连接到-ollama" aria-hidden="true">#</a> 问题1：LiteLLM 无法连接到 Ollama</h3><p><strong>症状：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Error: Connection refused to http://localhost:11434
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解决方案：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查 Ollama 是否运行</span>
<span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> ollama

<span class="token comment"># 重启 Ollama</span>
ollama serve

<span class="token comment"># 测试连接</span>
<span class="token function">curl</span> http://localhost:11434/api/tags
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="问题2-claude-cli-报错-401-unauthorized" tabindex="-1"><a class="header-anchor" href="#问题2-claude-cli-报错-401-unauthorized" aria-hidden="true">#</a> 问题2：Claude CLI 报错 401 Unauthorized</h3><p><strong>症状：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Error: Unauthorized (401)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解决方案：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 确保 API Key 匹配</span>
<span class="token comment"># 1. 检查 litellm_config.yaml 中的 master_key</span>
<span class="token comment"># 2. 检查 Claude CLI 配置中的 apiKey</span>

<span class="token comment"># 方式1：更新 config.json</span>
<span class="token function">cat</span> ~/.claude/config.json

<span class="token comment"># 方式2：使用环境变量</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ANTHROPIC_AUTH_TOKEN</span><span class="token operator">=</span><span class="token string">&quot;sk-1234&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="问题3-响应速度慢" tabindex="-1"><a class="header-anchor" href="#问题3-响应速度慢" aria-hidden="true">#</a> 问题3：响应速度慢</h3><p><strong>可能原因和解决方案：</strong></p><ol><li><p><strong>模型加载时间长</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 预热模型</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:11434/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;model&quot;: &quot;qwen2.5:7b&quot;, &quot;prompt&quot;: &quot;hello&quot;, &quot;stream&quot;: false}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>启用 Redis 缓存</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">litellm_settings</span><span class="token punctuation">:</span>
  <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">cache_params</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>增加并发处理</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动时增加 worker 数量</span>
litellm <span class="token parameter variable">--config</span> litellm_config.yaml <span class="token parameter variable">--num_workers</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="问题4-流式响应不工作" tabindex="-1"><a class="header-anchor" href="#问题4-流式响应不工作" aria-hidden="true">#</a> 问题4：流式响应不工作</h3><p><strong>解决方案：</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 确保配置中启用了流式响应</span>
<span class="token key atrule">litellm_settings</span><span class="token punctuation">:</span>
  <span class="token key atrule">stream</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

<span class="token comment"># 测试流式 API</span>
curl <span class="token punctuation">-</span>X POST http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>8000/v1/chat/completions \\
  <span class="token key atrule">-H &quot;Authorization</span><span class="token punctuation">:</span> Bearer sk<span class="token punctuation">-</span>1234&quot; \\
  <span class="token key atrule">-H &quot;Content-Type</span><span class="token punctuation">:</span> application/json&quot; \\
  <span class="token punctuation">-</span>d &#39;<span class="token punctuation">{</span>
    <span class="token key atrule">&quot;model&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;claude-3-5-sonnet-20241022&quot;</span><span class="token punctuation">,</span>
    <span class="token key atrule">&quot;messages&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token key atrule">&quot;role&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">&quot;content&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token key atrule">&quot;stream&quot;</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token punctuation">}</span>&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="问题5-docker-容器内无法访问宿主机服务" tabindex="-1"><a class="header-anchor" href="#问题5-docker-容器内无法访问宿主机服务" aria-hidden="true">#</a> 问题5：Docker 容器内无法访问宿主机服务</h3><p><strong>解决方案：</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 使用 host.docker.internal（Mac/Windows）</span>
<span class="token key atrule">model_list</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> ollama/qwen2.5<span class="token punctuation">:</span>7b
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//host.docker.internal<span class="token punctuation">:</span><span class="token number">11434</span>

<span class="token comment"># 或使用网络模式（Linux）</span>
<span class="token comment"># docker-compose.yml</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">litellm</span><span class="token punctuation">:</span>
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> host
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🎯-最佳实践" tabindex="-1"><a class="header-anchor" href="#🎯-最佳实践" aria-hidden="true">#</a> 🎯 最佳实践</h2><h3 id="_1-模型选择策略" tabindex="-1"><a class="header-anchor" href="#_1-模型选择策略" aria-hidden="true">#</a> 1. 模型选择策略</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 按任务类型路由到不同模型</span>
<span class="token key atrule">model_list</span><span class="token punctuation">:</span>
  <span class="token comment"># 代码生成任务</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span>code
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> ollama/deepseek<span class="token punctuation">-</span>coder<span class="token punctuation">:</span>6.7b
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">11434</span>

  <span class="token comment"># 通用对话任务</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span>chat
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> ollama/qwen2.5<span class="token punctuation">:</span>7b
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">11434</span>

  <span class="token comment"># 长文本处理</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>opus<span class="token punctuation">-</span>long
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> ollama/llama3.1<span class="token punctuation">:</span>8b
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">11434</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Claude CLI 中指定模型：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>claude <span class="token parameter variable">--model</span> claude-3-5-sonnet-code <span class="token string">&quot;写一个快速排序算法&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-成本优化" tabindex="-1"><a class="header-anchor" href="#_2-成本优化" aria-hidden="true">#</a> 2. 成本优化</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 优先使用本地模型，失败时回退到云端</span>
<span class="token key atrule">model_list</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> ollama/qwen2.5<span class="token punctuation">:</span>7b
      <span class="token key atrule">api_base</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">11434</span>

  <span class="token punctuation">-</span> <span class="token key atrule">model_name</span><span class="token punctuation">:</span> claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
    <span class="token key atrule">litellm_params</span><span class="token punctuation">:</span>
      <span class="token key atrule">model</span><span class="token punctuation">:</span> anthropic/claude<span class="token punctuation">-</span>3<span class="token punctuation">-</span>5<span class="token punctuation">-</span>sonnet<span class="token punctuation">-</span><span class="token number">20241022</span>
      <span class="token key atrule">api_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ANTHROPIC_API_KEY<span class="token punctuation">}</span>

<span class="token key atrule">router_settings</span><span class="token punctuation">:</span>
  <span class="token key atrule">routing_strategy</span><span class="token punctuation">:</span> cost<span class="token punctuation">-</span>based
  <span class="token key atrule">fallbacks</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">allowed_fails</span><span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-性能优化" tabindex="-1"><a class="header-anchor" href="#_3-性能优化" aria-hidden="true">#</a> 3. 性能优化</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">litellm_settings</span><span class="token punctuation">:</span>
  <span class="token comment"># 启用缓存</span>
  <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">cache_params</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">ttl</span><span class="token punctuation">:</span> <span class="token number">3600</span>

  <span class="token comment"># 批处理</span>
  <span class="token key atrule">batch_size</span><span class="token punctuation">:</span> <span class="token number">5</span>

  <span class="token comment"># 超时控制</span>
  <span class="token key atrule">request_timeout</span><span class="token punctuation">:</span> <span class="token number">300</span>

  <span class="token comment"># 连接池</span>
  <span class="token key atrule">max_parallel_requests</span><span class="token punctuation">:</span> <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-安全配置" tabindex="-1"><a class="header-anchor" href="#_4-安全配置" aria-hidden="true">#</a> 4. 安全配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">general_settings</span><span class="token punctuation">:</span>
  <span class="token comment"># API 密钥管理</span>
  <span class="token key atrule">master_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>LITELLM_MASTER_KEY<span class="token punctuation">}</span>  <span class="token comment"># 从环境变量读取</span>

  <span class="token comment"># 用户认证</span>
  <span class="token key atrule">user_api_key_auth</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

  <span class="token comment"># 速率限制</span>
  <span class="token key atrule">rpm</span><span class="token punctuation">:</span> <span class="token number">100</span>  <span class="token comment"># 每分钟请求数</span>
  <span class="token key atrule">tpm</span><span class="token punctuation">:</span> <span class="token number">100000</span>  <span class="token comment"># 每分钟 token 数</span>

  <span class="token comment"># IP 白名单</span>
  <span class="token key atrule">allowed_ips</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;192.168.1.0/24&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📚-相关资源" tabindex="-1"><a class="header-anchor" href="#📚-相关资源" aria-hidden="true">#</a> 📚 相关资源</h2>`,167),d={href:"https://docs.litellm.ai/",target:"_blank",rel:"noopener noreferrer"},r={href:"https://github.com/BerriAI/litellm",target:"_blank",rel:"noopener noreferrer"},m={href:"https://ollama.com/docs",target:"_blank",rel:"noopener noreferrer"},k={href:"https://docs.claude.com/claude-code",target:"_blank",rel:"noopener noreferrer"},v=t('<h2 id="🎉-总结" tabindex="-1"><a class="header-anchor" href="#🎉-总结" aria-hidden="true">#</a> 🎉 总结</h2><p>通过 LiteLLM 集成本地大模型，您可以：</p><p>✅ <strong>降低成本</strong> - 本地推理节省 99%+ API 费用 ✅ <strong>保护隐私</strong> - 敏感数据完全本地处理 ✅ <strong>提升灵活性</strong> - 统一接口调用多种模型 ✅ <strong>优化性能</strong> - 智能路由和缓存加速 ✅ <strong>无缝集成</strong> - Claude CLI 零改动使用</p><p>现在开始使用 LiteLLM，让 Claude CLI 更强大！🚀</p>',4);function b(h,g){const a=i("ExternalLinkIcon");return p(),c("div",null,[u,n("ul",null,[n("li",null,[s("📖 "),n("a",d,[s("LiteLLM 官方文档"),e(a)])]),n("li",null,[s("🐙 "),n("a",r,[s("LiteLLM GitHub"),e(a)])]),n("li",null,[s("🦙 "),n("a",m,[s("Ollama 文档"),e(a)])]),n("li",null,[s("🤖 "),n("a",k,[s("Claude CLI 文档"),e(a)])])]),v])}const _=l(o,[["render",b],["__file","LITELLM_INTEGRATION.html.vue"]]);export{_ as default};
