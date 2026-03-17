---
title: python快速学习
date: 2017-10-26 22:39:06.0
updated: 2017-10-26 22:39:06.0
url: /archives/394
categories: 
tags: python
---

<ol>
<li>id()查看变量的“内存地址”（id）

<ol>
<li>如果是不可变类型如数字，字符串只要是值相等则id()返回值相等</li>
</ol></li>
<li>私有变量：在变量名前面加“__”(两个横杠)表示class的私有变量，私有变量不能直接访问但可以使用特殊方式获取到，见示例：</li>
</ol>

<pre><code><br />#定义一个class

class Demo:
    #定义一个私有变量
    __sex = "男"
    #类似于构造函数
    def __init__(self):
        self.name = "cruise";
    #定义私有方法
    def __getInfo(self):
        print("name:"+self.name+";地址：")
    #定义静态函数
    @staticmethod
    def staticMethod():
        print("this is a static method")

demo = Demo()
#调用私有方法
demo._Demo__getInfo();
Demo.staticMethod();
#使用id函数查看变量的唯一值
print(id(demo))
#调用私有属性
print(demo._Demo__sex)

</code></pre>

<ol>
<li>pass空语句占位符：比如只定义一个空的class名称，不定义类的内容，就需要使用pass进行占位,如</li>
</ol>

<pre><code>class Demo:
    pass
</code></pre>

4.模块导入import 和 from...import

<pre><code>import xxx模块

</code></pre>

在调用xxx模块中的函数、属性时需要使用 xxx.属性，xxx.方法，这种方式导入的是整个模块可以使用locals()查看

<pre><code>from xxx模块 import 属性/函数
</code></pre>

这种方式导入的只是xxx模块中特定的属性/函数，可以直接使用这些属性/函数；这种方式导入的是模块中特定属性、函数；可以使用locals()查看

<ol>
<li>sys.path</li>
</ol>

<pre><code>import sys
print(sys.path)
# 输出内容为当前的环境变量 ['D:\\python_workspace', 'D:\\python_workspace', 'D:\\python3.5\\python35.zip', 'D:\\python3.5\\DLLs', 'D:\\python3.5\\lib', 'D:\\python3.5', 'D:\\python3.5\\lib\\site-packages']
</code></pre>

当要导入的模块和当前模块不在同一路径下时，可以向sys.path中添加要导入模块的路径

<pre><code>path = sys.path;
path.append("要导入模块的路径");

</code></pre>

6.包

<pre><code>1. python中创建包时需要同时在目录下创建一个__init__.py文件才会将目录识别为包；
2. 在__init__.py中创建__all__变量，向__all__中添加需要向外提供的模块；同理可以在普通模块文件中添加__all__指定需要向外提供的属性/函数;__all__ 的作用类似于ES6 export的作用
</code></pre>

7. 虚拟环境（venv）

<pre><code>不同的项目需要使用不同的运行环境，比如就如同nodeJs的npm安装的依赖不能够都安装的母体环境中一样，创建一个新的venv就是创建一个新的运行环境
</code></pre>

<pre><code>    python -m venv xingguishuai #创建一个新的运行环境
    #进入到运行环境的Script目录下激化该运行环境
    cd D:\test\python_venv\xingguishuai\Scripts

    activate.bat
    #在该运行环境下安装beautiful soup
    python -m pip install beautifulsoup4

</code></pre>

创建好虚拟环境后，可以在pycharm中选择该运行环境，

<ol>
<li>python的异常</li>
</ol>

<pre><code>try:
    xxxx
except:
    print("异常信息")
finally:
    print("必定执行")
</code></pre>

<ol>
<li>with...as.. 使处理异常更加方便</li>
</ol>

<pre><code><br /># -*- coding: utf-8 -*-
class fileLoader:
    def __init__(self,path):
        print("init")
        self.path = path;
    def __enter__(self):
        print("enter")
        self.file = open(self.path,"r");
        return  self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("exit")
        print(str(exc_type)+"::::::"+str(exc_val)+":::::"+str(exc_tb))
        # return True

    def showContext(self):
        print(self.file.read())

# with fileLoader("./test.txt") as fr:
#     fr.showContext()

with fileLoader("./classExample.py") as fr:
    fr.showContext()
</code></pre>

使用with语句是执行顺序是init,enter,exit，如果程序在执行enter方法是出错，则错误的类型、示例、堆栈信息都会传到exit方法中（见exit方法参数）；如果exit方法最后返回True，则错误信息不会抛出；如果程序执行过程中没有抛出错误则exit方法中收到的异常对象为None

<a href="https://docs.python.org/3/reference/compound_stmts.html#the-with-statement">with语句官方文档</a>

<ol>
<li>与数据库交互 pymysql

<ol>
<li>导入pymysql</li>
<li>定义config</li>
</ol>

<pre><code>       import  pymysql
dbconfig = {"host": "localhost", "port": 3306, "user": "root", "password": "", "db": "yii", "charset": 'utf8',
            "cursorclass": pymysql.cursors.DictCursor，} 
    //如果想获得dict类型结果则此处cursorclass需指定为 pymysql.cursors.DictCursor，也可以在程序中使用Cursor的构造函数直接创建相应的对象如： with DictCursor(connection) as cursor:
</code></pre>

<ol>
<li>简单示例</li>
</ol>

<pre><code>import pymysql
from config.config import  dbconfig
from pymysql.cursors import Cursor,SSCursor,DictCursor

connection = pymysql.connect(**dbconfig)
cursor = Cursor(connection)

# 执行sql语句
try:
    with DictCursor(connection) as cursor:
        # 执行sql语句，进行查询
        sql = 'SELECT nav_id,nav_text from navbar where nav_id = 1'
        cursor.execute(sql)
        # 获取查询结果
        result = cursor.fetchone()
        print(result)
    # 没有设置默认自动提交，需要主动提交，以保存所执行的语句
    connection.commit()

finally:
    connection.close();

</code></pre>

<ol>
<li>cursor和ssCursor的区别

<ol>
<li>cursor带有buffer，当执行 cursor.execute(sql)，会将结果缓存，即使此时执行 先connection.close();然后执行cursor.fetchone()，也会返回结果</li>
<li>ssCursor是没有缓存的</li>
</ol></li>
</ol></li>
<li>ORM框架  SQLAlchemy

<ol>
<li>安装，进入虚拟环境 python -m pip install SQLAlchemy</li>
<li>自动生成model（代码生成）
<code>#安装sqlacodegen
pip install sqlacodegen
#生成代码
sqlacodegen mysql+pyMysql://user:passwor@192.168.6.120:3306/database</code></li>
</ol></li>
<li>自动探测网页编码方式

https://github.com/chardet/chardet
安装（进入虚拟环境）
python36 -m pip install chardet

基本使用 （这是官方代码）

<pre><code>import urllib
rawdata = urllib.urlopen('http://yahoo.co.jp/').read()
 import chardet
chardet.detect(rawdata)
{'encoding': 'EUC-JP', 'confidence': 0.99}
</code></pre></li>
<li>python 执行js代码

<ol>
<li>python36 -m pip install PyExecJS</li>
<li>简单示例：</li>
</ol>

<pre><code>import execjs
js=execjs.get();
result=js.eval("1+2")
print(result)
插入一些函数的获取
ctx=js.compile("""var db='123';
  let getDB=()=&gt;db;  //这里是箭头函数

""")
print(ctx.call('getDB'))

</code></pre>

<ol>
<li>官方网站

<p>https://pypi.python.org/pypi/PyExecJS/</p></li>
</ol>

<p>github地址 https://github.com/doloopwhile/PyExecJS</p></li>
</ol>