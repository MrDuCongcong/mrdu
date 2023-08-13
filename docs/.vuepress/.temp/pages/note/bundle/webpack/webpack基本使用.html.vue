<template><div><h1 id="webpack基本使用" tabindex="-1"><a class="header-anchor" href="#webpack基本使用" aria-hidden="true">#</a> webpack基本使用</h1>
<p>webpack是用于JavaScript应用程序的静态模块打包工具。</p>
<p>打包工具应该具有哪些功能？</p>
<ul>
<li>死代码的去除。</li>
</ul>
<p>在程序开发中，很多开发工具都被设计为opinionated(固执己见的)，即将很多配置被设置为默认的，不提供API允许开发者进行个性化设置。</p>
<p>学习webpack最好的途径就是<a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a>。但是在阅读官网有几点需要注意。</p>
<ul>
<li>模块（moudle）</li>
<li>编译器（compiler）</li>
</ul>
<h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h2>
<h2 id="配置选项" tabindex="-1"><a class="header-anchor" href="#配置选项" aria-hidden="true">#</a> 配置选项</h2>
<h3 id="模式-mode" tabindex="-1"><a class="header-anchor" href="#模式-mode" aria-hidden="true">#</a> 模式（mode）</h3>
<p>mode字段告知webpack使用何种模式，进行相应的内置优化。它有两种配置方式：</p>
<ul>
<li>
<p>配置对象中提供mode选项。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpackConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'development'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>通过CLI参数传递。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>webpack <span class="token parameter variable">--mode</span> <span class="token operator">=</span> development
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p>mode可以被设置可选三个值：development、production和none，当值被设置为none时，表示不使用任何优化项。并且如果没有通过配置文件或者CLI设置mode时，CLI将有可能使用有效的NODE_ENV的值作为mode。</p>
<p>把mode的值设置为development或production时，实际上是将DefinePlugin中process.env.NODE_ENV设置为相应的值。但是需要注意的是这并不是在node上添加了环境变量，具体内容查看DefinePlugin。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpackConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"development"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">const</span> webpackConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token string-property property">"process.env.NODE_ENV"</span><span class="token operator">:</span> <span class="token string">"development"</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="devtool" tabindex="-1"><a class="header-anchor" href="#devtool" aria-hidden="true">#</a> devtool</h3>
<p>devtool用来控制是否生成，以及如何生成source-map。在<RouterLink to="/note/browser/sourcemap.html">source-map</RouterLink>那一章节我们可以了解到什么是source-map。</p>
<p>配置devtool很简单，但是其<a href="https://webpack.docschina.org/configuration/devtool/#devtool" target="_blank" rel="noopener noreferrer">可配置的值<ExternalLinkIcon/></a>有二十 多项。并且官网中对于配置值的解释却令人迷惑，下面主要是对官网中的内容解释。</p>
<p>devtool虽然有二十多个可配置的值，但是它们的值主要由下面几个词进行组合。</p>
<ul>
<li>eval。使用eval执行每个模块。这样做的好处是rebuild时会非常快。</li>
<li>cheap。生成的source map中只有行信息，而没有列信息，编译计算量少，</li>
<li>inline。不生成单独的source map文件，而是把source-map转换为DataUrl后添加到bundle中。</li>
<li>module。使用loader输出的source map信息。</li>
<li>hidden。bundle中不包含source map的信息。</li>
</ul>
<p>官网中对devtool的可选值列了一个表格。其中每行列的含义如下。</p>
<ul>
<li>performance。这个使用不同source map后打包速度的描述。build表示初次打包的性能，rebuild表示的是修改代码保存后再次打包的性能。该性能被分为slowest、slow、ok、fast、fastest五个档。</li>
<li>production。表示能够用于生产环境。</li>
</ul>
<p>当然官网中也对于不同场景使用哪些值做了比较。在开发环境我们通常使用<code v-pre>eval-cheap-module-source-map</code>，在生产环境则不生成source-map。</p>
<h2 id="loader" tabindex="-1"><a class="header-anchor" href="#loader" aria-hidden="true">#</a> loader</h2>
<p>loader被翻译为“加载器”或者“预处理器”。 webpack只能处理JavaScript和JSON文件，这是它自带的能力，但是在开发中我们肯定不仅限于使用JavaScript和JSON，例如css样式的样式扩展Less、Scss，JavaScript的扩展TypeScript等。loader让webpack有能力处理其他类型的文件，并将其转化为webpack能够识别的chunk，以方便并将其添加到依赖树中。</p>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>loader有两种<a href="https://webpack.docschina.org/concepts/loaders/#using-loaders" target="_blank" rel="noopener noreferrer">使用<ExternalLinkIcon/></a>方式：</p>
<ul>
<li>配置方式：在wbpack.config.js文件中指定loader。</li>
<li>内联方式：在<code v-pre>import</code>语句中显示指定loader。</li>
</ul>
<h4 id="配置方式" tabindex="-1"><a class="header-anchor" href="#配置方式" aria-hidden="true">#</a> 配置方式</h4>
<p>loader是被配置在<code v-pre>module.rules</code>数组中的，这意味可以配置多个加载器。一个常见的配置方式如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpackConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                <span class="token literal-property property">include</span><span class="token operator">:</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token literal-property property">exclude</span><span class="token operator">:</span> config<span class="token punctuation">.</span>jsexclude<span class="token punctuation">,</span>
                <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">"vue-loader"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">compilerOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">preserveWhitespace</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(scss|css)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>isProd <span class="token operator">?</span> MiniCssExtractPlugin<span class="token punctuation">.</span>loader <span class="token operator">:</span> <span class="token string">"style-loader"</span><span class="token punctuation">,</span> <span class="token string">"css-loader"</span><span class="token punctuation">,</span> <span class="token string">"sass-loader"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，使用loader把<code v-pre>vue</code>和<code v-pre>scss、css</code>文件转换为webpack可以处理的模块。配置项含义如下：</p>
