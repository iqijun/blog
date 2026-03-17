---
title: python笔记
date: 2016-05-18 11:40:41.0
updated: 2017-10-03 14:05:53.0
url: /archives/51
categories: 
tags: 基础 | python | 廖雪峰
---

<ol>
<li>python是动态语言，变量本身的类型不固定

如:

<pre><code>a=1;  
a="abc"; 
</code></pre>

这是正确的</p></li>
<li><p>python中有两种除法 /  //

/ 得到的总是浮点数 ,// 叫做地除法 它总是只取整数部分

如：

<pre><code>10/3 
</code></pre>

3.3333

10//3

3</p></li>
<li><p>字符和编码转换 
ord() chr()</p></li>
<li><p>由于Python的字符串类型是str，在内存中以Unicode表示，一个字符对应若干个字节。如果要在网络上传输，或者保存到磁盘上，就需要把str变为以字节为单位的bytes。

<pre><code>x=b'xyx'
</code></pre></li>
<li>以Unicode表示的str通过encode()方法可以编码为指定的bytes

<pre><code>'abc'.encode('utf-8')
</code></pre></li>
<li>如果我们从网络或磁盘上读取了字节流，那么读到的数据就是bytes。要把bytes变为str，就需要用decode()方法

<pre><code> b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf8')
</code></pre></li>
<li>字符串str长度函数len(),此函数同样适用于字节</li>
<li>由于Python源代码也是一个文本文件，所以，当你的源代码中包含中文的时候，在保存源代码时，就需要务必指定保存为UTF-8编码。当Python解释器读取源代码时，为了让它按UTF-8编码读取，我们通常在文件开头写上这两行：

<pre><code>#!/usr/bin/env python3
# -*- coding: utf-8 -*-
</code></pre></li>
</ol>

9.list api

<pre><code>    list=['1','2','3']
    len(list)
    list[-1] //返回最后一个元素
    list[-2] //返回倒数第二个 依次类推
    list.append('4')  //追加元素
    list.insert(1,'5')
    list.pop() //删除最后一个
    list.pop(1) //删除索引为1的元素
</code></pre>

10. tuple 数组   tuple一旦初始化就不能修改
    如果tuple中只有一个元素要跟一个逗号如

<pre><code>    t=(1,)
</code></pre>

<ol>
<li>条件判断

<pre><code>if age&gt;18:
    print("18")
elif age&gt;10:
    print('10')
else :
    print('baby')
</code></pre></li>
<li>循环

<pre><code>for cell in cells
    print(cell)

while n&gt;10
    sum = sum+n
    print(sum)
</code></pre></li>
<li>dict  同java中的map

<pre><code>dict={'name':'123'}
print(dict['name'])
//判断dict中是否含有某个key
'age' in dict
//dict的get方法
print(dict.get('name')) //输出 123 
print(dict.get('age')) //None
print(dict.get('age',-1)) // -1
dict.pop('name')
dict['age']=10 //新增元素
</code></pre>

和list比较，dict有以下几个特点：

查找和插入的速度极快，不会随着key的增加而变慢；
需要占用大量的内存，内存浪费多。
而list相反：

查找和插入的时间随着元素的增加而增加；
占用空间小，浪费内存很少。</p></li>
<li><p>set

<pre><code>s = set('apage')
print(s)
s1 = set([1,2,3])
s1.add(5)
s1.remove(5)
</code></pre></li>
<li>内置函数

数据类型检查可以用内置函数isinstance()

<pre><code>isinstance(123,(int,float)) //第二个参数可以是一个数组
</code></pre></li>
<li>函数可以返回多个值

<pre><code>def move(x,y){
    //处理
    return x,y
}

x,y  = move(1,2);
print(x);
print(y);


r = move(1,2);
print(r);//r=(xx,xx);返回值是tuple
</code></pre></li>
<li>函数参数

1) 定义函数时可以使用默认值，例如

<pre><code>def power(x,n=2):
    s = 1;
    while n &gt;= 1 :
        s = x * s;
        n = n-1;
    return s
</code></pre>

带默认值要放到参数后面；
参数默认值问题，默认参数必须指向不变对象！
可以使用None来避免：如

<pre><code>    def add_end(L=None):
         if L is None:
             L = []
             L.append('END')
        return L
</code></pre>

2) 可变参数

<pre><code>    def calc(*numbers):
        sum = 0
        for n in numbers:
             sum = sum + n * n
        return sum
将list或tuple作为可变参数传入

    num = [1,2,3]
    calc(*num)
</code></pre>

3) 关键字参数

