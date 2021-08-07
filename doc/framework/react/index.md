# 基本使用

## 安装

react和vue一样提供了三种安装方式。

1. 直接通过<script>标签引入react包。
2. 通过npm安装。
3. 使用create-react-app工具来构建一个基础的react开发环境。

## JSX

react和vue一样，但是react没有人为的将构建ui的html标签和用于逻辑处理的js相分离，而是将逻辑和标签放在一个称为“组件”的松耦合的单元中，以期能够实现组件复用、将整个项目模块化。

react采用JSX来创建项目的最小单位：元素，组件是由元素构成的。但React不强制使用JSX。

### 表达式

react的表达式写在大括号中的。

```jsx
const name = "张三"; 
const element = <hl>你好， {name}</h1>
// react将所有元素渲染到一个节点上。 
ReactDOM.render(element, document.getElementById('root'));
```

### 特定属性

1. 使用引号将属性值指定为字符串字面量。

```jsx
const element = <div tabIndex="0"></div>
```

使用大括号给属性值插入表达式。

```jsx
const tabIndex = 0; const element = <div tabIndex={tabIndex} ></div>
```

### 本质

babel会把JSX转化为一个React.createElement()函数调用。该函数的参数组成的对象称为“元素”，对象详细内容后面在说。

```
const element = <h1 tabIndex="0">hello</h1> 
// 转化为 
const element = React.createElement( 'h1', {tabIndex: 0}, 'hello' );
```



## 组件

### 组件的定义

React的组件分为两种：函数组件和class组件。

函数组件。函数组件是一个Javascript函数，它接受一个props对象作为参数。并返回一个react元素。这里的props对象包含了组件上定义的属性。

```jsx
// 定义了一个头像组件。组件名称开头字母必须大写，以区分html标签 
function Head(props) {    
    return (<div>             
        <img src="props.user.headUrl"></img>             
        <span>{props.user.userName}</span>            
        <div>); 
}  
```

class组件。react还可以使用ES6的class定义组件,必须继承React.Component类。

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

### state

### 组件间的通信

#### 父子组件的通信

#### 兄弟组件的通信

#### 跨组件的通信







