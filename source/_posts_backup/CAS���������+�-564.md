---
title: CAS问题简述
date: 2019-05-20 23:53:51.0
updated: 2021-09-27 09:27:46.0
url: /archives/564
categories: 
tags: java | 面试 | CAS | ABA
---

<h3>1. 什么是CAS</h3>
<ol>
<li>compareAndSwap 对比并交换，是一条CPU原语，执行必须是连续的不能够被打断。Atomic类使用CAS原理实现</li>
<li>
<p>java语言中利用，sun.misc.Unsafe类实现了CAS</p>
<ol>
<li>
<p>java8中里有do...while循环实现了CAS</p>
<pre><code>public final int getAndSetInt(Object paramObject, long paramLong, int paramInt)
  {
    int i;
    do
      i = getIntVolatile(paramObject, paramLong);
    while (!(compareAndSwapInt(paramObject, paramLong, i, paramInt)));
    return i;
  }</code></pre>
<p>其中compareAndSwapInt方法调用native方法，保证了comparedandSwap不能被打断，即保证了操作的原子性</p>
</li>
</ol>
</li>
</ol>
<h3>2. CAS有什么优点</h3>
<ol>
<li>不使用锁，可以增大并发量</li>
</ol>
<h3>3. CAS有什么缺点</h3>
<ol>
<li>由于利用do...while循环实现的cas所以在一直操作不成功的时候会造成CPU消耗过高</li>
<li>ABA问题</li>
</ol>
<h3>4. 什么是ABA问题</h3>
<ol>
<li>线程T1，T2将主内存中的变量x的值A拷贝到各自的工作内存中，但T1的执行速度比T2要快。</li>
<li>此时T1先将变量x更改为B，然后写回到主内存，然后继续执行，将变量x值再改为A写回到主内存。</li>
<li>此时如果线程T1更改变量x值，是可以更改成功的，这是因为T1在compareAndSwap的时候主内存中的值仍然是A</li>
<li>这就情况便是ABA问题，即虽然一个线程可以通过比较并设置值（也就是可以获取到和当时从主内存拷贝的值相同的值），但变量的值有可能在这之前被修改过</li>
</ol>
<h3>5. 怎么解决ABA问题</h3>
<ol>
<li>增加一个版本号或者时间戳属性，先判断版本号或者时间戳是否相等</li>
<li>jdk自带的AtomicStampedReference，添加了版本号对比</li>
</ol>
<h3>6. 原子引用</h3>
<ol>
<li>除了jdk自带的Atomic，如果我们自定义的类要实现CAS，可以使用AtomicReference，使用示例见<a href="https://github.com/iqijun/javastudy/tree/master/src/main/java/com/fullstacker/study/course/concurrent/AtomicRefDemo.java">github代码</a></li>
<li>带stamp的原子引用使用示例，见<a href="https://github.com/iqijun/javastudy/tree/master/src/main/java/com/fullstacker/study/course/concurrent/AtomicStampedReferenceDemo.java">github代码</a></li>
</ol>