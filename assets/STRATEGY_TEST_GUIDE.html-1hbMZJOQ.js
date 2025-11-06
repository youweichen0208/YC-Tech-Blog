import{_ as n,o as a,c as e,e as s}from"./app-Umcqr2fY.js";const i={},l=s(`<h1 id="双均线交叉策略功能-测试指南" tabindex="-1"><a class="header-anchor" href="#双均线交叉策略功能-测试指南" aria-hidden="true">#</a> 双均线交叉策略功能 - 测试指南</h1><h2 id="🎯-功能概述" tabindex="-1"><a class="header-anchor" href="#🎯-功能概述" aria-hidden="true">#</a> 🎯 功能概述</h2><p>已实现完整的双均线交叉策略系统，包括：</p><ul><li>✅ 技术指标计算库（MA、MACD、RSI、BOLL）</li><li>✅ 策略接口和双均线交叉策略实现</li><li>✅ 数据库实体和Repository</li><li>✅ 策略服务层和REST API</li><li>✅ 前端策略管理页面</li></ul><h2 id="📋-测试步骤" tabindex="-1"><a class="header-anchor" href="#📋-测试步骤" aria-hidden="true">#</a> 📋 测试步骤</h2><h3 id="_1-启动后端服务" tabindex="-1"><a class="header-anchor" href="#_1-启动后端服务" aria-hidden="true">#</a> 1. 启动后端服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入trading-service目录</span>
<span class="token builtin class-name">cd</span> trading-service

<span class="token comment"># 使用Maven启动（需要安装Maven）</span>
mvn spring-boot:run

<span class="token comment"># 或使用Gradle（如果有gradle wrapper）</span>
./gradlew bootRun
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务将在端口 <strong>8083</strong> 启动。</p><h3 id="_2-验证服务健康状态" tabindex="-1"><a class="header-anchor" href="#_2-验证服务健康状态" aria-hidden="true">#</a> 2. 验证服务健康状态</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查策略服务健康状态</span>
<span class="token function">curl</span> http://localhost:8083/trading-service/api/strategy/health

<span class="token comment"># 预期响应：</span>
<span class="token comment"># {&quot;status&quot;:&quot;UP&quot;,&quot;service&quot;:&quot;strategy-service&quot;}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-获取支持的策略类型" tabindex="-1"><a class="header-anchor" href="#_3-获取支持的策略类型" aria-hidden="true">#</a> 3. 获取支持的策略类型</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:8083/trading-service/api/strategy/types

<span class="token comment"># 预期响应包含MA_CROSS策略信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-创建双均线交叉策略" tabindex="-1"><a class="header-anchor" href="#_4-创建双均线交叉策略" aria-hidden="true">#</a> 4. 创建双均线交叉策略</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8083/trading-service/api/strategy/create <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;name&quot;: &quot;我的第一个策略&quot;,
    &quot;type&quot;: &quot;MA_CROSS&quot;,
    &quot;description&quot;: &quot;5日和20日均线交叉策略&quot;,
    &quot;parameters&quot;: &quot;{\\&quot;shortPeriod\\&quot;: 5, \\&quot;longPeriod\\&quot;: 20}&quot;,
    &quot;userId&quot;: 1
  }&#39;</span>

<span class="token comment"># 预期响应：</span>
<span class="token comment"># {&quot;success&quot;:true,&quot;message&quot;:&quot;策略创建成功&quot;,&quot;strategy&quot;:{...}}</span>
<span class="token comment"># 记录返回的strategy.id用于后续测试</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-为指定股票生成交易信号" tabindex="-1"><a class="header-anchor" href="#_5-为指定股票生成交易信号" aria-hidden="true">#</a> 5. 为指定股票生成交易信号</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 假设上一步返回的strategyId是1</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8083/trading-service/api/strategy/1/signal/000001.SZ

<span class="token comment"># 预期响应：</span>
<span class="token comment"># {</span>
<span class="token comment">#   &quot;success&quot;: true,</span>
<span class="token comment">#   &quot;message&quot;: &quot;信号生成成功&quot;,</span>
<span class="token comment">#   &quot;signal&quot;: {</span>
<span class="token comment">#     &quot;stockCode&quot;: &quot;000001.SZ&quot;,</span>
<span class="token comment">#     &quot;stockName&quot;: &quot;平安银行&quot;,</span>
<span class="token comment">#     &quot;signalType&quot;: &quot;BUY&quot; | &quot;SELL&quot; | &quot;HOLD&quot;,</span>
<span class="token comment">#     &quot;price&quot;: 11.16,</span>
<span class="token comment">#     &quot;signalStrength&quot;: 2.5,</span>
<span class="token comment">#     &quot;reason&quot;: &quot;金叉信号: MA5(11.20) 向上穿越 MA20(11.00)&quot;,</span>
<span class="token comment">#     &quot;signalTime&quot;: &quot;2025-10-23T12:00:00&quot;</span>
<span class="token comment">#   }</span>
<span class="token comment"># }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-批量生成多只股票的信号" tabindex="-1"><a class="header-anchor" href="#_6-批量生成多只股票的信号" aria-hidden="true">#</a> 6. 批量生成多只股票的信号</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:8083/trading-service/api/strategy/1/signals <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;{
    &quot;stockCodes&quot;: [&quot;000001.SZ&quot;, &quot;600036.SH&quot;, &quot;600519.SH&quot;]
  }&#39;</span>

<span class="token comment"># 预期响应：</span>
<span class="token comment"># {</span>
<span class="token comment">#   &quot;success&quot;: true,</span>
<span class="token comment">#   &quot;message&quot;: &quot;批量信号生成完成&quot;,</span>
<span class="token comment">#   &quot;signals&quot;: [...],</span>
<span class="token comment">#   &quot;totalCount&quot;: 3</span>
<span class="token comment"># }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-查看策略的所有历史信号" tabindex="-1"><a class="header-anchor" href="#_7-查看策略的所有历史信号" aria-hidden="true">#</a> 7. 查看策略的所有历史信号</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://localhost:8083/trading-service/api/strategy/1/signals

<span class="token comment"># 返回该策略生成的所有信号记录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-前端测试" tabindex="-1"><a class="header-anchor" href="#_8-前端测试" aria-hidden="true">#</a> 8. 前端测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动前端（在项目根目录）</span>
<span class="token builtin class-name">cd</span> web-frontend
<span class="token function">npm</span> <span class="token function">install</span>  <span class="token comment"># 如果还没安装依赖</span>
<span class="token function">npm</span> run dev

<span class="token comment"># 访问 http://localhost:3003/dashboard/strategy</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>前端操作流程：</strong></p><ol><li>点击&quot;创建新策略&quot;按钮</li><li>填写策略名称，选择&quot;双均线交叉&quot;策略类型</li><li>配置短期均线（5日）和长期均线（20日）</li><li>点击&quot;创建&quot;</li><li>在策略列表中点击&quot;生成信号&quot;</li><li>输入股票代码（如 000001.SZ）</li><li>查看生成的交易信号（BUY/SELL/HOLD）</li><li>点击&quot;查看信号&quot;查看历史记录</li></ol><h2 id="🧪-测试用例" tabindex="-1"><a class="header-anchor" href="#🧪-测试用例" aria-hidden="true">#</a> 🧪 测试用例</h2><h3 id="测试用例-1-金叉信号-买入" tabindex="-1"><a class="header-anchor" href="#测试用例-1-金叉信号-买入" aria-hidden="true">#</a> 测试用例 1: 金叉信号（买入）</h3><p>当短期MA向上穿越长期MA时，应该生成BUY信号。</p><p><strong>模拟数据特征：</strong></p><ul><li>前一天：MA5 &lt; MA20</li><li>当天：MA5 &gt; MA20</li><li><strong>预期结果：</strong> signalType = &quot;BUY&quot;</li></ul><h3 id="测试用例-2-死叉信号-卖出" tabindex="-1"><a class="header-anchor" href="#测试用例-2-死叉信号-卖出" aria-hidden="true">#</a> 测试用例 2: 死叉信号（卖出）</h3><p>当短期MA向下穿越长期MA时，应该生成SELL信号。</p><p><strong>模拟数据特征：</strong></p><ul><li>前一天：MA5 &gt; MA20</li><li>当天：MA5 &lt; MA20</li><li><strong>预期结果：</strong> signalType = &quot;SELL&quot;</li></ul><h3 id="测试用例-3-无交叉-持有" tabindex="-1"><a class="header-anchor" href="#测试用例-3-无交叉-持有" aria-hidden="true">#</a> 测试用例 3: 无交叉（持有）</h3><p>当没有交叉发生时，应该生成HOLD信号。</p><p><strong>预期结果：</strong> signalType = &quot;HOLD&quot;</p><h2 id="📊-关键文件位置" tabindex="-1"><a class="header-anchor" href="#📊-关键文件位置" aria-hidden="true">#</a> 📊 关键文件位置</h2><h3 id="后端" tabindex="-1"><a class="header-anchor" href="#后端" aria-hidden="true">#</a> 后端</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>trading-service/src/main/java/com/quant/trading/
├── indicator/
│   └── IndicatorCalculator.java          # 技术指标计算
├── strategy/
│   ├── TradingStrategy.java              # 策略接口
│   └── MovingAverageCrossStrategy.java   # 双均线策略实现
├── entity/
│   ├── Strategy.java                     # 策略实体
│   └── StrategySignal.java               # 信号实体
├── repository/
│   ├── StrategyRepository.java
│   └── StrategySignalRepository.java
├── service/
│   └── StrategyService.java              # 策略服务
└── controller/
    └── StrategyController.java           # REST API
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="前端" tabindex="-1"><a class="header-anchor" href="#前端" aria-hidden="true">#</a> 前端</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>web-frontend/src/
├── views/dashboard/
│   ├── Strategy.vue                      # 策略管理页面
│   └── Layout.vue                        # 导航菜单（已添加策略入口）
└── router/
    └── index.js                          # 路由配置（已添加/strategy路由）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🎯-信号类型说明" tabindex="-1"><a class="header-anchor" href="#🎯-信号类型说明" aria-hidden="true">#</a> 🎯 信号类型说明</h2><h3 id="buy-买入信号" tabindex="-1"><a class="header-anchor" href="#buy-买入信号" aria-hidden="true">#</a> BUY（买入信号）</h3><ul><li><strong>条件：</strong> 金叉（Golden Cross）</li><li><strong>定义：</strong> 短期均线向上穿越长期均线</li><li><strong>操作建议：</strong> 考虑买入该股票</li></ul><h3 id="sell-卖出信号" tabindex="-1"><a class="header-anchor" href="#sell-卖出信号" aria-hidden="true">#</a> SELL（卖出信号）</h3><ul><li><strong>条件：</strong> 死叉（Death Cross）</li><li><strong>定义：</strong> 短期均线向下穿越长期均线</li><li><strong>操作建议：</strong> 考虑卖出持仓</li></ul><h3 id="hold-持有信号" tabindex="-1"><a class="header-anchor" href="#hold-持有信号" aria-hidden="true">#</a> HOLD（持有信号）</h3><ul><li><strong>条件：</strong> 无交叉发生</li><li><strong>定义：</strong> 短期均线和长期均线保持原有相对位置</li><li><strong>操作建议：</strong> 保持当前仓位</li></ul><h2 id="📈-信号强度计算" tabindex="-1"><a class="header-anchor" href="#📈-信号强度计算" aria-hidden="true">#</a> 📈 信号强度计算</h2><p>信号强度表示均线交叉的程度：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 买入信号强度 = (MA5 - MA20) / MA20 * 100</span>
<span class="token comment">// 卖出信号强度 = (MA20 - MA5) / MA20 * 100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>强度解读：</strong></p><ul><li>0-1%: 弱信号</li><li>1-3%: 中等信号</li><li>3%+: 强信号</li></ul><h2 id="🔧-常见问题" tabindex="-1"><a class="header-anchor" href="#🔧-常见问题" aria-hidden="true">#</a> 🔧 常见问题</h2><h3 id="q1-策略生成-数据不足-信号" tabindex="-1"><a class="header-anchor" href="#q1-策略生成-数据不足-信号" aria-hidden="true">#</a> Q1: 策略生成&quot;数据不足&quot;信号</h3><p><strong>原因：</strong> 历史数据少于长期均线周期（默认20天） <strong>解决：</strong> 确保提供至少20个以上的历史价格数据点</p><h3 id="q2-前端无法访问策略页面" tabindex="-1"><a class="header-anchor" href="#q2-前端无法访问策略页面" aria-hidden="true">#</a> Q2: 前端无法访问策略页面</h3><p><strong>原因：</strong> 路由未正确配置或服务未启动 <strong>解决：</strong></p><ol><li>确认trading-service在8083端口运行</li><li>检查浏览器控制台是否有跨域错误</li><li>确认路由配置正确</li></ol><h3 id="q3-生成的信号都是hold" tabindex="-1"><a class="header-anchor" href="#q3-生成的信号都是hold" aria-hidden="true">#</a> Q3: 生成的信号都是HOLD</h3><p><strong>原因：</strong> 当前没有均线交叉发生 <strong>解决：</strong> 这是正常现象，只有在交叉时才会产生BUY/SELL信号</p><h2 id="🚀-下一步开发建议" tabindex="-1"><a class="header-anchor" href="#🚀-下一步开发建议" aria-hidden="true">#</a> 🚀 下一步开发建议</h2><p>完成测试后，可以继续开发：</p><ol><li><p><strong>更多策略类型</strong></p><ul><li>MACD交叉策略</li><li>RSI超买超卖策略</li><li>布林带突破策略</li></ul></li><li><p><strong>实时数据集成</strong></p><ul><li>替换模拟数据为真实历史数据</li><li>集成market-data-service获取K线数据</li></ul></li><li><p><strong>自动交易引擎</strong></p><ul><li>定时任务调度（每5分钟扫描一次）</li><li>自动执行交易信号</li><li>交易结果记录和统计</li></ul></li><li><p><strong>回测系统</strong></p><ul><li>历史数据回测</li><li>策略收益率计算</li><li>回测结果可视化</li></ul></li></ol><h2 id="📞-技术支持" tabindex="-1"><a class="header-anchor" href="#📞-技术支持" aria-hidden="true">#</a> 📞 技术支持</h2><p>如遇问题，可以检查：</p><ol><li>trading-service的日志输出</li><li>浏览器开发者工具的Network和Console</li><li>数据库中strategies和strategy_signals表的数据</li></ol>`,67),t=[l];function r(d,o){return a(),e("div",null,t)}const u=n(i,[["render",r],["__file","STRATEGY_TEST_GUIDE.html.vue"]]);export{u as default};
