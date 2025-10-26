import{_ as n,o as s,c as a,e as t}from"./app-6xODO_ZE.js";const e={},p=t(`<h1 id="h2-和-sqlite-数据库教程" tabindex="-1"><a class="header-anchor" href="#h2-和-sqlite-数据库教程" aria-hidden="true">#</a> H2 和 SQLite 数据库教程</h1><h2 id="📚-概述" tabindex="-1"><a class="header-anchor" href="#📚-概述" aria-hidden="true">#</a> 📚 概述</h2><p>本教程详细介绍如何在 Java 项目中使用 H2 和 SQLite 数据库，包括配置、连接、操作和最佳实践。</p><h2 id="🗄️-sqlite-数据库" tabindex="-1"><a class="header-anchor" href="#🗄️-sqlite-数据库" aria-hidden="true">#</a> 🗄️ SQLite 数据库</h2><h3 id="sqlite-简介" tabindex="-1"><a class="header-anchor" href="#sqlite-简介" aria-hidden="true">#</a> SQLite 简介</h3><p>SQLite 是一个轻量级的嵌入式关系数据库，特点：</p><ul><li>无服务器架构</li><li>零配置</li><li>事务支持</li><li>跨平台</li><li>文件存储</li></ul><h3 id="java-项目中使用-sqlite" tabindex="-1"><a class="header-anchor" href="#java-项目中使用-sqlite" aria-hidden="true">#</a> Java 项目中使用 SQLite</h3><h4 id="_1-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_1-maven-依赖" aria-hidden="true">#</a> 1. Maven 依赖</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- SQLite JDBC 驱动 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.xerial<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>sqlite-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.42.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!-- Spring Boot Data JPA (可选) --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-data-jpa<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-原生-jdbc-连接" tabindex="-1"><a class="header-anchor" href="#_2-原生-jdbc-连接" aria-hidden="true">#</a> 2. 原生 JDBC 连接</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SQLiteExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DB_URL</span> <span class="token operator">=</span> <span class="token string">&quot;jdbc:sqlite:database.db&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 建立连接</span>
            <span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token constant">DB_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Connected to SQLite database&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 创建表</span>
            <span class="token function">createTable</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 插入数据</span>
            <span class="token function">insertData</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;john@example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 查询数据</span>
            <span class="token function">queryData</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">;</span>

            conn<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">createTable</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> conn<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE
            )
            &quot;&quot;&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name">Statement</span> stmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stmt<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        stmt<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">insertData</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> conn<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">&quot;INSERT INTO users(name, email) VALUES(?, ?)&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name">PreparedStatement</span> pstmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        pstmt<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        pstmt<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
        pstmt<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pstmt<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">queryData</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> conn<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM users&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name">Statement</span> stmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ResultSet</span> rs <span class="token operator">=</span> stmt<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>rs<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ID: %d, Name: %s, Email: %s%n&quot;</span><span class="token punctuation">,</span>
                rs<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                rs<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                rs<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;email&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        rs<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stmt<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-spring-boot-配置" tabindex="-1"><a class="header-anchor" href="#_3-spring-boot-配置" aria-hidden="true">#</a> 3. Spring Boot 配置</h4><p><strong>application.yml</strong>:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>sqlite<span class="token punctuation">:</span>./data/application.db
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.sqlite.JDBC
    <span class="token key atrule">username</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>

  <span class="token key atrule">jpa</span><span class="token punctuation">:</span>
    <span class="token key atrule">database-platform</span><span class="token punctuation">:</span> org.hibernate.community.dialect.SQLiteDialect
    <span class="token key atrule">hibernate</span><span class="token punctuation">:</span>
      <span class="token key atrule">ddl-auto</span><span class="token punctuation">:</span> update
    <span class="token key atrule">show-sql</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>SQLite 方言类</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>dialect<span class="token punctuation">.</span></span><span class="token class-name">Dialect</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>dialect<span class="token punctuation">.</span>function<span class="token punctuation">.</span></span><span class="token class-name">StandardSQLFunction</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>dialect<span class="token punctuation">.</span>identity<span class="token punctuation">.</span></span><span class="token class-name">IdentityColumnSupport</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>type<span class="token punctuation">.</span></span><span class="token class-name">StandardBasicTypes</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SQLiteDialect</span> <span class="token keyword">extends</span> <span class="token class-name">Dialect</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">SQLiteDialect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">BIT</span><span class="token punctuation">,</span> <span class="token string">&quot;integer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">TINYINT</span><span class="token punctuation">,</span> <span class="token string">&quot;tinyint&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">SMALLINT</span><span class="token punctuation">,</span> <span class="token string">&quot;smallint&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">INTEGER</span><span class="token punctuation">,</span> <span class="token string">&quot;integer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">BIGINT</span><span class="token punctuation">,</span> <span class="token string">&quot;bigint&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">,</span> <span class="token string">&quot;float&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">REAL</span><span class="token punctuation">,</span> <span class="token string">&quot;real&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">DOUBLE</span><span class="token punctuation">,</span> <span class="token string">&quot;double&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">NUMERIC</span><span class="token punctuation">,</span> <span class="token string">&quot;numeric&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">DECIMAL</span><span class="token punctuation">,</span> <span class="token string">&quot;decimal&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">CHAR</span><span class="token punctuation">,</span> <span class="token string">&quot;char&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">VARCHAR</span><span class="token punctuation">,</span> <span class="token string">&quot;varchar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">LONGVARCHAR</span><span class="token punctuation">,</span> <span class="token string">&quot;longvarchar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">DATE</span><span class="token punctuation">,</span> <span class="token string">&quot;date&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">TIME</span><span class="token punctuation">,</span> <span class="token string">&quot;time&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">TIMESTAMP</span><span class="token punctuation">,</span> <span class="token string">&quot;timestamp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">BINARY</span><span class="token punctuation">,</span> <span class="token string">&quot;blob&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">VARBINARY</span><span class="token punctuation">,</span> <span class="token string">&quot;blob&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">LONGVARBINARY</span><span class="token punctuation">,</span> <span class="token string">&quot;blob&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">BLOB</span><span class="token punctuation">,</span> <span class="token string">&quot;blob&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">CLOB</span><span class="token punctuation">,</span> <span class="token string">&quot;clob&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerColumnType</span><span class="token punctuation">(</span><span class="token class-name">Types</span><span class="token punctuation">.</span><span class="token constant">BOOLEAN</span><span class="token punctuation">,</span> <span class="token string">&quot;integer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">registerFunction</span><span class="token punctuation">(</span><span class="token string">&quot;concat&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">VarArgsSQLFunction</span><span class="token punctuation">(</span><span class="token class-name">StandardBasicTypes</span><span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;||&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerFunction</span><span class="token punctuation">(</span><span class="token string">&quot;mod&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StandardSQLFunction</span><span class="token punctuation">(</span><span class="token string">&quot;mod&quot;</span><span class="token punctuation">,</span> <span class="token class-name">StandardBasicTypes</span><span class="token punctuation">.</span><span class="token constant">INTEGER</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerFunction</span><span class="token punctuation">(</span><span class="token string">&quot;substr&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StandardSQLFunction</span><span class="token punctuation">(</span><span class="token string">&quot;substr&quot;</span><span class="token punctuation">,</span> <span class="token class-name">StandardBasicTypes</span><span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">registerFunction</span><span class="token punctuation">(</span><span class="token string">&quot;substring&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StandardSQLFunction</span><span class="token punctuation">(</span><span class="token string">&quot;substr&quot;</span><span class="token punctuation">,</span> <span class="token class-name">StandardBasicTypes</span><span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">IdentityColumnSupport</span> <span class="token function">getIdentityColumnSupport</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SQLiteIdentityColumnSupport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasAlterTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">dropConstraints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getDropForeignKeyString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAddForeignKeyConstraintString</span><span class="token punctuation">(</span><span class="token class-name">String</span> constraintName<span class="token punctuation">,</span>
            <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> foreignKey<span class="token punctuation">,</span> <span class="token class-name">String</span> referencedTable<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> primaryKey<span class="token punctuation">,</span>
            <span class="token keyword">boolean</span> referencesPrimaryKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAddPrimaryKeyConstraintString</span><span class="token punctuation">(</span><span class="token class-name">String</span> constraintName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">supportsIfExistsBeforeTableName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">supportsCascadeDelete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实体类示例</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>entity</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">jakarta<span class="token punctuation">.</span>persistence<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;users&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数</span>
    <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>email <span class="token operator">=</span> email<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Getters and Setters</span>
    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> id<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> name<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> email<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setEmail</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>email <span class="token operator">=</span> email<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Repository 接口</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>repository</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>jpa<span class="token punctuation">.</span>repository<span class="token punctuation">.</span></span><span class="token class-name">JpaRepository</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Repository</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Optional</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> <span class="token function">findByEmail</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> <span class="token function">existsByEmail</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🚀-h2-数据库" tabindex="-1"><a class="header-anchor" href="#🚀-h2-数据库" aria-hidden="true">#</a> 🚀 H2 数据库</h2><h3 id="h2-简介" tabindex="-1"><a class="header-anchor" href="#h2-简介" aria-hidden="true">#</a> H2 简介</h3><p>H2 是一个用 Java 编写的关系数据库，特点：</p><ul><li>嵌入式或服务器模式</li><li>内存或磁盘存储</li><li>Web 控制台</li><li>兼容标准 SQL</li><li>高性能</li></ul><h3 id="h2-数据库模式" tabindex="-1"><a class="header-anchor" href="#h2-数据库模式" aria-hidden="true">#</a> H2 数据库模式</h3><h4 id="_1-内存模式-memory-mode" tabindex="-1"><a class="header-anchor" href="#_1-内存模式-memory-mode" aria-hidden="true">#</a> 1. 内存模式 (Memory Mode)</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jdbc:h2:mem:testdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>数据存储在内存中</li><li>应用关闭后数据丢失</li><li>适合测试和开发</li></ul><h4 id="_2-嵌入式模式-embedded-mode" tabindex="-1"><a class="header-anchor" href="#_2-嵌入式模式-embedded-mode" aria-hidden="true">#</a> 2. 嵌入式模式 (Embedded Mode)</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jdbc:h2:./data/testdb
jdbc:h2:~/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>数据存储在本地文件</li><li>数据持久化</li><li>同时只能有一个连接</li></ul><h4 id="_3-服务器模式-server-mode" tabindex="-1"><a class="header-anchor" href="#_3-服务器模式-server-mode" aria-hidden="true">#</a> 3. 服务器模式 (Server Mode)</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jdbc:h2:tcp://localhost/~/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>H2 作为独立服务器运行</li><li>支持多个连接</li><li>适合生产环境</li></ul><h3 id="java-项目中使用-h2" tabindex="-1"><a class="header-anchor" href="#java-项目中使用-h2" aria-hidden="true">#</a> Java 项目中使用 H2</h3><h4 id="_1-maven-依赖-1" tabindex="-1"><a class="header-anchor" href="#_1-maven-依赖-1" aria-hidden="true">#</a> 1. Maven 依赖</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- H2 数据库 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.h2database<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>h2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!-- Spring Boot Data JPA --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-data-jpa<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-原生-jdbc-连接-1" tabindex="-1"><a class="header-anchor" href="#_2-原生-jdbc-连接-1" aria-hidden="true">#</a> 2. 原生 JDBC 连接</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">H2Example</span> <span class="token punctuation">{</span>
    <span class="token comment">// 内存数据库</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">MEMORY_DB</span> <span class="token operator">=</span> <span class="token string">&quot;jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// 文件数据库</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">FILE_DB</span> <span class="token operator">=</span> <span class="token string">&quot;jdbc:h2:./data/testdb&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// 服务器数据库</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">SERVER_DB</span> <span class="token operator">=</span> <span class="token string">&quot;jdbc:h2:tcp://localhost/~/test&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">USER</span> <span class="token operator">=</span> <span class="token string">&quot;sa&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PASSWORD</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 连接到内存数据库</span>
            <span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token constant">MEMORY_DB</span><span class="token punctuation">,</span> <span class="token constant">USER</span><span class="token punctuation">,</span> <span class="token constant">PASSWORD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Connected to H2 database&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 创建表</span>
            <span class="token function">createTable</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 插入数据</span>
            <span class="token function">insertData</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;alice@example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">insertData</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">&quot;Bob&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;bob@example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 查询数据</span>
            <span class="token function">queryData</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 不要关闭连接，否则内存数据库会被销毁</span>
            <span class="token comment">// conn.close();</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">createTable</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> conn<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
            CREATE TABLE IF NOT EXISTS users (
                id IDENTITY PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            &quot;&quot;&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name">Statement</span> stmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stmt<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        stmt<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">insertData</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> conn<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span>
            <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">&quot;INSERT INTO users(name, email) VALUES(?, ?)&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name">PreparedStatement</span> pstmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        pstmt<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        pstmt<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
        pstmt<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pstmt<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">queryData</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> conn<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM users ORDER BY id&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name">Statement</span> stmt <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ResultSet</span> rs <span class="token operator">=</span> stmt<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Users:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>rs<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ID: %d, Name: %s, Email: %s, Created: %s%n&quot;</span><span class="token punctuation">,</span>
                rs<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                rs<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                rs<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">&quot;email&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                rs<span class="token punctuation">.</span><span class="token function">getTimestamp</span><span class="token punctuation">(</span><span class="token string">&quot;created_at&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        rs<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stmt<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-spring-boot-配置-1" tabindex="-1"><a class="header-anchor" href="#_3-spring-boot-配置-1" aria-hidden="true">#</a> 3. Spring Boot 配置</h4><p><strong>开发环境配置 (application-dev.yml)</strong>:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>h2<span class="token punctuation">:</span>mem<span class="token punctuation">:</span>devdb;DB_CLOSE_DELAY=<span class="token punctuation">-</span>1;DB_CLOSE_ON_EXIT=FALSE
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.h2.Driver
    <span class="token key atrule">username</span><span class="token punctuation">:</span> sa
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>

  <span class="token key atrule">h2</span><span class="token punctuation">:</span>
    <span class="token key atrule">console</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /h2<span class="token punctuation">-</span>console
      <span class="token key atrule">settings</span><span class="token punctuation">:</span>
        <span class="token key atrule">web-allow-others</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

  <span class="token key atrule">jpa</span><span class="token punctuation">:</span>
    <span class="token key atrule">database-platform</span><span class="token punctuation">:</span> org.hibernate.dialect.H2Dialect
    <span class="token key atrule">hibernate</span><span class="token punctuation">:</span>
      <span class="token key atrule">ddl-auto</span><span class="token punctuation">:</span> create<span class="token punctuation">-</span>drop
    <span class="token key atrule">show-sql</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">hibernate</span><span class="token punctuation">:</span>
        <span class="token key atrule">format_sql</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>生产环境配置 (application-prod.yml)</strong>:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>h2<span class="token punctuation">:</span>./data/proddb;AUTO_SERVER=TRUE
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.h2.Driver
    <span class="token key atrule">username</span><span class="token punctuation">:</span> sa
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;your_secure_password&quot;</span>

  <span class="token key atrule">h2</span><span class="token punctuation">:</span>
    <span class="token key atrule">console</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

  <span class="token key atrule">jpa</span><span class="token punctuation">:</span>
    <span class="token key atrule">database-platform</span><span class="token punctuation">:</span> org.hibernate.dialect.H2Dialect
    <span class="token key atrule">hibernate</span><span class="token punctuation">:</span>
      <span class="token key atrule">ddl-auto</span><span class="token punctuation">:</span> validate
    <span class="token key atrule">show-sql</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-h2-配置类" tabindex="-1"><a class="header-anchor" href="#_4-h2-配置类" aria-hidden="true">#</a> 4. H2 配置类</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>h2<span class="token punctuation">.</span>tools<span class="token punctuation">.</span></span><span class="token class-name">Server</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Profile</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">SQLException</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">H2Config</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 启动 H2 TCP 服务器 (开发环境)
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>initMethod <span class="token operator">=</span> <span class="token string">&quot;start&quot;</span><span class="token punctuation">,</span> destroyMethod <span class="token operator">=</span> <span class="token string">&quot;stop&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Profile</span><span class="token punctuation">(</span><span class="token string">&quot;dev&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Server</span> <span class="token function">h2TcpServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Server</span><span class="token punctuation">.</span><span class="token function">createTcpServer</span><span class="token punctuation">(</span><span class="token string">&quot;-tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-tcpAllowOthers&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-tcpPort&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;9092&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 启动 H2 Web 服务器 (开发环境)
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>initMethod <span class="token operator">=</span> <span class="token string">&quot;start&quot;</span><span class="token punctuation">,</span> destroyMethod <span class="token operator">=</span> <span class="token string">&quot;stop&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Profile</span><span class="token punctuation">(</span><span class="token string">&quot;dev&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Server</span> <span class="token function">h2WebServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Server</span><span class="token punctuation">.</span><span class="token function">createWebServer</span><span class="token punctuation">(</span><span class="token string">&quot;-web&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-webAllowOthers&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-webPort&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;8082&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-数据初始化" tabindex="-1"><a class="header-anchor" href="#_5-数据初始化" aria-hidden="true">#</a> 5. 数据初始化</h4><p><strong>data.sql</strong> (放在 resources 目录):</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 初始化数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> users <span class="token punctuation">(</span>name<span class="token punctuation">,</span> email<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;Admin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;admin@example.com&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> users <span class="token punctuation">(</span>name<span class="token punctuation">,</span> email<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;Test User&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;test@example.com&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 创建索引</span>
<span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> idx_users_email <span class="token keyword">ON</span> users<span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>schema.sql</strong> (放在 resources 目录):</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 创建表结构</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> users <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    email <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span>
    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span>
    updated_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CURRENT_TIMESTAMP</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> roles <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> user_roles <span class="token punctuation">(</span>
    user_id <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    role_id <span class="token keyword">BIGINT</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>user_id<span class="token punctuation">,</span> role_id<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>user_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> users<span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span><span class="token punctuation">,</span>
    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>role_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> roles<span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🔄-数据库迁移和版本控制" tabindex="-1"><a class="header-anchor" href="#🔄-数据库迁移和版本控制" aria-hidden="true">#</a> 🔄 数据库迁移和版本控制</h2><h3 id="flyway-集成" tabindex="-1"><a class="header-anchor" href="#flyway-集成" aria-hidden="true">#</a> Flyway 集成</h3><h4 id="_1-maven-依赖-2" tabindex="-1"><a class="header-anchor" href="#_1-maven-依赖-2" aria-hidden="true">#</a> 1. Maven 依赖</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.flywaydb<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>flyway-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-配置" tabindex="-1"><a class="header-anchor" href="#_2-配置" aria-hidden="true">#</a> 2. 配置</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">flyway</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">locations</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>db/migration
    <span class="token key atrule">baseline-on-migrate</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-迁移脚本示例" tabindex="-1"><a class="header-anchor" href="#_3-迁移脚本示例" aria-hidden="true">#</a> 3. 迁移脚本示例</h4><p><strong>V1__Create_users_table.sql</strong>:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> users <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    email <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span>
    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>V2__Add_users_indexes.sql</strong>:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_users_email <span class="token keyword">ON</span> users<span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_users_name <span class="token keyword">ON</span> users<span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🛠️-实际项目集成示例" tabindex="-1"><a class="header-anchor" href="#🛠️-实际项目集成示例" aria-hidden="true">#</a> 🛠️ 实际项目集成示例</h2><h3 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>src/
├── main/
│   ├── java/
│   │   └── com/example/
│   │       ├── config/
│   │       │   ├── DatabaseConfig.java
│   │       │   └── H2Config.java
│   │       ├── entity/
│   │       │   └── User.java
│   │       ├── repository/
│   │       │   └── UserRepository.java
│   │       ├── service/
│   │       │   └── UserService.java
│   │       └── controller/
│   │           └── UserController.java
│   └── resources/
│       ├── application.yml
│       ├── application-dev.yml
│       ├── application-prod.yml
│       └── db/migration/
│           ├── V1__Create_users_table.sql
│           └── V2__Insert_initial_data.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据库配置类" tabindex="-1"><a class="header-anchor" href="#数据库配置类" aria-hidden="true">#</a> 数据库配置类</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Profile</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">DataSource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span></span><span class="token class-name">DataSourceBuilder</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DatabaseConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * SQLite 数据源配置
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">&quot;sqliteDataSource&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Profile</span><span class="token punctuation">(</span><span class="token string">&quot;sqlite&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;spring.datasource.sqlite&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">sqliteDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">DataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">driverClassName</span><span class="token punctuation">(</span><span class="token string">&quot;org.sqlite.JDBC&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc:sqlite:./data/application.db&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * H2 数据源配置
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">&quot;h2DataSource&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Profile</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;h2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dev&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;spring.datasource.h2&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">h2DataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">DataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">driverClassName</span><span class="token punctuation">(</span><span class="token string">&quot;org.h2.Driver&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">username</span><span class="token punctuation">(</span><span class="token string">&quot;sa&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务层示例" tabindex="-1"><a class="header-anchor" href="#服务层示例" aria-hidden="true">#</a> 服务层示例</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>repository<span class="token punctuation">.</span></span><span class="token class-name">UserRepository</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Transactional</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Optional</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserRepository</span> userRepository<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> <span class="token function">findById</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> <span class="token function">findByEmail</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepository<span class="token punctuation">.</span><span class="token function">findByEmail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deleteById</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        userRepository<span class="token punctuation">.</span><span class="token function">deleteById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">existsByEmail</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> userRepository<span class="token punctuation">.</span><span class="token function">existsByEmail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🔍-数据库访问和管理工具" tabindex="-1"><a class="header-anchor" href="#🔍-数据库访问和管理工具" aria-hidden="true">#</a> 🔍 数据库访问和管理工具</h2><h3 id="_1-h2-web-console" tabindex="-1"><a class="header-anchor" href="#_1-h2-web-console" aria-hidden="true">#</a> 1. H2 Web Console</h3><ul><li>URL: <code>http://localhost:8080/h2-console</code></li><li>JDBC URL: <code>jdbc:h2:mem:testdb</code></li><li>Username: <code>sa</code></li><li>Password: (空)</li></ul><h3 id="_2-datagrip-连接" tabindex="-1"><a class="header-anchor" href="#_2-datagrip-连接" aria-hidden="true">#</a> 2. DataGrip 连接</h3><h4 id="sqlite" tabindex="-1"><a class="header-anchor" href="#sqlite" aria-hidden="true">#</a> SQLite:</h4><ul><li>Driver: SQLite</li><li>File: <code>/path/to/database.db</code></li></ul><h4 id="h2" tabindex="-1"><a class="header-anchor" href="#h2" aria-hidden="true">#</a> H2:</h4><ul><li>Driver: H2</li><li>URL: <code>jdbc:h2:mem:testdb</code> 或 <code>jdbc:h2:tcp://localhost:9092/mem:testdb</code></li><li>User: <code>sa</code></li><li>Password: (空)</li></ul><h3 id="_3-命令行工具" tabindex="-1"><a class="header-anchor" href="#_3-命令行工具" aria-hidden="true">#</a> 3. 命令行工具</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># SQLite</span>
sqlite3 database.db
.tables
.schema <span class="token function">users</span>
SELECT * FROM <span class="token function">users</span><span class="token punctuation">;</span>

<span class="token comment"># H2 (如果启动了 TCP 服务器)</span>
<span class="token function">java</span> <span class="token parameter variable">-cp</span> h2*.jar org.h2.tools.Shell
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📊-性能优化和最佳实践" tabindex="-1"><a class="header-anchor" href="#📊-性能优化和最佳实践" aria-hidden="true">#</a> 📊 性能优化和最佳实践</h2><h3 id="sqlite-优化" tabindex="-1"><a class="header-anchor" href="#sqlite-优化" aria-hidden="true">#</a> SQLite 优化</h3><ol><li><p><strong>启用 WAL 模式</strong>:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>PRAGMA journal_mode<span class="token operator">=</span>WAL<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>调整缓存大小</strong>:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>PRAGMA cache_size<span class="token operator">=</span><span class="token number">10000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>使用事务</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>conn<span class="token punctuation">.</span><span class="token function">setAutoCommit</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 批量操作</span>
conn<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="h2-优化" tabindex="-1"><a class="header-anchor" href="#h2-优化" aria-hidden="true">#</a> H2 优化</h3><ol><li><p><strong>调整连接池</strong>:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">hikari</span><span class="token punctuation">:</span>
      <span class="token key atrule">maximum-pool-size</span><span class="token punctuation">:</span> <span class="token number">20</span>
      <span class="token key atrule">minimum-idle</span><span class="token punctuation">:</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>启用查询缓存</strong>:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SET</span> CACHE_SIZE <span class="token number">10000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>使用批量操作</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Modifying</span>
<span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;UPDATE users SET name = :name WHERE id IN :ids&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">updateNamesByIds</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;ids&quot;</span><span class="token punctuation">)</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><hr><h2 id="🧪-测试配置" tabindex="-1"><a class="header-anchor" href="#🧪-测试配置" aria-hidden="true">#</a> 🧪 测试配置</h2><h3 id="测试专用配置" tabindex="-1"><a class="header-anchor" href="#测试专用配置" aria-hidden="true">#</a> 测试专用配置</h3><p><strong>application-test.yml</strong>:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>h2<span class="token punctuation">:</span>mem<span class="token punctuation">:</span>testdb;DB_CLOSE_DELAY=<span class="token punctuation">-</span>1;DB_CLOSE_ON_EXIT=FALSE
    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.h2.Driver
    <span class="token key atrule">username</span><span class="token punctuation">:</span> sa
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>

  <span class="token key atrule">jpa</span><span class="token punctuation">:</span>
    <span class="token key atrule">hibernate</span><span class="token punctuation">:</span>
      <span class="token key atrule">ddl-auto</span><span class="token punctuation">:</span> create<span class="token punctuation">-</span>drop
    <span class="token key atrule">show-sql</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

  <span class="token key atrule">h2</span><span class="token punctuation">:</span>
    <span class="token key atrule">console</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试类示例" tabindex="-1"><a class="header-anchor" href="#测试类示例" aria-hidden="true">#</a> 测试类示例</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>entity<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">Test</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>test<span class="token punctuation">.</span>context<span class="token punctuation">.</span></span><span class="token class-name">SpringBootTest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>test<span class="token punctuation">.</span>context<span class="token punctuation">.</span></span><span class="token class-name">ActiveProfiles</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Transactional</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token keyword">static</span> <span class="token import static"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@ActiveProfiles</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">class</span> <span class="token class-name">UserServiceTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserService</span> userService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testCreateUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;Test User&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test@example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">User</span> saved <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">assertNotNull</span><span class="token punctuation">(</span>saved<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;Test User&quot;</span><span class="token punctuation">,</span> saved<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;test@example.com&quot;</span><span class="token punctuation">,</span> saved<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testFindByEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;john@example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        userService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> found <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">findByEmail</span><span class="token punctuation">(</span><span class="token string">&quot;john@example.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertTrue</span><span class="token punctuation">(</span>found<span class="token punctuation">.</span><span class="token function">isPresent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span> found<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🎯-数据库选择决策指南" tabindex="-1"><a class="header-anchor" href="#🎯-数据库选择决策指南" aria-hidden="true">#</a> 🎯 数据库选择决策指南</h2><h3 id="开发环境-为什么选择-sqlite-而不是-mysql" tabindex="-1"><a class="header-anchor" href="#开发环境-为什么选择-sqlite-而不是-mysql" aria-hidden="true">#</a> 开发环境：为什么选择 SQLite 而不是 MySQL？</h3><h4 id="💡-sqlite-在开发环境的优势" tabindex="-1"><a class="header-anchor" href="#💡-sqlite-在开发环境的优势" aria-hidden="true">#</a> 💡 SQLite 在开发环境的优势</h4><p><strong>1. 零配置启动</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># SQLite - 无需安装，直接使用</span>
python app.py  <span class="token comment"># 自动创建 database.db</span>

<span class="token comment"># MySQL - 需要复杂的安装和配置</span>
brew <span class="token function">install</span> mysql
mysql.server start
mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>
CREATE DATABASE mydb<span class="token punctuation">;</span>
CREATE <span class="token environment constant">USER</span> <span class="token string">&#39;app&#39;</span>@<span class="token string">&#39;localhost&#39;</span> IDENTIFIED BY <span class="token string">&#39;password&#39;</span><span class="token punctuation">;</span>
GRANT ALL ON mydb.* TO <span class="token string">&#39;app&#39;</span>@<span class="token string">&#39;localhost&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 依赖管理简化</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># SQLite - 内置于 Python</span>
<span class="token keyword">import</span> sqlite3
conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;app.db&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># MySQL - 需要额外安装驱动</span>
pip install pymysql mysql<span class="token operator">-</span>connector<span class="token operator">-</span>python
<span class="token keyword">import</span> mysql<span class="token punctuation">.</span>connector
conn <span class="token operator">=</span> mysql<span class="token punctuation">.</span>connector<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>
    host<span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span> user<span class="token operator">=</span><span class="token string">&#39;app&#39;</span><span class="token punctuation">,</span> password<span class="token operator">=</span><span class="token string">&#39;pass&#39;</span><span class="token punctuation">,</span> database<span class="token operator">=</span><span class="token string">&#39;mydb&#39;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 团队协作便利性</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 项目结构对比</span>
<span class="token key atrule">SQLite 项目</span><span class="token punctuation">:</span>
├── app.py
├── database.db          <span class="token comment"># 可以直接提交到 Git</span>
└── requirements.txt     <span class="token comment"># 无额外数据库依赖</span>

<span class="token key atrule">MySQL 项目</span><span class="token punctuation">:</span>
├── app.py
├── docker<span class="token punctuation">-</span>compose.yml   <span class="token comment"># 需要 Docker 环境</span>
├── init.sql            <span class="token comment"># 初始化脚本</span>
├── .env               <span class="token comment"># 数据库配置</span>
└── requirements.txt   <span class="token comment"># 需要 MySQL 驱动</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="🔄-开发阶段数据库选择策略" tabindex="-1"><a class="header-anchor" href="#🔄-开发阶段数据库选择策略" aria-hidden="true">#</a> 🔄 开发阶段数据库选择策略</h4><p><strong>阶段一：原型开发 (SQLite)</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 快速原型验证</span>
<span class="token keyword">import</span> sqlite3

<span class="token keyword">def</span> <span class="token function">create_prototype</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;prototype.db&#39;</span><span class="token punctuation">)</span>
    conn<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token triple-quoted-string string">&#39;&#39;&#39;
        CREATE TABLE IF NOT EXISTS trades (
            id INTEGER PRIMARY KEY,
            stock_code TEXT,
            quantity INTEGER,
            price REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    &#39;&#39;&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> conn

<span class="token comment"># 优势: 5分钟内启动，专注业务逻辑验证</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>阶段二：功能开发 (继续 SQLite)</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 功能完善，数据结构稳定</span>
<span class="token keyword">class</span> <span class="token class-name">DatabaseManager</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> db_path<span class="token operator">=</span><span class="token string">&#39;app.db&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>db_path<span class="token punctuation">,</span> check_same_thread<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>init_tables<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">init_tables</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 完整的表结构设计</span>
        self<span class="token punctuation">.</span>conn<span class="token punctuation">.</span>executescript<span class="token punctuation">(</span><span class="token triple-quoted-string string">&#39;&#39;&#39;
            CREATE TABLE IF NOT EXISTS users (...);
            CREATE TABLE IF NOT EXISTS accounts (...);
            CREATE TABLE IF NOT EXISTS trades (...);
            CREATE INDEX IF NOT EXISTS idx_trades_user_id ON trades(user_id);
        &#39;&#39;&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 优势: 数据持久化，支持复杂查询，性能足够</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>阶段三：集成测试 (H2 内存)</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@ActiveProfiles</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">TradingServiceTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// H2 内存数据库，每次测试干净环境</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testTradingLogic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 测试逻辑</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# 优势<span class="token operator">:</span> 隔离测试环境，快速重置数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>阶段四：预生产 (MySQL)</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># docker-compose.yml</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">mysql</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">8.0</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> trading_db
      <span class="token key atrule">MYSQL_USER</span><span class="token punctuation">:</span> trading_user
      <span class="token key atrule">MYSQL_PASSWORD</span><span class="token punctuation">:</span> secure_password
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> root_password
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3306:3306&quot;</span>

<span class="token comment"># 优势: 生产环境相同，性能测试准确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🔍-h2嵌入式模式-vs-sqlite-专项对比" tabindex="-1"><a class="header-anchor" href="#🔍-h2嵌入式模式-vs-sqlite-专项对比" aria-hidden="true">#</a> 🔍 H2嵌入式模式 vs SQLite 专项对比</h3><h4 id="💾-基本特征对比" tabindex="-1"><a class="header-anchor" href="#💾-基本特征对比" aria-hidden="true">#</a> 💾 基本特征对比</h4><table><thead><tr><th>维度</th><th>H2嵌入式模式</th><th>SQLite</th></tr></thead><tbody><tr><td><strong>文件格式</strong></td><td><code>.h2.db</code> 文件</td><td><code>.db</code> 文件</td></tr><tr><td><strong>连接字符串</strong></td><td><code>jdbc:h2:./data/app</code></td><td><code>jdbc:sqlite:app.db</code></td></tr><tr><td><strong>开发语言</strong></td><td>Java (JVM)</td><td>C语言 (原生)</td></tr><tr><td><strong>并发连接</strong></td><td>❌ <strong>单连接限制</strong></td><td>❌ <strong>单连接限制</strong></td></tr><tr><td><strong>跨平台</strong></td><td>✅ 依赖JVM</td><td>✅ 完全原生</td></tr><tr><td><strong>文件大小</strong></td><td>较大 (包含索引)</td><td>较小 (紧凑格式)</td></tr><tr><td><strong>运行时依赖</strong></td><td>需要JVM环境</td><td>零依赖</td></tr></tbody></table><h4 id="🔧-存储实现差异详解" tabindex="-1"><a class="header-anchor" href="#🔧-存储实现差异详解" aria-hidden="true">#</a> 🔧 存储实现差异详解</h4><p><strong>H2嵌入式模式</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// H2嵌入式文件存储</span>
spring<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span>url<span class="token operator">=</span>jdbc<span class="token operator">:</span>h2<span class="token operator">:</span><span class="token punctuation">.</span>/data<span class="token operator">/</span>trading  <span class="token comment">// 生成 trading.h2.db</span>

存储特点：
✅ <span class="token constant">JVM</span>内优化，<span class="token class-name">Java</span>对象直接映射
✅ 支持<span class="token class-name">Java</span>序列化数据类型
✅ 内置压缩和加密功能
✅ 完整<span class="token constant">SQL</span>标准支持（窗口函数、递归查询）
❌ 需要<span class="token constant">JVM</span>环境才能访问
❌ 文件格式<span class="token constant">JVM</span>版本敏感
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>SQLite文件存储</strong>:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># SQLite文件存储</span>
conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;trading.db&#39;</span><span class="token punctuation">)</span>  <span class="token operator">//</span> 生成 trading<span class="token punctuation">.</span>db

存储特点：
✅ 跨语言通用格式，标准化文件结构
✅ 可以直接用工具分析和查看
✅ 文件可以跨平台直接复制使用
✅ 极小的内存占用和文件大小
❌ 数据类型系统相对简单
❌ 部分高级SQL功能受限
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="📊-数据类型支持对比" tabindex="-1"><a class="header-anchor" href="#📊-数据类型支持对比" aria-hidden="true">#</a> 📊 数据类型支持对比</h4><p><strong>H2嵌入式 - 丰富的Java类型映射</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Trade</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">UUID</span> id<span class="token punctuation">;</span>                    <span class="token comment">// UUID原生支持</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> amount<span class="token punctuation">;</span>          <span class="token comment">// 高精度小数</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> timestamp<span class="token punctuation">;</span>    <span class="token comment">// Java 8时间API</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> tags<span class="token punctuation">;</span>          <span class="token comment">// JSON数组类型</span>
    <span class="token keyword">private</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> signature<span class="token punctuation">;</span>           <span class="token comment">// 二进制数据</span>

    <span class="token comment">// H2支持复杂类型的直接存储和查询</span>
    <span class="token annotation punctuation">@Query</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT t FROM Trade t WHERE t.timestamp &gt; :date&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Trade</span><span class="token punctuation">&gt;</span></span> <span class="token function">findRecentTrades</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;date&quot;</span><span class="token punctuation">)</span> <span class="token class-name">LocalDateTime</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>SQLite - 基础数据类型</strong>:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- SQLite基础类型存储</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> trades <span class="token punctuation">(</span>
    id <span class="token keyword">TEXT</span><span class="token punctuation">,</span>                    <span class="token comment">-- UUID需要转换为字符串</span>
    amount <span class="token keyword">REAL</span><span class="token punctuation">,</span>               <span class="token comment">-- 可能有浮点精度问题</span>
    <span class="token keyword">timestamp</span> <span class="token keyword">TEXT</span><span class="token punctuation">,</span>            <span class="token comment">-- 时间存储为字符串</span>
    tags <span class="token keyword">TEXT</span><span class="token punctuation">,</span>                 <span class="token comment">-- JSON数组存储为字符串</span>
    signature <span class="token keyword">BLOB</span>             <span class="token comment">-- 二进制数据支持</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 需要应用层处理类型转换</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> trades
<span class="token keyword">WHERE</span> <span class="token keyword">datetime</span><span class="token punctuation">(</span><span class="token keyword">timestamp</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token keyword">datetime</span><span class="token punctuation">(</span><span class="token string">&#39;2023-01-01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="⚡-性能特征对比" tabindex="-1"><a class="header-anchor" href="#⚡-性能特征对比" aria-hidden="true">#</a> ⚡ 性能特征对比</h4><table><thead><tr><th>操作类型</th><th>H2嵌入式</th><th>SQLite</th><th>说明</th></tr></thead><tbody><tr><td><strong>启动时间</strong></td><td>100-200ms</td><td>1-5ms</td><td>H2需要JVM启动开销</td></tr><tr><td><strong>简单查询</strong></td><td>2-5ms</td><td>2-4ms</td><td>性能相近</td></tr><tr><td><strong>复杂JOIN</strong></td><td>8-15ms</td><td>12-20ms</td><td>H2优化器更强</td></tr><tr><td><strong>批量插入</strong></td><td>30ms/1000条</td><td>40ms/1000条</td><td>H2事务优化更好</td></tr><tr><td><strong>内存使用</strong></td><td>20-50MB</td><td>1-5MB</td><td>SQLite极低内存占用</td></tr><tr><td><strong>文件大小</strong></td><td>较大</td><td>较小</td><td>SQLite存储更紧凑</td></tr></tbody></table><h4 id="🎯-跨语言支持对比" tabindex="-1"><a class="header-anchor" href="#🎯-跨语言支持对比" aria-hidden="true">#</a> 🎯 跨语言支持对比</h4><p><strong>SQLite - 真正的跨语言</strong>:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># Python</span>
<span class="token keyword">import</span> sqlite3
conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;app.db&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># Java</span>
Class<span class="token punctuation">.</span>forName<span class="token punctuation">(</span><span class="token string">&quot;org.sqlite.JDBC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
conn <span class="token operator">=</span> DriverManager<span class="token punctuation">.</span>getConnection<span class="token punctuation">(</span><span class="token string">&quot;jdbc:sqlite:app.db&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># Node.js</span>
const sqlite3 <span class="token operator">=</span> require<span class="token punctuation">(</span><span class="token string">&#39;sqlite3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
const db <span class="token operator">=</span> new sqlite3<span class="token punctuation">.</span>Database<span class="token punctuation">(</span><span class="token string">&#39;app.db&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># Go</span>
<span class="token keyword">import</span> <span class="token string">&quot;database/sql&quot;</span>
<span class="token keyword">import</span> _ <span class="token string">&quot;github.com/mattn/go-sqlite3&quot;</span>
db<span class="token punctuation">,</span> <span class="token keyword">_</span> <span class="token operator">:=</span> sql<span class="token punctuation">.</span>Open<span class="token punctuation">(</span><span class="token string">&quot;sqlite3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./app.db&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 所有语言都能直接读取同一个.db文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>H2嵌入式 - Java生态专用</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// Java - 原生支持</span>
<span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc:h2:./data/app&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Python - 需要复杂桥接</span>
<span class="token keyword">import</span> <span class="token namespace">jaydebeapi</span>
conn <span class="token operator">=</span> jaydebeapi<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">&quot;org.h2.Driver&quot;</span><span class="token punctuation">,</span>
                         <span class="token string">&quot;jdbc:h2:./data/app&quot;</span><span class="token punctuation">,</span>
                         <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                         <span class="token string">&quot;/path/to/h2.jar&quot;</span><span class="token punctuation">)</span>

<span class="token comment">// 其他语言需要通过JDBC桥接，配置复杂</span>
<span class="token comment">// 实际项目中很少这样使用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🚀-wequant项目架构决策深度解析" tabindex="-1"><a class="header-anchor" href="#🚀-wequant项目架构决策深度解析" aria-hidden="true">#</a> 🚀 WeQuant项目架构决策深度解析</h3><h4 id="为什么mock-trading-service选择sqlite而非h2嵌入式" tabindex="-1"><a class="header-anchor" href="#为什么mock-trading-service选择sqlite而非h2嵌入式" aria-hidden="true">#</a> 为什么mock-trading-service选择SQLite而非H2嵌入式？</h4><p><strong>技术决策分析</strong>:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 当前架构：Python + SQLite</span>
<span class="token keyword">import</span> sqlite3
conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;mock_trading.db&#39;</span><span class="token punctuation">)</span>

架构优势：
<span class="token number">1.</span> 🚀 零配置快速启动
   <span class="token operator">-</span> Python内置sqlite3模块
   <span class="token operator">-</span> 无需下载安装额外驱动
   <span class="token operator">-</span> git clone后立即可运行

<span class="token number">2.</span> 📊 数据分析生态集成
   <span class="token operator">-</span> pandas<span class="token punctuation">.</span>read_sql直接读取
   <span class="token operator">-</span> Jupyter Notebook直接分析
   <span class="token operator">-</span> 数据科学工具链无缝对接

<span class="token number">3.</span> 🔄 多服务数据共享
   <span class="token operator">-</span> Java服务可通过JDBC读取同一文件
   <span class="token operator">-</span> 运维脚本可直接操作数据
   <span class="token operator">-</span> 前端工具可直接查看数据

<span class="token number">4.</span> 🏗️ 演进路径友好
   <span class="token operator">-</span> SQL语法与PostgreSQL基本兼容
   <span class="token operator">-</span> 数据迁移工具丰富
   <span class="token operator">-</span> 备份恢复简单直接
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果改用H2嵌入式的影响</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 假设架构：Python + H2嵌入式</span>
spring<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span>url<span class="token operator">=</span>jdbc<span class="token operator">:</span>h2<span class="token operator">:</span><span class="token punctuation">.</span>/data<span class="token operator">/</span>mock_trading

潜在问题：
❌ <span class="token class-name">Python</span>需要安装<span class="token class-name">JayDeBeApi</span> <span class="token operator">+</span> <span class="token constant">H2</span><span class="token punctuation">.</span>jar
❌ 开发环境配置复杂（<span class="token class-name">Java</span> classpath）
❌ 数据文件只能在<span class="token class-name">Java</span>环境查看
❌ 跨语言数据访问性能差
❌ 部署服务器必须有<span class="token constant">JVM</span>环境

有限优势：
✅ 更丰富的<span class="token constant">SQL</span>功能支持
✅ 更好的并发性能（虽然单连接限制相同）
✅ <span class="token class-name">Web</span>控制台调试便利
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="trading-service为什么用h2内存而不是h2嵌入式" tabindex="-1"><a class="header-anchor" href="#trading-service为什么用h2内存而不是h2嵌入式" aria-hidden="true">#</a> trading-service为什么用H2内存而不是H2嵌入式？</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code># 当前选择：<span class="token constant">H2</span>内存模式
spring<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span>url<span class="token operator">=</span>jdbc<span class="token operator">:</span>h2<span class="token operator">:</span>mem<span class="token operator">:</span>trading_db

vs

# 备选方案：<span class="token constant">H2</span>嵌入式模式
spring<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span>url<span class="token operator">=</span>jdbc<span class="token operator">:</span>h2<span class="token operator">:</span><span class="token punctuation">.</span>/data<span class="token operator">/</span>trading_db

选择内存模式的原因：
✅ 测试环境隔离 <span class="token operator">-</span> 每次重启都是干净数据
✅ 无文件<span class="token class-name">I</span><span class="token operator">/</span><span class="token class-name">O</span>开销 <span class="token operator">-</span> 测试执行速度更快
✅ 并发测试友好 <span class="token operator">-</span> 多个测试实例不冲突
✅ <span class="token constant">CI</span><span class="token operator">/</span><span class="token constant">CD</span>友好 <span class="token operator">-</span> 无需清理数据文件

如果选择嵌入式模式：
❌ 需要手动清理测试数据
❌ 并发测试可能冲突
❌ <span class="token constant">CI</span>环境需要文件权限管理
✅ 数据可以持久化调试
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="💡-实际项目场景选择指南" tabindex="-1"><a class="header-anchor" href="#💡-实际项目场景选择指南" aria-hidden="true">#</a> 💡 实际项目场景选择指南</h3><h4 id="场景1-java企业级应用" tabindex="-1"><a class="header-anchor" href="#场景1-java企业级应用" aria-hidden="true">#</a> 场景1: Java企业级应用</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 推荐：H2嵌入式模式</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmbeddedDatabaseConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Profile</span><span class="token punctuation">(</span><span class="token string">&quot;embedded&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">embeddedDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">EmbeddedDatabaseBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setType</span><span class="token punctuation">(</span><span class="token class-name">EmbeddedDatabaseType</span><span class="token punctuation">.</span><span class="token constant">H2</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;business_app&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

适用情况：
✅ 纯<span class="token class-name">Java</span>技术栈
✅ 需要复杂<span class="token constant">SQL</span>查询
✅ <span class="token class-name">Spring</span> <span class="token class-name">Boot</span>框架
✅ 单机部署应用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="场景2-数据分析平台" tabindex="-1"><a class="header-anchor" href="#场景2-数据分析平台" aria-hidden="true">#</a> 场景2: 数据分析平台</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 推荐：SQLite</span>
<span class="token keyword">import</span> sqlite3
<span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd

<span class="token comment"># 数据收集</span>
conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;analytics.db&#39;</span><span class="token punctuation">)</span>
df<span class="token punctuation">.</span>to_sql<span class="token punctuation">(</span><span class="token string">&#39;user_behavior&#39;</span><span class="token punctuation">,</span> conn<span class="token punctuation">,</span> if_exists<span class="token operator">=</span><span class="token string">&#39;append&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 数据分析</span>
analysis_df <span class="token operator">=</span> pd<span class="token punctuation">.</span>read_sql<span class="token punctuation">(</span><span class="token triple-quoted-string string">&quot;&quot;&quot;
    SELECT date, COUNT(*) as active_users
    FROM user_behavior
    GROUP BY date
&quot;&quot;&quot;</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>

适用情况：
✅ Python<span class="token operator">/</span>R数据科学栈
✅ 需要跨工具数据共享
✅ 快速原型验证
✅ 文件导入导出需求
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="场景3-微服务架构" tabindex="-1"><a class="header-anchor" href="#场景3-微服务架构" aria-hidden="true">#</a> 场景3: 微服务架构</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 推荐：根据服务特点选择</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">user-service</span><span class="token punctuation">:</span>        <span class="token comment"># Java + H2嵌入式（配置数据）</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">DB_URL</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>h2<span class="token punctuation">:</span>./data/users

  <span class="token key atrule">analytics-service</span><span class="token punctuation">:</span>   <span class="token comment"># Python + SQLite（分析数据）</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">DB_PATH</span><span class="token punctuation">:</span> /data/analytics.db

  <span class="token key atrule">test-service</span><span class="token punctuation">:</span>        <span class="token comment"># Java + H2内存（测试数据）</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">DB_URL</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>h2<span class="token punctuation">:</span>mem<span class="token punctuation">:</span>testdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🔄-迁移策略建议" tabindex="-1"><a class="header-anchor" href="#🔄-迁移策略建议" aria-hidden="true">#</a> 🔄 迁移策略建议</h3><h4 id="sqlite-→-h2嵌入式迁移" tabindex="-1"><a class="header-anchor" href="#sqlite-→-h2嵌入式迁移" aria-hidden="true">#</a> SQLite → H2嵌入式迁移</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 数据导出</span>
sqlite3 app.db <span class="token string">&quot;.dump&quot;</span> <span class="token operator">&gt;</span> backup.sql

<span class="token comment"># 2. 语法适配（主要差异）</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/INTEGER PRIMARY KEY AUTOINCREMENT/BIGINT AUTO_INCREMENT PRIMARY KEY/g&#39;</span> backup.sql
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/datetime(/PARSEDATETIME(/g&#39;</span> backup.sql

<span class="token comment"># 3. H2导入</span>
<span class="token function">java</span> <span class="token parameter variable">-cp</span> h2*.jar org.h2.tools.RunScript <span class="token parameter variable">-url</span> jdbc:h2:./data/app <span class="token parameter variable">-script</span> backup.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="h2嵌入式-→-sqlite迁移" tabindex="-1"><a class="header-anchor" href="#h2嵌入式-→-sqlite迁移" aria-hidden="true">#</a> H2嵌入式 → SQLite迁移</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 1. 数据导出</span>
java <span class="token operator">-</span>cp h2<span class="token operator">*</span><span class="token punctuation">.</span>jar <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>h2<span class="token punctuation">.</span>tools<span class="token punctuation">.</span></span>Script</span> <span class="token operator">-</span>url jdbc<span class="token operator">:</span>h2<span class="token operator">:</span><span class="token punctuation">.</span>/data<span class="token operator">/</span>app <span class="token operator">-</span>script export<span class="token punctuation">.</span>sql

<span class="token comment">// 2. 语法适配</span>
<span class="token comment">// H2: BIGINT AUTO_INCREMENT PRIMARY KEY</span>
<span class="token comment">// SQLite: INTEGER PRIMARY KEY AUTOINCREMENT</span>

<span class="token comment">// 3. SQLite导入</span>
sqlite3 app<span class="token punctuation">.</span>db <span class="token operator">&lt;</span> adapted_export<span class="token punctuation">.</span>sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="📊-混合架构最佳实践" tabindex="-1"><a class="header-anchor" href="#📊-混合架构最佳实践" aria-hidden="true">#</a> 📊 混合架构最佳实践</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>开发阶段架构优化：
├── 原型服务: Python + SQLite (快速验证)
├── 测试服务: Java + H2内存 (单元测试)
├── 集成服务: Java + H2嵌入式 (集成测试)
└── 数据分析: Python + SQLite (共享数据)

生产阶段演进：
├── 用户数据: PostgreSQL (高可用)
├── 缓存层: Redis (高性能)
├── 配置数据: H2嵌入式 (简单部署)
└── 分析数据: SQLite (离线分析)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="📊-h2-vs-sqlite-深度对比" tabindex="-1"><a class="header-anchor" href="#📊-h2-vs-sqlite-深度对比" aria-hidden="true">#</a> 📊 H2 vs SQLite 深度对比</h3><h4 id="🔍-核心差异分析" tabindex="-1"><a class="header-anchor" href="#🔍-核心差异分析" aria-hidden="true">#</a> 🔍 核心差异分析</h4><table><thead><tr><th>维度</th><th>SQLite</th><th>H2</th></tr></thead><tbody><tr><td><strong>开发语言</strong></td><td>C语言 (原生性能)</td><td>Java (JVM优化)</td></tr><tr><td><strong>存储模式</strong></td><td>🗂️ <strong>文件存储</strong></td><td>🧠 <strong>内存优先</strong></td></tr><tr><td><strong>数据持久化</strong></td><td>✅ <strong>永久保存</strong></td><td>⚠️ <strong>可选保存</strong></td></tr><tr><td><strong>Java集成</strong></td><td>需要JDBC驱动</td><td>🎯 <strong>原生Java</strong></td></tr><tr><td><strong>启动速度</strong></td><td>🚀 <strong>毫秒级</strong></td><td>⚡ <strong>瞬时启动</strong></td></tr><tr><td><strong>内存使用</strong></td><td>📦 <strong>极低</strong></td><td>💾 <strong>中等</strong></td></tr><tr><td><strong>并发模式</strong></td><td>读多写少</td><td>🔄 <strong>读写并发</strong></td></tr><tr><td><strong>Web控制台</strong></td><td>❌ 需第三方工具</td><td>✅ <strong>内置Web界面</strong></td></tr></tbody></table><h4 id="💾-存储模式对比" tabindex="-1"><a class="header-anchor" href="#💾-存储模式对比" aria-hidden="true">#</a> 💾 存储模式对比</h4><p><strong>SQLite - 文件持久化存储</strong>:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 数据永久保存在磁盘文件中</span>
conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;app.db&#39;</span><span class="token punctuation">)</span>  <span class="token comment"># 创建/连接到 app.db 文件</span>
<span class="token comment"># 应用重启后数据依然存在</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>H2 - 灵活存储选择</strong>:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 内存模式 - 重启后数据丢失，适合测试</span>
<span class="token string">&quot;jdbc:h2:mem:testdb&quot;</span>

<span class="token comment">// 文件模式 - 数据持久化，类似SQLite</span>
<span class="token string">&quot;jdbc:h2:./data/appdb&quot;</span>

<span class="token comment">// 混合模式 - 内存性能 + 定期落盘</span>
<span class="token string">&quot;jdbc:h2:./data/appdb;DB_CLOSE_DELAY=-1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="🎯-使用场景精准对比" tabindex="-1"><a class="header-anchor" href="#🎯-使用场景精准对比" aria-hidden="true">#</a> 🎯 使用场景精准对比</h4><table><thead><tr><th>场景</th><th>SQLite 👑</th><th>H2 👑</th><th>理由</th></tr></thead><tbody><tr><td><strong>Python项目原型</strong></td><td>✅ <strong>最佳</strong></td><td>❌ 不适用</td><td>Python内置支持，零配置</td></tr><tr><td><strong>Java项目测试</strong></td><td>❌ 配置复杂</td><td>✅ <strong>最佳</strong></td><td>原生Java，内存模式干净</td></tr><tr><td><strong>数据分析脚本</strong></td><td>✅ <strong>最佳</strong></td><td>❌ 不适用</td><td>文件可直接分析，工具丰富</td></tr><tr><td><strong>Spring Boot单元测试</strong></td><td>❌ 每次重置麻烦</td><td>✅ <strong>最佳</strong></td><td>@TestProfile自动内存重置</td></tr><tr><td><strong>个人项目数据保存</strong></td><td>✅ <strong>最佳</strong></td><td>❌ 数据易丢失</td><td>无需服务器，文件直接备份</td></tr><tr><td><strong>企业级开发环境</strong></td><td>❌ 并发性能弱</td><td>✅ <strong>最佳</strong></td><td>Web控制台，并发性能强</td></tr><tr><td><strong>IoT/嵌入式设备</strong></td><td>✅ <strong>最佳</strong></td><td>❌ JVM内存占用大</td><td>资源消耗极低，无需JVM</td></tr><tr><td><strong>微服务集成测试</strong></td><td>❌ 跨语言复杂</td><td>✅ <strong>最佳</strong></td><td>Java生态原生，服务模式</td></tr></tbody></table><h3 id="🚀-wequant项目实际应用案例" tabindex="-1"><a class="header-anchor" href="#🚀-wequant项目实际应用案例" aria-hidden="true">#</a> 🚀 WeQuant项目实际应用案例</h3><h4 id="案例1-mock-trading-service-python-sqlite" tabindex="-1"><a class="header-anchor" href="#案例1-mock-trading-service-python-sqlite" aria-hidden="true">#</a> 案例1: mock-trading-service (Python + SQLite)</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 为什么选择SQLite？</span>
conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;mock_trading.db&#39;</span><span class="token punctuation">)</span>

优势分析<span class="token punctuation">:</span>
✅ Python内置支持，无需安装驱动
✅ 交易数据永久保存，重启不丢失
✅ 可以直接备份<span class="token punctuation">.</span>db文件到Git
✅ 支持sqlite3命令行直接查看数据
✅ 原型开发速度极快
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="案例2-trading-service-java-h2内存" tabindex="-1"><a class="header-anchor" href="#案例2-trading-service-java-h2内存" aria-hidden="true">#</a> 案例2: trading-service (Java + H2内存)</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 为什么选择H2内存模式？</span>
spring<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span>url<span class="token operator">=</span>jdbc<span class="token operator">:</span>h2<span class="token operator">:</span>mem<span class="token operator">:</span>trading_db

优势分析<span class="token operator">:</span>
✅ 每次测试都是干净环境
✅ 无需手动清理测试数据
✅ <span class="token class-name">Web</span>控制台实时查看<span class="token constant">SQL</span>执行
✅ <span class="token class-name">Spring</span> <span class="token class-name">Boot</span>原生支持，零配置
✅ 内存性能极高，适合频繁测试
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="📊-性能基准测试对比" tabindex="-1"><a class="header-anchor" href="#📊-性能基准测试对比" aria-hidden="true">#</a> 📊 性能基准测试对比</h3><table><thead><tr><th>操作类型</th><th>SQLite</th><th>H2内存</th><th>H2文件</th></tr></thead><tbody><tr><td><strong>插入1000条记录</strong></td><td>50ms</td><td>20ms</td><td>35ms</td></tr><tr><td><strong>简单查询</strong></td><td>5ms</td><td>2ms</td><td>8ms</td></tr><tr><td><strong>复杂JOIN查询</strong></td><td>25ms</td><td>10ms</td><td>18ms</td></tr><tr><td><strong>启动时间</strong></td><td>1ms</td><td>5ms</td><td>8ms</td></tr><tr><td><strong>内存占用</strong></td><td>2MB</td><td>15MB</td><td>8MB</td></tr></tbody></table><h3 id="🔄-迁移策略建议-1" tabindex="-1"><a class="header-anchor" href="#🔄-迁移策略建议-1" aria-hidden="true">#</a> 🔄 迁移策略建议</h3><h4 id="sqlite-→-h2-迁移场景" tabindex="-1"><a class="header-anchor" href="#sqlite-→-h2-迁移场景" aria-hidden="true">#</a> SQLite → H2 迁移场景</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 从SQLite原型迁移到H2测试环境</span>
<span class="token comment">// 1. 数据导出</span>
sqlite3 app<span class="token punctuation">.</span>db <span class="token string">&quot;.dump&quot;</span> <span class="token operator">&gt;</span> data_backup<span class="token punctuation">.</span>sql

<span class="token comment">// 2. H2导入 (需要SQL语法适配)</span>
<span class="token comment">// SQLite: INTEGER PRIMARY KEY AUTOINCREMENT</span>
<span class="token comment">// H2:     BIGINT AUTO_INCREMENT PRIMARY KEY</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="h2-→-sqlite-迁移场景" tabindex="-1"><a class="header-anchor" href="#h2-→-sqlite-迁移场景" aria-hidden="true">#</a> H2 → SQLite 迁移场景</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 从H2测试环境迁移到SQLite生产</span>
<span class="token comment">// 适用于：嵌入式部署、资源受限环境</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="💡-最佳实践建议" tabindex="-1"><a class="header-anchor" href="#💡-最佳实践建议" aria-hidden="true">#</a> 💡 最佳实践建议</h3><h4 id="_1-项目生命周期数据库演进" tabindex="-1"><a class="header-anchor" href="#_1-项目生命周期数据库演进" aria-hidden="true">#</a> 1. 项目生命周期数据库演进</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>阶段1: 原型验证
├── Python + SQLite (快速验证想法)
└── 数据文件可直接查看和分析

阶段2: 功能开发
├── Java + H2内存 (单元测试)
├── Java + H2文件 (集成测试)
└── Python + SQLite (功能原型)

阶段3: 预生产
├── Java + MySQL (性能测试)
└── 数据库连接池、事务管理

阶段4: 生产环境
├── PostgreSQL/MySQL (主数据库)
├── Redis (缓存层)
└── InfluxDB (时序数据)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-混合使用策略-推荐" tabindex="-1"><a class="header-anchor" href="#_2-混合使用策略-推荐" aria-hidden="true">#</a> 2. 混合使用策略 (推荐)</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">TradingServiceTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// H2内存：单元测试，每次干净环境</span>
    <span class="token annotation punctuation">@TestPropertySource</span><span class="token punctuation">(</span>properties <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;spring.datasource.url=jdbc:h2:mem:testdb&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">class</span> <span class="token class-name">DataAnalysisService</span> <span class="token punctuation">{</span>
    <span class="token comment">// SQLite文件：数据分析，持久化结果</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${analysis.db.path:analysis.db}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> sqliteDbPath<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🚀-数据库特性对比矩阵-更新版" tabindex="-1"><a class="header-anchor" href="#🚀-数据库特性对比矩阵-更新版" aria-hidden="true">#</a> 🚀 数据库特性对比矩阵 (更新版)</h3><table><thead><tr><th>特性</th><th>SQLite</th><th>H2</th><th>MySQL</th><th>PostgreSQL</th></tr></thead><tbody><tr><td><strong>安装复杂度</strong></td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐</td><td>⭐⭐</td></tr><tr><td><strong>配置复杂度</strong></td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐</td><td>⭐⭐</td></tr><tr><td><strong>并发性能</strong></td><td>⭐⭐</td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td></tr><tr><td><strong>数据安全</strong></td><td>⭐⭐⭐</td><td>⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td></tr><tr><td><strong>扩展性</strong></td><td>⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td></tr><tr><td><strong>开发速度</strong></td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐</td></tr><tr><td><strong>运维复杂度</strong></td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐</td><td>⭐⭐</td></tr><tr><td><strong>数据持久化</strong></td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td></tr><tr><td><strong>Java集成度</strong></td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td></tr><tr><td><strong>调试便利性</strong></td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td></tr></tbody></table><h3 id="🎯-h2-vs-sqlite-决策流程图" tabindex="-1"><a class="header-anchor" href="#🎯-h2-vs-sqlite-决策流程图" aria-hidden="true">#</a> 🎯 H2 vs SQLite 决策流程图</h3><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">flowchart</span> TD
    A<span class="token text string">[需要选择数据库]</span> <span class="token arrow operator">--&gt;</span> B<span class="token text string">{项目语言?}</span>

    B <span class="token arrow operator">--&gt;</span><span class="token label property">|Python|</span> C<span class="token text string">{数据需要持久化?}</span>
    B <span class="token arrow operator">--&gt;</span><span class="token label property">|Java|</span> D<span class="token text string">{是否为测试环境?}</span>

    C <span class="token arrow operator">--&gt;</span><span class="token label property">|是|</span> E<span class="token text string">[SQLite ✅]</span>
    C <span class="token arrow operator">--&gt;</span><span class="token label property">|否|</span> F<span class="token text string">{需要高性能?}</span>
    F <span class="token arrow operator">--&gt;</span><span class="token label property">|是|</span> G<span class="token text string">[内存数据结构]</span>
    F <span class="token arrow operator">--&gt;</span><span class="token label property">|否|</span> H<span class="token text string">[SQLite ✅]</span>

    D <span class="token arrow operator">--&gt;</span><span class="token label property">|是|</span> I<span class="token text string">{需要干净测试环境?}</span>
    D <span class="token arrow operator">--&gt;</span><span class="token label property">|否|</span> J<span class="token text string">{并发要求高?}</span>

    I <span class="token arrow operator">--&gt;</span><span class="token label property">|是|</span> K<span class="token text string">[H2内存模式 ✅]</span>
    I <span class="token arrow operator">--&gt;</span><span class="token label property">|否|</span> L<span class="token text string">[H2文件模式 ✅]</span>

    J <span class="token arrow operator">--&gt;</span><span class="token label property">|是|</span> M<span class="token text string">[H2服务模式 ✅]</span>
    J <span class="token arrow operator">--&gt;</span><span class="token label property">|否|</span> N<span class="token text string">{需要Web控制台?}</span>

    N <span class="token arrow operator">--&gt;</span><span class="token label property">|是|</span> O<span class="token text string">[H2文件模式 ✅]</span>
    N <span class="token arrow operator">--&gt;</span><span class="token label property">|否|</span> P<span class="token text string">[SQLite ✅]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🔍-核心选择原则" tabindex="-1"><a class="header-anchor" href="#🔍-核心选择原则" aria-hidden="true">#</a> 🔍 核心选择原则</h3><h4 id="_1-语言生态优先原则" tabindex="-1"><a class="header-anchor" href="#_1-语言生态优先原则" aria-hidden="true">#</a> 1. <strong>语言生态优先原则</strong></h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># Python项目 → SQLite</span>
<span class="token keyword">import</span> sqlite3  <span class="token comment"># 内置模块，零依赖</span>
conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;app.db&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># Java项目 → H2</span>
<span class="token decorator annotation punctuation">@Entity</span>  <span class="token operator">//</span> JPA原生支持
public <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token operator">//</span> H2与Spring Boot完美集成
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-数据生命周期原则" tabindex="-1"><a class="header-anchor" href="#_2-数据生命周期原则" aria-hidden="true">#</a> 2. <strong>数据生命周期原则</strong></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>永久数据 → SQLite
├── 用户注册信息
├── 交易历史记录
└── 配置文件

临时数据 → H2内存
├── 单元测试数据
├── 缓存计算结果
└── 会话状态
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-性能需求原则" tabindex="-1"><a class="header-anchor" href="#_3-性能需求原则" aria-hidden="true">#</a> 3. <strong>性能需求原则</strong></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>高频读写 → H2内存模式
├── 实时交易数据
├── 技术指标计算
└── 并发测试

低频持久化 → SQLite
├── 用户配置
├── 历史分析
└── 报表数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="💡-wequant项目最佳实践" tabindex="-1"><a class="header-anchor" href="#💡-wequant项目最佳实践" aria-hidden="true">#</a> 💡 WeQuant项目最佳实践</h3><h4 id="当前架构决策解析" tabindex="-1"><a class="header-anchor" href="#当前架构决策解析" aria-hidden="true">#</a> 当前架构决策解析</h4><p><strong>为什么mock-trading-service使用SQLite？</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 1. 快速原型验证 - Python内置支持</span>
conn <span class="token operator">=</span> sqlite3<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token string">&#39;mock_trading.db&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 2. 数据持久化需求 - 交易记录需要保存</span>
user_trades <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>  <span class="token comment"># 重启后依然存在</span>

<span class="token comment"># 3. 开发便利性 - 可以直接查看数据文件</span>
sqlite3 mock_trading<span class="token punctuation">.</span>db <span class="token string">&quot;SELECT * FROM trades;&quot;</span>

<span class="token comment"># 4. 部署简单 - 单文件数据库，无需服务器</span>
scp mock_trading<span class="token punctuation">.</span>db user@server<span class="token punctuation">:</span><span class="token operator">/</span>app<span class="token operator">/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为什么trading-service使用H2内存？</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 1. 测试环境隔离 - 每次重启都是干净数据</span>
<span class="token annotation punctuation">@SpringBootTest</span>
<span class="token annotation punctuation">@Sql</span><span class="token punctuation">(</span>scripts <span class="token operator">=</span> <span class="token string">&quot;/test-data.sql&quot;</span><span class="token punctuation">)</span>

<span class="token comment">// 2. 开发调试便利 - Web控制台实时查看</span>
http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">8083</span><span class="token operator">/</span>trading<span class="token operator">-</span>service<span class="token operator">/</span>h2<span class="token operator">-</span>console

<span class="token comment">// 3. Spring Boot集成度 - 零配置启动</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TradingAccount</span> <span class="token punctuation">{</span>
    <span class="token comment">// JPA自动建表，无需手动SQL</span>
<span class="token punctuation">}</span>

<span class="token comment">// 4. 性能优势 - 内存操作，测试执行快速</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">testHighFrequencyTrading</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 内存数据库，测试执行速度极快</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🚀-混合架构策略-推荐" tabindex="-1"><a class="header-anchor" href="#🚀-混合架构策略-推荐" aria-hidden="true">#</a> 🚀 混合架构策略 (推荐)</h3><h4 id="场景1-开发阶段" tabindex="-1"><a class="header-anchor" href="#场景1-开发阶段" aria-hidden="true">#</a> 场景1: 开发阶段</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Python原型 (SQLite)     Java服务 (H2内存)
├── 快速功能验证         ├── 单元测试
├── 真实数据保存         ├── 集成测试
└── API原型设计         └── 性能测试
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="场景2-测试阶段" tabindex="-1"><a class="header-anchor" href="#场景2-测试阶段" aria-hidden="true">#</a> 场景2: 测试阶段</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>集成测试环境:
├── H2文件模式 (测试数据集)
├── 可重复的测试场景
└── 测试报告生成

压力测试环境:
├── MySQL (模拟生产)
├── 真实负载测试
└── 性能基准建立
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="场景3-生产阶段" tabindex="-1"><a class="header-anchor" href="#场景3-生产阶段" aria-hidden="true">#</a> 场景3: 生产阶段</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>生产环境:
├── PostgreSQL (主数据库)
├── Redis (缓存层)
├── SQLite (配置文件、日志分析)
└── H2 (临时计算、报表生成)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="量化交易平台数据库选择实例" tabindex="-1"><a class="header-anchor" href="#量化交易平台数据库选择实例" aria-hidden="true">#</a> 量化交易平台数据库选择实例</h4><p><strong>1. 用户认证服务</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 选择: H2 (开发) → MySQL (生产)</span>
<span class="token comment">// 原因: 用户数据重要，需要高可用和备份</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span> <span class="token annotation punctuation">@GeneratedValue</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> passwordHash<span class="token punctuation">;</span>
    <span class="token comment">// 高价值数据，需要 MySQL 的 ACID 特性</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 实时行情缓存</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 选择: Redis (主) + SQLite (备份)</span>
<span class="token comment">// 原因: 高频读写，临时数据</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MarketDataService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Cacheable</span><span class="token punctuation">(</span><span class="token string">&quot;stock-prices&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">StockPrice</span> <span class="token function">getLatestPrice</span><span class="token punctuation">(</span><span class="token class-name">String</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Redis 缓存 + SQLite 持久化备份</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 交易记录存储</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 选择: SQLite (原型) → PostgreSQL (生产)</span>
<span class="token comment"># 原因: 交易数据需要强一致性和审计</span>

<span class="token keyword">class</span> <span class="token class-name">TradeRepository</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">record_trade</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> trade_data<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># SQLite: 开发阶段快速验证</span>
        <span class="token comment"># PostgreSQL: 生产环境合规要求</span>
        <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4. 临时计算结果</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 选择: H2 内存</span>
<span class="token comment">// 原因: 临时数据，重启丢失无影响</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;temp_calculations&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TempResult</span> <span class="token punctuation">{</span>
    <span class="token comment">// 技术指标计算结果，临时存储</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🚀-wequant-项目的数据库演进路径" tabindex="-1"><a class="header-anchor" href="#🚀-wequant-项目的数据库演进路径" aria-hidden="true">#</a> 🚀 WeQuant 项目的数据库演进路径</h3><h4 id="当前架构-2025-10-19" tabindex="-1"><a class="header-anchor" href="#当前架构-2025-10-19" aria-hidden="true">#</a> 当前架构 (2025-10-19)</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>开发阶段:
├── SQLite (mock-trading-service)     # Python 原型，快速验证
├── H2 Memory (trading-service)       # Java 服务，单元测试
└── Redis (缓存层)                    # 行情数据缓存

生产就绪:
├── MySQL (用户服务)                  # 用户认证，重要数据
├── PostgreSQL (交易服务)             # 交易记录，金融数据
├── Redis (缓存 + 会话)               # 高频访问数据
└── InfluxDB (时序数据)               # 股价历史，技术指标
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="迁移策略" tabindex="-1"><a class="header-anchor" href="#迁移策略" aria-hidden="true">#</a> 迁移策略</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 阶段性迁移脚本</span>
<span class="token keyword">class</span> <span class="token class-name">DatabaseMigration</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">migrate_from_sqlite_to_postgresql</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 1. 数据导出</span>
        sqlite_data <span class="token operator">=</span> self<span class="token punctuation">.</span>export_sqlite_data<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment"># 2. 数据转换</span>
        pg_data <span class="token operator">=</span> self<span class="token punctuation">.</span>transform_data_format<span class="token punctuation">(</span>sqlite_data<span class="token punctuation">)</span>

        <span class="token comment"># 3. 导入 PostgreSQL</span>
        self<span class="token punctuation">.</span>import_to_postgresql<span class="token punctuation">(</span>pg_data<span class="token punctuation">)</span>

        <span class="token comment"># 4. 验证数据一致性</span>
        self<span class="token punctuation">.</span>verify_data_integrity<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🚀-总结" tabindex="-1"><a class="header-anchor" href="#🚀-总结" aria-hidden="true">#</a> 🚀 总结</h2><h3 id="sqlite-适用场景" tabindex="-1"><a class="header-anchor" href="#sqlite-适用场景" aria-hidden="true">#</a> SQLite 适用场景</h3><ul><li>✅ <strong>原型开发</strong> - 零配置，快速启动</li><li>✅ <strong>个人项目</strong> - 简单部署，无需维护</li><li>✅ <strong>嵌入式应用</strong> - 移动应用，IoT设备</li><li>✅ <strong>数据分析</strong> - 临时数据处理，Jupyter Notebook</li><li>✅ <strong>单机应用</strong> - 桌面软件，单用户系统</li></ul><h3 id="h2-适用场景" tabindex="-1"><a class="header-anchor" href="#h2-适用场景" aria-hidden="true">#</a> H2 适用场景</h3><ul><li>✅ <strong>单元测试</strong> - 内存模式，快速重置</li><li>✅ <strong>原型验证</strong> - Java环境，快速迭代</li><li>✅ <strong>开发环境</strong> - 本地开发，团队统一</li><li>✅ <strong>缓存数据库</strong> - 临时存储，会话数据</li><li>✅ <strong>微服务测试</strong> - 集成测试，服务隔离</li></ul><h3 id="mysql-适用场景" tabindex="-1"><a class="header-anchor" href="#mysql-适用场景" aria-hidden="true">#</a> MySQL 适用场景</h3><ul><li>✅ <strong>生产环境</strong> - 高并发，事务安全</li><li>✅ <strong>Web应用</strong> - 用户数据，业务数据</li><li>✅ <strong>电商系统</strong> - 订单管理，库存管理</li><li>✅ <strong>传统企业</strong> - 成熟生态，运维经验</li><li>✅ <strong>中等规模</strong> - 千万级数据，高可用需求</li></ul><h3 id="postgresql-适用场景" tabindex="-1"><a class="header-anchor" href="#postgresql-适用场景" aria-hidden="true">#</a> PostgreSQL 适用场景</h3><ul><li>✅ <strong>金融系统</strong> - 严格ACID，复杂查询</li><li>✅ <strong>大数据分析</strong> - JSON支持，全文搜索</li><li>✅ <strong>地理信息</strong> - PostGIS扩展，空间数据</li><li>✅ <strong>高级功能</strong> - 窗口函数，递归查询</li><li>✅ <strong>合规要求</strong> - 审计跟踪，数据完整性</li></ul><h3 id="选择决策流程图" tabindex="-1"><a class="header-anchor" href="#选择决策流程图" aria-hidden="true">#</a> 选择决策流程图</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>项目需求评估
├── 数据量 &lt; 1GB，单用户 → SQLite
├── 临时数据，测试环境 → H2
├── 生产环境，高并发 → MySQL/PostgreSQL
└── 金融数据，严格合规 → PostgreSQL

开发阶段选择
├── 原型验证期 → SQLite (快速启动)
├── 功能开发期 → SQLite (数据持久化)
├── 集成测试期 → H2 (隔离环境)
└── 预生产期 → MySQL (生产一致性)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实战建议" tabindex="-1"><a class="header-anchor" href="#实战建议" aria-hidden="true">#</a> 实战建议</h3><ol><li><strong>从简单开始</strong>: SQLite → H2 → MySQL → PostgreSQL</li><li><strong>分层设计</strong>: 缓存(Redis) + 业务(MySQL) + 分析(PostgreSQL)</li><li><strong>逐步迁移</strong>: 保持数据库抽象层，支持平滑切换</li><li><strong>监控优化</strong>: 根据实际负载调整数据库配置</li></ol><p>这个教程涵盖了 SQLite、H2 和 MySQL/PostgreSQL 在不同场景下的选择依据，帮助你在项目的不同阶段做出最佳的数据库技术决策。</p>`,238),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","DATABASE_TUTORIAL.html.vue"]]);export{d as default};
