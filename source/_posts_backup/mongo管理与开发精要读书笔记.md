---
title: mongo管理与开发精要读书笔记
date: 2018-07-30 22:58:11.0
updated: 2018-07-30 22:58:11.0
url: /archives/452
categories: 
tags: mongo | 红丸 | mongo管理与开发精要
---

作者红丸

一、基础篇
  1. noSql 简介 not only sql
  2. mongo特点
        1. 面向集合
        2. 模式自由，对于存储在mongo数据库中的数据不需要知道它的任何结构定义
        3. 文档型
        4. 支持动态查询
        5. 支持完全索引，包含内部对象
        6. 支持复制和故障修复
        7. 使用高效率的二进制进行存储
        8. 支持处理碎片
        9. 文件格式为Bson
        10. 可通过网络访问
  3. mongo的使用场景
        1. 网站数据，
        2. 缓存
        3. 大尺寸低价值的数据
        4. 高伸缩场景
        5. 用于对象及json数据的存储
 4. 快速入门
    1. mongo的逻辑结构
       文档-->集合-->库
    2. Mongo使用预分配空间机制，每个预分配文件都用0来填充，如果要想禁用预分配机制可以在启动时，加参数--noprealloc，每一次预分配都是上一次分配都数据文件大小都2倍，数据文件最大为2G。这样既可以防止过小都数据库浪费磁盘空间，有可以保证大数据库有充足都预留空间
    3. 日志系统
       1.  系统日志:用来记录mongo都启停信息和运行期间的异常信息,使用方式
       ```
       // 使用追加方式记录系统日志
       mongod --logpath=/data/log/servelog.log logappend

<pre><code>   ```
   2.  journal日志：

    jornal日志通过预写式的redo日志为mongo增加额外的保障，开启该功能数据更新会先写入jornal日志，定期集中提交（目前是100ms，有望继续减小），然后在真实数据上进行变更。如果服务安全关闭，日志会被清除。在启动服务时如果存在jornal日志，则会执行提交，这保证来那些写入来jornal日志但在mongo崩溃前没有提交的数据

   3.  慢查询日志

    记录超过一定时间的查询语句，后，可以通过查看db.system.profile 这个collection来获取慢日志信息。
    ```
    // 指定profile参数  超过5秒就要记录到慢sql中
    mongod  --profile = 1 --slowms= 5
    ```
   4.  oplog主从日志
    Replica Sets 复制过程中一个服务器充当主服务器，而 一个 或 多个 服务器 充当从服务器，主服务器将更新写入一个本地 的 collection 中， 这个collection 记录 着 发 生在 主 服务器 的 更新 操作， 并将 这些 操作 分发 到 从 服务器 上。
4. 元数据存储
5. mongo数据类型
6. mongo安装配置，简单操作 （略）
</code></pre>

二、高级篇
5. mongo高级查询
    1. 面向文档的NoSQL数据库解决的主要问题不是高性能的并发读写，而是在保证 存储海量数据的同时具有良好的查询性能。
    2. 查询操作符
        1. 条件操作符 $gt $lt $gte $lte $in $nin $mod $ne
        2. $all匹配所有,需要配上所有$all中的条件才被查询出来，使用示例
        <code>// age字段必须有 12，3，4三个值时才能查询出来
        db.user.find({age:{$all:[12,3,4]}});</code>
        3.$exists 判断字段是否存在
        <code>&lt;!--查询拥有age字段的数据--&gt;
           db. users. find({ age:{$ exists: true}});</code>

<pre><code>    4.null值的处理
    ```
    &lt;!--查询age为null的数据，这种方式会将不包含age的数据也查询出来--&gt;
    db.user.find({ age: null})

    ```
    如果要查询拥有age，并且为null的数据要与$exists一起使用
    ```
     db.user.find({age:{$in:[null],$exists:true}})
    ```

    5. $size匹配数组元素个数
    ```
    &lt;!--匹配有favorite字段3个元素的数据--&gt;
    db.user.find({favorite:{$size:3}});   
    ```
    6. count查询记录条数
    ```
    // 此时count为user集合中所有文档的数量
    db.user.find().skip(10).limit(5).count()
    // 此时返回限制后的条数 5
    db.user.find().skip(10).limit(5).count(true)
    ```
    7. skip，sort 
    8. group 
    9. 数组内容的查询
    10. 内嵌文档查询
    11. 正则表达式查询

    ```
    &lt;!--查询不是以b开头的名字--&gt;
    db.users.find({ name:{$ not:/^ B.*/}});
    ```
    12. $where

    “$ where 查询” 是指采用类似于SQL中的where语句来进行查询的方式，但 命令中并不包含where关键字,如：
    　　
