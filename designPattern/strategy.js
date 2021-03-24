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