import{_ as l,r as t,o as i,c as o,a as n,b as a,d as p,w as c,e as s}from"./app-Zho5QKIq.js";const r={},d=s(`<h1 id="🚀-本地大模型系统快速开始指南" tabindex="-1"><a class="header-anchor" href="#🚀-本地大模型系统快速开始指南" aria-hidden="true">#</a> 🚀 本地大模型系统快速开始指南</h1><p>这是一个5分钟快速上手指南，帮助你在Mac M2上快速部署本地大模型系统。</p><h2 id="📋-前置要求" tabindex="-1"><a class="header-anchor" href="#📋-前置要求" aria-hidden="true">#</a> 📋 前置要求</h2><ul><li>Mac M2/M3 芯片（推荐）</li><li>macOS 12.0 或更高版本</li><li>8GB+ 内存（推荐16GB+）</li><li>20GB+ 可用存储空间</li></ul><h2 id="⚡-一键部署" tabindex="-1"><a class="header-anchor" href="#⚡-一键部署" aria-hidden="true">#</a> ⚡ 一键部署</h2><h3 id="方式1-脚本自动部署-推荐" tabindex="-1"><a class="header-anchor" href="#方式1-脚本自动部署-推荐" aria-hidden="true">#</a> 方式1: 脚本自动部署（推荐）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 下载部署脚本</span>
<span class="token function">curl</span> <span class="token parameter variable">-O</span> https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/setup-local-llm.sh

<span class="token comment"># 2. 给执行权限</span>
<span class="token function">chmod</span> +x setup-local-llm.sh

<span class="token comment"># 3. 一键部署</span>
./setup-local-llm.sh <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式2-手动部署" tabindex="-1"><a class="header-anchor" href="#方式2-手动部署" aria-hidden="true">#</a> 方式2: 手动部署</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 安装 Ollama</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://ollama.com/install.sh <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># 2. 启动 Ollama</span>
ollama serve <span class="token operator">&amp;</span>

<span class="token comment"># 3. 下载模型</span>
ollama pull llama3.1:8b
ollama pull qwen2.5:7b

<span class="token comment"># 4. 安装 Python 依赖</span>
pip <span class="token function">install</span> fastapi uvicorn httpx pydantic psutil

<span class="token comment"># 5. 下载代理服务</span>
<span class="token function">curl</span> <span class="token parameter variable">-O</span> https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/local_llm_proxy.py

<span class="token comment"># 6. 启动代理服务</span>
python local_llm_proxy.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🧪-快速测试" tabindex="-1"><a class="header-anchor" href="#🧪-快速测试" aria-hidden="true">#</a> 🧪 快速测试</h2><p>部署完成后，可以进行以下测试：</p><h3 id="_1-健康检查" tabindex="-1"><a class="header-anchor" href="#_1-健康检查" aria-hidden="true">#</a> 1. 健康检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:8000/health
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>期望输出：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;status&quot;</span><span class="token operator">:</span> <span class="token string">&quot;healthy&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timestamp&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2024-10-28T10:30:00&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;ollama_connected&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;total_requests&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-文本生成测试" tabindex="-1"><a class="header-anchor" href="#_2-文本生成测试" aria-hidden="true">#</a> 2. 文本生成测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;prompt&quot;: &quot;你好，请介绍一下你自己&quot;,
    &quot;model&quot;: &quot;qwen2.5:7b&quot;,
    &quot;temperature&quot;: 0.7,
    &quot;max_tokens&quot;: 100
  }&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-代码审查测试" tabindex="-1"><a class="header-anchor" href="#_3-代码审查测试" aria-hidden="true">#</a> 3. 代码审查测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;prompt&quot;: &quot;请审查以下Python代码：\\ndef hello():\\n    print(\\&quot;Hello World\\&quot;)&quot;,
    &quot;model&quot;: &quot;deepseek-coder:6.7b&quot;,
    &quot;temperature&quot;: 0.3
  }&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔧-基础使用" tabindex="-1"><a class="header-anchor" href="#🔧-基础使用" aria-hidden="true">#</a> 🔧 基础使用</h2><h3 id="python集成示例" tabindex="-1"><a class="header-anchor" href="#python集成示例" aria-hidden="true">#</a> Python集成示例</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> httpx
<span class="token keyword">import</span> asyncio

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">call_local_llm</span><span class="token punctuation">(</span>prompt<span class="token punctuation">,</span> model<span class="token operator">=</span><span class="token string">&quot;llama3.1:8b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">async</span> <span class="token keyword">with</span> httpx<span class="token punctuation">.</span>AsyncClient<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> client<span class="token punctuation">:</span>
        response <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>post<span class="token punctuation">(</span>
            <span class="token string">&quot;http://localhost:8000/api/generate&quot;</span><span class="token punctuation">,</span>
            json<span class="token operator">=</span><span class="token punctuation">{</span>
                <span class="token string">&quot;prompt&quot;</span><span class="token punctuation">:</span> prompt<span class="token punctuation">,</span>
                <span class="token string">&quot;model&quot;</span><span class="token punctuation">:</span> model<span class="token punctuation">,</span>
                <span class="token string">&quot;temperature&quot;</span><span class="token punctuation">:</span> <span class="token number">0.7</span><span class="token punctuation">,</span>
                <span class="token string">&quot;max_tokens&quot;</span><span class="token punctuation">:</span> <span class="token number">500</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
        <span class="token keyword">return</span> response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 使用示例</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    result <span class="token operator">=</span> <span class="token keyword">await</span> call_local_llm<span class="token punctuation">(</span><span class="token string">&quot;写一个Python的快速排序算法&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">[</span><span class="token string">&quot;response&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="curl命令示例" tabindex="-1"><a class="header-anchor" href="#curl命令示例" aria-hidden="true">#</a> curl命令示例</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 中文对话</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;prompt&quot;: &quot;解释什么是机器学习&quot;, &quot;model&quot;: &quot;qwen2.5:7b&quot;}&#39;</span>

<span class="token comment"># 代码生成</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;prompt&quot;: &quot;写一个JavaScript的冒泡排序&quot;, &quot;model&quot;: &quot;deepseek-coder:6.7b&quot;}&#39;</span>

<span class="token comment"># 文本翻译</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;prompt&quot;: &quot;翻译成英文：今天天气很好&quot;, &quot;model&quot;: &quot;qwen2.5:7b&quot;}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📊-监控面板" tabindex="-1"><a class="header-anchor" href="#📊-监控面板" aria-hidden="true">#</a> 📊 监控面板</h2><p>访问以下地址查看系统状态：</p><ul><li><strong>API文档</strong>: http://localhost:8000/docs</li><li><strong>系统状态</strong>: http://localhost:8000/api/status</li><li><strong>模型列表</strong>: http://localhost:8000/api/models</li></ul><h2 id="🎛️-常用管理命令" tabindex="-1"><a class="header-anchor" href="#🎛️-常用管理命令" aria-hidden="true">#</a> 🎛️ 常用管理命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看运行状态</span>
./setup-local-llm.sh monitor

<span class="token comment"># 启动服务</span>
./setup-local-llm.sh start

<span class="token comment"># 停止服务</span>
./setup-local-llm.sh stop

<span class="token comment"># 运行测试</span>
./setup-local-llm.sh <span class="token builtin class-name">test</span>

<span class="token comment"># 清理系统</span>
./setup-local-llm.sh clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔄-切换模型" tabindex="-1"><a class="header-anchor" href="#🔄-切换模型" aria-hidden="true">#</a> 🔄 切换模型</h2><p>系统支持智能模型路由，也可以手动指定：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用 Llama 3.1（通用任务）</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;prompt&quot;: &quot;你好&quot;, &quot;model&quot;: &quot;llama3.1:8b&quot;}&#39;</span>

<span class="token comment"># 使用 Qwen 2.5（中文优化）</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;prompt&quot;: &quot;写一首古诗&quot;, &quot;model&quot;: &quot;qwen2.5:7b&quot;}&#39;</span>

<span class="token comment"># 使用 DeepSeek Coder（代码专用）</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;prompt&quot;: &quot;解释这段代码&quot;, &quot;model&quot;: &quot;deepseek-coder:6.7b&quot;}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="⚠️-常见问题" tabindex="-1"><a class="header-anchor" href="#⚠️-常见问题" aria-hidden="true">#</a> ⚠️ 常见问题</h2><h3 id="_1-端口被占用" tabindex="-1"><a class="header-anchor" href="#_1-端口被占用" aria-hidden="true">#</a> 1. 端口被占用</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看端口占用</span>
<span class="token function">lsof</span> <span class="token parameter variable">-i</span> :11434
<span class="token function">lsof</span> <span class="token parameter variable">-i</span> :8000

<span class="token comment"># 更改端口</span>
python local_llm_proxy.py <span class="token parameter variable">--port</span> <span class="token number">8001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-内存不足" tabindex="-1"><a class="header-anchor" href="#_2-内存不足" aria-hidden="true">#</a> 2. 内存不足</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用量化模型</span>
ollama pull llama3.1:8b-q4_0

<span class="token comment"># 减少并发数</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_NUM_PARALLEL</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-响应慢" tabindex="-1"><a class="header-anchor" href="#_3-响应慢" aria-hidden="true">#</a> 3. 响应慢</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查GPU使用</span>
system_profiler SPDisplaysDataType

<span class="token comment"># 优化设置</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_GPU_LAYERS</span><span class="token operator">=</span><span class="token number">99</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📈-性能调优" tabindex="-1"><a class="header-anchor" href="#📈-性能调优" aria-hidden="true">#</a> 📈 性能调优</h2><h3 id="内存优化" tabindex="-1"><a class="header-anchor" href="#内存优化" aria-hidden="true">#</a> 内存优化</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 8GB 内存配置</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_MAX_LOADED_MODELS</span><span class="token operator">=</span><span class="token number">1</span>
ollama pull llama3.1:8b-q4_0

<span class="token comment"># 16GB 内存配置</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_MAX_LOADED_MODELS</span><span class="token operator">=</span><span class="token number">2</span>
ollama pull llama3.1:8b
ollama pull qwen2.5:7b

<span class="token comment"># 24GB+ 内存配置</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_MAX_LOADED_MODELS</span><span class="token operator">=</span><span class="token number">3</span>
ollama pull llama3.1:8b
ollama pull qwen2.5:14b
ollama pull deepseek-coder:6.7b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="并发优化" tabindex="-1"><a class="header-anchor" href="#并发优化" aria-hidden="true">#</a> 并发优化</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 根据CPU核心数调整</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_NUM_PARALLEL</span><span class="token operator">=</span><span class="token number">2</span>  <span class="token comment"># M2 推荐值</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_NUM_PARALLEL</span><span class="token operator">=</span><span class="token number">4</span>  <span class="token comment"># M2 Pro/Max 推荐值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔗-下一步" tabindex="-1"><a class="header-anchor" href="#🔗-下一步" aria-hidden="true">#</a> 🔗 下一步</h2>`,45),u=n("li",null,[n("strong",null,"集成到现有项目"),a(": 查看 "),n("a",{href:"./claude_tools_integration.py"},"Claude Tools集成指南")],-1),m=n("li",null,[n("strong",null,"Docker部署"),a(": 使用 "),n("a",{href:"./docker-compose.yml"},"docker-compose.yml"),a(" 进行容器化部署")],-1),v=n("strong",null,"生产环境",-1),b=n("li",null,[n("strong",null,"监控运维"),a(": 配置 Prometheus + Grafana 监控")],-1),h=s('<h2 id="💡-使用建议" tabindex="-1"><a class="header-anchor" href="#💡-使用建议" aria-hidden="true">#</a> 💡 使用建议</h2><ol><li><strong>任务分配</strong>：复杂推理使用Claude API，简单任务使用本地模型</li><li><strong>模型选择</strong>：代码相关用DeepSeek，中文任务用Qwen，其他用Llama</li><li><strong>参数调优</strong>：代码生成用低temperature(0.1-0.3)，创意写作用高temperature(0.7-0.9)</li><li><strong>批量处理</strong>：使用本地模型处理大量重复性任务，节省API费用</li></ol><hr><p>🎉 <strong>恭喜！你已经成功部署了本地大模型系统！</strong></p><p>现在可以享受高性能、低成本、隐私安全的AI工具链了。</p>',5);function k(g,q){const e=t("RouterLink");return i(),o("div",null,[d,n("ol",null,[u,m,n("li",null,[v,a(": 参考 "),p(e,{to:"/ai-tools/LOCAL_LLM_ARCHITECTURE.html"},{default:c(()=>[a("完整架构文档")]),_:1})]),b]),h])}const f=l(r,[["render",k],["__file","QUICKSTART.html.vue"]]);export{f as default};
