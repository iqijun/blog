---
title: ES6常用特性（一）
date: 2017-01-23 18:22:26.0
updated: 2017-01-24 16:05:23.0
url: /archives/189
categories: 
tags: es6 | es教程 | 阮一峰
---

<blockquote>
  本文根据阮一峰老师<a href="http://es6.ruanyifeng.com/">《ECMAScript 6 入门》</a>一书记录，只记录常用特性，适合快速学习
</blockquote>

一、 Babel转码器

<ol>
<li>作用:</li>
<li>将ES6代码转换成ES5代码，从而方便从浏览器执行环境执行</li>
<li>安装配置</li>
<li>npm install babel --save-dev</li>
<li>配置文件.babelrc</li>
</ol>

<pre><code>{
"presets": [
"es2015",
"react",
"stage-2"
],
"plugins": []
}
</code></pre>

presets 字段指定转码规则

二、 let和const命令
1. let命令
1. 从一个java程序员的角度理解，let命令就和java程序中的变量定义一样，只在let命令所在的代码块内起作用（块级作用域），并且不再像var 定义变量时，可以重复定义。
2. 不存在变量提升，所以变量一定要在声明后使用。
示例代码:

<pre><code>// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
</code></pre>

<ol>
<li>暂时性假死：只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。</li>
<li>ES6可以在块级作用域内，定义函数；在块级作用域内定义的函数不能在作用域外引用</li>
<li>const命令</li>
<li>用来定义常量，常量值不可修改，即使重新赋值也不起作用。</li>
<li>如果该常量是对象，则该常量指向对象的地址，对象中的内容时可以改变的；如果不想对象内容改变可以用Object.freeze({});</li>
<li>const命令也存在暂时性假死现象</li>
</ol>

三 、 变量的解构赋值
1. 解释：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）；
2. 示例：

<pre><code>let [a, b, c] = [1, 2, 3];
a //1
b //2
c //3
</code></pre>

<ol>
<li>只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值</li>
<li>解构赋值允许指定默认值</li>
</ol>

<pre><code>let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
</code></pre>

<ol>
<li>字符串的解构赋值</li>
</ol>

<pre><code>let [a,b,c,d,e] = "hello"
a //h
b //e

</code></pre>

<ol>
<li>对象的解构赋值</li>
</ol>

<pre><code>var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
</code></pre>

对象的解构赋值，是根据对象的属性，将值赋给变量。
7. 函数参数的解构赋值

<pre><code>function add([x, y]){
return x + y;
}

add([1, 2]); // 3
</code></pre>

8.解构赋值使用场景
1. 交换变量的值

<pre><code>let x = 1;
let y = 2;

[x, y] = [y, x];
</code></pre>

<ol>
<li>从函数返回多个值</li>
<li>函数参数的定义</li>
<li>提取JSON数据</li>
</ol>

<pre><code>let jsonData = {
id: 42,
status: "OK",
data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
</code></pre>

&nbsp;