<ul>
<li>rule.test。通常使用正则表达式匹配loader需要处理的文件。</li>
<li>rule.include。指向需要处理的文件，可以文件或者文件夹。通常被配置为文件夹，<code v-pre>rule.test</code>在<code v-pre>rule.include</code>配置的文件下匹配。</li>
<li>rule.exclude。用于排除<code v-pre>rule.inclue</code>配置中不需要被打包的文件，也就是说<code v-pre>rule.exclude</code>是<code v-pre>rule.include</code>配置的子集。</li>
<li>rule-loader。<code v-pre>rule.loader</code>是<code v-pre>rule.use: [{loader}]</code>的简写。</li>
<li>rule-use。它的值可以是字符串（如：<code v-pre>use: {'style-loader'}</code>），也可以是<code v-pre>useEntries</code>数组。</li>
<li>rule-options。它用来个loader传递参数，<code v-pre>rule.options</code>是<code v-pre>rule.use: [{options}]</code>的简写。</li>
</ul>
<p>详细的配置方式参考<a href="https://webpack.docschina.org/configuration/module/#modulerules" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></p>
<h4 id="内联方式" tabindex="-1"><a class="header-anchor" href="#内联方式" aria-hidden="true">#</a> 内联方式</h4>
<p>在import语句（或任何<a href="https://webpack.docschina.org/api/module-methods" target="_blank" rel="noopener noreferrer">与“import”方法同等的引入方式<ExternalLinkIcon/></a>）中显示指定loader。使用<code v-pre>!</code>把资源中的loader分开。每个部分都相对于当前目录解析。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Styles <span class="token keyword">from</span> <span class="token string">'style-loader!css-loader?modules!./styles.css'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过import添加前缀，可以覆盖配置中的loader，preLoader和<code v-pre>postloader</code>。</p>
<ul>
<li>
<p>使用 <code v-pre>!</code> 前缀，将禁用所有已配置的 normal loader(普通 loader)。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Styles <span class="token keyword">from</span> <span class="token string">'!style-loader!css-loader?modules!./styles.css'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用 <code v-pre>!!</code> 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Styles <span class="token keyword">from</span> <span class="token string">'!!style-loader!css-loader?modules!./styles.css'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用 <code v-pre>-!</code> 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Styles <span class="token keyword">from</span> <span class="token string">'-!style-loader!css-loader?modules!./styles.css'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="执行顺序" tabindex="-1"><a class="header-anchor" href="#执行顺序" aria-hidden="true">#</a> 执行顺序</h3>
<h3 id="常用的loader" tabindex="-1"><a class="header-anchor" href="#常用的loader" aria-hidden="true">#</a> 常用的loader</h3>
<p>在webpack官网可以看到<a href="https://webpack.docschina.org/loaders/" target="_blank" rel="noopener noreferrer">常用的loader<ExternalLinkIcon/></a>，更多的loader查看<a href="https://webpack.docschina.org/awesome-webpack/#loaders" target="_blank" rel="noopener noreferrer">awesome webpack<ExternalLinkIcon/></a>。</p>
<h2 id="插件-plugin" tabindex="-1"><a class="header-anchor" href="#插件-plugin" aria-hidden="true">#</a> 插件（plugin）</h2>
<p>插件用于增强webpack的能力，例如：打包优化、资源管理、注入环境变量等。它是一个具有apply方法的JavaScript对象，apply方法可以被webpack compiler调用，并且在整个编译声明周期都可以访问compiler对象。</p>
<h3 id="基本使用-1" tabindex="-1"><a class="header-anchor" href="#基本使用-1" aria-hidden="true">#</a> 基本使用</h3>
<p>插件的使用很简单，有两种使用方式：配置方式和node API。</p>
<ul>
<li>
<p>配置方式。在配置对象的plugins数组中，传入一个 plugin的new实例，并在创建实例时传入参数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpackConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// 添加了一个模块热更新插件</span>
        <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>HotModuleReplacementPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// 添加了html模板插件</span>
        <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">"./examples/index.tpl"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"./index.html"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">favicon</span><span class="token operator">:</span> <span class="token string">"./examples/favicon.ico"</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>node API方式调用。在创建插件示例时，并通过apply调用实例时传入compiler对象。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 访问 webpack 运行时(runtime)</span>
