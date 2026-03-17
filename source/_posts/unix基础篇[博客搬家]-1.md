---
title: unix基础篇[博客搬家]
date: 2016-03-01 19:13:07.0
updated: 2016-03-01 19:13:07.0
url: /archives/26
categories: 
tags: 
---

本文首发在csdn博客先转移到此处  原文地址：http://blog.csdn.net/iqijun/article/details/14231197

1.Unix命令由命令（command）和零到多个参数组成，命令和参数之间，以及参数和参数之间用空格隔开。
2.Unix的命令区分大小写，且命令和参数之间必须隔开。
3.可以在一行中运行多个命令，命令之间需要用“;”隔开
4.要想让程序在后台执行，只需要在命令行的最后加上“&amp;”符号。
如$find -name abc -print&gt;myfind&amp;  在后台运行find命令，在当前目录和子目录下查找文件名为abc的文件，并将结果存到myfind文件中
5.nohup命令：
当终端推出后，由该终端启动的后台命令自动退出。要想终端退出后程序不停止运行，则需要用nohup命令来启动后台程序。
如 $ nohup find -name abc print&gt;myfind&amp;
6.unix 命令中的一些特殊键：
ctrl +　d 结束键盘输入或退出当前shell
del  中断键，停止当前动作回到shell
ctrl + s 暂停屏幕输出
ctrl + q 继续屏幕输出
ctrl + u kill键，删除光标所在行的所有字符
Esc 结束当前的操作状态。
7.Unix的简单命令
查看帮助信息 man
查看日期 date
查看日历： cal 2013
显示大写大字 banner “ABCD”
计算器 bc
修改口令 passwd
查看谁在使用系统 who
查看我是谁  who am i
显示用户信息 finger Administration  显示登录信息 finger
清空屏幕： clear
8.unix用户间简单的通信
a.write 命令
write destination-user[terminal]
通信双方的一些约定：用“o”表示一条报文结束，以“oo”表示结束对话
b.talk
c.mesg [y] [n] 接受或拒绝信息
d.wall广播式消息传递：只用root用户可以使用，三种格式
I. #wall
II #wall filename
III #wall "send a message"
9.注销或退出unix
exit 或者 logout
或者直接 ctrl + d
二、 unix的文件系统
1.unix操作系统可以由多个可以动态安装及拆卸的文件系统组成。unix文件系统主要分为两大类：根文件系统和附加文件系统。
2.文件存取权限修改：chmod
a.符号模式：chmod [who] op permission file
如：chmod u +w test  表示为user（文件拥有者）增加写的权限
chmod g -w test 表示为组内用户减少写的权限。
b.绝对模式： chmod xyz file 其中x,y,z分别是0--7的数字，分别表示属主，用户组，其他用户
x,y,z的取值公式是 a*4+b*2+c
其中：a=1表示可读，a=0表示不可读 b表示是否可写，c表示是否可执行。
3.改变文件的属主
必须对文件具有write权利才可以改变文件的属主
chown 属主名 file   如： chown  cruise test 将test的属主改为cruise
4.改变文件所在的组
必须是文件的属主或者supervisor才能改变文件组别的归属
chgrp 组名 文件名
5.重定向与管道
a.      &lt;  重定向输入
&lt; 重定向输出
&gt;&gt;重定向输出并追加到文件最后
如： ls -l &gt;file1 将ls -l的结果输出到file1
ls &gt;&gt;file1 将ls的结果附加到file1的尾部
b.unix管道 将一文件的输出作为另一文件的输入 管道符号为  |
ls|more
ps -ef|grep smith 将ps -ef  的输出作为grep smith的输入
6.Unix文件系统常用命令
pwd 显示当前目录
cd /user 进入到user目录下
cd  进入到home目录
mkdir 创建目录
rmdir 删除空目录
ls     显示目录的内容
示例：ls -l abc 文件长列表（和windows下详细信息相似）
ls -a abc 所有类型的文件
ls -d * 不进入子目录
cat   显示文本文件的内容
more   一次一屏显示文本文件内容
cp    拷贝文件

