<template><div><h1 id="react基本使用" tabindex="-1"><a class="header-anchor" href="#react基本使用" aria-hidden="true">#</a> React基本使用</h1>
<p>React是由facebook开发的用于构建用户界面的JavaScript库。</p>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p>react提供了三种安装方式。</p>
<ol>
<li>直接通过<code v-pre>&lt;script&gt;</code>标签引入react包。</li>
<li>通过npm安装。</li>
<li>使用create-react-app工具来构建一个基础的react开发环境。</li>
</ol>
<h2 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h2>
<h3 id="创建组件" tabindex="-1"><a class="header-anchor" href="#创建组件" aria-hidden="true">#</a> 创建组件</h3>
<p>React的组件分为两种：<strong>函数组件</strong>和<strong>类组件</strong>。</p>
<h4 id="函数组件" tabindex="-1"><a class="header-anchor" href="#函数组件" aria-hidden="true">#</a> 函数组件</h4>
<p>函数组件是一个Javascript函数，它接受一个props对象作为参数。并返回一个react元素。这里的props对象包含了组件上定义的属性。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token comment">// 定义了一个头像组件。组件名称开头字母必须大写，以区分html标签 </span>
<span class="token keyword">function</span> <span class="token function">Head</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">             
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>props.user.headUrl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>img</span><span class="token punctuation">></span></span><span class="token plain-text">             
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>user<span class="token punctuation">.</span>userName<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">            
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">); 
}  
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="类组件" tabindex="-1"><a class="header-anchor" href="#类组件" aria-hidden="true">#</a> 类组件</h4>
<p>react还可以使用ES6的class定义组件,必须继承React.Component类。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">head</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>  
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    
        <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">hello, </span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>user<span class="token punctuation">.</span>userName<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>React 元素是<a href="https://en.wikipedia.org/wiki/Immutable_object" target="_blank" rel="noopener noreferrer">不可变对象<ExternalLinkIcon/></a>。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。</p>
