# JSX

react和vue一样，但是react没有人为的将构建ui的html标签和用于逻辑处理的js相分离，而是将逻辑和标签放在一个称为“组件”的松耦合的单元中，以期能够实现组件复用、将整个项目模块化。

react采用JSX来创建项目的最小单位：元素，组件是由元素构成的。但React不强制使用JSX。

## 表达式

react的表达式写在大括号中的。

```jsx
const name = "张三"; 
const element = <hl>你好， {name}</h1>
// react将所有元素渲染到一个节点上。 
ReactDOM.render(element, document.getElementById('root'));
```

## 特定属性

1. 使用引号将属性值指定为字符串字面量。

```jsx
const element = <div tabIndex="0"></div>
```

使用大括号给属性值插入表达式。

```jsx
const tabIndex = 0; const element = <div tabIndex={tabIndex} ></div>
```

## 本质

babel会把JSX转化为一个React.createElement()函数调用。该函数的参数组成的对象称为“元素”，对象详细内容后面在说。

```
const element = <h1 tabIndex="0">hello</h1> 
// 转化为 
const element = React.createElement( 'h1', {tabIndex: 0}, 'hello' );
```
