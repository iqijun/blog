---
title: es6常用特性（三）
date: 2017-02-06 17:51:54.0
updated: 2017-02-09 23:12:13.0
url: /archives/207
categories: 
tags: es6 | module | class | Iterator
---

一、Iterator
1. for...of与for...in的区别
   for...in只能获取对象的键名，不能直接获取键值；for...of允许遍历获取键值
   <code>var arr = ['a','b','c'];
   for(let a in arr){
       console.info(a); //0,1,2
   }
   for(let a of arr){
       console.info(a); //a b c
   }</code>
   for...in 可以遍历没有实现Iterator的对象，并输出键名；for...of不能够遍历未实现Iterator的对象，可以使用Object.keys()获取对象的键名数组然后进行遍历。
   ```
   var es6 = {
      edition: 6,
      committee: "TC39",
      standard: "ECMA-262"
    };

<pre><code>for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard

for (let e of es6) {
  console.log(e);
}
// TypeError: es6 is not iterable
</code></pre>

<code>2. javascript中4种遍历方法
    1. for循环</code>
    for(let i=0;i&lt;10;i++){

<pre><code>}
```
2. forEach()  特别注意：在forEach中无法使用break,continue,break命令
```
arry.forEach(function(value,index){

})
```
3. for...in
4. for...of
&lt;/code&gt;&lt;/pre&gt;

二、 class
1. 可以结合java中类的概念来理解。
2. 特别注意，this关键字指向问题
 ```
 class Logger {
      printName(name = 'there') {
        this.print(<code>Hello ${name}</code>);
      }

<pre><code>  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
</code></pre>

```
 printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。

三、Module

<ol>
<li>export default命令

export default 指定模块的默认输出，本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

<pre><code>// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as xxx } from 'modules';
// 等同于
// import xxx from 'modules';
</code></pre></li>
</ol>