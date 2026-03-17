---
title: docker安装zookeeper集群
date: 2017-09-20 14:17:19.0
updated: 2021-09-04 10:56:42.0
url: /archives/371
categories: 
tags: docker | 常用命令 | zookeeper | 集群
---

<ol>
<li>更改docker镜像源
vi /etc/default/docker 
<pre><code>DOCKER_OPTS="--registry-mirror=http://aad0405c.m.daocloud.io"</code></pre></li>
<li>拉去zookeeper镜像
<pre><code>docker pull  garland/zookeeper //不要使用官方的zookeeper；garland/zookeeper镜像有些额外配置，对新手来说非常友好</code></pre></li>
<li>启动集群
<pre><code>docker run -d \
--name=zk1 \
--net=host \
-e SERVER_ID=1 \
-e ADDITIONAL_ZOOKEEPER_1=server.1=localhost:2888:3888 \
-e ADDITIONAL_ZOOKEEPER_2=server.2=localhost:2889:3889 \
-e ADDITIONAL_ZOOKEEPER_3=server.3=localhost:2890:3890 \
-e ADDITIONAL_ZOOKEEPER_4=clientPort=2181 \
garland/zookeeper
docker run -d \
--name=zk2 \
--net=host \
-e SERVER_ID=2 \
-e ADDITIONAL_ZOOKEEPER_1=server.1=localhost:2888:3888 \
-e ADDITIONAL_ZOOKEEPER_2=server.2=localhost:2889:3889 \
-e ADDITIONAL_ZOOKEEPER_3=server.3=localhost:2890:3890 \
-e ADDITIONAL_ZOOKEEPER_4=clientPort=2182 \
garland/zookeeper
docker run -d \
--name=zk3 \
--net=host \
-e SERVER_ID=3 \
-e ADDITIONAL_ZOOKEEPER_1=server.1=localhost:2888:3888 \
-e ADDITIONAL_ZOOKEEPER_2=server.2=localhost:2889:3889 \
-e ADDITIONAL_ZOOKEEPER_3=server.3=localhost:2890:3890 \
-e ADDITIONAL_ZOOKEEPER_4=clientPort=2183 \
garland/zookeeper</code></pre>
<p>--net=host指令指定改容器使用host网络模式，那么这个容器将不会获得一个独立的Network Namespace，而是和宿主机共用一个Network Namespace。容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用使用宿主机的IP和端口，不用任何NAT转换，就如直接跑在宿主机中的进程一样。但是，容器的其他方面，如文件系统、进程列表等还是和宿主机隔离的。</p></li>
</ol>
<p>-e 指定镜像创建完毕执行的命令的参数， garland/zookeeper镜像创建完容器会执行/opt/run.sh，-e指定的参数就是run.sh运行时的参数，run.sh内容如下：</p>
<pre><code>#!/bin/sh
ZOO_CFG=&quot;/opt/zookeeper/conf/zoo.cfg&quot;
# Output server ID
echo &quot;server id (myid): ${SERVER_ID}&quot;
echo &quot;${SERVER_ID}&quot; &gt; /tmp/zookeeper/myid
# Add additional ZooKeeper servers into the zoo.cfg file
echo &quot;${ADDITIONAL_ZOOKEEPER_1}&quot; &gt;&gt; ${ZOO_CFG}
echo &quot;${ADDITIONAL_ZOOKEEPER_2}&quot; &gt;&gt; ${ZOO_CFG}
echo &quot;${ADDITIONAL_ZOOKEEPER_3}&quot; &gt;&gt; ${ZOO_CFG}
echo &quot;${ADDITIONAL_ZOOKEEPER_4}&quot; &gt;&gt; ${ZOO_CFG}
echo &quot;${ADDITIONAL_ZOOKEEPER_5}&quot; &gt;&gt; ${ZOO_CFG}
echo &quot;${ADDITIONAL_ZOOKEEPER_6}&quot; &gt;&gt; ${ZOO_CFG}
echo &quot;${ADDITIONAL_ZOOKEEPER_7}&quot; &gt;&gt; ${ZOO_CFG}
echo &quot;${ADDITIONAL_ZOOKEEPER_8}&quot; &gt;&gt; ${ZOO_CFG}
echo &quot;${ADDITIONAL_ZOOKEEPER_9}&quot; &gt;&gt; ${ZOO_CFG}
echo &quot;${ADDITIONAL_ZOOKEEPER_10}&quot; &gt;&gt; ${ZOO_CFG}
# Start Zookeeper
/opt/zookeeper/bin/zkServer.sh start-foreground</code></pre>
<ol start="4">
<li>
<p>由于是使用host网络模式，所以在连接zookeeper时可以直接使用宿主机的IP，如</p>
<pre><code>zkCli.cmd -server 192.168.74.131:2181
   zkCli.cmd -server 192.168.74.131:2182
   zkCli.cmd -server 192.168.74.131:2183</code></pre>
</li>
<li>
<p>附上garland/zookeeper Darkfile文件</p>
<pre><code># DOCKER-VERSION 1.0.1
# VERSION        0.5
# SOURCE         https://github.com/jplock/docker-zookeeper 
FROM debian:jessie
MAINTAINER Justin Plock &lt;justin@plock.net&gt;
RUN apt-get update &amp;&amp; apt-get install -y openjdk-7-jre-headless wget
RUN wget -q -O - http://apache.mirrors.pair.com/zookeeper/zookeeper-3.4.6/zookeeper-3.4.6.tar.gz | tar -xzf - -C /opt \
&amp;&amp; mv /opt/zookeeper-3.4.6 /opt/zookeeper \
&amp;&amp; cp /opt/zookeeper/conf/zoo_sample.cfg /opt/zookeeper/conf/zoo.cfg \
&amp;&amp; mkdir -p /tmp/zookeeper
ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64
ADD ./run.sh /opt/run.sh
RUN chmod 777 /opt/run.sh
EXPOSE 2181 2888 3888
WORKDIR /opt/zookeeper
VOLUME [&quot;/opt/zookeeper/conf&quot;, &quot;/tmp/zookeeper&quot;]
CMD [&quot;/opt/run.sh&quot;]</code></pre>
</li>
<li>
<p>附上一些常用命令</p>
<ol>
<li>停用全部运行中的容器:
docker stop $(docker ps -q)</li>
<li>删除全部容器：
docker rm $(docker ps -aq)</li>
<li>一条命令实现停用并删除容器：
docker stop $(docker ps -q) &amp; docker rm $(docker ps -aq)</li>
<li>将宿主机2181端口和容器docker端口对应，并将容器命名为zk1
docker run -d -p 2181:2181  --name zk1 zookeeper</li>
<li>使用zkCli.cmd连接该zookeeper验证是否部署成功
zkCli.cmd -server 宿主机IP:2181
docker run -it -link=zk1:zkCli zookeeper  zkCli.sh -server 192.168.74.131</li>
<li>docker logs -t --tail=20 容器ID  查看容器日志</li>
</ol>
</li>
</ol>
<p>参考文件： <a href="https://github.com/denverdino/aliyungo/wiki/Zookeeper-cluster-with-Docker">https://github.com/denverdino/aliyungo/wiki/Zookeeper-cluster-with-Docker</a></p>