　　```
　　db.user.find("age&gt;3");
　　```
            　　
    &gt; 但有一点需要注意，如非必要，尽量不要使用，因为一旦使用，document都 必须从BSON转换为一个JavaScript对象，所以$where查询比一般的查询会慢很多。

    13. 联合查询
        1. 由于mongo本身的特点不推荐使用联合查询
        2. 手动联合查询
        ```
        //1. 查询用户信息并赋值给变量u
        var u = db.user.find({name:"tom"});

        //2. 查询作者为tom的文章

        db.posting.find({author:u});
        ```
        3. DBRef方式 
            1. DBRef的概念类似于关系数据库中的外键；例如,把collectionB 的 _id作为collectionA的中的一列，然后通过collectionA中这一列的值查找相应的collectionB的数据
            2. 使用示例
            ```
            // 注意 db.user.find()查询出来的是一个数组（游标），要使用下标取出第一个元素
            &gt; u1 = db.user.find({name:"tom"})[0]
                {
                        "_id" : ObjectId("5b55e764172c4f195a933f37"),
                        "name" : "tom",
                        "age" : null
                }
            // 在posting方法中插入一条带有dbRef的数据    
            &gt; db.posting.insert({title:"dbrefTest",users:new DBRef("user",u1._id)})
            WriteResult({ "nInserted" : 1 })
            // 通过文章查询作者信息
            &gt; db.posting.find({"title":"dbrefTest"})[0].users.fetch()
            {
                    "_id" : ObjectId("5b55e764172c4f195a933f37"),
                    "name" : "tom",
                    "age" : null
            }

            ```
    14. 游标和存储过程
        1. 游标使用示例
        ```
        ＞ for( var c= db. t3. find(); c. hasNext();){ 
            printjson( c. next());

        }

        ``` 
        2. 存储过程
            1. mongo的存储过程是使用JavaScript来写的
            2. mongo的存储过程保存在db.system.js集合中
            3. 在mongo中新建一个存储过程
            ```
            ＞ db. system. js. save({_ id:" addNumbers", 
                value: function( x, y){ return x+ y;}});
            ```
            4. 查看存储过程
            ```
            db.system.js.find();

            ```
            5. 调用存储过程
            ```
            &gt; db.eval('addNumber(1,2)')
            WARNING: db.eval is deprecated
            3
            ```

