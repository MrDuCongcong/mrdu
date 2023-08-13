<template><div><h3 id="literal" tabindex="-1"><a class="header-anchor" href="#literal" aria-hidden="true">#</a> literal</h3>
<p>value代表这个值。</p>
<p>literals代表如何表达这个值。</p>
<p>譬如说，15这是一个值，这个值是唯一的，但表达的方式有很多种：例如用阿拉伯数字写出来：15，用中文写出来：十五，用英文表达：fifteen，用16进制：0xF。</p>
<p>15是value，后面的种种都是literal，一个值可以用多种literal表达，值也可以是表达式的结果：如1+2的值就是3。</p>
<p>但一般来说表达式不认为是字面量，字面量指那种直接代表某个常数值的一种表达形式。</p>
<p>文邹邹一点，因为所有的程序都是字符序列。所以literal定义就可以是，在所处上下文中，表达某个特定的值的字符序列。<a href="https://www.zhihu.com/question/21502764/answer/18433806" target="_blank" rel="noopener noreferrer">参考自<ExternalLinkIcon/></a></p>
<h3 id="basename" tabindex="-1"><a class="header-anchor" href="#basename" aria-hidden="true">#</a> basename</h3>
<p>通常指的是文件路径中的文件名。在Linux系统中，存在<code v-pre>basename</code>命令，用法如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">basename</span> /usr/bin/sort       输出<span class="token string">"sort"</span>。
$ <span class="token function">basename</span> ./include/stdio.h .h  输出<span class="token string">"stdio"</span>。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="search-params和search" tabindex="-1"><a class="header-anchor" href="#search-params和search" aria-hidden="true">#</a> search Params和search</h3>
<h3 id="side-effect" tabindex="-1"><a class="header-anchor" href="#side-effect" aria-hidden="true">#</a> side effect</h3>
<p><code v-pre>side effect</code>直白的翻译就是“副作用”，引申自医学术语。在编程领域，则是对于一个函数而言的，说一个函数“有副作用”或者“无副作用”。</p>
<p>如果一个函数修改了自己范围之外的资源，那就是有做作用，反之，就是没有副作用。</p>
<p>如果一个函数修改函数作用域内之外定义的其它资源，就很容易做出超出用户的预料之外的行为，所以直接翻译成“副作用”还是很贴切的。</p>
<h3 id="boilerplate-code" tabindex="-1"><a class="header-anchor" href="#boilerplate-code" aria-hidden="true">#</a> boilerplate  code</h3>
<p>可以简单的翻译为样板代码。在我们使用不同的语言、框架时，常常会有一些基本设定，或者一些需要重复写的代码。为了避免进行重复的工作，就出现一些工具，根据你的需求，产生不同的样板。</p>
</div></template>


