# Vue中的代码技巧

## 实例化判断

在Vue的构造函数里，开头有这样一段代码。

```javascript
if (!this instanceof Vue) {
    warn('Vue is a constructor and should be called with the 'new' keyword);
}
```

我们知道instanceof 运算符用于判断“构造函数的prototype属性是否出现在指定对象的原型链上”，在这里就可以判断this是不是Vue这个构造函数的实例。而一个函数内部的this指向是由函数的调用者决定的，函数由谁调用则this就指向谁。所以这里就可以判断this是通过new关键字调用，还是直接通过Vue()调用。当不是通过new关键字去创建Vue实例的时候就发出errors。

