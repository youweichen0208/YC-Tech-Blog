import{_ as l,r,o,c as d,a,d as e,w as t,b as n,e as i}from"./app-PYXSjfSC.js";const c={},p=i(`<h1 id="量化交易平台监控运维指南" tabindex="-1"><a class="header-anchor" href="#量化交易平台监控运维指南" aria-hidden="true">#</a> 量化交易平台监控运维指南</h1><h2 id="📊-概述" tabindex="-1"><a class="header-anchor" href="#📊-概述" aria-hidden="true">#</a> 📊 概述</h2><p>本文档详细介绍量化交易平台的监控体系部署、配置和运维，包括 Prometheus、Grafana 和 Loki 的完整配置流程和常见问题排查。</p><h2 id="🏗️-监控架构" tabindex="-1"><a class="header-anchor" href="#🏗️-监控架构" aria-hidden="true">#</a> 🏗️ 监控架构</h2><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TB
    <span class="token keyword">subgraph</span> <span class="token string">&quot;微服务层&quot;</span>
        SCHED<span class="token text string">[Scheduler Service&lt;br/&gt;:8085]</span>
        STOCK<span class="token text string">[Stock Service&lt;br/&gt;:8082]</span>
        TRADE<span class="token text string">[Trading Service&lt;br/&gt;:8083]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;监控层 (Docker)&quot;</span>
        PROM<span class="token text string">[Prometheus&lt;br/&gt;:9091&lt;br/&gt;指标采集]</span>
        GRAF<span class="token text string">[Grafana&lt;br/&gt;:3001&lt;br/&gt;可视化]</span>
        LOKI<span class="token text string">[Loki&lt;br/&gt;:3100&lt;br/&gt;日志聚合]</span>
    <span class="token keyword">end</span>

    SCHED <span class="token arrow operator">--&gt;</span><span class="token label property">|/actuator/prometheus|</span> PROM
    STOCK <span class="token arrow operator">--&gt;</span><span class="token label property">|/actuator/prometheus|</span> PROM
    TRADE <span class="token arrow operator">--&gt;</span><span class="token label property">|/actuator/prometheus|</span> PROM

    PROM <span class="token arrow operator">--&gt;</span> GRAF
    LOKI <span class="token arrow operator">--&gt;</span> GRAF

    SCHED <span class="token arrow operator">-.-&gt;</span><span class="token label property">|日志|</span> LOKI
    STOCK <span class="token arrow operator">-.-&gt;</span><span class="token label property">|日志|</span> LOKI
    TRADE <span class="token arrow operator">-.-&gt;</span><span class="token label property">|日志|</span> LOKI
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="监控组件" tabindex="-1"><a class="header-anchor" href="#监控组件" aria-hidden="true">#</a> 监控组件</h3><table><thead><tr><th>组件</th><th>端口</th><th>用途</th><th>访问地址</th></tr></thead><tbody><tr><td><strong>Prometheus</strong></td><td>9091</td><td>时序数据库，指标采集</td><td>http://localhost:9091</td></tr><tr><td><strong>Grafana</strong></td><td>3001</td><td>可视化监控面板</td><td>http://localhost:3001</td></tr><tr><td><strong>Loki</strong></td><td>3100</td><td>日志聚合系统</td><td>http://localhost:3100</td></tr></tbody></table><h2 id="🚀-快速启动" tabindex="-1"><a class="header-anchor" href="#🚀-快速启动" aria-hidden="true">#</a> 🚀 快速启动</h2><h3 id="前置条件" tabindex="-1"><a class="header-anchor" href="#前置条件" aria-hidden="true">#</a> 前置条件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>✅ Docker 已安装并运行
✅ 至少一个微服务已启动（推荐先启动 Scheduler Service）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法1-使用启动脚本-推荐" tabindex="-1"><a class="header-anchor" href="#方法1-使用启动脚本-推荐" aria-hidden="true">#</a> 方法1：使用启动脚本（推荐）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 从项目根目录执行</span>
<span class="token builtin class-name">cd</span> /Users/youweichen/quant-trading-platform
./start-monitoring.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法2-手动启动" tabindex="-1"><a class="header-anchor" href="#方法2-手动启动" aria-hidden="true">#</a> 方法2：手动启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入监控配置目录</span>
<span class="token builtin class-name">cd</span> infrastructure/monitoring

<span class="token comment"># 拉取最新镜像</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml pull

<span class="token comment"># 启动所有监控服务</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml up <span class="token parameter variable">-d</span>

<span class="token comment"># 查看启动状态</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="验证启动" tabindex="-1"><a class="header-anchor" href="#验证启动" aria-hidden="true">#</a> 验证启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查 Prometheus</span>
<span class="token function">curl</span> http://localhost:9091/-/healthy

<span class="token comment"># 检查 Grafana</span>
<span class="token function">curl</span> http://localhost:3001/api/health

<span class="token comment"># 查看所有容器状态</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span> <span class="token function">grep</span> quant
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>预期输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>quant-prometheus   Up   0.0.0.0:9091-&gt;9090/tcp
quant-grafana      Up   0.0.0.0:3001-&gt;3000/tcp
quant-loki         Up   0.0.0.0:3100-&gt;3100/tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="⚙️-配置详解" tabindex="-1"><a class="header-anchor" href="#⚙️-配置详解" aria-hidden="true">#</a> ⚙️ 配置详解</h2><h3 id="_1-prometheus-配置" tabindex="-1"><a class="header-anchor" href="#_1-prometheus-配置" aria-hidden="true">#</a> 1. Prometheus 配置</h3><p><strong>配置文件</strong>：<code>infrastructure/prometheus/prometheus.yml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">global</span><span class="token punctuation">:</span>
  <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s      <span class="token comment"># 每15秒采集一次指标</span>
  <span class="token key atrule">evaluation_interval</span><span class="token punctuation">:</span> 15s  <span class="token comment"># 每15秒评估一次告警规则</span>

<span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span>
  <span class="token comment"># Scheduler Service 监控</span>
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;scheduler-service&#39;</span>
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/actuator/prometheus&#39;</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;192.168.1.3:8085&#39;</span><span class="token punctuation">]</span>  <span class="token comment"># 使用本机IP</span>
        <span class="token key atrule">labels</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span> <span class="token string">&#39;scheduler&#39;</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token string">&#39;dev&#39;</span>

  <span class="token comment"># Trading Service 监控</span>
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;trading-service&#39;</span>
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/actuator/prometheus&#39;</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;192.168.1.3:8083&#39;</span><span class="token punctuation">]</span>
        <span class="token key atrule">labels</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span> <span class="token string">&#39;trading&#39;</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token string">&#39;dev&#39;</span>

  <span class="token comment"># Stock Service 监控</span>
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;stock-service&#39;</span>
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/actuator/prometheus&#39;</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;192.168.1.3:8082&#39;</span><span class="token punctuation">]</span>
        <span class="token key atrule">labels</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span> <span class="token string">&#39;stock&#39;</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token string">&#39;dev&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>⚠️ 重要提示</strong>：</p><ul><li><strong>不要使用 <code>host.docker.internal</code></strong>，在 macOS Docker 中可能无法解析</li><li><strong>使用本机实际 IP 地址</strong>（通过 <code>ipconfig getifaddr en0</code> 获取）</li><li>修改配置后需重启：<code>docker compose -f docker-compose.monitoring.yml restart prometheus</code></li></ul><h3 id="_2-grafana-配置" tabindex="-1"><a class="header-anchor" href="#_2-grafana-配置" aria-hidden="true">#</a> 2. Grafana 配置</h3><p><strong>数据源配置</strong>：<code>infrastructure/grafana/provisioning/datasources/prometheus.yml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> <span class="token number">1</span>

<span class="token key atrule">datasources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Prometheus
    <span class="token key atrule">type</span><span class="token punctuation">:</span> prometheus
    <span class="token key atrule">access</span><span class="token punctuation">:</span> proxy
    <span class="token key atrule">url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//prometheus<span class="token punctuation">:</span><span class="token number">9090</span>  <span class="token comment"># Docker内部网络地址</span>
    <span class="token key atrule">isDefault</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">editable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">jsonData</span><span class="token punctuation">:</span>
      <span class="token key atrule">timeInterval</span><span class="token punctuation">:</span> 15s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Dashboard 自动加载</strong>：<code>infrastructure/grafana/provisioning/dashboards/dashboard-provider.yml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> <span class="token number">1</span>

<span class="token key atrule">providers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;Scheduler Dashboards&#39;</span>
    <span class="token key atrule">orgId</span><span class="token punctuation">:</span> <span class="token number">1</span>
    <span class="token key atrule">folder</span><span class="token punctuation">:</span> <span class="token string">&#39;Quant Platform&#39;</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> file
    <span class="token key atrule">disableDeletion</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">updateIntervalSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
    <span class="token key atrule">allowUiUpdates</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">options</span><span class="token punctuation">:</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /var/lib/grafana/dashboards
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>登录凭据</strong>：</p><ul><li>用户名：<code>admin</code></li><li>密码：<code>admin123</code></li></ul><h3 id="_3-docker-compose-配置" tabindex="-1"><a class="header-anchor" href="#_3-docker-compose-配置" aria-hidden="true">#</a> 3. Docker Compose 配置</h3><p><strong>配置文件</strong>：<code>infrastructure/monitoring/docker-compose.monitoring.yml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/prometheus<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> quant<span class="token punctuation">-</span>prometheus
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9091:9090&quot;</span>  <span class="token comment"># 避免与 ClashX 冲突</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ../prometheus/prometheus.yml<span class="token punctuation">:</span>/etc/prometheus/prometheus.yml
      <span class="token punctuation">-</span> prometheus<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/prometheus
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--config.file=/etc/prometheus/prometheus.yml&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.retention.time=30d&#39;</span>  <span class="token comment"># 保留30天数据</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> monitoring
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token key atrule">grafana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/grafana<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> quant<span class="token punctuation">-</span>grafana
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3001:3000&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> GF_SECURITY_ADMIN_USER=admin
      <span class="token punctuation">-</span> GF_SECURITY_ADMIN_PASSWORD=admin123
      <span class="token punctuation">-</span> GF_USERS_ALLOW_SIGN_UP=false
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> grafana<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/grafana
      <span class="token punctuation">-</span> ../grafana/provisioning/dashboards<span class="token punctuation">:</span>/etc/grafana/provisioning/dashboards
      <span class="token punctuation">-</span> ../grafana/provisioning/datasources<span class="token punctuation">:</span>/etc/grafana/provisioning/datasources
      <span class="token punctuation">-</span> ../grafana/dashboards<span class="token punctuation">:</span>/var/lib/grafana/dashboards
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> monitoring
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> prometheus

  <span class="token key atrule">loki</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/loki<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> quant<span class="token punctuation">-</span>loki
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3100:3100&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ../loki/loki<span class="token punctuation">-</span>config.yml<span class="token punctuation">:</span>/etc/loki/local<span class="token punctuation">-</span>config.yaml
      <span class="token punctuation">-</span> loki<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/loki
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>config.file=/etc/loki/local<span class="token punctuation">-</span>config.yaml
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> monitoring
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">monitoring</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">prometheus-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">grafana-data</span><span class="token punctuation">:</span>
  <span class="token key atrule">loki-data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔍-使用指南" tabindex="-1"><a class="header-anchor" href="#🔍-使用指南" aria-hidden="true">#</a> 🔍 使用指南</h2><h3 id="prometheus-查询" tabindex="-1"><a class="header-anchor" href="#prometheus-查询" aria-hidden="true">#</a> Prometheus 查询</h3><p>访问 http://localhost:9091 并执行以下查询：</p><h4 id="_1-检查所有监控目标状态" tabindex="-1"><a class="header-anchor" href="#_1-检查所有监控目标状态" aria-hidden="true">#</a> 1. 检查所有监控目标状态</h4><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code>up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回值 <code>1</code> 表示服务正常，<code>0</code> 表示服务不可达。</p><h4 id="_2-查看-scheduler-service-所有指标" tabindex="-1"><a class="header-anchor" href="#_2-查看-scheduler-service-所有指标" aria-hidden="true">#</a> 2. 查看 Scheduler Service 所有指标</h4><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code><span class="token context-labels"><span class="token punctuation">{</span><span class="token label-key attr-name">application</span><span class="token punctuation">=</span><span class="token label-value attr-value">&quot;scheduler-service&quot;</span><span class="token punctuation">}</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-jvm-内存使用情况" tabindex="-1"><a class="header-anchor" href="#_3-jvm-内存使用情况" aria-hidden="true">#</a> 3. JVM 内存使用情况</h4><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code>jvm_memory_used_bytes<span class="token context-labels"><span class="token punctuation">{</span><span class="token label-key attr-name">application</span><span class="token punctuation">=</span><span class="token label-value attr-value">&quot;scheduler-service&quot;</span><span class="token punctuation">}</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-价格更新总次数" tabindex="-1"><a class="header-anchor" href="#_4-价格更新总次数" aria-hidden="true">#</a> 4. 价格更新总次数</h4><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code>scheduler_price_updates_total
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_5-成功率计算" tabindex="-1"><a class="header-anchor" href="#_5-成功率计算" aria-hidden="true">#</a> 5. 成功率计算</h4><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code><span class="token punctuation">(</span>scheduler_price_updates_total <span class="token operator">-</span> scheduler_price_updates_failed<span class="token punctuation">)</span>
<span class="token operator">/</span> scheduler_price_updates_total <span class="token operator">*</span> <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-每分钟更新速率" tabindex="-1"><a class="header-anchor" href="#_6-每分钟更新速率" aria-hidden="true">#</a> 6. 每分钟更新速率</h4><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code><span class="token function">rate</span><span class="token punctuation">(</span>scheduler_price_updates_total<span class="token context-range"><span class="token punctuation">[</span><span class="token range-duration number">1m</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_7-ai-热度分布" tabindex="-1"><a class="header-anchor" href="#_7-ai-热度分布" aria-hidden="true">#</a> 7. AI 热度分布</h4><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code>scheduler_ai_hotness_super_hot
scheduler_ai_hotness_hot
scheduler_ai_hotness_normal
scheduler_ai_hotness_cold
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-当前监控股票数" tabindex="-1"><a class="header-anchor" href="#_8-当前监控股票数" aria-hidden="true">#</a> 8. 当前监控股票数</h4><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code>scheduler_monitored_stocks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="grafana-dashboard" tabindex="-1"><a class="header-anchor" href="#grafana-dashboard" aria-hidden="true">#</a> Grafana Dashboard</h3><h4 id="导入预配置-dashboard" tabindex="-1"><a class="header-anchor" href="#导入预配置-dashboard" aria-hidden="true">#</a> 导入预配置 Dashboard</h4><ol><li>访问 http://localhost:3001</li><li>使用 <code>admin/admin123</code> 登录</li><li>点击左侧 <strong>Dashboards</strong> → <strong>Import</strong></li><li>选择文件：<code>infrastructure/grafana/dashboards/scheduler-monitor.json</code></li><li>选择数据源：<strong>Prometheus</strong></li><li>点击 <strong>Import</strong></li></ol><h4 id="dashboard-面板说明" tabindex="-1"><a class="header-anchor" href="#dashboard-面板说明" aria-hidden="true">#</a> Dashboard 面板说明</h4><table><thead><tr><th>面板名称</th><th>类型</th><th>指标</th><th>说明</th></tr></thead><tbody><tr><td>总更新次数</td><td>Stat</td><td><code>scheduler_price_updates_total</code></td><td>累计价格更新次数</td></tr><tr><td>成功率</td><td>Gauge</td><td><code>(成功/总数)×100</code></td><td>实时成功率，&lt;95%告警</td></tr><tr><td>监控股票数</td><td>Stat</td><td><code>scheduler_monitored_stocks</code></td><td>当前监控的股票数量</td></tr><tr><td>更新频率</td><td>Time Series</td><td><code>rate(updates[1m])</code></td><td>每分钟更新趋势</td></tr><tr><td>失败率趋势</td><td>Time Series</td><td><code>rate(failed[5m])</code></td><td>失败率变化曲线</td></tr><tr><td>热度分布</td><td>Pie Chart</td><td><code>ai_hotness_*</code></td><td>各热度等级股票占比</td></tr><tr><td>Top 10股票</td><td>Table</td><td><code>topk(10, update_count)</code></td><td>更新最频繁的股票</td></tr><tr><td>响应时间</td><td>Graph</td><td><code>duration_seconds</code></td><td>平均处理耗时</td></tr><tr><td>实时日志</td><td>Logs</td><td>Loki</td><td>服务日志流</td></tr></tbody></table><h2 id="🐛-故障排查" tabindex="-1"><a class="header-anchor" href="#🐛-故障排查" aria-hidden="true">#</a> 🐛 故障排查</h2><h3 id="问题1-端口冲突-9090-被占用" tabindex="-1"><a class="header-anchor" href="#问题1-端口冲突-9090-被占用" aria-hidden="true">#</a> 问题1：端口冲突（9090 被占用）</h3><p><strong>现象</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:9090
<span class="token comment"># 返回: {&quot;hello&quot;: &quot;clash&quot;}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>原因</strong>：ClashX 代理占用了 9090 端口</p><p><strong>解决方法</strong>：</p><p>方法A - 修改 Prometheus 端口（推荐）：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># docker-compose.monitoring.yml</span>
<span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">&quot;9091:9090&quot;</span>  <span class="token comment"># 改用9091端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法B - 关闭 ClashX 9090 端口：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在 ClashX 设置中修改外部控制器端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="问题2-prometheus-无法采集指标" tabindex="-1"><a class="header-anchor" href="#问题2-prometheus-无法采集指标" aria-hidden="true">#</a> 问题2：Prometheus 无法采集指标</h3><p><strong>现象</strong>：</p><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code>up<span class="token context-labels"><span class="token punctuation">{</span><span class="token label-key attr-name">job</span><span class="token punctuation">=</span><span class="token label-value attr-value">&quot;scheduler-service&quot;</span><span class="token punctuation">}</span></span>  # 返回空结果
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>诊断步骤</strong>：</p><ol><li><strong>检查服务是否暴露指标</strong>：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:8085/actuator/prometheus
<span class="token comment"># 应返回大量指标数据</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p><strong>检查 Prometheus targets 状态</strong>： 访问 http://localhost:9091/targets 查看 scheduler-service 状态是否为 <strong>UP</strong></p></li><li><p><strong>检查 Docker 网络连通性</strong>：</p></li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-prometheus <span class="token function">wget</span> -qO- http://192.168.1.3:8085/actuator/prometheus
<span class="token comment"># 如果失败，说明网络不通</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见原因及解决</strong>：</p><h4 id="原因a-使用了-host-docker-internal" tabindex="-1"><a class="header-anchor" href="#原因a-使用了-host-docker-internal" aria-hidden="true">#</a> 原因A：使用了 <code>host.docker.internal</code></h4><p><strong>错误配置</strong>：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;host.docker.internal:8085&#39;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解决方法</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 获取本机IP</span>
ipconfig getifaddr en0  <span class="token comment"># macOS</span>
<span class="token comment"># 或</span>
<span class="token function">ip</span> addr show <span class="token operator">|</span> <span class="token function">grep</span> inet  <span class="token comment"># Linux</span>

<span class="token comment"># 2. 修改 prometheus.yml</span>
targets: <span class="token punctuation">[</span><span class="token string">&#39;192.168.1.3:8085&#39;</span><span class="token punctuation">]</span>  <span class="token comment"># 使用实际IP</span>

<span class="token comment"># 3. 重启 Prometheus</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml restart prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="原因b-防火墙阻止访问" tabindex="-1"><a class="header-anchor" href="#原因b-防火墙阻止访问" aria-hidden="true">#</a> 原因B：防火墙阻止访问</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># macOS - 允许端口</span>
<span class="token function">sudo</span> /usr/libexec/ApplicationFirewall/socketfilterfw <span class="token parameter variable">--add</span> <span class="token number">8085</span>

<span class="token comment"># Linux - 开放端口</span>
<span class="token function">sudo</span> ufw allow <span class="token number">8085</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="原因c-服务未启动" tabindex="-1"><a class="header-anchor" href="#原因c-服务未启动" aria-hidden="true">#</a> 原因C：服务未启动</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查 Scheduler Service 是否运行</span>
<span class="token function">curl</span> http://localhost:8085/actuator/health
<span class="token comment"># 应返回: {&quot;status&quot;:&quot;UP&quot;}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="问题3-grafana-dashboard-显示-no-data" tabindex="-1"><a class="header-anchor" href="#问题3-grafana-dashboard-显示-no-data" aria-hidden="true">#</a> 问题3：Grafana Dashboard 显示 &quot;No data&quot;</h3><p><strong>可能原因</strong>：</p><ol><li><p><strong>时间范围错误</strong></p><ul><li>解决：点击右上角时间选择器，改为 &quot;Last 15 minutes&quot;</li></ul></li><li><p><strong>Prometheus 数据源未配置</strong></p><ul><li>解决：Settings → Data Sources → 添加 Prometheus</li></ul></li><li><p><strong>查询语法错误</strong></p><ul><li>解决：检查 Panel 编辑页面的错误提示</li></ul></li><li><p><strong>指标确实不存在</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在 Prometheus 中验证指标是否存在</span>
<span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token string">&quot;http://localhost:9091/api/v1/label/__name__/values&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> scheduler
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="问题4-promql-语法错误" tabindex="-1"><a class="header-anchor" href="#问题4-promql-语法错误" aria-hidden="true">#</a> 问题4：PromQL 语法错误</h3><p><strong>错误示例</strong>：</p><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code>application=&quot;scheduler<span class="token operator">-</span>service&quot;  # ❌ 错误
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>正确写法</strong>：</p><div class="language-promql line-numbers-mode" data-ext="promql"><pre class="language-promql"><code><span class="token context-labels"><span class="token punctuation">{</span><span class="token label-key attr-name">application</span><span class="token punctuation">=</span><span class="token label-value attr-value">&quot;scheduler-service&quot;</span><span class="token punctuation">}</span></span>  # ✅ 正确
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>常见错误</strong>：</p><table><thead><tr><th>错误写法</th><th>正确写法</th><th>说明</th></tr></thead><tbody><tr><td><code>application=&quot;xxx&quot;</code></td><td><code>{application=&quot;xxx&quot;}</code></td><td>缺少花括号</td></tr><tr><td><code>up{job=&#39;scheduler&#39;}</code></td><td><code>up{job=&quot;scheduler&quot;}</code></td><td>PromQL使用双引号</td></tr><tr><td><code>rate(metric)</code></td><td><code>rate(metric[1m])</code></td><td>rate需要时间窗口</td></tr></tbody></table><h3 id="问题5-dashboard-自动加载失败" tabindex="-1"><a class="header-anchor" href="#问题5-dashboard-自动加载失败" aria-hidden="true">#</a> 问题5：Dashboard 自动加载失败</h3><p><strong>现象</strong>：重启 Grafana 后 Dashboard 未自动出现</p><p><strong>解决方法1 - 检查配置路径</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 验证文件结构</span>
tree infrastructure/grafana/
<span class="token comment"># 应该看到：</span>
<span class="token comment"># ├── dashboards/</span>
<span class="token comment"># │   └── scheduler-monitor.json</span>
<span class="token comment"># └── provisioning/</span>
<span class="token comment">#     ├── dashboards/</span>
<span class="token comment">#     │   └── dashboard-provider.yml</span>
<span class="token comment">#     └── datasources/</span>
<span class="token comment">#         └── prometheus.yml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解决方法2 - 检查 Docker 卷挂载</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入容器检查</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-grafana <span class="token function">ls</span> <span class="token parameter variable">-la</span> /etc/grafana/provisioning/dashboards
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-grafana <span class="token function">ls</span> <span class="token parameter variable">-la</span> /var/lib/grafana/dashboards
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解决方法3 - 手动导入</strong>：</p><ol><li>Dashboards → Import</li><li>Upload JSON file</li><li>选择 <code>scheduler-monitor.json</code></li></ol><h2 id="📊-监控最佳实践" tabindex="-1"><a class="header-anchor" href="#📊-监控最佳实践" aria-hidden="true">#</a> 📊 监控最佳实践</h2><h3 id="_1-告警配置建议" tabindex="-1"><a class="header-anchor" href="#_1-告警配置建议" aria-hidden="true">#</a> 1. 告警配置建议</h3><p>在 Grafana 中配置关键指标告警：</p><table><thead><tr><th>告警项</th><th>条件</th><th>持续时间</th><th>严重程度</th></tr></thead><tbody><tr><td>服务不可用</td><td><code>up == 0</code></td><td>1分钟</td><td>🔴 Critical</td></tr><tr><td>成功率过低</td><td><code>success_rate &lt; 95</code></td><td>5分钟</td><td>🟠 Warning</td></tr><tr><td>响应时间过高</td><td><code>duration &gt; 1s</code></td><td>5分钟</td><td>🟡 Info</td></tr><tr><td>内存使用过高</td><td><code>memory &gt; 80%</code></td><td>10分钟</td><td>🟠 Warning</td></tr></tbody></table><h3 id="_2-数据保留策略" tabindex="-1"><a class="header-anchor" href="#_2-数据保留策略" aria-hidden="true">#</a> 2. 数据保留策略</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># prometheus.yml</span>
<span class="token key atrule">command</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.retention.time=30d&#39;</span>  <span class="token comment"># 保留30天</span>
  <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.retention.size=50GB&#39;</span>  <span class="token comment"># 或最大50GB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-性能优化" tabindex="-1"><a class="header-anchor" href="#_3-性能优化" aria-hidden="true">#</a> 3. 性能优化</h3><p><strong>减少采集频率</strong>（如果数据量过大）：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">global</span><span class="token punctuation">:</span>
  <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 30s  <span class="token comment"># 从15s改为30s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>限制时间序列数</strong>：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">command</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.max-series=100000&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用 Recording Rules</strong> 预计算常用查询：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># prometheus-rules.yml</span>
<span class="token key atrule">groups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> scheduler_rules
    <span class="token key atrule">interval</span><span class="token punctuation">:</span> 30s
    <span class="token key atrule">rules</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">record</span><span class="token punctuation">:</span> scheduler<span class="token punctuation">:</span>success_rate
        <span class="token key atrule">expr</span><span class="token punctuation">:</span> (scheduler_price_updates_total <span class="token punctuation">-</span> scheduler_price_updates_failed)
              / scheduler_price_updates_total * 100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-安全建议" tabindex="-1"><a class="header-anchor" href="#_4-安全建议" aria-hidden="true">#</a> 4. 安全建议</h3><ol><li><strong>修改默认密码</strong>：首次登录 Grafana 后立即修改</li><li><strong>启用 HTTPS</strong>：生产环境配置 TLS 证书</li><li><strong>限制访问</strong>：配置防火墙规则</li><li><strong>定期备份</strong>：导出 Dashboard 和数据源配置</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 备份 Grafana 配置</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-grafana grafana-cli admin export-dashboard <span class="token operator">&gt;</span> backup.json

<span class="token comment"># 备份 Prometheus 数据</span>
<span class="token function">docker</span> <span class="token function">cp</span> quant-prometheus:/prometheus ./prometheus-backup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🧪-测试监控系统" tabindex="-1"><a class="header-anchor" href="#🧪-测试监控系统" aria-hidden="true">#</a> 🧪 测试监控系统</h2><p>使用提供的测试脚本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /Users/youweichen/quant-trading-platform
./test-monitoring.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>测试内容</strong>：</p><ol><li>✅ Prometheus 健康检查</li><li>✅ Grafana API 连通性</li><li>✅ Scheduler Service 状态</li><li>✅ Prometheus 查询 API</li><li>✅ 监控目标列表</li></ol><p><strong>预期输出</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>🧪 Grafana监控系统测试脚本
================================

1️⃣ 测试Prometheus (端口9091)...
  ✅ Prometheus运行正常

2️⃣ 测试Grafana (端口3001)...
  ✅ Grafana运行正常

3️⃣ 检查Scheduler Service (端口8085)...
  ✅ Scheduler Service运行正常

4️⃣ 测试Prometheus查询API...
  ✅ Prometheus查询API工作正常

  📈 监控目标状态：
    scheduler-service: 🟢 UP
    trading-service: 🔴 DOWN
    stock-service: 🔴 DOWN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔄-日常运维操作" tabindex="-1"><a class="header-anchor" href="#🔄-日常运维操作" aria-hidden="true">#</a> 🔄 日常运维操作</h2><h3 id="启动监控栈" tabindex="-1"><a class="header-anchor" href="#启动监控栈" aria-hidden="true">#</a> 启动监控栈</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> infrastructure/monitoring
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="停止监控栈" tabindex="-1"><a class="header-anchor" href="#停止监控栈" aria-hidden="true">#</a> 停止监控栈</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="重启某个服务" tabindex="-1"><a class="header-anchor" href="#重启某个服务" aria-hidden="true">#</a> 重启某个服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重启 Prometheus</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml restart prometheus

<span class="token comment"># 重启 Grafana</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml restart grafana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看日志" tabindex="-1"><a class="header-anchor" href="#查看日志" aria-hidden="true">#</a> 查看日志</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看 Prometheus 日志</span>
<span class="token function">docker</span> logs quant-prometheus <span class="token parameter variable">-f</span>

<span class="token comment"># 查看 Grafana 日志</span>
<span class="token function">docker</span> logs quant-grafana <span class="token parameter variable">-f</span>

<span class="token comment"># 查看 Loki 日志</span>
<span class="token function">docker</span> logs quant-loki <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="清理数据" tabindex="-1"><a class="header-anchor" href="#清理数据" aria-hidden="true">#</a> 清理数据</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 停止服务</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml down

<span class="token comment"># 删除持久化数据（谨慎操作！）</span>
<span class="token function">docker</span> volume <span class="token function">rm</span> monitoring_prometheus-data
<span class="token function">docker</span> volume <span class="token function">rm</span> monitoring_grafana-data
<span class="token function">docker</span> volume <span class="token function">rm</span> monitoring_loki-data

<span class="token comment"># 重新启动</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新配置" tabindex="-1"><a class="header-anchor" href="#更新配置" aria-hidden="true">#</a> 更新配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 修改配置文件</span>
<span class="token function">vim</span> <span class="token punctuation">..</span>/prometheus/prometheus.yml

<span class="token comment"># 2. 验证配置语法</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-prometheus promtool check config /etc/prometheus/prometheus.yml

<span class="token comment"># 3. 热重载配置（无需重启）</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:9091/-/reload

<span class="token comment"># 或者重启服务</span>
<span class="token function">docker</span> compose <span class="token parameter variable">-f</span> docker-compose.monitoring.yml restart prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📚-相关文档" tabindex="-1"><a class="header-anchor" href="#📚-相关文档" aria-hidden="true">#</a> 📚 相关文档</h2>`,142),u=i(`<h2 id="🔗-快速访问" tabindex="-1"><a class="header-anchor" href="#🔗-快速访问" aria-hidden="true">#</a> 🔗 快速访问</h2><table><thead><tr><th>服务</th><th>地址</th><th>凭据</th></tr></thead><tbody><tr><td>Grafana</td><td>http://localhost:3001</td><td>admin / admin123</td></tr><tr><td>Prometheus</td><td>http://localhost:9091</td><td>-</td></tr><tr><td>Loki</td><td>http://localhost:3100</td><td>-</td></tr><tr><td>Scheduler Metrics</td><td>http://localhost:8085/actuator/prometheus</td><td>-</td></tr><tr><td>Scheduler Health</td><td>http://localhost:8085/actuator/health</td><td>-</td></tr></tbody></table><h2 id="💡-常见问题-faq" tabindex="-1"><a class="header-anchor" href="#💡-常见问题-faq" aria-hidden="true">#</a> 💡 常见问题 FAQ</h2><h3 id="q1-为什么-prometheus-端口是-9091-而不是默认的-9090" tabindex="-1"><a class="header-anchor" href="#q1-为什么-prometheus-端口是-9091-而不是默认的-9090" aria-hidden="true">#</a> Q1: 为什么 Prometheus 端口是 9091 而不是默认的 9090？</h3><p>A: 因为 ClashX 代理默认占用 9090 端口，为避免冲突改用 9091。</p><h3 id="q2-如何添加新的监控服务" tabindex="-1"><a class="header-anchor" href="#q2-如何添加新的监控服务" aria-hidden="true">#</a> Q2: 如何添加新的监控服务？</h3><p>A: 编辑 <code>prometheus.yml</code> 添加新的 <code>scrape_config</code>：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;new-service&#39;</span>
  <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/actuator/prometheus&#39;</span>
  <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;192.168.1.3:8086&#39;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="q3-dashboard-数据不刷新怎么办" tabindex="-1"><a class="header-anchor" href="#q3-dashboard-数据不刷新怎么办" aria-hidden="true">#</a> Q3: Dashboard 数据不刷新怎么办？</h3><p>A: 检查右上角刷新间隔设置，建议设为 5s 或 10s。</p><h3 id="q4-如何导出-grafana-dashboard" tabindex="-1"><a class="header-anchor" href="#q4-如何导出-grafana-dashboard" aria-hidden="true">#</a> Q4: 如何导出 Grafana Dashboard？</h3><p>A: Dashboard 页面 → Settings → JSON Model → Copy to Clipboard</p><h3 id="q5-prometheus-数据占用空间太大怎么办" tabindex="-1"><a class="header-anchor" href="#q5-prometheus-数据占用空间太大怎么办" aria-hidden="true">#</a> Q5: Prometheus 数据占用空间太大怎么办？</h3><p>A: 减少保留时间或增加采集间隔：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span><span class="token punctuation">-</span>storage.tsdb.retention.time=7d  <span class="token comment"># 改为7天</span>
<span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 30s              <span class="token comment"># 改为30秒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><strong>最后更新</strong>: 2025-10-25 <strong>维护者</strong>: YC Tech Team</p>`,17);function m(v,h){const s=r("RouterLink");return o(),d("div",null,[p,a("ul",null,[a("li",null,[e(s,{to:"/quant-platform/SCHEDULER_SERVICE.html"},{default:t(()=>[n("Scheduler Service 技术文档")]),_:1}),n(" - 详细技术架构")]),a("li",null,[e(s,{to:"/quant-platform/SCHEDULER_QUICKSTART.html"},{default:t(()=>[n("Scheduler 快速上手")]),_:1}),n(" - 5分钟入门")]),a("li",null,[e(s,{to:"/quant-platform/ARCHITECTURE.html"},{default:t(()=>[n("系统架构")]),_:1}),n(" - 整体架构设计")])]),u])}const b=l(c,[["render",m],["__file","MONITORING.html.vue"]]);export{b as default};
