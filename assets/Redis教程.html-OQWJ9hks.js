import{_ as i,r as d,o as t,c as l,a as n,b as s,d as e,e as c}from"./app-Z_B6pOHV.js";const r={},o=c(`<h1 id="redis-教程-量化交易平台实战" tabindex="-1"><a class="header-anchor" href="#redis-教程-量化交易平台实战" aria-hidden="true">#</a> Redis 教程 - 量化交易平台实战</h1><h2 id="什么是-redis" tabindex="-1"><a class="header-anchor" href="#什么是-redis" aria-hidden="true">#</a> 什么是 Redis？</h2><p><strong>Redis</strong> 是一个内存数据库（NoSQL），可以理解为<strong>超快的键值存储系统</strong>。</p><h3 id="形象比喻" tabindex="-1"><a class="header-anchor" href="#形象比喻" aria-hidden="true">#</a> 形象比喻</h3><ul><li><strong>MySQL</strong>：图书馆（数据量大，查询复杂，但稍慢）</li><li><strong>Redis</strong>：书桌（常用资料放手边，秒级访问）</li></ul><h3 id="核心特点" tabindex="-1"><a class="header-anchor" href="#核心特点" aria-hidden="true">#</a> 核心特点</h3><ul><li>⚡ <strong>极快</strong>：所有数据在内存中，读写速度达到10万次/秒</li><li>🔄 <strong>多数据类型</strong>：字符串、列表、集合、哈希、有序集合</li><li>⏰ <strong>过期机制</strong>：自动删除过期数据</li><li>💾 <strong>持久化</strong>：可选择性保存到磁盘</li></ul><hr><h2 id="在你的量化交易平台中的作用" tabindex="-1"><a class="header-anchor" href="#在你的量化交易平台中的作用" aria-hidden="true">#</a> 在你的量化交易平台中的作用</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Redis缓存
├── 实时行情缓存          (stock:600519:price → &quot;1680.00&quot;)
├── 用户Session           (session:abc123 → {user_id: 1})
├── 热门股票排行榜        (热搜榜单)
├── 交易限流              (防止频繁下单)
├── 分布式锁              (防止重复操作)
└── 技术指标缓存          (计算结果缓存)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="核心场景" tabindex="-1"><a class="header-anchor" href="#核心场景" aria-hidden="true">#</a> 核心场景</h3><ol><li><strong>实时行情缓存</strong>：避免每次都查MySQL</li><li><strong>用户登录状态</strong>：JWT Token缓存</li><li><strong>限流防刷</strong>：防止恶意高频交易</li><li><strong>排行榜</strong>：实时更新热门股票</li><li><strong>分布式锁</strong>：多个服务协调操作</li></ol><hr><h2 id="redis-数据类型" tabindex="-1"><a class="header-anchor" href="#redis-数据类型" aria-hidden="true">#</a> Redis 数据类型</h2><h3 id="_1-string-字符串" tabindex="-1"><a class="header-anchor" href="#_1-string-字符串" aria-hidden="true">#</a> 1. String（字符串）</h3><p>最简单的键值对</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>key → value
stock:600519:price → &quot;1680.00&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-hash-哈希" tabindex="-1"><a class="header-anchor" href="#_2-hash-哈希" aria-hidden="true">#</a> 2. Hash（哈希）</h3><p>存储对象</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>user:1 → {
    username: &quot;test_user&quot;,
    email: &quot;test@example.com&quot;,
    balance: &quot;100000&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-list-列表" tabindex="-1"><a class="header-anchor" href="#_3-list-列表" aria-hidden="true">#</a> 3. List（列表）</h3><p>有序列表</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stock:600519:history → [&quot;1680&quot;, &quot;1675&quot;, &quot;1690&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-set-集合" tabindex="-1"><a class="header-anchor" href="#_4-set-集合" aria-hidden="true">#</a> 4. Set（集合）</h3><p>无序不重复集合</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>user:1:watchlist → {&quot;600519&quot;, &quot;000001&quot;, &quot;600000&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-sorted-set-有序集合" tabindex="-1"><a class="header-anchor" href="#_5-sorted-set-有序集合" aria-hidden="true">#</a> 5. Sorted Set（有序集合）</h3><p>带分数的集合（适合排行榜）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hot:stocks → {
    &quot;600519&quot;: 9999,  # 茅台，热度9999
    &quot;000001&quot;: 8888,  # 平安，热度8888
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="实战-使用你的-docker-redis" tabindex="-1"><a class="header-anchor" href="#实战-使用你的-docker-redis" aria-hidden="true">#</a> 实战：使用你的 Docker Redis</h2><h3 id="_1-启动-redis" tabindex="-1"><a class="header-anchor" href="#_1-启动-redis" aria-hidden="true">#</a> 1. 启动 Redis</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> quant-trading-platform
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-验证-redis-是否启动" tabindex="-1"><a class="header-anchor" href="#_2-验证-redis-是否启动" aria-hidden="true">#</a> 2. 验证 Redis 是否启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看容器状态</span>
<span class="token function">docker</span> compose <span class="token function">ps</span> redis

<span class="token comment"># 查看日志</span>
<span class="token function">docker</span> compose logs redis <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;Ready to accept connections&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-连接到-redis" tabindex="-1"><a class="header-anchor" href="#_3-连接到-redis" aria-hidden="true">#</a> 3. 连接到 Redis</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 连接Redis（需要密码）</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> quant-redis redis-cli <span class="token parameter variable">-a</span> redis123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>成功后显示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:6379&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><h2 id="redis-基础命令实战" tabindex="-1"><a class="header-anchor" href="#redis-基础命令实战" aria-hidden="true">#</a> Redis 基础命令实战</h2><h3 id="_1-string-操作-最常用" tabindex="-1"><a class="header-anchor" href="#_1-string-操作-最常用" aria-hidden="true">#</a> 1. String 操作（最常用）</h3><h4 id="设置-获取值" tabindex="-1"><a class="header-anchor" href="#设置-获取值" aria-hidden="true">#</a> 设置/获取值</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 设置股票价格</span>
SET stock:600519:price <span class="token number">1680.00</span>

<span class="token comment"># 获取股票价格</span>
GET stock:600519:price
<span class="token comment"># 返回：1680.00</span>

<span class="token comment"># 设置并带过期时间（60秒）</span>
SETEX stock:600519:price <span class="token number">60</span> <span class="token number">1680.00</span>

<span class="token comment"># 批量设置</span>
MSET stock:600519:price <span class="token number">1680</span> stock:000001:price <span class="token number">10.52</span>

<span class="token comment"># 批量获取</span>
MGET stock:600519:price stock:000001:price
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="数值操作" tabindex="-1"><a class="header-anchor" href="#数值操作" aria-hidden="true">#</a> 数值操作</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 设置用户余额</span>
SET user:1:balance <span class="token number">100000</span>

<span class="token comment"># 增加余额</span>
INCRBY user:1:balance <span class="token number">50000</span>
<span class="token comment"># 返回：150000</span>

<span class="token comment"># 减少余额</span>
DECRBY user:1:balance <span class="token number">20000</span>
<span class="token comment"># 返回：130000</span>

<span class="token comment"># 自增1</span>
INCR user:1:order_count
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="检查键是否存在" tabindex="-1"><a class="header-anchor" href="#检查键是否存在" aria-hidden="true">#</a> 检查键是否存在</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>EXISTS stock:600519:price
<span class="token comment"># 返回：1（存在）或 0（不存在）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_2-hash-操作-存储对象" tabindex="-1"><a class="header-anchor" href="#_2-hash-操作-存储对象" aria-hidden="true">#</a> 2. Hash 操作（存储对象）</h3><h4 id="设置-获取哈希字段" tabindex="-1"><a class="header-anchor" href="#设置-获取哈希字段" aria-hidden="true">#</a> 设置/获取哈希字段</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 存储用户信息</span>
HSET user:1 username test_user
HSET user:1 email test@example.com
HSET user:1 balance <span class="token number">100000</span>

<span class="token comment"># 批量设置</span>
HMSET user:1 username test_user email test@example.com balance <span class="token number">100000</span>

<span class="token comment"># 获取单个字段</span>
HGET user:1 username
<span class="token comment"># 返回：test_user</span>

<span class="token comment"># 获取所有字段</span>
HGETALL user:1
<span class="token comment"># 返回：</span>
<span class="token comment"># username</span>
<span class="token comment"># test_user</span>
<span class="token comment"># email</span>
<span class="token comment"># test@example.com</span>
<span class="token comment"># balance</span>
<span class="token comment"># 100000</span>

<span class="token comment"># 获取多个字段</span>
HMGET user:1 username balance

<span class="token comment"># 只增加数值字段</span>
HINCRBY user:1 balance <span class="token number">50000</span>

<span class="token comment"># 获取所有键</span>
HKEYS user:1

<span class="token comment"># 获取所有值</span>
HVALS user:1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实战-缓存股票详情" tabindex="-1"><a class="header-anchor" href="#实战-缓存股票详情" aria-hidden="true">#</a> 实战：缓存股票详情</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>HMSET stock:600519 symbol <span class="token number">600519</span> name 贵州茅台 price <span class="token number">1680</span> volume <span class="token number">50000</span> exchange SH

<span class="token comment"># 获取股票详情</span>
HGETALL stock:600519
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_3-list-操作-消息队列、历史记录" tabindex="-1"><a class="header-anchor" href="#_3-list-操作-消息队列、历史记录" aria-hidden="true">#</a> 3. List 操作（消息队列、历史记录）</h3><h4 id="左进右出-队列" tabindex="-1"><a class="header-anchor" href="#左进右出-队列" aria-hidden="true">#</a> 左进右出（队列）</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加到队列头部</span>
LPUSH order:queue ORD001 ORD002 ORD003

<span class="token comment"># 从队列尾部取出</span>
RPOP order:queue
<span class="token comment"># 返回：ORD001</span>

<span class="token comment"># 查看队列长度</span>
LLEN order:queue

<span class="token comment"># 查看队列内容（不移除）</span>
LRANGE order:queue <span class="token number">0</span> <span class="token parameter variable">-1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="右进左出-栈" tabindex="-1"><a class="header-anchor" href="#右进左出-栈" aria-hidden="true">#</a> 右进左出（栈）</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加到队列尾部</span>
RPUSH stock:600519:history <span class="token number">1680</span> <span class="token number">1675</span> <span class="token number">1690</span>

<span class="token comment"># 从队列头部取出</span>
LPOP stock:600519:history
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实战-k线历史缓存" tabindex="-1"><a class="header-anchor" href="#实战-k线历史缓存" aria-hidden="true">#</a> 实战：K线历史缓存</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 存储最近10条K线</span>
RPUSH kline:600519 <span class="token number">1680</span> <span class="token number">1675</span> <span class="token number">1690</span> <span class="token number">1685</span> <span class="token number">1700</span>

<span class="token comment"># 获取最近5条</span>
LRANGE kline:600519 <span class="token parameter variable">-5</span> <span class="token parameter variable">-1</span>

<span class="token comment"># 限制列表长度（只保留最新100条）</span>
LTRIM kline:600519 <span class="token parameter variable">-100</span> <span class="token parameter variable">-1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_4-set-操作-自选股、标签" tabindex="-1"><a class="header-anchor" href="#_4-set-操作-自选股、标签" aria-hidden="true">#</a> 4. Set 操作（自选股、标签）</h3><h4 id="添加-查看集合" tabindex="-1"><a class="header-anchor" href="#添加-查看集合" aria-hidden="true">#</a> 添加/查看集合</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加自选股</span>
SADD user:1:watchlist <span class="token number">600519</span> 000001 <span class="token number">600000</span>

<span class="token comment"># 查看所有自选股</span>
SMEMBERS user:1:watchlist

<span class="token comment"># 判断是否在自选中</span>
SISMEMBER user:1:watchlist <span class="token number">600519</span>
<span class="token comment"># 返回：1（在）或 0（不在）</span>

<span class="token comment"># 移除自选股</span>
SREM user:1:watchlist <span class="token number">600000</span>

<span class="token comment"># 获取自选股数量</span>
SCARD user:1:watchlist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="集合运算" tabindex="-1"><a class="header-anchor" href="#集合运算" aria-hidden="true">#</a> 集合运算</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 用户1的自选股</span>
SADD user:1:watchlist <span class="token number">600519</span> 000001 <span class="token number">600000</span>

<span class="token comment"># 用户2的自选股</span>
SADD user:2:watchlist <span class="token number">600519</span> <span class="token number">600036</span> <span class="token number">600000</span>

<span class="token comment"># 交集（共同自选）</span>
SINTER user:1:watchlist user:2:watchlist
<span class="token comment"># 返回：600519 600000</span>

<span class="token comment"># 并集（所有自选）</span>
SUNION user:1:watchlist user:2:watchlist

<span class="token comment"># 差集（用户1独有）</span>
SDIFF user:1:watchlist user:2:watchlist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-sorted-set-操作-排行榜" tabindex="-1"><a class="header-anchor" href="#_5-sorted-set-操作-排行榜" aria-hidden="true">#</a> 5. Sorted Set 操作（排行榜）</h3><h4 id="添加-查看排行榜" tabindex="-1"><a class="header-anchor" href="#添加-查看排行榜" aria-hidden="true">#</a> 添加/查看排行榜</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加股票热度</span>
ZADD hot:stocks <span class="token number">9999</span> <span class="token number">600519</span> <span class="token number">8888</span> 000001 <span class="token number">7777</span> <span class="token number">600000</span>

<span class="token comment"># 查看热度最高的前3名（降序）</span>
ZREVRANGE hot:stocks <span class="token number">0</span> <span class="token number">2</span> WITHSCORES
<span class="token comment"># 返回：</span>
<span class="token comment"># 600519</span>
<span class="token comment"># 9999</span>
<span class="token comment"># 000001</span>
<span class="token comment"># 8888</span>
<span class="token comment"># 600000</span>
<span class="token comment"># 7777</span>

<span class="token comment"># 增加热度</span>
ZINCRBY hot:stocks <span class="token number">100</span> <span class="token number">600519</span>

<span class="token comment"># 获取某股票热度</span>
ZSCORE hot:stocks <span class="token number">600519</span>

<span class="token comment"># 获取排名（从0开始）</span>
ZREVRANK hot:stocks <span class="token number">600519</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实战-涨幅榜" tabindex="-1"><a class="header-anchor" href="#实战-涨幅榜" aria-hidden="true">#</a> 实战：涨幅榜</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加股票涨幅（百分比*100）</span>
ZADD gainers:today <span class="token number">650</span> <span class="token number">600519</span> <span class="token number">520</span> 000001 <span class="token parameter variable">-320</span> <span class="token number">600036</span>

<span class="token comment"># 查看涨幅前3（涨幅最高）</span>
ZREVRANGE gainers:today <span class="token number">0</span> <span class="token number">2</span> WITHSCORES

<span class="token comment"># 查看跌幅前3（涨幅最低）</span>
ZRANGE gainers:today <span class="token number">0</span> <span class="token number">2</span> WITHSCORES

<span class="token comment"># 查看涨幅在3%-10%之间的股票</span>
ZRANGEBYSCORE gainers:today <span class="token number">300</span> <span class="token number">1000</span> WITHSCORES
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="实战场景应用" tabindex="-1"><a class="header-anchor" href="#实战场景应用" aria-hidden="true">#</a> 实战场景应用</h2><h3 id="场景1-实时行情缓存" tabindex="-1"><a class="header-anchor" href="#场景1-实时行情缓存" aria-hidden="true">#</a> 场景1：实时行情缓存</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Python数据服务获取行情后存入Redis</span>
HMSET stock:600519:realtime <span class="token punctuation">\\</span>
    symbol <span class="token number">600519</span> <span class="token punctuation">\\</span>
    name 贵州茅台 <span class="token punctuation">\\</span>
    price <span class="token number">1680.00</span> <span class="token punctuation">\\</span>
    change <span class="token number">10.00</span> <span class="token punctuation">\\</span>
    change_pct <span class="token number">0.60</span> <span class="token punctuation">\\</span>
    volume <span class="token number">50000</span> <span class="token punctuation">\\</span>
    timestamp <span class="token number">1728374400</span>

<span class="token comment"># 设置1分钟过期</span>
EXPIRE stock:600519:realtime <span class="token number">60</span>

<span class="token comment"># 前端/后端从Redis读取</span>
HGETALL stock:600519:realtime
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="场景2-用户登录session" tabindex="-1"><a class="header-anchor" href="#场景2-用户登录session" aria-hidden="true">#</a> 场景2：用户登录Session</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 用户登录后生成Token</span>
SET session:abc123def456 <span class="token number">1</span> EX <span class="token number">3600</span>  <span class="token comment"># 用户ID=1，1小时过期</span>

<span class="token comment"># 验证Token</span>
GET session:abc123def456

<span class="token comment"># 延长过期时间</span>
EXPIRE session:abc123def456 <span class="token number">3600</span>

<span class="token comment"># 退出登录</span>
DEL session:abc123def456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="场景3-限流-防止频繁下单" tabindex="-1"><a class="header-anchor" href="#场景3-限流-防止频繁下单" aria-hidden="true">#</a> 场景3：限流（防止频繁下单）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 记录用户下单次数（1分钟内最多10次）</span>
INCR rate:order:user:1
EXPIRE rate:order:user:1 <span class="token number">60</span>

<span class="token comment"># 检查是否超限</span>
GET rate:order:user:1
<span class="token comment"># 如果返回 &gt; 10，拒绝下单</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="场景4-分布式锁" tabindex="-1"><a class="header-anchor" href="#场景4-分布式锁" aria-hidden="true">#</a> 场景4：分布式锁</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 获取锁（防止重复处理订单）</span>
SET lock:order:ORD001 processing NX EX <span class="token number">10</span>
<span class="token comment"># NX: 不存在才设置（原子操作）</span>
<span class="token comment"># EX 10: 10秒后自动释放</span>

<span class="token comment"># 如果返回OK，表示获取锁成功</span>
<span class="token comment"># 如果返回nil，表示锁被占用</span>

<span class="token comment"># 处理完成后释放锁</span>
DEL lock:order:ORD001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="场景5-最近访问记录" tabindex="-1"><a class="header-anchor" href="#场景5-最近访问记录" aria-hidden="true">#</a> 场景5：最近访问记录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 用户访问股票详情页</span>
LPUSH user:1:recent_view <span class="token number">600519</span>
LTRIM user:1:recent_view <span class="token number">0</span> <span class="token number">9</span>  <span class="token comment"># 只保留最近10条</span>

<span class="token comment"># 获取最近浏览记录</span>
LRANGE user:1:recent_view <span class="token number">0</span> <span class="token number">9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="高级功能" tabindex="-1"><a class="header-anchor" href="#高级功能" aria-hidden="true">#</a> 高级功能</h2><h3 id="_1-发布-订阅-实时推送" tabindex="-1"><a class="header-anchor" href="#_1-发布-订阅-实时推送" aria-hidden="true">#</a> 1. 发布/订阅（实时推送）</h3><p><strong>终端1</strong>（订阅者）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> quant-redis redis-cli <span class="token parameter variable">-a</span> redis123456

<span class="token comment"># 订阅实时行情频道</span>
SUBSCRIBE channel:stock:realtime
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>终端2</strong>（发布者）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> quant-redis redis-cli <span class="token parameter variable">-a</span> redis123456

<span class="token comment"># 发布消息</span>
PUBLISH channel:stock:realtime <span class="token string">&#39;{&quot;symbol&quot;:&quot;600519&quot;,&quot;price&quot;:1680}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>终端1</strong> 会立即收到消息！</p><h3 id="_2-事务-批量操作" tabindex="-1"><a class="header-anchor" href="#_2-事务-批量操作" aria-hidden="true">#</a> 2. 事务（批量操作）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开始事务</span>
MULTI

<span class="token comment"># 添加命令到队列</span>
SET user:1:balance <span class="token number">100000</span>
DECRBY user:1:balance <span class="token number">50000</span>
INCRBY user:1:frozen <span class="token number">50000</span>

<span class="token comment"># 执行所有命令</span>
EXEC

<span class="token comment"># 如果取消事务</span>
<span class="token comment"># DISCARD</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-管道-批量执行提升性能" tabindex="-1"><a class="header-anchor" href="#_3-管道-批量执行提升性能" aria-hidden="true">#</a> 3. 管道（批量执行提升性能）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用管道一次性执行多条命令</span>
redis-cli <span class="token parameter variable">-a</span> redis123456 <span class="token parameter variable">--pipe</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF
SET stock:600519 1680
SET stock:000001 10.52
SET stock:600000 8.95
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="数据持久化" tabindex="-1"><a class="header-anchor" href="#数据持久化" aria-hidden="true">#</a> 数据持久化</h2><h3 id="_1-rdb-快照" tabindex="-1"><a class="header-anchor" href="#_1-rdb-快照" aria-hidden="true">#</a> 1. RDB（快照）</h3><p>定期保存内存快照到磁盘</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 立即保存快照</span>
SAVE

<span class="token comment"># 后台保存快照</span>
BGSAVE

<span class="token comment"># 查看最后保存时间</span>
LASTSAVE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-aof-追加日志" tabindex="-1"><a class="header-anchor" href="#_2-aof-追加日志" aria-hidden="true">#</a> 2. AOF（追加日志）</h3><p>记录每个写操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看AOF配置</span>
CONFIG GET appendonly
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="性能监控" tabindex="-1"><a class="header-anchor" href="#性能监控" aria-hidden="true">#</a> 性能监控</h2><h3 id="_1-查看redis信息" tabindex="-1"><a class="header-anchor" href="#_1-查看redis信息" aria-hidden="true">#</a> 1. 查看Redis信息</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看所有信息</span>
INFO

<span class="token comment"># 查看内存使用</span>
INFO memory

<span class="token comment"># 查看统计信息</span>
INFO stats

<span class="token comment"># 查看客户端连接</span>
INFO clients
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-监控实时命令" tabindex="-1"><a class="header-anchor" href="#_2-监控实时命令" aria-hidden="true">#</a> 2. 监控实时命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 实时显示所有执行的命令</span>
MONITOR
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-查看慢查询" tabindex="-1"><a class="header-anchor" href="#_3-查看慢查询" aria-hidden="true">#</a> 3. 查看慢查询</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看慢查询日志</span>
SLOWLOG GET <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="常用命令速查表" tabindex="-1"><a class="header-anchor" href="#常用命令速查表" aria-hidden="true">#</a> 常用命令速查表</h2><table><thead><tr><th>功能</th><th>命令</th><th>示例</th></tr></thead><tbody><tr><td><strong>通用</strong></td><td></td><td></td></tr><tr><td>设置键值</td><td><code>SET key value</code></td><td><code>SET stock:600519 1680</code></td></tr><tr><td>获取值</td><td><code>GET key</code></td><td><code>GET stock:600519</code></td></tr><tr><td>删除键</td><td><code>DEL key</code></td><td><code>DEL stock:600519</code></td></tr><tr><td>检查存在</td><td><code>EXISTS key</code></td><td><code>EXISTS stock:600519</code></td></tr><tr><td>设置过期</td><td><code>EXPIRE key seconds</code></td><td><code>EXPIRE stock:600519 60</code></td></tr><tr><td>查看过期时间</td><td><code>TTL key</code></td><td><code>TTL stock:600519</code></td></tr><tr><td>查看所有键</td><td><code>KEYS pattern</code></td><td><code>KEYS stock:*</code></td></tr><tr><td><strong>String</strong></td><td></td><td></td></tr><tr><td>自增</td><td><code>INCR key</code></td><td><code>INCR user:1:count</code></td></tr><tr><td>增加N</td><td><code>INCRBY key n</code></td><td><code>INCRBY user:1:balance 1000</code></td></tr><tr><td>自减</td><td><code>DECR key</code></td><td><code>DECR user:1:count</code></td></tr><tr><td><strong>Hash</strong></td><td></td><td></td></tr><tr><td>设置字段</td><td><code>HSET key field value</code></td><td><code>HSET user:1 name test</code></td></tr><tr><td>获取字段</td><td><code>HGET key field</code></td><td><code>HGET user:1 name</code></td></tr><tr><td>获取所有</td><td><code>HGETALL key</code></td><td><code>HGETALL user:1</code></td></tr><tr><td><strong>List</strong></td><td></td><td></td></tr><tr><td>左插入</td><td><code>LPUSH key value</code></td><td><code>LPUSH queue:order ORD001</code></td></tr><tr><td>右插入</td><td><code>RPUSH key value</code></td><td><code>RPUSH queue:order ORD001</code></td></tr><tr><td>左弹出</td><td><code>LPOP key</code></td><td><code>LPOP queue:order</code></td></tr><tr><td>右弹出</td><td><code>RPOP key</code></td><td><code>RPOP queue:order</code></td></tr><tr><td>查看范围</td><td><code>LRANGE key start stop</code></td><td><code>LRANGE queue:order 0 -1</code></td></tr><tr><td><strong>Set</strong></td><td></td><td></td></tr><tr><td>添加成员</td><td><code>SADD key member</code></td><td><code>SADD watchlist 600519</code></td></tr><tr><td>查看所有</td><td><code>SMEMBERS key</code></td><td><code>SMEMBERS watchlist</code></td></tr><tr><td>判断存在</td><td><code>SISMEMBER key member</code></td><td><code>SISMEMBER watchlist 600519</code></td></tr><tr><td><strong>Sorted Set</strong></td><td></td><td></td></tr><tr><td>添加成员</td><td><code>ZADD key score member</code></td><td><code>ZADD hot:stocks 9999 600519</code></td></tr><tr><td>降序查看</td><td><code>ZREVRANGE key start stop</code></td><td><code>ZREVRANGE hot:stocks 0 9</code></td></tr><tr><td>获取分数</td><td><code>ZSCORE key member</code></td><td><code>ZSCORE hot:stocks 600519</code></td></tr></tbody></table><hr><h2 id="docker-配置说明" tabindex="-1"><a class="header-anchor" href="#docker-配置说明" aria-hidden="true">#</a> Docker 配置说明</h2><h3 id="docker-compose-yml-解析" tabindex="-1"><a class="header-anchor" href="#docker-compose-yml-解析" aria-hidden="true">#</a> docker-compose.yml 解析</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">redis</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>7<span class="token punctuation">-</span>alpine
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">&quot;6379:6379&quot;</span>
  <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>requirepass redis123456  <span class="token comment"># 设置密码</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> redis<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/data  <span class="token comment"># 数据持久化</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="连接方式" tabindex="-1"><a class="header-anchor" href="#连接方式" aria-hidden="true">#</a> 连接方式</h3><table><thead><tr><th>场景</th><th>地址</th><th>密码</th></tr></thead><tbody><tr><td>容器内访问</td><td><code>redis:6379</code></td><td><code>redis123456</code></td></tr><tr><td>宿主机访问</td><td><code>localhost:6379</code></td><td><code>redis123456</code></td></tr></tbody></table><hr><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h2><h3 id="q1-如何查看redis内存使用" tabindex="-1"><a class="header-anchor" href="#q1-如何查看redis内存使用" aria-hidden="true">#</a> Q1: 如何查看Redis内存使用？</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> quant-redis redis-cli <span class="token parameter variable">-a</span> redis123456 INFO memory <span class="token operator">|</span> <span class="token function">grep</span> used_memory_human
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="q2-如何清空所有数据" tabindex="-1"><a class="header-anchor" href="#q2-如何清空所有数据" aria-hidden="true">#</a> Q2: 如何清空所有数据？</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 清空当前数据库</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> quant-redis redis-cli <span class="token parameter variable">-a</span> redis123456 FLUSHDB

<span class="token comment"># 清空所有数据库</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> quant-redis redis-cli <span class="token parameter variable">-a</span> redis123456 FLUSHALL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="q3-如何查看所有键" tabindex="-1"><a class="header-anchor" href="#q3-如何查看所有键" aria-hidden="true">#</a> Q3: 如何查看所有键？</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看所有键（⚠️ 生产环境慎用）</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> quant-redis redis-cli <span class="token parameter variable">-a</span> redis123456 KEYS <span class="token string">&#39;*&#39;</span>

<span class="token comment"># 更安全的方式：扫描</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> quant-redis redis-cli <span class="token parameter variable">-a</span> redis123456 SCAN <span class="token number">0</span> MATCH stock:* COUNT <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="q4-redis数据会丢失吗" tabindex="-1"><a class="header-anchor" href="#q4-redis数据会丢失吗" aria-hidden="true">#</a> Q4: Redis数据会丢失吗？</h3><p>通过Docker volume持久化，容器重启数据不会丢失。但如果执行<code>docker compose down -v</code>会删除数据。</p><hr><h2 id="在项目中的实际应用" tabindex="-1"><a class="header-anchor" href="#在项目中的实际应用" aria-hidden="true">#</a> 在项目中的实际应用</h2><h3 id="应用1-java-spring-boot-连接" tabindex="-1"><a class="header-anchor" href="#应用1-java-spring-boot-连接" aria-hidden="true">#</a> 应用1：Java Spring Boot 连接</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// application.yml</span>
spring<span class="token operator">:</span>
  redis<span class="token operator">:</span>
    host<span class="token operator">:</span> localhost
    port<span class="token operator">:</span> <span class="token number">6379</span>
    password<span class="token operator">:</span> redis123456
    database<span class="token operator">:</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">;</span>

<span class="token comment">// 缓存股票价格</span>
redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;stock:600519:price&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1680.00&quot;</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取价格</span>
<span class="token class-name">String</span> price <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;stock:600519:price&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用2-python-连接" tabindex="-1"><a class="header-anchor" href="#应用2-python-连接" aria-hidden="true">#</a> 应用2：Python 连接</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> redis

r <span class="token operator">=</span> redis<span class="token punctuation">.</span>Redis<span class="token punctuation">(</span>
    host<span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>
    port<span class="token operator">=</span><span class="token number">6379</span><span class="token punctuation">,</span>
    password<span class="token operator">=</span><span class="token string">&#39;redis123456&#39;</span><span class="token punctuation">,</span>
    decode_responses<span class="token operator">=</span><span class="token boolean">True</span>
<span class="token punctuation">)</span>

<span class="token comment"># 缓存股票价格</span>
r<span class="token punctuation">.</span>setex<span class="token punctuation">(</span><span class="token string">&#39;stock:600519:price&#39;</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token string">&#39;1680.00&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 获取价格</span>
price <span class="token operator">=</span> r<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;stock:600519:price&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用3-实时行情推送-spring-redis" tabindex="-1"><a class="header-anchor" href="#应用3-实时行情推送-spring-redis" aria-hidden="true">#</a> 应用3：实时行情推送（Spring + Redis）</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StockRealtimeService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">;</span>

    <span class="token comment">// 缓存实时行情</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">cacheRealtime</span><span class="token punctuation">(</span><span class="token class-name">String</span> symbol<span class="token punctuation">,</span> <span class="token class-name">StockRealtime</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;stock:&quot;</span> <span class="token operator">+</span> symbol <span class="token operator">+</span> <span class="token string">&quot;:realtime&quot;</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">beanToMap</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取实时行情</span>
    <span class="token keyword">public</span> <span class="token class-name">StockRealtime</span> <span class="token function">getRealtime</span><span class="token punctuation">(</span><span class="token class-name">String</span> symbol<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token string">&quot;stock:&quot;</span> <span class="token operator">+</span> symbol <span class="token operator">+</span> <span class="token string">&quot;:realtime&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">mapToBean</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> <span class="token class-name">StockRealtime</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="性能优化建议" tabindex="-1"><a class="header-anchor" href="#性能优化建议" aria-hidden="true">#</a> 性能优化建议</h2><ol><li><p><strong>合理设置过期时间</strong></p><ul><li>实时行情：60秒</li><li>Session：1小时</li><li>技术指标：5分钟</li></ul></li><li><p><strong>使用批量操作</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 不推荐：多次单独操作</span>
SET stock:600519 <span class="token number">1680</span>
SET stock:000001 <span class="token number">10.52</span>

<span class="token comment"># 推荐：批量操作</span>
MSET stock:600519 <span class="token number">1680</span> stock:000001 <span class="token number">10.52</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>避免使用KEYS命令</strong> 生产环境用<code>SCAN</code>替代<code>KEYS *</code></p></li><li><p><strong>使用连接池</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// Spring Boot 自动配置连接池</span>
spring<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>lettuce<span class="token punctuation">.</span>pool<span class="token punctuation">.</span>max<span class="token operator">-</span>active<span class="token operator">=</span><span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><hr><h2 id="下一步学习" tabindex="-1"><a class="header-anchor" href="#下一步学习" aria-hidden="true">#</a> 下一步学习</h2><ol><li>✅ 完成所有实战练习</li><li>🔐 学习Redis高级特性（持久化、主从复制）</li><li>🚀 实践Redis在实际项目中的应用</li><li>📊 监控Redis性能指标</li></ol><hr><h2 id="参考资源" tabindex="-1"><a class="header-anchor" href="#参考资源" aria-hidden="true">#</a> 参考资源</h2>`,150),p={href:"https://redis.io/documentation",target:"_blank",rel:"noopener noreferrer"},u={href:"https://redis.io/commands",target:"_blank",rel:"noopener noreferrer"},m={href:"http://www.redis.cn/",target:"_blank",rel:"noopener noreferrer"},v=n("hr",null,null,-1),b=n("p",null,[n("strong",null,"提示"),s("：Redis非常适合做缓存，但不要把它当成主数据库使用！重要数据还是要存MySQL。")],-1);function h(k,g){const a=d("ExternalLinkIcon");return t(),l("div",null,[o,n("ul",null,[n("li",null,[n("a",p,[s("Redis 官方文档"),e(a)])]),n("li",null,[n("a",u,[s("Redis 命令参考"),e(a)])]),n("li",null,[n("a",m,[s("Redis 中文教程"),e(a)])])]),v,b])}const S=i(r,[["render",h],["__file","Redis教程.html.vue"]]);export{S as default};