<span class="token keyword">const</span> configuration <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./webpack.config.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> compiler <span class="token operator">=</span> <span class="token function">webpack</span><span class="token punctuation">(</span>configuration<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProgressPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span><span class="token punctuation">;</span>

compiler<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> stats</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>插件的执行顺序也很重要，但是和loader执行顺序不同的是：插件是绑定到webpack编译器的事件上的，在编译器触发某个事件时，相关插件就会被执行。</p>
<h3 id="常用的plugin" tabindex="-1"><a class="header-anchor" href="#常用的plugin" aria-hidden="true">#</a> 常用的Plugin</h3>
<p>在webpack官网中列出了<a href="https://webpack.docschina.org/plugins/" target="_blank" rel="noopener noreferrer">常用的插件<ExternalLinkIcon/></a>，更多的插件查看 <a href="https://webpack.docschina.org/awesome-webpack/#webpack-plugins" target="_blank" rel="noopener noreferrer">awesome webpack<ExternalLinkIcon/></a>。</p>
<h4 id="defineplugin" tabindex="-1"><a class="header-anchor" href="#defineplugin" aria-hidden="true">#</a> DefinePlugin</h4>
<p>DefinePlugin用于在<strong>编译时</strong>将代码中的变量替换为其他值或者表达式，它常常用来定义变量来区分花环境。例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> webpackConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token string-property property">"process.env.NODE_ENV"</span><span class="token operator">:</span> <span class="token string">"development"</span><span class="token punctuation">,</span>
            <span class="token constant">VERSION</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token string">"5fa3b9"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再代码中这样使用它。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">"development"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Do Something"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Do Other Something"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DefinePlugin并不是简单的在全局变量下定义了这些变量，然后在代码中直接使用这些变量。它只是编译期的变量替换工据，这意味着它在webpack的编译阶段就已经完成了变量的替换工作，而不会影响到全局变量。例如：</p>
<p>上面根据上面的配置，代码会被编译为：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Do Something"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="打包原理" tabindex="-1"><a class="header-anchor" href="#打包原理" aria-hidden="true">#</a> 打包原理</h2>
<p>webpack打包是一个串行的过程，从启动到结束经历下面几个阶段。</p>
<ol>
<li>初始化参数。将配置文件中的参数、命令行传入参数、默认参数合并，生成编译器参数。</li>
<li>开始编译。根据上面得到的参数初始化compiler对象，加载所有插件，执行<code v-pre>run()</code>方法。</li>
<li>确定入口。根据配置找出所有编译入口。</li>
<li>编译模块。从入口触发，调用已加载的loader对模块进行编译。找出该模块的依赖模块，然后在使用loader处理。递归执行本步骤。</li>
<li>完成模块编译。此时一句得到了一个模块的依赖树。</li>
<li>输出资源。根据入口和模块之间的依赖关系，组成成一个个包含多个模块的chunk。</li>
<li>输出完成。确定编译输出的路径和文件名，将文件内容输出到配置的路径和文件名。</li>
</ol>
<h2 id="使用问题" tabindex="-1"><a class="header-anchor" href="#使用问题" aria-hidden="true">#</a> 使用问题</h2>
<h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档" aria-hidden="true">#</a> 参考文档</h2>
</div></template>


