import{_ as n,o as s,c as a,e}from"./app-pG-YptcK.js";const t={},p=e(`<h1 id="wequant-量化交易平台-技术架构文档" tabindex="-1"><a class="header-anchor" href="#wequant-量化交易平台-技术架构文档" aria-hidden="true">#</a> WeQuant 量化交易平台 - 技术架构文档</h1><h2 id="📊-系统总体架构" tabindex="-1"><a class="header-anchor" href="#📊-系统总体架构" aria-hidden="true">#</a> 📊 系统总体架构</h2><h3 id="🏗️-微服务架构图" tabindex="-1"><a class="header-anchor" href="#🏗️-微服务架构图" aria-hidden="true">#</a> 🏗️ 微服务架构图</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TB
    <span class="token keyword">subgraph</span> <span class="token string">&quot;前端层 Frontend&quot;</span>
        FE<span class="token text string">[Vue.js + Element Plus + ECharts]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;API网关层 Gateway&quot;</span>
        GW<span class="token text string">[Nginx / Spring Cloud Gateway]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;Java微服务集群&quot;</span>
        US<span class="token text string">[user-service:8081&lt;br/&gt;用户认证管理]</span>
        SS<span class="token text string">[stock-service:8082&lt;br/&gt;股票数据服务]</span>
        TS<span class="token text string">[trading-service:8083&lt;br/&gt;交易服务]</span>
        ST<span class="token text string">[strategy-service:8084&lt;br/&gt;策略管理服务]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;Python服务集群&quot;</span>
        MDS<span class="token text string">[market-data-service:5001&lt;br/&gt;市场数据服务]</span>
        MTS<span class="token text string">[mock-trading-service:5002&lt;br/&gt;模拟交易原型]</span>
        BS<span class="token text string">[backtest-service:5003&lt;br/&gt;回测引擎]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;数据存储层&quot;</span>
        MYSQL<span class="token text string">[(MySQL 8.0&lt;br/&gt;主数据库)]</span>
        REDIS<span class="token text string">[(Redis 7.0&lt;br/&gt;缓存层)]</span>
        KAFKA<span class="token text string">[(Kafka&lt;br/&gt;消息队列)]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;外部数据源&quot;</span>
        AK<span class="token text string">[akshare API&lt;br/&gt;股票数据]</span>
        EXT<span class="token text string">[其他金融API]</span>
    <span class="token keyword">end</span>

    FE <span class="token arrow operator">--&gt;</span> GW
    GW <span class="token arrow operator">--&gt;</span> US
    GW <span class="token arrow operator">--&gt;</span> SS
    GW <span class="token arrow operator">--&gt;</span> TS
    GW <span class="token arrow operator">--&gt;</span> ST
    GW <span class="token arrow operator">--&gt;</span> MDS
    GW <span class="token arrow operator">--&gt;</span> MTS

    US <span class="token arrow operator">--&gt;</span> MYSQL
    SS <span class="token arrow operator">--&gt;</span> MYSQL
    TS <span class="token arrow operator">--&gt;</span> MYSQL
    ST <span class="token arrow operator">--&gt;</span> MYSQL

    US <span class="token arrow operator">--&gt;</span> REDIS
    SS <span class="token arrow operator">--&gt;</span> REDIS
    TS <span class="token arrow operator">--&gt;</span> REDIS

    MDS <span class="token arrow operator">--&gt;</span> AK
    MDS <span class="token arrow operator">--&gt;</span> EXT
    MDS <span class="token arrow operator">--&gt;</span> KAFKA
    BS <span class="token arrow operator">--&gt;</span> KAFKA

    SS <span class="token arrow operator">--&gt;</span> MDS
    TS <span class="token arrow operator">--&gt;</span> SS
    TS <span class="token arrow operator">--&gt;</span> MTS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🔧-服务详细架构" tabindex="-1"><a class="header-anchor" href="#🔧-服务详细架构" aria-hidden="true">#</a> 🔧 服务详细架构</h2><h3 id="_1-前端架构-frontend" tabindex="-1"><a class="header-anchor" href="#_1-前端架构-frontend" aria-hidden="true">#</a> 1. 前端架构 (Frontend)</h3><p><strong>技术栈</strong>: Vue 3 + TypeScript + Vite + Element Plus + ECharts</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>web-frontend/
├── src/
│   ├── components/          # 公共组件
│   │   ├── StockHistoryChart.vue    # 智能响应式K线图
│   │   ├── TradingInterface.vue     # 交易界面
│   │   └── common/                  # 基础组件
│   ├── views/dashboard/     # 页面视图
│   │   ├── Home.vue                 # 仪表盘首页
│   │   ├── Trading.vue              # 交易页面
│   │   ├── Portfolio.vue            # 投资组合
│   │   └── Analysis.vue             # 数据分析
│   ├── store/               # 状态管理
│   │   ├── auth.js                  # 用户认证状态
│   │   ├── trading.js               # 交易状态
│   │   └── market.js                # 市场数据状态
│   ├── api/                 # API调用层
│   │   ├── stock.js                 # 股票数据API
│   │   ├── trading.js               # 交易API
│   │   └── user.js                  # 用户API
│   └── router/              # 路由配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>核心特性</strong>:</p><ul><li>🎯 <strong>智能响应式图表</strong> - 基于视窗比例的动态 K 线图适配</li><li>📱 <strong>多设备支持</strong> - 手机、平板、桌面的原生体验</li><li>⚡ <strong>实时数据更新</strong> - WebSocket + 轮询的混合策略</li><li>🎨 <strong>主题系统</strong> - 深色/浅色模式切换</li></ul><h3 id="_2-java-微服务集群" tabindex="-1"><a class="header-anchor" href="#_2-java-微服务集群" aria-hidden="true">#</a> 2. Java 微服务集群</h3><h4 id="_2-1-用户服务-user-service-8081" tabindex="-1"><a class="header-anchor" href="#_2-1-用户服务-user-service-8081" aria-hidden="true">#</a> 2.1 用户服务 (user-service:8081)</h4><p><strong>技术栈</strong>: Spring Boot 2.7.14 + Spring Security + JWT + MySQL</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>com<span class="token punctuation">.</span>quant<span class="token punctuation">.</span>user<span class="token operator">/</span>
├── controller<span class="token operator">/</span>
│   ├── <span class="token class-name">AuthController</span><span class="token punctuation">.</span>java         # 登录注册
│   ├── <span class="token class-name">UserController</span><span class="token punctuation">.</span>java         # 用户管理
│   └── <span class="token class-name">ProfileController</span><span class="token punctuation">.</span>java      # 个人资料
├── service<span class="token operator">/</span>
│   ├── <span class="token class-name">AuthService</span><span class="token punctuation">.</span>java            # 认证服务
│   ├── <span class="token class-name">UserService</span><span class="token punctuation">.</span>java            # 用户业务
│   └── <span class="token class-name">JwtService</span><span class="token punctuation">.</span>java             # <span class="token constant">JWT</span>管理
├── entity<span class="token operator">/</span>
│   ├── <span class="token class-name">User</span><span class="token punctuation">.</span>java                   # 用户实体
│   ├── <span class="token class-name">UserProfile</span><span class="token punctuation">.</span>java           # 用户资料
│   └── <span class="token class-name">UserPreference</span><span class="token punctuation">.</span>java        # 用户偏好
└── config<span class="token operator">/</span>
    ├── <span class="token class-name">SecurityConfig</span><span class="token punctuation">.</span>java         # 安全配置
    └── <span class="token class-name">JwtConfig</span><span class="token punctuation">.</span>java              # <span class="token constant">JWT</span>配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>API 设计</strong>:</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>POST /api/v1/auth/register          # 用户注册
POST /api/v1/auth/login             # 用户登录
POST /api/v1/auth/logout            # 用户登出
GET  /api/v1/user/profile           # 获取个人资料
PUT  /api/v1/user/profile           # 更新个人资料
GET  /api/v1/user/preferences       # 获取用户偏好
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-股票服务-stock-service-8082" tabindex="-1"><a class="header-anchor" href="#_2-2-股票服务-stock-service-8082" aria-hidden="true">#</a> 2.2 股票服务 (stock-service:8082)</h4><p><strong>技术栈</strong>: Spring Boot 2.7.14 + Redis + RestTemplate + Jackson</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>com<span class="token punctuation">.</span>quant<span class="token punctuation">.</span>stock<span class="token operator">/</span>
├── controller<span class="token operator">/</span>
│   ├── <span class="token class-name">StockController</span><span class="token punctuation">.</span>java        # 股票数据控制器
│   └── <span class="token class-name">MarketController</span><span class="token punctuation">.</span>java       # 市场数据控制器
├── service<span class="token operator">/</span>
│   ├── <span class="token class-name">StockService</span><span class="token punctuation">.</span>java           # 股票业务服务
│   ├── <span class="token class-name">MarketDataService</span><span class="token punctuation">.</span>java      # 市场数据服务
│   └── <span class="token class-name">CacheService</span><span class="token punctuation">.</span>java           # 缓存服务
├── dto<span class="token operator">/</span>
│   ├── <span class="token class-name">StockInfoDto</span><span class="token punctuation">.</span>java           # 股票信息<span class="token constant">DTO</span>
│   ├── <span class="token class-name">HistoryDataDto</span><span class="token punctuation">.</span>java         # 历史数据<span class="token constant">DTO</span>
│   └── <span class="token class-name">MarketDataDto</span><span class="token punctuation">.</span>java          # 市场数据<span class="token constant">DTO</span>
└── config<span class="token operator">/</span>
    ├── <span class="token class-name">RestTemplateConfig</span><span class="token punctuation">.</span>java     # <span class="token constant">HTTP</span>客户端配置
    └── <span class="token class-name">RedisConfig</span><span class="token punctuation">.</span>java            # <span class="token class-name">Redis</span>配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>API 设计</strong>:</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>GET  /api/v1/stocks/{code}/latest   # 获取最新股价
GET  /api/v1/stocks/{code}/history  # 获取历史数据
GET  /api/v1/stocks/{code}/info     # 获取股票信息
GET  /api/v1/market/ranking         # 获取排行榜
GET  /api/v1/market/sectors         # 获取板块数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-交易服务-trading-service-8083" tabindex="-1"><a class="header-anchor" href="#_2-3-交易服务-trading-service-8083" aria-hidden="true">#</a> 2.3 交易服务 (trading-service:8083)</h4><p><strong>技术栈</strong>: Spring Boot 2.7.14 + JPA + H2/MySQL + 事务管理</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>com<span class="token punctuation">.</span>quant<span class="token punctuation">.</span>trading<span class="token operator">/</span>
├── controller<span class="token operator">/</span>
│   └── <span class="token class-name">TradingController</span><span class="token punctuation">.</span>java      # 交易控制器
├── service<span class="token operator">/</span>
│   ├── <span class="token class-name">TradingService</span><span class="token punctuation">.</span>java         # 交易业务服务
│   ├── <span class="token class-name">StockPriceService</span><span class="token punctuation">.</span>java      # 股价服务
│   └── <span class="token class-name">PortfolioService</span><span class="token punctuation">.</span>java       # 投资组合服务
├── entity<span class="token operator">/</span>
│   ├── <span class="token class-name">TradingAccount</span><span class="token punctuation">.</span>java         # 交易账户
│   ├── <span class="token class-name">Position</span><span class="token punctuation">.</span>java               # 持仓信息
│   └── <span class="token class-name">Trade</span><span class="token punctuation">.</span>java                  # 交易记录
├── repository<span class="token operator">/</span>
│   ├── <span class="token class-name">TradingAccountRepository</span><span class="token punctuation">.</span>java
│   ├── <span class="token class-name">PositionRepository</span><span class="token punctuation">.</span>java
│   └── <span class="token class-name">TradeRepository</span><span class="token punctuation">.</span>java
└── dto<span class="token operator">/</span>
    ├── <span class="token class-name">TradeRequest</span><span class="token punctuation">.</span>java           # 交易请求
    └── <span class="token class-name">AccountInfoResponse</span><span class="token punctuation">.</span>java    # 账户响应
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>核心业务逻辑</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token class-name">Trade</span> <span class="token function">executeTrade</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">,</span> <span class="token class-name">String</span> stockCode<span class="token punctuation">,</span> <span class="token class-name">TradeType</span> tradeType<span class="token punctuation">,</span> <span class="token class-name">Integer</span> quantity<span class="token punctuation">,</span> <span class="token class-name">BigDecimal</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1. 获取交易账户</span>
    <span class="token class-name">TradingAccount</span> account <span class="token operator">=</span> <span class="token function">getAccount</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 2. 计算交易金额和手续费</span>
    <span class="token class-name">BigDecimal</span> amount <span class="token operator">=</span> price<span class="token punctuation">.</span><span class="token function">multiply</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>quantity<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BigDecimal</span> commission <span class="token operator">=</span> amount<span class="token punctuation">.</span><span class="token function">multiply</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">0.0003</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 万三手续费</span>

    <span class="token comment">// 3. 执行买入/卖出逻辑</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>tradeType <span class="token operator">==</span> <span class="token class-name">TradeType</span><span class="token punctuation">.</span><span class="token constant">BUY</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">executeBuyOrder</span><span class="token punctuation">(</span>account<span class="token punctuation">,</span> stockCode<span class="token punctuation">,</span> quantity<span class="token punctuation">,</span> price<span class="token punctuation">,</span> amount<span class="token punctuation">,</span> commission<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">executeSellOrder</span><span class="token punctuation">(</span>account<span class="token punctuation">,</span> stockCode<span class="token punctuation">,</span> quantity<span class="token punctuation">,</span> price<span class="token punctuation">,</span> amount<span class="token punctuation">,</span> commission<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4. 记录交易历史</span>
    <span class="token keyword">return</span> <span class="token function">recordTrade</span><span class="token punctuation">(</span>account<span class="token punctuation">,</span> stockCode<span class="token punctuation">,</span> tradeType<span class="token punctuation">,</span> quantity<span class="token punctuation">,</span> price<span class="token punctuation">,</span> amount<span class="token punctuation">,</span> commission<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-python-服务集群" tabindex="-1"><a class="header-anchor" href="#_3-python-服务集群" aria-hidden="true">#</a> 3. Python 服务集群</h3><h4 id="_3-1-市场数据服务-market-data-service-5001" tabindex="-1"><a class="header-anchor" href="#_3-1-市场数据服务-market-data-service-5001" aria-hidden="true">#</a> 3.1 市场数据服务 (market-data-service:5001)</h4><p><strong>技术栈</strong>: FastAPI + akshare + asyncio + Redis</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>market<span class="token operator">-</span>data<span class="token operator">-</span>service<span class="token operator">/</span>
├── app<span class="token punctuation">.</span>py                          <span class="token comment"># FastAPI应用入口</span>
├── services<span class="token operator">/</span>
│   ├── akshare_service<span class="token punctuation">.</span>py          <span class="token comment"># akshare数据获取</span>
│   ├── cache_service<span class="token punctuation">.</span>py            <span class="token comment"># 缓存服务</span>
│   └── data_processor<span class="token punctuation">.</span>py           <span class="token comment"># 数据处理</span>
├── models<span class="token operator">/</span>
│   ├── stock_data<span class="token punctuation">.</span>py               <span class="token comment"># 股票数据模型</span>
│   └── market_data<span class="token punctuation">.</span>py              <span class="token comment"># 市场数据模型</span>
└── config<span class="token operator">/</span>
    └── settings<span class="token punctuation">.</span>py                 <span class="token comment"># 配置文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>API 设计</strong>:</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>GET  /api/stocks/{code}/latest      # 获取最新股价
GET  /api/stocks/{code}/history     # 获取历史数据
GET  /api/market/ranking            # 获取涨跌排行
GET  /api/market/sectors            # 获取板块数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-模拟交易服务-mock-trading-service-5002" tabindex="-1"><a class="header-anchor" href="#_3-2-模拟交易服务-mock-trading-service-5002" aria-hidden="true">#</a> 3.2 模拟交易服务 (mock-trading-service:5002)</h4><p><strong>技术栈</strong>: Flask + SQLite + akshare</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>mock<span class="token operator">-</span>trading<span class="token operator">-</span>service<span class="token operator">/</span>
├── app<span class="token punctuation">.</span>py                          <span class="token comment"># Flask应用入口</span>
├── models<span class="token operator">/</span>
│   ├── account<span class="token punctuation">.</span>py                  <span class="token comment"># 账户模型</span>
│   ├── position<span class="token punctuation">.</span>py                 <span class="token comment"># 持仓模型</span>
│   └── trade<span class="token punctuation">.</span>py                    <span class="token comment"># 交易模型</span>
├── services<span class="token operator">/</span>
│   ├── trading_service<span class="token punctuation">.</span>py          <span class="token comment"># 交易业务</span>
│   ├── portfolio_service<span class="token punctuation">.</span>py        <span class="token comment"># 投资组合</span>
│   └── price_service<span class="token punctuation">.</span>py            <span class="token comment"># 价格服务</span>
└── database<span class="token operator">/</span>
    └── init<span class="token punctuation">.</span>sql                    <span class="token comment"># 数据库初始化</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🗄️-数据库设计" tabindex="-1"><a class="header-anchor" href="#🗄️-数据库设计" aria-hidden="true">#</a> 🗄️ 数据库设计</h2><h3 id="mysql-主数据库" tabindex="-1"><a class="header-anchor" href="#mysql-主数据库" aria-hidden="true">#</a> MySQL 主数据库</h3><h4 id="用户相关表" tabindex="-1"><a class="header-anchor" href="#用户相关表" aria-hidden="true">#</a> 用户相关表</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 用户基础信息表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> users <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
    username <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    email <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    password_hash <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    full_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    phone <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">status</span> <span class="token keyword">ENUM</span><span class="token punctuation">(</span><span class="token string">&#39;ACTIVE&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;INACTIVE&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;SUSPENDED&#39;</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;ACTIVE&#39;</span><span class="token punctuation">,</span>
    risk_level <span class="token keyword">ENUM</span><span class="token punctuation">(</span><span class="token string">&#39;CONSERVATIVE&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;MODERATE&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;AGGRESSIVE&#39;</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;MODERATE&#39;</span><span class="token punctuation">,</span>
    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span>
    updated_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CURRENT_TIMESTAMP</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 用户偏好设置表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> user_preferences <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
    user_id <span class="token keyword">BIGINT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    theme <span class="token keyword">ENUM</span><span class="token punctuation">(</span><span class="token string">&#39;LIGHT&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;DARK&#39;</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;LIGHT&#39;</span><span class="token punctuation">,</span>
    <span class="token keyword">language</span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;zh-CN&#39;</span><span class="token punctuation">,</span>
    timezone <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;Asia/Shanghai&#39;</span><span class="token punctuation">,</span>
    notification_enabled <span class="token keyword">BOOLEAN</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">TRUE</span><span class="token punctuation">,</span>
    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>user_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> users<span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="交易相关表" tabindex="-1"><a class="header-anchor" href="#交易相关表" aria-hidden="true">#</a> 交易相关表</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 交易账户表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> trading_accounts <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
    account_id <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    user_id <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    balance <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token number">1000000.00</span><span class="token punctuation">,</span>
    total_assets <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token number">1000000.00</span><span class="token punctuation">,</span>
    frozen_amount <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token number">0.00</span><span class="token punctuation">,</span>
    <span class="token keyword">status</span> <span class="token keyword">ENUM</span><span class="token punctuation">(</span><span class="token string">&#39;ACTIVE&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;FROZEN&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;CLOSED&#39;</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;ACTIVE&#39;</span><span class="token punctuation">,</span>
    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span>
    updated_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CURRENT_TIMESTAMP</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 持仓表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> positions <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
    account_id <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    stock_code <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    stock_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    quantity <span class="token keyword">INT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    avg_cost <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    current_price <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    market_value <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    profit_loss <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    profit_loss_pct <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span>
    updated_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span>
    <span class="token keyword">UNIQUE</span> <span class="token keyword">KEY</span> uk_account_stock <span class="token punctuation">(</span>account_id<span class="token punctuation">,</span> stock_code<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 交易记录表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> trades <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
    trade_id <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    account_id <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    stock_code <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    stock_name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    trade_type <span class="token keyword">ENUM</span><span class="token punctuation">(</span><span class="token string">&#39;BUY&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;SELL&#39;</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    quantity <span class="token keyword">INT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    price <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    amount <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    commission <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token number">0.00</span><span class="token punctuation">,</span>
    <span class="token keyword">status</span> <span class="token keyword">ENUM</span><span class="token punctuation">(</span><span class="token string">&#39;PENDING&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;COMPLETED&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;CANCELLED&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;FAILED&#39;</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;PENDING&#39;</span><span class="token punctuation">,</span>
    trade_time <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span>
    updated_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CURRENT_TIMESTAMP</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redis-缓存设计" tabindex="-1"><a class="header-anchor" href="#redis-缓存设计" aria-hidden="true">#</a> Redis 缓存设计</h3><h4 id="缓存策略" tabindex="-1"><a class="header-anchor" href="#缓存策略" aria-hidden="true">#</a> 缓存策略</h4><div class="language-redis line-numbers-mode" data-ext="redis"><pre class="language-redis"><code># 股票实时数据缓存 (TTL: 30秒)
stock:latest:{code} = {
    &quot;code&quot;: &quot;000001.SZ&quot;,
    &quot;price&quot;: 11.40,
    &quot;change&quot;: 0.06,
    &quot;change_pct&quot;: 0.53,
    &quot;volume&quot;: 12847500,
    &quot;timestamp&quot;: &quot;2025-10-17 15:00:00&quot;
}

# 股票历史数据缓存 (TTL: 1小时)
stock:history:{code}:{days} = [
    {&quot;date&quot;: &quot;2025-10-17&quot;, &quot;open&quot;: 11.33, &quot;high&quot;: 11.41, &quot;low&quot;: 11.27, &quot;close&quot;: 11.40, &quot;volume&quot;: 12847500},
    ...
]

# 用户会话缓存 (TTL: 24小时)
session:{user_id} = {
    &quot;user_id&quot;: &quot;123&quot;,
    &quot;username&quot;: &quot;testuser&quot;,
    &quot;role&quot;: &quot;USER&quot;,
    &quot;expires_at&quot;: &quot;2025-10-18 15:00:00&quot;
}

# 市场排行榜缓存 (TTL: 5分钟)
market:ranking:gainers = [
    {&quot;code&quot;: &quot;000001.SZ&quot;, &quot;name&quot;: &quot;平安银行&quot;, &quot;change_pct&quot;: 5.23},
    ...
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🔄-数据流设计" tabindex="-1"><a class="header-anchor" href="#🔄-数据流设计" aria-hidden="true">#</a> 🔄 数据流设计</h2><h3 id="实时数据流" tabindex="-1"><a class="header-anchor" href="#实时数据流" aria-hidden="true">#</a> 实时数据流</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
    AK<span class="token text string">[akshare API]</span> <span class="token arrow operator">--&gt;</span> MDS<span class="token text string">[market-data-service]</span>
    MDS <span class="token arrow operator">--&gt;</span> REDIS<span class="token text string">[Redis缓存]</span>
    MDS <span class="token arrow operator">--&gt;</span> KAFKA<span class="token text string">[Kafka消息队列]</span>

    KAFKA <span class="token arrow operator">--&gt;</span> SS<span class="token text string">[stock-service]</span>
    KAFKA <span class="token arrow operator">--&gt;</span> WS<span class="token text string">[WebSocket推送]</span>

    SS <span class="token arrow operator">--&gt;</span> REDIS
    WS <span class="token arrow operator">--&gt;</span> FE<span class="token text string">[前端实时更新]</span>

    FE <span class="token arrow operator">--&gt;</span> SS<span class="token text string">[定时轮询]</span>
    SS <span class="token arrow operator">--&gt;</span> REDIS<span class="token text string">[缓存查询]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="交易数据流" tabindex="-1"><a class="header-anchor" href="#交易数据流" aria-hidden="true">#</a> 交易数据流</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TD
    FE<span class="token text string">[前端交易请求]</span> <span class="token arrow operator">--&gt;</span> TS<span class="token text string">[trading-service]</span>
    TS <span class="token arrow operator">--&gt;</span> PS<span class="token text string">[价格服务]</span>
    PS <span class="token arrow operator">--&gt;</span> MDS<span class="token text string">[market-data-service]</span>
    MDS <span class="token arrow operator">--&gt;</span> AK<span class="token text string">[akshare实时价格]</span>

    TS <span class="token arrow operator">--&gt;</span> MYSQL<span class="token text string">[交易数据持久化]</span>
    TS <span class="token arrow operator">--&gt;</span> REDIS<span class="token text string">[账户状态缓存]</span>
    TS <span class="token arrow operator">--&gt;</span> FE<span class="token text string">[交易结果返回]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🚀-部署架构" tabindex="-1"><a class="header-anchor" href="#🚀-部署架构" aria-hidden="true">#</a> 🚀 部署架构</h2><h3 id="docker-compose-架构" tabindex="-1"><a class="header-anchor" href="#docker-compose-架构" aria-hidden="true">#</a> Docker Compose 架构</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.8&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token comment"># 前端服务</span>
  <span class="token key atrule">web-frontend</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./web<span class="token punctuation">-</span>frontend
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>3000<span class="token punctuation">:</span><span class="token number">3000</span><span class="token punctuation">]</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>nginx<span class="token punctuation">]</span>

  <span class="token comment"># Nginx反向代理</span>
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>alpine
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token datetime number">80:80</span><span class="token punctuation">,</span> 443<span class="token punctuation">:</span><span class="token number">443</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./nginx/nginx.conf<span class="token punctuation">:</span>/etc/nginx/nginx.conf

  <span class="token comment"># Java微服务</span>
  <span class="token key atrule">user-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./user<span class="token punctuation">-</span>service
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>8081<span class="token punctuation">:</span><span class="token number">8081</span><span class="token punctuation">]</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>mysql<span class="token punctuation">,</span> redis<span class="token punctuation">]</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">SPRING_PROFILES_ACTIVE</span><span class="token punctuation">:</span> docker

  <span class="token key atrule">stock-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./stock<span class="token punctuation">-</span>service
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>8082<span class="token punctuation">:</span><span class="token number">8082</span><span class="token punctuation">]</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>mysql<span class="token punctuation">,</span> redis<span class="token punctuation">,</span> market<span class="token punctuation">-</span>data<span class="token punctuation">-</span>service<span class="token punctuation">]</span>

  <span class="token key atrule">trading-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./trading<span class="token punctuation">-</span>service
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>8083<span class="token punctuation">:</span><span class="token number">8083</span><span class="token punctuation">]</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>mysql<span class="token punctuation">,</span> redis<span class="token punctuation">,</span> stock<span class="token punctuation">-</span>service<span class="token punctuation">]</span>

  <span class="token comment"># Python服务</span>
  <span class="token key atrule">market-data-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./market<span class="token punctuation">-</span>data<span class="token punctuation">-</span>service
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>5001<span class="token punctuation">:</span><span class="token number">5001</span><span class="token punctuation">]</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>redis<span class="token punctuation">,</span> kafka<span class="token punctuation">]</span>

  <span class="token comment"># 数据存储</span>
  <span class="token key atrule">mysql</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">8.0</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>3306<span class="token punctuation">:</span><span class="token number">3306</span><span class="token punctuation">]</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token number">123456</span>
      <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> quant_trading
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mysql_data<span class="token punctuation">:</span>/var/lib/mysql

  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>7<span class="token punctuation">-</span>alpine
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>6379<span class="token punctuation">:</span><span class="token number">6379</span><span class="token punctuation">]</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>requirepass redis123456

  <span class="token comment"># 消息队列</span>
  <span class="token key atrule">kafka</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> confluentinc/cp<span class="token punctuation">-</span>kafka<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>9092<span class="token punctuation">:</span><span class="token number">9092</span><span class="token punctuation">]</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>zookeeper<span class="token punctuation">]</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">KAFKA_ZOOKEEPER_CONNECT</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">:</span><span class="token number">2181</span>
      <span class="token key atrule">KAFKA_ADVERTISED_LISTENERS</span><span class="token punctuation">:</span> PLAINTEXT<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">9092</span>

  <span class="token key atrule">zookeeper</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> confluentinc/cp<span class="token punctuation">-</span>zookeeper<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>2181<span class="token punctuation">:</span><span class="token number">2181</span><span class="token punctuation">]</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">ZOOKEEPER_CLIENT_PORT</span><span class="token punctuation">:</span> <span class="token number">2181</span>

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">mysql_data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生产环境架构" tabindex="-1"><a class="header-anchor" href="#生产环境架构" aria-hidden="true">#</a> 生产环境架构</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TB
    <span class="token keyword">subgraph</span> <span class="token string">&quot;负载均衡层&quot;</span>
        LB<span class="token text string">[Nginx/HAProxy]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;应用层&quot;</span>
        FE1<span class="token text string">[Frontend-1]</span>
        FE2<span class="token text string">[Frontend-2]</span>
        MS1<span class="token text string">[Java Services-1]</span>
        MS2<span class="token text string">[Java Services-2]</span>
        PS1<span class="token text string">[Python Services-1]</span>
        PS2<span class="token text string">[Python Services-2]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;数据层&quot;</span>
        MYSQL_M<span class="token text string">[MySQL Master]</span>
        MYSQL_S<span class="token text string">[MySQL Slave]</span>
        REDIS_M<span class="token text string">[Redis Master]</span>
        REDIS_S<span class="token text string">[Redis Slave]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">subgraph</span> <span class="token string">&quot;监控层&quot;</span>
        PROM<span class="token text string">[Prometheus]</span>
        GRAF<span class="token text string">[Grafana]</span>
        ELK<span class="token text string">[ELK Stack]</span>
    <span class="token keyword">end</span>

    LB <span class="token arrow operator">--&gt;</span> FE1
    LB <span class="token arrow operator">--&gt;</span> FE2
    LB <span class="token arrow operator">--&gt;</span> MS1
    LB <span class="token arrow operator">--&gt;</span> MS2
    LB <span class="token arrow operator">--&gt;</span> PS1
    LB <span class="token arrow operator">--&gt;</span> PS2

    MS1 <span class="token arrow operator">--&gt;</span> MYSQL_M
    MS2 <span class="token arrow operator">--&gt;</span> MYSQL_S
    PS1 <span class="token arrow operator">--&gt;</span> REDIS_M
    PS2 <span class="token arrow operator">--&gt;</span> REDIS_S

    PROM <span class="token arrow operator">--&gt;</span> MS1
    PROM <span class="token arrow operator">--&gt;</span> MS2
    GRAF <span class="token arrow operator">--&gt;</span> PROM
    ELK <span class="token arrow operator">--&gt;</span> MS1
    ELK <span class="token arrow operator">--&gt;</span> MS2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📊-性能与监控" tabindex="-1"><a class="header-anchor" href="#📊-性能与监控" aria-hidden="true">#</a> 📊 性能与监控</h2><h3 id="性能指标" tabindex="-1"><a class="header-anchor" href="#性能指标" aria-hidden="true">#</a> 性能指标</h3><ul><li><strong>响应时间</strong>: API 平均响应时间 &lt; 200ms</li><li><strong>吞吐量</strong>: 支持 1000 QPS 并发请求</li><li><strong>可用性</strong>: 99.9%服务可用性</li><li><strong>缓存命中率</strong>: Redis 缓存命中率 &gt; 95%</li></ul><h3 id="监控指标" tabindex="-1"><a class="header-anchor" href="#监控指标" aria-hidden="true">#</a> 监控指标</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">metrics</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> api_request_duration_seconds
    <span class="token punctuation">-</span> api_request_total
    <span class="token punctuation">-</span> jvm_memory_used_bytes
    <span class="token punctuation">-</span> database_connections_active

  <span class="token key atrule">business</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> trading_orders_total
    <span class="token punctuation">-</span> user_active_sessions
    <span class="token punctuation">-</span> stock_data_refresh_rate
    <span class="token punctuation">-</span> cache_hit_ratio

  <span class="token key atrule">infrastructure</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> cpu_usage_percent
    <span class="token punctuation">-</span> memory_usage_percent
    <span class="token punctuation">-</span> disk_usage_percent
    <span class="token punctuation">-</span> network_io_bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><em>最后更新: 2025-10-17</em><em>架构版本: V2.0 - 微服务 + 虚拟交易</em></p>`,66),i=[p];function o(c,l){return s(),a("div",null,i)}const u=n(t,[["render",o],["__file","ARCHITECTURE.html.vue"]]);export{u as default};
