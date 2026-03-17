---
title: docker-compose安装elaticsearch和kibana堆栈溢出
date: 2019-01-05 17:50:17.0
updated: 2019-01-29 18:02:40.0
url: /archives/516
categories: 
tags: docker | compose | elastice
---

由于elasticsearch默认的jvm参数默认为2G，在虚拟机内存为1G所以启动时直接报内存不足错误

<hr />

JVM arguments [-Xms2g, -Xmx2g, -XX:+UseConcMarkSweepGC, -XX:CMSInitiatingOccupancyFraction=75, -XX:+UseCMSInitiatingOccupancyOnly, -XX:+AlwaysPreTouch, -Xss1m, -Djava.awt.headless=true, -Dfile.encoding=UTF-8, -Djna.nosys=true, -Djdk.io.permissionsUseCanonicalPath=true, -Dio.netty.noUnsafe=true, -Dio.netty.noKeySetOptimization=true, -Dio.netty.recycler.maxCapacityPerThread=0, -Dlog4j.shutdownHookEnabled=false, -Dlog4j2.disable.jmx=true, -Dlog4j.skipJansi=true, -XX:+HeapDumpOnOutOfMemoryError,  -Des.path.home=/usr/share/elasticsearch]

<hr />

在编写compose文件时指定Xmms大小解决这个问题

&nbsp;

<p style="padding-left: 30px;">version: '2'
services:
elasticsearch:
image: elasticsearch:5.6.11
environment:
- cluster.name=elasticsearch
<span style="background-color: #ff0000;">- ES_JAVA_OPTS=-Xms512m -Xmx512m</span>
ports:
- "9200:9200"
kibana:
image: kibana:5.6.11
environment:
SERVER_NAME: kibana
ELASTICSEARCH_URL: http://localhost:9200
ports:
- "5601:5601"</p>

&nbsp;

docker run命令指定jvm参数 docker run --name esl2 -e ES_JAVA_OPTS="-Xms512m -Xmx512m" -p 9200:9200 -p 9300:9300 docker.io/elasticsearch:5.6.11

&nbsp;

&nbsp;

&nbsp;