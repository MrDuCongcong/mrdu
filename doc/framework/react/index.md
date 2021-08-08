# 基本使用

React是由facebook开发的用于构建用户界面的JavaScript库。

## 安装

react和vue一样提供了三种安装方式。

1. 直接通过<script>标签引入react包。
2. 通过npm安装。
3. 
4. 使用create-react-app工具来构建一个基础的react开发环境。

## 组件



React的组件分为两种：函数组件和类组件。

### 组件的定义

#### 函数组件

函数组件是一个Javascript函数，它接受一个props对象作为参数。并返回一个react元素。这里的props对象包含了组件上定义的属性。

```jsx
// 定义了一个头像组件。组件名称开头字母必须大写，以区分html标签 
function Head(props) {    
    return (<div>             
        <img src="props.user.headUrl"></img>             
        <span>{props.user.userName}</span>            
        <div>); 
}  
```

#### 类组件

react还可以使用ES6的class定义组件,必须继承React.Component类。

```jsx
class head extends React.Component {  
    render() {    
        return <h1>hello, {props.user.userName}</h1>
    } 
}
```

React 元素是[不可变对象](https://en.wikipedia.org/wiki/Immutable_object)。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

> 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。例如，
>
> `<div/> `代表 HTML 的 div 标签，而`<Welcome/>` 则代表一个组件，并且需在作用域内使用 Welcome。

### 受控组件与非受控组件

#### 受控组件

#### 非受控组件

### 高阶组件

### Protals



## 组件的数据流

在React中，组件的数据是从上往下流动的，顾名思义，就是数据从父组件流向子组件，这个过程是通过props进行传递的。我们知道React是MVVM的框架，而组件内的数据模型就是通过state定义的。

###  state

[state](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)也称为状态，根据组件是否存在state可以将组件分为有**状态组件**和**无状态组件**。有状态组件一般指的是类组件，而无状态的组件一般指的是函数组件。但是随着React Hoos的更新，函数组件也可以是有状态的。

在类组件中，构造函数是唯一可以为state赋值的地方。

```javascript
    constructor(props: any) {
        super(props);
        this.state = {
            topList: [],
        };
    }
```

使用state有两个需要注意的地方。

- 不要直接修改state。state`的修改必须通过 ` setState() `函数进行修改，否则组件不会被重写渲染。
 ```javascript
  // 不正确的做法
  this.state.topList = [{ a:  '' b" }];
  
  // 正确做法
  this.setState({
      topList: []
  });
 ```

- state的更新可能是异步的。React可能会把多个setState合并成一个调用。因此当你调用了setState之后，state可能不会立刻更新。

#### 有状态组件和无状态组件的区别

#### 为什么State的更新是异步的 

### props



### 基本使用

### 类型检查

### Render Props

## 组件的事件

### 基本使用

### 合成事件

## 组件的生命周期



## 组件间的通信

### 父子组件的通信

### 兄弟组件的通信

### 跨组件的通信

#### 使用Context

## Hook

## 错误处理

## 测试 

## 性能优化

## 参考文档

[1]: https://medium.com/pulseque/stateful-functional-components-react-hooks-e8d533da0f0e	"ReactHooks"
[2]: https://zh-hans.reactjs.org/docs/faq-state.html	"组件状态"
[3]: https://www.cnblogs.com/makai/p/14238200.html	"react的setState到底是同步还是异步？"
[4]: https://segmentfault.com/a/1190000013040438	"React 中 setState() 为什么是异步的？"

[5]: https://juejin.cn/post/6858276396968951822	"受控组件与非受控组件"

