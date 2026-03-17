---
title: git学习
date: 2016-02-12 22:48:47.0
updated: 2016-02-22 23:24:17.0
url: /archives/20
categories: 
tags: github | 笔记 | oschina git | git
---

<div>1.安装客户端 （略）</div>
<div>2.告诉git你的名字</div>
<div>    git config --global user.name "你的名字"</div>
<div>3.设置邮箱</div>
<div>    git config --global user.email "xxxx@xx.com"</div>
<div>4.cd到要创建git仓库的目录</div>
<div>     注意：windows系统下进入到某个盘符要使用“/盘符名/xxx”如：“/c/work”</div>
<div> 5.创建仓库</div>
<div>    git init</div>
<div> 6.将文件添加到git仓库</div>
<div>    git add  目录</div>
<div></div>
<div>   <span style="color: #ff0000;">出现警告  warning: LF will be replaced by CRLF in</span></div>
<div>7.查看仓库的状态</div>
<div>    git status</div>
<div>8.查看修改的内容</div>
<div>    git diff &lt;path&gt;</div>
<div>9.提交修改后的文件</div>
<div>    git add &lt;path&gt;</div>
<div>    git commit</div>
<div>10.查看提交过的版本</div>
<div>    git log</div>
<div>    git log --pretty=oneline  //查看简易的提交日志</div>
<div>11.版本回退</div>
<div>    在 git中使用“head”表示当前版本，上一个版本是“head^”,上上个版本是“head^^”前一百个版本是“HEAD~100”</div>
<div>   使用git reset恢复</div>
<div>    git reset --hard HEAD</div>
<div>    git reset --hard  commit_id</div>
<div>12.撤销修改</div>
<div>    git checkout --  &lt;path&gt;</div>
<div>    1.如果没有执行git add命令将修改添加的暂存区，那么将工作区的修改恢复为与版本库一样</div>
<div>    2.如果执行了git add命令，那么将恢复到添加到暂存区后的状态。</div>
<div>    3.git reset HEAD &lt;path&gt;可以把暂存区的修改撤销掉（unstage），然后执行git checkout --&lt;path&gt;</div>
<div> 13.删除文件</div>
<div>    git rm</div>
<div> 14.添加远程仓库</div>
<div>     git remote add weixin <a href="mailto:git@git.oschina.net">git@git.oschina.net</a>:iqijun/weChat.git  //将git仓库重命名为weixin</div>
<div>     git push -u weixin master    //将当前分支推送到名为weixin的远程仓库的master分支，-u将本地分支和远程分支创建关联，以后推送或拉去时可以简化命令</div>
<div>     拉取文件：</div>
<div>         git pull &lt;远程主机名&gt; &lt;远程分支名&gt;:&lt;本地分支名&gt;</div>
<div>         如果远程分支和当前分支合并，可简化为git pull &lt;远程主机名&gt; &lt;远程分支名&gt; 如：git pull weixin master</div>
<div>  15.克隆远程库</div>
<div>    git clone   <a href="mailto:git@git.oschina.net">git@git.oschina.net</a>:iqijun/weChat.git</div>
<div>   16.分支管理</div>
<div>       a) git checkout -b branchA  //创建并切换到branchA分支</div>
<div>           checkout -b 相当于以下两条命令：</div>
<div>           git  branch branchA  //创建分支</div>
<div>           git checkout branchA  //</div>
<div>        b) git branch 查看分支，当前面有“*”时表示当前分支。</div>
<div>        c) git  merge branchA  将branchA合并到当前分支</div>
<div>        d)删除分支  git branch -d branchA</div>
<div>        e)存储现场，存储现场后可以保存当前分支的状态，然后切换到其他分支进行其他工作（如：修改bug）</div>
<div>              git stash //可以进行多次现场存储</div>
<div>               git stash  list   //查看现场</div>
<div>                git stash apply stash@{0}  恢复stash@{0}状态时的现场。</div>
<div>                git stash drop     删除现场</div>
<div>                git stash pop 恢复并删除现场</div>
<div>        f)创建远程分支到本地</div>
git checkout -b weixin  origin/dev  //将远程origin主机上的dev分支创建为本地weixin分支
<div>      17.多人协作</div>
<div>        <img src="file:///C:/Users/Administrator/AppData/Local/YNote/data/sina1751889805/01d5afb631ba4e91abacb4b46d7247f6/clipboard.png" alt="" data-media-type="image" data-attr-org-src-id="10E9A6AB34E849D598C88381F6B62B1F" data-attr-org-img-file="file:///C:/Users/Administrator/AppData/Local/YNote/data/sina1751889805/01d5afb631ba4e91abacb4b46d7247f6/clipboard.png" /></div>
<div>    18.标签管理</div>
<div>        <img src="file:///C:/Users/Administrator/AppData/Local/YNote/data/sina1751889805/f63baa392ad54de8abc9f0080412c326/clipboard.png" alt="" data-media-type="image" data-attr-org-src-id="6A1065337F2B4A1FA414CFDA4D1E54C1" data-attr-org-img-file="file:///C:/Users/Administrator/AppData/Local/YNote/data/sina1751889805/f63baa392ad54de8abc9f0080412c326/clipboard.png" /></div>
<div>    19.标签操作</div>
<div>        <img src="file:///C:/Users/Administrator/AppData/Local/YNote/data/sina1751889805/85534dcad57b41689b4363ea6d469da0/clipboard.png" alt="" data-media-type="image" data-attr-org-src-id="FA4D2C00A3144BD59A1CBDCDADAAB23E" data-attr-org-img-file="file:///C:/Users/Administrator/AppData/Local/YNote/data/sina1751889805/85534dcad57b41689b4363ea6d469da0/clipboard.png" /><img src="file:///C:/Users/Administrator/AppData/Local/YNote/data/sina1751889805/85534dcad57b41689b4363ea6d469da0/clipboard.png" alt="" data-media-type="image" data-attr-org-src-id="FA4D2C00A3144BD59A1CBDCDADAAB23E" data-attr-org-img-file="file:///C:/Users/Administrator/AppData/Local/YNote/data/sina1751889805/85534dcad57b41689b4363ea6d469da0/clipboard.png" /></div>
<div>  20.</div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div>
<div>  7.  误将a.txt删除后找回方法：</div>
<div>        git rm a.txt ，删除文件
<div>        a. git log 找到离没删文件前最近的commit id</div>
<div>        b. 将操作过的其它文件转移</div>
<div>        c. git reset --hard "commit id"</div>
<div>8. 忽略已被git追踪的文件</div>
<div>    1) git rm --cached 路径/文件</div>
</div>
<div>    2) git update-index --assume-unchanged &lt;PATH&gt;  更新</div>
<div>    3) 编辑.gitignore文件</div>
<div>    4) git commit -m "We really don't want Git to track this anymore!"</div>
</div>
<div>9.怎么知道本地有设置？<code>git config --local --list</code> 看一眼。
怎么设置本地属性？ <code>git config user.name/email</code>。</div>
<div></div>
<div></div>
<div></div>
<div></div>