---
title: mongo基础
date: 2016-12-29 23:18:40.0
updated: 2016-12-30 17:54:22.0
url: /archives/146
categories: 
tags: mongo | 查询 | 基础 | 文档 | 数据库
---

<div>1.名词对比</div>

<div>
<table border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td>sql术语</td>
<td>mongo术语</td>
<td>解释/说明</td>
</tr>
<tr>
<td>database</td>
<td>database</td>
<td>数据库</td>
</tr>
<tr>
<td>table</td>
<td>collection</td>
<td>表/集合</td>
</tr>
<tr>
<td>row</td>
<td>document</td>
<td>记录/文档</td>
</tr>
<tr>
<td>column</td>
<td>field</td>
<td>数据字段/域</td>
</tr>
<tr>
<td>index</td>
<td>index</td>
<td>索引</td>
</tr>
<tr>
<td>primary key</td>
<td>primary key</td>
<td>主键,MongoDB自动将_id字段设置为主键</td>
</tr>
</tbody>
</table>
</div>

<div>2.数据库操作</div>

<ol>
    <li>查看数据库 show dbs</li>
    <li>显示当前数据库 db</li>
    <li>切换数据库 use ${dbName} 如果不存在名字为{dbname}的数据库则直接创建</li>
    <li>mongo保留数据库：
<ol>
    <li>admin： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。</li>
    <li>local: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合</li>
    <li>config: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。</li>
</ol>
</li>
    <li>删除数据库
<ol>
    <li>db.dropDatabase(); 删除当前数据库</li>
</ol>
</li>
</ol>

<div>3.集合操作</div>

<ol>
    <li>删除集合：db.collection.drop()</li>
</ol>

<div>4.文档操作</div>

<div>1. 插入文档 ：db.collection.insert({name:"cruise"});</div>

<ol start="2">
    <li>db.col.save(document) 命令。如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。</li>
    <li>更新操作
<ol>
    <li>db.collection.update( &lt;query&gt;, &lt;update&gt;, { upsert: &lt;boolean&gt;, multi: &lt;boolean&gt;, writeConcern: &lt;document&gt; } )</li>
</ol>
</li>
</ol>

<div>query : update的查询条件，类似sql update查询内where后面的。</div>

<div>update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的</div>

<div>upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。</div>

<div>multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。</div>

<div>writeConcern :可选，抛出异常的级别。</div>

<div>4.移除操作</div>

<div>db.collection.remove( &lt;query&gt;, { justOne: &lt;boolean&gt;, writeConcern: &lt;document&gt; } )</div>

<div>query :（可选）删除的文档的条件。</div>

<ul>
    <li>justOne : （可选）如果设为 true 或 1，则只删除一个文档。</li>
    <li>writeConcern :（可选）抛出异常的级别。</li>
</ul>

<div>5.查询操作</div>

<div><img src="C:\Users\Administrator\AppData\Local\YNote\data\sina1751889805\00c49fcd3ef24f43aa34992a6c4977af\clipboard.png" data-media-type="image" data-attr-org-src-id="4FEB7E6389674B1C874EFA9A5109CF0B" /></div>

<div>and条件查询：</div>

<div>MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开，及常规 SQL 的 AND 条件。</div>

<div>db.col.find({key1:value1, key2:value2}).pretty()</div>

<div>or条件查询：</div>

<div>db.col.find( { $or: [ {key1: value1}, {key2:value2} ] } ).pretty()</div>

<div>条件操作符：</div>

<ul>
    <li>(&gt;) 大于 - $gt</li>
    <li>(&lt;) 小于 - $lt</li>
    <li>(&gt;=) 大于等于 - $gte</li>
    <li>(&lt;= ) 小于等于 - $lte</li>
</ul>

<div>6.排序</div>

<div>在MongoDB中使用使用sort()方法对数据进行排序，sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。</div>

<div>db.COLLECTION_NAME.find().sort({KEY:1})</div>

<div>7.索引</div>

<div>db.COLLECTION_NAME.ensureIndex({KEY:1})</div>

<div>语法中 Key 值为你要创建的索引字段，1为指定按升序创建索引，如果你想按降序来创建索引指定为-1即可</div>

<div>8.mongo聚合：</div>

<div>
<div>9.mongo副本集：</div>
<div>一种官方推荐的集群方式</div>
<div></div>
<div>10.mongo分片</div>
<div>在Mongodb里面存在一种集群，就是分片技术,可以满足MongoDB数据量大量增长的需求。</div>
<div>当MongoDB存储海量的数据时，一台机器可能不足以存储数据，也可能不足以提供可接受的读写吞吐量。这时，我们就可以通过在多台机器上分割数据，使得数据库系统能存储和处理更多的数据。</div>
<div></div>
<div>11.MongoDB 备份(mongodump)与恢复(mongorestore)</div>
<div>12.mongoDB监控</div>
<ol>
    <li>mongostat</li>
    <li>mongotop</li>
</ol>
<div>13.mongo数据库引用 Dbref</div>
<div>形式：{ $ref : , $id : , $db : }</div>
<div>实例：address字段使用了DBref</div>
<div>{ "_id":ObjectId("53402597d852426020000002"), "address": { "$ref": "address_home", "$id": ObjectId("534009e4d852427820000002"), "$db": "w3cschoolcc"}, "contact": "987654321", "dob": "01-01-1991", "name": "Tom Benzamin" }</div>
<div>14.mongo查询分析</div>
<ol>
    <li>explain()</li>
