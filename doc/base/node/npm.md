## NPM

​    随着Node.js的出现，js不再受限于运行在浏览器中了，大量优秀的js代码出现，为了能够更好的分享、重用这些海量的代码，npm应运而生。

​    NPM包含三个部分：

1. 仓库。即用来管理被分享在NPM仓库中各种包的公共数据库，里面包含了包的各种信息。当然，你也可以搭建自己私有的仓库。

2. 网站。开发者可以通过这个网站来查找自己所需的包和这个包的相关信息。在网站上你可以搜索到三类包：

   ​       ⑴ 可以在服务端使用的node模块

   ​       ⑵ 可以为npm cli添加命令的包

   ​       ⑶ 可以在前端使用的包

3.  命令行界面（CLI）。开发者在本地主要是通过在终端中进行npm包的安装、卸载等操作，也可以通过命令进行npm网站的登录,账户信息修改等操作。

## **NPM环境安装**

npm的安装有两种方式：

- 通过Node.js一起安装。
- 使用Node版本管理器（NVM）安装。

   使用Node.js安装时会在获取本地权限的目录中安装npm，但是在全局运行npm软件包时会可能会有权限错误。使用NVM安装npm的好处是你可以切换任意版本的Node和npm.

npm版本：

​    npm的发布节奏是很稳定的，一般有最新版本和下一个版本。latest   npm发布的是一个npm的稳定版，next npm是一个npm的最新未发布版本，最终next npm会被发布为一个稳定版，但是被发布为latest npm的next npm版本可能会与next npm版本的功能

​    在安装Node.js的时候会同时安装npm，但是npm的发布会比node.js更频繁，因此当你想将npm升级为最新稳定版是可运行以下命令：

​    npm install npm@latest -g

​    当你想将客户端更新为next发行版，可以运行以下命令：

​    npm install npm @next -g

## **NPM本地环境配置**

​    npm可以在本地客户端配置注册表，并从该注册表发布或者安装包。可以通过以下配置其它的npm Enterprise注册表。

​    1.将公司私有的npm Enterprise注册表配置为默认的注册表(你可以将以下地址替换为自己的注册表)。

   npm config set registry https://registry.conpany_registry.npme.io/

​    2.使用npmrc管理多个注册表的不同配置文件。例如当你需要在不同的注册表(用于工作相关代码的npm Enterprise注册表和用于开源代码的npmjs.com注册表)中进行包的安装和发布，则可以通过npmrc工具为每个注册表创建和管理不同的配置文件。

​    ⑴ 安装npmrc。

​    npm install npmrc -g

​    ⑵ 创建npm配置文件。

​    安装npmrc之后，创建一个企业配置文件来访问公司的Enterprise注册表。例如创建一个“work”的的概要文件：

​    npmrc -c work

​     在执行上述命令后，你可以在windows的C:\Users\你的Windows账户\.npmrcs路径下看到一个名为work的配置文件，同时在该路径下还存在一个默认的default的配置文件。

​     为配置文件设置公司的Enterprise注册表。当你在运行下面命令的时候可以在work中配置或者切换注册表。

​    npm config set registry https://registry.company_registry.io/

​    ⑶ 你可以使用（2）中的命令为其他配置表创建不同的配置文件。

​    ⑷ 切换不同的注册表配置文件。假如你还创建了一个名为test的配置文件的时候，在你执行完下面命令后，你会发现C:\Users\你的Windows账户\.npmrc文件中配置的当前注册表变成了test文件中的配置的注册表了。

​    npmrc test

​    3.配置范围指向不同的注册表。例如要使用company_registry注册表的@company_scope域，同时继续从公共注册表安装公共包。以下命令将@company_scope替换为域，并使用公共的注册表。

npm login --login=@company_scope registry=https://registry.common_registry.io/

## **包和模块**

### ***包和模块简介***

​    npm的注册表实际上就是一个存储Javascript包的数据库，每个JavaScript包都包含着相应的代码和用于描述该代码的元数据，这些元数据被保存在一个package.json文件中。npm的注册表中存储的可以是包或者是Node模块，下面区别一下包和模块。

