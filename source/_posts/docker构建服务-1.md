---
title: docker构建服务
date: 2017-12-24 20:17:02.0
updated: 2017-12-24 20:17:02.0
url: /archives/423
categories: 
tags: docker，服务
description: "Docker构建服务主要利用卷实现多容器文件系统共享，可通过镜像或运行命令指定卷，卷数据不随容器停止消失，并可用卷共享参数把指定容器的所有卷加入新容器，实现数据复用。"
---

<ol>
<li>利用docker构建服务主要利用“卷”实现多容器文件系统的共享</li>
<li>在Dockerfile中使用VOLUM或者docker run命令的-v参数指定卷</li>
<li>卷中的数据不会随着容器的停止而消失，</li>
<li>docker run命令利用--volumes-from参数把指定容器里的所有卷都加入到新的容器中，例如：</li>
</ol>

<pre><code>#这条命令将名为james_blog容器的卷加入到apache容器中
docker run -d -P --volumes-from james_blog jamtur01/apache 
</code></pre>