三、unix常用工具和实用程序
1.vi
vi 文件名   进入命令模式
i  将在光标所在位置之前插入文本 (insert)   I  将在光标所在行的第一个非空字符前插入文本
a  将在光标所在位置之后添加文本（append）  A  将在光标所在行的末尾添加文本
o  将在光标所在行的下一行开始插入文本      O  将在光标所在行的上一行开始插入文本
光标位置移动：
h:左移 j:下移 k：上移 l：右移
行号G 光标移到某一行（如1G表示光标移动到第一行）   G表示移动到文件结尾
文本输入方式退出： ESC
删除更改操作： x 删除光标所在字符    dd 删除光标所在行
退出vi  ：wq 存盘退出 :q 不存盘退出    :q! 不存盘强制退出   ：w 只存盘不退出
2.find命令
find 目录名 条件
条件：  -name name 可以使用通配符
-print     将符合条件的路径打印出来
-size n     寻找占用n个block的文件
-type x      以文件类型作为查找条件，文件类型x如下
d---目录   f---文件   b---块  c--字符  p--管道
-user username username 可以是用户名或者Uid号
-group group  group可以为组名或者gid号
-links n       寻找链接数等于n的所有文件 +n表示大于n -n表示小于n
-atim n         寻找n天前曾被存取的文件
-mtime n         寻找n天前曾被修改的文件
-exec command{}\  用寻找到的文件作为执行command的对象，{}内存放欲执行command时所需要的参数
条件的逻辑运算符：！ 非 ； -o 或 ； 空格  与
3.grep命令    global search regular expression(RE) and print out the line,全面搜索正则表达式并把行打印出来
grep在整个文件中搜索指定的字符串，并将所有出现该字符串的行打印
命令格式 grep 字符串 文件名
示例： grep "I am fun" cruise.txt
4.cmp命令比较文件
cmp命令可以比较两个文件，这两个文件可以是文本文件也可以是非文本文件。cmp命令会显示两个文件第一次数据不同的位置。若两个文件内容相同，
则不显示任何信息。
命令格式：cmp [-ls] 文件名1 文件名2
-l 显示每个不同之处不同字节的内容
-s 只显示cmp命令的返回值（相同为0,不相同为1）
5.文件的备份和恢复实用程序
a.tar 命令
b.文件压缩
1.  compress filename 将文件压缩 压缩后文件后缀为".z" compress压缩文件减少存储空间
uncompress file.z 将文件解压
2.pack压缩文件
pack filename 将文件压缩 压缩后文件后缀为".z"  其压缩后的空间因文件类型而定
unpack file.z
注：pack对太小的文件不压缩如果要强制压缩实用 pack -f filename
3.gzip压缩文件 压缩后的文件名为.gz
gzip filename
gunzip filename 解压
4.pkzip 压缩后的文件名为.zip
pkzip filename
pkunzip filename 解压
四、Unix的简单维护和管理
1：init状态
2：unix关机
3.修改系统时间： date -t 201311041719
将系统时间更改为2013年11月4号17点19分
4.管理后台进程
a.显示进程信息
ps            显示使用终端有关的进程信息
ps -u 用户名  显示某个用户的进程
ps -e         显示正在执行的进程
ps -f         长列表显示每个进程信息
b.用kill命令杀掉后台进程
kill 进程号       删除进程
kill -9 进程号    强制删除进程
c.停止失控的进程步骤
1）在未死锁的终端以root登录
2）用ps -ef 和 grep 关键字 命令找到失控进程的pid号
3）kill pid ,若杀不掉，再运行 kill -9 pid号
4）若还是杀不死，则shutdown
5.磁盘使用情况
a.df -v        查看磁盘的自由空间
b.du [文件名]  查看磁盘的使用情况
五、网络通信
1.查看网上用户信息
finger[用户名]@主机域名或ip地址