---
title: Future模式
date: 2017-04-11 15:39:13.0
updated: 2017-04-27 17:54:24.0
url: /archives/271
categories: 
tags: 设计模式 | future
---

<blockquote>
  Future模式，如字面意思，就是要在将来的某个时刻获取到结果，有点类似于ES6中的Promise。
</blockquote>

一个简单的栗子：

定义一个数据接口：

<pre><code>package com.fullstacker.study.designpattern.future;

public interface Data {

    String getRequest();

}

</code></pre>

真实的数据加载类：

<pre><code>package com.fullstacker.study.designpattern.future;

public class RealData implements Data{

    private String result ;

    public RealData (String queryStr){
        System.out.println("根据\"" + queryStr + "\"进行查询，这是一个很耗时的操作..");
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("耗时五秒,操作完毕，获取结果");
        result = "查询结果";
    }

    @Override
    public String getRequest() {
        return result;
    }

}
</code></pre>

FutureData用于程序中使用“加载数据”，实现Future效果：

<pre><code>package com.fullstacker.study.designpattern.future;


public class FutureData implements Data{

    private RealData realData ;

    private boolean isReady = false;

    public synchronized void setRealData(RealData realData) {
        //如果已经装载完毕了，就直接返回
        if(isReady){
            return;
        }
        //如果没装载，进行装载真实对象
        this.realData = realData;
        isReady = true;
        //进行通知
        notify();
    }

    @Override
    public synchronized String getRequest() {
        //如果没装载好 程序就一直处于阻塞状态
        while(!isReady){
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        //装载好直接获取数据即可
        return this.realData.getRequest();
    }


}

</code></pre>

查询FutureData

<pre><code>package com.fullstacker.study.designpattern.future;

public class FutureClient {

    public Data request(final String queryStr){
        //1 我想要一个代理对象（Data接口的实现类）先返回给发送请求的客户端，告诉他请求已经接收到，可以做其他的事情
        final FutureData futureData = new FutureData();
        //2 启动一个新的线程，去加载真实的数据，传递给这个代理对象
        new Thread(new Runnable() {
            @Override
            public void run() {
                //3 这个新的线程可以去慢慢的加载真实对象，然后传递给代理对象
                RealData realData = new RealData(queryStr);
                futureData.setRealData(realData);
            }
        }).start();

        return futureData;
    }

}

</code></pre>

使用演示：

<pre><code>package com.fullstacker.study.designpattern.future;

public class Main {

    public static void main(String[] args) throws InterruptedException {

        FutureClient fc = new FutureClient();
        Data data = fc.request("这是一个参数");
        System.out.println("请求发送成功!");
        System.out.println("做其他的事情...");
        String result = data.getRequest();  
        System.out.println(result);

    }
}

</code></pre>

运行main方法,打印结果

<pre><code>请求发送成功!
做其他的事情...
根据"这是一个参数"进行查询，这是一个很耗时的操作..
耗时五秒,操作完毕，获取结果
查询结果
</code></pre>

调用FutureClient的request()方法，返回一个futureData实例，但是该实例并未加载真实的数据realData，而是通过子线程异步对realData赋值。main方法中当执行String result = data.getRequest();  时由于还未得到真正的realData所以会一直等到数据真正加载完才能执行下面的打印。

jdk中有现成的Future模式接口FutureTask，使用示例如下：

<pre><code>import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.FutureTask;

public class UseFuture implements Callable&lt;String&gt;{
    private String para;

    public UseFuture(String para){
        this.para = para;
    }

    /**
     * 这里是真实的业务逻辑，其执行可能很慢
     */
    @Override
    public String call() throws Exception {
        //模拟执行耗时
        System.out.println("线程名："+ Thread.currentThread().getName());
        Thread.sleep(5000);
        String result = this.para + "处理完成";
        return result;
    }

    //主控制函数
    public static void main(String[] args) throws Exception {
        String queryStr = "query";
        //构造FutureTask，并且传入需要真正进行业务逻辑处理的类,该类一定是实现了Callable接口的类
        FutureTask&lt;String&gt; future = new FutureTask&lt;String&gt;(new UseFuture(queryStr));

        FutureTask&lt;String&gt; future2 = new FutureTask&lt;String&gt;(new UseFuture("task2222"));
        //创建一个固定线程的线程池且线程数为1,
        ExecutorService executor = Executors.newFixedThreadPool(2);
        //这里提交任务future,则开启线程执行RealData的call()方法执行
        //submit和execute的区别： 第一点是submit可以传入实现Callable接口的实例对象， 第二点是submit方法有返回值

        Future f1 = executor.submit(future);        //单独启动一个线程去执行的
        Future f2 = executor.submit(future2);
        System.out.println("请求完毕");

        try {
            //这里可以做额外的数据操作，也就是主程序执行其他业务逻辑
            System.out.println("处理实际的业务逻辑...");
            Thread.sleep(1000);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //调用获取数据方法,如果call()方法没有执行完成,则依然会进行等待
        System.out.println("数据：" + future.get());
        System.out.println("数据：" + future2.get());

        executor.shutdown();
    }

}

</code></pre>