---
title: spring 面试零散问题
date: 2021-08-22 16:39:01.0
updated: 2021-08-22 21:03:27.0
url: /archives/666
categories: 未分类
tags: 
---

<h4>1. spring IOC的优点</h4>
<ol>
<li>使用spring ioc可以使业务逻辑与组件解耦</li>
</ol>
<p>如果不使用IOC，那么在调用某个组件时需要手动new一个对象，如</p>
<pre><code>XXXService xx = new XXXServiceImpl();</code></pre>
<p>如果业务变动不在是有XXXServiceImpl实现类，需要修改代码中所用创建对象的位置。如果使用spring可以通过修改配置文件来完成</p>
<h4>2.spring aop的优点</h4>
<ol>
<li>抽离公共逻辑与业务逻辑解耦</li>
</ol>
<h4>3. IOC的实现原理</h4>
<h4>4. AOP的实现原理</h4>
<h4>5. spring事务的实现原理</h4>
<h4>6. spring事务的传播性</h4>
<h4>7. cglib与jdk动态代理的区别</h4>
<p>jdk动态代理基于接口，实现了接口的类会优先使用jdk动态代理</p>
<h4>8. spring bean是线程安全的吗</h4>
<ol>
<li>根据bean的作用域来区分
a. 默认singleton，是线程不安全的
b. prototype</li>
</ol>