3. 高级更新
    1. mongo两个更新命令： update，save
    ```
    // update使用方法 
    db.collection.update({criteria},{objNew},upsert,multi);

    ```
    使用示例：

    ```
    // 更新count&gt;1的数据，
    ＞ db. t1. update({" count":{$ gt: 1}},{$ set:{" test2":" OK2"}}, false, true)
    ```
    save命令

    ```
    db.collection.save(obj);
    ```
    2. 数据更新操作符
        1. $inc 
        ```
        {$inc:{ field: value}}
        ```
        使用示例：
        ```
        //将age&gt;3的数据age字段增加5
        db. t1. update({"age":{$gt:3}},{$inc:{"age":5}}, false, true)
        ```
        2. $set
        ```
        {$set:{feild:"newValue"}}
        ```
        3. $unset删除字段
        ```
        {$unset:{feild:1}}
        ```
        4. $push 向数组类型的字段中追加值
        ```
        {$push:{filed:"newValue"}}
        ```
        5. $pushAll 向数组类型的字段中追加多个值

        ```
        // 追加的值为一个数组
        {$pushAll:{field:newValuAarry}}
        ```
        6. $addToSet 向数组型字段追加新值，当且仅当这个值不存在时才会追加
        ```
        {$addToSet:{field:newValue}}
        ```
        使用示例：
        ```
        //更新非数组字段报错
        &gt; db.user.update({name:"tom"},{$addToSet:{name:"tomcat"}})
        WriteResult({
                "nMatched" : 0,
                "nUpserted" : 0,
                "nModified" : 0,
                "writeError" : {
                        "code" : 2,
                        "errmsg" : "Cannot apply $addToSet to non-array field. Field named 'name' has non-array type string"
                }
        })
        //使用$set向原有数据中增加一个数组类型的字段
        &gt; db.user.update({name:"tom"},{$set:{"postings":["mongo"]}})
        WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
        &gt; db.user.find({name:"tom"})
        { "_id" : ObjectId("5b55e764172c4f195a933f37"), "name" : "tom", "age" : null, "postings" : [ "mongo" ] }
        // 增加的值是一个数组，与原有数据中“mongo”值不同
        &gt; db.user.update({name:"tom"},{$addToSet:{"postings":["mongo"]}})
        WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
        // 验证发现此时数组中存在“mongo”和“【“mongo”】”两个值
        &gt; db.user.find({name:"tom"})
        { "_id" : ObjectId("5b55e764172c4f195a933f37"), "name" : "tom", "age" : null, "postings" : [ "mongo", [ "mongo" ] ] }
        //向数组中追加一个已经存在的值，追加失败
        &gt; db.user.update({name:"tom"},{$addToSet:{"postings":"mongo"}})
        WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 0 })
        // 向数组中追加一个不存在的值，追加成功
        &gt; db.user.update({name:"tom"},{$addToSet:{"postings":"java"}})
        WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
        &gt; db.user.find({name:"tom"})
        { "_id" : ObjectId("5b55e764172c4f195a933f37"), "name" : "tom", "age" : null, "postings" : [ "mongo", [ "mongo" ], "java" ] }
        ```
        7. $pop 删除数组型字段中的一个值,只能删除一个值
        ```
        // 删除第一个值
        {$pop:{field:-1}}
        // 删除最后一个值
        {$pop:{field:1}}

        ```
        8. $pull 删除数组内指定value的值
        ```
        {$pull:{field:value}}
        ```
        9. $pullAll 删除数组内的多个值

        ```
        {$pull:{}filed:array_value}
        ```
        10. $rename 重命名字段名称
        ```
        {$rename:{old_field_name:new_field_name}}
        ```
        使用示例：
        ```
        // 注意一定要将multi参数值设置为true，否则只会修改第一条数据
         db.posting.update({},{$rename:{users:"user"}},false,true)
        ```
</code></pre>

6. 高级特性
    1. capped Collection

<pre><code>    Capped Collection 是 性能 出色 的 有着 固定 大小 的 集合， 以 LRU（ Least Recently Used， 最近 最少 使用） 规则 和 插入 顺序 执行 age- out（ 老化 移出） 处理， 自动 维护 集合 中 对象 的 插入 顺序。
    1. 创建capped collectioin
        ```
        ＞ db. createCollection(" mycoll",{ capped: true, size: 100000})
        ```
        在 创建 时 要 预先 指定 大小， 如果 空间 用完， 新 添加 的 对象 将会 取代 集合 中最 旧的 对象。 更新 如果 超出 collection 的 大小， 更新 失败。 虽然 不允许 删除， 但是 可以 调用 drop() 删除 集合 中的 所 有行， drop 后 需要 显 式 地 重建 集合。 在 32 位 机上， 一个 Capped Collection 的 最大值 约为 482. 5MB， 64 位 上 只 受 系统 文件 大小 的 限制。

    2. 判断集合是否是capped collection
    ```
    //如果是capped 返回true
    db.colletion.isCapped();
    ```
    3. 将普通的集合转换为capped
    ```
    db.runCommand({"convertToCapped":"mycoll",size:10000})
    ```
    使用示例：
    ```
    &gt; db.runCommand({"convertToCapped":"posting",size:10000})
    { "ok" : 1 }
    ```
    4. capped的用途
        1. 日志
        Capped Collection 是 MongoDB 中日 志 机制 的 首选， MongoDB 没有 使用 日志 文件， 而是 把 日志 事件 存储 在 数据库 中。 在 一个 没有 索引 的 Capped Collection 中 插入 对象 的 速度 与 在 文件 系统 中 记录 日志 的 速度 相当。
    5. 注意事项
        1. 为了 发挥 Capped Collection 的 最大 性能， 如果 写 比 读 多， 最好 不要 在上面 创建 索引， 否则 插入 速度 从" log speed" 降为" database speed"。
        2. 可以 在 创建 Capped Collection 时 指定 collection 中 能够 存放 的 最大 文档 数。 但这 时 也要 指定 size， 因为 总是 先 检查 size 后 检查 maxRowNumber。 可以 使用 validate() 查看 一个 collection 已经 使用 了 多少 空间，从而 决定 size 设为 多大。 如： 
        ```
        db. createCollection(" mycoll",{ capped: true, size: 100000, max: 100}); 

        db. mycoll. validate();
        ```

