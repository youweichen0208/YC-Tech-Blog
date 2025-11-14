import{_ as n,o as s,c as a,e as t}from"./app-5333XDSd.js";const p={},e=t(`<h2 id="说一说设计模式的六大原则-solid-principle" tabindex="-1"><a class="header-anchor" href="#说一说设计模式的六大原则-solid-principle" aria-hidden="true">#</a> 说一说设计模式的六大原则 (SOLID Principle)</h2><ol><li><p>单一指责原则 (S - Single Responsibility Principle) 一个类应该只有一个指责。</p></li><li><p>开闭原则 (O - Open-Closed Principle) 开闭原则的定义是： 一个软件尸体应当对拓展开放，对修改关闭。在这个原则说的是，在设计一个模块的时候，应当使这个模块在不被修改的前提下被拓展，即应当可以在不比修改源代码的情况下改变这个模块。</p></li><li><p>里式替换原则 (L - Liskov Substitution Principle) 在面向对象的语言中，继承是必不可少的，优秀的语言机制，具有以下几个优点：</p></li></ol><ul><li>代码共享， 减少创建类的工作量</li><li>提高代码的可重用性</li><li>提高代码的可拓展性</li><li>提高产品或项目的开放性</li></ul><ol start="4"><li>接口隔离原则 (I - Interface Segregation Principle) 接口隔离原则有如下两种定义：</li></ol><ul><li>客户端不应该依赖它不需要的接口</li><li>类间的依赖关系应该建立在最小的接口上</li></ul><ol start="5"><li>依赖倒置原则 (D - Dependency Inversion Principle) 在 Java 语言中，抽象就是指接口或抽象类，两者都是不能直接被实例化的；细节就是具体的实现类，实现类实现了接口或继承了抽象类，其特点是可以直接被实例化。依赖倒置原则在 Java 语言中的表现是：</li></ol><ul><li>模块间的依赖通过抽象发生，实现类之间不发生直接的依赖关系，其依赖关系是通过接口或抽象类产生。</li><li>接口或抽象类不依赖实现类</li><li>实现类依赖于接口或抽象类</li></ul><h2 id="单例模式-singleton-pattern" tabindex="-1"><a class="header-anchor" href="#单例模式-singleton-pattern" aria-hidden="true">#</a> 单例模式(Singleton Pattern)</h2><p>单例模式是软件设计中的一种常见的设计模式，它的主要目的是确保一个类在整个应用程序中只有一个实例。</p><p>饿汉式单例模式：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//私有构造方法，保证外界无法实例化</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="说一说你对工厂模式的理解" tabindex="-1"><a class="header-anchor" href="#说一说你对工厂模式的理解" aria-hidden="true">#</a> 说一说你对工厂模式的理解：</h2><p>工厂模式是一种创建型设计模式，目的是定义一个创建对象的接口，让子类决定实例化哪一个类。工厂模式让类的实例化推迟到子类中进行，从而将对象的创建过程与具体的使用分离。。</p><h3 id="简单工厂模式" tabindex="-1"><a class="header-anchor" href="#简单工厂模式" aria-hidden="true">#</a> 简单工厂模式</h3><p>简单工厂模式不是正式的设计模式，它是一种创建对象的简单方式。它通过一个工厂类根据参数决定创建哪一种产品。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 产品接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体产品A</span>
<span class="token keyword">class</span> <span class="token class-name">ProductA</span> <span class="token keyword">implements</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Using Product A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体产品B</span>
<span class="token keyword">class</span> <span class="token class-name">ProductB</span> <span class="token keyword">implements</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Using Product B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 简单工厂</span>
<span class="token keyword">class</span> <span class="token class-name">SimpleFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Product</span> <span class="token function">createProduct</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ProductA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ProductB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 客户端代码</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Product</span> product <span class="token operator">=</span> <span class="token class-name">SimpleFactory</span><span class="token punctuation">.</span><span class="token function">createProduct</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        product<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>优点： 将对象的创建和使用分离，客户端不需要知道创建对象的细节，直接调用工厂方法即可得到所需对象。</li><li>缺点： 违反了开放/封闭原则，如果要新增产品类型，需要修改工厂类的代码。</li></ul><h3 id="工厂方法模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式" aria-hidden="true">#</a> 工厂方法模式：</h3><p>工厂方法模式是工厂模式的核心模式之一。它通过定义一个抽象的工厂接口，让子类实现具体的对象创建逻辑， 从而实现创建的对象由子类决定。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 产品接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体产品A</span>
<span class="token keyword">class</span> <span class="token class-name">ProductA</span> <span class="token keyword">implements</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Using Product A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体产品B</span>
<span class="token keyword">class</span> <span class="token class-name">ProductB</span> <span class="token keyword">implements</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Using Product B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 抽象工厂</span>
<span class="token keyword">interface</span> <span class="token class-name">Factory</span> <span class="token punctuation">{</span>
    <span class="token class-name">Product</span> <span class="token function">createProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体工厂A</span>
<span class="token keyword">class</span> <span class="token class-name">FactoryA</span> <span class="token keyword">implements</span> <span class="token class-name">Factory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Product</span> <span class="token function">createProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ProductA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体工厂B</span>
<span class="token keyword">class</span> <span class="token class-name">FactoryB</span> <span class="token keyword">implements</span> <span class="token class-name">Factory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Product</span> <span class="token function">createProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ProductB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 客户端代码</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Factory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FactoryA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 可以根据需要切换不同工厂</span>
        <span class="token class-name">Product</span> product <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createProduct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        product<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>优点： 符合开放/封闭原则， 可以通过拓展工厂类来增加新的产品，而无需修改现有的工厂类。</li><li>缺点： 每增加一个新的产品类，都需要增加一个对应的工厂类，导致类的数量增加</li></ul><h3 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式" aria-hidden="true">#</a> 抽象工厂模式：</h3><p>抽象工厂模式用于创建一组相关的对象，而不是单一对象。它提供了一个创建一系列相关或依赖对象的接口，而不需要指定它们的具体类。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 产品族接口</span>
<span class="token keyword">interface</span> <span class="token class-name">ProductA</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">ProductB</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体产品A1</span>
<span class="token keyword">class</span> <span class="token class-name">ProductA1</span> <span class="token keyword">implements</span> <span class="token class-name">ProductA</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Using Product A1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体产品A2</span>
<span class="token keyword">class</span> <span class="token class-name">ProductA2</span> <span class="token keyword">implements</span> <span class="token class-name">ProductA</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Using Product A2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体产品B1</span>
<span class="token keyword">class</span> <span class="token class-name">ProductB1</span> <span class="token keyword">implements</span> <span class="token class-name">ProductB</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Playing with Product B1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体产品B2</span>
<span class="token keyword">class</span> <span class="token class-name">ProductB2</span> <span class="token keyword">implements</span> <span class="token class-name">ProductB</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Playing with Product B2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 抽象工厂</span>
<span class="token keyword">interface</span> <span class="token class-name">AbstractFactory</span> <span class="token punctuation">{</span>
    <span class="token class-name">ProductA</span> <span class="token function">createProductA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ProductB</span> <span class="token function">createProductB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体工厂1</span>
<span class="token keyword">class</span> <span class="token class-name">Factory1</span> <span class="token keyword">implements</span> <span class="token class-name">AbstractFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ProductA</span> <span class="token function">createProductA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ProductA1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">ProductB</span> <span class="token function">createProductB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ProductB1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体工厂2</span>
<span class="token keyword">class</span> <span class="token class-name">Factory2</span> <span class="token keyword">implements</span> <span class="token class-name">AbstractFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ProductA</span> <span class="token function">createProductA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ProductA2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">ProductB</span> <span class="token function">createProductB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ProductB2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 客户端代码</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">AbstractFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Factory1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ProductA</span> productA <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createProductA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ProductB</span> productB <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createProductB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        productA<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        productB<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>优点：</p><ul><li>提供创建一组相关对象的接口，确保这些对象之间的一致性</li><li>符合开放/封闭原则，可以通过拓展新的工厂来增加产品族。</li></ul></li><li><p>缺点：</p><ul><li>难以支持新的产品种类，因为每次增加新产品类型都需要修改抽象工厂的接口。</li></ul></li></ul><h3 id="工厂模式的应用场景" tabindex="-1"><a class="header-anchor" href="#工厂模式的应用场景" aria-hidden="true">#</a> 工厂模式的应用场景：</h3><ul><li>对象创建复杂： 当对象创建过程较为复杂，涉及多个步骤或依赖其他对象时，工厂模式可以简化对象的创建</li><li>需要灵活切换不同产品： 工厂模式允许客户端代码动态选择不同的工厂，从而轻松切换使用不同的产品或产品家族。</li><li>解藕创建和使用： 工厂模式将对象的创建和使用解藕，客户端不需要知道对象创建的细节。</li></ul><p>总结：</p><ul><li><strong>简单工厂模式</strong> 适用于创建单一产品的场景，但违反开放/封闭原则</li><li><strong>工厂方法模式</strong> 让类的实例化过程延迟到子类，并且符合开放/封闭原则，适用于拓展型要求较高的场景</li><li><strong>抽象工厂模式</strong> 用于创建一组相关联的对象，确保产品族之间的一致性，适用于产品族概念明确的场景。</li></ul><p>工厂模式通过将创建逻辑与使用逻辑分离，提升了代码的灵活性，可维护性，以及拓展性。</p><h2 id="简单工厂模式和抽象工厂模式有什么区别" tabindex="-1"><a class="header-anchor" href="#简单工厂模式和抽象工厂模式有什么区别" aria-hidden="true">#</a> 简单工厂模式和抽象工厂模式有什么区别？</h2><p>简单工厂模式其实并不算是一种设计模式，更多的时候是一种编程习惯。简单工厂的实现思路是 ， 定义一个工厂类，根据传入的参数不同返回不同的实例，被创建的实例具有共同的父类或接口。</p><p>工厂方法模式是简单工厂的仅一步深化， 在工厂方法模式中，我们不再提供一个统一的工厂类来创建所有的对象，而是针对不同的对象提供不同的工厂。也就是说每个对象都有一个与之对应的工厂。工厂方法的实现思路是，定义一个用于创建对象的接口，让子类决定将哪一个类实例化。工厂方法模式让一个类的实例化延迟到其子类。</p><p>抽象工厂模式是工厂方法的仅一步深化，在这个模式中的工厂类不单单可以创建一个对象，而是可以创建一组对象。这是和工厂方法最大的不同点。抽象工厂的实现思路是，提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。</p><h2 id="说一说你对策略模式的理解" tabindex="-1"><a class="header-anchor" href="#说一说你对策略模式的理解" aria-hidden="true">#</a> 说一说你对策略模式的理解：</h2><p>策略模式是一种行为性设计模式，它定义了一系列算法，并将每个算法封装起来，使得它们可以相互替换，且算法的变化不会影响使用算法的客户端。</p><h3 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念" aria-hidden="true">#</a> 核心概念：</h3><ol><li>算法族的定义：策略模式将一个行为或算法封装成独立的类，使得不同的算法可以互相替换，并且算法的变化不会影响这些算法的客户端。</li><li>接口的定义：策略模式通过一个通用的接口来约束这些算法，以便客户端可以使用不用的策略类，但它们都实现相同的接口。</li><li>解藕策略与使用者： 策略模式将算法的实现细节从使用者分离出来，使用者无需了解具体的算法实现，只需知道如何与策略接口交互。</li></ol><h3 id="策略模式的结构" tabindex="-1"><a class="header-anchor" href="#策略模式的结构" aria-hidden="true">#</a> 策略模式的结构：</h3><ul><li>context： 持有一个 Strategy 对象的引用，负责调用算法。</li><li>strategy: 定义一系列算法的公共接口。</li><li>ConcreteStrategy： 实现策略接口的具体算法。</li></ul><ol><li>策略接口定义</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 策略接口，定义计算价格的方法</span>
<span class="token keyword">interface</span> <span class="token class-name">DiscountStrategy</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> <span class="token function">calculatePrice</span><span class="token punctuation">(</span><span class="token keyword">double</span> price<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>具体策略实现：</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 正常价格策略，不打折</span>
<span class="token keyword">class</span> <span class="token class-name">NoDiscountStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">DiscountStrategy</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">calculatePrice</span><span class="token punctuation">(</span><span class="token keyword">double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> price<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 打折策略，例如打9折</span>
<span class="token keyword">class</span> <span class="token class-name">PercentageDiscountStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">DiscountStrategy</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">double</span> discount<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">PercentageDiscountStrategy</span><span class="token punctuation">(</span><span class="token keyword">double</span> discount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>discount <span class="token operator">=</span> discount<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">calculatePrice</span><span class="token punctuation">(</span><span class="token keyword">double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> price <span class="token operator">*</span> discount<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 满减策略，例如满100减20</span>
<span class="token keyword">class</span> <span class="token class-name">FullReductionStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">DiscountStrategy</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">calculatePrice</span><span class="token punctuation">(</span><span class="token keyword">double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>price <span class="token operator">&gt;=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> price <span class="token operator">-</span> <span class="token number">20</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> price<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>上下文(使用策略的类)</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 上下文类，使用策略来计算价格</span>
<span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">DiscountStrategy</span> strategy<span class="token punctuation">;</span>

    <span class="token comment">// 设置不同的折扣策略</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setStrategy</span><span class="token punctuation">(</span><span class="token class-name">DiscountStrategy</span> strategy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>strategy <span class="token operator">=</span> strategy<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 计算最终价格</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">calculateFinalPrice</span><span class="token punctuation">(</span><span class="token keyword">double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> strategy<span class="token punctuation">.</span><span class="token function">calculatePrice</span><span class="token punctuation">(</span>price<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>客户端代码：</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ShoppingCart</span> cart <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShoppingCart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 使用不打折策略</span>
        cart<span class="token punctuation">.</span><span class="token function">setStrategy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">NoDiscountStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;正常价格: &quot;</span> <span class="token operator">+</span> cart<span class="token punctuation">.</span><span class="token function">calculateFinalPrice</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 使用打9折策略</span>
        cart<span class="token punctuation">.</span><span class="token function">setStrategy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PercentageDiscountStrategy</span><span class="token punctuation">(</span><span class="token number">0.9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;打9折后价格: &quot;</span> <span class="token operator">+</span> cart<span class="token punctuation">.</span><span class="token function">calculateFinalPrice</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 使用满减策略</span>
        cart<span class="token punctuation">.</span><span class="token function">setStrategy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FullReductionStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;满100减20后价格: &quot;</span> <span class="token operator">+</span> cart<span class="token punctuation">.</span><span class="token function">calculateFinalPrice</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>策略模式的优点：</p><ol><li>算法的可拓展性： 可以轻松的新增策略或算法，而不影响客户端的代码修改</li><li>符合开闭原则： 通过拓展策略类来增加新的算法，而无需修改已有代码。</li><li>代码复用： 相同的策略可以在多个不同的上下文中使用，避免代码重复。</li></ol><p>策略模式的缺点：</p><ol><li>客户端需要知道所有策略</li></ol><h2 id="责任链模式" tabindex="-1"><a class="header-anchor" href="#责任链模式" aria-hidden="true">#</a> 责任链模式</h2><p>责任链模式是一种行为性设计模式， 它允许多个对象都有机会处理请求，避免请求的发送者与接收者之间的耦合。该模式将处理请求的对象组成一条链，沿着这条链传递请求，直到有一个对象处理它为止。</p><h3 id="责任模式的结构" tabindex="-1"><a class="header-anchor" href="#责任模式的结构" aria-hidden="true">#</a> 责任模式的结构：</h3><ol><li>Handler(处理者/抽象类)： 定义一个处理请求的接口，并实现了设置下一个处理者的功能。</li><li>ConcreteHandler(具体处理者)： 具体处理请求的类，负责处理它所关心的请求，如果不能处理， 则将请求传递给下一个处理者。</li><li>Client(客户端)： 将请求传递给责任链中的处理者。</li></ol>`,56),c=[e];function l(o,i){return s(),a("div",null,c)}const k=n(p,[["render",l],["__file","设计模式.html.vue"]]);export{k as default};
