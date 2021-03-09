/**
 * 策略模式
 * 策略模式的定义是：定义一系列算法，并封装起来，并可以让它们能够相互替换。
 * 使用它的目标是拆分我们业务中变化的部分和不变的部分，如何使用好策略模式的关键就在于
 * 我们是否能够准确的识别变化的部分和不变的部分。
 */

/**
 * 我们需要实现的业务
 */

 /**
  * 变化的部分是什么？ 随着业务的变化，注册所需要的用户信息可能增加，校验规则可能会变化。
  * 不变的部分是什么？ 不变的部分就是点击注册时，需要执行校验流程，当校验通过后发起用户请求，如果
  * 校验没有通过则告诉用户错误信息。
  */

 let validateUserInfo = {
    username: function(value) {
        if (value.trim() === '') {
            return '用户名不能为空！';
        }
    },
    password: function(value) {
        if (value.trim() === '') {
            return '密码不能为空';
        }
    },
    mail: function(value) {
        if (value.trim() === '') {
            return '邮箱不能为空';
        }
    }
 }

function validate(form, callback) {

    let errorInfo = {};

    if (form.toString() !== '[object Object]') {
        return;
    }

    Object.keys(form).forEach((prop) => {
        const value = form[prop];
        const validator = validateUserInfo[prop];
        if (validator) {
            const result = validator(value);
            if (result) {
                errorInfo[prop] = result;
            }
        }
    })

    if (JSON.stringify(errorInfo) !== '{}') {
        return callback(errorInfo);
    } 

    callback();
}

function submit() {
    const userInfo = {
        username: '张三',
        password: '',
        mail: '',
    };


    validate(userInfo, (err) => {
        if (err) {
            console.log('错误信息', err);
        } else {
            console.log('验证通过');
        }
    })
}

submit();