2. GridFs规范
    1. 利用mongofiles命令将文件保存到mongo数据库中
    ```
    // 在testData文件夹下创建一个待上传的文件/usr/testData/testfileUpload.txt
    root@05927cf09461:/usr# cd testData/
    root@05927cf09461:/usr/testData# ls
    testfileUpload.txt
    root@05927cf09461:/usr/testData# pwd
    /usr/testData
    // 利用mongofiles命令将文件上传到mongo中
    root@05927cf09461:/usr/testData# mongofiles put /usr/testData/testfileUpload.txt
    2018-07-28T07:38:16.803+0000    connected to: localhost
    2018-07-28T07:38:16.803+0000    added file: /usr/testData/testfileUpload.txt
    // 利用mongofiles list命令查看已上传的文件
    root@05927cf09461:/usr/testData# mongofiles list
    2018-07-28T07:38:30.732+0000    connected to: localhost
    /usr/testData/testfileUpload.txt        0
    // 登陆mongo查看数据库中的集合，增加了fs.chunks和fs.files集合
    &gt; show collections
        fs.chunks
        fs.files
        posting
        user
    //从mongo中下载文件
    mongofiles get ./testfileUpload.txt
    2018-07-28T07:54:43.685+0000    connected to: localhost
    2018-07-28T07:54:43.686+0000    finished writing to ./testfileUpload.txt

    // 查看fs.chunk,fs.files集合信息略

    ```
3. MapReduce编程 略
</code></pre>

三、 管理篇
7. 数据迁移
    1. 数据迁移步骤
        1. 设计迁移方案
        2. 进行数据模拟迁移
        3. 测试数据模拟迁移结果
        4. 准备实施数据迁移: 进行完整的数据备份，确定数据迁移方案，配置和安装软硬件
        5. 正式迁移数据
        6. 测试正式迁移的数据
        7. 移植应用软件
        8. 正式运行应用系统
    2. 迁移工具
        1. mongoexport 导出指定的collection，可以导出指定列，可以按条件查询要导出的数据
        2. mongodump  可以导出整个数据库也可以导出指定的collection，可以导出按条件查询出来的数据
        3. mongoimport 导入工具
        4. mongorestore 数据恢复
        5. eval执行特定语句
        6. 执行js文件<br />
        <code>mongo test.js</code>
8. 管理命令
    1. mongo管理涉及一下几个方面
        1. 故障排除
        2. 减少停机时间
        3. 建立备份和恢复策略
    2. 远程复制集合
    ```
    //将192.168.1.110:27017 test数据库中user集合的数据拷贝过来，不拷贝索引
    db.runCommand({cloneCollection:"test.user",from:"192.168.1.110:27017",copyIndexes: false})

<pre><code>```
3. 本地复制集合
```
db.source_coll.find().forEach(function(data){
    db.target_coll.insert(x);
})
```
3. 复制数据库
```
db.copyDatabase(&quot;fromDB&quot;,&quot;toDB&quot;,&quot;fromHost&quot;,&quot;userName&quot;,&quot;password&quot;)
```
4. 刷新磁盘

```
db.runCommand({fsync:1})
```
该命令可以将未写入磁盘的信息写入磁盘，并锁定写操作，但读操作可以继续执行。并且**该命令必须在admin库执行**
```
// 加上 async参数表示异步刷新磁盘
db. runCommand({ fsync: 1, async: true})

```

