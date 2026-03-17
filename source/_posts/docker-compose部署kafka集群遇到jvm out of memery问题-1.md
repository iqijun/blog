---
title: docker-compose部署kafka集群遇到jvm out of memery问题
date: 2018-11-07 10:16:41.0
updated: 2018-11-07 10:57:34.0
url: /archives/497
categories: 
tags: docker | kafka | 内存溢出 | jvm
---

利用docker-compose部署kafka集群遇到内存不足问题，报错信息中有如下信息：

<pre>kafka_1_a6f53db08f56 | # Native memory allocation (mmap) failed to map 1073741824 bytes for committing reserved memory.
kafka_1_a6f53db08f56 | # Can not save log file, dump to screen..
kafka_1_a6f53db08f56 | #
kafka_1_a6f53db08f56 | # There is insufficient memory for the Java Runtime Environment to continue.
kafka_1_a6f53db08f56 | # Native memory allocation (mmap) failed to map 1073741824 bytes for committing reserved memory.
kafka_1_a6f53db08f56 | # Possible reasons:
kafka_1_a6f53db08f56 | # The system is out of physical RAM or swap space
kafka_1_a6f53db08f56 | # In 32 bit mode, the process size limit was hit
kafka_1_a6f53db08f56 | # Possible solutions:
kafka_1_a6f53db08f56 | # Reduce memory load on the system
kafka_1_a6f53db08f56 | # Increase physical memory or swap space
kafka_1_a6f53db08f56 | # Check if swap backing store is full
kafka_1_a6f53db08f56 | # Use 64 bit Java on a 64 bit OS
kafka_1_a6f53db08f56 | # Decrease Java heap size (-Xmx/-Xms)
kafka_1_a6f53db08f56 | # Decrease number of Java threads
kafka_1_a6f53db08f56 | # Decrease Java thread stack sizes (-Xss)
kafka_1_a6f53db08f56 | # Set larger code cache with -XX:ReservedCodeCacheSize=
kafka_1_a6f53db08f56 | # This output file may be truncated or incomplete.

VM Arguments:
kafka_1_a6f53db08f56 |<strong> jvm_args: -Xmx1G -Xms1G -XX:+UseG1GC -XX:MaxGCPauseMillis=20</strong> -XX:InitiatingHeapOccupancyPercent=35 -XX:+ExplicitGCInvokesConcurrent -Djava.awt.headless=true -Xloggc:/opt/kafka/bin/../logs/kafkaServer-gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Dkafka.logs.dir=/opt/kafka/bin/../logs -Dlog4j.configuration=file:/opt/kafka/bin/../config/log4j.properties
````</pre>

可以看出默认的堆大小为1G，所以在机器配置较低时内存会不足。

在docker-compose.yml  wurstmeister/kafka默认没有配置jvm参数 可以使用<span style="background-color: #ff0000;"> KAFKA_JVM_PERFORMANCE_OPTS<span style="background-color: #ffffff;"> 指定jvm参数调整堆栈大小</span></span>

<pre>version: '2'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
  kafka:
    image: wurstmeister/kafka
    ports:
      - "9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: 123.206.77.193
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    <span style="background-color: #ff0000;">  KAFKA_JVM_PERFORMANCE_OPTS: " -Xmx256m -Xms256m"</span>
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
  kafka-manager:
    image: sheepkiller/kafka-manager    # 如果要安装web管理工具可以同时安装这个，最后通过苏主机IP的9000端口进行访问，例如172.31.148.174:9000
    links:
      - kafka
      - zookeeper
    environment:
      ZK_HOSTS: zookeeper:2181
      APPLICATION_SECRET: "letmein"
    ports:
      - "9000:9000"
    expose:
      - "9000"</pre>

&nbsp;

<!--more-->