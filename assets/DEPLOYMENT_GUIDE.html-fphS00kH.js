import{_ as n,o as s,c as a,e}from"./app-2H8C6pDE.js";const t={},i=e(`<h1 id="部署指南" tabindex="-1"><a class="header-anchor" href="#部署指南" aria-hidden="true">#</a> 部署指南</h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>WeQuant 量化交易平台的完整部署指南，包含开发环境、测试环境和生产环境的部署方案。</p><h2 id="🔧-系统要求" tabindex="-1"><a class="header-anchor" href="#🔧-系统要求" aria-hidden="true">#</a> 🔧 系统要求</h2><h3 id="硬件要求" tabindex="-1"><a class="header-anchor" href="#硬件要求" aria-hidden="true">#</a> 硬件要求</h3><table><thead><tr><th>环境</th><th>CPU</th><th>内存</th><th>存储</th><th>网络</th></tr></thead><tbody><tr><td>开发环境</td><td>2核+</td><td>8GB+</td><td>50GB+</td><td>宽带</td></tr><tr><td>测试环境</td><td>4核+</td><td>16GB+</td><td>100GB+</td><td>100Mbps+</td></tr><tr><td>生产环境</td><td>8核+</td><td>32GB+</td><td>500GB+</td><td>1Gbps+</td></tr></tbody></table><h3 id="软件依赖" tabindex="-1"><a class="header-anchor" href="#软件依赖" aria-hidden="true">#</a> 软件依赖</h3><ul><li><strong>操作系统</strong>: Linux (Ubuntu 20.04+) / macOS / Windows 10+</li><li><strong>Docker</strong>: 20.10+</li><li><strong>Docker Compose</strong>: 1.29+</li><li><strong>Java</strong>: JDK 17+</li><li><strong>Python</strong>: 3.9+</li><li><strong>Node.js</strong>: 18+</li><li><strong>Maven</strong>: 3.8+</li><li><strong>Git</strong>: 2.30+</li></ul><hr><h2 id="🚀-快速开始" tabindex="-1"><a class="header-anchor" href="#🚀-快速开始" aria-hidden="true">#</a> 🚀 快速开始</h2><h3 id="_1-克隆项目" tabindex="-1"><a class="header-anchor" href="#_1-克隆项目" aria-hidden="true">#</a> 1. 克隆项目</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/youweichen0208/WeQuant.git
<span class="token builtin class-name">cd</span> WeQuant
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-环境准备" tabindex="-1"><a class="header-anchor" href="#_2-环境准备" aria-hidden="true">#</a> 2. 环境准备</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 Docker 和 Docker Compose</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://get.docker.com <span class="token parameter variable">-o</span> get-docker.sh
<span class="token function">sudo</span> <span class="token function">sh</span> get-docker.sh

<span class="token comment"># 启动基础设施服务</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> mysql redis kafka zookeeper

<span class="token comment"># 等待服务启动</span>
<span class="token function">sleep</span> <span class="token number">30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-启动服务" tabindex="-1"><a class="header-anchor" href="#_3-启动服务" aria-hidden="true">#</a> 3. 启动服务</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动市场数据服务 (Python)</span>
<span class="token builtin class-name">cd</span> market-data-service
pip3 <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.txt
python3 app.py <span class="token operator">&amp;</span>

<span class="token comment"># 启动模拟交易服务 (Python)</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/mock-trading-service
pip3 <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.txt
python3 app.py <span class="token operator">&amp;</span>

<span class="token comment"># 启动股票服务 (Java)</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/stock-service
mvn spring-boot:run <span class="token operator">&amp;</span>

<span class="token comment"># 启动前端服务</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/web-frontend
<span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> run dev <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-验证部署" tabindex="-1"><a class="header-anchor" href="#_4-验证部署" aria-hidden="true">#</a> 4. 验证部署</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查服务状态</span>
<span class="token function">curl</span> http://localhost:5001/api/health    <span class="token comment"># 市场数据服务</span>
<span class="token function">curl</span> http://localhost:5002/api/health    <span class="token comment"># 模拟交易服务</span>
<span class="token function">curl</span> http://localhost:8082/stock-service/api/health  <span class="token comment"># 股票服务</span>
<span class="token function">curl</span> http://localhost:3003               <span class="token comment"># 前端服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🐳-docker-容器化部署" tabindex="-1"><a class="header-anchor" href="#🐳-docker-容器化部署" aria-hidden="true">#</a> 🐳 Docker 容器化部署</h2><h3 id="完整的-docker-compose-配置" tabindex="-1"><a class="header-anchor" href="#完整的-docker-compose-配置" aria-hidden="true">#</a> 完整的 Docker Compose 配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># docker-compose.yml</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token comment"># ==================== 前端服务 ====================</span>
  <span class="token key atrule">web-frontend</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./web<span class="token punctuation">-</span>frontend
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3000:3000&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> NODE_ENV=production
      <span class="token punctuation">-</span> VUE_APP_API_BASE_URL=http<span class="token punctuation">:</span>//nginx
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> nginx
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network

  <span class="token comment"># ==================== API网关 ====================</span>
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>alpine
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;80:80&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;443:443&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./nginx/nginx.conf<span class="token punctuation">:</span>/etc/nginx/nginx.conf<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> ./nginx/ssl<span class="token punctuation">:</span>/etc/nginx/ssl<span class="token punctuation">:</span>ro
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> user<span class="token punctuation">-</span>service
      <span class="token punctuation">-</span> stock<span class="token punctuation">-</span>service
      <span class="token punctuation">-</span> trading<span class="token punctuation">-</span>service
      <span class="token punctuation">-</span> market<span class="token punctuation">-</span>data<span class="token punctuation">-</span>service
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network

  <span class="token comment"># ==================== Java 微服务 ====================</span>
  <span class="token key atrule">user-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./user<span class="token punctuation">-</span>service
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8081:8081&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SPRING_PROFILES_ACTIVE=docker
      <span class="token punctuation">-</span> DB_HOST=mysql
      <span class="token punctuation">-</span> DB_PORT=3306
      <span class="token punctuation">-</span> DB_NAME=quant_trading
      <span class="token punctuation">-</span> DB_USERNAME=root
      <span class="token punctuation">-</span> DB_PASSWORD=123456
      <span class="token punctuation">-</span> REDIS_HOST=redis
      <span class="token punctuation">-</span> REDIS_PORT=6379
      <span class="token punctuation">-</span> REDIS_PASSWORD=redis123456
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mysql
      <span class="token punctuation">-</span> redis
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token key atrule">stock-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./stock<span class="token punctuation">-</span>service
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8082:8082&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SPRING_PROFILES_ACTIVE=docker
      <span class="token punctuation">-</span> DB_HOST=mysql
      <span class="token punctuation">-</span> DB_PORT=3306
      <span class="token punctuation">-</span> DB_NAME=quant_trading
      <span class="token punctuation">-</span> DB_USERNAME=root
      <span class="token punctuation">-</span> DB_PASSWORD=123456
      <span class="token punctuation">-</span> REDIS_HOST=redis
      <span class="token punctuation">-</span> REDIS_PORT=6379
      <span class="token punctuation">-</span> REDIS_PASSWORD=redis123456
      <span class="token punctuation">-</span> MARKET_DATA_URL=http<span class="token punctuation">:</span>//market<span class="token punctuation">-</span>data<span class="token punctuation">-</span>service<span class="token punctuation">:</span><span class="token number">5001</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mysql
      <span class="token punctuation">-</span> redis
      <span class="token punctuation">-</span> market<span class="token punctuation">-</span>data<span class="token punctuation">-</span>service
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token key atrule">trading-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./trading<span class="token punctuation">-</span>service
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8083:8083&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SPRING_PROFILES_ACTIVE=docker
      <span class="token punctuation">-</span> DB_HOST=mysql
      <span class="token punctuation">-</span> DB_PORT=3306
      <span class="token punctuation">-</span> DB_NAME=quant_trading
      <span class="token punctuation">-</span> DB_USERNAME=root
      <span class="token punctuation">-</span> DB_PASSWORD=123456
      <span class="token punctuation">-</span> REDIS_HOST=redis
      <span class="token punctuation">-</span> REDIS_PORT=6379
      <span class="token punctuation">-</span> REDIS_PASSWORD=redis123456
      <span class="token punctuation">-</span> STOCK_SERVICE_URL=http<span class="token punctuation">:</span>//stock<span class="token punctuation">-</span>service<span class="token punctuation">:</span><span class="token number">8082</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mysql
      <span class="token punctuation">-</span> redis
      <span class="token punctuation">-</span> stock<span class="token punctuation">-</span>service
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># ==================== Python 服务 ====================</span>
  <span class="token key atrule">market-data-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./market<span class="token punctuation">-</span>data<span class="token punctuation">-</span>service
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;5001:5001&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> REDIS_URL=redis<span class="token punctuation">:</span>//redis<span class="token punctuation">:</span>6379/1
      <span class="token punctuation">-</span> REDIS_PASSWORD=redis123456
      <span class="token punctuation">-</span> KAFKA_BOOTSTRAP_SERVERS=kafka<span class="token punctuation">:</span><span class="token number">9092</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis
      <span class="token punctuation">-</span> kafka
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token key atrule">mock-trading-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./mock<span class="token punctuation">-</span>trading<span class="token punctuation">-</span>service
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;5002:5002&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> DATABASE_URL=sqlite<span class="token punctuation">:</span>///trading.db
      <span class="token punctuation">-</span> MARKET_DATA_URL=http<span class="token punctuation">:</span>//market<span class="token punctuation">-</span>data<span class="token punctuation">-</span>service<span class="token punctuation">:</span><span class="token number">5001</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> market<span class="token punctuation">-</span>data<span class="token punctuation">-</span>service
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># ==================== 数据存储 ====================</span>
  <span class="token key atrule">mysql</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">8.0</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3306:3306&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token number">123456</span>
      <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> quant_trading
      <span class="token key atrule">MYSQL_USER</span><span class="token punctuation">:</span> quant_user
      <span class="token key atrule">MYSQL_PASSWORD</span><span class="token punctuation">:</span> quant_pass
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mysql_data<span class="token punctuation">:</span>/var/lib/mysql
      <span class="token punctuation">-</span> ./database/init<span class="token punctuation">:</span>/docker<span class="token punctuation">-</span>entrypoint<span class="token punctuation">-</span>initdb.d
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>7<span class="token punctuation">-</span>alpine
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;6379:6379&quot;</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>requirepass redis123456 <span class="token punctuation">-</span><span class="token punctuation">-</span>appendonly yes
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis_data<span class="token punctuation">:</span>/data
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># ==================== 消息队列 ====================</span>
  <span class="token key atrule">zookeeper</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> confluentinc/cp<span class="token punctuation">-</span>zookeeper<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;2181:2181&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">ZOOKEEPER_CLIENT_PORT</span><span class="token punctuation">:</span> <span class="token number">2181</span>
      <span class="token key atrule">ZOOKEEPER_TICK_TIME</span><span class="token punctuation">:</span> <span class="token number">2000</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> zookeeper_data<span class="token punctuation">:</span>/var/lib/zookeeper/data
      <span class="token punctuation">-</span> zookeeper_logs<span class="token punctuation">:</span>/var/lib/zookeeper/log
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token key atrule">kafka</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> confluentinc/cp<span class="token punctuation">-</span>kafka<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9092:9092&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">KAFKA_BROKER_ID</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">KAFKA_ZOOKEEPER_CONNECT</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">:</span><span class="token number">2181</span>
      <span class="token key atrule">KAFKA_ADVERTISED_LISTENERS</span><span class="token punctuation">:</span> PLAINTEXT<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">9092</span><span class="token punctuation">,</span>PLAINTEXT_INTERNAL<span class="token punctuation">:</span>//kafka<span class="token punctuation">:</span><span class="token number">29092</span>
      <span class="token key atrule">KAFKA_LISTENER_SECURITY_PROTOCOL_MAP</span><span class="token punctuation">:</span> PLAINTEXT<span class="token punctuation">:</span>PLAINTEXT<span class="token punctuation">,</span>PLAINTEXT_INTERNAL<span class="token punctuation">:</span>PLAINTEXT
      <span class="token key atrule">KAFKA_INTER_BROKER_LISTENER_NAME</span><span class="token punctuation">:</span> PLAINTEXT_INTERNAL
      <span class="token key atrule">KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">KAFKA_AUTO_CREATE_TOPICS_ENABLE</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> kafka_data<span class="token punctuation">:</span>/var/lib/kafka/data
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> zookeeper
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token comment"># ==================== 监控服务 ====================</span>
  <span class="token key atrule">prometheus</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/prometheus<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9090:9090&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./monitoring/prometheus.yml<span class="token punctuation">:</span>/etc/prometheus/prometheus.yml
      <span class="token punctuation">-</span> prometheus_data<span class="token punctuation">:</span>/prometheus
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--config.file=/etc/prometheus/prometheus.yml&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--storage.tsdb.path=/prometheus&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--web.console.libraries=/etc/prometheus/console_libraries&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;--web.console.templates=/etc/prometheus/consoles&#39;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

  <span class="token key atrule">grafana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/grafana<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3001:3000&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> GF_SECURITY_ADMIN_PASSWORD=admin123
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> grafana_data<span class="token punctuation">:</span>/var/lib/grafana
      <span class="token punctuation">-</span> ./monitoring/grafana<span class="token punctuation">:</span>/etc/grafana/provisioning
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> prometheus
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> quant<span class="token punctuation">-</span>network
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped

<span class="token comment"># ==================== 网络配置 ====================</span>
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">quant-network</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge

<span class="token comment"># ==================== 数据卷 ====================</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">mysql_data</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis_data</span><span class="token punctuation">:</span>
  <span class="token key atrule">kafka_data</span><span class="token punctuation">:</span>
  <span class="token key atrule">zookeeper_data</span><span class="token punctuation">:</span>
  <span class="token key atrule">zookeeper_logs</span><span class="token punctuation">:</span>
  <span class="token key atrule">prometheus_data</span><span class="token punctuation">:</span>
  <span class="token key atrule">grafana_data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dockerfile-示例" tabindex="-1"><a class="header-anchor" href="#dockerfile-示例" aria-hidden="true">#</a> Dockerfile 示例</h3><h4 id="java-服务-dockerfile" tabindex="-1"><a class="header-anchor" href="#java-服务-dockerfile" aria-hidden="true">#</a> Java 服务 Dockerfile</h4><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># stock-service/Dockerfile</span>
<span class="token instruction"><span class="token keyword">FROM</span> openjdk:17-jdk-slim</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>

<span class="token comment"># 复制 Maven 配置文件</span>
<span class="token instruction"><span class="token keyword">COPY</span> pom.xml .</span>
<span class="token instruction"><span class="token keyword">COPY</span> mvnw .</span>
<span class="token instruction"><span class="token keyword">COPY</span> .mvn .mvn</span>

<span class="token comment"># 下载依赖</span>
<span class="token instruction"><span class="token keyword">RUN</span> ./mvnw dependency:go-offline -B</span>

<span class="token comment"># 复制源代码</span>
<span class="token instruction"><span class="token keyword">COPY</span> src src</span>

<span class="token comment"># 构建应用</span>
<span class="token instruction"><span class="token keyword">RUN</span> ./mvnw clean package -DskipTests</span>

<span class="token comment"># 运行应用</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8082</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;target/stock-service-1.0.0.jar&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="python-服务-dockerfile" tabindex="-1"><a class="header-anchor" href="#python-服务-dockerfile" aria-hidden="true">#</a> Python 服务 Dockerfile</h4><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># market-data-service/Dockerfile</span>
<span class="token instruction"><span class="token keyword">FROM</span> python:3.9-slim</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>

<span class="token comment"># 安装系统依赖</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; apt-get install -y <span class="token operator">\\</span>
    build-essential <span class="token operator">\\</span>
    &amp;&amp; rm -rf /var/lib/apt/lists/*</span>

<span class="token comment"># 复制依赖文件</span>
<span class="token instruction"><span class="token keyword">COPY</span> requirements.txt .</span>

<span class="token comment"># 安装 Python 依赖</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install --no-cache-dir -r requirements.txt</span>

<span class="token comment"># 复制应用代码</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>

<span class="token comment"># 暴露端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 5001</span>

<span class="token comment"># 启动应用</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;python&quot;</span>, <span class="token string">&quot;app.py&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="前端-dockerfile" tabindex="-1"><a class="header-anchor" href="#前端-dockerfile" aria-hidden="true">#</a> 前端 Dockerfile</h4><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># web-frontend/Dockerfile</span>
<span class="token instruction"><span class="token keyword">FROM</span> node:18-alpine <span class="token keyword">as</span> builder</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>

<span class="token comment"># 复制 package.json</span>
<span class="token instruction"><span class="token keyword">COPY</span> package*.json ./</span>

<span class="token comment"># 安装依赖</span>
<span class="token instruction"><span class="token keyword">RUN</span> npm ci</span>

<span class="token comment"># 复制源代码</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>

<span class="token comment"># 构建应用</span>
<span class="token instruction"><span class="token keyword">RUN</span> npm run build</span>

<span class="token comment"># 生产环境</span>
<span class="token instruction"><span class="token keyword">FROM</span> nginx:alpine</span>

<span class="token comment"># 复制构建结果</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/dist /usr/share/nginx/html</span>

<span class="token comment"># 复制 Nginx 配置</span>
<span class="token instruction"><span class="token keyword">COPY</span> nginx.conf /etc/nginx/nginx.conf</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;nginx&quot;</span>, <span class="token string">&quot;-g&quot;</span>, <span class="token string">&quot;daemon off;&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="⚙️-环境配置" tabindex="-1"><a class="header-anchor" href="#⚙️-环境配置" aria-hidden="true">#</a> ⚙️ 环境配置</h2><h3 id="开发环境-development" tabindex="-1"><a class="header-anchor" href="#开发环境-development" aria-hidden="true">#</a> 开发环境 (Development)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动开发环境</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.dev.yml up <span class="token parameter variable">-d</span>

<span class="token comment"># 或使用脚本启动</span>
./scripts/start-dev.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="开发环境特性" tabindex="-1"><a class="header-anchor" href="#开发环境特性" aria-hidden="true">#</a> 开发环境特性</h4><ul><li>热重载支持</li><li>详细日志输出</li><li>开发工具集成</li><li>H2 内存数据库</li><li>简化的安全配置</li></ul><h3 id="测试环境-testing" tabindex="-1"><a class="header-anchor" href="#测试环境-testing" aria-hidden="true">#</a> 测试环境 (Testing)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动测试环境</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.test.yml up <span class="token parameter variable">-d</span>

<span class="token comment"># 运行测试套件</span>
./scripts/run-tests.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="测试环境特性" tabindex="-1"><a class="header-anchor" href="#测试环境特性" aria-hidden="true">#</a> 测试环境特性</h4><ul><li>完整的集成测试</li><li>模拟外部服务</li><li>测试数据预置</li><li>性能测试工具</li><li>自动化测试流水线</li></ul><h3 id="生产环境-production" tabindex="-1"><a class="header-anchor" href="#生产环境-production" aria-hidden="true">#</a> 生产环境 (Production)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动生产环境</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span>

<span class="token comment"># 使用 K8s 部署</span>
kubectl apply <span class="token parameter variable">-f</span> k8s/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="生产环境特性" tabindex="-1"><a class="header-anchor" href="#生产环境特性" aria-hidden="true">#</a> 生产环境特性</h4><ul><li>高可用配置</li><li>负载均衡</li><li>安全加固</li><li>监控告警</li><li>日志收集</li><li>备份恢复</li></ul><hr><h2 id="🔐-安全配置" tabindex="-1"><a class="header-anchor" href="#🔐-安全配置" aria-hidden="true">#</a> 🔐 安全配置</h2><h3 id="ssl-tls-配置" tabindex="-1"><a class="header-anchor" href="#ssl-tls-配置" aria-hidden="true">#</a> SSL/TLS 配置</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># nginx/nginx.conf</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl http2</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> yourdomain.com</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">ssl_certificate</span> /etc/nginx/ssl/cert.pem</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_certificate_key</span> /etc/nginx/ssl/key.pem</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">ssl_protocols</span> TLSv1.2 TLSv1.3</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_ciphers</span> ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_prefer_server_ciphers</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://web-frontend:3000</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-Proto <span class="token variable">$scheme</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">location</span> /api/</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://api-gateway:8080</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-Proto <span class="token variable">$scheme</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="环境变量安全" tabindex="-1"><a class="header-anchor" href="#环境变量安全" aria-hidden="true">#</a> 环境变量安全</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># .env.production</span>
<span class="token comment"># 数据库配置</span>
<span class="token assign-left variable">DB_HOST</span><span class="token operator">=</span>mysql-prod.internal
<span class="token assign-left variable">DB_PORT</span><span class="token operator">=</span><span class="token number">3306</span>
<span class="token assign-left variable">DB_NAME</span><span class="token operator">=</span>quant_trading_prod
<span class="token assign-left variable">DB_USERNAME</span><span class="token operator">=</span>quant_user
<span class="token assign-left variable">DB_PASSWORD</span><span class="token operator">=</span><span class="token variable">\${DB_PASSWORD_SECRET}</span>

<span class="token comment"># Redis 配置</span>
<span class="token assign-left variable">REDIS_HOST</span><span class="token operator">=</span>redis-prod.internal
<span class="token assign-left variable">REDIS_PORT</span><span class="token operator">=</span><span class="token number">6379</span>
<span class="token assign-left variable">REDIS_PASSWORD</span><span class="token operator">=</span><span class="token variable">\${REDIS_PASSWORD_SECRET}</span>

<span class="token comment"># JWT 密钥</span>
<span class="token assign-left variable">JWT_SECRET</span><span class="token operator">=</span><span class="token variable">\${JWT_SECRET_KEY}</span>
<span class="token assign-left variable">JWT_EXPIRATION</span><span class="token operator">=</span><span class="token number">86400</span>

<span class="token comment"># 外部 API 密钥</span>
<span class="token assign-left variable">AKSHARE_API_KEY</span><span class="token operator">=</span><span class="token variable">\${AKSHARE_API_KEY}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📊-监控配置" tabindex="-1"><a class="header-anchor" href="#📊-监控配置" aria-hidden="true">#</a> 📊 监控配置</h2><h3 id="prometheus-配置" tabindex="-1"><a class="header-anchor" href="#prometheus-配置" aria-hidden="true">#</a> Prometheus 配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># monitoring/prometheus.yml</span>
<span class="token key atrule">global</span><span class="token punctuation">:</span>
  <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s
  <span class="token key atrule">evaluation_interval</span><span class="token punctuation">:</span> 15s

<span class="token key atrule">rule_files</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;rules/*.yml&quot;</span>

<span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;user-service&#39;</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;user-service:8081&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/actuator/prometheus&#39;</span>

  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;stock-service&#39;</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;stock-service:8082&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/actuator/prometheus&#39;</span>

  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;trading-service&#39;</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;trading-service:8083&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/actuator/prometheus&#39;</span>

  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;market-data-service&#39;</span>
    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;market-data-service:5001&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">metrics_path</span><span class="token punctuation">:</span> <span class="token string">&#39;/metrics&#39;</span>

<span class="token key atrule">alerting</span><span class="token punctuation">:</span>
  <span class="token key atrule">alertmanagers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> alertmanager<span class="token punctuation">:</span><span class="token number">9093</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="grafana-dashboard" tabindex="-1"><a class="header-anchor" href="#grafana-dashboard" aria-hidden="true">#</a> Grafana Dashboard</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;dashboard&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;WeQuant 系统监控&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;panels&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;API 请求率&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;graph&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;targets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;expr&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rate(http_requests_total[5m])&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;legendFormat&quot;</span><span class="token operator">:</span> <span class="token string">&quot;{{service}}&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;响应时间&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;graph&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;targets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;expr&quot;</span><span class="token operator">:</span> <span class="token string">&quot;histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;legendFormat&quot;</span><span class="token operator">:</span> <span class="token string">&quot;95th percentile&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;错误率&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;singlestat&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;targets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;expr&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rate(http_requests_total{status=~\\&quot;5..\\&quot;}[5m]) / rate(http_requests_total[5m])&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;legendFormat&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Error Rate&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🚨-故障排除" tabindex="-1"><a class="header-anchor" href="#🚨-故障排除" aria-hidden="true">#</a> 🚨 故障排除</h2><h3 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h3><h4 id="_1-服务启动失败" tabindex="-1"><a class="header-anchor" href="#_1-服务启动失败" aria-hidden="true">#</a> 1. 服务启动失败</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查日志</span>
<span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> service-name

<span class="token comment"># 检查资源使用</span>
<span class="token function">docker</span> stats

<span class="token comment"># 重启服务</span>
<span class="token function">docker-compose</span> restart service-name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-数据库连接问题" tabindex="-1"><a class="header-anchor" href="#_2-数据库连接问题" aria-hidden="true">#</a> 2. 数据库连接问题</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查 MySQL 状态</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>
SHOW PROCESSLIST<span class="token punctuation">;</span>

<span class="token comment"># 检查 Redis 连接</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis redis-cli <span class="token parameter variable">-a</span> redis123456
INFO replication
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-网络连接问题" tabindex="-1"><a class="header-anchor" href="#_3-网络连接问题" aria-hidden="true">#</a> 3. 网络连接问题</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查容器网络</span>
<span class="token function">docker</span> network <span class="token function">ls</span>
<span class="token function">docker</span> network inspect quant-network

<span class="token comment"># 测试服务连通性</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> stock-service <span class="token function">ping</span> market-data-service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-性能问题" tabindex="-1"><a class="header-anchor" href="#_4-性能问题" aria-hidden="true">#</a> 4. 性能问题</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查资源使用</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> service-name <span class="token function">top</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> service-name <span class="token function">df</span> <span class="token parameter variable">-h</span>

<span class="token comment"># 查看 JVM 状态 (Java 服务)</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> stock-service jps <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="日志管理" tabindex="-1"><a class="header-anchor" href="#日志管理" aria-hidden="true">#</a> 日志管理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看实时日志</span>
<span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">100</span>

<span class="token comment"># 查看特定服务日志</span>
<span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> stock-service

<span class="token comment"># 导出日志</span>
<span class="token function">docker-compose</span> logs --no-color <span class="token operator">&gt;</span> system.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📋-运维脚本" tabindex="-1"><a class="header-anchor" href="#📋-运维脚本" aria-hidden="true">#</a> 📋 运维脚本</h2><h3 id="启动脚本" tabindex="-1"><a class="header-anchor" href="#启动脚本" aria-hidden="true">#</a> 启动脚本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># scripts/start-prod.sh</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;🚀 启动 WeQuant 生产环境...&quot;</span>

<span class="token comment"># 拉取最新镜像</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml pull

<span class="token comment"># 启动基础设施</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;📊 启动基础设施服务...&quot;</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span> mysql redis kafka zookeeper

<span class="token comment"># 等待数据库准备就绪</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;⏳ 等待数据库启动...&quot;</span>
./scripts/wait-for-db.sh

<span class="token comment"># 运行数据库迁移</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;🗄️ 运行数据库迁移...&quot;</span>
./scripts/migrate-db.sh

<span class="token comment"># 启动微服务</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;🔧 启动微服务...&quot;</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span>

<span class="token comment"># 健康检查</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;🏥 健康检查...&quot;</span>
./scripts/health-check.sh

<span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ WeQuant 系统启动完成！&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="备份脚本" tabindex="-1"><a class="header-anchor" href="#备份脚本" aria-hidden="true">#</a> 备份脚本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># scripts/backup.sh</span>

<span class="token assign-left variable">BACKUP_DIR</span><span class="token operator">=</span><span class="token string">&quot;/backups/<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d_%H%M%S<span class="token variable">)</span></span>&quot;</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$BACKUP_DIR</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;📦 开始备份...&quot;</span>

<span class="token comment"># 备份 MySQL 数据</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> mysql mysqldump <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p123456</span> quant_trading <span class="token operator">&gt;</span> <span class="token variable">$BACKUP_DIR</span>/mysql_backup.sql

<span class="token comment"># 备份 Redis 数据</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> redis redis-cli <span class="token parameter variable">-a</span> redis123456 <span class="token parameter variable">--rdb</span> /data/backup.rdb
<span class="token function">docker</span> <span class="token function">cp</span> redis:/data/backup.rdb <span class="token variable">$BACKUP_DIR</span>/

<span class="token comment"># 备份配置文件</span>
<span class="token function">cp</span> <span class="token parameter variable">-r</span> ./config <span class="token variable">$BACKUP_DIR</span>/
<span class="token function">cp</span> docker-compose.prod.yml <span class="token variable">$BACKUP_DIR</span>/

<span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 备份完成: <span class="token variable">$BACKUP_DIR</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新脚本" tabindex="-1"><a class="header-anchor" href="#更新脚本" aria-hidden="true">#</a> 更新脚本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># scripts/update.sh</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;🔄 开始更新 WeQuant 系统...&quot;</span>

<span class="token comment"># 备份当前数据</span>
./scripts/backup.sh

<span class="token comment"># 拉取最新代码</span>
<span class="token function">git</span> pull origin main

<span class="token comment"># 重新构建镜像</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.prod.yml build

<span class="token comment"># 滚动更新服务</span>
./scripts/rolling-update.sh

<span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 系统更新完成！&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🎯-部署清单" tabindex="-1"><a class="header-anchor" href="#🎯-部署清单" aria-hidden="true">#</a> 🎯 部署清单</h2><h3 id="部署前检查" tabindex="-1"><a class="header-anchor" href="#部署前检查" aria-hidden="true">#</a> 部署前检查</h3><ul><li>[ ] 服务器资源充足</li><li>[ ] 域名和 SSL 证书配置</li><li>[ ] 数据库和 Redis 密码设置</li><li>[ ] 环境变量配置完成</li><li>[ ] 监控和告警配置</li><li>[ ] 备份策略制定</li></ul><h3 id="部署步骤" tabindex="-1"><a class="header-anchor" href="#部署步骤" aria-hidden="true">#</a> 部署步骤</h3><ol><li>[ ] 准备服务器环境</li><li>[ ] 克隆项目代码</li><li>[ ] 配置环境变量</li><li>[ ] 启动基础设施服务</li><li>[ ] 运行数据库迁移</li><li>[ ] 启动应用服务</li><li>[ ] 配置负载均衡</li><li>[ ] 设置监控告警</li><li>[ ] 执行健康检查</li><li>[ ] 配置备份计划</li></ol><h3 id="部署后验证" tabindex="-1"><a class="header-anchor" href="#部署后验证" aria-hidden="true">#</a> 部署后验证</h3><ul><li>[ ] 所有服务正常运行</li><li>[ ] API 接口正常响应</li><li>[ ] 前端页面正常访问</li><li>[ ] 数据库连接正常</li><li>[ ] 缓存功能正常</li><li>[ ] 监控数据正常采集</li><li>[ ] 日志正常输出</li></ul><hr><p><em>最后更新: 2025-10-17</em><em>部署版本: v1.0</em></p>`,86),l=[i];function p(c,o){return s(),a("div",null,l)}const r=n(t,[["render",p],["__file","DEPLOYMENT_GUIDE.html.vue"]]);export{r as default};
