import{_ as c,r as d,o as r,c as o,a as n,d as a,w as i,b as e,e as t}from"./app-5333XDSd.js";const u={},v=t(`<h1 id="claude-md-项目配置完全指南" tabindex="-1"><a class="header-anchor" href="#claude-md-项目配置完全指南" aria-hidden="true">#</a> Claude.md 项目配置完全指南</h1><h2 id="📖-什么是-claude-md" tabindex="-1"><a class="header-anchor" href="#📖-什么是-claude-md" aria-hidden="true">#</a> 📖 什么是 claude.md？</h2><p><code>.claude/claude.md</code> 是 <strong>Claude Code CLI 的项目级上下文配置文件</strong>，用于：</p><ul><li>✅ 定义项目规范和编码标准</li><li>✅ 配置构建工具命令（Maven/Gradle/npm等）</li><li>✅ 提供项目架构和目录说明</li><li>✅ 设置开发工作流和最佳实践</li><li>✅ <strong>每次对话自动加载，无需重复说明</strong></li></ul><h2 id="🎯-核心优势" tabindex="-1"><a class="header-anchor" href="#🎯-核心优势" aria-hidden="true">#</a> 🎯 核心优势</h2><table><thead><tr><th>对比项</th><th>不使用 claude.md</th><th>使用 claude.md</th></tr></thead><tbody><tr><td>项目规范</td><td>❌ 每次都要重复说明</td><td>✅ 自动遵循规范</td></tr><tr><td>构建命令</td><td>❌ 可能用错命令</td><td>✅ 使用正确的构建流程</td></tr><tr><td>代码风格</td><td>❌ 不一致</td><td>✅ 统一规范</td></tr><tr><td>团队协作</td><td>❌ 个人经验</td><td>✅ 团队共识</td></tr></tbody></table><h2 id="📂-文件位置" tabindex="-1"><a class="header-anchor" href="#📂-文件位置" aria-hidden="true">#</a> 📂 文件位置</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>your-project/
├── .claude/
│   ├── claude.md          # 项目上下文（主要配置）
│   └── settings.json      # CLI 设置（钩子、环境变量等）
├── src/
└── pom.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🚀-快速开始" tabindex="-1"><a class="header-anchor" href="#🚀-快速开始" aria-hidden="true">#</a> 🚀 快速开始</h2><h3 id="创建基础-claude-md" tabindex="-1"><a class="header-anchor" href="#创建基础-claude-md" aria-hidden="true">#</a> 创建基础 claude.md</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建 .claude 目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> .claude

<span class="token comment"># 创建 claude.md</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> .claude/claude.md <span class="token operator">&lt;&lt;</span> <span class="token string">&#39;EOF&#39;</span>
<span class="token comment"># 项目名称</span>

简短的项目描述（1-2句话）

<span class="token comment">## 技术栈</span>

- Java <span class="token number">17</span>
- Spring Boot <span class="token number">3.2</span>
- Maven <span class="token number">3.9</span>
- MySQL <span class="token number">8.0</span>

<span class="token comment">## 构建命令</span>

**编译项目：**
\`\`\`bash
mvn clean compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行测试：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mvn <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>打包：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mvn clean package <span class="token parameter variable">-DskipTests</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="代码规范" tabindex="-1"><a class="header-anchor" href="#代码规范" aria-hidden="true">#</a> 代码规范</h2><ul><li>使用 4 空格缩进</li><li>类名使用大驼峰命名</li><li>方法名使用小驼峰命名 EOF</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
### 验证配置

\`\`\`bash
# 启动 Claude CLI，它会自动读取 claude.md
claude &quot;帮我编译项目&quot;

# Claude 会根据 claude.md 中的构建命令自动执行：
# mvn clean compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📋-完整的-claude-md-模板" tabindex="-1"><a class="header-anchor" href="#📋-完整的-claude-md-模板" aria-hidden="true">#</a> 📋 完整的 claude.md 模板</h2><h3 id="maven-项目示例" tabindex="-1"><a class="header-anchor" href="#maven-项目示例" aria-hidden="true">#</a> Maven 项目示例</h3><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> WeQuant 量化交易平台</span>

基于 Spring Boot 的分布式量化交易系统，包含股票数据采集、策略回测、实时交易等功能。

<span class="token title important"><span class="token punctuation">##</span> 项目信息</span>

<span class="token list punctuation">-</span> <span class="token bold"><span class="token punctuation">**</span><span class="token content">仓库：</span><span class="token punctuation">**</span></span> https://github.com/youweichen/quant-trading-platform
<span class="token list punctuation">-</span> <span class="token bold"><span class="token punctuation">**</span><span class="token content">技术栈：</span><span class="token punctuation">**</span></span> Java 17, Spring Boot 3.2, MySQL 8.0, Redis, Kafka
<span class="token list punctuation">-</span> <span class="token bold"><span class="token punctuation">**</span><span class="token content">包管理：</span><span class="token punctuation">**</span></span> Maven 3.9.x
<span class="token list punctuation">-</span> <span class="token bold"><span class="token punctuation">**</span><span class="token content">JDK 版本：</span><span class="token punctuation">**</span></span> Java 17 (Temurin)

<span class="token title important"><span class="token punctuation">##</span> 🏗️ 项目结构</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>quant-trading-platform/ ├── stock-service/ # 股票数据服务 ├── trading-service/ # 交易策略服务 ├── scheduler-service/ # 定时调度服务 ├── common/ # 公共模块 └── frontend/ # 前端项目（Vue 3）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
## 🛠️ 构建命令

### Maven 命令规范

**⚠️ 重要：本项目使用 Maven Wrapper，必须使用 \`./mvnw\` 而不是 \`mvn\`**

**编译整个项目：**
\`\`\`bash
./mvnw clean compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译单个模块：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./mvnw clean compile <span class="token parameter variable">-pl</span> stock-service <span class="token parameter variable">-am</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>运行测试：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 运行所有测试</span>
./mvnw <span class="token builtin class-name">test</span>

<span class="token comment"># 跳过测试</span>
./mvnw clean <span class="token function">install</span> <span class="token parameter variable">-DskipTests</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>打包部署：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打包所有模块</span>
./mvnw clean package <span class="token parameter variable">-DskipTests</span>

<span class="token comment"># 打包单个服务</span>
./mvnw clean package <span class="token parameter variable">-pl</span> trading-service <span class="token parameter variable">-am</span> <span class="token parameter variable">-DskipTests</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>依赖管理：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看依赖树</span>
./mvnw dependency:tree

<span class="token comment"># 更新依赖</span>
./mvnw versions:use-latest-releases
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>本地安装：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./mvnw clean <span class="token function">install</span> <span class="token parameter variable">-DskipTests</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="🚀-运行服务" tabindex="-1"><a class="header-anchor" href="#🚀-运行服务" aria-hidden="true">#</a> 🚀 运行服务</h2><h3 id="后端服务" tabindex="-1"><a class="header-anchor" href="#后端服务" aria-hidden="true">#</a> 后端服务</h3><p><strong>Stock Service（端口 8082）：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> stock-service
./mvnw spring-boot:run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Trading Service（端口 8083）：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> trading-service
./mvnw spring-boot:run -Dspring-boot.run.profiles<span class="token operator">=</span>dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Scheduler Service（端口 8085）：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> scheduler-service
./mvnw spring-boot:run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="前端项目" tabindex="-1"><a class="header-anchor" href="#前端项目" aria-hidden="true">#</a> 前端项目</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> frontend
<span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> run dev  <span class="token comment"># 开发模式（http://localhost:5173）</span>
<span class="token function">npm</span> run build  <span class="token comment"># 生产构建</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📝-代码规范" tabindex="-1"><a class="header-anchor" href="#📝-代码规范" aria-hidden="true">#</a> 📝 代码规范</h2><h3 id="java-代码风格" tabindex="-1"><a class="header-anchor" href="#java-代码风格" aria-hidden="true">#</a> Java 代码风格</h3><ol><li><p><strong>命名规范：</strong></p><ul><li>类名：大驼峰（<code>StockService</code>, <code>TradingController</code>）</li><li>方法名：小驼峰（<code>getStockData</code>, <code>executeStrategy</code>）</li><li>常量：全大写下划线（<code>MAX_RETRY_COUNT</code>）</li><li>包名：全小写（<code>com.quant.stock.service</code>）</li></ul></li><li><p><strong>注释要求：</strong></p><ul><li>所有 public 方法必须有 Javadoc</li><li>复杂逻辑必须添加行内注释</li><li>使用中文注释（团队中文为主）</li></ul></li><li><p><strong>代码组织：</strong></p><ul><li>Controller 只负责请求处理</li><li>Service 包含业务逻辑</li><li>Repository 负责数据访问</li><li>DTO 用于数据传输</li></ul></li><li><p><strong>异常处理：</strong></p><ul><li>使用自定义业务异常（<code>BusinessException</code>）</li><li>Controller 统一异常处理（<code>GlobalExceptionHandler</code>）</li><li>记录详细的错误日志</li></ul></li></ol><h3 id="数据库规范" tabindex="-1"><a class="header-anchor" href="#数据库规范" aria-hidden="true">#</a> 数据库规范</h3><ol><li><p><strong>表命名：</strong></p><ul><li>小写下划线分隔（<code>stock_daily_data</code>, <code>trading_strategy</code>）</li><li>使用单数形式</li></ul></li><li><p><strong>字段命名：</strong></p><ul><li>小写下划线分隔</li><li>主键统一使用 <code>id</code></li><li>创建时间：<code>created_at</code></li><li>更新时间：<code>updated_at</code></li></ul></li><li><p><strong>索引规范：</strong></p><ul><li>主键索引：<code>pk_表名</code></li><li>唯一索引：<code>uk_表名_字段名</code></li><li>普通索引：<code>idx_表名_字段名</code></li></ul></li></ol><h2 id="🗂️-模块说明" tabindex="-1"><a class="header-anchor" href="#🗂️-模块说明" aria-hidden="true">#</a> 🗂️ 模块说明</h2><h3 id="stock-service" tabindex="-1"><a class="header-anchor" href="#stock-service" aria-hidden="true">#</a> Stock Service</h3><p><strong>职责：</strong> 股票数据采集、存储、查询</p><p><strong>核心类：</strong></p><ul><li><code>StockDataController</code> - REST API 接口</li><li><code>StockDataService</code> - 数据处理逻辑</li><li><code>StockDataRepository</code> - 数据库访问</li></ul><p><strong>依赖服务：</strong></p><ul><li>Python 数据服务（端口 5001）- 调用 AKShare 获取实时数据</li></ul><h3 id="trading-service" tabindex="-1"><a class="header-anchor" href="#trading-service" aria-hidden="true">#</a> Trading Service</h3><p><strong>职责：</strong> 交易策略管理、回测、信号生成</p><p><strong>核心类：</strong></p><ul><li><code>StrategyController</code> - 策略 API</li><li><code>BacktestEngine</code> - 回测引擎</li><li><code>SignalGenerator</code> - 信号生成器</li></ul><p><strong>支持策略：</strong></p><ul><li>MA Cross（均线交叉）</li><li>MACD</li><li>RSI</li><li>布林带</li></ul><h3 id="scheduler-service" tabindex="-1"><a class="header-anchor" href="#scheduler-service" aria-hidden="true">#</a> Scheduler Service</h3><p><strong>职责：</strong> 定时任务调度、AI 热度检测</p><p><strong>核心功能：</strong></p><ul><li>智能分层轮询（3s/5s/10s/30s）</li><li>AI 驱动的热度评分</li><li>WebSocket 实时推送</li></ul><h2 id="🔧-开发工作流" tabindex="-1"><a class="header-anchor" href="#🔧-开发工作流" aria-hidden="true">#</a> 🔧 开发工作流</h2><h3 id="_1-创建新功能" tabindex="-1"><a class="header-anchor" href="#_1-创建新功能" aria-hidden="true">#</a> 1. 创建新功能</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建功能分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/your-feature-name

<span class="token comment"># 2. 开发并提交</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 添加XXX功能&quot;</span>

<span class="token comment"># 3. 编译测试</span>
./mvnw clean <span class="token builtin class-name">test</span>

<span class="token comment"># 4. 合并到主分支</span>
<span class="token function">git</span> checkout main
<span class="token function">git</span> merge feature/your-feature-name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-修复-bug" tabindex="-1"><a class="header-anchor" href="#_2-修复-bug" aria-hidden="true">#</a> 2. 修复 Bug</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 创建 bugfix 分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> bugfix/issue-123

<span class="token comment"># 2. 修复并提交</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;fix: 修复XXX问题 #123&quot;</span>

<span class="token comment"># 3. 运行测试确保修复</span>
./mvnw <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-代码审查要点" tabindex="-1"><a class="header-anchor" href="#_3-代码审查要点" aria-hidden="true">#</a> 3. 代码审查要点</h3><ul><li>✅ 是否符合代码规范</li><li>✅ 是否有足够的单元测试</li><li>✅ 是否有清晰的注释</li><li>✅ 是否有潜在的性能问题</li><li>✅ 是否处理了异常情况</li></ul><h2 id="🧪-测试规范" tabindex="-1"><a class="header-anchor" href="#🧪-测试规范" aria-hidden="true">#</a> 🧪 测试规范</h2><h3 id="单元测试" tabindex="-1"><a class="header-anchor" href="#单元测试" aria-hidden="true">#</a> 单元测试</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">StockServiceTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StockService</span> stockService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token annotation punctuation">@DisplayName</span><span class="token punctuation">(</span><span class="token string">&quot;测试获取股票历史数据&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">testGetStockHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Given</span>
        <span class="token class-name">String</span> stockCode <span class="token operator">=</span> <span class="token string">&quot;000001.SZ&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> days <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>

        <span class="token comment">// When</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">StockData</span><span class="token punctuation">&gt;</span></span> result <span class="token operator">=</span> stockService<span class="token punctuation">.</span><span class="token function">getStockHistory</span><span class="token punctuation">(</span>stockCode<span class="token punctuation">,</span> days<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Then</span>
        <span class="token function">assertNotNull</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> days<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集成测试" tabindex="-1"><a class="header-anchor" href="#集成测试" aria-hidden="true">#</a> 集成测试</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span><span class="token punctuation">(</span>webEnvironment <span class="token operator">=</span> <span class="token class-name">SpringBootTest<span class="token punctuation">.</span>WebEnvironment</span><span class="token punctuation">.</span><span class="token constant">RANDOM_PORT</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">TradingControllerIntegrationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">TestRestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testCreateStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 测试完整的 HTTP 请求流程</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📊-性能优化指南" tabindex="-1"><a class="header-anchor" href="#📊-性能优化指南" aria-hidden="true">#</a> 📊 性能优化指南</h2><h3 id="数据库优化" tabindex="-1"><a class="header-anchor" href="#数据库优化" aria-hidden="true">#</a> 数据库优化</h3><ol><li><strong>使用索引：</strong> 为常用查询字段添加索引</li><li><strong>分页查询：</strong> 大数据量必须分页</li><li><strong>批量操作：</strong> 使用 batch insert/update</li><li><strong>连接池：</strong> HikariCP 配置（最小10，最大50）</li></ol><h3 id="缓存策略" tabindex="-1"><a class="header-anchor" href="#缓存策略" aria-hidden="true">#</a> 缓存策略</h3><ol><li><p><strong>Redis 缓存：</strong></p><ul><li>热门股票数据：缓存 5 分钟</li><li>用户配置：缓存 1 小时</li><li>策略结果：缓存 10 分钟</li></ul></li><li><p><strong>本地缓存：</strong></p><ul><li>使用 <code>@Cacheable</code> 注解</li><li>配置 Caffeine 缓存</li></ul></li></ol><h2 id="🐛-常见问题" tabindex="-1"><a class="header-anchor" href="#🐛-常见问题" aria-hidden="true">#</a> 🐛 常见问题</h2><h3 id="_1-maven-编译失败" tabindex="-1"><a class="header-anchor" href="#_1-maven-编译失败" aria-hidden="true">#</a> 1. Maven 编译失败</h3><p><strong>问题：</strong> <code>mvn: command not found</code></p><p><strong>解决：</strong> 使用 Maven Wrapper</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./mvnw clean compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-端口被占用" tabindex="-1"><a class="header-anchor" href="#_2-端口被占用" aria-hidden="true">#</a> 2. 端口被占用</h3><p><strong>问题：</strong> <code>Port 8082 is already in use</code></p><p><strong>解决：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查找占用端口的进程</span>
<span class="token function">lsof</span> <span class="token parameter variable">-i</span> :8082

<span class="token comment"># 杀死进程</span>
<span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token operator">&lt;</span>PID<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-数据库连接失败" tabindex="-1"><a class="header-anchor" href="#_3-数据库连接失败" aria-hidden="true">#</a> 3. 数据库连接失败</h3><p><strong>问题：</strong> <code>Connection refused</code></p><p><strong>解决：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查 MySQL 是否运行</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span> <span class="token function">grep</span> mysql

<span class="token comment"># 启动 MySQL</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔐-安全规范" tabindex="-1"><a class="header-anchor" href="#🔐-安全规范" aria-hidden="true">#</a> 🔐 安全规范</h2><ol><li><p><strong>敏感信息：</strong></p><ul><li>❌ 不要在代码中硬编码密码、API Key</li><li>✅ 使用环境变量或配置文件</li><li>✅ <code>.env</code> 文件加入 <code>.gitignore</code></li></ul></li><li><p><strong>SQL 注入防护：</strong></p><ul><li>✅ 使用 JPA/MyBatis 参数化查询</li><li>❌ 避免拼接 SQL 字符串</li></ul></li><li><p><strong>权限控制：</strong></p><ul><li>✅ 使用 Spring Security</li><li>✅ API 接口需要认证</li><li>✅ 敏感操作需要权限检查</li></ul></li></ol><h2 id="📚-相关文档" tabindex="-1"><a class="header-anchor" href="#📚-相关文档" aria-hidden="true">#</a> 📚 相关文档</h2>`,98),p=t(`<h2 id="💡-最佳实践" tabindex="-1"><a class="header-anchor" href="#💡-最佳实践" aria-hidden="true">#</a> 💡 最佳实践</h2><h3 id="_1-提交信息规范" tabindex="-1"><a class="header-anchor" href="#_1-提交信息规范" aria-hidden="true">#</a> 1. 提交信息规范</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 格式：&lt;type&gt;: &lt;description&gt;</span>
feat: 添加均线交叉策略
fix: 修复股票数据重复问题
docs: 更新 API 文档
refactor: 重构交易引擎代码
test: 添加策略回测单元测试
chore: 更新依赖版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-分支管理" tabindex="-1"><a class="header-anchor" href="#_2-分支管理" aria-hidden="true">#</a> 2. 分支管理</h3><ul><li><code>main</code> - 主分支（生产环境）</li><li><code>develop</code> - 开发分支</li><li><code>feature/*</code> - 功能分支</li><li><code>bugfix/*</code> - 修复分支</li><li><code>hotfix/*</code> - 紧急修复</li></ul><h3 id="_3-代码审查清单" tabindex="-1"><a class="header-anchor" href="#_3-代码审查清单" aria-hidden="true">#</a> 3. 代码审查清单</h3><ul><li>[ ] 代码符合规范</li><li>[ ] 有足够的单元测试</li><li>[ ] 注释清晰完整</li><li>[ ] 无硬编码敏感信息</li><li>[ ] 性能优化到位</li><li>[ ] 异常处理完善</li></ul><h2 id="🎯-给-claude-的指引" tabindex="-1"><a class="header-anchor" href="#🎯-给-claude-的指引" aria-hidden="true">#</a> 🎯 给 Claude 的指引</h2><h3 id="优先级原则" tabindex="-1"><a class="header-anchor" href="#优先级原则" aria-hidden="true">#</a> 优先级原则</h3><ol><li><strong>安全第一：</strong> 不要跳过测试，不要忽略异常</li><li><strong>规范优先：</strong> 严格遵循本文档的代码规范</li><li><strong>清晰沟通：</strong> 不确定时询问，不要猜测需求</li><li><strong>完整实现：</strong> 功能完整，包括测试和文档</li></ol><h3 id="常用任务模板" tabindex="-1"><a class="header-anchor" href="#常用任务模板" aria-hidden="true">#</a> 常用任务模板</h3><p><strong>添加新接口：</strong></p><ol><li>在 Controller 添加接口方法</li><li>在 Service 实现业务逻辑</li><li>添加单元测试</li><li>更新 API 文档</li></ol><p><strong>修复 Bug：</strong></p><ol><li>定位问题代码</li><li>分析根本原因</li><li>实现修复</li><li>添加回归测试</li></ol><p><strong>性能优化：</strong></p><ol><li>定位性能瓶颈</li><li>分析优化方案</li><li>实现优化</li><li>性能测试对比</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
## 🎨 优秀的 claude.md 应该包含什么？

### 必备内容 ✅

1. **项目基本信息**
   - 项目名称和简介
   - 技术栈
   - 仓库地址

2. **构建命令**（最重要）
   - 编译命令
   - 测试命令
   - 打包命令
   - 运行命令

3. **代码规范**
   - 命名规范
   - 代码风格
   - 注释要求

4. **项目结构**
   - 目录说明
   - 模块职责
   - 依赖关系

5. **开发工作流**
   - 分支策略
   - 提交规范
   - 代码审查

### 可选内容 📋

6. **测试规范**
7. **性能优化指南**
8. **常见问题 FAQ**
9. **安全规范**
10. **相关文档链接**

## 🔄 工作原理

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>┌──────────────────────────────────────────────────┐ │ 你启动 Claude CLI │ │ $ claude &quot;帮我编译项目&quot; │ └──────────────────┬───────────────────────────────┘ │ ↓ ┌──────────────────────────────────────────────────┐ │ Claude 自动读取 .claude/claude.md │ │ - 加载项目规范 │ │ - 加载构建命令 │ │ - 加载代码标准 │ └──────────────────┬───────────────────────────────┘ │ ↓ ┌──────────────────────────────────────────────────┐ │ Claude 根据 claude.md 执行 │ │ - 识别到&quot;编译项目&quot; │ │ - 查找 claude.md 中的编译命令 │ │ - 执行: ./mvnw clean compile │ └──────────────────────────────────────────────────┘</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
## 💡 实战技巧

### 1. 明确指定使用的命令

\`\`\`markdown
## 构建命令

**⚠️ 本项目使用 Maven Wrapper，必须使用 \`./mvnw\` 而不是 \`mvn\`**

**编译项目：**
\`\`\`bash
./mvnw clean compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
这样 Claude 就会优先使用 \`./mvnw\` 而不是 \`mvn\`。

### 2. 提供多种场景的命令

\`\`\`markdown
## 构建命令

**完整构建（包含测试）：**
\`\`\`bash
./mvnw clean install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>快速构建（跳过测试）：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./mvnw clean <span class="token function">install</span> <span class="token parameter variable">-DskipTests</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>只编译不打包：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./mvnw clean compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
### 3. 说明模块间的依赖

\`\`\`markdown
## 模块说明

### Common 模块

**重要：** 其他模块都依赖 common 模块，修改 common 后需要重新安装：

\`\`\`bash
cd common
./mvnw clean install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
### 4. 提供故障排查指南

\`\`\`markdown
## 常见问题

### Maven 编译失败

如果遇到 \`mvn: command not found\`，说明系统未安装 Maven。

**解决方案：** 使用项目自带的 Maven Wrapper
\`\`\`bash
./mvnw clean compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
## 📦 预批准命令（配合 settings.json）

\`.claude/settings.json\` 可以配置预批准的命令，避免每次都要确认：

\`\`\`json
{
  &quot;preapproved_commands&quot;: [
    &quot;./mvnw clean compile&quot;,
    &quot;./mvnw test&quot;,
    &quot;./mvnw clean install -DskipTests&quot;,
    &quot;npm run dev&quot;,
    &quot;docker-compose up -d&quot;
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结合 claude.md 使用：</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">##</span> 构建命令</span>

<span class="token bold"><span class="token punctuation">**</span><span class="token content">以下命令已预批准，Claude 可以直接执行：</span><span class="token punctuation">**</span></span>

<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`./mvnw clean compile\`</span> - 编译项目
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`./mvnw test\`</span> - 运行测试
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`npm run dev\`</span> - 启动前端开发服务器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🎓-最佳实践总结" tabindex="-1"><a class="header-anchor" href="#🎓-最佳实践总结" aria-hidden="true">#</a> 🎓 最佳实践总结</h2><h3 id="✅-do-推荐做法" tabindex="-1"><a class="header-anchor" href="#✅-do-推荐做法" aria-hidden="true">#</a> ✅ DO（推荐做法）</h3><ol><li>✅ <strong>明确说明构建工具</strong> - &quot;必须使用 ./mvnw 而不是 mvn&quot;</li><li>✅ <strong>提供完整命令</strong> - 不要只写 <code>mvn compile</code>，要写 <code>./mvnw clean compile</code></li><li>✅ <strong>解释命令用途</strong> - &quot;编译项目&quot;、&quot;运行测试&quot;等</li><li>✅ <strong>说明依赖关系</strong> - &quot;修改 common 模块需要先 install&quot;</li><li>✅ <strong>定期更新</strong> - 随项目演进更新文档</li><li>✅ <strong>团队共识</strong> - claude.md 作为团队规范文档</li></ol><h3 id="❌-don-t-避免做法" tabindex="-1"><a class="header-anchor" href="#❌-don-t-避免做法" aria-hidden="true">#</a> ❌ DON&#39;T（避免做法）</h3><ol><li>❌ <strong>过于简略</strong> - 只写&quot;使用 Maven 构建&quot;（不够具体）</li><li>❌ <strong>命令错误</strong> - 写错命令导致构建失败</li><li>❌ <strong>过时信息</strong> - 没及时更新导致误导</li><li>❌ <strong>格式混乱</strong> - 难以阅读和查找</li><li>❌ <strong>遗漏关键信息</strong> - 没说明模块依赖关系</li></ol><h2 id="📊-效果对比" tabindex="-1"><a class="header-anchor" href="#📊-效果对比" aria-hidden="true">#</a> 📊 效果对比</h2><h3 id="没有-claude-md" tabindex="-1"><a class="header-anchor" href="#没有-claude-md" aria-hidden="true">#</a> 没有 claude.md</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>你: &quot;帮我编译项目&quot;

Claude: &quot;我看到你使用 Maven，我会执行 mvn compile&quot;
[执行失败：mvn: command not found]

你: &quot;用 ./mvnw&quot;

Claude: &quot;好的，执行 ./mvnw compile&quot;
[成功]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="有-claude-md" tabindex="-1"><a class="header-anchor" href="#有-claude-md" aria-hidden="true">#</a> 有 claude.md</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>你: &quot;帮我编译项目&quot;

Claude: &quot;根据项目配置，执行 ./mvnw clean compile&quot;
[直接成功]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🚀-立即行动" tabindex="-1"><a class="header-anchor" href="#🚀-立即行动" aria-hidden="true">#</a> 🚀 立即行动</h2><h3 id="_1-创建你的-claude-md" tabindex="-1"><a class="header-anchor" href="#_1-创建你的-claude-md" aria-hidden="true">#</a> 1. 创建你的 claude.md</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> .claude
<span class="token function">touch</span> .claude/claude.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-使用模板" tabindex="-1"><a class="header-anchor" href="#_2-使用模板" aria-hidden="true">#</a> 2. 使用模板</h3><p>复制上面的模板，根据你的项目修改：</p><ul><li>项目名称和技术栈</li><li>构建命令</li><li>代码规范</li></ul><h3 id="_3-测试效果" tabindex="-1"><a class="header-anchor" href="#_3-测试效果" aria-hidden="true">#</a> 3. 测试效果</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>claude <span class="token string">&quot;帮我编译项目&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Claude 会根据 claude.md 中的配置自动执行正确的命令！</p><h2 id="📚-相关资源" tabindex="-1"><a class="header-anchor" href="#📚-相关资源" aria-hidden="true">#</a> 📚 相关资源</h2>`,50),m={href:"https://docs.claude.com/claude-code",target:"_blank",rel:"noopener noreferrer"},b={href:"https://docs.claude.com/claude-code/settings",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.claude.com/claude-code/best-practices",target:"_blank",rel:"noopener noreferrer"},g=n("hr",null,null,-1),k=n("p",null,[n("strong",null,"💡 提示："),e(" 把 claude.md 纳入版本控制（Git），让团队成员都能使用统一的配置！")],-1);function x(f,_){const s=d("RouterLink"),l=d("ExternalLinkIcon");return r(),o("div",null,[v,n("ul",null,[n("li",null,[a(s,{to:"/quant-platform/ARCHITECTURE.html"},{default:i(()=>[e("架构设计文档")]),_:1})]),n("li",null,[a(s,{to:"/quant-platform/api/API_SPECIFICATIONS.html"},{default:i(()=>[e("API 接口文档")]),_:1})]),n("li",null,[a(s,{to:"/quant-platform/deployment/DEPLOYMENT_GUIDE.html"},{default:i(()=>[e("部署运维指南")]),_:1})]),n("li",null,[a(s,{to:"/quant-platform/SCHEDULER_SERVICE.html"},{default:i(()=>[e("Scheduler Service 文档")]),_:1})])]),p,n("ul",null,[n("li",null,[e("📖 "),n("a",m,[e("Claude Code 官方文档"),a(l)])]),n("li",null,[e("🔧 "),n("a",b,[e("settings.json 配置指南"),a(l)])]),n("li",null,[e("💡 "),n("a",h,[e("Claude CLI 最佳实践"),a(l)])])]),g,k])}const w=c(u,[["render",x],["__file","CLAUDE_MD_GUIDE.html.vue"]]);export{w as default};
