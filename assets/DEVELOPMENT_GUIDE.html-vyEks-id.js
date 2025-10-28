import{_ as n,o as s,c as a,e as t}from"./app-TClHbORi.js";const e={},p=t(`<h1 id="开发指南" tabindex="-1"><a class="header-anchor" href="#开发指南" aria-hidden="true">#</a> 开发指南</h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>WeQuant 量化交易平台开发指南，涵盖开发环境搭建、代码规范、开发流程、测试策略等完整开发流程。</p><h2 id="🛠️-开发环境搭建" tabindex="-1"><a class="header-anchor" href="#🛠️-开发环境搭建" aria-hidden="true">#</a> 🛠️ 开发环境搭建</h2><h3 id="前置要求" tabindex="-1"><a class="header-anchor" href="#前置要求" aria-hidden="true">#</a> 前置要求</h3><table><thead><tr><th>工具</th><th>版本</th><th>用途</th></tr></thead><tbody><tr><td>Java JDK</td><td>17+</td><td>Java 微服务开发</td></tr><tr><td>Python</td><td>3.9+</td><td>Python 服务开发</td></tr><tr><td>Node.js</td><td>18+</td><td>前端开发</td></tr><tr><td>Maven</td><td>3.8+</td><td>Java 项目构建</td></tr><tr><td>Docker</td><td>20.10+</td><td>容器化开发</td></tr><tr><td>Git</td><td>2.30+</td><td>版本控制</td></tr><tr><td>IDE</td><td>IntelliJ IDEA / VS Code</td><td>开发工具</td></tr></tbody></table><h3 id="_1-克隆项目" tabindex="-1"><a class="header-anchor" href="#_1-克隆项目" aria-hidden="true">#</a> 1. 克隆项目</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/youweichen0208/WeQuant.git
<span class="token builtin class-name">cd</span> WeQuant
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-基础设施启动" tabindex="-1"><a class="header-anchor" href="#_2-基础设施启动" aria-hidden="true">#</a> 2. 基础设施启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动 Docker 基础服务</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> mysql redis kafka zookeeper

<span class="token comment"># 等待服务启动</span>
<span class="token function">sleep</span> <span class="token number">30</span>

<span class="token comment"># 创建 Kafka Topic</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-kafka kafka-topics --bootstrap-server localhost:9092 <span class="token parameter variable">--create</span> <span class="token parameter variable">--topic</span> stock_realtime <span class="token parameter variable">--partitions</span> <span class="token number">3</span> --replication-factor <span class="token number">1</span> --if-not-exists
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-kafka kafka-topics --bootstrap-server localhost:9092 <span class="token parameter variable">--create</span> <span class="token parameter variable">--topic</span> stock_daily <span class="token parameter variable">--partitions</span> <span class="token number">3</span> --replication-factor <span class="token number">1</span> --if-not-exists
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-后端服务启动" tabindex="-1"><a class="header-anchor" href="#_3-后端服务启动" aria-hidden="true">#</a> 3. 后端服务启动</h3><h4 id="python-服务" tabindex="-1"><a class="header-anchor" href="#python-服务" aria-hidden="true">#</a> Python 服务</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 市场数据服务</span>
<span class="token builtin class-name">cd</span> market-data-service
pip3 <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.txt
python3 app.py <span class="token operator">&amp;</span>

<span class="token comment"># 模拟交易服务</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/mock-trading-service
pip3 <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.txt
python3 app.py <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="java-服务" tabindex="-1"><a class="header-anchor" href="#java-服务" aria-hidden="true">#</a> Java 服务</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 股票服务</span>
<span class="token builtin class-name">cd</span> stock-service
mvn spring-boot:run <span class="token operator">&amp;</span>

<span class="token comment"># 用户服务</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/user-service
mvn spring-boot:run <span class="token operator">&amp;</span>

<span class="token comment"># 交易服务</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/trading-service
mvn spring-boot:run <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-前端服务启动" tabindex="-1"><a class="header-anchor" href="#_4-前端服务启动" aria-hidden="true">#</a> 4. 前端服务启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> web-frontend
<span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> run dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-验证环境" tabindex="-1"><a class="header-anchor" href="#_5-验证环境" aria-hidden="true">#</a> 5. 验证环境</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查服务状态</span>
<span class="token function">curl</span> http://localhost:5001/api/health    <span class="token comment"># 市场数据服务</span>
<span class="token function">curl</span> http://localhost:5002/api/health    <span class="token comment"># 模拟交易服务</span>
<span class="token function">curl</span> http://localhost:8082/stock-service/api/health  <span class="token comment"># 股票服务</span>
<span class="token function">curl</span> http://localhost:3003               <span class="token comment"># 前端服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📁-项目结构" tabindex="-1"><a class="header-anchor" href="#📁-项目结构" aria-hidden="true">#</a> 📁 项目结构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WeQuant/
├── docs/                           # 文档
│   ├── api/                        # API 文档
│   ├── architecture/               # 架构文档
│   ├── deployment/                 # 部署文档
│   └── development/                # 开发文档
├── web-frontend/                   # Vue.js 前端
│   ├── src/
│   │   ├── components/             # 公共组件
│   │   ├── views/                  # 页面视图
│   │   ├── store/                  # 状态管理
│   │   ├── api/                    # API 调用层
│   │   └── router/                 # 路由配置
│   ├── public/                     # 静态资源
│   └── tests/                      # 前端测试
├── user-service/                   # Java 用户服务
│   ├── src/main/java/com/quant/user/
│   │   ├── controller/             # 控制器
│   │   ├── service/                # 业务服务
│   │   ├── entity/                 # 实体类
│   │   ├── repository/             # 数据访问
│   │   ├── dto/                    # 数据传输对象
│   │   └── config/                 # 配置类
│   └── src/test/                   # 单元测试
├── stock-service/                  # Java 股票服务
├── trading-service/                # Java 交易服务
├── market-data-service/            # Python 市场数据服务
│   ├── app.py                      # 应用入口
│   ├── services/                   # 业务服务
│   ├── models/                     # 数据模型
│   ├── config/                     # 配置文件
│   └── tests/                      # 单元测试
├── mock-trading-service/           # Python 模拟交易服务
├── database/                       # 数据库脚本
│   ├── migrations/                 # 数据库迁移
│   └── seeds/                      # 测试数据
├── scripts/                        # 构建和部署脚本
├── .github/workflows/              # CI/CD 配置
├── docker-compose.yml              # Docker 编排
└── README.md                       # 项目说明
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🎨-代码规范" tabindex="-1"><a class="header-anchor" href="#🎨-代码规范" aria-hidden="true">#</a> 🎨 代码规范</h2><h3 id="java-代码规范" tabindex="-1"><a class="header-anchor" href="#java-代码规范" aria-hidden="true">#</a> Java 代码规范</h3><h4 id="_1-命名规范" tabindex="-1"><a class="header-anchor" href="#_1-命名规范" aria-hidden="true">#</a> 1. 命名规范</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 类名：大驼峰命名</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StockService</span> <span class="token punctuation">{</span>

    <span class="token comment">// 常量：全大写，下划线分隔</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DEFAULT_MARKET</span> <span class="token operator">=</span> <span class="token string">&quot;SZ&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// 变量和方法：小驼峰命名</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> stockCode<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">StockData</span> <span class="token function">getLatestPrice</span><span class="token punctuation">(</span><span class="token class-name">String</span> stockCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-注释规范" tabindex="-1"><a class="header-anchor" href="#_2-注释规范" aria-hidden="true">#</a> 2. 注释规范</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 股票数据服务
 *
 * <span class="token keyword">@author</span> WeQuant Team
 * <span class="token keyword">@version</span> 1.0
 * <span class="token keyword">@since</span> 2025-10-17
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StockService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 获取股票最新价格
     *
     * <span class="token keyword">@param</span> <span class="token parameter">stockCode</span> 股票代码，格式：000001.SZ
     * <span class="token keyword">@return</span> 股票实时数据
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">StockNotFoundException</span></span> 当股票不存在时抛出
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">StockData</span> <span class="token function">getLatestPrice</span><span class="token punctuation">(</span><span class="token class-name">String</span> stockCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 参数验证</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;股票代码不能为空&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 业务逻辑</span>
        <span class="token keyword">return</span> stockRepository<span class="token punctuation">.</span><span class="token function">findByCode</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-异常处理" tabindex="-1"><a class="header-anchor" href="#_3-异常处理" aria-hidden="true">#</a> 3. 异常处理</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@ControllerAdvice</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GlobalExceptionHandler</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span><span class="token class-name">StockNotFoundException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ErrorResponse</span><span class="token punctuation">&gt;</span></span> <span class="token function">handleStockNotFound</span><span class="token punctuation">(</span><span class="token class-name">StockNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ErrorResponse</span> error <span class="token operator">=</span> <span class="token class-name">ErrorResponse</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">code</span><span class="token punctuation">(</span><span class="token class-name">ErrorCode</span><span class="token punctuation">.</span><span class="token constant">STOCK_NOT_FOUND</span><span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">message</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">timestamp</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">NOT_FOUND</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="python-代码规范" tabindex="-1"><a class="header-anchor" href="#python-代码规范" aria-hidden="true">#</a> Python 代码规范</h3><h4 id="_1-命名规范-1" tabindex="-1"><a class="header-anchor" href="#_1-命名规范-1" aria-hidden="true">#</a> 1. 命名规范</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 常量：全大写，下划线分隔</span>
DEFAULT_CACHE_TTL <span class="token operator">=</span> <span class="token number">300</span>

<span class="token comment"># 类名：大驼峰命名</span>
<span class="token keyword">class</span> <span class="token class-name">MarketDataService</span><span class="token punctuation">:</span>

    <span class="token comment"># 方法和变量：下划线命名</span>
    <span class="token keyword">def</span> <span class="token function">get_stock_price</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> stock_code<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">dict</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;获取股票价格&quot;&quot;&quot;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment"># 私有方法：下划线开头</span>
<span class="token keyword">def</span> <span class="token function">_validate_stock_code</span><span class="token punctuation">(</span>stock_code<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">bool</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;验证股票代码格式&quot;&quot;&quot;</span>
    <span class="token keyword">return</span> <span class="token boolean">True</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-类型注解" tabindex="-1"><a class="header-anchor" href="#_2-类型注解" aria-hidden="true">#</a> 2. 类型注解</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> typing <span class="token keyword">import</span> Dict<span class="token punctuation">,</span> List<span class="token punctuation">,</span> Optional
<span class="token keyword">from</span> datetime <span class="token keyword">import</span> datetime

<span class="token keyword">class</span> <span class="token class-name">StockData</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> code<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> price<span class="token punctuation">:</span> <span class="token builtin">float</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>code <span class="token operator">=</span> code
        self<span class="token punctuation">.</span>name <span class="token operator">=</span> name
        self<span class="token punctuation">.</span>price <span class="token operator">=</span> price

<span class="token keyword">def</span> <span class="token function">get_stock_history</span><span class="token punctuation">(</span>
    stock_code<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
    days<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">30</span>
<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> List<span class="token punctuation">[</span>Dict<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    获取股票历史数据

    Args:
        stock_code: 股票代码
        days: 天数，默认30天

    Returns:
        历史数据列表

    Raises:
        ValueError: 当股票代码格式错误时
    &quot;&quot;&quot;</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vue-js-代码规范" tabindex="-1"><a class="header-anchor" href="#vue-js-代码规范" aria-hidden="true">#</a> Vue.js 代码规范</h3><h4 id="_1-组件命名" tabindex="-1"><a class="header-anchor" href="#_1-组件命名" aria-hidden="true">#</a> 1. 组件命名</h4><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- StockHistoryChart.vue --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stock-history-chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 组件内容 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// 使用 Composition API</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> computed<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token comment">// 响应式数据</span>
<span class="token keyword">const</span> stockData <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> isLoading <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>

<span class="token comment">// 计算属性</span>
<span class="token keyword">const</span> chartOptions <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token comment">// ECharts 配置</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 生命周期</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">loadStockData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 方法</span>
<span class="token keyword">const</span> <span class="token function-variable function">loadStockData</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  isLoading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 数据加载逻辑</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;加载数据失败:&#39;</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    isLoading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.stock-history-chart</span> <span class="token punctuation">{</span>
  <span class="token comment">/* 样式定义 */</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-api-调用" tabindex="-1"><a class="header-anchor" href="#_2-api-调用" aria-hidden="true">#</a> 2. API 调用</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// api/stock.js</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>

<span class="token keyword">const</span> stockApi <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取股票最新价格</span>
  <span class="token keyword">async</span> <span class="token function">getLatestPrice</span><span class="token punctuation">(</span><span class="token parameter">stockCode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/api/stocks/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>stockCode<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/latest</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> response<span class="token punctuation">.</span>data
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;获取股价失败:&#39;</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>
      <span class="token keyword">throw</span> error
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// 获取历史数据</span>
  <span class="token keyword">async</span> <span class="token function">getHistory</span><span class="token punctuation">(</span><span class="token parameter">stockCode<span class="token punctuation">,</span> days <span class="token operator">=</span> <span class="token number">30</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/api/stocks/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>stockCode<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/history</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span> days <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> response<span class="token punctuation">.</span>data
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;获取历史数据失败:&#39;</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>
      <span class="token keyword">throw</span> error
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> stockApi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🔄-开发流程" tabindex="-1"><a class="header-anchor" href="#🔄-开发流程" aria-hidden="true">#</a> 🔄 开发流程</h2><h3 id="git-工作流" tabindex="-1"><a class="header-anchor" href="#git-工作流" aria-hidden="true">#</a> Git 工作流</h3><h4 id="_1-分支策略" tabindex="-1"><a class="header-anchor" href="#_1-分支策略" aria-hidden="true">#</a> 1. 分支策略</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 主分支</span>
main          <span class="token comment"># 生产环境代码</span>
develop       <span class="token comment"># 开发分支</span>

<span class="token comment"># 功能分支</span>
feature/user-authentication
feature/stock-chart-enhancement
feature/trading-simulation

<span class="token comment"># 修复分支</span>
hotfix/critical-bug-fix
bugfix/minor-issue-fix

<span class="token comment"># 发布分支</span>
release/v1.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-提交规范" tabindex="-1"><a class="header-anchor" href="#_2-提交规范" aria-hidden="true">#</a> 2. 提交规范</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 提交类型</span>
feat:     新功能
fix:      修复 bug
docs:     文档更新
style:    代码格式调整
refactor: 代码重构
test:     测试相关
chore:    构建过程或辅助工具变动

<span class="token comment"># 提交示例</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 添加股票搜索自动补全功能

- 实现股票代码和名称的模糊搜索
- 添加热门股票快捷选择
- 优化搜索性能，添加防抖处理

Closes #123&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-代码审查" tabindex="-1"><a class="header-anchor" href="#_3-代码审查" aria-hidden="true">#</a> 3. 代码审查</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建 Pull Request</span>
<span class="token number">1</span>. 推送功能分支到远程仓库
<span class="token number">2</span>. 在 GitHub 创建 Pull Request
<span class="token number">3</span>. 填写详细的变更说明
<span class="token number">4</span>. 指定审查者
<span class="token number">5</span>. 通过 CI 检查
<span class="token number">6</span>. 获得批准后合并
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="开发流程" tabindex="-1"><a class="header-anchor" href="#开发流程" aria-hidden="true">#</a> 开发流程</h3><h4 id="_1-需求分析" tabindex="-1"><a class="header-anchor" href="#_1-需求分析" aria-hidden="true">#</a> 1. 需求分析</h4><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">##</span> 功能需求：股票搜索优化</span>

<span class="token title important"><span class="token punctuation">###</span> 背景</span>
当前股票搜索功能体验不佳，用户需要输入完整的股票代码才能查找。

<span class="token title important"><span class="token punctuation">###</span> 需求描述</span>
<span class="token list punctuation">-</span> 支持股票代码和名称的模糊搜索
<span class="token list punctuation">-</span> 提供搜索建议和自动补全
<span class="token list punctuation">-</span> 添加热门股票快速选择
<span class="token list punctuation">-</span> 优化搜索性能

<span class="token title important"><span class="token punctuation">###</span> 验收标准</span>
<span class="token list punctuation">-</span> [ ] 输入2个字符即开始搜索建议
<span class="token list punctuation">-</span> [ ] 搜索结果在500ms内返回
<span class="token list punctuation">-</span> [ ] 支持拼音首字母搜索
<span class="token list punctuation">-</span> [ ] 移动端友好的交互体验
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-技术设计" tabindex="-1"><a class="header-anchor" href="#_2-技术设计" aria-hidden="true">#</a> 2. 技术设计</h4><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">##</span> 技术设计：股票搜索优化</span>

<span class="token title important"><span class="token punctuation">###</span> 架构设计</span>
<span class="token list punctuation">-</span> 前端：Vue 组件 + 防抖处理
<span class="token list punctuation">-</span> 后端：股票服务增加搜索 API
<span class="token list punctuation">-</span> 缓存：Redis 缓存热门搜索结果

<span class="token title important"><span class="token punctuation">###</span> API 设计</span>
GET /api/v1/stocks/search?q={keyword}&amp;limit={limit}

<span class="token title important"><span class="token punctuation">###</span> 数据库设计</span>
<span class="token list punctuation">-</span> 新增股票搜索索引表
<span class="token list punctuation">-</span> 支持拼音搜索字段

<span class="token title important"><span class="token punctuation">###</span> 性能优化</span>
<span class="token list punctuation">-</span> 客户端防抖 300ms
<span class="token list punctuation">-</span> 服务端缓存热门结果
<span class="token list punctuation">-</span> 数据库全文索引
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-开发实现" tabindex="-1"><a class="header-anchor" href="#_3-开发实现" aria-hidden="true">#</a> 3. 开发实现</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建功能分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/stock-search-enhancement

<span class="token comment"># 2. 后端开发</span>
<span class="token builtin class-name">cd</span> stock-service
<span class="token comment"># 实现搜索 API</span>

<span class="token comment"># 3. 前端开发</span>
<span class="token builtin class-name">cd</span> web-frontend
<span class="token comment"># 实现搜索组件</span>

<span class="token comment"># 4. 测试验证</span>
<span class="token function">npm</span> run <span class="token builtin class-name">test</span>
mvn <span class="token builtin class-name">test</span>

<span class="token comment"># 5. 提交代码</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 优化股票搜索功能&quot;</span>
<span class="token function">git</span> push origin feature/stock-search-enhancement
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🧪-测试策略" tabindex="-1"><a class="header-anchor" href="#🧪-测试策略" aria-hidden="true">#</a> 🧪 测试策略</h2><h3 id="单元测试" tabindex="-1"><a class="header-anchor" href="#单元测试" aria-hidden="true">#</a> 单元测试</h3><h4 id="java-单元测试" tabindex="-1"><a class="header-anchor" href="#java-单元测试" aria-hidden="true">#</a> Java 单元测试</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">MockitoExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">StockServiceTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Mock</span>
    <span class="token keyword">private</span> <span class="token class-name">StockRepository</span> stockRepository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Mock</span>
    <span class="token keyword">private</span> <span class="token class-name">MarketDataService</span> marketDataService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@InjectMocks</span>
    <span class="token keyword">private</span> <span class="token class-name">StockService</span> stockService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@DisplayName</span><span class="token punctuation">(</span><span class="token string">&quot;获取股票最新价格 - 成功场景&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">testGetLatestPrice_Success</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Given</span>
        <span class="token class-name">String</span> stockCode <span class="token operator">=</span> <span class="token string">&quot;000001.SZ&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">StockData</span> expectedData <span class="token operator">=</span> <span class="token class-name">StockData</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">code</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;平安银行&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">price</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">11.40</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">when</span><span class="token punctuation">(</span>marketDataService<span class="token punctuation">.</span><span class="token function">getLatestPrice</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span>expectedData<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// When</span>
        <span class="token class-name">StockData</span> result <span class="token operator">=</span> stockService<span class="token punctuation">.</span><span class="token function">getLatestPrice</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Then</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertThat</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">11.40</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@DisplayName</span><span class="token punctuation">(</span><span class="token string">&quot;获取股票最新价格 - 股票不存在&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">testGetLatestPrice_StockNotFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Given</span>
        <span class="token class-name">String</span> stockCode <span class="token operator">=</span> <span class="token string">&quot;999999.SZ&quot;</span><span class="token punctuation">;</span>
        <span class="token function">when</span><span class="token punctuation">(</span>marketDataService<span class="token punctuation">.</span><span class="token function">getLatestPrice</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">thenThrow</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StockNotFoundException</span><span class="token punctuation">(</span><span class="token string">&quot;股票不存在&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// When &amp; Then</span>
        <span class="token function">assertThatThrownBy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> stockService<span class="token punctuation">.</span><span class="token function">getLatestPrice</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">isInstanceOf</span><span class="token punctuation">(</span><span class="token class-name">StockNotFoundException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">hasMessage</span><span class="token punctuation">(</span><span class="token string">&quot;股票不存在&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="python-单元测试" tabindex="-1"><a class="header-anchor" href="#python-单元测试" aria-hidden="true">#</a> Python 单元测试</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pytest
<span class="token keyword">from</span> unittest<span class="token punctuation">.</span>mock <span class="token keyword">import</span> Mock<span class="token punctuation">,</span> patch
<span class="token keyword">from</span> services<span class="token punctuation">.</span>market_data_service <span class="token keyword">import</span> MarketDataService

<span class="token keyword">class</span> <span class="token class-name">TestMarketDataService</span><span class="token punctuation">:</span>

    <span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>fixture</span>
    <span class="token keyword">def</span> <span class="token function">service</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> MarketDataService<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@patch</span><span class="token punctuation">(</span><span class="token string">&#39;services.akshare_service.get_real_time_data&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">test_get_stock_price_success</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> mock_akshare<span class="token punctuation">,</span> service<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># Given</span>
        stock_code <span class="token operator">=</span> <span class="token string">&quot;000001.SZ&quot;</span>
        mock_data <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token string">&#39;code&#39;</span><span class="token punctuation">:</span> stock_code<span class="token punctuation">,</span>
            <span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;平安银行&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;price&#39;</span><span class="token punctuation">:</span> <span class="token number">11.40</span><span class="token punctuation">,</span>
            <span class="token string">&#39;change_pct&#39;</span><span class="token punctuation">:</span> <span class="token number">0.53</span>
        <span class="token punctuation">}</span>
        mock_akshare<span class="token punctuation">.</span>return_value <span class="token operator">=</span> mock_data

        <span class="token comment"># When</span>
        result <span class="token operator">=</span> service<span class="token punctuation">.</span>get_stock_price<span class="token punctuation">(</span>stock_code<span class="token punctuation">)</span>

        <span class="token comment"># Then</span>
        <span class="token keyword">assert</span> result <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span>
        <span class="token keyword">assert</span> result<span class="token punctuation">[</span><span class="token string">&#39;code&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> stock_code
        <span class="token keyword">assert</span> result<span class="token punctuation">[</span><span class="token string">&#39;price&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">11.40</span>
        mock_akshare<span class="token punctuation">.</span>assert_called_once_with<span class="token punctuation">(</span>stock_code<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">test_get_stock_price_invalid_code</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> service<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># Given</span>
        invalid_code <span class="token operator">=</span> <span class="token string">&quot;invalid&quot;</span>

        <span class="token comment"># When &amp; Then</span>
        <span class="token keyword">with</span> pytest<span class="token punctuation">.</span>raises<span class="token punctuation">(</span>ValueError<span class="token punctuation">,</span> <span class="token keyword">match</span><span class="token operator">=</span><span class="token string">&quot;无效的股票代码&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            service<span class="token punctuation">.</span>get_stock_price<span class="token punctuation">(</span>invalid_code<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vue-组件测试" tabindex="-1"><a class="header-anchor" href="#vue-组件测试" aria-hidden="true">#</a> Vue 组件测试</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> describe<span class="token punctuation">,</span> it<span class="token punctuation">,</span> expect<span class="token punctuation">,</span> vi <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vitest&#39;</span>
<span class="token keyword">import</span> StockSearch <span class="token keyword">from</span> <span class="token string">&#39;@/components/StockSearch.vue&#39;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;StockSearch&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;渲染搜索输入框&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>StockSearch<span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;input[type=&quot;text&quot;]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;.search-suggestions&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;输入关键词显示搜索建议&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> mockSearchApi <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mockResolvedValue</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token string">&#39;000001.SZ&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;平安银行&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>StockSearch<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">mocks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">$api</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">searchStocks</span><span class="token operator">:</span> mockSearchApi <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> input <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> input<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token string">&#39;平安&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span>vm<span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>mockSearchApi<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span><span class="token string">&#39;平安&#39;</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;.search-suggestions&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集成测试" tabindex="-1"><a class="header-anchor" href="#集成测试" aria-hidden="true">#</a> 集成测试</h3><h4 id="api-集成测试" tabindex="-1"><a class="header-anchor" href="#api-集成测试" aria-hidden="true">#</a> API 集成测试</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>webEnvironment <span class="token operator">=</span> <span class="token class-name">SpringBootTest<span class="token punctuation">.</span>WebEnvironment</span><span class="token punctuation">.</span><span class="token constant">RANDOM_PORT</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@AutoConfigureMockMvc</span>
<span class="token keyword">class</span> <span class="token class-name">StockControllerIntegrationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">MockMvc</span> mockMvc<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@DisplayName</span><span class="token punctuation">(</span><span class="token string">&quot;获取股票最新价格 API 测试&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">testGetLatestPriceApi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> stockCode <span class="token operator">=</span> <span class="token string">&quot;000001.SZ&quot;</span><span class="token punctuation">;</span>

        mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/api/v1/stocks/{code}/latest&quot;</span><span class="token punctuation">,</span> stockCode<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">content</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">jsonPath</span><span class="token punctuation">(</span><span class="token string">&quot;$.success&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">jsonPath</span><span class="token punctuation">(</span><span class="token string">&quot;$.data.code&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token function">jsonPath</span><span class="token punctuation">(</span><span class="token string">&quot;$.data.price&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="端到端测试" tabindex="-1"><a class="header-anchor" href="#端到端测试" aria-hidden="true">#</a> 端到端测试</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// e2e/stock-search.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> test<span class="token punctuation">,</span> expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@playwright/test&#39;</span>

test<span class="token punctuation">.</span><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;股票搜索功能&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;用户可以搜索并选择股票&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> page <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 访问首页</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">goto</span><span class="token punctuation">(</span><span class="token string">&#39;http://localhost:3003&#39;</span><span class="token punctuation">)</span>

    <span class="token comment">// 点击搜索框</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token string">&#39;[data-testid=&quot;stock-search-input&quot;]&#39;</span><span class="token punctuation">)</span>

    <span class="token comment">// 输入搜索关键词</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token string">&#39;[data-testid=&quot;stock-search-input&quot;]&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;平安&#39;</span><span class="token punctuation">)</span>

    <span class="token comment">// 等待搜索建议出现</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">waitForSelector</span><span class="token punctuation">(</span><span class="token string">&#39;[data-testid=&quot;search-suggestions&quot;]&#39;</span><span class="token punctuation">)</span>

    <span class="token comment">// 选择第一个建议</span>
    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token string">&#39;[data-testid=&quot;suggestion-item&quot;]:first-child&#39;</span><span class="token punctuation">)</span>

    <span class="token comment">// 验证股票被选中</span>
    <span class="token keyword">await</span> <span class="token function">expect</span><span class="token punctuation">(</span>page<span class="token punctuation">.</span><span class="token function">locator</span><span class="token punctuation">(</span><span class="token string">&#39;[data-testid=&quot;selected-stock&quot;]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContainText</span><span class="token punctuation">(</span><span class="token string">&#39;000001.SZ&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🔧-开发工具配置" tabindex="-1"><a class="header-anchor" href="#🔧-开发工具配置" aria-hidden="true">#</a> 🔧 开发工具配置</h2><h3 id="ide-配置" tabindex="-1"><a class="header-anchor" href="#ide-配置" aria-hidden="true">#</a> IDE 配置</h3><h4 id="intellij-idea" tabindex="-1"><a class="header-anchor" href="#intellij-idea" aria-hidden="true">#</a> IntelliJ IDEA</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- .idea/checkstyle-idea.xml --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CheckStyle-IDEA</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>configuration<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>map</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>entry</span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkstyle-version<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>8.45<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>entry</span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>copy-libs<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>entry</span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>location-0<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>BUNDLED:(bundled):Sun Checks<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>map</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CheckStyle-IDEA</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vs-code" tabindex="-1"><a class="header-anchor" href="#vs-code" aria-hidden="true">#</a> VS Code</h4><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// .vscode/settings.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;editor.formatOnSave&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;editor.codeActionsOnSave&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;source.fixAll.eslint&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;eslint.validate&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;javascript&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;javascriptreact&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;typescript&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;vue&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;vetur.validation.template&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;java.configuration.updateBuildConfiguration&quot;</span><span class="token operator">:</span> <span class="token string">&quot;interactive&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;java.saveActions.organizeImports&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码质量工具" tabindex="-1"><a class="header-anchor" href="#代码质量工具" aria-hidden="true">#</a> 代码质量工具</h3><h4 id="eslint-配置" tabindex="-1"><a class="header-anchor" href="#eslint-配置" aria-hidden="true">#</a> ESLint 配置</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .eslintrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;eslint:recommended&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;@vue/typescript/recommended&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;prettier&#39;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">&#39;latest&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&#39;@typescript-eslint/parser&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">&#39;module&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;vue&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;@typescript-eslint&#39;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;vue/multi-word-component-names&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;@typescript-eslint/no-unused-vars&#39;</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;prefer-const&#39;</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;no-console&#39;</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;warn&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;off&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="prettier-配置" tabindex="-1"><a class="header-anchor" href="#prettier-配置" aria-hidden="true">#</a> Prettier 配置</h4><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// .prettierrc</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;semi&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;singleQuote&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;tabWidth&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;trailingComma&quot;</span><span class="token operator">:</span> <span class="token string">&quot;es5&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;printWidth&quot;</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token property">&quot;bracketSpacing&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;arrowParens&quot;</span><span class="token operator">:</span> <span class="token string">&quot;avoid&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="checkstyle-配置" tabindex="-1"><a class="header-anchor" href="#checkstyle-配置" aria-hidden="true">#</a> Checkstyle 配置</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- checkstyle.xml --&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">module</span> <span class="token name">PUBLIC</span>
    <span class="token string">&quot;-//Puppy Crawl//DTD Check Configuration 1.3//EN&quot;</span>
    <span class="token string">&quot;http://www.puppycrawl.com/dtds/configuration_1_3.dtd&quot;</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Checker<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>charset<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>severity<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>warning<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>TreeWalker<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>NeedBraces<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>LeftCurly<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>RightCurly<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>WhitespaceAfter<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>module</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>WhitespaceAround<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>module</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>module</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📚-开发最佳实践" tabindex="-1"><a class="header-anchor" href="#📚-开发最佳实践" aria-hidden="true">#</a> 📚 开发最佳实践</h2><h3 id="_1-性能优化" tabindex="-1"><a class="header-anchor" href="#_1-性能优化" aria-hidden="true">#</a> 1. 性能优化</h3><h4 id="前端优化" tabindex="-1"><a class="header-anchor" href="#前端优化" aria-hidden="true">#</a> 前端优化</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用 computed 而不是 methods</span>
<span class="token keyword">const</span> expensiveValue <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">heavyCalculation</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 使用 v-memo 优化列表渲染</span>
<span class="token operator">&lt;</span>div v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;item in list&quot;</span> <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">&quot;item.id&quot;</span> v<span class="token operator">-</span>memo<span class="token operator">=</span><span class="token string">&quot;[item.id, item.name]&quot;</span><span class="token operator">&gt;</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span> item<span class="token punctuation">.</span>name <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token comment">// 组件懒加载</span>
<span class="token keyword">const</span> StockChart <span class="token operator">=</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./StockChart.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="后端优化" tabindex="-1"><a class="header-anchor" href="#后端优化" aria-hidden="true">#</a> 后端优化</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 使用缓存</span>
<span class="token annotation punctuation">@Cacheable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;stockPrice&quot;</span><span class="token punctuation">,</span> key <span class="token operator">=</span> <span class="token string">&quot;#stockCode&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">StockData</span> <span class="token function">getLatestPrice</span><span class="token punctuation">(</span><span class="token class-name">String</span> stockCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> marketDataService<span class="token punctuation">.</span><span class="token function">getLatestPrice</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 批量操作</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updatePositions</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Position</span><span class="token punctuation">&gt;</span></span> positions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    positionRepository<span class="token punctuation">.</span><span class="token function">saveAll</span><span class="token punctuation">(</span>positions<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 异步处理</span>
<span class="token annotation punctuation">@Async</span>
<span class="token keyword">public</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span> <span class="token function">processLargeDataSet</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">StockData</span><span class="token punctuation">&gt;</span></span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理逻辑</span>
    <span class="token keyword">return</span> <span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span><span class="token function">completedFuture</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-安全最佳实践" tabindex="-1"><a class="header-anchor" href="#_2-安全最佳实践" aria-hidden="true">#</a> 2. 安全最佳实践</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 输入验证</span>
<span class="token annotation punctuation">@Valid</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">StockData</span><span class="token punctuation">&gt;</span></span> <span class="token function">getStock</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token annotation punctuation">@Pattern</span><span class="token punctuation">(</span>regexp <span class="token operator">=</span> <span class="token string">&quot;\\\\d{6}\\\\.(SZ|SH)&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> stockCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>stockService<span class="token punctuation">.</span><span class="token function">getLatestPrice</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// SQL 注入防护</span>
<span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT s FROM Stock s WHERE s.code = :code&quot;</span><span class="token punctuation">)</span>
<span class="token class-name">Stock</span> <span class="token function">findByCode</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;code&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 敏感信息脱敏</span>
<span class="token annotation punctuation">@JsonIgnore</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-错误处理" tabindex="-1"><a class="header-anchor" href="#_3-错误处理" aria-hidden="true">#</a> 3. 错误处理</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 前端错误处理</span>
<span class="token keyword">const</span> <span class="token function-variable function">handleApiError</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token operator">?.</span>status <span class="token operator">===</span> <span class="token number">401</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 重定向到登录页</span>
    router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token operator">?.</span>status <span class="token operator">&gt;=</span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 显示系统错误</span>
    ElMessage<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;系统错误，请稍后重试&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 显示具体错误信息</span>
    ElMessage<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token operator">?.</span>data<span class="token operator">?.</span>message <span class="token operator">||</span> <span class="token string">&#39;操作失败&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-日志记录" tabindex="-1"><a class="header-anchor" href="#_4-日志记录" aria-hidden="true">#</a> 4. 日志记录</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 结构化日志</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StockService</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">StockData</span> <span class="token function">getLatestPrice</span><span class="token punctuation">(</span><span class="token class-name">String</span> stockCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;获取股票价格开始, stockCode={}&quot;</span><span class="token punctuation">,</span> stockCode<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">StockData</span> result <span class="token operator">=</span> marketDataService<span class="token punctuation">.</span><span class="token function">getLatestPrice</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;获取股票价格成功, stockCode={}, price={}&quot;</span><span class="token punctuation">,</span> stockCode<span class="token punctuation">,</span> result<span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;获取股票价格失败, stockCode={}, error={}&quot;</span><span class="token punctuation">,</span> stockCode<span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🚀-部署和发布" tabindex="-1"><a class="header-anchor" href="#🚀-部署和发布" aria-hidden="true">#</a> 🚀 部署和发布</h2><h3 id="本地构建" tabindex="-1"><a class="header-anchor" href="#本地构建" aria-hidden="true">#</a> 本地构建</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 前端构建</span>
<span class="token builtin class-name">cd</span> web-frontend
<span class="token function">npm</span> run build

<span class="token comment"># Java 服务构建</span>
<span class="token builtin class-name">cd</span> stock-service
mvn clean package <span class="token parameter variable">-DskipTests</span>

<span class="token comment"># Docker 镜像构建</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> stock-service:latest <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ci-cd-流水线" tabindex="-1"><a class="header-anchor" href="#ci-cd-流水线" aria-hidden="true">#</a> CI/CD 流水线</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># .github/workflows/ci.yml</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> CI/CD Pipeline

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main<span class="token punctuation">,</span> develop <span class="token punctuation">]</span>
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">test</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Set up JDK 17
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>java@v3
      <span class="token key atrule">with</span><span class="token punctuation">:</span>
        <span class="token key atrule">java-version</span><span class="token punctuation">:</span> <span class="token string">&#39;17&#39;</span>
        <span class="token key atrule">distribution</span><span class="token punctuation">:</span> <span class="token string">&#39;temurin&#39;</span>

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Set up Node.js
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
      <span class="token key atrule">with</span><span class="token punctuation">:</span>
        <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&#39;18&#39;</span>

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run Java tests
      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
        cd stock-service
        mvn test</span>

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run frontend tests
      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
        cd web-frontend
        npm ci
        npm run test</span>

  <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
    <span class="token key atrule">needs</span><span class="token punctuation">:</span> test
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">if</span><span class="token punctuation">:</span> github.ref == &#39;refs/heads/main&#39;

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to production
      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
        # 部署脚本
        echo &quot;Deploying to production...&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📋-开发清单" tabindex="-1"><a class="header-anchor" href="#📋-开发清单" aria-hidden="true">#</a> 📋 开发清单</h2><h3 id="功能开发清单" tabindex="-1"><a class="header-anchor" href="#功能开发清单" aria-hidden="true">#</a> 功能开发清单</h3><ul><li>[ ] 需求分析和技术设计</li><li>[ ] 创建功能分支</li><li>[ ] 后端 API 开发</li><li>[ ] 前端界面开发</li><li>[ ] 单元测试编写</li><li>[ ] 集成测试验证</li><li>[ ] 代码审查</li><li>[ ] 文档更新</li><li>[ ] 部署测试环境</li><li>[ ] 用户验收测试</li></ul><h3 id="代码质量清单" tabindex="-1"><a class="header-anchor" href="#代码质量清单" aria-hidden="true">#</a> 代码质量清单</h3><ul><li>[ ] 代码符合团队规范</li><li>[ ] 测试覆盖率 &gt; 80%</li><li>[ ] 无严重安全漏洞</li><li>[ ] 性能满足要求</li><li>[ ] 日志记录完整</li><li>[ ] 错误处理健壮</li><li>[ ] 文档齐全</li></ul><hr><p><em>最后更新: 2025-10-17</em><em>开发指南版本: v1.0</em></p>`,112),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","DEVELOPMENT_GUIDE.html.vue"]]);export{r as default};