<pre><code>    def person(**kw)
        print(kw)
</code></pre>

4) 命名关键字参数

<pre><code>    def person(a,b,*,city,job)
命名关键字需要用*号分开，*后面的参数被视为命名关键字参数
命名关键字参数可以使用默认值：

    def person(a,b,*,city='beijing',job)
</code></pre>

5) 小结：

默认参数一定要用不可变对象，如果是可变对象，程序运行时会有逻辑错误！

<pre><code>要注意定义可变参数和关键字参数的语法：
*args是可变参数，args接收的是一个tuple；
**kw是关键字参数，kw接收的是一个dict。
命名的关键字参数是为了限制调用者可以传入的参数名，同时可以提供默认值。定义命名的关键字参数在没有可变参数的情况下不要忘了写分隔符*，否则定义的将是位置参数
</code></pre></li>
<li>尾递归是指，在函数返回的时候，调用自身本身，并且，return语句不能包含表达式。这样，编译器或者解释器就可以把尾递归做优化，使递归本身无论调用多少次，都只占用一个栈帧，不会出现栈溢出的情况。</p></li>
<li><p>分片操作

即截取操作，list,tuple,字符串都可以使用分片操作，例如：

<pre><code>list=[1,2,3,4,5];
list[1:3]  //截取第二个到第三个  ，索引从0开始
list[:3]  //截取前三个
list[-2:]  //截取倒数两个
list[:]   //复制
tuple=(1,2,3,4,5)
tuple[2:3]
tuple[2:3:-1]  //截取出‘子串’，然后倒序输出  如果最后一位如果为正则，则正序输出；为负，则倒序输出
</code></pre></li>
<li>迭代
1) 迭代dict

<pre><code>    dict = {'a':1,'b':2,'c':3}
    //默认迭代key
    for key in dict
        print(key)
    //迭代value
    for value in dict.values()
        print(value)
    //同时迭代
    for key,value in dict.items()
        print(key,':'value)
</code></pre>

2）  判断元素是否可以迭代：导入collections模块的Iterable类型

<pre><code>    from collections import Iterable
     isinstance('abc',Iterable) 

    //enumerate将list转换为索引-元素对 
for i,value in enumerate(['a','b','c']):
    print(i,value)
</code></pre></li>
<li>列表生成式

生成一个list列表，如

<pre><code>dict={'a':1,'b':2,'c':3]
list =[x+"="+str(y) for x,y in dict.items()]
</code></pre></li>
<li>列表生成器

列表生成器和生成式的区别在于：生成器为“（）” 而生成式是“[]”
可以使用next()函数获取generator的下一个值，当获取不到值后，会产生StopIteration异常，如：

<pre><code>generator = (x+"="+str(y) for x,y in dict.items())
next(generator)
//使用for循环
for x in generator
    print(x)
//使用函数产生一个生成器 
def  fib_generator(max):
    n,a,b = 0,0,1
    while n&lt;max:
        yield(b)
        a,b = b, a+b
        n=n+1
    return 'done'

for x in fib_generator(5):
    print(x)  
</code></pre>

但是用for循环调用generator时，发现拿不到generator的return语句的返回值。如果想要拿到返回值，必须捕获StopIteration错误，返回值包含在StopIteration的value中：

<pre><code> g = fib(6)
 while True:
    try:
         x = next(g)
        print('g:', x)
    except StopIteration as e:
             print('Generator return value:', e.value)
     break  
</code></pre></li>
<li>凡是可作用于for循环的对象都是Iterable类型；
凡是可作用于next()函数的对象都是Iterator类型，它们表示一个惰性计算的序列；
集合数据类型如list、dict、str等是Iterable但不是Iterator，不过可以通过iter()函数获得一个Iterator对象。</li>
</ol>

Python的for循环本质上就是通过不断调用next()函数实现的

<ol>
<li>函数式编程

1） 高阶函数：参数中含有其他函数的函数称为高阶函<br />
2） map/reduce<br />
map()函数接收两个参数，一个是函数，一个是<strong>Iterable</strong>，map将传入的函数依次作用到序列的每个元素，并把结果作为新的<strong>Iterator</strong>返回。<br />
reduce把一个函数作用在一个序列[x1, x2, x3, ...]上，这个函数必须接收两个参数，reduce把结果继续和序列的下一个元素做累积计算，其效果就是：

<pre><code>reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)
</code></pre>

<p>本文根据廖雪峰老师<a href="http://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001431752945034eb82ac80a3e64b9bb4929b16eeed1eb9000">博客</a>记录</p></li>
</ol>