```
// lock参数表明在执行刷新磁盘前先锁定数据操作
&gt; db. runCommand({ fsync: 1, lock: 1}) 
    {&quot;info&quot;:&quot; now locked against writes&quot;,&quot; ok&quot;: 1} 
// 查看锁定状态
＞ db. currentOp()
    {&quot;inprog&quot;:[],&quot; fsyncLock&quot;: 1}

```
5. getLastError() 查看异常信息；阻塞客户端保证数据已写入成功

```
// 由于没有错误，返回null
&gt; db.getLastError()
null

// 在写入3个节点后返回，最长等待时间1000ms
&gt; db.getLastError(3,1000)

```
6. 查看当前活动进程
```
&gt; db.currentOp()
    {
            &quot;inprog&quot; : [
                    {
                            &quot;host&quot; : &quot;05927cf09461:27017&quot;,
                            &quot;desc&quot; : &quot;conn23&quot;,
                            &quot;connectionId&quot; : 23,
                            &quot;client&quot; : &quot;127.0.0.1:43532&quot;,
                            &quot;appName&quot; : &quot;MongoDB Shell&quot;,
                            &quot;clientMetadata&quot; : {
                                    &quot;application&quot; : {
                                            &quot;name&quot; : &quot;MongoDB Shell&quot;
                                    },
                                    &quot;driver&quot; : {
                                            &quot;name&quot; : &quot;MongoDB Internal Client&quot;,
                                            &quot;version&quot; : &quot;4.0.0&quot;
                                    },
                                    &quot;os&quot; : {
                                            &quot;type&quot; : &quot;Linux&quot;,
                                            &quot;name&quot; : &quot;Ubuntu&quot;,
                                            &quot;architecture&quot; : &quot;x86_64&quot;,
                                            &quot;version&quot; : &quot;16.04&quot;
                                    }
                            },
                            &quot;active&quot; : true,
                            &quot;currentOpTime&quot; : &quot;2018-07-28T14:48:51.210+0000&quot;,
                            &quot;opid&quot; : 823887,
                            &quot;secs_running&quot; : NumberLong(0),
                            &quot;microsecs_running&quot; : NumberLong(23936),
                            &quot;op&quot; : &quot;command&quot;,
                            &quot;ns&quot; : &quot;admin.$cmd.aggregate&quot;,
                            &quot;command&quot; : {
                                    &quot;currentOp&quot; : 1,
                                    &quot;$db&quot; : &quot;admin&quot;
                            },
                            &quot;numYields&quot; : 0,
                            &quot;locks&quot; : {

                            },
                            &quot;waitingForLock&quot; : false,
                            &quot;lockStats&quot; : {

                            }
                    }
            ],
            &quot;ok&quot; : 1
    }

```
7. 杀死进程

```
db.killOp(123/*pid*/)
```
8. 验证数据有效性,数据是否损坏，是否完整等信息
```
&gt; db.user.validate()
    {
            &quot;ns&quot; : &quot;test.user&quot;,
            &quot;nInvalidDocuments&quot; : NumberLong(0),
            &quot;nrecords&quot; : 103,
            &quot;nIndexes&quot; : 1,
            &quot;keysPerIndex&quot; : {
                    &quot;test.user.$_id_&quot; : 103
            },
            &quot;valid&quot; : true,
            &quot;warnings&quot; : [
                    &quot;Some checks omitted for speed. use {full:true} option to do more thorough scan.&quot;
            ],
            &quot;errors&quot; : [ ],
            &quot;ok&quot; : 1
    }
```
9. 数据压缩 repairDatabase
```
// 查看数据与索引的总大小
&gt; db.user.totalSize()
73728
// 数据大小
&gt; db.user.storageSize()
36864
// 不能使用在collection上
&gt; db.user.repairDatabase()
2018-07-28T14:57:46.971+0000 E QUERY    [js] TypeError: db.user.repairDatabase is not a function :
@(shell):1:1
// 整理碎片，压缩数据
&gt; db.repairDatabase()
{ &quot;ok&quot; : 1 }
&gt; db.user.storageSize()
36864
&gt; db.user.totalSize()
53248
```
</code></pre>

