---
title: ES6常用特性（二）
date: 2017-01-24 16:04:04.0
updated: 2017-01-24 16:04:04.0
url: /archives/193
categories: 
tags: es6 | 阮一峰 | es6教程
---

一、字符串的扩展
1. 字符串的遍历器接口
1. ES6为字符串添加了遍历器接口，可以使用for...of 循环遍历

<pre><code>for(let code of 'string'){
console.info(code);
}

</code></pre>

<ol>
<li>includes(), startsWith(), endsWith()
三个函数的作用分别是，判断字符串中是否包含特定字符，是否以指定字符开始，是否以指定字符结束。</li>
<li>repeat(n) 将字符串复制n次</li>
<li>模板字符串</li>
</ol>

用反引号（`）标识,嵌入的变量需要写在${}中

<pre><code>function authorize(user, action) {
if (!user.hasPrivilege(action)) {
throw new Error(
// 传统写法为
// 'User '
// + user.name
// + ' is not authorized to do '
// + action
// + '.'
`User ${user.name} is not authorized to do ${action}.`);
}
}
</code></pre>

二、数值的扩展
1. Number.isFinite(), Number.isNaN()
1.用来判断是否是有限数和判断是否值为NaN
2. Number.parseInt(), Number.parseFloat()，Number.isInteger()

<pre><code>Number.isInteger("15") // false
</code></pre>

<ol>
<li>Number.EPSILON</li>
</ol>

一个极小的常量,用来设置一个可以接受的误差范围。因为在JavaScript中浮点型数值的计算是不精确的，所以当误差小于Number.EPSILON可以认为结果正确。
4. Math对象的扩展
1. Math.trunc() 用于返回数值的整数部分
2. 对指数函数，对数函数，三角函数的扩展 http://es6.ruanyifeng.com/#docs/number

三、 函数的扩展
1. 函数参数的默认值

<pre><code>function defalutVal(x,y=120){
console.info(x,y);
}
defalutVal(1); // 1 120
</code></pre>

<ol>
<li>与解构赋值默认值结合使用</li>
</ol>

<pre><code>function defalutVal({x,y=120}){
console.info(x,y);
}
defalutVal({}); //undefined 120 必须传入一个空对象否则报错 TypeError: Cannot match against 'undefined' or 'null'.

</code></pre>

<ol>
<li>函数的length属性 返回没有指定默认值的参数个数</li>
<li>rest参数 同java rest参数</li>
</ol>

<pre><code>function add(...addend){
let sum = 0;
for(let num of addend){
sum += addend
}
return sum;
}
</code></pre>

rest参数实质上将参数做为数组传入。

<ol>
<li>扩展运算符（...）</li>
</ol>

扩展运算符将数组转为按逗号分隔的参数序列，作用域rest参数相反。
1. 扩展运算符的用法
1. 合并数组

<pre><code>[1,2,3,...more]
</code></pre>

等价于es5中

<pre><code>[1,2,3].concat(more)
</code></pre>

<ol>
<li>与解构赋值结合</li>
</ol>

<pre><code>const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest // []:

const [first, ...rest] = ["foo"];
first // "foo"
rest // []
</code></pre>

<strong>如果将扩展运算符用于数组赋值，只能放在最后一个参数位置</strong>
6. 箭头函数

一种函数的方便写法，有多方便呢，见示例

<pre><code>var f = v =&amp;gt; v;
</code></pre>

等同于ES5中

<pre><code>var f = function(v) {
return v;
};
</code></pre>

<strong>箭头函数有几个使用注意点。</strong>

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作Generator函数。

四、对象的扩展
1. 对象属性的简单表示法

<pre><code>{x,y}
</code></pre>

等同于

<pre><code>{x:x,y:y}
</code></pre>

<ol>
<li>对象的函数属性的简单表示法</li>
</ol>

<pre><code>var fun = {
func :function(){
...
}
}
</code></pre>

可简写为

<pre><code>var fun = {
func(){
...
}
}
</code></pre>

<ol>
<li>属性表达式</li>
</ol>

对象的属性名也可以通过表达式来定义

<pre><code>let obj = {
[propKey]: true,
['a' + 'bc']: 123
};


//另一个例子
var lastWord = 'last word';
var a = {
'first word': 'hello',
[lastWord]: 'world'
}
a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
</code></pre>

4.Object.is() 判断两个值是否相等

<pre><code>Object.is('foo', 'foo')
// true
Object.is({}, {})
// false.
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
</code></pre>