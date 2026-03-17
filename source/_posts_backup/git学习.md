---
title: git学习
date: 2016-04-15 19:49:29.0
updated: 2016-04-15 19:49:29.0
url: /archives/54
categories: 未分类
tags: 
---

&lt;p&gt;1.安装客户端 （略）&lt;br&gt;2.告诉git你的名字&lt;br&gt;    git config –global user.name “你的名字”&lt;br&gt;3.设置邮箱&lt;br&gt;    git config –global user.email “xxxx@xx.com”&lt;br&gt;4.cd到要创建git仓库的目录&lt;br&gt;     注意：windows系统下进入到某个盘符要使用“/盘符名/xxx”如：“/c/work”&lt;br&gt; 5.创建仓库&lt;br&gt;    git init&lt;br&gt; 6.将文件添加到git仓库&lt;br&gt;    git add  目录&lt;br&gt;   出现警告  warning: LF will be replaced by CRLF in&lt;br&gt;7.查看仓库的状态&lt;br&gt;    git status&lt;br&gt;8.查看修改的内容&lt;br&gt;    git diff &lt;path&gt;&lt;/path&gt;&lt;br&gt;9.提交修改后的文件&lt;br&gt;    git add &lt;path&gt;&lt;/path&gt;&lt;br&gt;    git commit&lt;br&gt;10.查看提交过的版本&lt;br&gt;    git log&lt;br&gt;    git log –pretty=oneline  //查看简易的提交日志&lt;br&gt;11.版本回退&lt;br&gt;    在 git中使用“head”表示当前版本，上一个版本是“head^”,上上个版本是“head^^”前一百个版本是“HEAD~100”&lt;br&gt;   使用git reset恢复&lt;br&gt;    git reset –hard HEAD&lt;br&gt;    git reset –hard  commit_id&lt;br&gt;12.撤销修改&lt;br&gt;    git checkout —  &lt;path&gt;&lt;/path&gt;&lt;br&gt;    1.如果没有执行git add命令将修改添加的暂存区，那么将工作区的修改恢复为与版本库一样&lt;br&gt;    2.如果执行了git add命令，那么将恢复到添加到暂存区后的状态。&lt;br&gt;    3.git reset HEAD &lt;path&gt;&lt;/path&gt;可以把暂存区的修改撤销掉（unstage），然后执行git checkout –&lt;path&gt;&lt;/path&gt;&lt;br&gt; 13.删除文件&lt;br&gt;    git rm&lt;br&gt; 14.添加远程仓库&lt;br&gt;     git remote add weixin git@git.oschina.net:iqijun/weChat.git  //将git仓库重命名为weixin&lt;br&gt;     git push -u weixin master    //将当前分支推送到名为weixin的远程仓库的master分支，-u将本地分支和远程分支创建关联，以后推送或拉去时可以简化命令&lt;br&gt;     拉取文件：&lt;br&gt;         git pull &amp;lt;远程主机名&amp;gt; &amp;lt;远程分支名&amp;gt;:&amp;lt;本地分支名&amp;gt;&lt;br&gt;         如果远程分支和当前分支合并，可简化为git pull &amp;lt;远程主机名&amp;gt; &amp;lt;远程分支名&amp;gt; 如：git pull weixin master&lt;br&gt;  15.克隆远程库&lt;br&gt;    git clone   git@git.oschina.net:iqijun/weChat.git&lt;br&gt;   16.分支管理&lt;br&gt;       a) git checkout -b branchA  //创建并切换到branchA分支&lt;br&gt;           checkout -b 相当于以下两条命令：&lt;br&gt;           git  branch branchA  //创建分支&lt;br&gt;           git checkout branchA  //&lt;br&gt;        b) git branch 查看分支，当前面有“*”时表示当前分支。&lt;br&gt;        c) git  merge branchA  将branchA合并到当前分支&lt;br&gt;        d)删除分支  git branch -d branchA&lt;br&gt;        e)存储现场，存储现场后可以保存当前分支的状态，然后切换到其他分支进行其他工作（如：修改bug）&lt;br&gt;              git stash //可以进行多次现场存储&lt;br&gt;               git stash  list   //查看现场&lt;br&gt;                git stash apply stash@{0}  恢复stash@{0}状态时的现场。&lt;br&gt;                git stash drop     删除现场&lt;br&gt;                git stash pop 恢复并删除现场&lt;br&gt;        f)创建远程分支到本地&lt;br&gt;git checkout -b weixin  origin/dev  //将远程origin主机上的dev分支创建为本地weixin分支&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;  17.多人协作

18.标签管理

19.标签操作
&lt;/code&gt;&lt;/pre&gt;&lt;p&gt;  20.&lt;/p&gt;
&lt;ol&gt;
&lt;li&gt;误将a.txt删除后找回方法：&lt;br&gt;  git rm a.txt ，删除文件&lt;br&gt;  a. git log 找到离没删文件前最近的commit id&lt;br&gt;  b. 将操作过的其它文件转移&lt;br&gt;  c. git reset –hard “commit id”&lt;ol&gt;
&lt;li&gt;忽略已被git追踪的文件&lt;br&gt;1) git rm –cached 路径/文件&lt;br&gt;2) git update-index –assume-unchanged &lt;path&gt;&lt;/path&gt;  更新&lt;br&gt;3) 编辑.gitignore文件&lt;br&gt;4) git commit -m “We really don’t want Git to track this anymore!”&lt;br&gt;9.怎么知道本地有设置？git config –local –list 看一眼。&lt;br&gt;怎么设置本地属性？ git config user.name/email。&lt;/li&gt;
&lt;/ol&gt;
&lt;/li&gt;
&lt;/ol&gt;