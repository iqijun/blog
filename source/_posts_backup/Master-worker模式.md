---
title: Master-worker模式
date: 2017-04-19 22:41:57.0
updated: 2017-06-03 23:51:08.0
url: /archives/274
categories: 
tags: 设计模式 | master-worker模式 | master，worker
---

master-worker模式是常用的并行模式。就像软件公司的工作模式一样，客户将需求提给项目经理，项目经理将需求分解，然后分配给各个开发人员，开发人员开发完成后将结果反馈给项目经理，由项目经理向客户交付。在这种工作模式之中，项目经理扮演的角色就是Master，开发人员的角色就是worker。master-worker模式的核心思想是，系统有两个进程协作工作：Master进程，负责接收和分配任务；Worker进程，负责处理子任务。当Worker进程将子任务处理完成后，结果返回给Master进程，由Master进程做归纳汇总，最后得到最终的结果。

下面给出该模式的一个简单实现,可以到我的github中<a href="https://github.com/iqijun/javastudy/tree/22cde8eb57a9de632b27006419b9f38adc085db9/src/main/java/com/fullstacker/study/designpattern/MasterWorkers">下载源码</a>

master类代码：此处master类实现了三个方法，分别用来提交任务（submitTask）,执行任务（execute），判断任务是否完成（isComplate），以及返回结果（getResult）；

<pre><code>package com.fullstacker.study.designpattern.MasterWorkers;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * master类
 *
 * @author xingguishuai
 * @create 2017-04-13-17:21
 **/
public class Master {
    /**
     *用来保存任务,由于会涉及多线程共同处理任务所以使用concurrent包
     */
    private ConcurrentLinkedQueue&lt;Task&gt; tasks = new ConcurrentLinkedQueue&lt;Task&gt;();
    /**
     * 保存结果 由于会涉及多线程共同处理任务所以使用concurrent包
     */
    private Map&lt;String,Object&gt; resultMap = new ConcurrentHashMap&lt;String, Object&gt;();
    /**
     * 用来保存workers
     */
    private HashMap&lt;String,Thread&gt; workers = new HashMap&lt;String, Thread&gt;();
    /**
    * 

功能描述：构造函数，指定work和work数量


    * @return
    * @param
    * @author xingguishuai
    * @Date 2017-04-13 17:50
    * @since 1.0
    */
    public Master(Worker worker,int workerCount){
        worker.setResultMap(resultMap);
        worker.setTasks(tasks);
        for (int i = 0;i &lt; workerCount;i++){
            String workName = "workerName-" + i;
            workers.put(workName,new Thread(worker,workName));
        }
    }
    /**
    * &lt;p&gt;功能描述：提交任务&lt;/p&gt;
    * @return
    * @param
    * @author xingguishuai
    * @Date 2017-04-13 18:02
    * @since 1.0
    */
    public void submitTask(Task task){
        tasks.add(task);
    }
    /**
    * &lt;p&gt;功能描述：master调用work执行任务&lt;/p&gt;
    * @return
    * @param
    * @author xingguishuai
    * @Date 2017-04-13 18:01
    * @since 1.0
    */
    public void execute(){
        for (Map.Entry&lt;String, Thread&gt; entry : workers.entrySet()) {
            entry.getValue().start();
        }
    }
    /**
    * &lt;p&gt;功能描述：判断任务是否执行完&lt;/p&gt;
    * @return
    * @param
    * @author xingguishuai
    * @Date 2017-04-13 18:06
    * @since 1.0
    */
    public boolean isComplate(){
        for (Map.Entry&lt;String, Thread&gt; entry : workers.entrySet()) {
            //如果有一个线程的状态不为TERMINATED，即可标志任务未完成
            if(!entry.getValue().getState().equals(Thread.State.TERMINATED)){
                return  false;
            }
        }
        return  true;
    }
    /**
    * &lt;p&gt;功能描述：返回结果集&lt;/p&gt;
    * @return
    * @param
    * @author xingguishuai
    * @Date 2017-04-13 18:26
    * @since 1.0
    */
    public Map&lt;String, Object&gt; getResult(){
        return  resultMap;
    }
}

</code></pre>

worker类，Woker类为一个实现了Runnable接口的抽象类，task属性用来记录Master中的任务，resultMap属性用来保存处理结果。抽象方法handle()用来实际处理任务，在各子类中实现该方法，方便扩展。

<pre><code>package com.fullstacker.study.designpattern.MasterWorkers;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * worker类
 *
 * @author xingguishuai
 * @create 2017-04-13-17:21
 **/
