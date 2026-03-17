---
title: pip 指定镜像下载报错
date: 2018-08-11 16:34:47.0
updated: 2018-08-11 16:34:47.0
url: /archives/391
categories: 杂谈
tags: 
---

可以直接在执行命令时，指定镜像
python -m pip install sqlacodegen -i --trusted-host http://mirrors.aliyun.com/pypi/simple/
但使用这种方式安装时报错,具体原因为追究

Cannot unpack file C:\Users\ADMINI~1\AppData\Local\Temp\pip-hwhbxuii-unpack\simple.htm (download
ed from C:\Users\ADMINI~1\AppData\Local\Temp\pip-00doi5yn-build, content-type: text/html); cannot
detect archive format
Cannot determine archive format of C:\Users\ADMINI~1\AppData\Local\Temp\pip-00doi5yn-build
修改全局的镜像 windows 在C:\Users\Administrator 目录下创建 pip目录，并在目录下创建pip.ini文件，内容为：
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com
然后在虚拟环境执行 pip install 命令即可