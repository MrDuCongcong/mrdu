<template><div><h1 id="tsconfig-json详解" tabindex="-1"><a class="header-anchor" href="#tsconfig-json详解" aria-hidden="true">#</a> tsconfig.json详解</h1>
<p>tsconfig.json是typescript的配置文件，该文件所在的目录表示当前目录是typescript项目的根目录。使用tsconfig.json最重要的有两个目的：</p>
<ul>
<li>
<p>指定待编译的文件。</p>
</li>
<li>
<p>配置编译选项。</p>
</li>
</ul>
<p>当然，该配置文件也可以是其他名字，但你必须显式其路径。它有两种使用方式：</p>
<ul>
<li>运行tsc命令时，通过<code v-pre>--project</code>或者<code v-pre>-p</code> 命令行选项显示指定tsconfig.json文件的目录，或者直接指定.配置json文件的路径。</li>
<li>若运行tsc命令时没有显式指定该文件或文件目录的时候，编译器会从当前目录开始，并向父目录开始查找该文件。</li>
</ul>
<p>tsconfig.json文件主要包含5个大的配置项：&quot;files&quot;、&quot;include&quot;、&quot;exclude&quot;、&quot;compilerOptions&quot;、&quot;extends&quot;。</p>
<h2 id="files" tabindex="-1"><a class="header-anchor" href="#files" aria-hidden="true">#</a> files</h2>
<p>需要编译的单个文件的列表。可以使用相对或者绝对路径。当然，该配置项只适用于引入少量文件。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"files"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">"./utils/typeHeler.ts"</span><span class="token punctuation">,</span>
        <span class="token string">"test.ts"</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="include" tabindex="-1"><a class="header-anchor" href="#include" aria-hidden="true">#</a> include</h2>
<p>需要编译的文件或目录。它支持global通配符。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"include"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">"src"</span><span class="token punctuation">,</span>
        <span class="token string">"scripts/**/*"</span><span class="token punctuation">,</span>
        <span class="token string">"test/*"</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="exclude" tabindex="-1"><a class="header-anchor" href="#exclude" aria-hidden="true">#</a> exclude</h2>
<p>需要排除的文件或目录，仅用于更排除掉&quot;include&quot;<code v-pre>设置中包含的文件。虽然它能够过滤掉</code>&quot;include&quot;<code v-pre>引入的文件，但是</code>files<code v-pre>和</code><reference><code v-pre>明确指定的文件却会始终包含在内。默认情况下回排除掉 </code>node_modules<code v-pre>、</code>bower_components<code v-pre>、</code>jspn_packages<code v-pre>目录和</code><outDir>`目录。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"exclude"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string">"dist"</span><span class="token punctuation">,</span>
        <span class="token string">"node_"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>默认情况下，编译器包含需要编译的目录及子目录下所有的TypeScript文件（<code v-pre>.ts</code>、<code v-pre>.d.ts</code>、<code v-pre>.tsx</code>）文件。</p>
<p><code v-pre>&quot;include&quot;</code>和<code v-pre>&quot;exclude&quot;</code>配置时可以使用globa通配符：</p>
<ul>
<li><code v-pre>*</code>匹配0或多个字符（不包含目录分隔符）</li>
<li><code v-pre>?</code>匹配任意一个字符（不包含目录分隔符）</li>
<li><code v-pre>**/</code>递归匹配任意子目录</li>
</ul>
</blockquote>
<h2 id="extends" tabindex="-1"><a class="header-anchor" href="#extends" aria-hidden="true">#</a> extends</h2>
<h2 id="compolieroptions" tabindex="-1"><a class="header-anchor" href="#compolieroptions" aria-hidden="true">#</a> compolierOptions</h2>
<h3 id="类型检查" tabindex="-1"><a class="header-anchor" href="#类型检查" aria-hidden="true">#</a> 类型检查</h3>
<h4 id="allowunreachablecode-允许不可访问的代码" tabindex="-1"><a class="header-anchor" href="#allowunreachablecode-允许不可访问的代码" aria-hidden="true">#</a> allowUnreachableCode（允许不可访问的代码）</h4>
<p>不可访问的代码即那些永远不可能被执行的代码。allowUnreachable配置项决定我们如何处理那些永远不会被执行的代码。它有三个值：</p>
<ul>
<li>undefined（默认）：编译时抛出建议作为wraning。</li>
<li>true：不可访问的代码会被忽略掉，即允许存在不可访问的代码。</li>
<li>false：抛出一个不可访问代码的相关编译错误。</li>
</ul>
<h4 id="allowunusedlabels-允许未使用的标签" tabindex="-1"><a class="header-anchor" href="#allowunusedlabels-允许未使用的标签" aria-hidden="true">#</a> allowUnusedLabels（允许未使用的标签）</h4>
<p>虽然通常标签在javascript中使用非常少。但是ts依然提供了针对标签的配置选项。它也有三个值：</p>
<ul>
<li>undefined（默认）：编译时在编辑器中抛出建议作为warning。</li>
<li>true：未被使用的标签会被忽略掉，允许存在未被使用的标签。</li>
<li>false：抛出一个关于存在未被使用的标签的错误。</li>
</ul>
<h4 id="alwaysstrict" tabindex="-1"><a class="header-anchor" href="#alwaysstrict" aria-hidden="true">#</a> alwaysStrict</h4>
<p>确保文件使用严格模式进行解析。</p>
<h4 id="exactoptionalpropertytypes-精确的可选属性类型" tabindex="-1"><a class="header-anchor" href="#exactoptionalpropertytypes-精确的可选属性类型" aria-hidden="true">#</a> exactOptionalPropertyTypes（精确的可选属性类型）</h4>
<h4 id="nofallthroughcasesinswitch-在switch没有落空case" tabindex="-1"><a class="header-anchor" href="#nofallthroughcasesinswitch-在switch没有落空case" aria-hidden="true">#</a> noFallthroughCasesInSwitch（在Switch没有落空Case）</h4>
<h4 id="maproot" tabindex="-1"><a class="header-anchor" href="#maproot" aria-hidden="true">#</a> mapRoot</h4>
<h4 id="moduleresolution" tabindex="-1"><a class="header-anchor" href="#moduleresolution" aria-hidden="true">#</a> moduleResolution</h4>
</div></template>


