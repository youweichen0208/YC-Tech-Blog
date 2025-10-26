import{_ as a,o as s,c as n,e}from"./app-Z_B6pOHV.js";const i={},l=e(`<h1 id="量化交易平台部署文档" tabindex="-1"><a class="header-anchor" href="#量化交易平台部署文档" aria-hidden="true">#</a> 量化交易平台部署文档</h1><h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2><ul><li><a href="#%E7%B3%BB%E7%BB%9F%E8%A6%81%E6%B1%82">系统要求</a></li><li><a href="#%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E9%83%A8%E7%BD%B2">生产环境部署</a></li><li><a href="#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E9%85%8D%E7%BD%AE">性能优化配置</a></li><li><a href="#%E7%9B%91%E6%8E%A7%E4%B8%8E%E6%97%A5%E5%BF%97">监控与日志</a></li><li><a href="#%E8%BF%90%E7%BB%B4%E6%8C%87%E5%8D%97">运维指南</a></li><li><a href="#%E6%95%85%E9%9A%9C%E6%8E%92%E6%9F%A5">故障排查</a></li></ul><h2 id="系统要求" tabindex="-1"><a class="header-anchor" href="#系统要求" aria-hidden="true">#</a> 系统要求</h2><h3 id="最低配置" tabindex="-1"><a class="header-anchor" href="#最低配置" aria-hidden="true">#</a> 最低配置</h3><ul><li>CPU: 4核</li><li>内存: 8GB</li><li>硬盘: 50GB SSD</li><li>操作系统: Linux (Ubuntu 20.04+ / CentOS 7+)</li><li>Docker: 20.10+</li><li>Docker Compose: 2.0+</li></ul><h3 id="推荐配置" tabindex="-1"><a class="header-anchor" href="#推荐配置" aria-hidden="true">#</a> 推荐配置</h3><ul><li>CPU: 8核</li><li>内存: 16GB</li><li>硬盘: 100GB SSD</li><li>网络: 100Mbps+</li></ul><h2 id="生产环境部署" tabindex="-1"><a class="header-anchor" href="#生产环境部署" aria-hidden="true">#</a> 生产环境部署</h2><h3 id="_1-准备工作" tabindex="-1"><a class="header-anchor" href="#_1-准备工作" aria-hidden="true">#</a> 1. 准备工作</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 克隆代码</span>
<span class="token function">git</span> clone <span class="token operator">&lt;</span>repository-url<span class="token operator">&gt;</span>
<span class="token builtin class-name">cd</span> quant-trading-platform

<span class="token comment"># 创建数据目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> data/<span class="token punctuation">{</span>mysql,redis,zookeeper,kafka,market-data<span class="token punctuation">}</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> logs/<span class="token punctuation">{</span>nginx,market-data<span class="token punctuation">}</span>

<span class="token comment"># 配置环境变量</span>
<span class="token function">cp</span> .env.prod.example .env.prod
<span class="token function">vim</span> .env.prod  <span class="token comment"># 修改为实际的密码和配置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-环境变量配置" tabindex="-1"><a class="header-anchor" href="#_2-环境变量配置" aria-hidden="true">#</a> 2. 环境变量配置</h3><p>编辑 <code>.env.prod</code> 文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># MySQL配置 - 使用强密码</span>
<span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>YourSecurePassword123<span class="token operator">!</span>@<span class="token comment">#</span>

<span class="token comment"># Redis配置 - 使用强密码</span>
<span class="token assign-left variable">REDIS_PASSWORD</span><span class="token operator">=</span>YourSecureRedisPassword456<span class="token operator">!</span>@<span class="token comment">#</span>

<span class="token comment"># JWT密钥 - 至少32字符</span>
<span class="token assign-left variable">JWT_SECRET</span><span class="token operator">=</span>your_jwt_secret_key_at_least_32_characters_long_here

<span class="token comment"># Tushare Token - 从tushare官网获取</span>
<span class="token assign-left variable">TUSHARE_TOKEN</span><span class="token operator">=</span>your_tushare_token_from_tushare_pro_website
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-启动服务" tabindex="-1"><a class="header-anchor" href="#_3-启动服务" aria-hidden="true">#</a> 3. 启动服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用生产环境配置启动</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml --env-file .env.prod up <span class="token parameter variable">-d</span>

<span class="token comment"># 查看服务状态</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml <span class="token function">ps</span>

<span class="token comment"># 查看日志</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml logs <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-验证部署" tabindex="-1"><a class="header-anchor" href="#_4-验证部署" aria-hidden="true">#</a> 4. 验证部署</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查MySQL</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-mysql-prod mysql <span class="token parameter variable">-uroot</span> -p<span class="token variable">\${MYSQL_ROOT_PASSWORD}</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;SHOW DATABASES;&quot;</span>

<span class="token comment"># 检查Redis</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-redis-prod redis-cli <span class="token parameter variable">-a</span> <span class="token variable">\${REDIS_PASSWORD}</span> <span class="token function">ping</span>

<span class="token comment"># 检查Kafka</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-kafka-prod kafka-topics --bootstrap-server localhost:9092 <span class="token parameter variable">--list</span>

<span class="token comment"># 访问前端</span>
<span class="token function">curl</span> http://localhost

<span class="token comment"># 检查后端API</span>
<span class="token function">curl</span> http://localhost:8081/actuator/health
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="性能优化配置" tabindex="-1"><a class="header-anchor" href="#性能优化配置" aria-hidden="true">#</a> 性能优化配置</h2><h3 id="mysql优化" tabindex="-1"><a class="header-anchor" href="#mysql优化" aria-hidden="true">#</a> MySQL优化</h3><p>生产环境MySQL配置已包含以下优化：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># docker-compose.prod.yml 中的配置</span>
<span class="token punctuation">-</span><span class="token punctuation">-</span>max_connections=1000           <span class="token comment"># 最大连接数</span>
<span class="token punctuation">-</span><span class="token punctuation">-</span>innodb_buffer_pool_size=1G     <span class="token comment"># InnoDB缓冲池大小</span>
<span class="token punctuation">-</span><span class="token punctuation">-</span>character<span class="token punctuation">-</span>set<span class="token punctuation">-</span>server=utf8mb4   <span class="token comment"># 字符集</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redis优化" tabindex="-1"><a class="header-anchor" href="#redis优化" aria-hidden="true">#</a> Redis优化</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># Redis配置优化</span>
<span class="token punctuation">-</span><span class="token punctuation">-</span>maxmemory 512mb                 <span class="token comment"># 最大内存</span>
<span class="token punctuation">-</span><span class="token punctuation">-</span>maxmemory<span class="token punctuation">-</span>policy allkeys<span class="token punctuation">-</span>lru    <span class="token comment"># 内存淘汰策略</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kafka优化" tabindex="-1"><a class="header-anchor" href="#kafka优化" aria-hidden="true">#</a> Kafka优化</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">KAFKA_LOG_RETENTION_HOURS</span><span class="token punctuation">:</span> <span class="token number">168</span>         <span class="token comment"># 日志保留7天</span>
<span class="token key atrule">KAFKA_LOG_SEGMENT_BYTES</span><span class="token punctuation">:</span> <span class="token number">1073741824</span>    <span class="token comment"># 日志段大小1GB</span>
<span class="token key atrule">KAFKA_NUM_PARTITIONS</span><span class="token punctuation">:</span> <span class="token number">3</span>                <span class="token comment"># 默认分区数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jvm优化-user-service" tabindex="-1"><a class="header-anchor" href="#jvm优化-user-service" aria-hidden="true">#</a> JVM优化 (user-service)</h3><p>Dockerfile中已配置：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>-XX:MaxRAMPercentage=75.0    # 使用容器75%内存
-XX:+UseG1GC                 # 使用G1垃圾收集器
-XX:+UseContainerSupport     # 容器支持
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="监控与日志" tabindex="-1"><a class="header-anchor" href="#监控与日志" aria-hidden="true">#</a> 监控与日志</h2><h3 id="日志位置" tabindex="-1"><a class="header-anchor" href="#日志位置" aria-hidden="true">#</a> 日志位置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>logs/
├── nginx/          # Nginx访问日志和错误日志
└── market-data/    # 市场数据服务日志
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看实时日志" tabindex="-1"><a class="header-anchor" href="#查看实时日志" aria-hidden="true">#</a> 查看实时日志</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看所有服务日志</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml logs <span class="token parameter variable">-f</span>

<span class="token comment"># 查看特定服务日志</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml logs <span class="token parameter variable">-f</span> user-service
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml logs <span class="token parameter variable">-f</span> market-data-service

<span class="token comment"># 查看最近100行日志</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml logs <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">100</span> user-service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="健康检查" tabindex="-1"><a class="header-anchor" href="#健康检查" aria-hidden="true">#</a> 健康检查</h3><p>所有服务都配置了健康检查：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看服务健康状态</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml <span class="token function">ps</span>

<span class="token comment"># 服务健康检查端点</span>
- MySQL: mysqladmin <span class="token function">ping</span>
- Redis: redis-cli <span class="token function">ping</span>
- Zookeeper: zkServer.sh status
- Kafka: kafka-broker-api-versions
- User Service: http://localhost:8081/actuator/health
- Web Frontend: http://localhost:80
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运维指南" tabindex="-1"><a class="header-anchor" href="#运维指南" aria-hidden="true">#</a> 运维指南</h2><h3 id="服务管理" tabindex="-1"><a class="header-anchor" href="#服务管理" aria-hidden="true">#</a> 服务管理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动所有服务</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span>

<span class="token comment"># 停止所有服务</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml stop

<span class="token comment"># 重启特定服务</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml restart user-service

<span class="token comment"># 停止并删除所有容器</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml down

<span class="token comment"># 停止并删除所有容器和数据卷（危险操作！）</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml down <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据备份" tabindex="-1"><a class="header-anchor" href="#数据备份" aria-hidden="true">#</a> 数据备份</h3><h4 id="mysql备份" tabindex="-1"><a class="header-anchor" href="#mysql备份" aria-hidden="true">#</a> MySQL备份</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 备份数据库</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-mysql-prod mysqldump <span class="token parameter variable">-uroot</span> -p<span class="token variable">\${MYSQL_ROOT_PASSWORD}</span> <span class="token punctuation">\\</span>
  quant_trading <span class="token operator">&gt;</span> backup_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d_%H%M%S<span class="token variable">)</span></span>.sql

<span class="token comment"># 恢复数据库</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-i</span> quant-mysql-prod mysql <span class="token parameter variable">-uroot</span> -p<span class="token variable">\${MYSQL_ROOT_PASSWORD}</span> <span class="token punctuation">\\</span>
  quant_trading <span class="token operator">&lt;</span> backup_20231210_120000.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="redis备份" tabindex="-1"><a class="header-anchor" href="#redis备份" aria-hidden="true">#</a> Redis备份</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Redis会自动创建RDB快照在 data/redis/dump.rdb</span>

<span class="token comment"># 手动触发备份</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-redis-prod redis-cli <span class="token parameter variable">-a</span> <span class="token variable">\${REDIS_PASSWORD}</span> BGSAVE

<span class="token comment"># 复制备份文件</span>
<span class="token function">cp</span> data/redis/dump.rdb backup/redis_backup_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d<span class="token variable">)</span></span>.rdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新部署" tabindex="-1"><a class="header-anchor" href="#更新部署" aria-hidden="true">#</a> 更新部署</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 拉取最新代码</span>
<span class="token function">git</span> pull

<span class="token comment"># 重新构建并启动</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span> <span class="token parameter variable">--build</span>

<span class="token comment"># 或者分步骤：</span>
<span class="token comment"># 1. 构建镜像</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml build

<span class="token comment"># 2. 停止旧容器</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml stop

<span class="token comment"># 3. 启动新容器</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩容" tabindex="-1"><a class="header-anchor" href="#扩容" aria-hidden="true">#</a> 扩容</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 扩展user-service实例</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span> <span class="token parameter variable">--scale</span> user-service<span class="token operator">=</span><span class="token number">3</span>

<span class="token comment"># 扩展market-data-service实例</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span> <span class="token parameter variable">--scale</span> market-data-service<span class="token operator">=</span><span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="故障排查" tabindex="-1"><a class="header-anchor" href="#故障排查" aria-hidden="true">#</a> 故障排查</h2><h3 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h3><h4 id="_1-服务启动失败" tabindex="-1"><a class="header-anchor" href="#_1-服务启动失败" aria-hidden="true">#</a> 1. 服务启动失败</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看服务日志</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml logs service-name

<span class="token comment"># 查看容器状态</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>

<span class="token comment"># 进入容器排查</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> container-name <span class="token function">sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-数据库连接失败" tabindex="-1"><a class="header-anchor" href="#_2-数据库连接失败" aria-hidden="true">#</a> 2. 数据库连接失败</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查MySQL是否正常运行</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml <span class="token function">ps</span> mysql

<span class="token comment"># 检查MySQL日志</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml logs mysql

<span class="token comment"># 测试连接</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-mysql-prod mysql <span class="token parameter variable">-uroot</span> -p<span class="token variable">\${MYSQL_ROOT_PASSWORD}</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;SELECT 1;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-redis连接失败" tabindex="-1"><a class="header-anchor" href="#_3-redis连接失败" aria-hidden="true">#</a> 3. Redis连接失败</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查Redis状态</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml <span class="token function">ps</span> redis

<span class="token comment"># 测试连接</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-redis-prod redis-cli <span class="token parameter variable">-a</span> <span class="token variable">\${REDIS_PASSWORD}</span> <span class="token function">ping</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-kafka连接失败" tabindex="-1"><a class="header-anchor" href="#_4-kafka连接失败" aria-hidden="true">#</a> 4. Kafka连接失败</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查Zookeeper</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml logs zookeeper

<span class="token comment"># 检查Kafka</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml logs kafka

<span class="token comment"># 查看Topics</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-kafka-prod kafka-topics --bootstrap-server localhost:9092 <span class="token parameter variable">--list</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-内存不足" tabindex="-1"><a class="header-anchor" href="#_5-内存不足" aria-hidden="true">#</a> 5. 内存不足</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看容器资源使用</span>
<span class="token function">docker</span> stats

<span class="token comment"># 调整服务内存限制（在docker-compose.prod.yml中）</span>
services:
  user-service:
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 1G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-磁盘空间不足" tabindex="-1"><a class="header-anchor" href="#_6-磁盘空间不足" aria-hidden="true">#</a> 6. 磁盘空间不足</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看磁盘使用</span>
<span class="token function">df</span> <span class="token parameter variable">-h</span>

<span class="token comment"># 清理Docker未使用的资源</span>
<span class="token function">docker</span> system prune <span class="token parameter variable">-a</span>

<span class="token comment"># 清理日志文件</span>
<span class="token function">find</span> logs/ <span class="token parameter variable">-name</span> <span class="token string">&quot;*.log&quot;</span> <span class="token parameter variable">-mtime</span> +7 <span class="token parameter variable">-delete</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="性能监控" tabindex="-1"><a class="header-anchor" href="#性能监控" aria-hidden="true">#</a> 性能监控</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看容器资源使用情况</span>
<span class="token function">docker</span> stats

<span class="token comment"># 查看特定容器的资源使用</span>
<span class="token function">docker</span> stats quant-user-service-prod quant-mysql-prod

<span class="token comment"># 查看网络连接</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> quant-user-service-prod <span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">grep</span> ESTABLISHED
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安全建议" tabindex="-1"><a class="header-anchor" href="#安全建议" aria-hidden="true">#</a> 安全建议</h3><ol><li><p><strong>修改默认密码</strong></p><ul><li>修改.env.prod中所有密码为强密码</li><li>定期更换密码</li></ul></li><li><p><strong>网络安全</strong></p><ul><li>仅暴露必要的端口</li><li>使用防火墙限制访问</li><li>考虑使用VPN或内网</li></ul></li><li><p><strong>SSL/TLS</strong></p><ul><li>生产环境建议配置HTTPS</li><li>使用Let&#39;s Encrypt获取免费证书</li></ul></li><li><p><strong>数据备份</strong></p><ul><li>设置自动备份任务</li><li>异地备份重要数据</li><li>定期测试恢复流程</li></ul></li><li><p><strong>日志管理</strong></p><ul><li>定期清理旧日志</li><li>考虑使用日志收集系统（ELK）</li></ul></li></ol><h2 id="性能调优建议" tabindex="-1"><a class="header-anchor" href="#性能调优建议" aria-hidden="true">#</a> 性能调优建议</h2><h3 id="数据库优化" tabindex="-1"><a class="header-anchor" href="#数据库优化" aria-hidden="true">#</a> 数据库优化</h3><ul><li>定期分析慢查询日志</li><li>添加适当的索引</li><li>考虑分表分库策略</li></ul><h3 id="redis优化-1" tabindex="-1"><a class="header-anchor" href="#redis优化-1" aria-hidden="true">#</a> Redis优化</h3><ul><li>合理设置过期时间</li><li>避免大key</li><li>使用连接池</li></ul><h3 id="kafka优化-1" tabindex="-1"><a class="header-anchor" href="#kafka优化-1" aria-hidden="true">#</a> Kafka优化</h3><ul><li>调整分区数量</li><li>配置合适的副本因子</li><li>监控消费延迟</li></ul><h3 id="应用优化" tabindex="-1"><a class="header-anchor" href="#应用优化" aria-hidden="true">#</a> 应用优化</h3><ul><li>启用JVM参数优化</li><li>使用连接池</li><li>实施缓存策略</li><li>异步处理耗时操作</li></ul><h2 id="联系支持" tabindex="-1"><a class="header-anchor" href="#联系支持" aria-hidden="true">#</a> 联系支持</h2><p>如遇到问题，请：</p><ol><li>查看日志文件</li><li>检查服务健康状态</li><li>参考故障排查章节</li><li>提交Issue到项目仓库</li></ol>`,79),r=[l];function c(d,o){return s(),n("div",null,r)}const t=a(i,[["render",c],["__file","DEPLOYMENT.html.vue"]]);export{t as default};
