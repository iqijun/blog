---
title: JVM面试题
date: 2022-01-28 16:09:40.013
updated: 2022-02-08 16:12:40.553
url: /archives/3
categories: 编程
tags: 
---

1. 类加载机制
    1. 双亲委派机制
    2. 
2. 类加载的过程
2. 常见的垃圾回收算法及各自的问题
3. 常见的垃圾回收器及常见的组合
4. 讲一下JVM堆内存管理
	栈上分配->TLAB->新声代、老年代->可达性分析->GC算法->所有垃圾回收器及其优缺点和特点
5. 那到底多大的对象会被直接扔到老年代
6. G1两个region不是连续的，而且之间还有可达的引用，我现在要回收其中一个，另一个会被怎么处理
7. 听说过CMS的并发预处理和并发可中断预处理吗
8. 引起GC的常见场景
    1. 扩容缩容会触发 CMS GC 之外，还有 Old 区达到回收阈值、MetaSpace 空间不足、Young 区晋升失败、大对象担保失败等几种触发条件
    2. 动态扩容造成的GC
        1. 服务刚启动时，最大空间剩余很多但依然频繁GC
        2. 原因：
            1. -Xms与-Xmx 设置不一致造成，在初始化时只会初始 -Xms 大小的空间存储信息，每当空间不够用时再向操作系统申请，这样的话必然要进行一次 GC，另外，如果空间剩余很多时也会进行缩容操作
        3. 解决：
            1. 尽量将成对出现的空间大小配置参数设置成固定的，如 -Xms 和 -Xmx，-XX:MaxNewSize 和 -XX:NewSize，-XX:MetaSpaceSize 和 -XX:MaxMetaSpaceSize 等
    3. System.gc() 会引发一次 STW 的 Full GC，对整个堆做收集
    4. MetaSpace 区 OOM
    5. 
    6. 
    7. 
9. MetaSpace 主要由 Klass Metaspace 和 NoKlass Metaspace 两大部分组成。
    1. Klass MetaSpace： 就是用来存 Klass 的，就是 Class 文件在 JVM 里的运行时数据结构，这部分默认放在 Compressed Class Pointer Space 中，是一块连续的内存区域，紧接着 Heap。Compressed Class Pointer Space 不是必须有的，如果设置了 -XX:-UseCompressedClassPointers，或者 -Xmx 设置大于 32 G，就不会有这块内存，这种情况下 Klass 都会存在 NoKlass Metaspace 里。
    2. NoKlass MetaSpace： 专门来存 Klass 相关的其他的内容，比如 Method，ConstantPool 等，可以由多块不连续的内存组成。虽然叫做 NoKlass Metaspace，但是也其实可以存 Klass 的内容，上面已经提到了对应场景
10. 什么时候需要自定义类加载器
    1. 要做资源隔离： 在某些框架内进行中间件与应用模块的隔离，如tomcat的类加载
    2. 要修改类加载方式：双亲委派模型并非强制，除Bootstrap外，其他的加载并非一定要引入
    3. 要扩展类的加载源：例如从数据库，网络中加载类
    4. 防止源码泄漏： 对编译进行加密后，自定义类加载器还原字节码
11. 如何自定义类加载器
    1. 继承ClassLoader类
    2. 重写findClass()方法
12. 