-    包：对于包来说，每一个包都必须包含一个package.json文件。只有包含package.json文件的包才能被发布到注册表中。

-    模块：模块可以是node_modules目录下的文件或者文件夹，可以被Node.js require函数加载，一个模块必须满足以下条件之一：


1.  一个包含拥有main字段的package.json文件的文件夹。

2.  包含index.js文件的文件夹。

3.   一个js文件。


>    **由于模块不需要包含package.json文件，因此不是所有的模块都是包，必须满足上述条件的模块才是包。**
>

### *** 包的scope ***

​       为了避免包名相同而导致的冲突和‘误植’攻击，npm在版本2之后就命名当对命名方式进行了修改。npm在之后的命名过程中不允许使用大写字母，也不允许使用名称相近的包名。你在注册一个用户或者组织名称的时候，即被分配了一个相匹配的域，你可以使用该域作为命名空间，使用命名空间允许你与别人使用相同的包名而不至于发生冲突。为了避免范围和权限的混淆，你可以将以下范围的概念替换成命名空间，这样你可能比较好理解。

​    含有域的包以其域开头，例如@npm/package-name,在@和/之间的部分即域。例如下面两个同时作为package.json中的依赖包，虽然包名相同，但实际上是两个不同的包。

​    npm scope:         @npm/package_name    npmcorp scope:      @npmcorp/package_name

###     包的范围和可见性：

​    ⑴ 未限定范围的包总是公共的。

​    ⑵ 私有包总是有scope的。

 ⑶ 默认情况下，你发布的包是有范围的，你必须在发布时在命令行添加参           数以使其成为一个公共范围的包。

   其实这里的scope仅仅是作为一个命名空间，就像Java中包的全路径，指定了从哪里引入这个包，而不是说这个包能够使用的范围。

   包的可见性取决包的范围（命名空间）和包所设置的访问权限。请严格区分有范围（无范围）和公共（私有）之间的区别。可参考官网。同时也只有用户才能创建和管理没有范围的包。

**4.2.1 关于公共包**

⑴ 任何人和组织都可以下载和使用全局公共注册表中的无范围包。

   ⑵ 组织和用户都可以创建有范围的公共包。但在使用时必须一起范围开头。

**4.2.2 关于私有包**

​       私有包总是具有具有范围的。

   ⑴ 用户范围内的私有包，只能被用户授予读写权限的其他协作者所访问。

   ⑵ 组织范围内的私有包，只能被组织授予读写权限的团队所访问。

**五、发布一个包**

**5.1 package.json文件**

​         前面说过，对于一个包来说，必须包含package.json文件。package.json文件存在的意义就是为了以便他人安装和管理包，其包含是描述包的元数据。

​    package.json文件的作用：

​    ⑴ 列出该包所依赖的其他包。

​    ⑵ 使用语义版本控制规则描述包的版本。

​    ⑶ 使你的包具有重用性。更容易与他人共享。

**5.1.1 package.json字段:**

​    package.json必须包含“name”和“version”字段，也可选择包含“author”作者信息的字段。你可以使用npm命令行工具提供的命令创建package.json文件，运行以下命令，并回答命令中的问题。

​    npm init

​      你也可以使用以下两种方式来更改使用命令来创建的package.json文件中的内容。

​     ⑴ 在主目录下创建.npm-init.js文件，并添加类似于以下内容

​    module.export = {      newFiled: "这是一个新的字段",      secondFiled: "这是一个新的字段"    }

​     或者使用prompt函数添加问题。

​    moudule.export = prompt("这个包的作者？", "这个包的功能？")   

​     然后在npm init命令后面添加-yes或者-y标记来使用从.npm-init.js文件提取的信息。

​     ⑵ 你也可以之间使用命令来全局配置默认配置选项

​    npm set init.author.email "ducongcong@163.com"    npm set init.author.name "ducongcong"

**5.2 语义版本规则**

   语义版本控制规则即根据包的更新范围来对版本版本号进行更新。有规则的对版本号进行更新可以帮助使用其依赖的开发人员决定版本更新的范围，保证了JS生态系统的健康、可靠和安全。其规则如下：

