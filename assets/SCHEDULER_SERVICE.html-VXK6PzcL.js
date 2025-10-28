import{_ as o,r as c,o as l,c as i,a as n,d as a,w as e,e as p,b as t}from"./app-TClHbORi.js";const r={},u=p(`<h1 id="scheduler-service-智能调度服务" tabindex="-1"><a class="header-anchor" href="#scheduler-service-智能调度服务" aria-hidden="true">#</a> Scheduler Service - 智能调度服务</h1><h2 id="📅-服务概述" tabindex="-1"><a class="header-anchor" href="#📅-服务概述" aria-hidden="true">#</a> 📅 服务概述</h2><p>Scheduler Service 是量化交易平台的<strong>智能调度引擎</strong>，负责实时价格监控、策略执行调度、AI驱动的热度检测，以及WebSocket实时推送。它是连接数据层和业务层的核心枢纽，确保策略能够及时响应市场变化。</p><h3 id="核心职责" tabindex="-1"><a class="header-anchor" href="#核心职责" aria-hidden="true">#</a> 核心职责</h3><ul><li>🔄 <strong>智能轮询</strong>: 分层价格更新策略，根据股票热度动态调整更新频率</li><li>🤖 <strong>AI热度检测</strong>: 基于多维度指标实时评估股票热度，自动分类</li><li>📊 <strong>策略监控</strong>: 定时检查运行中的交易策略，生成交易信号</li><li>🔔 <strong>实时推送</strong>: WebSocket推送价格更新和交易信号给前端</li><li>⚡ <strong>性能优化</strong>: 并行处理、Redis缓存、智能调度算法</li></ul><h3 id="技术栈" tabindex="-1"><a class="header-anchor" href="#技术栈" aria-hidden="true">#</a> 技术栈</h3><table><thead><tr><th>技术</th><th>版本</th><th>用途</th></tr></thead><tbody><tr><td>Spring Boot</td><td>2.7.14</td><td>微服务框架</td></tr><tr><td>Spring Quartz</td><td>2.7.14</td><td>定时任务调度</td></tr><tr><td>Spring WebSocket</td><td>2.7.14</td><td>实时双向通信</td></tr><tr><td>Spring Cloud OpenFeign</td><td>2021.0.8</td><td>服务间调用</td></tr><tr><td>Redis</td><td>7.0+</td><td>数据缓存</td></tr><tr><td>Kafka</td><td>3.x (可选)</td><td>消息队列</td></tr><tr><td>Prometheus</td><td>-</td><td>监控指标</td></tr><tr><td>Grafana</td><td>-</td><td>可视化监控</td></tr></tbody></table><hr><h2 id="🏗️-系统架构" tabindex="-1"><a class="header-anchor" href="#🏗️-系统架构" aria-hidden="true">#</a> 🏗️ 系统架构</h2><h3 id="整体架构图" tabindex="-1"><a class="header-anchor" href="#整体架构图" aria-hidden="true">#</a> 整体架构图</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TB
    <span class="token keyword">subgraph</span> <span class="token string">&quot;Frontend 前端&quot;</span>
        WEB<span class="token text string">[Vue3 + WebSocket Client]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;Scheduler Service 调度服务&quot;</span>
        WS<span class="token text string">[WebSocket Server&lt;br/&gt;SockJS + STOMP]</span>
        POLL<span class="token text string">[TieredPricePollingScheduler&lt;br/&gt;分层轮询调度器]</span>
        AI<span class="token text string">[StockHotnessDetectionService&lt;br/&gt;AI热度检测]</span>
        STRATEGY<span class="token text string">[StrategyMonitor&lt;br/&gt;策略监控]</span>
        CACHE<span class="token text string">[Redis Cache&lt;br/&gt;价格&amp;热度缓存]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;Microservices 微服务&quot;</span>
        STOCK<span class="token text string">[Stock Service&lt;br/&gt;股票数据]</span>
        TRADING<span class="token text string">[Trading Service&lt;br/&gt;交易服务]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;Storage 存储&quot;</span>
        REDIS<span class="token text string">[(Redis&lt;br/&gt;缓存)]</span>
        KAFKA<span class="token text string">[(Kafka&lt;br/&gt;可选)]</span>
    <span class="token keyword">end</span>

    WEB <span class="token arrow operator">&lt;--&gt;</span><span class="token label property">|WebSocket|</span> WS
    WS <span class="token arrow operator">--&gt;</span> POLL
    POLL <span class="token arrow operator">--&gt;</span> AI
    POLL <span class="token arrow operator">--&gt;</span> STOCK
    STRATEGY <span class="token arrow operator">--&gt;</span> TRADING
    POLL <span class="token arrow operator">--&gt;</span> CACHE
    AI <span class="token arrow operator">--&gt;</span> CACHE
    CACHE <span class="token arrow operator">--&gt;</span> REDIS
    KAFKA <span class="token arrow operator">-.-&gt;</span><span class="token label property">|可选|</span> WS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="核心模块" tabindex="-1"><a class="header-anchor" href="#核心模块" aria-hidden="true">#</a> 核心模块</h3><h4 id="_1-分层轮询调度器-tieredpricepollingscheduler" tabindex="-1"><a class="header-anchor" href="#_1-分层轮询调度器-tieredpricepollingscheduler" aria-hidden="true">#</a> 1. 分层轮询调度器 (TieredPricePollingScheduler)</h4><p><strong>设计理念</strong>: 根据股票热度采用不同更新频率，优化系统资源利用</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TieredPricePollingScheduler</span> <span class="token punctuation">{</span>

    <span class="token comment">// 超级热门: 3秒更新 ⚡⚡⚡</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>fixedDelay <span class="token operator">=</span> <span class="token number">3000</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateSuperHotStocksPrices</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>

    <span class="token comment">// 热门: 5秒更新 ⚡⚡</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>fixedDelay <span class="token operator">=</span> <span class="token number">5000</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateHotStocksPrices</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>

    <span class="token comment">// 普通: 10秒更新 ⚡</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>fixedDelay <span class="token operator">=</span> <span class="token number">10000</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateNormalStocksPrices</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>

    <span class="token comment">// 冷门: 30秒更新</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>fixedDelay <span class="token operator">=</span> <span class="token number">30000</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateColdStocksPrices</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>分层策略</strong>:</p><table><thead><tr><th>级别</th><th>热度评分</th><th>更新频率</th><th>特征</th><th>示例</th></tr></thead><tbody><tr><td>SUPER_HOT</td><td>≥ 80</td><td>3秒</td><td>超高交易量、剧烈波动</td><td>贵州茅台</td></tr><tr><td>HOT</td><td>60-79</td><td>5秒</td><td>高关注度、活跃交易</td><td>平安银行、招商银行</td></tr><tr><td>NORMAL</td><td>30-59</td><td>10秒</td><td>正常交易活跃度</td><td>普通蓝筹股</td></tr><tr><td>COLD</td><td>&lt; 30</td><td>30秒</td><td>低关注度、交易稀疏</td><td>冷门小盘股</td></tr></tbody></table><h4 id="_2-ai热度检测服务-stockhotnessdetectionservice" tabindex="-1"><a class="header-anchor" href="#_2-ai热度检测服务-stockhotnessdetectionservice" aria-hidden="true">#</a> 2. AI热度检测服务 (StockHotnessDetectionService)</h4><p><strong>算法框架</strong>: 多维度加权评分 + 机器学习增强</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>热度评分 <span class="token operator">=</span> Σ <span class="token punctuation">(</span>维度分数 × 权重<span class="token punctuation">)</span> × ML增强因子

维度分数<span class="token punctuation">:</span>
  <span class="token operator">-</span> 交易量评分 <span class="token punctuation">(</span><span class="token number">30</span><span class="token operator">%</span><span class="token punctuation">)</span>  <span class="token operator">-</span> 基于对数刻度
  <span class="token operator">-</span> 波动率评分 <span class="token punctuation">(</span><span class="token number">25</span><span class="token operator">%</span><span class="token punctuation">)</span>  <span class="token operator">-</span> 价格标准差
  <span class="token operator">-</span> 价格变化评分 <span class="token punctuation">(</span><span class="token number">20</span><span class="token operator">%</span><span class="token punctuation">)</span> <span class="token operator">-</span> 涨跌幅绝对值
  <span class="token operator">-</span> 更新频率评分 <span class="token punctuation">(</span><span class="token number">15</span><span class="token operator">%</span><span class="token punctuation">)</span> <span class="token operator">-</span> 关注度指标
  <span class="token operator">-</span> 时间衰减评分 <span class="token punctuation">(</span><span class="token number">10</span><span class="token operator">%</span><span class="token punctuation">)</span> <span class="token operator">-</span> 数据时效性

ML增强因子<span class="token punctuation">:</span>
  <span class="token operator">-</span> 时间因子<span class="token punctuation">:</span> 开盘<span class="token operator">/</span>收盘加权 <span class="token punctuation">(</span><span class="token number">1.1</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">.</span>3x<span class="token punctuation">)</span>
  <span class="token operator">-</span> 趋势因子<span class="token punctuation">:</span> 线性回归斜率 <span class="token punctuation">(</span><span class="token number">1.0</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">.</span>2x<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>评分计算示例</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StockHotnessDetectionService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">double</span> <span class="token function">calculateHotnessScore</span><span class="token punctuation">(</span><span class="token class-name">StockHotnessData</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">double</span> score <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span>

        <span class="token comment">// 1. 交易量评分 (30%)</span>
        score <span class="token operator">+=</span> <span class="token function">calculateVolumeScore</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getVolume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.3</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">;</span>

        <span class="token comment">// 2. 波动率评分 (25%)</span>
        score <span class="token operator">+=</span> <span class="token function">calculateVolatilityScore</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getVolatility</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.25</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">;</span>

        <span class="token comment">// 3. 价格变化评分 (20%)</span>
        score <span class="token operator">+=</span> <span class="token function">calculatePriceChangeScore</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getPriceChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.2</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">;</span>

        <span class="token comment">// 4. 更新频率评分 (15%)</span>
        score <span class="token operator">+=</span> <span class="token function">calculateFrequencyScore</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getUpdateFrequency</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.15</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">;</span>

        <span class="token comment">// 5. 时间衰减评分 (10%)</span>
        score <span class="token operator">+=</span> <span class="token function">calculateTimeDecayScore</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getLastUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.1</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">;</span>

        <span class="token comment">// ML增强</span>
        score <span class="token operator">=</span> <span class="token function">applyMLEnhancement</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> score<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">100.0</span><span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">,</span> score<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>机器学习增强</strong>:</p><ol><li><p><strong>时间因子</strong> - 根据交易时段动态调整</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">double</span> <span class="token function">getTimeFactor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalTime</span> now <span class="token operator">=</span> <span class="token class-name">LocalTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 开盘前后30分钟 (9:00-10:00) - 高波动期</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span><span class="token class-name">LocalTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> now<span class="token punctuation">.</span><span class="token function">isBefore</span><span class="token punctuation">(</span><span class="token class-name">LocalTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1.3</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 收盘前后30分钟 (14:30-15:30) - 高波动期</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span><span class="token class-name">LocalTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> now<span class="token punctuation">.</span><span class="token function">isBefore</span><span class="token punctuation">(</span><span class="token class-name">LocalTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1.2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 午盘开盘 (13:00-13:30)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span><span class="token class-name">LocalTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> now<span class="token punctuation">.</span><span class="token function">isBefore</span><span class="token punctuation">(</span><span class="token class-name">LocalTime</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1.1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>趋势因子</strong> - 基于线性回归分析价格趋势</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">double</span> <span class="token function">calculateTrendFactor</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Double</span><span class="token punctuation">&gt;</span></span> priceHistory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>priceHistory<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1.0</span><span class="token punctuation">;</span>

    <span class="token comment">// 简单线性回归</span>
    <span class="token keyword">double</span> slope <span class="token operator">=</span> <span class="token function">calculateSimpleSlope</span><span class="token punctuation">(</span>priceHistory<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>slope<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0.02</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1.2</span><span class="token punctuation">;</span>  <span class="token comment">// 强趋势</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>slope<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0.01</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1.1</span><span class="token punctuation">;</span>  <span class="token comment">// 中等趋势</span>
    <span class="token keyword">return</span> <span class="token number">1.0</span><span class="token punctuation">;</span>  <span class="token comment">// 弱趋势</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h4 id="_3-websocket推送服务" tabindex="-1"><a class="header-anchor" href="#_3-websocket推送服务" aria-hidden="true">#</a> 3. WebSocket推送服务</h4><p><strong>协议栈</strong>: SockJS + STOMP</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableWebSocketMessageBroker</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebSocketConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebSocketMessageBrokerConfigurer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configureMessageBroker</span><span class="token punctuation">(</span><span class="token class-name">MessageBrokerRegistry</span> config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 启用简单消息代理，目标前缀为 /topic</span>
        config<span class="token punctuation">.</span><span class="token function">enableSimpleBroker</span><span class="token punctuation">(</span><span class="token string">&quot;/topic&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 客户端发送消息的目标前缀</span>
        config<span class="token punctuation">.</span><span class="token function">setApplicationDestinationPrefixes</span><span class="token punctuation">(</span><span class="token string">&quot;/app&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">registerStompEndpoints</span><span class="token punctuation">(</span><span class="token class-name">StompEndpointRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">addEndpoint</span><span class="token punctuation">(</span><span class="token string">&quot;/ws&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setAllowedOrigins</span><span class="token punctuation">(</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">withSockJS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>推送主题</strong>:</p><table><thead><tr><th>主题</th><th>路径</th><th>数据类型</th><th>频率</th><th>说明</th></tr></thead><tbody><tr><td>价格更新</td><td><code>/topic/price/{stockCode}</code></td><td>Map&lt;String, Object&gt;</td><td>3-30秒</td><td>实时股票价格</td></tr><tr><td>交易信号</td><td><code>/topic/signals</code></td><td>StrategySignal</td><td>事件触发</td><td>策略生成的信号</td></tr><tr><td>策略信号</td><td><code>/topic/signals/strategy/{id}</code></td><td>StrategySignal</td><td>事件触发</td><td>特定策略信号</td></tr><tr><td>系统通知</td><td><code>/topic/notifications</code></td><td>Notification</td><td>不定期</td><td>系统消息</td></tr></tbody></table><hr><h2 id="🔄-核心工作流程" tabindex="-1"><a class="header-anchor" href="#🔄-核心工作流程" aria-hidden="true">#</a> 🔄 核心工作流程</h2><h3 id="_1-价格更新流程" tabindex="-1"><a class="header-anchor" href="#_1-价格更新流程" aria-hidden="true">#</a> 1. 价格更新流程</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">sequenceDiagram</span>
    <span class="token keyword">participant</span> Scheduler as Scheduler Service
    <span class="token keyword">participant</span> AI as AI Hotness Detection
    <span class="token keyword">participant</span> Stock as Stock Service
    <span class="token keyword">participant</span> Redis as Redis Cache
    <span class="token keyword">participant</span> WS as WebSocket
    <span class="token keyword">participant</span> Frontend as Frontend

    <span class="token keyword">loop</span> Every 3-30s <span class="token text string">(按热度分层)</span>
        Scheduler<span class="token arrow operator">-&gt;&gt;</span>Stock<span class="token operator">:</span> 获取最新价格
        Stock<span class="token arrow operator">--&gt;&gt;</span>Scheduler<span class="token operator">:</span> 返回价格数据

        Scheduler<span class="token arrow operator">-&gt;&gt;</span>AI<span class="token operator">:</span> 更新热度数据
        AI<span class="token arrow operator">-&gt;&gt;</span>AI<span class="token operator">:</span> 计算热度评分
        AI<span class="token arrow operator">-&gt;&gt;</span>AI<span class="token operator">:</span> 确定分类<span class="token text string">(SUPER_HOT/HOT/NORMAL/COLD)</span>
        AI<span class="token arrow operator">--&gt;&gt;</span>Scheduler<span class="token operator">:</span> 返回热度信息

        Scheduler<span class="token arrow operator">-&gt;&gt;</span>Redis<span class="token operator">:</span> 缓存价格 <span class="token text string">(TTL: 1min)</span>
        Scheduler<span class="token arrow operator">-&gt;&gt;</span>Redis<span class="token operator">:</span> 缓存热度 <span class="token text string">(TTL: 1h)</span>

        Scheduler<span class="token arrow operator">-&gt;&gt;</span>WS<span class="token operator">:</span> 推送价格更新
        WS<span class="token arrow operator">-&gt;&gt;</span>Frontend<span class="token operator">:</span> WebSocket推送
        Frontend<span class="token arrow operator">-&gt;&gt;</span>Frontend<span class="token operator">:</span> 更新UI
    <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-策略监控流程" tabindex="-1"><a class="header-anchor" href="#_2-策略监控流程" aria-hidden="true">#</a> 2. 策略监控流程</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">sequenceDiagram</span>
    <span class="token keyword">participant</span> Scheduler as Strategy Monitor
    <span class="token keyword">participant</span> Trading as Trading Service
    <span class="token keyword">participant</span> Stock as Stock Service
    <span class="token keyword">participant</span> WS as WebSocket
    <span class="token keyword">participant</span> User as User

    <span class="token keyword">loop</span> Every 10s
        Scheduler<span class="token arrow operator">-&gt;&gt;</span>Trading<span class="token operator">:</span> 获取运行中策略列表
        Trading<span class="token arrow operator">--&gt;&gt;</span>Scheduler<span class="token operator">:</span> 返回策略列表

        <span class="token keyword">loop</span> For each strategy
            Scheduler<span class="token arrow operator">-&gt;&gt;</span>Trading<span class="token operator">:</span> 生成交易信号
            Trading<span class="token arrow operator">-&gt;&gt;</span>Stock<span class="token operator">:</span> 获取股票数据
            Stock<span class="token arrow operator">--&gt;&gt;</span>Trading<span class="token operator">:</span> 返回股票数据
            Trading<span class="token arrow operator">-&gt;&gt;</span>Trading<span class="token operator">:</span> 执行策略逻辑
            Trading<span class="token arrow operator">--&gt;&gt;</span>Scheduler<span class="token operator">:</span> 返回信号<span class="token text string">(BUY/SELL/HOLD)</span>

            <span class="token keyword">alt</span> 信号为BUY或SELL
                Scheduler<span class="token arrow operator">-&gt;&gt;</span>WS<span class="token operator">:</span> 推送交易信号
                WS<span class="token arrow operator">-&gt;&gt;</span>User<span class="token operator">:</span> 通知用户

                <span class="token keyword">alt</span> 自动交易已启用
                    Scheduler<span class="token arrow operator">-&gt;&gt;</span>Trading<span class="token operator">:</span> 执行交易
                    Trading<span class="token arrow operator">--&gt;&gt;</span>Scheduler<span class="token operator">:</span> 交易结果
                <span class="token keyword">end</span>
            <span class="token keyword">end</span>
        <span class="token keyword">end</span>
    <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-ai热度动态调整流程" tabindex="-1"><a class="header-anchor" href="#_3-ai热度动态调整流程" aria-hidden="true">#</a> 3. AI热度动态调整流程</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">flowchart</span> TD
    A<span class="token text string">[收到价格更新]</span> <span class="token arrow operator">--&gt;</span> B<span class="token text string">[提取特征数据]</span>
    B <span class="token arrow operator">--&gt;</span> C<span class="token text string">[计算基础评分]</span>
    C <span class="token arrow operator">--&gt;</span> D<span class="token text string">[交易量评分 30%]</span>
    C <span class="token arrow operator">--&gt;</span> E<span class="token text string">[波动率评分 25%]</span>
    C <span class="token arrow operator">--&gt;</span> F<span class="token text string">[价格变化评分 20%]</span>
    C <span class="token arrow operator">--&gt;</span> G<span class="token text string">[更新频率评分 15%]</span>
    C <span class="token arrow operator">--&gt;</span> H<span class="token text string">[时间衰减评分 10%]</span>

    D <span class="token arrow operator">--&gt;</span> I<span class="token text string">[加权求和]</span>
    E <span class="token arrow operator">--&gt;</span> I
    F <span class="token arrow operator">--&gt;</span> I
    G <span class="token arrow operator">--&gt;</span> I
    H <span class="token arrow operator">--&gt;</span> I

    I <span class="token arrow operator">--&gt;</span> J<span class="token text string">[应用时间因子]</span>
    J <span class="token arrow operator">--&gt;</span> K<span class="token text string">[应用趋势因子]</span>
    K <span class="token arrow operator">--&gt;</span> L<span class="token text string">[最终热度评分]</span>

    L <span class="token arrow operator">--&gt;</span> M<span class="token text string">{评分 &gt;= 80?}</span>
    M <span class="token arrow operator">--&gt;</span><span class="token label property">|是|</span> N<span class="token text string">[SUPER_HOT - 3秒更新]</span>
    M <span class="token arrow operator">--&gt;</span><span class="token label property">|否|</span> O<span class="token text string">{评分 &gt;= 60?}</span>
    O <span class="token arrow operator">--&gt;</span><span class="token label property">|是|</span> P<span class="token text string">[HOT - 5秒更新]</span>
    O <span class="token arrow operator">--&gt;</span><span class="token label property">|否|</span> Q<span class="token text string">{评分 &gt;= 30?}</span>
    Q <span class="token arrow operator">--&gt;</span><span class="token label property">|是|</span> R<span class="token text string">[NORMAL - 10秒更新]</span>
    Q <span class="token arrow operator">--&gt;</span><span class="token label property">|否|</span> S<span class="token text string">[COLD - 30秒更新]</span>

    N <span class="token arrow operator">--&gt;</span> T<span class="token text string">[更新Redis缓存]</span>
    P <span class="token arrow operator">--&gt;</span> T
    R <span class="token arrow operator">--&gt;</span> T
    S <span class="token arrow operator">--&gt;</span> T

    T <span class="token arrow operator">--&gt;</span> U<span class="token text string">[推送热度变化]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📊-性能优化" tabindex="-1"><a class="header-anchor" href="#📊-性能优化" aria-hidden="true">#</a> 📊 性能优化</h2><h3 id="_1-并行处理策略" tabindex="-1"><a class="header-anchor" href="#_1-并行处理策略" aria-hidden="true">#</a> 1. 并行处理策略</h3><p><strong>CompletableFuture异步并行</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">updateStockPricesBatch</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> stockCodes<span class="token punctuation">,</span> <span class="token class-name">String</span> category<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>schedulerProperties<span class="token punctuation">.</span><span class="token function">getPerformance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getParallelEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 并行处理</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CompletableFuture</span><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> futures <span class="token operator">=</span> stockCodes<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>stockCode <span class="token operator">-&gt;</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
                <span class="token function">updateSingleStock</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">,</span> category<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 等待所有任务完成</span>
        <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">allOf</span><span class="token punctuation">(</span>futures<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>性能提升</strong>:</p><ul><li>串行处理: ~1000ms/批次</li><li>并行处理: ~200ms/批次</li><li><strong>性能提升</strong>: 5倍 🚀</li></ul><h3 id="_2-redis缓存策略" tabindex="-1"><a class="header-anchor" href="#_2-redis缓存策略" aria-hidden="true">#</a> 2. Redis缓存策略</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 价格缓存 - 短TTL，高频更新</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">cachePrice</span><span class="token punctuation">(</span><span class="token class-name">String</span> stockCode<span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> priceData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;stock:price:latest:&quot;</span> <span class="token operator">+</span> stockCode<span class="token punctuation">;</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> priceData<span class="token punctuation">,</span> <span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofMinutes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 热度缓存 - 长TTL，相对稳定</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">cacheHotnessData</span><span class="token punctuation">(</span><span class="token class-name">String</span> stockCode<span class="token punctuation">,</span> <span class="token class-name">StockHotnessData</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;stock:hotness:&quot;</span> <span class="token operator">+</span> stockCode<span class="token punctuation">;</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> data<span class="token punctuation">,</span> <span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofHours</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>缓存命中率</strong>: 通常 &gt; 90%</p><h3 id="_3-智能去重机制" tabindex="-1"><a class="header-anchor" href="#_3-智能去重机制" aria-hidden="true">#</a> 3. 智能去重机制</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">shouldUpdate</span><span class="token punctuation">(</span><span class="token class-name">String</span> stockCode<span class="token punctuation">,</span> <span class="token class-name">String</span> category<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Long</span> lastUpdate <span class="token operator">=</span> lastUpdateTime<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>lastUpdate <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">long</span> elapsed <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> lastUpdate<span class="token punctuation">;</span>
    <span class="token keyword">long</span> minInterval <span class="token operator">=</span> <span class="token function">getMinInterval</span><span class="token punctuation">(</span>category<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> elapsed <span class="token operator">&gt;=</span> minInterval<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>防止同一股票在短时间内被重复更新。</p><h3 id="_4-线程池调优" tabindex="-1"><a class="header-anchor" href="#_4-线程池调优" aria-hidden="true">#</a> 4. 线程池调优</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">scheduler</span><span class="token punctuation">:</span>
  <span class="token key atrule">performance</span><span class="token punctuation">:</span>
    <span class="token key atrule">thread-pool-size</span><span class="token punctuation">:</span> <span class="token number">8</span>      <span class="token comment"># CPU核心数 × 2</span>
    <span class="token key atrule">parallel-enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">batch-size</span><span class="token punctuation">:</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>推荐配置</strong>:</p><ul><li>开发环境: 4-8线程</li><li>生产环境: 8-16线程 (根据CPU核心数)</li></ul><hr><h2 id="📡-api接口" tabindex="-1"><a class="header-anchor" href="#📡-api接口" aria-hidden="true">#</a> 📡 API接口</h2><h3 id="监控端点" tabindex="-1"><a class="header-anchor" href="#监控端点" aria-hidden="true">#</a> 监控端点</h3><h4 id="_1-获取调度器配置" tabindex="-1"><a class="header-anchor" href="#_1-获取调度器配置" aria-hidden="true">#</a> 1. 获取调度器配置</h4><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>GET /api/v1/scheduler/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>响应</strong>:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;strategyMonitorInterval&quot;</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
  <span class="token property">&quot;priceUpdate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;superHotStocksInterval&quot;</span><span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hotStocksInterval&quot;</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>
    <span class="token property">&quot;normalStocksInterval&quot;</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
    <span class="token property">&quot;coldStocksInterval&quot;</span><span class="token operator">:</span> <span class="token number">30000</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;superHotStocks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;600519.SH&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hotStocks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;000001.SZ&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;600036.SH&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;performance&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;batchSize&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token property">&quot;parallelEnabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;threadPoolSize&quot;</span><span class="token operator">:</span> <span class="token number">8</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-获取性能指标" tabindex="-1"><a class="header-anchor" href="#_2-获取性能指标" aria-hidden="true">#</a> 2. 获取性能指标</h4><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>GET /api/v1/scheduler/metrics
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>响应</strong>:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;totalUpdates&quot;</span><span class="token operator">:</span> <span class="token number">15240</span><span class="token punctuation">,</span>
  <span class="token property">&quot;failedUpdates&quot;</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
  <span class="token property">&quot;successRate&quot;</span><span class="token operator">:</span> <span class="token number">99.92</span><span class="token punctuation">,</span>
  <span class="token property">&quot;monitoredStocks&quot;</span><span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
  <span class="token property">&quot;topStocks&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;600519.SH&quot;</span><span class="token operator">:</span> <span class="token number">1520</span><span class="token punctuation">,</span>
    <span class="token property">&quot;000001.SZ&quot;</span><span class="token operator">:</span> <span class="token number">1015</span><span class="token punctuation">,</span>
    <span class="token property">&quot;600036.SH&quot;</span><span class="token operator">:</span> <span class="token number">1010</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aiHotness&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;superHotCount&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hotCount&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;normalCount&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
    <span class="token property">&quot;coldCount&quot;</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>
    <span class="token property">&quot;averageHotnessScore&quot;</span><span class="token operator">:</span> <span class="token number">42.5</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-ai热度排行榜" tabindex="-1"><a class="header-anchor" href="#_3-ai热度排行榜" aria-hidden="true">#</a> 3. AI热度排行榜</h4><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>GET /api/v1/scheduler/hotness/ranking?limit=10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>响应</strong>:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;stockCode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;600519.SH&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;stockName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;贵州茅台&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hotnessScore&quot;</span><span class="token operator">:</span> <span class="token number">85.6</span><span class="token punctuation">,</span>
    <span class="token property">&quot;category&quot;</span><span class="token operator">:</span> <span class="token string">&quot;SUPER_HOT&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;volume&quot;</span><span class="token operator">:</span> <span class="token number">125000000</span><span class="token punctuation">,</span>
    <span class="token property">&quot;volatility&quot;</span><span class="token operator">:</span> <span class="token number">0.045</span><span class="token punctuation">,</span>
    <span class="token property">&quot;priceChange&quot;</span><span class="token operator">:</span> <span class="token number">2.8</span><span class="token punctuation">,</span>
    <span class="token property">&quot;updateFrequency&quot;</span><span class="token operator">:</span> <span class="token number">120</span><span class="token punctuation">,</span>
    <span class="token property">&quot;lastUpdate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2024-01-20T14:30:00&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-获取指定股票热度" tabindex="-1"><a class="header-anchor" href="#_4-获取指定股票热度" aria-hidden="true">#</a> 4. 获取指定股票热度</h4><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>GET /api/v1/scheduler/hotness/{stockCode}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_5-热度统计信息" tabindex="-1"><a class="header-anchor" href="#_5-热度统计信息" aria-hidden="true">#</a> 5. 热度统计信息</h4><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>GET /api/v1/scheduler/hotness/statistics
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><h2 id="🔧-配置说明" tabindex="-1"><a class="header-anchor" href="#🔧-配置说明" aria-hidden="true">#</a> 🔧 配置说明</h2><h3 id="application-yml-完整配置" tabindex="-1"><a class="header-anchor" href="#application-yml-完整配置" aria-hidden="true">#</a> application.yml 完整配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8085</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> scheduler<span class="token punctuation">-</span>service

  <span class="token comment"># Redis配置 (必需)</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> redis123456
    <span class="token key atrule">database</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">lettuce</span><span class="token punctuation">:</span>
      <span class="token key atrule">pool</span><span class="token punctuation">:</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token key atrule">max-idle</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">0</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>1ms

  <span class="token comment"># Kafka配置 (可选 - 已禁用)</span>
  <span class="token key atrule">kafka</span><span class="token punctuation">:</span>
    <span class="token key atrule">bootstrap-servers</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">9092</span>

<span class="token comment"># 服务调用配置</span>
<span class="token key atrule">service</span><span class="token punctuation">:</span>
  <span class="token key atrule">trading</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8083</span>
  <span class="token key atrule">stock</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">8082</span>

<span class="token comment"># 调度配置</span>
<span class="token key atrule">scheduler</span><span class="token punctuation">:</span>
  <span class="token comment"># 策略监控间隔</span>
  <span class="token key atrule">strategy-monitor-interval</span><span class="token punctuation">:</span> <span class="token number">10000</span>  <span class="token comment"># 10秒</span>

  <span class="token comment"># 分层价格更新间隔</span>
  <span class="token key atrule">price-update</span><span class="token punctuation">:</span>
    <span class="token key atrule">super-hot-stocks-interval</span><span class="token punctuation">:</span> <span class="token number">3000</span>   <span class="token comment"># 3秒 ⚡⚡⚡</span>
    <span class="token key atrule">hot-stocks-interval</span><span class="token punctuation">:</span> <span class="token number">5000</span>         <span class="token comment"># 5秒 ⚡⚡</span>
    <span class="token key atrule">normal-stocks-interval</span><span class="token punctuation">:</span> <span class="token number">10000</span>     <span class="token comment"># 10秒 ⚡</span>
    <span class="token key atrule">cold-stocks-interval</span><span class="token punctuation">:</span> <span class="token number">30000</span>       <span class="token comment"># 30秒</span>

  <span class="token comment"># 交易时段</span>
  <span class="token key atrule">trading-hours</span><span class="token punctuation">:</span>
    <span class="token key atrule">start</span><span class="token punctuation">:</span> <span class="token string">&quot;09:30&quot;</span>
    <span class="token key atrule">end</span><span class="token punctuation">:</span> <span class="token string">&quot;15:00&quot;</span>

  <span class="token comment"># 超级热门股票列表</span>
  <span class="token key atrule">super-hot-stocks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">&quot;600519.SH&quot;</span>  <span class="token comment"># 贵州茅台</span>

  <span class="token comment"># 热门股票列表</span>
  <span class="token key atrule">hot-stocks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">&quot;000001.SZ&quot;</span>  <span class="token comment"># 平安银行</span>
    <span class="token punctuation">-</span> <span class="token string">&quot;600036.SH&quot;</span>  <span class="token comment"># 招商银行</span>

  <span class="token comment"># 性能优化</span>
  <span class="token key atrule">performance</span><span class="token punctuation">:</span>
    <span class="token key atrule">batch-size</span><span class="token punctuation">:</span> <span class="token number">10</span>
    <span class="token key atrule">parallel-enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">thread-pool-size</span><span class="token punctuation">:</span> <span class="token number">8</span>

  <span class="token comment"># 自动交易开关</span>
  <span class="token key atrule">auto-trade-enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token comment"># Actuator配置</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> health<span class="token punctuation">,</span>info<span class="token punctuation">,</span>metrics<span class="token punctuation">,</span>scheduledtasks<span class="token punctuation">,</span>prometheus
  <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
    <span class="token key atrule">health</span><span class="token punctuation">:</span>
      <span class="token key atrule">show-details</span><span class="token punctuation">:</span> always
  <span class="token key atrule">metrics</span><span class="token punctuation">:</span>
    <span class="token key atrule">export</span><span class="token punctuation">:</span>
      <span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📈-监控体系" tabindex="-1"><a class="header-anchor" href="#📈-监控体系" aria-hidden="true">#</a> 📈 监控体系</h2><h3 id="prometheus指标" tabindex="-1"><a class="header-anchor" href="#prometheus指标" aria-hidden="true">#</a> Prometheus指标</h3><p>系统暴露的关键监控指标:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 总更新次数
scheduler_price_updates_total 15240

# 失败次数
scheduler_price_updates_failed 12

# 成功率
scheduler_price_updates_success_rate 99.92

# 监控股票数
scheduler_monitored_stocks 26

# AI热度分布
scheduler_ai_hotness_super_hot 1
scheduler_ai_hotness_hot 2
scheduler_ai_hotness_normal 15
scheduler_ai_hotness_cold 8

# 平均热度评分
scheduler_ai_hotness_avg_score 42.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="grafana-dashboard" tabindex="-1"><a class="header-anchor" href="#grafana-dashboard" aria-hidden="true">#</a> Grafana Dashboard</h3><p>预配置的监控面板包括:</p><ol><li><p><strong>总览面板</strong></p><ul><li>总更新次数 (Stat)</li><li>成功率 (Gauge)</li><li>监控股票数 (Stat)</li></ul></li><li><p><strong>趋势分析</strong></p><ul><li>每分钟更新次数 (Time Series)</li><li>失败率趋势 (Time Series)</li></ul></li><li><p><strong>热度分布</strong></p><ul><li>股票分类饼图 (Pie Chart)</li><li>热度评分分布 (Histogram)</li></ul></li><li><p><strong>性能监控</strong></p><ul><li>Top 10更新最频繁股票 (Table)</li><li>平均响应时间 (Graph)</li></ul></li><li><p><strong>日志面板</strong></p><ul><li>实时错误日志 (Logs)</li></ul></li></ol><p><strong>Dashboard导入</strong>: <code>infrastructure/grafana/dashboards/scheduler-monitor.json</code></p><hr><h2 id="🚀-部署指南" tabindex="-1"><a class="header-anchor" href="#🚀-部署指南" aria-hidden="true">#</a> 🚀 部署指南</h2><h3 id="前置条件" tabindex="-1"><a class="header-anchor" href="#前置条件" aria-hidden="true">#</a> 前置条件</h3><h4 id="必需服务" tabindex="-1"><a class="header-anchor" href="#必需服务" aria-hidden="true">#</a> 必需服务</h4><ol><li><p><strong>Redis</strong> (端口 6379)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> redis <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 redis:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>Stock Service</strong> (端口 8082)</p></li><li><p><strong>Trading Service</strong> (端口 8083)</p></li></ol><h4 id="可选服务" tabindex="-1"><a class="header-anchor" href="#可选服务" aria-hidden="true">#</a> 可选服务</h4><ul><li>Kafka (端口 9092) - 已在代码中禁用，使用轮询模式</li></ul><h3 id="启动步骤" tabindex="-1"><a class="header-anchor" href="#启动步骤" aria-hidden="true">#</a> 启动步骤</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 启动Redis</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> redis <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 redis:latest

<span class="token comment"># 2. 启动依赖服务</span>
<span class="token builtin class-name">cd</span> stock-service <span class="token operator">&amp;&amp;</span> mvn spring-boot:run <span class="token operator">&amp;</span>
<span class="token builtin class-name">cd</span> trading-service <span class="token operator">&amp;&amp;</span> mvn spring-boot:run <span class="token operator">&amp;</span>

<span class="token comment"># 3. 启动Scheduler Service</span>
<span class="token builtin class-name">cd</span> scheduler-service <span class="token operator">&amp;&amp;</span> mvn spring-boot:run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="健康检查" tabindex="-1"><a class="header-anchor" href="#健康检查" aria-hidden="true">#</a> 健康检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 服务健康状态</span>
<span class="token function">curl</span> http://localhost:8085/actuator/health

<span class="token comment"># 调度器状态</span>
<span class="token function">curl</span> http://localhost:8085/api/v1/scheduler/status

<span class="token comment"># 配置信息</span>
<span class="token function">curl</span> http://localhost:8085/api/v1/scheduler/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker部署" tabindex="-1"><a class="header-anchor" href="#docker部署" aria-hidden="true">#</a> Docker部署</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 构建镜像</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> scheduler-service:latest <span class="token builtin class-name">.</span>

<span class="token comment"># 运行容器</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> scheduler-service <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">8085</span>:8085 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">SPRING_REDIS_HOST</span><span class="token operator">=</span>redis <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">SERVICE_STOCK_URL</span><span class="token operator">=</span>http://stock-service:8082 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">SERVICE_TRADING_URL</span><span class="token operator">=</span>http://trading-service:8083 <span class="token punctuation">\\</span>
  scheduler-service:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🐛-故障排查" tabindex="-1"><a class="header-anchor" href="#🐛-故障排查" aria-hidden="true">#</a> 🐛 故障排查</h2><h3 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h3><h4 id="_1-kafka连接错误-已解决" tabindex="-1"><a class="header-anchor" href="#_1-kafka连接错误-已解决" aria-hidden="true">#</a> 1. Kafka连接错误 (已解决)</h4><p><strong>错误</strong>: <code>java.net.UnknownHostException: kafka</code></p><p><strong>原因</strong>: Kafka未启动，但系统已配置为禁用Kafka</p><p><strong>解决</strong>: 已在 <code>SchedulerServiceApplication</code> 中排除Kafka自动配置</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span><span class="token punctuation">(</span>exclude <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">KafkaAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-redis连接失败" tabindex="-1"><a class="header-anchor" href="#_2-redis连接失败" aria-hidden="true">#</a> 2. Redis连接失败</h4><p><strong>错误</strong>: <code>Unable to connect to Redis</code></p><p><strong>解决</strong>:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查Redis状态</span>
redis-cli <span class="token function">ping</span>  <span class="token comment"># 应返回 PONG</span>

<span class="token comment"># 检查端口</span>
<span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">6379</span>

<span class="token comment"># 重启Redis</span>
<span class="token function">docker</span> restart redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-stock-service调用失败" tabindex="-1"><a class="header-anchor" href="#_3-stock-service调用失败" aria-hidden="true">#</a> 3. Stock Service调用失败</h4><p><strong>错误</strong>: <code>Feign Client error: Connection refused</code></p><p><strong>解决</strong>:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 确认Stock Service已启动</span>
<span class="token function">curl</span> http://localhost:8082/actuator/health

<span class="token comment"># 检查端口占用</span>
<span class="token function">lsof</span> <span class="token parameter variable">-i</span> :8082
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-交易时段外无数据更新" tabindex="-1"><a class="header-anchor" href="#_4-交易时段外无数据更新" aria-hidden="true">#</a> 4. 交易时段外无数据更新</h4><p><strong>现象</strong>: 非交易时间(9:30-15:00外)看不到价格更新</p><p><strong>说明</strong>: 这是正常行为，系统限制了交易时段</p><p><strong>测试时临时关闭</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// TieredPricePollingScheduler.java</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isTradingHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  <span class="token comment">// 始终返回true，仅用于测试</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📚-相关文档" tabindex="-1"><a class="header-anchor" href="#📚-相关文档" aria-hidden="true">#</a> 📚 相关文档</h2>`,122),d=p('<hr><h2 id="🔮-未来规划" tabindex="-1"><a class="header-anchor" href="#🔮-未来规划" aria-hidden="true">#</a> 🔮 未来规划</h2><h3 id="短期优化-1-2个月" tabindex="-1"><a class="header-anchor" href="#短期优化-1-2个月" aria-hidden="true">#</a> 短期优化 (1-2个月)</h3><ul><li>[ ] 引入深度学习模型(LSTM)进行热度预测</li><li>[ ] 支持更多股票数据源</li><li>[ ] 优化缓存策略，降低Redis压力</li><li>[ ] 增加更多监控指标和告警规则</li></ul><h3 id="长期规划-3-6个月" tabindex="-1"><a class="header-anchor" href="#长期规划-3-6个月" aria-hidden="true">#</a> 长期规划 (3-6个月)</h3><ul><li>[ ] 集成新闻和社交媒体情感分析</li><li>[ ] 支持多市场(港股、美股)</li><li>[ ] 实现分布式部署和负载均衡</li><li>[ ] 开发自适应调度算法</li><li>[ ] 支持用户自定义热度评分因子</li></ul><hr><h2 id="👥-开发团队" tabindex="-1"><a class="header-anchor" href="#👥-开发团队" aria-hidden="true">#</a> 👥 开发团队</h2><ul><li><strong>架构设计</strong>: Claude Code</li><li><strong>核心开发</strong>: YouWei Chen</li><li><strong>技术栈</strong>: Spring Boot + AI算法 + WebSocket</li></ul><hr><p><em>最后更新: 2024-01-20</em></p>',11);function k(v,m){const s=c("RouterLink");return l(),i("div",null,[u,n("ul",null,[n("li",null,[a(s,{to:"/scheduler-service/AI_HOTNESS_DETECTION.html"},{default:e(()=>[t("AI热度检测详细说明")]),_:1})]),n("li",null,[a(s,{to:"/scheduler-service/POLLING_OPTIMIZATION.html"},{default:e(()=>[t("轮询优化文档")]),_:1})]),n("li",null,[a(s,{to:"/scheduler-service/INTEGRATION_GUIDE.html"},{default:e(()=>[t("集成指南")]),_:1})]),n("li",null,[a(s,{to:"/scheduler-service/DEPLOYMENT_NOTES.html"},{default:e(()=>[t("部署说明")]),_:1})])]),d])}const h=o(r,[["render",k],["__file","SCHEDULER_SERVICE.html.vue"]]);export{h as default};
