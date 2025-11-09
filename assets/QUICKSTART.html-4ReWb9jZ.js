import{_ as l,r as i,o as t,c as o,a as n,b as s,d as c,w as p,e as a}from"./app-hxuvpabZ.js";const r={},d=a(`<h1 id="🐳-claude-tools-本地大模型-docker-快速部署指南" tabindex="-1"><a class="header-anchor" href="#🐳-claude-tools-本地大模型-docker-快速部署指南" aria-hidden="true">#</a> 🐳 Claude Tools + 本地大模型 Docker 快速部署指南</h1><p>这是一个<strong>5分钟快速部署指南</strong>，帮助你通过 Docker 容器化方式部署 Claude Tools 与本地大模型集成系统。</p><h2 id="📋-前置要求" tabindex="-1"><a class="header-anchor" href="#📋-前置要求" aria-hidden="true">#</a> 📋 前置要求</h2><h3 id="系统要求" tabindex="-1"><a class="header-anchor" href="#系统要求" aria-hidden="true">#</a> 系统要求</h3><ul><li><strong>Docker Desktop</strong> 4.20+</li><li><strong>内存</strong>: 8GB+（推荐16GB+）</li><li><strong>存储</strong>: 20GB+ 可用空间</li><li><strong>平台</strong>: Mac M1/M2、Linux x86_64、Windows WSL2</li></ul><h3 id="docker-环境检查" tabindex="-1"><a class="header-anchor" href="#docker-环境检查" aria-hidden="true">#</a> Docker 环境检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查 Docker 版本</span>
<span class="token function">docker</span> <span class="token parameter variable">--version</span>
<span class="token function">docker</span> compose version

<span class="token comment"># 检查系统资源</span>
<span class="token function">docker</span> system <span class="token function">df</span>
<span class="token function">docker</span> system info <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;Total Memory&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="⚡-一键-docker-部署" tabindex="-1"><a class="header-anchor" href="#⚡-一键-docker-部署" aria-hidden="true">#</a> ⚡ 一键 Docker 部署</h2><h3 id="方式1-使用预构建镜像-推荐" tabindex="-1"><a class="header-anchor" href="#方式1-使用预构建镜像-推荐" aria-hidden="true">#</a> 方式1: 使用预构建镜像（推荐）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 下载配置文件</span>
<span class="token function">curl</span> <span class="token parameter variable">-O</span> https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/docker-compose.yml

<span class="token comment"># 2. 一键启动 AI 工具链</span>
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>

<span class="token comment"># 3. 查看启动状态</span>
<span class="token function">docker</span> compose <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式2-从源码构建" tabindex="-1"><a class="header-anchor" href="#方式2-从源码构建" aria-hidden="true">#</a> 方式2: 从源码构建</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 克隆项目</span>
<span class="token function">git</span> clone https://github.com/youweichen0208/YC-Tech-Blog.git
<span class="token builtin class-name">cd</span> YC-Tech-Blog/src/ai-tools/code

<span class="token comment"># 2. 构建并启动</span>
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span> <span class="token parameter variable">--build</span>

<span class="token comment"># 3. 等待模型下载完成</span>
<span class="token function">docker</span> compose logs <span class="token parameter variable">-f</span> ollama
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📊-部署验证" tabindex="-1"><a class="header-anchor" href="#📊-部署验证" aria-hidden="true">#</a> 📊 部署验证</h2><h3 id="_1-服务健康检查" tabindex="-1"><a class="header-anchor" href="#_1-服务健康检查" aria-hidden="true">#</a> 1. 服务健康检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查所有容器状态</span>
<span class="token function">docker</span> compose <span class="token function">ps</span>

<span class="token comment"># 验证 API 服务</span>
<span class="token function">curl</span> http://localhost:8000/health

<span class="token comment"># 期望输出</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;status&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;healthy&quot;</span>,
  <span class="token string">&quot;claude_tools_ready&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;ollama_connected&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;models_loaded&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;llama3.1:8b&quot;</span>, <span class="token string">&quot;qwen2.5:7b&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-claude-tools-集成测试" tabindex="-1"><a class="header-anchor" href="#_2-claude-tools-集成测试" aria-hidden="true">#</a> 2. Claude Tools 集成测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 测试代码审查工具</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/claude-tools/code-review <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;code&quot;: &quot;def hello():\\n    print(\\&quot;Hello World\\&quot;)&quot;,
    &quot;language&quot;: &quot;python&quot;
  }&#39;</span>

<span class="token comment"># 测试翻译工具</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/claude-tools/translate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;text&quot;: &quot;Hello, how are you?&quot;,
    &quot;target_lang&quot;: &quot;chinese&quot;
  }&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-模型直接调用测试" tabindex="-1"><a class="header-anchor" href="#_3-模型直接调用测试" aria-hidden="true">#</a> 3. 模型直接调用测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 测试智能路由</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;prompt&quot;: &quot;写一个Python快速排序算法&quot;,
    &quot;task_type&quot;: &quot;code&quot;,
    &quot;temperature&quot;: 0.2
  }&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🤖-claude-tools-集成使用" tabindex="-1"><a class="header-anchor" href="#🤖-claude-tools-集成使用" aria-hidden="true">#</a> 🤖 Claude Tools 集成使用</h2><h3 id="在-claude-code-中使用本地大模型" tabindex="-1"><a class="header-anchor" href="#在-claude-code-中使用本地大模型" aria-hidden="true">#</a> 在 Claude Code 中使用本地大模型</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// Claude Tools 配置</span>
<span class="token keyword">const</span> localLLMTool <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&quot;local_llm&quot;</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">&quot;调用本地Docker部署的大模型&quot;</span><span class="token punctuation">,</span>
  endpoint<span class="token operator">:</span> <span class="token string">&quot;http://localhost:8000&quot;</span><span class="token punctuation">,</span>
  timeout<span class="token operator">:</span> <span class="token number">30000</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 代码审查示例</span>
<span class="token keyword">const</span> reviewResult <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">callLocalLLM</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  tool<span class="token operator">:</span> <span class="token string">&quot;code_review&quot;</span><span class="token punctuation">,</span>
  code<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    def fibonacci(n):
        if n &lt;= 1:
            return n
        return fibonacci(n-1) + fibonacci(n-2)
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  language<span class="token operator">:</span> <span class="token string">&quot;python&quot;</span><span class="token punctuation">,</span>
  focus<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;performance&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;security&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 翻译助手示例</span>
<span class="token keyword">const</span> translation <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">callLocalLLM</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  tool<span class="token operator">:</span> <span class="token string">&quot;translate&quot;</span><span class="token punctuation">,</span>
  text<span class="token operator">:</span> <span class="token string">&quot;Machine Learning is transforming the world&quot;</span><span class="token punctuation">,</span>
  target<span class="token operator">:</span> <span class="token string">&quot;chinese&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 技术文档生成</span>
<span class="token keyword">const</span> documentation <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">callLocalLLM</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  tool<span class="token operator">:</span> <span class="token string">&quot;document&quot;</span><span class="token punctuation">,</span>
  code<span class="token operator">:</span> functionCode<span class="token punctuation">,</span>
  style<span class="token operator">:</span> <span class="token string">&quot;detailed&quot;</span><span class="token punctuation">,</span>
  format<span class="token operator">:</span> <span class="token string">&quot;markdown&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-容器管理" tabindex="-1"><a class="header-anchor" href="#docker-容器管理" aria-hidden="true">#</a> Docker 容器管理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看容器状态</span>
<span class="token function">docker</span> compose <span class="token function">ps</span>

<span class="token comment"># 查看日志</span>
<span class="token function">docker</span> compose logs local-llm-proxy
<span class="token function">docker</span> compose logs ollama

<span class="token comment"># 重启服务</span>
<span class="token function">docker</span> compose restart local-llm-proxy

<span class="token comment"># 更新模型</span>
<span class="token function">docker</span> compose <span class="token builtin class-name">exec</span> ollama ollama pull qwen2.5:14b

<span class="token comment"># 扩容服务（如需要）</span>
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span> <span class="token parameter variable">--scale</span> local-llm-proxy<span class="token operator">=</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📊-监控与管理" tabindex="-1"><a class="header-anchor" href="#📊-监控与管理" aria-hidden="true">#</a> 📊 监控与管理</h2><h3 id="访问监控面板" tabindex="-1"><a class="header-anchor" href="#访问监控面板" aria-hidden="true">#</a> 访问监控面板</h3><ul><li><strong>API 文档</strong>: http://localhost:8000/docs</li><li><strong>Prometheus 监控</strong>: http://localhost:9090</li><li><strong>Grafana 仪表板</strong>: http://localhost:3000 (admin/admin)</li><li><strong>容器状态</strong>: <code>docker compose ps</code></li></ul><h3 id="性能调优配置" tabindex="-1"><a class="header-anchor" href="#性能调优配置" aria-hidden="true">#</a> 性能调优配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 优化内存使用</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_NUM_PARALLEL</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_MAX_LOADED_MODELS</span><span class="token operator">=</span><span class="token number">2</span>

<span class="token comment"># 优化并发处理</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">PROXY_WORKERS</span><span class="token operator">=</span><span class="token number">4</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">PROXY_MAX_REQUESTS</span><span class="token operator">=</span><span class="token number">100</span>

<span class="token comment"># 重新启动以应用配置</span>
<span class="token function">docker</span> compose down <span class="token operator">&amp;&amp;</span> <span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔄-切换模型" tabindex="-1"><a class="header-anchor" href="#🔄-切换模型" aria-hidden="true">#</a> 🔄 切换模型</h2><p>系统支持智能模型路由，也可以手动指定：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用 Llama 3.1（通用任务）</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔗-下一步" tabindex="-1"><a class="header-anchor" href="#🔗-下一步" aria-hidden="true">#</a> 🔗 下一步</h2>`,45),u=n("li",null,[n("strong",null,"集成到现有项目"),s(": 查看 "),n("a",{href:"./claude_tools_integration.py"},"Claude Tools集成指南")],-1),m=n("li",null,[n("strong",null,"Docker部署"),s(": 使用 "),n("a",{href:"./docker-compose.yml"},"docker-compose.yml"),s(" 进行容器化部署")],-1),v=n("strong",null,"生产环境",-1),b=n("li",null,[n("strong",null,"监控运维"),s(": 配置 Prometheus + Grafana 监控")],-1),k=a('<h2 id="💡-使用建议" tabindex="-1"><a class="header-anchor" href="#💡-使用建议" aria-hidden="true">#</a> 💡 使用建议</h2><ol><li><strong>任务分配</strong>：复杂推理使用Claude API，简单任务使用本地模型</li><li><strong>模型选择</strong>：代码相关用DeepSeek，中文任务用Qwen，其他用Llama</li><li><strong>参数调优</strong>：代码生成用低temperature(0.1-0.3)，创意写作用高temperature(0.7-0.9)</li><li><strong>批量处理</strong>：使用本地模型处理大量重复性任务，节省API费用</li></ol><hr><p>🎉 <strong>恭喜！你已经成功部署了本地大模型系统！</strong></p><p>现在可以享受高性能、低成本、隐私安全的AI工具链了。</p>',5);function h(g,q){const e=i("RouterLink");return t(),o("div",null,[d,n("ol",null,[u,m,n("li",null,[v,s(": 参考 "),c(e,{to:"/ai-tools/LOCAL_LLM_ARCHITECTURE.html"},{default:p(()=>[s("完整架构文档")]),_:1})]),b]),k])}const _=l(r,[["render",h],["__file","QUICKSTART.html.vue"]]);export{_ as default};
