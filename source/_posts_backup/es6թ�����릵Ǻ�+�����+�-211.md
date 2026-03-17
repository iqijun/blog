---
title: es6常用特性（四）
date: 2017-02-11 17:05:45.0
updated: 2017-02-11 17:06:25.0
url: /archives/211
categories: 
tags: es6 | promise | then | catch
---

一、promise
1. promsie是异步编程的一种解决方案
2. 两个特点
    （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
   （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的
3. promise catch

<pre><code>   promise.then(function(){
        xxxxx
    }).then(function(){

    }).catch(function(err){
        consloe.info(err);
    })


上面代码无论是第一个then还是第二个then抛出异常都会被catch捕获到。
</code></pre>

4. Promise.all()
    Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。
   <code>var p = Promise.all([p1, p2, p3]);</code>
   （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
5. Promise.race() 
    <code>var p = Promise.race([p1, p2, p3]);</code>
    只要p1,p2,p3中的一个状态改变，p的状态就会跟着改变，那个率先改变的 Promise 实例的返回值，就传递给p的回调函数

<pre><code>一个使用的小实例，超过5秒后，就报超时异常。
```
var p = Promise.race([
  fetch(&#039;/resource-that-may-take-a-while&#039;),
  new Promise(function (resolve, reject) {
    setTimeout(() =&gt; reject(new Error(&#039;request timeout&#039;)), 5000)
  })
])
p.then(response =&gt; console.log(response))
p.catch(error =&gt; console.log(error))
```
fetch是一个要进行的操作，第二个Promise是计时的promise，当时间超过5秒就会抛出异常。
</code></pre>