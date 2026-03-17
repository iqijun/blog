---
title: 利用Dockerfile修改容器中的apt-get源
date: 2017-12-24 20:15:30.0
updated: 2017-12-24 20:15:30.0
url: /archives/421
categories: 
tags: 
---

<blockquote>
  在Ubuntu中利用apt-get安装软件时，由于网络问题，我们经常将apt-get源改为国内的源镜像，在构建docker容器时，安装软件怎么改变将apt-get源改为国内镜像呢？
</blockquote>

只需要在执行安装命令前修改源即可

<pre><code>#apt-get源 使用163的源
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak &amp;&amp; \
    echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" &gt;/etc/apt/sources.list &amp;&amp; \
    echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" &gt;&gt;/etc/apt/sources.list &amp;&amp; \
    echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" &gt;&gt;/etc/apt/sources.list &amp;&amp; \
    echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" &gt;&gt;/etc/apt/sources.list
</code></pre>

然后再执行安装命令即可，如：

<pre><code># -qq 忽略日志 只在发生错误时打印
RUN apt-get -qq update &amp;&amp; apt-get install -qq sudo

</code></pre>