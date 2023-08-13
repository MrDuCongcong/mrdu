<template><div><h1 id="前端工程的管理方式及解决方案" tabindex="-1"><a class="header-anchor" href="#前端工程的管理方式及解决方案" aria-hidden="true">#</a> 前端工程的管理方式及解决方案</h1>
<p>https://blog.csdn.net/qq_21567385/article/details/118590143</p>
<p>https://blog.logrocket.com/exploring-workspaces-other-advanced-package-manager-features/</p>
<p>https://www.readfog.com/a/1658320214914338816</p>
<p>https://www.jianshu.com/p/dde6a01c4094</p>
<h3 id="将vue-cli项目改造为monorepo" tabindex="-1"><a class="header-anchor" href="#将vue-cli项目改造为monorepo" aria-hidden="true">#</a> 将Vue-Cli项目改造为monorepo</h3>
<p><a href="https://github.com/lerna/lerna/issues/2571" target="_blank" rel="noopener noreferrer">lerna已经很少维护了<ExternalLinkIcon/></a></p>
<p>根据Vue-cli官网插件使用教程</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"vuePlugins"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"resolveFrom"</span><span class="token operator">:</span> <span class="token string">".config"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="lerna使用" tabindex="-1"><a class="header-anchor" href="#lerna使用" aria-hidden="true">#</a> Lerna使用</h2>
<h3 id="工作模式" tabindex="-1"><a class="header-anchor" href="#工作模式" aria-hidden="true">#</a> 工作模式</h3>
<p>lerna有两种工作模式：fixed（locked）模式，independent模式。</p>
<p>对于</p>
<h3 id="lerna-json配置" tabindex="-1"><a class="header-anchor" href="#lerna-json配置" aria-hidden="true">#</a> lerna.json配置</h3>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// 全局使用的包的位置数组。它匹配包含package.json的目录。</span>
    <span class="token property">"packages"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"packages/*"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 当前仓库的版本</span>
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"0.0.0"</span><span class="token punctuation">,</span>
    <span class="token comment">// 使用指定的client去运行命令</span>
    <span class="token property">"npmClient"</span><span class="token operator">:</span> <span class="token string">"npm"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lerna命令" tabindex="-1"><a class="header-anchor" href="#lerna命令" aria-hidden="true">#</a> lerna命令</h3>
<p>运行<code v-pre>learna --help</code>命令可以查看所有可用的</p>
<p>常用命令：</p>
<ul>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/bootstrap#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna bootstrap</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/run#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna run</code><ExternalLinkIcon/></a></p>
</li>
</ul>
<p>不常用命令</p>
<ul>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/publish#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna publish</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/version#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna version</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/list#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna list</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/changed#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna changed</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/diff#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna diff</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/exec#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna exec</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/init#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna init</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/add#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna add</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/clean#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna clean</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/import#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna import</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/link#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna link</code><ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/create#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna create</code><ExternalLinkIcon/></a></p>
<p>创建一个新的，由lerna管理的包。</p>
</li>
<li>
<p><a href="https://github.com/lerna/lerna/blob/main/commands/info#readme" target="_blank" rel="noopener noreferrer"><code v-pre>lerna info</code><ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


