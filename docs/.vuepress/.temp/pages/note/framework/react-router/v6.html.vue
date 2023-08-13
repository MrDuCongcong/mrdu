<template><div><h1 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h1>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>React Router是搭配React框架的路由系统，其已经成为了React事实上的官方路由库，为React构造的单页面应用提供了路由跳转等功能。由于React Router版本更新的问题，本片文章将以v6版本为主。</p>
<p>在<a href="https://reactrouter.com/core/guides/quick-start" target="_blank" rel="noopener noreferrer">React Router v5<ExternalLinkIcon/></a> 官网，我们可以看到React Router是被分为三个部分的：core、web和native，它们也分别对应着react-route、react-router-dom和react-router-native三个包。</p>
<ul>
<li>react-router：实现路由的核心功能。</li>
<li>react-router-dom：基于react-router，在浏览器运行环境中增加了一些功能，例如：Link组件，会渲染一个标签，BrowerRouter和HashRouter组件，前者使用pushState和popState事件构建路由，后者使用 window.hash 和 hashchange 事件构建路由，已经依赖 react-router 库。</li>
<li>react-router-native：基于react-router，类似react-router-dom，加入了react-native运行环境中的一些功能。</li>
</ul>
<h2 id="react-router-dom" tabindex="-1"><a class="header-anchor" href="#react-router-dom" aria-hidden="true">#</a> react-router-dom</h2>
<p>在router-router-dom中组件分为三类：</p>
<ul>
<li>路由器，例如<BrowserRouter>和<HashRouter>，对应着实现路由跳转的history模式和hash模式。</li>
<li>路由匹配器，例如<Route>和<Switch>。</li>
<li>导航，例如<Link>、<NavLink>、<Redirect>。</li>
</ul>
<h3 id="嵌套路由" tabindex="-1"><a class="header-anchor" href="#嵌套路由" aria-hidden="true">#</a> 嵌套路由</h3>
<h2 id="路由传参" tabindex="-1"><a class="header-anchor" href="#路由传参" aria-hidden="true">#</a> 路由传参</h2>
</div></template>


