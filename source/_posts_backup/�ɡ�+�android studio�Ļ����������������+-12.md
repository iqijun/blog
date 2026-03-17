---
title: 搭建android studio环境遇到的坑儿
date: 2016-02-06 00:29:39.0
updated: 2016-02-13 15:29:01.0
url: /archives/12
categories: 
tags: android studio | android
---

AS简介
经过2年时间的研发，Google终于正式发布了面向Android开发者的集成开发环境Android Studio 1.2（稳定版）。Android Studio是Google开发的一款面向Android开发者的IDE，支持Windows、Mac、Linux等操作系统，基于流行的Java语言集成开发环境IntelliJ搭建而成。该IDE在2013年5月的Google I/O开发者大会上首次露面，当时的测试版各种莫名其妙的Bug，但是14年12月8日发布的版本是稳定版。Android Studio 1.0推出后，Google官方将逐步放弃对原来主要的Eclipse ADT的支持，并为Eclipse用户提供了工程迁移的解决办法。不过相信作为Developer的你上手AS 1.0以后你再也不愿意使用原来苦逼的Eclipse+ADT了，你会被AS的各种强大所吸引。

---------------------我是分割线，第一段是抄来的------------------------

如上段所说，坊间传言AS很牛，学android 我就从搭建android studio环境开始的。具体搭建过程不在详细记述，单表一下遇到的几个问题。

坑1.SDK Manager无法连接到google.com
不多说，一直没明白天朝的墙为啥会把一些技术的东西都给墙掉。
解决方法1.购买vpn
解决方法2.百度出来的方法，更改host文件，理论上行的通，但是总有些IP是不通的。。。。。看运气咯

解决方法3.http://androiddevtools.cn/
解决方法4.找有sdk的人拷贝一下
坑2.HAXM 安装
由于坑1的存在，我直接搜索的HAXM下载的
安装过程中报 Intel Excute disabled Bit(xd) is not turn on错误
<img class="alignnone" title="Intel Excute disabled Bit(xd) is not turn on错误" src="http://images.cnitblog.com/blog/128883/201502/281320524081895.jpg" alt="Intel Excute disabled Bit(xd) is not turn on错误" width="500" height="383" />
此时，需要修改电脑的bios设置，进入bios,configuration--&gt;intel virtual technology 选为enabled，此处不同型号的电脑可能有不同，要找到自己电脑上intel virtual technology 置为enabled即可
坑3.无法连接到ADB
由于端口5037端口被占用，由于偶尔无法停掉一些助手类的软件，你懂的， 所以直接卸载掉吧。。。将电脑中手机助手类的软件卸载掉

本着能多学点是就多学点的态度，我使用git进行版本控制，于是遇到了坑4。
坑4.
<a href="http://qijunblog-wordpress.stor.sinaapp.com/uploads/2016/02/androidstudio_gitProblem.png"><img class="alignnone size-medium wp-image-13" title="androidstudio_gitProblem" src="http://qijunblog-wordpress.stor.sinaapp.com/uploads/2016/02/androidstudio_gitProblem-300x86.png" alt="unable to access https://github.com/iqijun/xxx.git" width="300" height="86" /></a>
而且在git bash中执行push命令是报
fatal: unable to access 'https://github.com/iqijun/androidStudy.git/': error setting certificate verify locations:
CAfile: D:/code/Git/mingw64/libexec/ssl/certs/ca-bundle.crt
CApath: none
so，屏蔽掉了SSL证书验证。
在git 中执行git config --global http.sslVerify false

之前学习git的时候并未遇到这个问题，搞不清我在什么地方设置错了，鉴于我只是自己练习，就把证书校验屏蔽掉吧。。。