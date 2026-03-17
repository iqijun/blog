---
title: pip镜像问题
date: 2017-11-05 12:40:22.0
updated: 2017-11-05 13:09:30.0
url: /archives/401
categories: 
tags: python | pip镜像
---

<ol>
<li>可以直接在执行命令时，指定镜像</li>
</ol>

<pre><code>python -m pip install sqlacodegen -i --trusted-host http://mirrors.aliyun.com/pypi/simple/

</code></pre>

但使用这种方式安装时报错,具体原因没有深究

<pre><code>  Cannot unpack file C:\Users\ADMINI~1\AppData\Local\Temp\pip-hwhbxuii-unpack\simple.htm (download
ed from C:\Users\ADMINI~1\AppData\Local\Temp\pip-00doi5yn-build, content-type: text/html); cannot
detect archive format
Cannot determine archive format of C:\Users\ADMINI~1\AppData\Local\Temp\pip-00doi5yn-build
</code></pre>

<ol>
<li>修改全局的镜像
windows 在C:\Users\Administrator 目录下创建 pip目录，并在目录下创建pip.ini文件，内容为：</li>
</ol>

<pre><code>[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com

</code></pre>

然后在虚拟环境执行 pip install 命令即可