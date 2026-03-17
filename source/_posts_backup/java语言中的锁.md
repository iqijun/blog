---
title: java语言中的锁
date: 2019-05-27 21:39:34.0
updated: 2019-05-27 21:39:34.0
url: /archives/566
categories: 
tags: java | 重入锁 | 锁 | 自旋锁
---

<ol>
<li>从java的集合线程安全开始说起

<ol>
<li>平时经常使用的集合类如ArrayList,LinkedList,HashSet等以及Map都是线程不安全的，如果进行多线程操作会出现线程安全问题，那么java是如何解决这些常用类的线程安全问题呢</li>
<li>几个常用的保证集合类线程安全的方法

<ol>
<li>使用synchronized关键字  </li>
<li>使用Collections提供的工具方法保证线程安全，底层还是使用Synchronized关键字

Collections.synchronizedCollection(list)
Collections.synchronizedList()
Collections.synchronizedSet();
Collections.synchronizedMap();</p></li>
<li><p>使用juc包中的提供的集合类：

CopyOnWriteArrayList
CopyOnWriteArraySet
ConcurrentHashMap

copyOnWrit类在新增元素的时候，会将add方法加锁，防止其他线程调用add方法时产生线程不安全问题。在加锁后，回将底层保存元素的数组copy一份，并利用这个拷贝的副本创建一个新的数组，然后将要追加的元素放到新数组中, 最后保存元素的数组指向包含要追加元素的新数组,然后解锁</p></li>
</ol></li>
</ol></li>
<li><p>使用锁和synchronized来保证线程安全的对比

<ol>
<li>原始构成

<ol>
<li>synchronized是java的关键字，是在jvm层面的实现，底层利用moniter实现

<ol>
<li>jvm层面在进入被synchronized块包围的代码块是执行 moniterenter命令，跳出时执行moniterexit命令</li>
</ol></li>
<li>lock是在语言层面的实现，它是在jdk5之后新出现的一个java类</li>
</ol></li>
<li>使用方法

<ol>
<li>使用synchronized关键字不需要用户手动释放锁，即使代码出现异常锁也会被释放</li>
<li>使用lock需要手动释放锁，否则会出现死锁情况；配合try--catch-finally代码块使用lock，unlock加锁，释放锁</li>
</ol></li>
<li>等待是否可中断

<ol>
<li>synchronized的不能被中断，一旦进入synchronized代码块，代码要不正常执行完，要么出现异常跳出代码块</li>
<li>使用lock可以出现中断</li>
</ol></li>
<li>是否是公平锁

<ol>
<li>synchronized为非公平锁</li>
<li>lock可以是公平锁也可以是非公平锁，默认是非公平锁</li>
</ol></li>
<li>锁绑定多个条件condition

<ol>
<li>lock可以实现分组唤醒，可以精确唤醒需要唤醒的线程，而synchronized要么唤醒一个线程要么唤醒全部线程，无法精确控制
lock绑定多条件示例代码见 <a href="https://github.com/iqijun/javastudy/tree/master/src/main/java/com/fullstacker/study/course/concurrent/ReentrantLockDemo.java">iqijun/javastudy</a></li>
</ol></li>
</ol></li>
<li>java中锁的分类

<ol>
<li>公平锁和非公平锁

<ol>
<li>公平锁是指按申请锁的顺序来获得锁</li>
<li>非公平锁是指随机抢占锁，而不是按照顺序获得</li>
<li>非公平锁可能会造成优先级反转问题和饥饿现象（线程长时间获取不到锁），但非公平锁的吞吐量比较大</li>
<li>ReentrantLock默认为非公平锁，synchronized也是非公平锁</li>
</ol></li>
<li>可重入锁（递归锁）

<ol>
<li>可重入锁是指当线程获得了外层方法的锁之后，也可以进入到需要相同锁的内部方法。而不需要在进入到内部方法时重新获取锁。</li>
<li>比如

<pre><code>/**
 * @program: course
 * @description: 重入锁演示
 * 重入锁又叫递归锁，当线程在外城方法中获得到锁以后，它边默认可以进入到需要相同锁的内部方法中
 * 如示例中methodA和methodB都需要获得lock，当线程在进入到methodA中时获取到lock，那边它便可以顺利进入到methodB中
 * 而不需要在进入到methodB的时候重新获取锁
 * @author: xingguishuai
 * @create: 2019-05-25 14:45
 */
public class ReentredLockDemo {

    Lock lock  = new ReentrantLock();

    public static  void main(String[] args){
       final   ReentredLockDemo reentredLockDemo = new ReentredLockDemo();
        for (int i = 0; i &lt; 10; i++) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    reentredLockDemo.methodA();
                }
            },"Thread_"+i).start();
        }
    }


    public void methodA(){
        lock.lock();
        try {
            System.out.println(Thread.currentThread().getName()+"进入mthodA,获得到锁");
            methodB();
        }catch (Exception e){

        }finally {
            lock.unlock();
        }

    }

    public  void methodB(){
        lock.lock();
        try {
            System.out.println(Thread.currentThread().getName()+"进入mthodB,获得到锁");
        }catch (Exception e){

        }finally {
            lock.unlock();
        }
    }

}
</code></pre></li>
<li>可重入锁的好处是可以有效避免死锁现象。这是因为减少了锁抢占</p></li>
<li><p>ReentrantLock,synchronized都是可重入锁</p></li>
</ol></li>
<li><p>独享锁、共享锁

<ol>
<li>独享锁是指该锁一次只能被一个线程所持有。共享锁是指该锁可被多个线程所持有。

ReentrantLock,synchronized都是独享锁，ReadWriteLock的readLock是共享锁

<ol>
<li>共享锁和不加锁的区别</li>
</ol>

加的共享锁之后，就不能再次加独享锁。可以实现多条线程去读，但读的同时不能有写操作</p></li>
</ol></li>
<li><p>自旋锁

自旋锁是指在线程获取锁不成功的时候，不会将线程阻塞，而是通过不断的重试来获取锁.

自旋锁的好处是减少了线程上下文切换的消耗

但由于自旋锁通过循环不停的尝试获取锁，会造成cpu的消耗</p></li>
</ol></li>
<li><p>java中锁的实现原理</p></li>
</ol>

<p>java中锁是完全利用java语言实现的，它的实现利用了cas原理和AbstractQueuedSynchronizerl类