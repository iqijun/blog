---
title: yii   could not find driver
date: 2017-01-21 22:21:32.0
updated: 2017-01-21 22:21:32.0
url: /archives/184
categories: 
tags: yii | could not find driver | php | yii2
---

<blockquote>哪些开起来挺简单的东西，真正做起来就未必是看起来的样子了。比如作为一个javaer的我，开始写php代码的时候就掉到了这么一个小坑了，与大家共享</blockquote>

yii框架导入到phpstorm中

config/db.php

<pre><code>&lt;pre&gt;&lt;?php

return [
    'class' =&gt; 'yii\db\Connection',
    'dsn' =&gt; 'mysql:host=localhost;dbname=yii',
    'username' =&gt; 'root',
    'password' =&gt; '',
    'charset' =&gt; 'utf8'

];&lt;/pre&gt;
</code></pre>

根据<a href="http://www.yiichina.com/doc/guide/2.0/db-dao">官方手册</a>感觉写完model，写完controller就可以万事大吉，愉快的访问程序了，但天不遂人愿，报了个大大的错误（大脸状）

<pre><code>&lt;pre&gt;{"name":"Database Exception","message":"could not find driver","code":0,"type":"yii\\db\\Exception","file":"E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Connection.php","line":550,"stack-trace":["#0 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Connection.php(864): yii\\db\\Connection-&gt;open()","#1 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Connection.php(851): yii\\db\\Connection-&gt;getMasterPdo()","#2 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Command.php(219): yii\\db\\Connection-&gt;getSlavePdo()","#3 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Command.php(894): yii\\db\\Command-&gt;prepare(true)","#4 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Command.php(388): yii\\db\\Command-&gt;queryInternal('fetchColumn', 0)","#5 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Query.php(393): yii\\db\\Command-&gt;queryScalar()","#6 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\ActiveQuery.php(334): yii\\db\\Query-&gt;queryScalar('COUNT(*)', NULL)","#7 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Query.php(300): yii\\db\\ActiveQuery-&gt;queryScalar('COUNT(*)', NULL)","#8 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\data\\ActiveDataProvider.php(165): yii\\db\\Query-&gt;count('*', NULL)","#9 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\data\\BaseDataProvider.php(147): yii\\data\\ActiveDataProvider-&gt;prepareTotalCount()","#10 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\data\\ActiveDataProvider.php(105): yii\\data\\BaseDataProvider-&gt;getTotalCount()","#11 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\data\\BaseDataProvider.php(79): yii\\data\\ActiveDataProvider-&gt;prepareModels()","#12 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\data\\BaseDataProvider.php(92): yii\\data\\BaseDataProvider-&gt;prepare()","#13 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\rest\\Serializer.php(174): yii\\data\\BaseDataProvider-&gt;getModels()","#14 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\rest\\Serializer.php(143): yii\\rest\\Serializer-&gt;serializeDataProvider(Object(yii\\data\\ActiveDataProvider))","#15 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\rest\\Controller.php(97): yii\\rest\\Serializer-&gt;serialize(Object(yii\\data\\ActiveDataProvider))","#16 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\rest\\Controller.php(75): yii\\rest\\Controller-&gt;serializeData(Object(yii\\data\\ActiveDataProvider))","#17 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\base\\Controller.php(156): yii\\rest\\Controller-&gt;afterAction(Object(yii\\rest\\IndexAction), Object(yii\\data\\ActiveDataProvider))","#18 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\base\\Module.php(454): yii\\base\\Controller-&gt;runAction('', Array)","#19 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\web\\Application.php(87): yii\\base\\Module-&gt;runAction('navbar', Array)","#20 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\base\\Application.php(375): yii\\web\\Application-&gt;handleRequest(Object(yii\\web\\Request))","#21 E:\\phpworkspace\\yii2.09\\web\\index.php(12): yii\\base\\Application-&gt;run()","#22 {main}"],"error-info":null,"previous":{"name":"Exception","message":"could not find driver","code":0,"type":"PDOException","file":"E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Connection.php","line":603,"stack-trace":["#0 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Connection.php(603): PDO-&gt;__construct('mysql:host=loca...', 'root', '', NULL)","#1 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Connection.php(545): yii\\db\\Connection-&gt;createPdoInstance()","#2 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Connection.php(864): yii\\db\\Connection-&gt;open()","#3 E:\\phpworkspace\\yii2.09\\vendor\\yiisoft\\yii2\\db\\Connection.php(851): yii\\db\\Connection-&gt;getMasterPdo()","&lt;/pre&gt;
</code></pre>

php还没入门的我，只好借助度娘

原来php在连接数据库的时候还需要打开特定的扩展，就好比java中要导入特定数据库的驱动包一样。原因找到了，动手解决之。

打开php.ini,搜索extension=php_pdo_mysql.dll，将前面的注释打开即可。

另，搜索过程中有些结果还需要打开extension=php_pdo.dll，但是我正在使用php5.6.26版本中并未发现此扩展。