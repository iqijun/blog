---
title: docker手册
date: 2016-10-02 17:30:35.0
updated: 2016-10-02 19:01:23.0
url: /archives/67
categories: 
tags: docker安装 | docker卸载 | docker | 常用命令
---

docker安装：

<ol>
    <li>ubuntu中自带docker源，可以使用apt-get update apt-get instll docker.io/apt-get install lxc-docker直接安装</li>
    <li>如果要安装最新版的docker，可以将docker源安装到apt-get源中再执行安装</li>
    <li>docker起停命令： service docker start/stop/restart 其中docker1.9.1默认以守护进程方式启动</li>
    <li>docker run
a. docker run -i -t sshmysql /bin/bash
b.</li>
    <li>docker卸载
apt-get purge docker
<pre><code>     apt-get autoremover
</code></pre>
</li>
    <li>docker 安装的先决条件
<pre><code> apt-get install linux-image-extra-$(uname -r) linux-image-extra-virtual
</code></pre>
</li>
    <li>docker ps查看运行的docker 进程
<pre><code>  docker ps -a 查看所有docker进程,包括停止的
</code></pre>
</li>
    <li>docker import 导入镜像
a. 将已经下载的镜像导入到本地镜像库
<pre><code>     docker import - myimages
</code></pre>
</li>
    <li>docker -d -p 3332:22 镜像id</li>
    <li>Dockerfile
a. FROM 基于什么镜像
b. RUN 在创建镜像时执行的命令
c. EXPOSE port 暴露哪个端口
d. CMD 镜像创建完毕执行的命令</li>
    <li>docker build -t 新镜像名称 Dockerfile所在的目录</li>
    <li>删除镜像和容器
a. docker rmi 镜像id 删除镜像
b. docker rm 容器id 删除容器</li>
    <li>ssh链接
a. docker run -d -p 500001:22 sshmysql /usr/sbin/sshd -D</li>
    <li>docker存储位置
a. 使用rsync 命令同步已下载的镜像到新的目录
b. 类似于硬盘挂载 略</li>
    <li>docker 配置文件
a. centos 中配置文件在 /etc/sysconfig/docker
<pre><code>i.  OTHER_OPT="XXXXX"
</code></pre>
b. 非centos在/etc/default/dcoker
<pre><code>i.  DOCKER_OPT="xxxx."
</code></pre>
c. 一些配置：
<pre><code>i. -H 0.0.0.0：5555 任何网段的主机都可以连接至5555端口进行docker管理
</code></pre>
</li>
    <li>docker网络
a. docker间默认是可以相互访问的
<pre><code>i. 由于docker重启会导致ip地址的改变，所以docker提供别名式的连接方式，使用--link选项启动docker即可，如：docker  run -it  --name cct1 --link=要链接的容器名:链接名  image 
</code></pre>
b. 将docker守护进程的启动选项（见15条）修改为 icc=false 拒绝docker间互相访问
c. 允许特定的容器进行访问
<pre><code>i. 设置docker守护进程配置文件 icc=false iptables=true  启动容器时使用--link参数指定要连接的容器
</code></pre>
</li>
    <li>docker容器与外部网络连接
a. 使用iptables 设置</li>
</ol>