9. 访问控制
    1. mongo数据库的安全性主要包括
        1. 限制特定 IP地址访问。
            1. 绑定ip后，在连接mongo时必须显示的指定mongo所在ip才能连接，建议绑定内网ip可以直接排除外网的攻击
            2. 使用示例
            ```
            //mongo启动时绑定ip
            mongod --bind_ip 192.168.1.110

<pre><code>        ```
        在客户端上连接mongo
        ```
        mongo 192.168.1.110
        ```
    2. 设置监听端口。
        1. 不使用默认端口
        2. 使用示例
        ```
        mongod --bind_ip 192.168.1.110 --port 28018

        ```
    3. 使用用户名和口令登录。
        1. mongo 3.x后使用createUser而不是addUser
        ```
        db.createUser({user:'root',pwd:'pwd',roles:['readWrite','dbAdmin']})
        ```
        2. 必须在mongo启动时指定--auth参数，并且至少已经创建一个数据库用户后，才会启用验证；如果没有数据库用户，即使指定--auth参数也不会生效
        3. 删除用户
        ```
        db.system.users.remove({user:"XXXXXX"})
        ```
        4. 查看创建的用户
        ```
        &gt; db.system.users.find()
        { "_id" : "admin.root", "user" : "root", "db" : "admin", "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "UwfWWqy8Do2wjiY/hSzT+g==", "storedKey" : "UvrWJ2hbxsgwSR3vUiK/je5wnks=", "serverKey" : "Te5/9eQAw9TYQlSNBEEC8PB7fh0=" }, "SCRAM-SHA-256" : { "iterationCount" : 15000, "salt" : "+uf4DVvouUvB/mhKlWAyheU5brY1Wak2Zalr9Q==", "storedKey" : "wgHg2tHe2R4pTV6wml2h65ZjecIDZA4NyPVurX7puFM=", "serverKey" : "F+r+rls/npaWauo+e9zmUqWXG1fy3B1UJJutFIgu4OA=" } }, "roles" : [ { "role" : "readWrite", "db" : "admin" }, { "role" : "dbAdmin", "db" : "admin" } ] }
        ```
</code></pre>

四、性能篇
10. 索引及优化
    1. 遵循以下索引优化原则，可以建立比较高效和合理的索引： 
        1. 在 索引中包括条件的所有列，可以使用索引形成的屏蔽来拒绝结果集中 不合格的行。 
        2. 对于需要排序的引用列，适当地创建索引可以避免排序。 
        3. 考虑到管理上的开销，应避免在索引中使用多于5个的列。 
        4. 对于多列索引，将查询中引用最多列放在定义的前面
        5. 不要 在 索引 中 包含 经常 修改 或 进行 插入、 删除 的 列（ 主 关键字 和 外来 关键字 除外）。
    2. 创建一个索引
    ```
    ＞ db. t3. ensureIndex({ age: 1}) 
    ＞ db. t3. getIndexes()
    [ { "name":"_ id_", "ns":" test. t3", "key":{ "<em>id": 1 }, "v": 0 }, { "_id": ObjectId(" 4fb906da0be632163d0839fe"), "ns":" test. t3", "key":{ "age": 1 }, "name":" age</em> 1", "v": 0 } ]

<pre><code>```
3. 静默方式创建索引
```
db.t1.ensureIndex({age:1},{backgroud:true})
```
4. 复合索引
```
 db.t1.ensureIndex({age:1,name:1},{backgroud:true})
```
5. 唯一索引

```
＞ db. t3. ensureIndex({ age: 1},{unique:true}) 

```
6. 使用hint强制使用索引
7. 删除索引
```
// 删除user表所有的索引
db.user.dropIndexs();

//删除firstName上的索引
db.user.dropIndex({firstName：1})
```
8. 重建索引
```
//重建user上的所有索引，并且整理磁盘空间碎片
db.user.reIndex（）
```
9. explain查看执行计划
</code></pre>

11. 优化器 profile
    1. 查询当前profile级别
    ```
    // 0 表示不启用profile ；1 表示记录慢命令 2表示记录所有的命令

<blockquote>
  db.getProfilingLevel()
      0
</blockquote>

<pre><code>```
2. 设置profile级别
```
&gt; db.setProfilingLevel(2)
{ &quot;was&quot; : 0, &quot;slowms&quot; : 100, &quot;sampleRate&quot; : 1, &quot;ok&quot; : 1 }

```
3. profile记录在system.profile表中
```
// 查询profile记录
db.system.profile.find();
```
</code></pre>

12.

11.