</ol>
<div>实例：</div>
<div>db.users.find({gender:"M"},{user_name:1,_id:0}).explain()</div>
<div>返回信息：</div>
<div>    ```</div>
<div style="padding-left: 30px;">{</div>
<div style="padding-left: 30px;">"cursor": "BtreeCursor gender_1_user_name_1",</div>
<div style="padding-left: 30px;">"isMultiKey": false,</div>
<div style="padding-left: 30px;">"n": 1,</div>
<div style="padding-left: 30px;">"nscannedObjects": 0,</div>
<div style="padding-left: 30px;">"nscanned": 1,</div>
<div style="padding-left: 30px;">"nscannedObjectsAllPlans": 0,</div>
<div style="padding-left: 30px;">"nscannedAllPlans": 1,</div>
<div style="padding-left: 30px;">"scanAndOrder": false,</div>
<div style="padding-left: 30px;">"indexOnly": true,</div>
<div style="padding-left: 30px;">"nYields": 0,</div>
<div style="padding-left: 30px;">"nChunkSkips": 0,</div>
<div style="padding-left: 30px;">"millis": 0,</div>
<div style="padding-left: 30px;">"indexBounds": {</div>
<div style="padding-left: 30px;">"gender": [</div>
<div style="padding-left: 30px;">[</div>
<div style="padding-left: 30px;">"M",</div>
<div style="padding-left: 30px;">"M"</div>
<div style="padding-left: 30px;">]</div>
<div style="padding-left: 30px;">],</div>
<div style="padding-left: 30px;">"user_name": [</div>
<div style="padding-left: 30px;">[</div>
<div style="padding-left: 30px;">{</div>
<div style="padding-left: 30px;">"$minElement": 1</div>
<div style="padding-left: 30px;">},</div>
<div style="padding-left: 30px;">{</div>
<div style="padding-left: 30px;">"$maxElement": 1</div>
<div style="padding-left: 30px;">}</div>
<div style="padding-left: 30px;">]</div>
<div style="padding-left: 30px;">]</div>
<div style="padding-left: 30px;">}</div>
<div style="padding-left: 30px;">}</div>
<div>    ```</div>
<div>分析：</div>
<ul>
    <li>indexOnly: 字段为 true ，表示我们使用了索引。</li>
    <li>cursor：因为这个查询使用了索引，MongoDB中索引存储在B树结构中，所以这是也使用了BtreeCursor类型的游标。如果没有使用索引，游标的类型是BasicCursor。这个键还会给出你所使用的索引的名称，你通过这个名称可以查看当前数据库下的system.indexes集合（系统自动创建，由于存储索引信息，这个稍微会提到）来得到索引的详细信息。</li>
    <li>n：当前查询返回的文档数量。</li>
    <li>nscanned/nscannedObjects：表明当前这次查询一共扫描了集合中多少个文档，我们的目的是，让这个数值和返回文档的数量越接近越好。</li>
    <li>millis：当前查询所需时间，毫秒数。</li>
    <li>indexBounds：当前查询具体使用的索引。</li>
</ul>
<div></div>
<div>2.使用 hint()</div>
<div>虽然MongoDB查询优化器一般工作的很不错，但是也可以使用hints来强迫MongoDB使用一个指定的索引。</div>
<div>这种方法某些情形下会提升性能。 一个有索引的collection并且执行一个多字段的查询(一些字段已经索引了)。</div>
<div>如下查询实例指定了使用 gender 和 user_name 索引字段来查询：</div>
<div>db.users.find({gender:"M"},{user_name:1,_id:0}).hint({gender:1,user_name:1})</div>
<div>15.原子操作</div>
<div>mongodb不支持事务，所以，在你的项目中应用时，要注意这点。无论什么设计，都不要要求mongodb保证数据的完整性。</div>
<div>但是mongodb提供了许多原子操作，比如文档的保存，修改，删除等，都是原子操作。</div>
<div>所谓原子操作就是要么这个文档保存到Mongodb，要么没有保存到Mongodb，不会出现查询到的文档没有保存完整的情况。</div>
<div>常用原子操作：</div>
<div>16.ObjectId</div>
<div>1. 组成：</div>
<div>ObjectId 是一个12字节 BSON 类型数据，有以下格式：</div>
<ul>
    <li>前4个字节表示时间戳</li>
    <li>接下来的3个字节是机器标识码</li>
    <li>紧接的两个字节由进程id组成（PID）</li>
    <li>最后三个字节是随机数。</li>
</ul>
<div>2.myObjectId = ObjectId();</div>
<div>//得到时间戳</div>
<div>myObjectId.getTimestamp();</div>
<div>//得到字符串</div>
<div>myObjectId.str</div>
<div></div>
<div>17.全文搜索</div>
<div>1. 2.6版本后默认支持全文搜索</div>
<div>2. 启用全文搜索命令</div>
<div>db.adminCommand({setParameter:true,textSearchEnabled:true})</div>
<div>或mongod --setParameter textSearchEnabled=true</div>
<div>3.删除索引</div>
<div>db.persion.getIndexes()</div>
<div>db.persion.dropIndex("name_1")</div>
<div>18.mongo自动增长：</div>
<div>MongoDB 没有像 SQL 一样有自动增长的功能， MongoDB 的 _id 是系统自动生成的12字节唯一标识。</div>
<div>如果要实现自动增长要通过编程方式自己实现</div>
<div></div>
<div></div>
<div></div>
</div>

<div></div>

<div></div>

<div></div>