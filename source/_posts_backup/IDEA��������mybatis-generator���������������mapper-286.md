---
title: IDEA中执行mybatis-generator不能自动生产mapper
date: 2017-05-22 16:01:51.0
updated: 2019-03-05 14:34:38.0
url: /archives/286
categories: 杂谈
tags: IDEA | mybatis | generator.maven | 依赖范围 | provided
---

<blockquote>
  刚刚从myeclipse离开投入IDEA的怀抱，遇见些工具使用方面的问题，慢慢记录下，以备不时之需。
  
  奇怪的问题，在使用mybatis-generate时，同一份代码在myeclipse中执行没有问题，在IDEA中却疯狂报错
</blockquote>

纠结半天之后，本着先完成code的心态，在eclipse中生成文件后提交svn，然后在IDEA中更新，呵呵哒。。。秋后算账。。。

<h6>问题解决</h6>

<ol>
<li>运行时配置修改
<img src="http://img.full-stacker.com/full-stacker/IDEA%E9%85%8D%E7%BD%AE.png" alt="image" />
<img src="http://img.full-stacker.com/full-stacker/idea_run_config.png" alt="image" />
如图，将working directory修改为$MODULE_DIR$</p></li>
<li><p>修改项目依赖jar包顺序
<img src="http://img.full-stacker.com/full-stacker/idea_project_model_config.png" alt="image" />
将module source依赖移到最上方</p></li>
<li><p>修改maven 依赖中generator的范围</p></li>
</ol>

<pre><code><br />org.mybatis.generator
mybatis-generator-core
&lt;!--&lt;scope&gt;provided&lt;/scope&gt;--&gt;

</code></pre>

<p>不可以使用provided范围，直接注释掉使用默认范围。

<h5>知识点回顾</h5>

<h6>maven依赖范围的作用域：</h6>

依赖范围scope 用来控制依赖和编译，测试，运行的classpath（注意是与classpath）的关系. 主要的是三种依赖关系如下：

1.compile： 默认编译依赖范围。对于编译，测试，运行三种classpath都有效。
有些依赖在主代码中需要import，在测试代码中也需要import，打包的时候还需要一起打包上传服务器，则scope是compile。
2.test：测试依赖范围。只对于测试classpath有效
有些代码是测试需要import，而主代码中不需要，我们不需要把junit打包上传到服务器，则scope是test
3.provided：已提供依赖范围。对于编译，测试的classpath都有效，但对于运行无效。因为由容器已经提供，例如servlet-api
以servlet-api为例，tomcat中已经提供了servlet-api的jar包，但是本地写代码的时候，只需要import进去，而不需要把servlet-api的jar包打包到服务器上，如果打包了，可能会产生jar包冲突，这个时候用provided。
4.runtime:运行时提供。例如:jdbc驱动
例如MySQL的jdbc驱动，在本地写代码的时候，我们都是引入的jdbc接口，并不需要引入具体的jdbc驱动实现，所以写代码的时候并不需要，而运行的时候，我们需要使用具体的驱动，这样的jar包我们的scope为runtime。