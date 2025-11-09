import{_ as l,r as p,o as i,c,a as n,b as s,d as e,e as t}from"./app-hxuvpabZ.js";const o={},u=t(`<h1 id="claude-cli-litellm-本地大模型集成指南" tabindex="-1"><a class="header-anchor" href="#claude-cli-litellm-本地大模型集成指南" aria-hidden="true">#</a> Claude CLI + LiteLLM + 本地大模型集成指南</h1><h2 id="📖-概述" tabindex="-1"><a class="header-anchor" href="#📖-概述" aria-hidden="true">#</a> 📖 概述</h2><p>本指南介绍如何使用 <strong>LiteLLM</strong> 作为统一代理层，让 <strong>Claude CLI</strong> 能够调用本地部署的开源大模型，实现：</p><ul><li>✅ 统一 API 接口（OpenAI/Anthropic 格式）</li><li>✅ 多模型路由和负载均衡</li><li>✅ 成本跟踪和监控</li><li>✅ 流式响应支持</li><li>✅ Claude CLI 无缝集成</li></ul><h2 id="🏗️-架构设计" tabindex="-1"><a class="header-anchor" href="#🏗️-架构设计" aria-hidden="true">#</a> 🏗️ 架构设计</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>┌─────────────────────────────────────────────────────────────┐
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🚀-快速开始" tabindex="-1"><a class="header-anchor" href="#🚀-快速开始" aria-hidden="true">#</a> 🚀 快速开始</h2><h3 id="_1-安装-litellm" tabindex="-1"><a class="header-anchor" href="#_1-安装-litellm" aria-hidden="true">#</a> 1. 安装 LiteLLM</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用 pip 安装</span>
pip <span class="token function">install</span> litellm<span class="token punctuation">[</span>proxy<span class="token punctuation">]</span>

<span class="token comment"># 或使用 Docker</span>
<span class="token function">docker</span> pull ghcr.io/berriai/litellm:main-latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-安装本地模型-以-ollama-为例" tabindex="-1"><a class="header-anchor" href="#_2-安装本地模型-以-ollama-为例" aria-hidden="true">#</a> 2. 安装本地模型（以 Ollama 为例）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 Ollama</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://ollama.com/install.sh <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># 下载模型</span>
ollama pull qwen2.5:7b
ollama pull deepseek-coder:6.7b
ollama pull llama3.1:8b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-配置-litellm" tabindex="-1"><a class="header-anchor" href="#_3-配置-litellm" aria-hidden="true">#</a> 3. 配置 LiteLLM</h3><p>创建 <code>litellm_config.yaml</code>：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">model_list</span><span class="token punctuation">:</span>
  <span class="token comment"># Anthropic 格式的模型映射</span>
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

<span class="token comment"># 通用配置</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-启动-litellm-代理" tabindex="-1"><a class="header-anchor" href="#_4-启动-litellm-代理" aria-hidden="true">#</a> 4. 启动 LiteLLM 代理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 方式1：直接启动</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🐳-docker-compose-部署" tabindex="-1"><a class="header-anchor" href="#🐳-docker-compose-部署" aria-hidden="true">#</a> 🐳 Docker Compose 部署</h2><p>创建 <code>docker-compose.yml</code>：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token comment"># LiteLLM 代理</span>
  <span class="token key atrule">litellm</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ghcr.io/berriai/litellm<span class="token punctuation">:</span>main<span class="token punctuation">-</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> litellm<span class="token punctuation">-</span>proxy
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8000:8000&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./litellm_config.yaml<span class="token punctuation">:</span>/app/config.yaml
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ANTHROPIC_API_KEY=$<span class="token punctuation">{</span>ANTHROPIC_API_KEY<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> OPENAI_API_KEY=$<span class="token punctuation">{</span>OPENAI_API_KEY<span class="token punctuation">}</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>config /app/config.yaml <span class="token punctuation">-</span><span class="token punctuation">-</span>port 8000 <span class="token punctuation">-</span><span class="token punctuation">-</span>num_workers 4
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span>
      <span class="token key atrule">test</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;curl&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-f&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://localhost:8000/health&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 30s
      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 10s
      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">3</span>

  <span class="token comment"># Redis 缓存（可选）</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>7<span class="token punctuation">-</span>alpine
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> litellm<span class="token punctuation">-</span>redis
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;6379:6379&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/data
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>appendonly yes
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># Prometheus 监控（可选）</span>
  <span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/prometheus<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> litellm<span class="token punctuation">-</span>prometheus
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9090:9090&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./prometheus.yml<span class="token punctuation">:</span>/etc/prometheus/prometheus.yml
      <span class="token punctuation">-</span> prometheus<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/prometheus
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--config.file=/etc/prometheus/prometheus.yml&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.path=/prometheus&#39;</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># Grafana 可视化（可选）</span>
  <span class="token key atrule">grafana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/grafana<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> litellm<span class="token punctuation">-</span>grafana
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3000:3000&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> GF_SECURITY_ADMIN_PASSWORD=admin
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> grafana<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/grafana
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">prometheus-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">grafana-data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动服务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动所有服务</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>

<span class="token comment"># 查看日志</span>
<span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> litellm

<span class="token comment"># 停止服务</span>
<span class="token function">docker-compose</span> down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📊-监控和日志" tabindex="-1"><a class="header-anchor" href="#📊-监控和日志" aria-hidden="true">#</a> 📊 监控和日志</h2><h3 id="内置监控端点" tabindex="-1"><a class="header-anchor" href="#内置监控端点" aria-hidden="true">#</a> 内置监控端点</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 健康检查</span>
<span class="token function">curl</span> http://localhost:8000/health

<span class="token comment"># 模型列表</span>
<span class="token function">curl</span> http://localhost:8000/v1/models <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer sk-1234&quot;</span>

<span class="token comment"># 统计信息</span>
<span class="token function">curl</span> http://localhost:8000/stats <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer sk-1234&quot;</span>

<span class="token comment"># 请求日志</span>
<span class="token function">curl</span> http://localhost:8000/logs <span class="token parameter variable">-H</span> <span class="token string">&quot;Authorization: Bearer sk-1234&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prometheus-指标" tabindex="-1"><a class="header-anchor" href="#prometheus-指标" aria-hidden="true">#</a> Prometheus 指标</h3><p>LiteLLM 自动暴露 Prometheus 指标：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># prometheus.yml</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📚-相关资源" tabindex="-1"><a class="header-anchor" href="#📚-相关资源" aria-hidden="true">#</a> 📚 相关资源</h2>`,78),r={href:"https://docs.litellm.ai/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/BerriAI/litellm",target:"_blank",rel:"noopener noreferrer"},k={href:"https://ollama.com/docs",target:"_blank",rel:"noopener noreferrer"},m={href:"https://docs.claude.com/claude-code",target:"_blank",rel:"noopener noreferrer"},v=t('<h2 id="🎉-总结" tabindex="-1"><a class="header-anchor" href="#🎉-总结" aria-hidden="true">#</a> 🎉 总结</h2><p>通过 LiteLLM 集成本地大模型，您可以：</p><p>✅ <strong>降低成本</strong> - 本地推理节省 99%+ API 费用 ✅ <strong>保护隐私</strong> - 敏感数据完全本地处理 ✅ <strong>提升灵活性</strong> - 统一接口调用多种模型 ✅ <strong>优化性能</strong> - 智能路由和缓存加速 ✅ <strong>无缝集成</strong> - Claude CLI 零改动使用</p><p>现在开始使用 LiteLLM，让 Claude CLI 更强大！🚀</p>',4);function b(h,g){const a=p("ExternalLinkIcon");return i(),c("div",null,[u,n("ul",null,[n("li",null,[s("📖 "),n("a",r,[s("LiteLLM 官方文档"),e(a)])]),n("li",null,[s("🐙 "),n("a",d,[s("LiteLLM GitHub"),e(a)])]),n("li",null,[s("🦙 "),n("a",k,[s("Ollama 文档"),e(a)])]),n("li",null,[s("🤖 "),n("a",m,[s("Claude CLI 文档"),e(a)])])]),v])}const _=l(o,[["render",b],["__file","LITELLM_INTEGRATION.html.vue"]]);export{_ as default};
