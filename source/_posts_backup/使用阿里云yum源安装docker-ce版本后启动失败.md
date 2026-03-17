---
title: 使用阿里云yum源安装docker-ce版本后启动失败
date: 2020-01-01 12:10:30.0
updated: 2020-01-01 12:10:30.0
url: /archives/590
categories: 
tags: docker | 阿里云 | daemo.json | servcie docker start
---

利用阿里云yum的docker仓库安装docker-ce版本后启东docker失败：
报错内容：

<pre><code class="line-numbers">Redirecting to /bin/systemctl start docker.service
Job for docker.service failed because the control process exited with error code. See "systemctl status docker.service" and "journalctl -xe" for details.
</code></pre>

利用journalctl -xe查看报错日志详情：

<pre><code class="line-numbers">1月 01 11:29:37 localhost.localdomain dockerd[9131]: unable to configure the Docker daemon with file /etc/docker/daemon.json: inva
1月 01 11:29:37 localhost.localdomain systemd[1]: docker.service: main process exited, code=exited, status=1/FAILURE
1月 01 11:29:37 localhost.localdomain systemd[1]: Failed to start Docker Application Container Engine.
</code></pre>

可见是读取daemo配置文件时出错了，查看daemo.json文件

<pre><code class="language-json line-numbers">{
registry-mirrors": [
"https://kfwkfulq.mirror.aliyuncs.com",
"https://2lqq34jg.mirror.aliyuncs.com",
"https://pee6w651.mirror.aliyuncs.com",
"https://registry.docker-cn.com",
"http://hub-mirror.c.163.com"
],
"dns": ["8.8.8.8","8.8.4.4"]
}
</code></pre>

发现json格式不正确，<strong>在registry-mirrors前缺少双引号</strong>，修改后

<pre><code class="line-numbers">{
"registry-mirrors": [
"https://kfwkfulq.mirror.aliyuncs.com",
"https://2lqq34jg.mirror.aliyuncs.com",
"https://pee6w651.mirror.aliyuncs.com",
"https://registry.docker-cn.com",
"http://hub-mirror.c.163.com"
],
"dns": ["8.8.8.8","8.8.4.4"]
}
</code></pre>

利用service docker start 启动成功。

ps：阿里云在给我们带来方便的同时也引入了一些不必要的问题，大家在使用的时候还需要多加注意拍坑啊。阿里云，你也长点心吧

附录：利用阿里云安装docker步骤

<pre><code class="line-numbers">a. 安装yum-utils 及docker数据持久化工具 device-mapper-persistent-data lvm2
yum install -y yum-utils device-mapper-persistent-data lvm2
b. 安装阿里云docker镜像库
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
c. yum makcecache fast   //让yum使用最快的源
d. sudo yum -y install docker-ce
e.  开启Docker服务
sudo service docker start


</code></pre>

参考：https://yq.aliyun.com/articles/110806?spm=5176.8351553.0.0.2f491991Ubl6Be