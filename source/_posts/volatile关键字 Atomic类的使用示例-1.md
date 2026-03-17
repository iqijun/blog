---
title: volatile关键字 Atomic类的使用示例
date: 2017-03-16 18:37:06.0
updated: 2017-03-16 21:38:44.0
url: /archives/249
categories: 
tags: volatile | Atomic | 并发编程 | 并发
---

<ol>
<li>volatile在只有一个线程写，但是存在多个线程读的时候使用，从而避免了使用synchronized,提高读写性能。</li>
</ol>

<pre><code>/**
 * valitile关键字
 *
 * @author xingguishuai
 * @create 2017-03-13-16:01
 **/
public class VolatileVariable extends Thread{

    private volatile Integer count = 0;
    public  void addCount(){
        System.out.println(Thread.currentThread().getName()+"：count自增"+count++);
    }
    public  void run(){
        while (count &lt; 3){
            //do nothing
        }
        //跳出循环结束，子线程结束
        System.out.println("count为"+count);
    }
    public static void main(String[] args) throws InterruptedException {
        //例1
        VolatileVariable volatileVariable = new VolatileVariable();
        //启动子线程，执行run方法
        volatileVariable.start();
        Thread.sleep(1000);
        volatileVariable.addCount();
        Thread.sleep(1000);
        volatileVariable.addCount();
        Thread.sleep(1000);
        volatileVariable.addCount();
}
</code></pre>

<ol>
<li>当多个线程同时进行写操作时，不保证原子性，可以用atomic类来代替</li>
</ol>

例：

<pre><code>package com.fullstacker.study.course.concurrent;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * Atomic类示例，多线程间保持原子性
 *
 *
 * @author xingguishuai
 * @create 2017-03-14-10:33
 **/
public class AtomicCount {
    private static AtomicInteger atomicInteger = new AtomicInteger(0);
    /**
    * &lt;p&gt;功能描述：&lt;/p&gt;
     * t1,t2,t3三个线程修改atomicInteger，
     * 由于AtomicInteger在进行修改操作时会对值“加锁”，所以AtomicInteger可以保持原子性，
     * 所以在三条线程都进行完修改后，最后的结果为3000，但在三条线程未完全结束时，输出的数字
     * 不一定。
    * @return
    * @param
    * @author xingguishuai
    * @Date 2017-03-16 15:43
    * @since 1.0
    */
    public static void main(String[] args){

        Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                int count =0;
                while(count&lt;1000){
                    atomicInteger.incrementAndGet();
                    count++;
                }
                System.out.println(Thread.currentThread().getName()+":"+atomicInteger.get());
            }
        },"t1");
        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {
                int count =0;
                while(count&lt;1000){
                    atomicInteger.incrementAndGet();
                    count++;
                }
                System.out.println(Thread.currentThread().getName()+":"+atomicInteger.get());
            }
        },"t2");
        Thread t3 = new Thread(new Runnable() {
            @Override
            public void run() {
                for(int count=0;count&lt;1000;count++){
                    atomicInteger.incrementAndGet();
                }
                System.out.println(Thread.currentThread().getName()+":"+atomicInteger.get());
            }
        },"t3");
        t1.start();
        t2.start();
        t3.start();
    }
}
</code></pre>

源码可参考我的GitHub项目：https://github.com/iqijun/javastudy/blob/ed901c2187e535b5d00e0f113baca2ef10099ef3/src/main/java/com/fullstacker/study/course/concurrent