​    包的首发              其版本号一般从1.0.0开始

​    向后兼容的bug修复     版本号的第三位加1

​    向后兼容的新功能      版本号的第二位加1，第三位置0

​    破坏性的新功能的增加  版本号的第一位加1，后两位置0

**5.3 README.MD文件**

​    README文件可以帮助别的开发人员快速了解你的包，README是一个markdown文件，里面可以包含你的包的安装、配置及使用说明。

​     只有在发布版本软件包时，才会在软件包页面上更新README文件。更新 README.md文件的可以执行以下命令：

​    npm version patch    npm publish

**5.4 创建和发布一个包**

​    在windows下我们可以通过以下命令创建一个文件夹作为包，然后在下面不同场景的使用相应命令创建进行不同的包，注意需要将注册表切换到你需要即将发布的注册表地址并登陆。

​    mkdir your-package-name

**5.4.1 无范围的包**

​    ⑴ 运行以下命令初始化包

​    npm init

​    ⑵ 将公共包发布到注册表

​    npm publish

**5.4.2 有范围的包**

​    ⑴ 初始化包是指定范围。当你想发布有范围的包你时候，你必须将包的范围指定为你的账户或者组织的账户。

​    npm init -scope=@your-scope

​    ⑵ 你需要将你的范围包发布为公共的，可执行以下命令:

​    npm publish -access=public

​           当然你也可以将你的包发布为私有的，但你必须注册在npm网站注册私有套餐，但是需要收费，所以你执行以下命令会报错。

​    npm publish

**5.5 在package.json文件中指定dependencies和devDenpdencies**

​        你可能需要在package.json文件中指定两个属性，并在不同情况下将包添加到不同的属性下。

​    ⑴ “dependencies”：你的应用程序在生产环境中所需要的依赖包，需要在安装命令指定--save-prod标记。

​    npm install --save-prod           

​    ⑵ “devDenpdencies”：在本地开发和测试使用的包，需要指定--save-dev标记。

​    npm install --save-dev

**5.6 dist-tags分发标记**

​    dist-tag用于组织和标记不同版本的软件包，是对语义版本控制规则的补充,提供的是别名而不是版本号。默认情况下，运行npm publish会用latest标记你的包。你也可以使用以下命令来指定标签。标签和与语义版本共享命名空间，因此要避免冲突，尽量不适用数字和字母‘v’开头。

​    npm publish --tag <tag_name>

​        ⑴ 添加标记到指定版本

​    npm dist-tag add <package_name>@<version>  <tag_name>

​          ⑵ 删除标记

​    npm dist-tag rm <package_name> <tag_name>

​        ⑶ 标记列表 

​    npm dist-tag ls <package_name>

**六、包的使用** 

**6.1 包的安装**

⑴ 包的检索。我们可以去npm官网去查找我们所项目中所需要的包。npm官    网中会使用npms分析器，从人气、质量、维护三个维度去为我们检索最优的包。

⑵ 包的安装。npm包的安装有全局安装和本地安装（局部安装）两种方式。具体选择哪种安装方式取决于你的使用意图了。

 ▪ 如果你的项目在使用过程中需要依赖于某个包，则建议使用本地安装。

​       ▪ 如果你想为npm添加一个命令的话，建议采用全局安装。

6.2 本地安装

⑴ 本地安装包，需要全局安装加-g。

​    npm install <package_name>

⑵ 本地安装有范围的公共包，全局安装加-g。

​    npm install @scoope/package_name

6.3 包的更新

⑴ 更新包请允许以下命名，全局更新加-g。

​    npm update

⑵  检查本地的包是否有需要更新的。

​    npm outdates

⑶  要查看需要更新的全局包，请在命令行上运行。

​    npm outdate -g --depth=0

**七、常用命令**

⑴ npm build

这是一个由npm link和npm install组成的管道命令。将项目打成一个包。

[1]: https://juejin.cn/post/6844903870104092680	"为什么引入 npm 包 我们能引入直接使用"
[2]: https://zhuanlan.zhihu.com/p/337659303	"npm打包时需要注意哪些？如何利用webpack来更好的构建？"

