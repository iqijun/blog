---
title: java线程间通讯
date: 2017-03-24 14:35:46.0
updated: 2017-03-24 14:35:46.0
url: /archives/254
categories: 
tags: java | 线程通讯 | join | wait | notify
---

一、 wait,notify方法使用示例：

<pre><code>package com.fullstacker.study.course.concurrent;

/**
 * 线程间通讯
 *
 * @author xingguishuai
 * @create 2017-03-17-13:25
 **/
public class ThreadComunicate {

    public static void main(String[] args) throws InterruptedException {
        final Object lock = new Object();
        int count = 0;

        Thread thread = new Thread(new Runnable() {
            int count = 0;
            @Override
            public void run() {
                while (true) {
                    synchronized (lock) {
                        System.out.println(Thread.currentThread().getName() + ":子线程:"+count);

                        count++;
                        if(count==5){
                                lock.notify();
//                            try {
//                                lock.wait();
//                            } catch (InterruptedException e) {
//                                e.printStackTrace();
//                            }
                        }
                        if(count &gt; 10){
                            break;
                        }
                    }
                }

            }
        });
        thread.start();
        synchronized(lock){
            while (true){
                System.out.println(Thread.currentThread().getName()+":"+count);
                count++;
                if(count==5){
                    lock.wait();
                }
                if(count&gt;10){
                    break;
                }
            }
        }
    }

}

</code></pre>

<ol>
<li>wait，notify方法都属于Object对象。</li>
<li>调用wait方法后，线程释放资源，等待notify方法唤醒</li>
</ol>

二、 join方法

<pre><code>package com.fullstacker.study.course.concurrent;

/**
 * join方法使用示例
 *
 * @author xingguishuai
 * @create 2017-03-24-14:22
 **/
public class ThreadJoin {
    /**
    * &lt;p&gt;功能描述：在执行thread2过程中，调用thread1.join()方法后，thread2线程暂停，而后thread1继续执行，待thread1执行完毕thread2继续执行&lt;/p&gt;
    * @return
    * @param
    * @author xingguishuai
    * @Date 2017-03-24 14:27
    * @since 1.0
    */
    public static void main(String[] args){

        final Thread thread1 = new Thread(new Runnable() {
            @Override
            public void run() {
                int i =0;
                while (i&lt;10){
                    System.out.println(Thread.currentThread().getName()+":"+i);
                    i++;
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        thread1.start();
        Thread thread2 = new Thread(new Runnable() {
            @Override
            public void run() {
                int i =0;
                while (i&lt;10){
                    System.out.println(Thread.currentThread().getName()+":"+i);
                    i++;
                    try {
                        thread1.join();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        thread2.start();
    }

}

</code></pre>

<ol>
<li>在执行thread2过程中，调用thread1.join()方法后，thread2线程暂停，而后thread1继续执行，待thread1执行完毕thread2继续执行</li>
<li>join方法可以将将两个交叉执行线程转换为线性执行，如例所示：在调用thread1.join()后，thread2线程就要等待thread1执行完毕后再继续执行。</li>
</ol>