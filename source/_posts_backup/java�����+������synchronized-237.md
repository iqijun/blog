---
title: java多线程之synchronized
date: 2017-02-28 22:53:59.0
updated: 2017-03-15 23:06:47.0
url: /archives/237
categories: 
tags: java | 多线程 | synchronized | 重入锁
---

一、最基本用法

<pre><code>public class MyThread extends Thread{

private Integer count = 5;

public synchronized void run(){
count--;
System.out.println(Thread.currentThread().getName() + ":" + count);
}

public static void main(String[] args){
MyThread myThread = new MyThread();
Thread t1 = new Thread(myThread, "T1");
Thread t2 = new Thread(myThread, "T2");
Thread t3 = new Thread(myThread, "T3");
Thread t4 = new Thread(myThread, "T4");
t1.start();
t2.start();
t3.start();
t4.start();
}

}
</code></pre>

如上，启动4个线程t1,t2,t3,t4同时访问属性count，由于方法run()被关键字synchronized修饰，所以可以保证count属性被同步访问，可以避免多个线程同时访问造成的数据错误。

二、多线程访问同一个类的多个对象相同一个方法

<pre><code>/**
* 多线程访问同一个类的多个对象相同一个方法
*
* @author xingguishuai
*
**/
public class MutiThread {

public synchronized void print(String name) throws InterruptedException {
Integer age;
if("Tom".equalsIgnoreCase(name)){
age = 10;
System.out.println("name:" + name + " has set age");
Thread.sleep(1000);
}else{
age = 5;
System.out.println("name:" + name + " has set age");
}
System.out.println("name:" + name + "age:" + age);
}

public static void main(String[] args){
final MutiThread m1 = new MutiThread();
final MutiThread m2 = new MutiThread();

Thread thread1 = new Thread(new Runnable() {
public void run() {
try {
m1.print("tom");
} catch (InterruptedException e) {
e.printStackTrace();
}
}
});

Thread thread2 = new Thread(new Runnable() {
public void run() {
try {
m2.print("tomcat");
} catch (InterruptedException e) {
e.printStackTrace();
}
}
});
thread1.start();
thread2.start();
}
}

</code></pre>

如上，MutiThread两个实例m1,m2，两个线程分别去执行m1,m2的print()方法，输出结果：

<pre><code>name:tom has set age
name:tomcat has set age
name:tomcat age:5
name:tom age:10
</code></pre>

可以看出两个实例的方法执行不是同步的。
如果，想要让这两个线程同步执行可以在print方法上添加static关键字。

<pre><code>public static synchronized void print(String name) throws InterruptedException{
....
}
</code></pre>

执行结果：

<pre><code>name:tom has set age
name:tom age:10
name:tomcat has set age
name:tomcat age:5
</code></pre>

可以看出，此时两个线程是同步访问方法print的。

三、 多线程访问同一对象的多个方法

<pre><code>/**
* 多线程访问同一对象的多个方法
*
* @author xingguishuai
* @create 2017-02-28-11:18
**/
public class MutiMethodThread {

public synchronized void print1() throws InterruptedException {
System.out.println(Thread.currentThread().getName()+ " method is print1");
Thread.sleep(3000);
System.out.println("method print1 done");
}

public void print2(){
System.out.println(Thread.currentThread().getName() + " method is print2");
}

public static void main(String[] args){
final MutiMethodThread mutiMethodThread = new MutiMethodThread();

Thread thread1 = new Thread(new Runnable() {
public void run() {
try {
mutiMethodThread.print1();
} catch (InterruptedException e) {
e.printStackTrace();
}
}
},"thread1");

Thread thread2 = new Thread(new Runnable() {
public void run() {

mutiMethodThread.print2();

}
},"thread2");
thread1.start();
thread2.start();
}
}
</code></pre>

如上，线程thread1,thread2访问对象mutiMethodThread的print1()方法和print2()方法，其中print1方法被synchronized关键修饰，输出结果如下：

<pre><code>thread1 method is print1
thread2 method is print2
method print1 done
</code></pre>

可以看出print1，print2两个方法并未同步执行。因为print2未被synchronized关键字修饰，是一个异步方法。

如果想让print1，print2两个方法同步执行，可以为print2添加synchronized关键字。

<pre><code>public sychronized void print2(){
System.out.println(Thread.currentThread().getName() + " method is print2");
}
</code></pre>

再次执行，输出结果为：

<pre><code>thread1 method is print1
method print1 done
thread2 method is print2
</code></pre>

可以看出此时，print1,print2两个方法是按照同步方式执行的。<strong>这是因为sychronized关键字获取的是对象锁</strong>。thread1运行时获取到了mutiMethodThread对象的锁，当thread2再尝试获取对象锁时被阻塞，等到thread1释放锁后，thread2继续执行。
当print2不被synchronized修饰时，线程2不检测对象锁的存在。所以是异步执行的。
当synchronized修饰静态方法时，是类级别的锁。
四、锁重入

可重入锁，也叫做递归锁，指的是同一线程外层函数获得锁之后，内层递归函数仍然有获取该锁的代码，但不受影响。

五、被synchronized修饰的方法遇见异常时，会立刻释放锁。

六、synchronized的加锁对象
1. 要避免使用字符串常量作为锁，因为字符串常量是常量池里的东西，在任何地方用到同样的代码就会锁住
2. 当锁对象值改变时，由于变量的地址指向改变，所以锁会失效。