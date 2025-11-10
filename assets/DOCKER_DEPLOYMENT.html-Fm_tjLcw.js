import{_ as i,r as t,o as c,c as o,a as n,d as a,w as e,e as p,b as l}from"./app-3SOt1bnI.js";const r={},d=p(`<h1 id="🐳-docker-部署完整指南" tabindex="-1"><a class="header-anchor" href="#🐳-docker-部署完整指南" aria-hidden="true">#</a> 🐳 Docker 部署完整指南</h1><p>本指南详细介绍如何使用Docker容器化部署Claude Tools + 本地大模型集成系统。</p><h2 id="🎯-部署概览" tabindex="-1"><a class="header-anchor" href="#🎯-部署概览" aria-hidden="true">#</a> 🎯 部署概览</h2><h3 id="系统架构" tabindex="-1"><a class="header-anchor" href="#系统架构" aria-hidden="true">#</a> 系统架构</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TB
    <span class="token keyword">subgraph</span> <span class="token string">&quot;🐳 Docker 容器集群&quot;</span>
        A<span class="token text string">[&quot;claude-local-llm-proxy&lt;br/&gt;📡 代理服务容器&lt;br/&gt;Port: 8000&quot;]</span> <span class="token arrow operator">--&gt;</span> B<span class="token text string">[&quot;claude-ollama&lt;br/&gt;🧠 模型运行容器&lt;br/&gt;Port: 11434&quot;]</span>
        A <span class="token arrow operator">--&gt;</span> C<span class="token text string">[&quot;claude-redis&lt;br/&gt;⚡ 缓存容器&lt;br/&gt;Port: 6379&quot;]</span>
        A <span class="token arrow operator">--&gt;</span> D<span class="token text string">[&quot;claude-prometheus&lt;br/&gt;📊 监控容器&lt;br/&gt;Port: 9090&quot;]</span>
        D <span class="token arrow operator">--&gt;</span> E<span class="token text string">[&quot;claude-grafana&lt;br/&gt;📈 可视化容器&lt;br/&gt;Port: 3000&quot;]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;🤖 Claude Tools&quot;</span>
        F<span class="token text string">[&quot;Claude Code CLI&lt;br/&gt;🖥️ 用户界面&quot;]</span> <span class="token arrow operator">--&gt;</span> A
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;🧠 AI 模型&quot;</span>
        B <span class="token arrow operator">--&gt;</span> G<span class="token text string">[&quot;Llama 3.1 8B&lt;br/&gt;💬 通用助手&quot;]</span>
        B <span class="token arrow operator">--&gt;</span> H<span class="token text string">[&quot;Qwen 2.5 7B&lt;br/&gt;🇨🇳 中文专家&quot;]</span>
        B <span class="token arrow operator">--&gt;</span> I<span class="token text string">[&quot;DeepSeek Coder 6.7B&lt;br/&gt;💻 代码专家&quot;]</span>
    <span class="token keyword">end</span>

    <span class="token comment">%% 样式定义</span>
    <span class="token keyword">classDef</span> containerStyle <span class="token style"><span class="token property">fill</span><span class="token operator">:</span>#e8f5e8<span class="token punctuation">,</span><span class="token property">stroke</span><span class="token operator">:</span>#2e7d32<span class="token punctuation">,</span><span class="token property">stroke-width</span><span class="token operator">:</span>2px<span class="token punctuation">,</span><span class="token property">color</span><span class="token operator">:</span>#000</span>
    <span class="token keyword">classDef</span> claudeStyle <span class="token style"><span class="token property">fill</span><span class="token operator">:</span>#e1f5fe<span class="token punctuation">,</span><span class="token property">stroke</span><span class="token operator">:</span>#01579b<span class="token punctuation">,</span><span class="token property">stroke-width</span><span class="token operator">:</span>2px<span class="token punctuation">,</span><span class="token property">color</span><span class="token operator">:</span>#000</span>
    <span class="token keyword">classDef</span> modelStyle <span class="token style"><span class="token property">fill</span><span class="token operator">:</span>#fff3e0<span class="token punctuation">,</span><span class="token property">stroke</span><span class="token operator">:</span>#f57c00<span class="token punctuation">,</span><span class="token property">stroke-width</span><span class="token operator">:</span>2px<span class="token punctuation">,</span><span class="token property">color</span><span class="token operator">:</span>#000</span>

    <span class="token comment">%% 应用样式</span>
    <span class="token keyword">class</span> A,B,C,D,E containerStyle
    <span class="token keyword">class</span> F claudeStyle
    <span class="token keyword">class</span> G,H,I modelStyle
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="核心优势" tabindex="-1"><a class="header-anchor" href="#核心优势" aria-hidden="true">#</a> 核心优势</h3><ul><li>🚀 <strong>一键部署</strong>: 一条命令启动完整AI工具链</li><li>🔄 <strong>零配置</strong>: 预配置优化，开箱即用</li><li>📊 <strong>完整监控</strong>: Prometheus + Grafana 监控栈</li><li>🔧 <strong>自动扩容</strong>: 基于负载自动调整资源</li></ul><h2 id="📋-系统要求" tabindex="-1"><a class="header-anchor" href="#📋-系统要求" aria-hidden="true">#</a> 📋 系统要求</h2><h3 id="最低配置" tabindex="-1"><a class="header-anchor" href="#最低配置" aria-hidden="true">#</a> 最低配置</h3><ul><li><strong>Docker Desktop</strong>: 4.20+</li><li><strong>内存</strong>: 8GB（推荐16GB+）</li><li><strong>存储</strong>: 20GB可用空间</li><li><strong>平台</strong>: Mac M1/M2、Linux x86_64、Windows WSL2</li></ul><h3 id="推荐配置" tabindex="-1"><a class="header-anchor" href="#推荐配置" aria-hidden="true">#</a> 推荐配置</h3><ul><li><strong>内存</strong>: 16GB+</li><li><strong>存储</strong>: 50GB+ SSD</li><li><strong>网络</strong>: 稳定的互联网连接（首次下载模型）</li></ul><h2 id="⚡-快速部署" tabindex="-1"><a class="header-anchor" href="#⚡-快速部署" aria-hidden="true">#</a> ⚡ 快速部署</h2><h3 id="方式1-预构建镜像部署-推荐" tabindex="-1"><a class="header-anchor" href="#方式1-预构建镜像部署-推荐" aria-hidden="true">#</a> 方式1: 预构建镜像部署（推荐）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建项目目录</span>
<span class="token function">mkdir</span> claude-local-llm <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> claude-local-llm

<span class="token comment"># 2. 下载配置文件</span>
<span class="token function">curl</span> <span class="token parameter variable">-O</span> https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/docker-compose.yml

<span class="token comment"># 3. 创建数据目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> data/ollama logs config

<span class="token comment"># 4. 一键启动所有服务</span>
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>

<span class="token comment"># 5. 查看启动状态</span>
<span class="token function">docker</span> compose <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式2-从源码构建" tabindex="-1"><a class="header-anchor" href="#方式2-从源码构建" aria-hidden="true">#</a> 方式2: 从源码构建</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 克隆项目</span>
<span class="token function">git</span> clone https://github.com/youweichen0208/YC-Tech-Blog.git
<span class="token builtin class-name">cd</span> YC-Tech-Blog/src/ai-tools/code

<span class="token comment"># 2. 构建并启动</span>
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span> <span class="token parameter variable">--build</span>

<span class="token comment"># 3. 等待模型下载（首次约10-15分钟）</span>
<span class="token function">docker</span> compose logs <span class="token parameter variable">-f</span> claude-ollama
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📊-部署验证" tabindex="-1"><a class="header-anchor" href="#📊-部署验证" aria-hidden="true">#</a> 📊 部署验证</h2><h3 id="_1-容器状态检查" tabindex="-1"><a class="header-anchor" href="#_1-容器状态检查" aria-hidden="true">#</a> 1. 容器状态检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看所有容器状态</span>
<span class="token function">docker</span> compose <span class="token function">ps</span>

<span class="token comment"># 期望输出：所有服务都是 &quot;Up&quot; 状态</span>
<span class="token comment"># NAME                    IMAGE                 STATUS</span>
<span class="token comment"># claude-local-llm-proxy  local-llm-proxy       Up 2 minutes (healthy)</span>
<span class="token comment"># claude-ollama           ollama/ollama:latest  Up 3 minutes (healthy)</span>
<span class="token comment"># claude-redis            redis:7-alpine        Up 3 minutes (healthy)</span>
<span class="token comment"># claude-prometheus       prom/prometheus       Up 2 minutes (healthy)</span>
<span class="token comment"># claude-grafana          grafana/grafana       Up 1 minute (healthy)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-服务健康检查" tabindex="-1"><a class="header-anchor" href="#_2-服务健康检查" aria-hidden="true">#</a> 2. 服务健康检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># API服务健康检查</span>
<span class="token function">curl</span> http://localhost:8000/health

<span class="token comment"># 期望输出</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;status&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;healthy&quot;</span>,
  <span class="token string">&quot;claude_tools_ready&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;ollama_connected&quot;</span><span class="token builtin class-name">:</span> true,
  <span class="token string">&quot;models_loaded&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;llama3.1:8b&quot;</span>, <span class="token string">&quot;qwen2.5:7b&quot;</span>, <span class="token string">&quot;deepseek-coder:6.7b&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-功能验证测试" tabindex="-1"><a class="header-anchor" href="#_3-功能验证测试" aria-hidden="true">#</a> 3. 功能验证测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 测试智能路由</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/api/generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;prompt&quot;: &quot;写一个Python冒泡排序算法&quot;,
    &quot;task_type&quot;: &quot;code&quot;,
    &quot;temperature&quot;: 0.2
  }&#39;</span>

<span class="token comment"># 测试Claude Tools集成</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8000/claude-tools/code-review <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;code&quot;: &quot;def hello():\\n    print(\\&quot;Hello World\\&quot;)&quot;,
    &quot;language&quot;: &quot;python&quot;
  }&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🎛️-高级配置" tabindex="-1"><a class="header-anchor" href="#🎛️-高级配置" aria-hidden="true">#</a> 🎛️ 高级配置</h2><h3 id="环境变量配置" tabindex="-1"><a class="header-anchor" href="#环境变量配置" aria-hidden="true">#</a> 环境变量配置</h3><p>创建 <code>.env</code> 文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建环境配置文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> .env <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;
# 基础配置
OLLAMA_NUM_PARALLEL=2
OLLAMA_MAX_LOADED_MODELS=3
PROXY_WORKERS=4

# Claude Tools配置
CLAUDE_TOOLS_ENABLED=true
CORS_ORIGINS=*

# 监控配置
PROMETHEUS_ENABLED=true
GRAFANA_ADMIN_PASSWORD=claude123

# 性能优化
REDIS_MAX_MEMORY=512mb
OLLAMA_FLASH_ATTENTION=1
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="资源限制配置" tabindex="-1"><a class="header-anchor" href="#资源限制配置" aria-hidden="true">#</a> 资源限制配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># docker-compose.override.yml</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">claude-ollama</span><span class="token punctuation">:</span>
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">limits</span><span class="token punctuation">:</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 8G      <span class="token comment"># 根据你的内存调整</span>
          <span class="token key atrule">cpus</span><span class="token punctuation">:</span> <span class="token string">&#39;4.0&#39;</span>     <span class="token comment"># 根据你的CPU调整</span>
        <span class="token key atrule">reservations</span><span class="token punctuation">:</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 4G
          <span class="token key atrule">cpus</span><span class="token punctuation">:</span> <span class="token string">&#39;2.0&#39;</span>

  <span class="token key atrule">claude-local-llm-proxy</span><span class="token punctuation">:</span>
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">limits</span><span class="token punctuation">:</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 2G
          <span class="token key atrule">cpus</span><span class="token punctuation">:</span> <span class="token string">&#39;2.0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gpu支持配置-nvidia" tabindex="-1"><a class="header-anchor" href="#gpu支持配置-nvidia" aria-hidden="true">#</a> GPU支持配置（NVIDIA）</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># docker-compose.gpu.yml</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">claude-ollama</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ollama/ollama<span class="token punctuation">:</span>latest
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">reservations</span><span class="token punctuation">:</span>
          <span class="token key atrule">devices</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">driver</span><span class="token punctuation">:</span> nvidia
              <span class="token key atrule">count</span><span class="token punctuation">:</span> <span class="token number">1</span>
              <span class="token key atrule">capabilities</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>gpu<span class="token punctuation">]</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> NVIDIA_VISIBLE_DEVICES=all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用GPU配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.yml <span class="token parameter variable">-f</span> docker-compose.gpu.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="📈-监控和运维" tabindex="-1"><a class="header-anchor" href="#📈-监控和运维" aria-hidden="true">#</a> 📈 监控和运维</h2><h3 id="访问监控面板" tabindex="-1"><a class="header-anchor" href="#访问监控面板" aria-hidden="true">#</a> 访问监控面板</h3><table><thead><tr><th>服务</th><th>地址</th><th>用户名/密码</th><th>用途</th></tr></thead><tbody><tr><td>API文档</td><td>http://localhost:8000/docs</td><td>-</td><td>API接口文档</td></tr><tr><td>Prometheus</td><td>http://localhost:9090</td><td>-</td><td>监控数据收集</td></tr><tr><td>Grafana</td><td>http://localhost:3000</td><td>admin/claude123</td><td>可视化仪表板</td></tr><tr><td>Redis</td><td>localhost:6379</td><td>-</td><td>缓存状态</td></tr></tbody></table><h3 id="常用运维命令" tabindex="-1"><a class="header-anchor" href="#常用运维命令" aria-hidden="true">#</a> 常用运维命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看日志</span>
<span class="token function">docker</span> compose logs <span class="token parameter variable">-f</span> claude-local-llm-proxy
<span class="token function">docker</span> compose logs <span class="token parameter variable">-f</span> claude-ollama

<span class="token comment"># 重启服务</span>
<span class="token function">docker</span> compose restart claude-local-llm-proxy

<span class="token comment"># 更新镜像</span>
<span class="token function">docker</span> compose pull
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>

<span class="token comment"># 备份数据</span>
<span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-v</span> claude-local-llm_ollama_data:/data <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/backup alpine <span class="token function">tar</span> czf /backup/ollama-backup.tar.gz <span class="token parameter variable">-C</span> /data <span class="token builtin class-name">.</span>

<span class="token comment"># 恢复数据</span>
<span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-v</span> claude-local-llm_ollama_data:/data <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/backup alpine <span class="token function">tar</span> xzf /backup/ollama-backup.tar.gz <span class="token parameter variable">-C</span> /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="性能监控指标" tabindex="-1"><a class="header-anchor" href="#性能监控指标" aria-hidden="true">#</a> 性能监控指标</h3><p><strong>关键指标</strong>：</p><ul><li>响应时间 (avg: 2-5秒)</li><li>并发请求数 (max: 4个)</li><li>内存使用率 (ollama: &lt;8GB)</li><li>CPU使用率 (peak: &lt;80%)</li><li>模型切换时间 (&lt;30秒)</li></ul><p><strong>告警阈值</strong>：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># Prometheus告警规则示例</span>
<span class="token punctuation">-</span> <span class="token key atrule">alert</span><span class="token punctuation">:</span> HighResponseTime
  <span class="token key atrule">expr</span><span class="token punctuation">:</span> histogram_quantile(0.95<span class="token punctuation">,</span> rate(http_request_duration_seconds_bucket<span class="token punctuation">[</span>5m<span class="token punctuation">]</span>)) <span class="token punctuation">&gt;</span> 10
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">severity</span><span class="token punctuation">:</span> warning
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">summary</span><span class="token punctuation">:</span> <span class="token string">&quot;响应时间过高&quot;</span>

<span class="token punctuation">-</span> <span class="token key atrule">alert</span><span class="token punctuation">:</span> HighMemoryUsage
  <span class="token key atrule">expr</span><span class="token punctuation">:</span> container_memory_usage_bytes<span class="token punctuation">{</span>name=&quot;claude<span class="token punctuation">-</span>ollama&quot;<span class="token punctuation">}</span> / container_spec_memory_limit_bytes <span class="token punctuation">&gt;</span> 0.9
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">severity</span><span class="token punctuation">:</span> critical
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">summary</span><span class="token punctuation">:</span> <span class="token string">&quot;内存使用率过高&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔧-故障排查" tabindex="-1"><a class="header-anchor" href="#🔧-故障排查" aria-hidden="true">#</a> 🔧 故障排查</h2><h3 id="常见问题及解决方案" tabindex="-1"><a class="header-anchor" href="#常见问题及解决方案" aria-hidden="true">#</a> 常见问题及解决方案</h3><h4 id="_1-容器启动失败" tabindex="-1"><a class="header-anchor" href="#_1-容器启动失败" aria-hidden="true">#</a> 1. 容器启动失败</h4><p><strong>症状</strong>: 容器状态显示 &quot;Exited&quot;</p><p><strong>排查步骤</strong>:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看容器日志</span>
<span class="token function">docker</span> compose logs claude-ollama

<span class="token comment"># 检查端口占用</span>
<span class="token function">lsof</span> <span class="token parameter variable">-i</span> :11434
<span class="token function">lsof</span> <span class="token parameter variable">-i</span> :8000

<span class="token comment"># 检查磁盘空间</span>
<span class="token function">df</span> <span class="token parameter variable">-h</span>

<span class="token comment"># 解决方案</span>
<span class="token function">docker</span> compose down
<span class="token function">docker</span> system prune <span class="token parameter variable">-f</span>
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-模型下载失败" tabindex="-1"><a class="header-anchor" href="#_2-模型下载失败" aria-hidden="true">#</a> 2. 模型下载失败</h4><p><strong>症状</strong>: Ollama容器日志显示下载错误</p><p><strong>解决方案</strong>:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 手动下载模型</span>
<span class="token function">docker</span> compose <span class="token builtin class-name">exec</span> claude-ollama ollama pull llama3.1:8b
<span class="token function">docker</span> compose <span class="token builtin class-name">exec</span> claude-ollama ollama pull qwen2.5:7b

<span class="token comment"># 或使用国内镜像</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_ORIGINS</span><span class="token operator">=</span><span class="token string">&quot;*&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_MODELS</span><span class="token operator">=</span><span class="token string">&quot;/models&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-api响应超时" tabindex="-1"><a class="header-anchor" href="#_3-api响应超时" aria-hidden="true">#</a> 3. API响应超时</h4><p><strong>症状</strong>: curl请求超时或502错误</p><p><strong>排查步骤</strong>:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查代理服务状态</span>
<span class="token function">curl</span> http://localhost:8000/health

<span class="token comment"># 检查Ollama连接</span>
<span class="token function">curl</span> http://localhost:11434/api/tags

<span class="token comment"># 查看资源使用情况</span>
<span class="token function">docker</span> stats

<span class="token comment"># 解决方案：增加超时时间</span>
<span class="token comment"># 在docker-compose.yml中添加：</span>
environment:
  - <span class="token assign-left variable">REQUEST_TIMEOUT</span><span class="token operator">=</span><span class="token number">120</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-内存不足" tabindex="-1"><a class="header-anchor" href="#_4-内存不足" aria-hidden="true">#</a> 4. 内存不足</h4><p><strong>症状</strong>: 系统卡顿，容器被OOM杀死</p><p><strong>解决方案</strong>:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用量化模型</span>
<span class="token function">docker</span> compose <span class="token builtin class-name">exec</span> claude-ollama ollama pull llama3.1:8b-q4_0

<span class="token comment"># 限制并发数</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OLLAMA_NUM_PARALLEL</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token comment"># 调整Docker内存限制</span>
<span class="token comment"># 在Docker Desktop设置中增加内存分配</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🚀-生产环境部署" tabindex="-1"><a class="header-anchor" href="#🚀-生产环境部署" aria-hidden="true">#</a> 🚀 生产环境部署</h2><h3 id="安全配置" tabindex="-1"><a class="header-anchor" href="#安全配置" aria-hidden="true">#</a> 安全配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># docker-compose.prod.yml</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">claude-local-llm-proxy</span><span class="token punctuation">:</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> CORS_ORIGINS=https<span class="token punctuation">:</span>//yourdomain.com
      <span class="token punctuation">-</span> API_KEY_REQUIRED=true
      <span class="token punctuation">-</span> RATE_LIMIT_ENABLED=true
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always

  <span class="token key atrule">claude-grafana</span><span class="token punctuation">:</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> GF_SECURITY_ADMIN_PASSWORD=$<span class="token punctuation">{</span>GRAFANA_PASSWORD<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> GF_USERS_ALLOW_SIGN_UP=false
      <span class="token punctuation">-</span> GF_AUTH_ANONYMOUS_ENABLED=false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反向代理配置-nginx" tabindex="-1"><a class="header-anchor" href="#反向代理配置-nginx" aria-hidden="true">#</a> 反向代理配置（Nginx）</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># /etc/nginx/sites-available/claude-llm</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> your-domain.com</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://localhost:8000</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_timeout</span> <span class="token number">300s</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动化部署脚本" tabindex="-1"><a class="header-anchor" href="#自动化部署脚本" aria-hidden="true">#</a> 自动化部署脚本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># deploy-prod.sh</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;🚀 开始生产环境部署...&quot;</span>

<span class="token comment"># 检查系统资源</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">free</span> <span class="token parameter variable">-g</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/^Mem:/{print $2}&#39;</span><span class="token variable">)</span></span> <span class="token parameter variable">-lt</span> <span class="token number">16</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;⚠️  警告：内存不足16GB，可能影响性能&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment"># 拉取最新代码</span>
<span class="token function">git</span> pull origin master

<span class="token comment"># 停止旧服务</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.yml <span class="token parameter variable">-f</span> docker-compose.prod.yml down

<span class="token comment"># 更新镜像</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.yml <span class="token parameter variable">-f</span> docker-compose.prod.yml pull

<span class="token comment"># 启动服务</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.yml <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span>

<span class="token comment"># 等待服务启动</span>
<span class="token function">sleep</span> <span class="token number">30</span>

<span class="token comment"># 健康检查</span>
<span class="token keyword">if</span> <span class="token function">curl</span> <span class="token parameter variable">-f</span> http://localhost:8000/health <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 部署成功！&quot;</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;❌ 部署失败，正在回滚...&quot;</span>
    <span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.yml <span class="token parameter variable">-f</span> docker-compose.prod.yml logs
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔄-更新和维护" tabindex="-1"><a class="header-anchor" href="#🔄-更新和维护" aria-hidden="true">#</a> 🔄 更新和维护</h2><h3 id="定期维护任务" tabindex="-1"><a class="header-anchor" href="#定期维护任务" aria-hidden="true">#</a> 定期维护任务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 每日维护脚本</span>
<span class="token comment">#!/bin/bash</span>
<span class="token comment"># daily-maintenance.sh</span>

<span class="token comment"># 清理未使用的Docker资源</span>
<span class="token function">docker</span> system prune <span class="token parameter variable">-f</span>

<span class="token comment"># 备份重要数据</span>
<span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-v</span> claude-local-llm_ollama_data:/data <span class="token parameter variable">-v</span> /backup:/backup alpine <span class="token function">tar</span> czf /backup/ollama-<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d<span class="token variable">)</span></span>.tar.gz <span class="token parameter variable">-C</span> /data <span class="token builtin class-name">.</span>

<span class="token comment"># 检查磁盘空间</span>
<span class="token function">df</span> <span class="token parameter variable">-h</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;(80%|90%|100%)&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;⚠️ 磁盘空间不足&quot;</span>

<span class="token comment"># 重启服务（如果需要）</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%u<span class="token variable">)</span></span>&quot;</span> <span class="token parameter variable">-eq</span> <span class="token number">7</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>  <span class="token comment"># 每周日重启</span>
    <span class="token function">docker</span> compose restart
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="版本更新流程" tabindex="-1"><a class="header-anchor" href="#版本更新流程" aria-hidden="true">#</a> 版本更新流程</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 备份当前版本</span>
<span class="token function">docker</span> compose down
<span class="token function">cp</span> docker-compose.yml docker-compose.yml.backup

<span class="token comment"># 2. 更新配置文件</span>
<span class="token function">curl</span> <span class="token parameter variable">-O</span> https://raw.githubusercontent.com/youweichen0208/YC-Tech-Blog/master/src/ai-tools/code/docker-compose.yml

<span class="token comment"># 3. 检查配置差异</span>
<span class="token function">diff</span> docker-compose.yml.backup docker-compose.yml

<span class="token comment"># 4. 渐进式更新</span>
<span class="token function">docker</span> compose pull
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span> --no-deps claude-local-llm-proxy
<span class="token function">sleep</span> <span class="token number">10</span>
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>

<span class="token comment"># 5. 验证更新</span>
<span class="token function">curl</span> http://localhost:8000/health
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📚-相关文档" tabindex="-1"><a class="header-anchor" href="#📚-相关文档" aria-hidden="true">#</a> 📚 相关文档</h2>`,75),u=n("hr",null,null,-1),v=n("p",null,[n("em",null,"Docker部署方式为Claude Tools + 本地大模型提供了企业级的稳定性和可扩展性，是推荐的生产环境部署方案。")],-1);function m(k,b){const s=t("RouterLink");return c(),o("div",null,[d,n("ul",null,[n("li",null,[a(s,{to:"/ai-tools/LOCAL_LLM_ARCHITECTURE.html"},{default:e(()=>[l("🏗️ 系统架构详解")]),_:1})]),n("li",null,[a(s,{to:"/ai-tools/QUICKSTART.html"},{default:e(()=>[l("⚡ 快速开始指南")]),_:1})]),n("li",null,[a(s,{to:"/ai-tools/CODE_OVERVIEW.html"},{default:e(()=>[l("💻 代码总览")]),_:1})])]),u,v])}const g=i(r,[["render",m],["__file","DOCKER_DEPLOYMENT.html.vue"]]);export{g as default};
