/*-------------------------------------缓存代理------------------------------------------ */

function compute() {
    let result = 0;
    for (let i = 0; i < arguments.length; i +=1) {
        result += arguments[i];
    }
    return result;
}

const  proxyCompute = (function() {
    let cache = {};
    return function() {
        let list = Array.prototype.slice.call(arguments);
        let key = list.join(',');
        if (key in cache) {
            console.log('使用缓存', cache);
            return cache[key];
        } 
        console.log('计算值', cache);
        return cache[key] = compute(...list);
    }
})();

let result1 = proxyCompute(1, 2, 3, 4);
let result2 = proxyCompute(1, 2, 3, 4);
console.log(result1, result2);

/*-------------------------------------虚拟代理------------------------------------------ */

