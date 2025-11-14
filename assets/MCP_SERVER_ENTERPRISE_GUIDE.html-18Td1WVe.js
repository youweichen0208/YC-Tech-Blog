import{_ as n,o as s,c as a,e as t}from"./app-5333XDSd.js";const p={},e=t(`<h1 id="企业级-mcp-server-部署完全指南" tabindex="-1"><a class="header-anchor" href="#企业级-mcp-server-部署完全指南" aria-hidden="true">#</a> 企业级 MCP Server 部署完全指南</h1><h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2><ul><li><a href="#1-mcp-%E6%A6%82%E8%BF%B0">1. MCP 概述</a></li><li><a href="#2-%E4%BC%81%E4%B8%9A%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1">2. 企业架构设计</a></li><li><a href="#3-%E8%BF%90%E7%BB%B4%E5%B9%B3%E5%8F%B0%E9%9B%86%E6%88%90%E6%96%B9%E6%A1%88">3. 运维平台集成方案</a></li><li><a href="#4-%E5%AE%89%E5%85%A8%E9%85%8D%E7%BD%AE">4. 安全配置</a></li><li><a href="#5-%E4%BB%A3%E7%A0%81%E5%AE%9E%E7%8E%B0">5. 代码实现</a></li><li><a href="#6-%E9%83%A8%E7%BD%B2%E8%BF%90%E7%BB%B4">6. 部署运维</a></li><li><a href="#7-%E6%95%85%E9%9A%9C%E6%8E%92%E6%9F%A5">7. 故障排查</a></li></ul><h2 id="_1-mcp-概述" tabindex="-1"><a class="header-anchor" href="#_1-mcp-概述" aria-hidden="true">#</a> 1. MCP 概述</h2><h3 id="_1-1-什么是-mcp" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是-mcp" aria-hidden="true">#</a> 1.1 什么是 MCP</h3><p>Model Context Protocol (MCP) 是 Anthropic 在 2024 年开源的标准协议，用于大语言模型与外部系统的动态交互。它提供了一个标准化的接口，让 AI 应用能够安全、可控地访问企业内部资源。</p><h3 id="_1-2-企业价值" tabindex="-1"><a class="header-anchor" href="#_1-2-企业价值" aria-hidden="true">#</a> 1.2 企业价值</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TB
    A<span class="token text string">[AI 应用]</span> <span class="token arrow operator">--&gt;</span> B<span class="token text string">[MCP 客户端]</span>
    B <span class="token arrow operator">--&gt;</span> C<span class="token text string">[MCP 协议]</span>
    C <span class="token arrow operator">--&gt;</span> D<span class="token text string">[MCP 服务器集群]</span>
    D <span class="token arrow operator">--&gt;</span> E<span class="token text string">[运维平台]</span>
    D <span class="token arrow operator">--&gt;</span> F<span class="token text string">[数据库]</span>
    D <span class="token arrow operator">--&gt;</span> G<span class="token text string">[API 网关]</span>
    D <span class="token arrow operator">--&gt;</span> H<span class="token text string">[监控系统]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>核心优势</strong>：</p><ul><li>🔒 <strong>标准化安全</strong>：统一的认证授权机制</li><li>🚀 <strong>快速集成</strong>：减少 80% 的自定义开发</li><li>📊 <strong>统一治理</strong>：集中的权限管理和审计</li><li>⚡ <strong>弹性扩容</strong>：支持数千并发调用</li><li>🛡️ <strong>隔离保护</strong>：多租户安全隔离</li></ul><h2 id="_2-企业架构设计" tabindex="-1"><a class="header-anchor" href="#_2-企业架构设计" aria-hidden="true">#</a> 2. 企业架构设计</h2><h3 id="_2-1-整体架构图" tabindex="-1"><a class="header-anchor" href="#_2-1-整体架构图" aria-hidden="true">#</a> 2.1 整体架构图</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TB
    <span class="token keyword">subgraph</span> <span class="token string">&quot;AI 应用层&quot;</span>
        A1<span class="token text string">[智能客服]</span> <span class="token arrow operator">--&gt;</span> A2<span class="token text string">[MCP Client]</span>
        B1<span class="token text string">[运维助手]</span> <span class="token arrow operator">--&gt;</span> B2<span class="token text string">[MCP Client]</span>
        C1<span class="token text string">[知识问答]</span> <span class="token arrow operator">--&gt;</span> C2<span class="token text string">[MCP Client]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;MCP 网关层&quot;</span>
        D<span class="token text string">[负载均衡器]</span>
        E<span class="token text string">[API 网关]</span>
        F<span class="token text string">[认证中心]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;MCP 服务层&quot;</span>
        G<span class="token text string">[运维 MCP Server]</span>
        H<span class="token text string">[数据 MCP Server]</span>
        I<span class="token text string">[工具 MCP Server]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;企业内网&quot;</span>
        J<span class="token text string">[Kubernetes]</span>
        K<span class="token text string">[监控平台]</span>
        L<span class="token text string">[CMDB]</span>
        M<span class="token text string">[数据库]</span>
    <span class="token keyword">end</span>

    A2 <span class="token arrow operator">--&gt;</span> D
    B2 <span class="token arrow operator">--&gt;</span> D
    C2 <span class="token arrow operator">--&gt;</span> D
    D <span class="token arrow operator">--&gt;</span> E
    E <span class="token arrow operator">--&gt;</span> F
    F <span class="token arrow operator">--&gt;</span> G
    F <span class="token arrow operator">--&gt;</span> H
    F <span class="token arrow operator">--&gt;</span> I
    G <span class="token arrow operator">--&gt;</span> J
    H <span class="token arrow operator">--&gt;</span> L
    I <span class="token arrow operator">--&gt;</span> K
    G <span class="token arrow operator">--&gt;</span> M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-部署拓扑" tabindex="-1"><a class="header-anchor" href="#_2-2-部署拓扑" aria-hidden="true">#</a> 2.2 部署拓扑</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 企业部署拓扑</span>
<span class="token key atrule">企业网络架构</span><span class="token punctuation">:</span>
  <span class="token key atrule">DMZ区域</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> 负载均衡器 (HAProxy/Nginx)
    <span class="token punctuation">-</span> API 网关 (Kong/Envoy)
    <span class="token punctuation">-</span> SSL 终端

  <span class="token key atrule">内网区域</span><span class="token punctuation">:</span>
    <span class="token key atrule">生产环境</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> MCP Server 集群 (3+ 节点)
      <span class="token punctuation">-</span> Redis 集群 (缓存/会话)
      <span class="token punctuation">-</span> PostgreSQL (配置/审计)

    <span class="token key atrule">管理平台</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> Kubernetes 集群
      <span class="token punctuation">-</span> Prometheus/Grafana
      <span class="token punctuation">-</span> ELK 日志栈

  <span class="token key atrule">安全隔离</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> 防火墙规则
    <span class="token punctuation">-</span> VPN 访问控制
    <span class="token punctuation">-</span> 网络分段
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-服务发现与注册" tabindex="-1"><a class="header-anchor" href="#_2-3-服务发现与注册" aria-hidden="true">#</a> 2.3 服务发现与注册</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># consul_discovery.py - 服务发现配置</span>
<span class="token keyword">import</span> consul
<span class="token keyword">import</span> json

<span class="token keyword">class</span> <span class="token class-name">MCPServiceDiscovery</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> consul_host<span class="token operator">=</span><span class="token string">&#39;consul.internal&#39;</span><span class="token punctuation">,</span> consul_port<span class="token operator">=</span><span class="token number">8500</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>consul <span class="token operator">=</span> consul<span class="token punctuation">.</span>Consul<span class="token punctuation">(</span>host<span class="token operator">=</span>consul_host<span class="token punctuation">,</span> port<span class="token operator">=</span>consul_port<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">register_mcp_server</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> address<span class="token punctuation">,</span> port<span class="token punctuation">,</span> health_check_url<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;注册 MCP Server 到服务发现&quot;&quot;&quot;</span>
        service_id <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;mcp-server-</span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token punctuation">{</span>port<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>

        self<span class="token punctuation">.</span>consul<span class="token punctuation">.</span>agent<span class="token punctuation">.</span>service<span class="token punctuation">.</span>register<span class="token punctuation">(</span>
            name<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;mcp-</span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
            service_id<span class="token operator">=</span>service_id<span class="token punctuation">,</span>
            address<span class="token operator">=</span>address<span class="token punctuation">,</span>
            port<span class="token operator">=</span>port<span class="token punctuation">,</span>
            check<span class="token operator">=</span>consul<span class="token punctuation">.</span>Check<span class="token punctuation">.</span>http<span class="token punctuation">(</span>
                url<span class="token operator">=</span>health_check_url<span class="token punctuation">,</span>
                timeout<span class="token operator">=</span><span class="token string">&quot;10s&quot;</span><span class="token punctuation">,</span>
                interval<span class="token operator">=</span><span class="token string">&quot;30s&quot;</span><span class="token punctuation">,</span>
                deregister<span class="token operator">=</span><span class="token string">&quot;3m&quot;</span>
            <span class="token punctuation">)</span><span class="token punctuation">,</span>
            tags<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;mcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ai&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;production&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">discover_servers</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> service_name<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;发现可用的 MCP 服务器&quot;&quot;&quot;</span>
        services <span class="token operator">=</span> self<span class="token punctuation">.</span>consul<span class="token punctuation">.</span>health<span class="token punctuation">.</span>service<span class="token punctuation">(</span>
            service_name<span class="token punctuation">,</span>
            passing<span class="token operator">=</span><span class="token boolean">True</span>
        <span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>

        <span class="token keyword">return</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">&#39;address&#39;</span><span class="token punctuation">:</span> service<span class="token punctuation">[</span><span class="token string">&#39;Service&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;Address&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token string">&#39;port&#39;</span><span class="token punctuation">:</span> service<span class="token punctuation">[</span><span class="token string">&#39;Service&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;Port&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token string">&#39;id&#39;</span><span class="token punctuation">:</span> service<span class="token punctuation">[</span><span class="token string">&#39;Service&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;ID&#39;</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">for</span> service <span class="token keyword">in</span> services
        <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-运维平台集成方案" tabindex="-1"><a class="header-anchor" href="#_3-运维平台集成方案" aria-hidden="true">#</a> 3. 运维平台集成方案</h2><h3 id="_3-1-kubernetes-运维集成" tabindex="-1"><a class="header-anchor" href="#_3-1-kubernetes-运维集成" aria-hidden="true">#</a> 3.1 Kubernetes 运维集成</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># k8s_ops_server.py - Kubernetes 运维 MCP Server</span>
<span class="token keyword">from</span> kubernetes <span class="token keyword">import</span> client<span class="token punctuation">,</span> config
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server <span class="token keyword">import</span> Server
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server<span class="token punctuation">.</span>models <span class="token keyword">import</span> InitializationOptions
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server<span class="token punctuation">.</span>stdio <span class="token keyword">import</span> stdio_server
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>types <span class="token keyword">import</span> TextContent<span class="token punctuation">,</span> Tool
<span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> json

<span class="token keyword">class</span> <span class="token class-name">K8sOpsMCPServer</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 加载 Kubernetes 配置</span>
        config<span class="token punctuation">.</span>load_incluster_config<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 集群内配置</span>
        <span class="token comment"># config.load_kube_config()  # 本地开发配置</span>

        self<span class="token punctuation">.</span>v1 <span class="token operator">=</span> client<span class="token punctuation">.</span>CoreV1Api<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>apps_v1 <span class="token operator">=</span> client<span class="token punctuation">.</span>AppsV1Api<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>server <span class="token operator">=</span> Server<span class="token punctuation">(</span><span class="token string">&quot;kubernetes-ops&quot;</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>setup_tools<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">setup_tools</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;注册运维工具&quot;&quot;&quot;</span>

        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>list_tools</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">list_tools</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token punctuation">[</span>Tool<span class="token punctuation">]</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;get_pods&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;获取 Pod 状态信息&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;namespace&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;label_selector&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;description&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;标签选择器&quot;</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;get_deployments&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;获取 Deployment 信息&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;namespace&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;scale_deployment&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;扩缩容 Deployment&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;namespace&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;deployment&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;replicas&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;integer&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">,</span> <span class="token string">&quot;minimum&quot;</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;get_pod_logs&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;获取 Pod 日志&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;namespace&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;pod_name&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;tail_lines&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;integer&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;restart_deployment&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;重启 Deployment&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;namespace&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;deployment&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">]</span>

        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>call_tool</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">call_tool</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> arguments<span class="token punctuation">:</span> <span class="token builtin">dict</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token punctuation">[</span>TextContent<span class="token punctuation">]</span><span class="token punctuation">:</span>
            <span class="token triple-quoted-string string">&quot;&quot;&quot;执行运维操作&quot;&quot;&quot;</span>
            <span class="token keyword">try</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> name <span class="token operator">==</span> <span class="token string">&quot;get_pods&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_get_pods<span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;get_deployments&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_get_deployments<span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;scale_deployment&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_scale_deployment<span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;get_pod_logs&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_get_pod_logs<span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;restart_deployment&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_restart_deployment<span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span><span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;Unknown tool: </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">]</span>
            <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
                <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span><span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;Error: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_get_pods</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;获取 Pod 信息&quot;&quot;&quot;</span>
        namespace <span class="token operator">=</span> args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;namespace&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">)</span>
        label_selector <span class="token operator">=</span> args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;label_selector&quot;</span><span class="token punctuation">)</span>

        pods <span class="token operator">=</span> self<span class="token punctuation">.</span>v1<span class="token punctuation">.</span>list_namespaced_pod<span class="token punctuation">(</span>
            namespace<span class="token operator">=</span>namespace<span class="token punctuation">,</span>
            label_selector<span class="token operator">=</span>label_selector
        <span class="token punctuation">)</span>

        pod_info <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> pod <span class="token keyword">in</span> pods<span class="token punctuation">.</span>items<span class="token punctuation">:</span>
            status <span class="token operator">=</span> pod<span class="token punctuation">.</span>status<span class="token punctuation">.</span>phase
            ready <span class="token operator">=</span> <span class="token builtin">sum</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token keyword">for</span> c <span class="token keyword">in</span> pod<span class="token punctuation">.</span>status<span class="token punctuation">.</span>container_statuses <span class="token keyword">or</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
                       <span class="token keyword">if</span> c<span class="token punctuation">.</span>ready<span class="token punctuation">)</span> <span class="token keyword">if</span> pod<span class="token punctuation">.</span>status<span class="token punctuation">.</span>container_statuses <span class="token keyword">else</span> <span class="token number">0</span>
            total <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>pod<span class="token punctuation">.</span>spec<span class="token punctuation">.</span>containers<span class="token punctuation">)</span>

            pod_info<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> pod<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
                <span class="token string">&quot;namespace&quot;</span><span class="token punctuation">:</span> pod<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>namespace<span class="token punctuation">,</span>
                <span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> status<span class="token punctuation">,</span>
                <span class="token string">&quot;ready&quot;</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>ready<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>total<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                <span class="token string">&quot;restarts&quot;</span><span class="token punctuation">:</span> <span class="token builtin">sum</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>restart_count <span class="token keyword">for</span> c <span class="token keyword">in</span> pod<span class="token punctuation">.</span>status<span class="token punctuation">.</span>container_statuses <span class="token keyword">or</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">&quot;age&quot;</span><span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">(</span>pod<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>creation_timestamp<span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">&quot;node&quot;</span><span class="token punctuation">:</span> pod<span class="token punctuation">.</span>spec<span class="token punctuation">.</span>node_name
            <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
            <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
            text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;找到 </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">len</span><span class="token punctuation">(</span>pod_info<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> 个 Pod:\\n&quot;</span></span> <span class="token operator">+</span>
                 json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>pod_info<span class="token punctuation">,</span> indent<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> ensure_ascii<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_scale_deployment</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;扩缩容 Deployment&quot;&quot;&quot;</span>
        namespace <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token string">&quot;namespace&quot;</span><span class="token punctuation">]</span>
        deployment <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token string">&quot;deployment&quot;</span><span class="token punctuation">]</span>
        replicas <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token string">&quot;replicas&quot;</span><span class="token punctuation">]</span>

        <span class="token comment"># 获取当前 Deployment</span>
        dep <span class="token operator">=</span> self<span class="token punctuation">.</span>apps_v1<span class="token punctuation">.</span>read_namespaced_deployment<span class="token punctuation">(</span>
            name<span class="token operator">=</span>deployment<span class="token punctuation">,</span>
            namespace<span class="token operator">=</span>namespace
        <span class="token punctuation">)</span>

        <span class="token comment"># 更新副本数</span>
        dep<span class="token punctuation">.</span>spec<span class="token punctuation">.</span>replicas <span class="token operator">=</span> replicas
        self<span class="token punctuation">.</span>apps_v1<span class="token punctuation">.</span>patch_namespaced_deployment<span class="token punctuation">(</span>
            name<span class="token operator">=</span>deployment<span class="token punctuation">,</span>
            namespace<span class="token operator">=</span>namespace<span class="token punctuation">,</span>
            body<span class="token operator">=</span>dep
        <span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
            <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
            text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;成功将 </span><span class="token interpolation"><span class="token punctuation">{</span>namespace<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>deployment<span class="token punctuation">}</span></span><span class="token string"> 扩缩容到 </span><span class="token interpolation"><span class="token punctuation">{</span>replicas<span class="token punctuation">}</span></span><span class="token string"> 个副本&quot;</span></span>
        <span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_restart_deployment</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;重启 Deployment&quot;&quot;&quot;</span>
        namespace <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token string">&quot;namespace&quot;</span><span class="token punctuation">]</span>
        deployment <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token string">&quot;deployment&quot;</span><span class="token punctuation">]</span>

        <span class="token comment"># 通过更新注解来触发重启</span>
        <span class="token keyword">import</span> datetime
        restart_annotation <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;kubectl.kubernetes.io/restartedAt&quot;</span><span class="token punctuation">:</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>utcnow<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>isoformat<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        self<span class="token punctuation">.</span>apps_v1<span class="token punctuation">.</span>patch_namespaced_deployment<span class="token punctuation">(</span>
            name<span class="token operator">=</span>deployment<span class="token punctuation">,</span>
            namespace<span class="token operator">=</span>namespace<span class="token punctuation">,</span>
            body<span class="token operator">=</span><span class="token punctuation">{</span>
                <span class="token string">&quot;spec&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;template&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                        <span class="token string">&quot;metadata&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;annotations&quot;</span><span class="token punctuation">:</span> restart_annotation
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
            <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
            text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;成功重启 </span><span class="token interpolation"><span class="token punctuation">{</span>namespace<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>deployment<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
        <span class="token punctuation">)</span><span class="token punctuation">]</span>

<span class="token comment"># 启动服务器</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    server <span class="token operator">=</span> K8sOpsMCPServer<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">async</span> <span class="token keyword">with</span> stdio_server<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token punctuation">(</span>read_stream<span class="token punctuation">,</span> write_stream<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">await</span> server<span class="token punctuation">.</span>server<span class="token punctuation">.</span>run<span class="token punctuation">(</span>
            read_stream<span class="token punctuation">,</span>
            write_stream<span class="token punctuation">,</span>
            InitializationOptions<span class="token punctuation">(</span>
                server_name<span class="token operator">=</span><span class="token string">&quot;kubernetes-ops&quot;</span><span class="token punctuation">,</span>
                server_version<span class="token operator">=</span><span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
                capabilities<span class="token operator">=</span>server<span class="token punctuation">.</span>server<span class="token punctuation">.</span>get_capabilities<span class="token punctuation">(</span>
                    notification_options<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span>
                    experimental_capabilities<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-监控平台集成" tabindex="-1"><a class="header-anchor" href="#_3-2-监控平台集成" aria-hidden="true">#</a> 3.2 监控平台集成</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># monitoring_server.py - 监控平台 MCP Server</span>
<span class="token keyword">import</span> aiohttp
<span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server <span class="token keyword">import</span> Server
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server<span class="token punctuation">.</span>stdio <span class="token keyword">import</span> stdio_server
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>types <span class="token keyword">import</span> TextContent<span class="token punctuation">,</span> Tool
<span class="token keyword">import</span> json
<span class="token keyword">from</span> datetime <span class="token keyword">import</span> datetime<span class="token punctuation">,</span> timedelta

<span class="token keyword">class</span> <span class="token class-name">MonitoringMCPServer</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> prometheus_url<span class="token operator">=</span><span class="token string">&quot;http://prometheus:9090&quot;</span><span class="token punctuation">,</span>
                 grafana_url<span class="token operator">=</span><span class="token string">&quot;http://grafana:3000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>prometheus_url <span class="token operator">=</span> prometheus_url
        self<span class="token punctuation">.</span>grafana_url <span class="token operator">=</span> grafana_url
        self<span class="token punctuation">.</span>server <span class="token operator">=</span> Server<span class="token punctuation">(</span><span class="token string">&quot;monitoring-ops&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setup_tools<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">setup_tools</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>list_tools</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">list_tools</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token punctuation">[</span>Tool<span class="token punctuation">]</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;query_metrics&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;查询 Prometheus 指标&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;query&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;time_range&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;5m&quot;</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;get_alerts&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;获取当前告警&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;severity&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;enum&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;critical&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;warning&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;info&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;create_dashboard&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;创建 Grafana 仪表板&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;title&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;metrics&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;array&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;items&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;health_check&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;检查服务健康状态&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;service&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;namespace&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">]</span>

        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>call_tool</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">call_tool</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> arguments<span class="token punctuation">:</span> <span class="token builtin">dict</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token punctuation">[</span>TextContent<span class="token punctuation">]</span><span class="token punctuation">:</span>
            <span class="token keyword">try</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> name <span class="token operator">==</span> <span class="token string">&quot;query_metrics&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_query_metrics<span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;get_alerts&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_get_alerts<span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;create_dashboard&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_create_dashboard<span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;health_check&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_health_check<span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span><span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;Unknown tool: </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">]</span>
            <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
                <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span><span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;Error: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_query_metrics</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;查询 Prometheus 指标&quot;&quot;&quot;</span>
        query <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token string">&quot;query&quot;</span><span class="token punctuation">]</span>
        time_range <span class="token operator">=</span> args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;time_range&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;5m&quot;</span><span class="token punctuation">)</span>

        url <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>prometheus_url<span class="token punctuation">}</span></span><span class="token string">/api/v1/query_range&quot;</span></span>
        end_time <span class="token operator">=</span> datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span>
        start_time <span class="token operator">=</span> end_time <span class="token operator">-</span> timedelta<span class="token punctuation">(</span>minutes<span class="token operator">=</span><span class="token builtin">int</span><span class="token punctuation">(</span>time_range<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        params <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;query&quot;</span><span class="token punctuation">:</span> query<span class="token punctuation">,</span>
            <span class="token string">&quot;start&quot;</span><span class="token punctuation">:</span> start_time<span class="token punctuation">.</span>timestamp<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token string">&quot;end&quot;</span><span class="token punctuation">:</span> end_time<span class="token punctuation">.</span>timestamp<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token string">&quot;step&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;1m&quot;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">async</span> <span class="token keyword">with</span> aiohttp<span class="token punctuation">.</span>ClientSession<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">:</span>
            <span class="token keyword">async</span> <span class="token keyword">with</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span> params<span class="token operator">=</span>params<span class="token punctuation">)</span> <span class="token keyword">as</span> resp<span class="token punctuation">:</span>
                data <span class="token operator">=</span> <span class="token keyword">await</span> resp<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>

                <span class="token keyword">if</span> data<span class="token punctuation">[</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;success&quot;</span><span class="token punctuation">:</span>
                    results <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;result&quot;</span><span class="token punctuation">]</span>
                    formatted_results <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

                    <span class="token keyword">for</span> result <span class="token keyword">in</span> results<span class="token punctuation">:</span>
                        metric <span class="token operator">=</span> result<span class="token punctuation">[</span><span class="token string">&quot;metric&quot;</span><span class="token punctuation">]</span>
                        values <span class="token operator">=</span> result<span class="token punctuation">[</span><span class="token string">&quot;values&quot;</span><span class="token punctuation">]</span>

                        <span class="token comment"># 格式化最新值</span>
                        <span class="token keyword">if</span> values<span class="token punctuation">:</span>
                            latest_value <span class="token operator">=</span> values<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
                            formatted_results<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">{</span>
                                <span class="token string">&quot;metric&quot;</span><span class="token punctuation">:</span> metric<span class="token punctuation">,</span>
                                <span class="token string">&quot;latest_value&quot;</span><span class="token punctuation">:</span> <span class="token builtin">float</span><span class="token punctuation">(</span>latest_value<span class="token punctuation">)</span><span class="token punctuation">,</span>
                                <span class="token string">&quot;data_points&quot;</span><span class="token punctuation">:</span> <span class="token builtin">len</span><span class="token punctuation">(</span>values<span class="token punctuation">)</span>
                            <span class="token punctuation">}</span><span class="token punctuation">)</span>

                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                        <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                        text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;指标查询结果:\\n</span><span class="token interpolation"><span class="token punctuation">{</span>json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>formatted_results<span class="token punctuation">,</span> indent<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> ensure_ascii<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                    <span class="token punctuation">)</span><span class="token punctuation">]</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                        <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                        text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;查询失败: </span><span class="token interpolation"><span class="token punctuation">{</span>data<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Unknown error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                    <span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_get_alerts</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;获取当前告警&quot;&quot;&quot;</span>
        severity <span class="token operator">=</span> args<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;severity&quot;</span><span class="token punctuation">)</span>

        url <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>prometheus_url<span class="token punctuation">}</span></span><span class="token string">/api/v1/alerts&quot;</span></span>

        <span class="token keyword">async</span> <span class="token keyword">with</span> aiohttp<span class="token punctuation">.</span>ClientSession<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">:</span>
            <span class="token keyword">async</span> <span class="token keyword">with</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">)</span> <span class="token keyword">as</span> resp<span class="token punctuation">:</span>
                data <span class="token operator">=</span> <span class="token keyword">await</span> resp<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>

                <span class="token keyword">if</span> data<span class="token punctuation">[</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;success&quot;</span><span class="token punctuation">:</span>
                    alerts <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;alerts&quot;</span><span class="token punctuation">]</span>

                    <span class="token keyword">if</span> severity<span class="token punctuation">:</span>
                        alerts <span class="token operator">=</span> <span class="token punctuation">[</span>a <span class="token keyword">for</span> a <span class="token keyword">in</span> alerts <span class="token keyword">if</span> a<span class="token punctuation">[</span><span class="token string">&quot;labels&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;severity&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> severity<span class="token punctuation">]</span>

                    <span class="token comment"># 只显示激活的告警</span>
                    active_alerts <span class="token operator">=</span> <span class="token punctuation">[</span>a <span class="token keyword">for</span> a <span class="token keyword">in</span> alerts <span class="token keyword">if</span> a<span class="token punctuation">[</span><span class="token string">&quot;state&quot;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;firing&quot;</span><span class="token punctuation">]</span>

                    formatted_alerts <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
                    <span class="token keyword">for</span> alert <span class="token keyword">in</span> active_alerts<span class="token punctuation">:</span>
                        formatted_alerts<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">{</span>
                            <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> alert<span class="token punctuation">[</span><span class="token string">&quot;labels&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;alertname&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Unknown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;severity&quot;</span><span class="token punctuation">:</span> alert<span class="token punctuation">[</span><span class="token string">&quot;labels&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;severity&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;unknown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;instance&quot;</span><span class="token punctuation">:</span> alert<span class="token punctuation">[</span><span class="token string">&quot;labels&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;instance&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;unknown&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;summary&quot;</span><span class="token punctuation">:</span> alert<span class="token punctuation">[</span><span class="token string">&quot;annotations&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;summary&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;No summary&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;active_since&quot;</span><span class="token punctuation">:</span> alert<span class="token punctuation">[</span><span class="token string">&quot;activeAt&quot;</span><span class="token punctuation">]</span>
                        <span class="token punctuation">}</span><span class="token punctuation">)</span>

                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                        <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                        text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;当前激活告警 (</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">len</span><span class="token punctuation">(</span>formatted_alerts<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> 个):\\n&quot;</span></span> <span class="token operator">+</span>
                             json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>formatted_alerts<span class="token punctuation">,</span> indent<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> ensure_ascii<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
                    <span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-cmdb-集成" tabindex="-1"><a class="header-anchor" href="#_3-3-cmdb-集成" aria-hidden="true">#</a> 3.3 CMDB 集成</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># cmdb_server.py - CMDB 集成 MCP Server</span>
<span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> aiohttp
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server <span class="token keyword">import</span> Server
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server<span class="token punctuation">.</span>stdio <span class="token keyword">import</span> stdio_server
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>types <span class="token keyword">import</span> TextContent<span class="token punctuation">,</span> Tool
<span class="token keyword">import</span> json

<span class="token keyword">class</span> <span class="token class-name">CMDBMCPServer</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> cmdb_api_url<span class="token punctuation">,</span> api_key<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>cmdb_api_url <span class="token operator">=</span> cmdb_api_url
        self<span class="token punctuation">.</span>api_key <span class="token operator">=</span> api_key
        self<span class="token punctuation">.</span>server <span class="token operator">=</span> Server<span class="token punctuation">(</span><span class="token string">&quot;cmdb-ops&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setup_tools<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">setup_tools</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>list_tools</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">list_tools</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token punctuation">[</span>Tool<span class="token punctuation">]</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;query_assets&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;查询资产信息&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;asset_type&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;enum&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;server&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;database&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;application&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;environment&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;enum&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;prod&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;staging&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dev&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;enum&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;active&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;inactive&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;maintenance&quot;</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;get_service_topology&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;获取服务拓扑关系&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;service_name&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;update_asset_status&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;更新资产状态&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;asset_id&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;required&quot;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;reason&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Tool<span class="token punctuation">(</span>
                    name<span class="token operator">=</span><span class="token string">&quot;get_change_records&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;获取变更记录&quot;</span><span class="token punctuation">,</span>
                    inputSchema<span class="token operator">=</span><span class="token punctuation">{</span>
                        <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;properties&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                            <span class="token string">&quot;asset_id&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;time_range&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;7d&quot;</span><span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">]</span>

        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>call_tool</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">call_tool</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> arguments<span class="token punctuation">:</span> <span class="token builtin">dict</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token punctuation">[</span>TextContent<span class="token punctuation">]</span><span class="token punctuation">:</span>
            headers <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;Authorization&quot;</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f&quot;Bearer </span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>api_key<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                <span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;application/json&quot;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">try</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> name <span class="token operator">==</span> <span class="token string">&quot;query_assets&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_query_assets<span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> headers<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;get_service_topology&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_get_service_topology<span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> headers<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;update_asset_status&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_update_asset_status<span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> headers<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> name <span class="token operator">==</span> <span class="token string">&quot;get_change_records&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_get_change_records<span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> headers<span class="token punctuation">)</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span><span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;Unknown tool: </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">]</span>
            <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
                <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span><span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span> text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;Error: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_query_assets</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">,</span> headers<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;查询资产信息&quot;&quot;&quot;</span>
        params <span class="token operator">=</span> <span class="token punctuation">{</span>k<span class="token punctuation">:</span> v <span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> args<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">if</span> v <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">}</span>

        url <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>cmdb_api_url<span class="token punctuation">}</span></span><span class="token string">/api/v1/assets&quot;</span></span>

        <span class="token keyword">async</span> <span class="token keyword">with</span> aiohttp<span class="token punctuation">.</span>ClientSession<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">:</span>
            <span class="token keyword">async</span> <span class="token keyword">with</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span> params<span class="token operator">=</span>params<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span> <span class="token keyword">as</span> resp<span class="token punctuation">:</span>
                <span class="token keyword">if</span> resp<span class="token punctuation">.</span>status <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">:</span>
                    data <span class="token operator">=</span> <span class="token keyword">await</span> resp<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
                    assets <span class="token operator">=</span> data<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;assets&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

                    formatted_assets <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
                    <span class="token keyword">for</span> asset <span class="token keyword">in</span> assets<span class="token punctuation">:</span>
                        formatted_assets<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">{</span>
                            <span class="token string">&quot;id&quot;</span><span class="token punctuation">:</span> asset<span class="token punctuation">[</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> asset<span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> asset<span class="token punctuation">[</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;environment&quot;</span><span class="token punctuation">:</span> asset<span class="token punctuation">[</span><span class="token string">&quot;environment&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> asset<span class="token punctuation">[</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;ip_address&quot;</span><span class="token punctuation">:</span> asset<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;ip_address&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;owner&quot;</span><span class="token punctuation">:</span> asset<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;owner&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;last_updated&quot;</span><span class="token punctuation">:</span> asset<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;updated_at&quot;</span><span class="token punctuation">)</span>
                        <span class="token punctuation">}</span><span class="token punctuation">)</span>

                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                        <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                        text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;查询到 </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">len</span><span class="token punctuation">(</span>formatted_assets<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> 个资产:\\n&quot;</span></span> <span class="token operator">+</span>
                             json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>formatted_assets<span class="token punctuation">,</span> indent<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> ensure_ascii<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
                    <span class="token punctuation">)</span><span class="token punctuation">]</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                        <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                        text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;查询失败，状态码: </span><span class="token interpolation"><span class="token punctuation">{</span>resp<span class="token punctuation">.</span>status<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                    <span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_get_service_topology</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">,</span> headers<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;获取服务拓扑&quot;&quot;&quot;</span>
        service_name <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token string">&quot;service_name&quot;</span><span class="token punctuation">]</span>

        url <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>cmdb_api_url<span class="token punctuation">}</span></span><span class="token string">/api/v1/topology/</span><span class="token interpolation"><span class="token punctuation">{</span>service_name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>

        <span class="token keyword">async</span> <span class="token keyword">with</span> aiohttp<span class="token punctuation">.</span>ClientSession<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">:</span>
            <span class="token keyword">async</span> <span class="token keyword">with</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span> <span class="token keyword">as</span> resp<span class="token punctuation">:</span>
                <span class="token keyword">if</span> resp<span class="token punctuation">.</span>status <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">:</span>
                    topology <span class="token operator">=</span> <span class="token keyword">await</span> resp<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>

                    <span class="token comment"># 构建拓扑图</span>
                    nodes <span class="token operator">=</span> topology<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;nodes&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                    edges <span class="token operator">=</span> topology<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;edges&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

                    topology_info <span class="token operator">=</span> <span class="token punctuation">{</span>
                        <span class="token string">&quot;service&quot;</span><span class="token punctuation">:</span> service_name<span class="token punctuation">,</span>
                        <span class="token string">&quot;nodes&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span>
                                <span class="token string">&quot;id&quot;</span><span class="token punctuation">:</span> node<span class="token punctuation">[</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                                <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> node<span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                                <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> node<span class="token punctuation">[</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                                <span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> node<span class="token punctuation">[</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">]</span>
                            <span class="token punctuation">}</span>
                            <span class="token keyword">for</span> node <span class="token keyword">in</span> nodes
                        <span class="token punctuation">]</span><span class="token punctuation">,</span>
                        <span class="token string">&quot;dependencies&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span>
                                <span class="token string">&quot;from&quot;</span><span class="token punctuation">:</span> edge<span class="token punctuation">[</span><span class="token string">&quot;source&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                                <span class="token string">&quot;to&quot;</span><span class="token punctuation">:</span> edge<span class="token punctuation">[</span><span class="token string">&quot;target&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                                <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> edge<span class="token punctuation">[</span><span class="token string">&quot;type&quot;</span><span class="token punctuation">]</span>
                            <span class="token punctuation">}</span>
                            <span class="token keyword">for</span> edge <span class="token keyword">in</span> edges
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>

                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                        <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                        text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;服务拓扑信息:\\n</span><span class="token interpolation"><span class="token punctuation">{</span>json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>topology_info<span class="token punctuation">,</span> indent<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> ensure_ascii<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                    <span class="token punctuation">)</span><span class="token punctuation">]</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                        <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                        text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;获取拓扑失败，状态码: </span><span class="token interpolation"><span class="token punctuation">{</span>resp<span class="token punctuation">.</span>status<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                    <span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-安全配置" tabindex="-1"><a class="header-anchor" href="#_4-安全配置" aria-hidden="true">#</a> 4. 安全配置</h2><h3 id="_4-1-认证授权架构" tabindex="-1"><a class="header-anchor" href="#_4-1-认证授权架构" aria-hidden="true">#</a> 4.1 认证授权架构</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># security-config.yaml - 安全配置</span>
<span class="token key atrule">security</span><span class="token punctuation">:</span>
  <span class="token key atrule">authentication</span><span class="token punctuation">:</span>
    <span class="token comment"># JWT 配置</span>
    <span class="token key atrule">jwt</span><span class="token punctuation">:</span>
      <span class="token key atrule">secret_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>JWT_SECRET_KEY<span class="token punctuation">}</span>
      <span class="token key atrule">algorithm</span><span class="token punctuation">:</span> HS256
      <span class="token key atrule">expiration</span><span class="token punctuation">:</span> <span class="token number">3600</span>  <span class="token comment"># 1 hour</span>

    <span class="token comment"># OAuth 2.0 配置</span>
    <span class="token key atrule">oauth</span><span class="token punctuation">:</span>
      <span class="token key atrule">client_id</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>OAUTH_CLIENT_ID<span class="token punctuation">}</span>
      <span class="token key atrule">client_secret</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>OAUTH_CLIENT_SECRET<span class="token punctuation">}</span>
      <span class="token key atrule">authorization_url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//auth.company.com/oauth/authorize
      <span class="token key atrule">token_url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//auth.company.com/oauth/token
      <span class="token key atrule">scopes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;mcp:read&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mcp:write&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mcp:admin&quot;</span><span class="token punctuation">]</span>

    <span class="token comment"># LDAP 集成</span>
    <span class="token key atrule">ldap</span><span class="token punctuation">:</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span> ldaps<span class="token punctuation">:</span>//ldap.company.com<span class="token punctuation">:</span><span class="token number">636</span>
      <span class="token key atrule">bind_dn</span><span class="token punctuation">:</span> cn=mcp<span class="token punctuation">-</span>service<span class="token punctuation">,</span>ou=services<span class="token punctuation">,</span>dc=company<span class="token punctuation">,</span>dc=com
      <span class="token key atrule">user_search_base</span><span class="token punctuation">:</span> ou=users<span class="token punctuation">,</span>dc=company<span class="token punctuation">,</span>dc=com
      <span class="token key atrule">group_search_base</span><span class="token punctuation">:</span> ou=groups<span class="token punctuation">,</span>dc=company<span class="token punctuation">,</span>dc=com

  <span class="token key atrule">authorization</span><span class="token punctuation">:</span>
    <span class="token comment"># RBAC 权限模型</span>
    <span class="token key atrule">roles</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;mcp:viewer&quot;</span>
        <span class="token key atrule">permissions</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&quot;tools:read&quot;</span>
          <span class="token punctuation">-</span> <span class="token string">&quot;metrics:query&quot;</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;mcp:operator&quot;</span>
        <span class="token key atrule">permissions</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&quot;tools:read&quot;</span>
          <span class="token punctuation">-</span> <span class="token string">&quot;tools:execute&quot;</span>
          <span class="token punctuation">-</span> <span class="token string">&quot;metrics:query&quot;</span>
          <span class="token punctuation">-</span> <span class="token string">&quot;k8s:get&quot;</span>
          <span class="token punctuation">-</span> <span class="token string">&quot;k8s:scale&quot;</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;mcp:admin&quot;</span>
        <span class="token key atrule">permissions</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">&quot;*&quot;</span>

    <span class="token comment"># 资源权限</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token key atrule">k8s_namespaces</span><span class="token punctuation">:</span>
        <span class="token key atrule">production</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;mcp:admin&quot;</span><span class="token punctuation">]</span>
        <span class="token key atrule">staging</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;mcp:operator&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mcp:admin&quot;</span><span class="token punctuation">]</span>
        <span class="token key atrule">development</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;mcp:viewer&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mcp:operator&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mcp:admin&quot;</span><span class="token punctuation">]</span>

  <span class="token key atrule">rate_limiting</span><span class="token punctuation">:</span>
    <span class="token comment"># 请求频率限制</span>
    <span class="token key atrule">global_limit</span><span class="token punctuation">:</span> <span class="token string">&quot;1000/hour&quot;</span>
    <span class="token key atrule">user_limit</span><span class="token punctuation">:</span> <span class="token string">&quot;100/hour&quot;</span>
    <span class="token key atrule">tool_limits</span><span class="token punctuation">:</span>
      <span class="token key atrule">&quot;k8s:scale&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;10/hour&quot;</span>
      <span class="token key atrule">&quot;k8s:restart&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;5/hour&quot;</span>
      <span class="token key atrule">&quot;monitoring:create_dashboard&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;20/hour&quot;</span>

  <span class="token key atrule">audit</span><span class="token punctuation">:</span>
    <span class="token comment"># 审计日志</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> elasticsearch
    <span class="token key atrule">retention_days</span><span class="token punctuation">:</span> <span class="token number">90</span>
    <span class="token key atrule">sensitive_fields</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;api_key&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;token&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-网络安全配置" tabindex="-1"><a class="header-anchor" href="#_4-2-网络安全配置" aria-hidden="true">#</a> 4.2 网络安全配置</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># security_middleware.py - 安全中间件</span>
<span class="token keyword">import</span> jwt
<span class="token keyword">import</span> time
<span class="token keyword">import</span> hashlib
<span class="token keyword">from</span> functools <span class="token keyword">import</span> wraps
<span class="token keyword">from</span> flask <span class="token keyword">import</span> request<span class="token punctuation">,</span> jsonify<span class="token punctuation">,</span> g
<span class="token keyword">import</span> redis
<span class="token keyword">import</span> logging
<span class="token keyword">import</span> json

<span class="token keyword">class</span> <span class="token class-name">MCPSecurityMiddleware</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> app<span class="token punctuation">,</span> redis_client<span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>app <span class="token operator">=</span> app
        self<span class="token punctuation">.</span>redis <span class="token operator">=</span> redis_client
        self<span class="token punctuation">.</span>config <span class="token operator">=</span> config
        self<span class="token punctuation">.</span>setup_middleware<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">setup_middleware</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;配置安全中间件&quot;&quot;&quot;</span>

        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>app<span class="token punctuation">.</span>before_request</span>
        <span class="token keyword">def</span> <span class="token function">security_check</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token triple-quoted-string string">&quot;&quot;&quot;请求前安全检查&quot;&quot;&quot;</span>
            <span class="token comment"># IP 白名单检查</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>_check_ip_whitelist<span class="token punctuation">(</span>request<span class="token punctuation">.</span>remote_addr<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;IP not allowed&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">403</span>

            <span class="token comment"># 频率限制检查</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>_check_rate_limit<span class="token punctuation">(</span>request<span class="token punctuation">.</span>remote_addr<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Rate limit exceeded&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">429</span>

            <span class="token comment"># JWT 认证</span>
            token <span class="token operator">=</span> request<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;Authorization&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">&#39;Bearer &#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> token<span class="token punctuation">:</span>
                <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Missing authorization token&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">401</span>

            <span class="token keyword">try</span><span class="token punctuation">:</span>
                payload <span class="token operator">=</span> jwt<span class="token punctuation">.</span>decode<span class="token punctuation">(</span>
                    token<span class="token punctuation">,</span>
                    self<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;jwt&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;secret_key&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                    algorithms<span class="token operator">=</span><span class="token punctuation">[</span>self<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;jwt&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;algorithm&#39;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
                <span class="token punctuation">)</span>
                g<span class="token punctuation">.</span>user <span class="token operator">=</span> payload

                <span class="token comment"># 记录审计日志</span>
                self<span class="token punctuation">.</span>_log_request<span class="token punctuation">(</span>payload<span class="token punctuation">[</span><span class="token string">&#39;sub&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span>path<span class="token punctuation">,</span> request<span class="token punctuation">.</span>method<span class="token punctuation">)</span>

            <span class="token keyword">except</span> jwt<span class="token punctuation">.</span>ExpiredSignatureError<span class="token punctuation">:</span>
                <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Token expired&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">401</span>
            <span class="token keyword">except</span> jwt<span class="token punctuation">.</span>InvalidTokenError<span class="token punctuation">:</span>
                <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Invalid token&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">401</span>

    <span class="token keyword">def</span> <span class="token function">_check_ip_whitelist</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> ip<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;检查 IP 白名单&quot;&quot;&quot;</span>
        whitelist <span class="token operator">=</span> self<span class="token punctuation">.</span>config<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;ip_whitelist&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> whitelist<span class="token punctuation">:</span>  <span class="token comment"># 如果没有配置白名单，则允许所有 IP</span>
            <span class="token keyword">return</span> <span class="token boolean">True</span>

        <span class="token comment"># 支持 CIDR 网段</span>
        <span class="token keyword">import</span> ipaddress
        <span class="token keyword">for</span> allowed_ip <span class="token keyword">in</span> whitelist<span class="token punctuation">:</span>
            <span class="token keyword">try</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> ipaddress<span class="token punctuation">.</span>ip_address<span class="token punctuation">(</span>ip<span class="token punctuation">)</span> <span class="token keyword">in</span> ipaddress<span class="token punctuation">.</span>ip_network<span class="token punctuation">(</span>allowed_ip<span class="token punctuation">,</span> strict<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token boolean">True</span>
            <span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
                <span class="token keyword">if</span> ip <span class="token operator">==</span> allowed_ip<span class="token punctuation">:</span>  <span class="token comment"># 精确匹配</span>
                    <span class="token keyword">return</span> <span class="token boolean">True</span>

        <span class="token keyword">return</span> <span class="token boolean">False</span>

    <span class="token keyword">def</span> <span class="token function">_check_rate_limit</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> ip<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;频率限制检查&quot;&quot;&quot;</span>
        key <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;rate_limit:</span><span class="token interpolation"><span class="token punctuation">{</span>ip<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
        current <span class="token operator">=</span> self<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>get<span class="token punctuation">(</span>key<span class="token punctuation">)</span>

        <span class="token keyword">if</span> current <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token comment"># 第一次请求</span>
            self<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>setex<span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token number">3600</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 1小时窗口</span>
            <span class="token keyword">return</span> <span class="token boolean">True</span>

        current <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span>
        limit <span class="token operator">=</span> self<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;rate_limiting&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;global_limit&#39;</span><span class="token punctuation">]</span>
        max_requests <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>limit<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> current <span class="token operator">&gt;=</span> max_requests<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token boolean">False</span>

        self<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>incr<span class="token punctuation">(</span>key<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">True</span>

    <span class="token keyword">def</span> <span class="token function">_log_request</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> user_id<span class="token punctuation">,</span> path<span class="token punctuation">,</span> method<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;记录审计日志&quot;&quot;&quot;</span>
        log_entry <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token string">&#39;timestamp&#39;</span><span class="token punctuation">:</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token string">&#39;user_id&#39;</span><span class="token punctuation">:</span> user_id<span class="token punctuation">,</span>
            <span class="token string">&#39;path&#39;</span><span class="token punctuation">:</span> path<span class="token punctuation">,</span>
            <span class="token string">&#39;method&#39;</span><span class="token punctuation">:</span> method<span class="token punctuation">,</span>
            <span class="token string">&#39;ip&#39;</span><span class="token punctuation">:</span> request<span class="token punctuation">.</span>remote_addr<span class="token punctuation">,</span>
            <span class="token string">&#39;user_agent&#39;</span><span class="token punctuation">:</span> request<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token string">&#39;request_id&#39;</span><span class="token punctuation">:</span> hashlib<span class="token punctuation">.</span>md5<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>user_id<span class="token punctuation">}</span></span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>hexdigest<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># 异步写入审计日志</span>
        self<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>lpush<span class="token punctuation">(</span><span class="token string">&#39;audit_logs&#39;</span><span class="token punctuation">,</span> json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>log_entry<span class="token punctuation">)</span><span class="token punctuation">)</span>

        logging<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;MCP Request: </span><span class="token interpolation"><span class="token punctuation">{</span>user_id<span class="token punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token punctuation">{</span>method<span class="token punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">require_permission</span><span class="token punctuation">(</span>permission<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;权限检查装饰器&quot;&quot;&quot;</span>
    <span class="token keyword">def</span> <span class="token function">decorator</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token decorator annotation punctuation">@wraps</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
        <span class="token keyword">def</span> <span class="token function">decorated_function</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Authentication required&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">401</span>

            user_permissions <span class="token operator">=</span> g<span class="token punctuation">.</span>user<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;permissions&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

            <span class="token comment"># 检查是否有通配符权限</span>
            <span class="token keyword">if</span> <span class="token string">&#39;*&#39;</span> <span class="token keyword">in</span> user_permissions<span class="token punctuation">:</span>
                <span class="token keyword">return</span> f<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>

            <span class="token comment"># 检查具体权限</span>
            <span class="token keyword">if</span> permission <span class="token keyword">not</span> <span class="token keyword">in</span> user_permissions<span class="token punctuation">:</span>
                <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f&quot;Permission denied: </span><span class="token interpolation"><span class="token punctuation">{</span>permission<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">403</span>

            <span class="token keyword">return</span> f<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">return</span> decorated_function
    <span class="token keyword">return</span> decorator
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-数据加密与传输安全" tabindex="-1"><a class="header-anchor" href="#_4-3-数据加密与传输安全" aria-hidden="true">#</a> 4.3 数据加密与传输安全</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># encryption.py - 数据加密工具</span>
<span class="token keyword">from</span> cryptography<span class="token punctuation">.</span>fernet <span class="token keyword">import</span> Fernet
<span class="token keyword">from</span> cryptography<span class="token punctuation">.</span>hazmat<span class="token punctuation">.</span>primitives <span class="token keyword">import</span> hashes
<span class="token keyword">from</span> cryptography<span class="token punctuation">.</span>hazmat<span class="token punctuation">.</span>primitives<span class="token punctuation">.</span>kdf<span class="token punctuation">.</span>pbkdf2 <span class="token keyword">import</span> PBKDF2HMAC
<span class="token keyword">import</span> base64
<span class="token keyword">import</span> os
<span class="token keyword">import</span> json

<span class="token keyword">class</span> <span class="token class-name">MCPEncryption</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> password<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> password<span class="token punctuation">:</span>
            <span class="token comment"># 基于密码生成密钥</span>
            salt <span class="token operator">=</span> os<span class="token punctuation">.</span>urandom<span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span>
            kdf <span class="token operator">=</span> PBKDF2HMAC<span class="token punctuation">(</span>
                algorithm<span class="token operator">=</span>hashes<span class="token punctuation">.</span>SHA256<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                length<span class="token operator">=</span><span class="token number">32</span><span class="token punctuation">,</span>
                salt<span class="token operator">=</span>salt<span class="token punctuation">,</span>
                iterations<span class="token operator">=</span><span class="token number">100000</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span>
            key <span class="token operator">=</span> base64<span class="token punctuation">.</span>urlsafe_b64encode<span class="token punctuation">(</span>kdf<span class="token punctuation">.</span>derive<span class="token punctuation">(</span>password<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>cipher <span class="token operator">=</span> Fernet<span class="token punctuation">(</span>key<span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>salt <span class="token operator">=</span> salt
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token comment"># 生成随机密钥</span>
            key <span class="token operator">=</span> Fernet<span class="token punctuation">.</span>generate_key<span class="token punctuation">(</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>cipher <span class="token operator">=</span> Fernet<span class="token punctuation">(</span>key<span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>key <span class="token operator">=</span> key

    <span class="token keyword">def</span> <span class="token function">encrypt_data</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;加密数据&quot;&quot;&quot;</span>
        <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token builtin">dict</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            data <span class="token operator">=</span> json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            data <span class="token operator">=</span> data<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span>

        encrypted <span class="token operator">=</span> self<span class="token punctuation">.</span>cipher<span class="token punctuation">.</span>encrypt<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token keyword">return</span> base64<span class="token punctuation">.</span>urlsafe_b64encode<span class="token punctuation">(</span>encrypted<span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">decrypt_data</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> encrypted_data<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;解密数据&quot;&quot;&quot;</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            encrypted_bytes <span class="token operator">=</span> base64<span class="token punctuation">.</span>urlsafe_b64decode<span class="token punctuation">(</span>encrypted_data<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            decrypted <span class="token operator">=</span> self<span class="token punctuation">.</span>cipher<span class="token punctuation">.</span>decrypt<span class="token punctuation">(</span>encrypted_bytes<span class="token punctuation">)</span>
            <span class="token keyword">return</span> decrypted<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> ValueError<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Decryption failed: </span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">encrypt_sensitive_config</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;加密敏感配置&quot;&quot;&quot;</span>
        sensitive_keys <span class="token operator">=</span> <span class="token punctuation">[</span>
            <span class="token string">&#39;api_key&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;password&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;secret_key&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;private_key&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;token&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;client_secret&#39;</span>
        <span class="token punctuation">]</span>

        <span class="token keyword">def</span> <span class="token function">encrypt_recursive</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token builtin">dict</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> <span class="token punctuation">{</span>
                    key<span class="token punctuation">:</span> self<span class="token punctuation">.</span>encrypt_data<span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token keyword">if</span> key <span class="token keyword">in</span> sensitive_keys
                    <span class="token keyword">else</span> encrypt_recursive<span class="token punctuation">(</span>value<span class="token punctuation">)</span>
                    <span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token keyword">in</span> obj<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token keyword">elif</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token builtin">list</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> <span class="token punctuation">[</span>encrypt_recursive<span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token keyword">for</span> item <span class="token keyword">in</span> obj<span class="token punctuation">]</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> obj

        <span class="token keyword">return</span> encrypt_recursive<span class="token punctuation">(</span>config<span class="token punctuation">)</span>

<span class="token comment"># SSL/TLS 配置</span>
<span class="token keyword">def</span> <span class="token function">setup_ssl_context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;配置 SSL 上下文&quot;&quot;&quot;</span>
    <span class="token keyword">import</span> ssl

    context <span class="token operator">=</span> ssl<span class="token punctuation">.</span>create_default_context<span class="token punctuation">(</span>ssl<span class="token punctuation">.</span>Purpose<span class="token punctuation">.</span>SERVER_AUTH<span class="token punctuation">)</span>
    context<span class="token punctuation">.</span>check_hostname <span class="token operator">=</span> <span class="token boolean">False</span>  <span class="token comment"># 内网环境可以禁用</span>
    context<span class="token punctuation">.</span>verify_mode <span class="token operator">=</span> ssl<span class="token punctuation">.</span>CERT_REQUIRED

    <span class="token comment"># 加载企业 CA 证书</span>
    context<span class="token punctuation">.</span>load_verify_locations<span class="token punctuation">(</span><span class="token string">&#39;/etc/ssl/certs/company-ca.crt&#39;</span><span class="token punctuation">)</span>

    <span class="token comment"># 加载客户端证书（双向认证）</span>
    context<span class="token punctuation">.</span>load_cert_chain<span class="token punctuation">(</span>
        <span class="token string">&#39;/etc/ssl/certs/mcp-client.crt&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;/etc/ssl/private/mcp-client.key&#39;</span>
    <span class="token punctuation">)</span>

    <span class="token keyword">return</span> context
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-代码实现" tabindex="-1"><a class="header-anchor" href="#_5-代码实现" aria-hidden="true">#</a> 5. 代码实现</h2><h3 id="_5-1-主服务器实现" tabindex="-1"><a class="header-anchor" href="#_5-1-主服务器实现" aria-hidden="true">#</a> 5.1 主服务器实现</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># main_server.py - 主 MCP 服务器</span>
<span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> logging
<span class="token keyword">from</span> typing <span class="token keyword">import</span> Any<span class="token punctuation">,</span> Dict<span class="token punctuation">,</span> List
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server <span class="token keyword">import</span> Server
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server<span class="token punctuation">.</span>stdio <span class="token keyword">import</span> stdio_server
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>server<span class="token punctuation">.</span>models <span class="token keyword">import</span> InitializationOptions
<span class="token keyword">from</span> mcp<span class="token punctuation">.</span>types <span class="token keyword">import</span> TextContent<span class="token punctuation">,</span> Tool<span class="token punctuation">,</span> Resource
<span class="token keyword">import</span> yaml
<span class="token keyword">import</span> os

<span class="token keyword">class</span> <span class="token class-name">EnterpriseMCPServer</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> config_path<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 加载配置</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>config_path<span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>config <span class="token operator">=</span> yaml<span class="token punctuation">.</span>safe_load<span class="token punctuation">(</span>f<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>server <span class="token operator">=</span> Server<span class="token punctuation">(</span><span class="token string">&quot;enterprise-mcp-server&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>tool_registry <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        self<span class="token punctuation">.</span>resource_registry <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

        <span class="token comment"># 初始化子系统</span>
        self<span class="token punctuation">.</span>_init_subsystems<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_register_tools<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">_init_subsystems</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;初始化子系统&quot;&quot;&quot;</span>
        <span class="token comment"># 导入子系统模块</span>
        <span class="token keyword">from</span> k8s_ops_server <span class="token keyword">import</span> K8sOpsMCPServer
        <span class="token keyword">from</span> monitoring_server <span class="token keyword">import</span> MonitoringMCPServer
        <span class="token keyword">from</span> cmdb_server <span class="token keyword">import</span> CMDBMCPServer

        <span class="token comment"># 初始化子系统</span>
        self<span class="token punctuation">.</span>k8s_ops <span class="token operator">=</span> K8sOpsMCPServer<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>monitoring <span class="token operator">=</span> MonitoringMCPServer<span class="token punctuation">(</span>
            prometheus_url<span class="token operator">=</span>self<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;monitoring&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;prometheus_url&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            grafana_url<span class="token operator">=</span>self<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;monitoring&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;grafana_url&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>cmdb <span class="token operator">=</span> CMDBMCPServer<span class="token punctuation">(</span>
            cmdb_api_url<span class="token operator">=</span>self<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;cmdb&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;api_url&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            api_key<span class="token operator">=</span>self<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&#39;cmdb&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;api_key&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">_register_tools</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;注册所有工具&quot;&quot;&quot;</span>

        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>list_tools</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">list_tools</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> List<span class="token punctuation">[</span>Tool<span class="token punctuation">]</span><span class="token punctuation">:</span>
            all_tools <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

            <span class="token comment"># 聚合所有子系统的工具</span>
            k8s_tools <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>k8s_ops<span class="token punctuation">.</span>server<span class="token punctuation">.</span>_list_tools_handler<span class="token punctuation">(</span><span class="token punctuation">)</span>
            monitoring_tools <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>monitoring<span class="token punctuation">.</span>server<span class="token punctuation">.</span>_list_tools_handler<span class="token punctuation">(</span><span class="token punctuation">)</span>
            cmdb_tools <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>cmdb<span class="token punctuation">.</span>server<span class="token punctuation">.</span>_list_tools_handler<span class="token punctuation">(</span><span class="token punctuation">)</span>

            <span class="token comment"># 添加前缀以区分工具来源</span>
            <span class="token keyword">for</span> tool <span class="token keyword">in</span> k8s_tools<span class="token punctuation">:</span>
                tool<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;k8s:</span><span class="token interpolation"><span class="token punctuation">{</span>tool<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                all_tools<span class="token punctuation">.</span>append<span class="token punctuation">(</span>tool<span class="token punctuation">)</span>

            <span class="token keyword">for</span> tool <span class="token keyword">in</span> monitoring_tools<span class="token punctuation">:</span>
                tool<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;monitoring:</span><span class="token interpolation"><span class="token punctuation">{</span>tool<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                all_tools<span class="token punctuation">.</span>append<span class="token punctuation">(</span>tool<span class="token punctuation">)</span>

            <span class="token keyword">for</span> tool <span class="token keyword">in</span> cmdb_tools<span class="token punctuation">:</span>
                tool<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;cmdb:</span><span class="token interpolation"><span class="token punctuation">{</span>tool<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                all_tools<span class="token punctuation">.</span>append<span class="token punctuation">(</span>tool<span class="token punctuation">)</span>

            <span class="token keyword">return</span> all_tools

        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>call_tool</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">call_tool</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> arguments<span class="token punctuation">:</span> Dict<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">,</span> Any<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> List<span class="token punctuation">[</span>TextContent<span class="token punctuation">]</span><span class="token punctuation">:</span>
            <span class="token triple-quoted-string string">&quot;&quot;&quot;路由工具调用到相应的子系统&quot;&quot;&quot;</span>
            <span class="token keyword">try</span><span class="token punctuation">:</span>
                <span class="token comment"># 解析工具前缀</span>
                <span class="token keyword">if</span> <span class="token string">&#39;:&#39;</span> <span class="token keyword">not</span> <span class="token keyword">in</span> name<span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                        <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                        text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;Invalid tool name format: </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                    <span class="token punctuation">)</span><span class="token punctuation">]</span>

                subsystem<span class="token punctuation">,</span> tool_name <span class="token operator">=</span> name<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&#39;:&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

                <span class="token comment"># 路由到相应子系统</span>
                <span class="token keyword">if</span> subsystem <span class="token operator">==</span> <span class="token string">&#39;k8s&#39;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>k8s_ops<span class="token punctuation">.</span>server<span class="token punctuation">.</span>_call_tool_handler<span class="token punctuation">(</span>tool_name<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> subsystem <span class="token operator">==</span> <span class="token string">&#39;monitoring&#39;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>monitoring<span class="token punctuation">.</span>server<span class="token punctuation">.</span>_call_tool_handler<span class="token punctuation">(</span>tool_name<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
                <span class="token keyword">elif</span> subsystem <span class="token operator">==</span> <span class="token string">&#39;cmdb&#39;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>cmdb<span class="token punctuation">.</span>server<span class="token punctuation">.</span>_call_tool_handler<span class="token punctuation">(</span>tool_name<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                        <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                        text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;Unknown subsystem: </span><span class="token interpolation"><span class="token punctuation">{</span>subsystem<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                    <span class="token punctuation">)</span><span class="token punctuation">]</span>

            <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
                logging<span class="token punctuation">.</span>error<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Tool execution error: </span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token punctuation">[</span>TextContent<span class="token punctuation">(</span>
                    <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                    text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;Error executing </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
                <span class="token punctuation">)</span><span class="token punctuation">]</span>

        <span class="token decorator annotation punctuation">@self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>list_resources</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">list_resources</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> List<span class="token punctuation">[</span>Resource<span class="token punctuation">]</span><span class="token punctuation">:</span>
            <span class="token triple-quoted-string string">&quot;&quot;&quot;列出可用资源&quot;&quot;&quot;</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span>
                Resource<span class="token punctuation">(</span>
                    uri<span class="token operator">=</span><span class="token string">&quot;enterprise://k8s/clusters&quot;</span><span class="token punctuation">,</span>
                    name<span class="token operator">=</span><span class="token string">&quot;Kubernetes Clusters&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;企业 Kubernetes 集群信息&quot;</span><span class="token punctuation">,</span>
                    mimeType<span class="token operator">=</span><span class="token string">&quot;application/json&quot;</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Resource<span class="token punctuation">(</span>
                    uri<span class="token operator">=</span><span class="token string">&quot;enterprise://monitoring/dashboards&quot;</span><span class="token punctuation">,</span>
                    name<span class="token operator">=</span><span class="token string">&quot;Monitoring Dashboards&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;监控仪表板列表&quot;</span><span class="token punctuation">,</span>
                    mimeType<span class="token operator">=</span><span class="token string">&quot;application/json&quot;</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
                Resource<span class="token punctuation">(</span>
                    uri<span class="token operator">=</span><span class="token string">&quot;enterprise://cmdb/assets&quot;</span><span class="token punctuation">,</span>
                    name<span class="token operator">=</span><span class="token string">&quot;Asset Inventory&quot;</span><span class="token punctuation">,</span>
                    description<span class="token operator">=</span><span class="token string">&quot;企业资产清单&quot;</span><span class="token punctuation">,</span>
                    mimeType<span class="token operator">=</span><span class="token string">&quot;application/json&quot;</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">]</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;启动服务器&quot;&quot;&quot;</span>
    logging<span class="token punctuation">.</span>basicConfig<span class="token punctuation">(</span>level<span class="token operator">=</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

    <span class="token comment"># 检查配置文件</span>
    config_path <span class="token operator">=</span> os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">&#39;MCP_CONFIG_PATH&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;config/mcp-config.yaml&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span>config_path<span class="token punctuation">)</span><span class="token punctuation">:</span>
        logging<span class="token punctuation">.</span>error<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Configuration file not found: </span><span class="token interpolation"><span class="token punctuation">{</span>config_path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>

    <span class="token comment"># 创建服务器实例</span>
    mcp_server <span class="token operator">=</span> EnterpriseMCPServer<span class="token punctuation">(</span>config_path<span class="token punctuation">)</span>

    <span class="token comment"># 启动服务器</span>
    <span class="token keyword">async</span> <span class="token keyword">with</span> stdio_server<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token punctuation">(</span>read_stream<span class="token punctuation">,</span> write_stream<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">await</span> mcp_server<span class="token punctuation">.</span>server<span class="token punctuation">.</span>run<span class="token punctuation">(</span>
            read_stream<span class="token punctuation">,</span>
            write_stream<span class="token punctuation">,</span>
            InitializationOptions<span class="token punctuation">(</span>
                server_name<span class="token operator">=</span><span class="token string">&quot;enterprise-mcp-server&quot;</span><span class="token punctuation">,</span>
                server_version<span class="token operator">=</span><span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
                capabilities<span class="token operator">=</span>mcp_server<span class="token punctuation">.</span>server<span class="token punctuation">.</span>get_capabilities<span class="token punctuation">(</span>
                    notification_options<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span>
                    experimental_capabilities<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-http-适配器" tabindex="-1"><a class="header-anchor" href="#_5-2-http-适配器" aria-hidden="true">#</a> 5.2 HTTP 适配器</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># http_adapter.py - HTTP 适配器</span>
<span class="token keyword">from</span> fastapi <span class="token keyword">import</span> FastAPI<span class="token punctuation">,</span> HTTPException<span class="token punctuation">,</span> Depends<span class="token punctuation">,</span> Security
<span class="token keyword">from</span> fastapi<span class="token punctuation">.</span>security <span class="token keyword">import</span> HTTPBearer<span class="token punctuation">,</span> HTTPAuthorizationCredentials
<span class="token keyword">from</span> fastapi<span class="token punctuation">.</span>middleware<span class="token punctuation">.</span>cors <span class="token keyword">import</span> CORSMiddleware
<span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> json
<span class="token keyword">from</span> typing <span class="token keyword">import</span> Dict<span class="token punctuation">,</span> Any
<span class="token keyword">import</span> uvicorn
<span class="token keyword">import</span> os

app <span class="token operator">=</span> FastAPI<span class="token punctuation">(</span>
    title<span class="token operator">=</span><span class="token string">&quot;Enterprise MCP Server HTTP API&quot;</span><span class="token punctuation">,</span>
    description<span class="token operator">=</span><span class="token string">&quot;企业级 MCP 服务器 HTTP 接口&quot;</span><span class="token punctuation">,</span>
    version<span class="token operator">=</span><span class="token string">&quot;1.0.0&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment"># CORS 配置</span>
app<span class="token punctuation">.</span>add_middleware<span class="token punctuation">(</span>
    CORSMiddleware<span class="token punctuation">,</span>
    allow_origins<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;https://*.company.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment"># 只允许企业域名</span>
    allow_credentials<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
    allow_methods<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    allow_headers<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

security <span class="token operator">=</span> HTTPBearer<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">MCPHTTPAdapter</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> mcp_server<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>mcp_server <span class="token operator">=</span> mcp_server

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">verify_token</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> credentials<span class="token punctuation">:</span> HTTPAuthorizationCredentials <span class="token operator">=</span> Security<span class="token punctuation">(</span>security<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;验证 JWT Token&quot;&quot;&quot;</span>
        token <span class="token operator">=</span> credentials<span class="token punctuation">.</span>credentials
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token comment"># 这里集成企业认证系统</span>
            user_info <span class="token operator">=</span> <span class="token keyword">await</span> self<span class="token punctuation">.</span>_validate_jwt_token<span class="token punctuation">(</span>token<span class="token punctuation">)</span>
            <span class="token keyword">return</span> user_info
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">401</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token string">&quot;Invalid authentication token&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_validate_jwt_token</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> token<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;验证 JWT Token（集成企业认证）&quot;&quot;&quot;</span>
        <span class="token keyword">import</span> jwt

        <span class="token keyword">try</span><span class="token punctuation">:</span>
            payload <span class="token operator">=</span> jwt<span class="token punctuation">.</span>decode<span class="token punctuation">(</span>
                token<span class="token punctuation">,</span>
                os<span class="token punctuation">.</span>getenv<span class="token punctuation">(</span><span class="token string">&#39;JWT_SECRET_KEY&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                algorithms<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;HS256&#39;</span><span class="token punctuation">]</span>
            <span class="token punctuation">)</span>
            <span class="token keyword">return</span> payload
        <span class="token keyword">except</span> jwt<span class="token punctuation">.</span>ExpiredSignatureError<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">401</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token string">&quot;Token expired&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> jwt<span class="token punctuation">.</span>InvalidTokenError<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">401</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token string">&quot;Invalid token&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 创建适配器实例</span>
<span class="token keyword">from</span> main_server <span class="token keyword">import</span> EnterpriseMCPServer
mcp_server <span class="token operator">=</span> EnterpriseMCPServer<span class="token punctuation">(</span><span class="token string">&#39;config/mcp-config.yaml&#39;</span><span class="token punctuation">)</span>
adapter <span class="token operator">=</span> MCPHTTPAdapter<span class="token punctuation">(</span>mcp_server<span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">&quot;/health&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">health_check</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;健康检查&quot;&quot;&quot;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">&quot;status&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;healthy&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;version&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">}</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">&quot;/tools&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">list_tools</span><span class="token punctuation">(</span>user<span class="token punctuation">:</span> <span class="token builtin">dict</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>adapter<span class="token punctuation">.</span>verify_token<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;列出可用工具&quot;&quot;&quot;</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        tools <span class="token operator">=</span> <span class="token keyword">await</span> mcp_server<span class="token punctuation">.</span>server<span class="token punctuation">.</span>_list_tools_handler<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;tools&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> tool<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
                    <span class="token string">&quot;description&quot;</span><span class="token punctuation">:</span> tool<span class="token punctuation">.</span>description<span class="token punctuation">,</span>
                    <span class="token string">&quot;inputSchema&quot;</span><span class="token punctuation">:</span> tool<span class="token punctuation">.</span>inputSchema
                <span class="token punctuation">}</span>
                <span class="token keyword">for</span> tool <span class="token keyword">in</span> tools
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">500</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>post</span><span class="token punctuation">(</span><span class="token string">&quot;/tools/{tool_name}/execute&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">execute_tool</span><span class="token punctuation">(</span>
    tool_name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
    arguments<span class="token punctuation">:</span> Dict<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">,</span> Any<span class="token punctuation">]</span><span class="token punctuation">,</span>
    user<span class="token punctuation">:</span> <span class="token builtin">dict</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>adapter<span class="token punctuation">.</span>verify_token<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;执行工具&quot;&quot;&quot;</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token comment"># 权限检查</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token keyword">await</span> _check_tool_permission<span class="token punctuation">(</span>user<span class="token punctuation">,</span> tool_name<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">403</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token string">&quot;Permission denied&quot;</span><span class="token punctuation">)</span>

        <span class="token comment"># 执行工具</span>
        results <span class="token operator">=</span> <span class="token keyword">await</span> mcp_server<span class="token punctuation">.</span>server<span class="token punctuation">.</span>_call_tool_handler<span class="token punctuation">(</span>tool_name<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>

        <span class="token comment"># 格式化结果</span>
        formatted_results <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> result <span class="token keyword">in</span> results<span class="token punctuation">:</span>
            <span class="token keyword">if</span> result<span class="token punctuation">.</span><span class="token builtin">type</span> <span class="token operator">==</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">:</span>
                formatted_results<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">{</span>
                    <span class="token string">&quot;type&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
                    <span class="token string">&quot;content&quot;</span><span class="token punctuation">:</span> result<span class="token punctuation">.</span>text
                <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">&quot;results&quot;</span><span class="token punctuation">:</span> formatted_results<span class="token punctuation">}</span>

    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">500</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">&quot;/resources&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">list_resources</span><span class="token punctuation">(</span>user<span class="token punctuation">:</span> <span class="token builtin">dict</span> <span class="token operator">=</span> Depends<span class="token punctuation">(</span>adapter<span class="token punctuation">.</span>verify_token<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;列出可用资源&quot;&quot;&quot;</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        resources <span class="token operator">=</span> <span class="token keyword">await</span> mcp_server<span class="token punctuation">.</span>server<span class="token punctuation">.</span>_list_resources_handler<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;resources&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token string">&quot;uri&quot;</span><span class="token punctuation">:</span> resource<span class="token punctuation">.</span>uri<span class="token punctuation">,</span>
                    <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> resource<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
                    <span class="token string">&quot;description&quot;</span><span class="token punctuation">:</span> resource<span class="token punctuation">.</span>description<span class="token punctuation">,</span>
                    <span class="token string">&quot;mimeType&quot;</span><span class="token punctuation">:</span> resource<span class="token punctuation">.</span>mimeType
                <span class="token punctuation">}</span>
                <span class="token keyword">for</span> resource <span class="token keyword">in</span> resources
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> HTTPException<span class="token punctuation">(</span>status_code<span class="token operator">=</span><span class="token number">500</span><span class="token punctuation">,</span> detail<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">_check_tool_permission</span><span class="token punctuation">(</span>user<span class="token punctuation">:</span> <span class="token builtin">dict</span><span class="token punctuation">,</span> tool_name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">bool</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;检查工具权限&quot;&quot;&quot;</span>
    user_permissions <span class="token operator">=</span> user<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;permissions&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment"># 管理员权限</span>
    <span class="token keyword">if</span> <span class="token string">&#39;*&#39;</span> <span class="token keyword">in</span> user_permissions<span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token boolean">True</span>

    <span class="token comment"># 检查具体工具权限</span>
    tool_permission <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;tools:</span><span class="token interpolation"><span class="token punctuation">{</span>tool_name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token keyword">return</span> tool_permission <span class="token keyword">in</span> user_permissions

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    uvicorn<span class="token punctuation">.</span>run<span class="token punctuation">(</span>
        app<span class="token punctuation">,</span>
        host<span class="token operator">=</span><span class="token string">&quot;0.0.0.0&quot;</span><span class="token punctuation">,</span>
        port<span class="token operator">=</span><span class="token number">8080</span><span class="token punctuation">,</span>
        ssl_keyfile<span class="token operator">=</span><span class="token string">&quot;/etc/ssl/private/mcp-server.key&quot;</span><span class="token punctuation">,</span>
        ssl_certfile<span class="token operator">=</span><span class="token string">&quot;/etc/ssl/certs/mcp-server.crt&quot;</span>
    <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-部署运维" tabindex="-1"><a class="header-anchor" href="#_6-部署运维" aria-hidden="true">#</a> 6. 部署运维</h2><h3 id="_6-1-docker-容器化部署" tabindex="-1"><a class="header-anchor" href="#_6-1-docker-容器化部署" aria-hidden="true">#</a> 6.1 Docker 容器化部署</h3><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># Dockerfile</span>
<span class="token instruction"><span class="token keyword">FROM</span> python:3.11-slim</span>

<span class="token comment"># 设置工作目录</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>

<span class="token comment"># 安装系统依赖</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; apt-get install -y <span class="token operator">\\</span>
    curl <span class="token operator">\\</span>
    git <span class="token operator">\\</span>
    &amp;&amp; rm -rf /var/lib/apt/lists/*</span>

<span class="token comment"># 复制依赖文件</span>
<span class="token instruction"><span class="token keyword">COPY</span> requirements.txt .</span>

<span class="token comment"># 安装 Python 依赖</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install --no-cache-dir -r requirements.txt</span>

<span class="token comment"># 复制应用代码</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>

<span class="token comment"># 创建非 root 用户</span>
<span class="token instruction"><span class="token keyword">RUN</span> groupadd -r mcp &amp;&amp; useradd -r -g mcp -d /app -s /sbin/nologin mcp</span>
<span class="token instruction"><span class="token keyword">RUN</span> chown -R mcp:mcp /app</span>

<span class="token comment"># 切换到非 root 用户</span>
<span class="token instruction"><span class="token keyword">USER</span> mcp</span>

<span class="token comment"># 健康检查</span>
<span class="token instruction"><span class="token keyword">HEALTHCHECK</span> <span class="token options"><span class="token property">--interval</span><span class="token punctuation">=</span><span class="token string">30s</span> <span class="token property">--timeout</span><span class="token punctuation">=</span><span class="token string">10s</span> <span class="token property">--start-period</span><span class="token punctuation">=</span><span class="token string">5s</span> <span class="token property">--retries</span><span class="token punctuation">=</span><span class="token string">3</span></span> <span class="token operator">\\</span>
    <span class="token keyword">CMD</span> curl -f http://localhost:8080/health || exit 1</span>

<span class="token comment"># 暴露端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span>

<span class="token comment"># 启动命令</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;python&quot;</span>, <span class="token string">&quot;http_adapter.py&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-kubernetes-部署配置" tabindex="-1"><a class="header-anchor" href="#_6-2-kubernetes-部署配置" aria-hidden="true">#</a> 6.2 Kubernetes 部署配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># k8s-deployment.yaml - Kubernetes 部署配置</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server<span class="token punctuation">-</span>config
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>system
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">mcp-config.yaml</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    server:
      name: &quot;enterprise-mcp-server&quot;
      version: &quot;1.0.0&quot;
      host: &quot;0.0.0.0&quot;
      port: 8080</span>

    <span class="token key atrule">monitoring</span><span class="token punctuation">:</span>
      <span class="token key atrule">prometheus_url</span><span class="token punctuation">:</span> <span class="token string">&quot;http://prometheus:9090&quot;</span>
      <span class="token key atrule">grafana_url</span><span class="token punctuation">:</span> <span class="token string">&quot;http://grafana:3000&quot;</span>

    <span class="token key atrule">cmdb</span><span class="token punctuation">:</span>
      <span class="token key atrule">api_url</span><span class="token punctuation">:</span> <span class="token string">&quot;https://cmdb.company.com/api&quot;</span>
      <span class="token key atrule">api_key_secret</span><span class="token punctuation">:</span> <span class="token string">&quot;cmdb-api-key&quot;</span>

    <span class="token key atrule">kubernetes</span><span class="token punctuation">:</span>
      <span class="token key atrule">in_cluster</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">namespaces</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> production
        <span class="token punctuation">-</span> staging
        <span class="token punctuation">-</span> development

    <span class="token key atrule">security</span><span class="token punctuation">:</span>
      <span class="token key atrule">jwt_secret_env</span><span class="token punctuation">:</span> <span class="token string">&quot;JWT_SECRET_KEY&quot;</span>
      <span class="token key atrule">cors_origins</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token string">&quot;https://ai-platform.company.com&quot;</span>
        <span class="token punctuation">-</span> <span class="token string">&quot;https://ops.company.com&quot;</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server<span class="token punctuation">-</span>secrets
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>system
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">JWT_SECRET_KEY</span><span class="token punctuation">:</span> &lt;base64<span class="token punctuation">-</span>encoded<span class="token punctuation">-</span>jwt<span class="token punctuation">-</span>secret<span class="token punctuation">&gt;</span>
  <span class="token key atrule">CMDB_API_KEY</span><span class="token punctuation">:</span> &lt;base64<span class="token punctuation">-</span>encoded<span class="token punctuation">-</span>cmdb<span class="token punctuation">-</span>key<span class="token punctuation">&gt;</span>
  <span class="token key atrule">LDAP_BIND_PASSWORD</span><span class="token punctuation">:</span> &lt;base64<span class="token punctuation">-</span>encoded<span class="token punctuation">-</span>ldap<span class="token punctuation">-</span>password<span class="token punctuation">&gt;</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>system
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
    <span class="token key atrule">version</span><span class="token punctuation">:</span> v1.0.0
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
        <span class="token key atrule">version</span><span class="token punctuation">:</span> v1.0.0
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
        <span class="token key atrule">image</span><span class="token punctuation">:</span> company<span class="token punctuation">-</span>registry/mcp<span class="token punctuation">-</span>server<span class="token punctuation">:</span>v1.0.0
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> http
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8443</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> https
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MCP_CONFIG_PATH
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;/etc/mcp/mcp-config.yaml&quot;</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> JWT_SECRET_KEY
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server<span class="token punctuation">-</span>secrets
              <span class="token key atrule">key</span><span class="token punctuation">:</span> JWT_SECRET_KEY
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> CMDB_API_KEY
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server<span class="token punctuation">-</span>secrets
              <span class="token key atrule">key</span><span class="token punctuation">:</span> CMDB_API_KEY
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/mcp
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ssl<span class="token punctuation">-</span>certs
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/ssl/certs
          <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">&quot;256Mi&quot;</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&quot;250m&quot;</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">&quot;512Mi&quot;</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&quot;500m&quot;</span>
        <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /health
            <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
        <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /health
            <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume
        <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server<span class="token punctuation">-</span>config
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ssl<span class="token punctuation">-</span>certs
        <span class="token key atrule">secret</span><span class="token punctuation">:</span>
          <span class="token key atrule">secretName</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server<span class="token punctuation">-</span>ssl<span class="token punctuation">-</span>certs

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>system
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">name</span><span class="token punctuation">:</span> http
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8443</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">name</span><span class="token punctuation">:</span> https
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server<span class="token punctuation">-</span>ingress
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>system
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/ssl-redirect</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/backend-protocol</span><span class="token punctuation">:</span> <span class="token string">&quot;HTTP&quot;</span>
    <span class="token key atrule">cert-manager.io/cluster-issuer</span><span class="token punctuation">:</span> <span class="token string">&quot;company-ca-issuer&quot;</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> mcp<span class="token punctuation">-</span>server.company.com
    <span class="token key atrule">secretName</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server<span class="token punctuation">-</span>tls
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server.company.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>system

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;services&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;endpoints&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;apps&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;deployments&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;replicasets&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods/log&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-docker-compose-部署" tabindex="-1"><a class="header-anchor" href="#_6-3-docker-compose-部署" aria-hidden="true">#</a> 6.3 Docker Compose 部署</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># docker-compose.yml - 完整的 Docker Compose 配置</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token comment"># MCP 服务器</span>
  <span class="token key atrule">mcp-server</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> .
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>server
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8080:8080&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8443:8443&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> MCP_CONFIG_PATH=/app/config/mcp<span class="token punctuation">-</span>config.yaml
      <span class="token punctuation">-</span> JWT_SECRET_KEY=$<span class="token punctuation">{</span>JWT_SECRET_KEY<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> CMDB_API_KEY=$<span class="token punctuation">{</span>CMDB_API_KEY<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> REDIS_URL=redis<span class="token punctuation">:</span>//redis<span class="token punctuation">:</span><span class="token number">6379</span>
      <span class="token punctuation">-</span> POSTGRES_URL=postgresql<span class="token punctuation">:</span>//postgres<span class="token punctuation">:</span>password@postgres<span class="token punctuation">:</span>5432/mcp
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/app/config
      <span class="token punctuation">-</span> ./ssl<span class="token punctuation">:</span>/etc/ssl
      <span class="token punctuation">-</span> ./logs<span class="token punctuation">:</span>/app/logs
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis
      <span class="token punctuation">-</span> postgres
      <span class="token punctuation">-</span> prometheus
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mcp<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span>
      <span class="token key atrule">test</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;curl&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-f&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://localhost:8080/health&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 30s
      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 10s
      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">3</span>

  <span class="token comment"># Redis 缓存</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>7<span class="token punctuation">-</span>alpine
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>redis
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;6379:6379&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/data
      <span class="token punctuation">-</span> ./redis.conf<span class="token punctuation">:</span>/usr/local/etc/redis/redis.conf
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server /usr/local/etc/redis/redis.conf
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mcp<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># PostgreSQL 数据库</span>
  <span class="token key atrule">postgres</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">15</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>postgres
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">POSTGRES_DB</span><span class="token punctuation">:</span> mcp
      <span class="token key atrule">POSTGRES_USER</span><span class="token punctuation">:</span> postgres
      <span class="token key atrule">POSTGRES_PASSWORD</span><span class="token punctuation">:</span> password
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;5432:5432&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> postgres<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/postgresql/data
      <span class="token punctuation">-</span> ./sql/init.sql<span class="token punctuation">:</span>/docker<span class="token punctuation">-</span>entrypoint<span class="token punctuation">-</span>initdb.d/init.sql
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mcp<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># Prometheus 监控</span>
  <span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/prometheus<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>prometheus
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9090:9090&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./prometheus/prometheus.yml<span class="token punctuation">:</span>/etc/prometheus/prometheus.yml
      <span class="token punctuation">-</span> prometheus<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/prometheus
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--config.file=/etc/prometheus/prometheus.yml&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.path=/prometheus&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--web.console.libraries=/usr/share/prometheus/console_libraries&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--web.console.templates=/usr/share/prometheus/consoles&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--web.enable-lifecycle&#39;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mcp<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># Grafana 可视化</span>
  <span class="token key atrule">grafana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/grafana<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>grafana
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3000:3000&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> GF_SECURITY_ADMIN_PASSWORD=admin123
      <span class="token punctuation">-</span> GF_INSTALL_PLUGINS=grafana<span class="token punctuation">-</span>piechart<span class="token punctuation">-</span>panel
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> grafana<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/grafana
      <span class="token punctuation">-</span> ./grafana/dashboards<span class="token punctuation">:</span>/etc/grafana/provisioning/dashboards
      <span class="token punctuation">-</span> ./grafana/datasources<span class="token punctuation">:</span>/etc/grafana/provisioning/datasources
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> prometheus
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mcp<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># Nginx 反向代理</span>
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>alpine
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mcp<span class="token punctuation">-</span>nginx
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;80:80&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;443:443&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./nginx/nginx.conf<span class="token punctuation">:</span>/etc/nginx/nginx.conf
      <span class="token punctuation">-</span> ./nginx/ssl<span class="token punctuation">:</span>/etc/nginx/ssl
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mcp<span class="token punctuation">-</span>server
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mcp<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">postgres-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">prometheus-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">grafana-data</span><span class="token punctuation">:</span>

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">mcp-network</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-故障排查" tabindex="-1"><a class="header-anchor" href="#_7-故障排查" aria-hidden="true">#</a> 7. 故障排查</h2><h3 id="_7-1-常见问题解决方案" tabindex="-1"><a class="header-anchor" href="#_7-1-常见问题解决方案" aria-hidden="true">#</a> 7.1 常见问题解决方案</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># troubleshoot.sh - MCP Server 故障排查脚本</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;🔍 MCP Server 故障排查工具&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;================================&quot;</span>

<span class="token comment"># 检查服务状态</span>
<span class="token function-name function">check_service_status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;📊 检查服务状态...&quot;</span>

    <span class="token comment"># Docker 环境检查</span>
    <span class="token keyword">if</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> <span class="token function">docker</span> <span class="token operator">&amp;&gt;</span> /dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;🐳 Docker 容器状态:&quot;</span>
        <span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;(mcp|redis|postgres)&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;❌ 未找到相关容器&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># Kubernetes 环境检查</span>
    <span class="token keyword">if</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> kubectl <span class="token operator">&amp;&gt;</span> /dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;☸️ Kubernetes Pod 状态:&quot;</span>
        kubectl get pods <span class="token parameter variable">-n</span> mcp-system <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;❌ 未找到 mcp-system 命名空间&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># 进程检查</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;⚙️ 系统进程:&quot;</span>
    <span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;(mcp|python.*main_server)&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;❌ 未找到 MCP 相关进程&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 检查网络连通性</span>
<span class="token function-name function">check_network</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;🌐 检查网络连通性...&quot;</span>

    <span class="token comment"># 检查端口监听</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;📡 端口监听状态:&quot;</span>
    <span class="token function">netstat</span> <span class="token parameter variable">-tuln</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;:8080|:6379|:5432&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;❌ 主要端口未监听&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>

    <span class="token comment"># 检查健康检查端点</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;❤️ 健康检查:&quot;</span>
    <span class="token function">curl</span> <span class="token parameter variable">-sf</span> http://localhost:8080/health <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ MCP Server 健康&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;❌ MCP Server 不健康&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>

    <span class="token comment"># 检查外部依赖</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;🔗 外部依赖检查:&quot;</span>
    <span class="token function">timeout</span> <span class="token number">5</span> <span class="token function">curl</span> <span class="token parameter variable">-sf</span> http://localhost:6379 <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ Redis 连接正常&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;❌ Redis 连接失败&quot;</span>
    <span class="token function">timeout</span> <span class="token number">5</span> pg_isready <span class="token parameter variable">-h</span> localhost <span class="token parameter variable">-p</span> <span class="token number">5432</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ PostgreSQL 连接正常&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;❌ PostgreSQL 连接失败&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 自动修复尝试</span>
<span class="token function-name function">auto_fix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;🔧 尝试自动修复...&quot;</span>

    <span class="token comment"># 重启服务</span>
    <span class="token keyword">if</span> <span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-q</span> mcp-server<span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;🔄 重启 Docker 容器...&quot;</span>
        <span class="token function">docker</span> restart mcp-server
        <span class="token function">sleep</span> <span class="token number">10</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># 清理缓存</span>
    <span class="token keyword">if</span> <span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-q</span> mcp-redis<span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;🧹 清理 Redis 缓存...&quot;</span>
        <span class="token function">docker</span> <span class="token builtin class-name">exec</span> mcp-redis redis-cli FLUSHALL
    <span class="token keyword">fi</span>

    <span class="token comment"># 检查修复结果</span>
    <span class="token function">sleep</span> <span class="token number">5</span>
    <span class="token function">curl</span> <span class="token parameter variable">-sf</span> http://localhost:8080/health <span class="token operator">&gt;</span>/dev/null <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 修复成功&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;❌ 修复失败，需要手动排查&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-最佳实践" tabindex="-1"><a class="header-anchor" href="#_8-最佳实践" aria-hidden="true">#</a> 8. 最佳实践</h2><h3 id="_8-1-企业部署清单" tabindex="-1"><a class="header-anchor" href="#_8-1-企业部署清单" aria-hidden="true">#</a> 8.1 企业部署清单</h3><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 🚀 MCP Server 企业部署清单</span>

<span class="token title important"><span class="token punctuation">##</span> 📋 部署前准备</span>
<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">环境准备</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] Kubernetes 集群 (v1.24+)
  <span class="token list punctuation">-</span> [ ] Docker Registry 访问权限
  <span class="token list punctuation">-</span> [ ] SSL 证书申请和配置
  <span class="token list punctuation">-</span> [ ] 网络策略和防火墙规则

<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">安全配置</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] JWT 密钥生成和轮换策略
  <span class="token list punctuation">-</span> [ ] LDAP/OAuth 集成测试
  <span class="token list punctuation">-</span> [ ] RBAC 权限矩阵设计
  <span class="token list punctuation">-</span> [ ] API 密钥管理策略

<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">监控体系</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] Prometheus 配置
  <span class="token list punctuation">-</span> [ ] Grafana Dashboard 导入
  <span class="token list punctuation">-</span> [ ] 告警规则配置
  <span class="token list punctuation">-</span> [ ] 日志聚合配置

<span class="token title important"><span class="token punctuation">##</span> 🛠️ 部署过程</span>
<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">基础设施</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] 创建命名空间和 ServiceAccount
  <span class="token list punctuation">-</span> [ ] 部署 PostgreSQL 和 Redis
  <span class="token list punctuation">-</span> [ ] 配置持久化存储
  <span class="token list punctuation">-</span> [ ] 网络策略配置

<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">应用部署</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] 构建和推送 Docker 镜像
  <span class="token list punctuation">-</span> [ ] 部署 MCP Server
  <span class="token list punctuation">-</span> [ ] 配置负载均衡
  <span class="token list punctuation">-</span> [ ] SSL 证书配置

<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">集成验证</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] Kubernetes API 访问测试
  <span class="token list punctuation">-</span> [ ] 监控平台连接测试
  <span class="token list punctuation">-</span> [ ] CMDB 集成验证
  <span class="token list punctuation">-</span> [ ] 端到端功能测试

<span class="token title important"><span class="token punctuation">##</span> 🔍 验证测试</span>
<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">功能测试</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] 健康检查端点验证
  <span class="token list punctuation">-</span> [ ] 工具调用功能测试
  <span class="token list punctuation">-</span> [ ] 权限控制验证
  <span class="token list punctuation">-</span> [ ] 错误处理测试

<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">性能测试</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] 负载测试 (100+ 并发)
  <span class="token list punctuation">-</span> [ ] 延迟测试 (&lt; 500ms)
  <span class="token list punctuation">-</span> [ ] 吞吐量测试 (1000+ QPS)
  <span class="token list punctuation">-</span> [ ] 资源使用监控

<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">安全测试</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] 认证绕过测试
  <span class="token list punctuation">-</span> [ ] 权限提升测试
  <span class="token list punctuation">-</span> [ ] 输入验证测试
  <span class="token list punctuation">-</span> [ ] 网络安全扫描

<span class="token title important"><span class="token punctuation">##</span> 🚦 生产就绪</span>
<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">运维准备</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] 监控告警配置
  <span class="token list punctuation">-</span> [ ] 日志收集配置
  <span class="token list punctuation">-</span> [ ] 备份恢复流程
  <span class="token list punctuation">-</span> [ ] 故障应急预案

<span class="token list punctuation">-</span> [ ] <span class="token bold"><span class="token punctuation">**</span><span class="token content">文档完善</span><span class="token punctuation">**</span></span>
  <span class="token list punctuation">-</span> [ ] 部署文档
  <span class="token list punctuation">-</span> [ ] 运维手册
  <span class="token list punctuation">-</span> [ ] API 文档
  <span class="token list punctuation">-</span> [ ] 故障排查指南
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="✨-核心特性总结" tabindex="-1"><a class="header-anchor" href="#✨-核心特性总结" aria-hidden="true">#</a> ✨ 核心特性总结</h2><h3 id="🏗️-完整架构设计" tabindex="-1"><a class="header-anchor" href="#🏗️-完整架构设计" aria-hidden="true">#</a> 🏗️ 完整架构设计</h3><ul><li>微服务化架构，支持水平扩展</li><li>标准化的 MCP 协议实现</li><li>企业级安全和认证体系</li></ul><h3 id="🔧-运维平台深度集成" tabindex="-1"><a class="header-anchor" href="#🔧-运维平台深度集成" aria-hidden="true">#</a> 🔧 运维平台深度集成</h3><ul><li>Kubernetes 集群管理</li><li>Prometheus/Grafana 监控</li><li>CMDB 资产管理</li><li>完整的 RBAC 权限控制</li></ul><h3 id="🛡️-企业级安全" tabindex="-1"><a class="header-anchor" href="#🛡️-企业级安全" aria-hidden="true">#</a> 🛡️ 企业级安全</h3><ul><li>JWT/OAuth/LDAP 多重认证</li><li>细粒度权限控制</li><li>审计日志和合规性</li><li>SSL/TLS 加密传输</li></ul><h3 id="📊-生产级运维" tabindex="-1"><a class="header-anchor" href="#📊-生产级运维" aria-hidden="true">#</a> 📊 生产级运维</h3><ul><li>容器化部署 (Docker + K8s)</li><li>完整的监控告警</li><li>自动故障排查工具</li><li>性能优化指导</li></ul><h2 id="🎯-实施建议" tabindex="-1"><a class="header-anchor" href="#🎯-实施建议" aria-hidden="true">#</a> 🎯 实施建议</h2><p>这个方案特别适合：</p><ul><li><strong>大型企业</strong>：需要统一的 AI 工具接入标准</li><li><strong>运维团队</strong>：希望通过 AI 提升运维效率</li><li><strong>平台团队</strong>：构建企业 AI 基础设施</li></ul><p>你可以从以下步骤开始：</p><ol><li>选择一个非生产环境部署 POC</li><li>集成一个简单的运维工具验证概念</li><li>逐步扩展到更多系统和功能</li><li>建立完整的安全和监控体系</li></ol><p>有什么具体的实施问题可以继续讨论！</p>`,64),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","MCP_SERVER_ENTERPRISE_GUIDE.html.vue"]]);export{r as default};
