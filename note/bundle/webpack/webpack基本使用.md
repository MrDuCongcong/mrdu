# webpack基本使用

webpack是用于JavaScript应用程序的静态模块打包工具。

打包工具应该具有哪些功能？

- 死代码的去除。

在程序开发中，很多开发工具都被设计为opinionated(固执己见的)，即将很多配置被设置为默认的，不提供API允许开发者进行个性化设置。

学习webpack最好的途径就是[官网](https://webpack.js.org/)。但是在阅读官网有几点需要注意。

- 模块（moudle）

## 基本使用

## loader

loader被翻译为“加载器”或者“预处理器”。 webpack只能处理JavaScript和JSON文件，这是它自带的能力，但是在开发中我们肯定不仅限于使用JavaScript和JSON，例如css样式的样式扩展Less、Scss，JavaScript的扩展TypeScript等。loader让webpack有能力处理其他类型的文件，并将其转化为webpack能够识别的chunk，以方便并将其添加到依赖树中。

### 使用

loader有两种使用方式：

- 配置方式：在wbpack.config.js文件中指定loader。
- 内联方式：在`import`语句中显示指定loader。

#### 配置方式



#### 内联方式

### 执行顺序

### 常用的loader

## 插件（plugin）

### 使用

### 常用的Plugin

## 打包原理