<blockquote>
<p>组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。例如，</p>
<p><code v-pre>&lt;div/&gt; </code>代表 HTML 的 div 标签，而<code v-pre>&lt;Welcome/&gt;</code> 则代表一个组件，并且需在作用域内使用 Welcome。</p>
</blockquote>
<h3 id="受控组件与非受控组件" tabindex="-1"><a class="header-anchor" href="#受控组件与非受控组件" aria-hidden="true">#</a> 受控组件与非受控组件</h3>
<p>在学习React过程中，我们必然能够看到受控组件与非受控组件的概念。也许初看官方文档或许的确有些令人迷茫的地方。那么什么是受控组件与非受控组件呢？</p>
<p>在html元素中，通常能够与用户进行数据交互的就只有表单元素了，而在表单元素中，无论是能够接收用户输入文本数据的<code v-pre>&lt;input/&gt;</code>元素还是能够让用户进行选择的<code v-pre>&lt;select/&gt;</code>元素，它的内部都会维护一个变量（在React语境下称为state），这个变量存储着用户交互的数据。而React为了实现数据的双向绑定，必然要将数据保存在自定义的state组件中。这种由React控制表单值的组件就被称为<strong>受控组件</strong>。</p>
<p>而并未将值保存在受React控制的变量中的表单元素，就被称为<strong>非受控组件</strong>。</p>
<h2 id="渲染" tabindex="-1"><a class="header-anchor" href="#渲染" aria-hidden="true">#</a> 渲染</h2>
<h3 id="普通渲染" tabindex="-1"><a class="header-anchor" href="#普通渲染" aria-hidden="true">#</a> 普通渲染</h3>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">"react-dom/client"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">"./App"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> root <span class="token operator">=</span> ReactDOM<span class="token punctuation">.</span><span class="token function">createRoot</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"root"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.StrictMode</span></span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">App</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.StrictMode</span></span><span class="token punctuation">></span></span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="protals" tabindex="-1"><a class="header-anchor" href="#protals" aria-hidden="true">#</a> Protals</h3>
<h2 id="组件的数据流" tabindex="-1"><a class="header-anchor" href="#组件的数据流" aria-hidden="true">#</a> 组件的数据流</h2>
<p>在React中，组件的数据是从上往下流动的，顾名思义，就是数据从父组件流向子组件，这个过程是通过props进行传递的。我们知道React是MVVM的框架，而组件内的数据模型就是通过state定义的。</p>
<h3 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> state</h3>
<p><a href="https://zh-hans.reactjs.org/docs/state-and-lifecycle.html" target="_blank" rel="noopener noreferrer">state<ExternalLinkIcon/></a>也称为状态，根据组件是否存在state可以将组件分为有<strong>状态组件</strong>和<strong>无状态组件</strong>。有状态组件一般指的是类组件，而无状态的组件一般指的是函数组件。但是随着React Hoos的更新，函数组件也可以是有状态的。</p>
<p>在类组件中，构造函数是唯一可以为state赋值的地方。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">props</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">topList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用state有两个需要注意的地方。</p>
<ul>
<li>不要直接修改state。state<code v-pre>的修改必须通过 </code> setState() `函数进行修改，否则组件不会被重新渲染。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> <span class="token comment">// 不正确的做法</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>topList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span>  <span class="token string">''</span> b" <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
 
 <span class="token comment">// 正确做法</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
     <span class="token literal-property property">topList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>state的更新可能是异步的。React可能会把多个setState合并成一个调用。因此当你调用了setState之后，state可能不会立刻更新。</li>
</ul>
<h4 id="有状态组件和无状态组件的区别" tabindex="-1"><a class="header-anchor" href="#有状态组件和无状态组件的区别" aria-hidden="true">#</a> 有状态组件和无状态组件的区别</h4>
<h4 id="为什么state的更新是异步的" tabindex="-1"><a class="header-anchor" href="#为什么state的更新是异步的" aria-hidden="true">#</a> 为什么State的更新是异步的</h4>
<p>https://juejin.cn/post/6844903715921477640</p>
<h3 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> props</h3>
<h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3>
<h3 id="render-props" tabindex="-1"><a class="header-anchor" href="#render-props" aria-hidden="true">#</a> Render Props</h3>
<h2 id="组件的事件" tabindex="-1"><a class="header-anchor" href="#组件的事件" aria-hidden="true">#</a> 组件的事件</h2>
<h3 id="基本使用-1" tabindex="-1"><a class="header-anchor" href="#基本使用-1" aria-hidden="true">#</a> 基本使用</h3>
<h3 id="合成事件" tabindex="-1"><a class="header-anchor" href="#合成事件" aria-hidden="true">#</a> 合成事件</h3>
<p>https://www.yiibai.com/interview/question/1212171.html</p>
<h2 id="组件的生命周期" tabindex="-1"><a class="header-anchor" href="#组件的生命周期" aria-hidden="true">#</a> 组件的生命周期</h2>
<h2 id="组件实例" tabindex="-1"><a class="header-anchor" href="#组件实例" aria-hidden="true">#</a> 组件实例</h2>
<h2 id="组件复用" tabindex="-1"><a class="header-anchor" href="#组件复用" aria-hidden="true">#</a> 组件复用</h2>
<h3 id="高阶组件-hoc" tabindex="-1"><a class="header-anchor" href="#高阶组件-hoc" aria-hidden="true">#</a> 高阶组件 （HOC）</h3>
<h2 id="组件间的通信" tabindex="-1"><a class="header-anchor" href="#组件间的通信" aria-hidden="true">#</a> 组件间的通信</h2>
<h3 id="父子组件的通信" tabindex="-1"><a class="header-anchor" href="#父子组件的通信" aria-hidden="true">#</a> 父子组件的通信</h3>
<p>假设我们现在有两个组件，父组件<code v-pre>&lt;Counter/&gt;</code>和子组件<code v-pre>&lt;Add/&gt;</code>，下面是父子组件传参的方式。</p>
<ul>
<li>
<p>父组件通过Props将参数传递给子组件，然后子组件接收父组件传入的参数。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token comment">// Counter.js</span>
<span class="token keyword">import</span> Add <span class="token keyword">from</span> <span class="token string">"./Add"</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Add</span></span> <span class="token attr-name">num</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>num<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Add</span></span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//Add.js</span>
<span class="token keyword">function</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">传入数值：</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>num<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>子组件一般通过回调函数将参数传递给父组件。下面的示例在子组件<code v-pre>&lt;Add/&gt;</code>中添加计数按钮，按钮每次点击就将传入数值 <code v-pre>+1</code>，然后将值回传给父组件。为了让变量<code v-pre>num</code>改变后在父组件中及时将结果渲染出来，把父组件修改为Class组件， 将num放到state中，把<code v-pre>num</code>变成可响应的，</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token comment">// Counter.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Add <span class="token keyword">from</span> <span class="token string">"./Add"</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token punctuation">[</span>num<span class="token punctuation">,</span> setNum<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">temp</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setNum</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">计算结果： </span><span class="token punctuation">{</span>num<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Add</span></span> <span class="token attr-name">num</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>num<span class="token punctuation">}</span></span> <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleChange<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Add</span></span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Add.js</span>
<span class="token keyword">function</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> num <span class="token operator">=</span> props<span class="token punctuation">.</span>num<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">handleAdd</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        props<span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>num <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleAdd<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">点击 + 1</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="兄弟组件的通信" tabindex="-1"><a class="header-anchor" href="#兄弟组件的通信" aria-hidden="true">#</a> 兄弟组件的通信</h3>
<p>所谓兄弟组件，即处于同一个父组件中子组件。其实从上面父组件的通信，大家基本就能看出，如何进行兄弟组件间的通信：其最方便的方式便是经过父组件，由父组件进行中转，将参数传给其他子组件、调用子组件的方法。</p>
<p>在上面父子组件中的通信示例中，再添加另一个子组件<code v-pre>&lt;Sub/&gt;</code>，sub组件中添加按钮，每次点击按钮就将传入参数<code v-pre>-1</code>, 并将计算结果通过回调参数传回父组件。这样子组件<code v-pre>&lt;Add/&gt;</code>和<code v-pre>&lt;Sub/&gt;</code>，通过父组件<code v-pre>&lt;Counter/&gt;</code>实现了<code v-pre>num</code>变量的共享。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token comment">// Sub.js</span>
<span class="token keyword">function</span> <span class="token function">Sub</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> num <span class="token operator">=</span> props<span class="token punctuation">.</span>num<span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">onClick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        num <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        props<span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>onClick<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">点击 - 1</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="跨级组件的通信" tabindex="-1"><a class="header-anchor" href="#跨级组件的通信" aria-hidden="true">#</a> 跨级组件的通信</h3>
<p>跨级组件通信指的是相隔多个级别的组件间的通信。它们和父子组件、兄弟组件间的通信不一致的是：组件间嵌套过深、甚至压根处于不同分支上的组件间的通信（页面上的组件通常被组织为一棵组件树），这样就不能简单的通过Props或者回调来通信了。</p>
<p>当组件处于同一个分支的时候，通常使用<code v-pre>Context</code>进行通信，当组件处于不同分支时，通常使用<code v-pre>Event Bus</code>通信。当然，Event Bus相对Context要灵活的很多。</p>
<h4 id="使用context" tabindex="-1"><a class="header-anchor" href="#使用context" aria-hidden="true">#</a> 使用Context</h4>
<p>Context是一个典型的生产者-消费者（Provider-Consumer）模式。当订阅了Context的消费者的组件，能从组件树中，离自己最近的生产者中获取值。Context的使用包含创建和使用两个部分。我们先介绍Context的API，然后再通过Demo说明如何使用Context。</p>
<p>Context的相关API包含下面几个：</p>
<ul>
<li>
<p>React.createContext(defaultValue)</p>
<p>通过调用该API,就可以创建一个Context对象。defaultValue是传入的默认值， 当订阅了Context消费者的组件，没有从树中匹配到生产者时，defaultValue才会生效</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">const</span> Context <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span>defaultValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>Conext.displayName</p>
<p>Context对象能够设置display属性，React DevTools 使用该字符串来确定 context 要显示的内容。</p>
</li>
<li>
<p>Context.Provider</p>
<p>Provider是Context对象上的生产者组件。使用Provider标签包裹的后代组件都能够访问到Provider组件传入的value。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Context.Provider</span></span> <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token comment">/* 需要传给后代的值 */</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ChildComponent</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">ChildComponent</span></span><span class="token punctuation">></span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Context.Provider</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<ol>
<li>Provider可以嵌套使用，但是同一个Context的Provider嵌套时，里层的值会覆盖外层的值。</li>
<li>Provider能够监听到value值的变化，当value值变化时，它内部的所有消费者组件都会重新渲染。</li>
<li>其实value传入的值也可以是对象，该对象可以包含一个回调函数，用来更新传入的值。</li>
</ol>
<ul>
<li>
<p>Context.Consumer</p>
<p>Consumer是一个消费者组件，此组件可以让你在<a href="https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components" target="_blank" rel="noopener noreferrer">函数式组件<ExternalLinkIcon/></a>中可以订阅 context。但是这要求消费</p>
<p>组件必须把一个函数作为子元素，这个函数接受Provider传入的值, 并返回一个React元素节点</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">FunComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Context.Consumer</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span><span class="token parameter">value</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>value<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Context.Consumer</span></span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Class.contextType</p>
<p>contextType是自定义的类组件上的静态属性，可以被赋值为创建的Context对象，这样就可以在类组件内部通过<code v-pre>this.Context</code>来访问生产者传入的值。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">ClazzComponet</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> contextType <span class="token operator">=</span> Context<span class="token punctuation">;</span>

    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>value<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，也可以在类外部赋值。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code>ClazzComponet<span class="token punctuation">.</span>contextType <span class="token operator">=</span> Context<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p>接下来我们通过一个demo演示Context的使用。</p>
<ol>
<li>
<p>创建Context。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token comment">// Context.js</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> CounterContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">num</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token function-variable function">handleChange</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

CounterContext<span class="token punctuation">.</span>displayName <span class="token operator">=</span> <span class="token string">"CounterContextName"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> CounterContext<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在Account组件中添加一个Provider组件，将包含一个num变量及改变num变量的回调函数的对象，作为值传入其包裹的子组件及其后代。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Counter <span class="token keyword">from</span> <span class="token string">"./Counter"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> CounterContext <span class="token keyword">from</span> <span class="token string">"./Context"</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Account</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> contentType <span class="token operator">=</span> CounterContext<span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">num</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>handleChange <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleChange</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">handleChange</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            num<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">num</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>num<span class="token punctuation">,</span>
            <span class="token literal-property property">handleChange</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleChange<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token punctuation">(</span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CounterContext.Provider</span></span> <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>provider<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Counter</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Counter</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">CounterContext.Provider</span></span><span class="token punctuation">></span></span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Account<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在Counter类组件中，订阅Provider传入的value值，并展示对象值的num变量。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Add <span class="token keyword">from</span> <span class="token string">"./Add"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> CounterContext <span class="token keyword">from</span> <span class="token string">"./Context"</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span><span class="token operator">&lt;</span>any<span class="token punctuation">,</span> any<span class="token operator">></span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> contextType <span class="token operator">=</span> CounterContext<span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> num <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token punctuation">(</span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">计算结果： </span><span class="token punctuation">{</span>num<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Add</span></span> <span class="token attr-name">num</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>num<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Add</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Counter<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在Add函数组件中，订阅Provider传入的value值，并通过传入的回调函数，更改值中的num变量。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> CounterContext <span class="token keyword">from</span> <span class="token string">"./Context"</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> num <span class="token operator">=</span> props<span class="token punctuation">.</span>num<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CounterContext.Consumer</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">context</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">const</span> <span class="token punctuation">{</span> handleChange <span class="token punctuation">}</span> <span class="token operator">=</span> context<span class="token punctuation">;</span>

                <span class="token keyword">return</span> <span class="token punctuation">(</span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
                        <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                            <span class="token function">handleChange</span><span class="token punctuation">(</span>num <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
                    <span class="token punctuation">></span></span><span class="token plain-text">
                        点击 + 1
                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">CounterContext.Consumer</span></span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Add<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="使用event-bus" tabindex="-1"><a class="header-anchor" href="#使用event-bus" aria-hidden="true">#</a> 使用Event Bus</h4>
<h2 id="hook" tabindex="-1"><a class="header-anchor" href="#hook" aria-hidden="true">#</a> Hook</h2>
<h3 id="hook-api" tabindex="-1"><a class="header-anchor" href="#hook-api" aria-hidden="true">#</a> Hook API</h3>
<h3 id="hook如何" tabindex="-1"><a class="header-anchor" href="#hook如何" aria-hidden="true">#</a> Hook如何</h3>
<h2 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h2>
<h2 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h2>
<h2 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化" aria-hidden="true">#</a> 性能优化</h2>
<h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档" aria-hidden="true">#</a> 参考文档</h2>
</div></template>


