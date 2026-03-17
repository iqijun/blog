---
title:  unix深入篇[博客搬家]
date: 2016-03-02 12:36:52.0
updated: 2016-03-02 12:36:52.0
url: /archives/27
categories: 
tags: uninx常用命令
---

<pre>本文首发在csdn博客现转移到此处 原文地址：http://blog.csdn.net/iqijun/article/details/14449987</pre>
<pre>一、Unix定时器
        Unix定时器由cron进程实现，其是一个daemon进程。cron会按照crontabs文件指定的时间执行命令。
        crontabs命令：
        crontab        删除crontabs原有内容，并通过键盘输入新内容
        crontab myfile 将myfile的内容取代crontabs原有内容
        crontab -r      删除现有的crontabs文件
        crontab -l      显示现有的crontabs文件内容
        使用举例：
                1.crontab -l &gt; tmp
                2.对tmp编辑添加一行
                   0  3  1 * *  /user/bin/stat
                3.运行crontab tmp
二、Unix用户管理
        只有root用户和授权用户才能对用户和用户组进行增加，修改，删除操作
        常用命令：
                useradd        增加用户
                userdel        删除用户
                usermod        修改用户
                userls         显示用户和系统登录信息
                passwd         修改用户口令
                groupadd       增加用户组
                groupdel       删除用户组
                groupmod       修改用户组
                groupls        显示用户组信息
        命令格式：
             1. useradd [-c comment] [-d directory] [-g group] [-m] [-s shell] username
                -c comment 表示注释
                -d directory 表示家目录
                -g group     表示属于哪个组
                -m        表示如果没有家目录则自动创建
                -s shell  表示使用shell类型
                username  用户名
                示例：
                useradd -c "new user" -m -d /test/cruise -g newgroup -s  /bin/ksh cruise
            2. userdel username
                有的Unix系统不允许彻底删除用户，userdel只是收回用户的使用权。
            3.gruopadd mygroup
            4.groupdel mygroup
     增加和删除用户的另一种方法：
        1.增加用户：
             1)在etc/passwd文件中新增一行数据，表示该用户的信息
             2）为该用户选择用户组，将该用户标识符加载/etc/group文件内适当位置
             3）为该用户创建一个家目录，将家目录的属性改为该用户所有，组别也改为该用户的组别
             4）为该用户设置密码
           /etc/passwd文件：是一个文本文件，用来存放用户信息，每一行表示一个用户。
          每行的内容格式：user_name:password:uid:gid:comment:home:shell
                其中uid是用户的识别号，是一个数值，每个用户的识别号不同
                    comment  注释，可以是任意字符，一般用来说明用户的身份特征
                    shell:该用户缺省的shell，一般取值为/bin/sh,/bin/ksh, /bin/csh
           /etc/group文件：是一个文本文件，用来存放用户的组信息，
             每行内容格式： group_name:password:gid:members_list
                password  用户组密码，一般为空
              特别注意：一个用户可以属于多个用户组
                /etc/group内容示例：
                 group::50:tom,cruise,jerry,amily
            2.创建家目录
               # mkdir /user/cruise  在/usr目录下创建和用户名同名的目录
               # chown cruise  /user/cruise
               #chgrp mygroup /user/cruise
               #chmod 755 /user/cruise
            3.设置密码
                passwd cruise *****
      2.删除用户的步骤：
            a.在/etc/passwd中删除用户的行
            b.在/etc/group中删除用户的组信息
            c.删除家目录

三、硬盘维护
1.硬盘维护命令：#du #df #df -k
2.mount命令和unmount命令
   mount的过程：
        1.创建目录
        2.对目录权限进行修改
        3.执行mount命令，将设备挂接到该目录
 示例：1.mkdir /hd_dir
       2.chmod 777 /hd_dir
       3.mount /cruise/tom /hd_dir其中：cruise/tom是分区设备
硬盘信息命令：root用户下键入： #prtvtoc    
硬盘格式化命令 #format
unmount命令：unmount 设备文件 或者 unmount 挂接目录</pre>