public abstract class Worker implements  Runnable{
    /**
     *用来获取master中的任务
     */
    private ConcurrentLinkedQueue&lt;Task&gt; tasks ;
    /**
     * 保存结果
     */
    private Map&lt;String,Object&gt; resultMap ;
    @Override
    public void run() {
        //只要存在任务就一直循环取出任务并执行
        while (true){
            //取出一个任务
            Task task = tasks.poll();
            //任务执行完毕
            if(null == task){
                break;
            }
            Object result = handle(task);
            //保存结果
            resultMap.put(Thread.currentThread().getName()+":"+task.hashCode(),result);
        }
    }

    public abstract Object handle(Task task);

    public ConcurrentLinkedQueue&lt;Task&gt; getTasks() {
        return tasks;
    }

    public void setTasks(ConcurrentLinkedQueue&lt;Task&gt; tasks) {
        this.tasks = tasks;
    }

    public Map&lt;String, Object&gt; getResultMap() {
        return resultMap;
    }

    public void setResultMap(Map&lt;String, Object&gt; resultMap) {
        this.resultMap = resultMap;
    }
}

</code></pre>

task类

<pre><code>package com.fullstacker.study.designpattern.MasterWorkers;

/**
 * task类
 *
 * @author xingguishuai
 * @create 2017-04-13-17:27
 **/
public interface Task {

    public abstract Object doTask();

}
</code></pre>

下面是一个Master-worker模式的使用示例：
利用该模式计算学生的总成绩.

GradeTask

<pre><code>package com.fullstacker.study.designpattern.MasterWorkers.example;

import com.fullstacker.study.designpattern.MasterWorkers.Task;

/**
 * 计算学生成绩任务
 *
 * @author xingguishuai
 * @create 2017-04-13-18:30
 **/
public class GradeTask implements Task {
    /**
     * 学生ID
     */
    private Long sutudentId;
    /**
     * 数学成绩
     */
    private float mathGrade;
    /**
     * 语文成绩
     */
    private float chineseGrade;

    public Long getSutudentId() {
        return sutudentId;
    }

    public void setSutudentId(Long sutudentId) {
        this.sutudentId = sutudentId;
    }

    public float getMathGrade() {
        return mathGrade;
    }

    public void setMathGrade(float mathGrade) {
        this.mathGrade = mathGrade;
    }

    public float getChineseGrade() {
        return chineseGrade;
    }

    public void setChineseGrade(float chineseGrade) {
        this.chineseGrade = chineseGrade;
    }

    @Override
    public Object doTask() {
        return chineseGrade + mathGrade;
    }
}

</code></pre>

GradeWorker

<pre><code>package com.fullstacker.study.designpattern.MasterWorkers.example;

import com.fullstacker.study.designpattern.MasterWorkers.Task;
import com.fullstacker.study.designpattern.MasterWorkers.Worker;

/**
 * 计算成绩的worker
 *
 * @author xingguishuai
 * @create 2017-04-13-18:34
 **/
public class GradeWorker extends Worker {
    @Override
    public Object handle(Task task) {
        return task.doTask();
    }
}

</code></pre>

在main方法中调用

<pre><code>package com.fullstacker.study.designpattern.MasterWorkers.example;

import com.fullstacker.study.designpattern.MasterWorkers.Master;
import com.fullstacker.study.designpattern.MasterWorkers.Worker;

import java.util.Map;
import java.util.Random;

import static javafx.scene.input.KeyCode.R;

/**
 * 测试master worker模式
 *
 * @author xingguishuai
 * @create 2017-04-13-18:39
 **/
public class Test {
    public static void main(String[] args){
        Worker worker = new GradeWorker();

        Master master = new Master(worker,Runtime.getRuntime().availableProcessors());
        Random rundom = new Random();
        for (int i = 0; i &lt; 4; i++) {
            GradeTask gradeTask = new GradeTask();
            gradeTask.setChineseGrade(rundom.nextFloat()*100);
            gradeTask.setMathGrade(rundom.nextFloat()*100);
            master.submitTask(gradeTask);
        }
        master.execute();
        while (true){
            if(master.isComplate()){
                Map&lt;String, Object&gt; result = master.getResult();
                for (Map.Entry&lt;String, Object&gt; me : result.entrySet()) {
                    System.out.println(me.getKey()+":::"+me.getValue());
                }
                break;
            }
        }
    }
}

</code></pre>