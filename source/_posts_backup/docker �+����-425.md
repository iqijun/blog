---
title: docker 编配
date: 2017-12-24 20:18:42.0
updated: 2017-12-24 20:18:42.0
url: /archives/425
categories: 
tags: docker | 编配，docker-compose
---

<ol>
<li>编配：描述了自动配置，协作，和管理的过程</li>
<li>docker自己的集群和调度工具 swarm，比较出名的docker集群管理工具还有kubernetes（google开源）和Apache Mesos</li>
<li>docker compose 使容器在启动时与其他容器产生交互，是一个简单的编配工具。

<ol>
<li>可以使用python的pip工具安装compose
<code>python pip install compose</code></li>
<li>编写docker-compose.yml</li>
</ol></li>
</ol>

<pre><code>web:
  image: jamtur01/composeapp
  command: python app.py
  ports:
    - "5000:5000"
  volumes:
    - .:/composeapp
  links:
   - redis
redis:
  image: redis
</code></pre>

每个要启动的服务都要是用一个YAML的散列键来定义：web和redis
对于web服务指定了一些启动是的参数：image指定了要使用的镜像；使用command指定容器启动时要执行的命令；ports指定了要映射的端口，volumes指定了要映射的卷。让服务里的5000端口映射到了宿主机的5000端口并创建了composeapp卷。使用link指令指定了要连接到的其他服务。
指定了一个redis服务，这个服务没有指定任何参数一切使用默认配置。

<pre><code>3. docker-compse运行 
```
docker-compse up
```
后台运行
```
docker-compose up -d
```
</code></pre>