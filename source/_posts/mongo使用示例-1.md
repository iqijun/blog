---
title: mongo使用示例
date: 2018-06-30 14:36:55.0
updated: 2018-06-30 14:36:55.0
url: /archives/448
categories: 
tags: mongo | 分组查询 | 按日期分组
---

<blockquote>平时使用mongo不多，有些语句经常需要边查边写，纪录一些使用示例方便今后快速查找</blockquote>

<ol>
<li>find使用</li>
</ol>

<pre><code>db.getCollection('memberLoginLogPo').find(
{memberLoginname:"zhoukun","memberId":{$ne:60},"loginResult":1},
{"memberId":1,"memberLoginname":1,"loginType":1}
)
.skip(1).limit(2)
</code></pre>

find函数第一个参数为查询条件，第二个参数为要显示的字段。

<pre><code>db.getCollection('memberLoginLogPo').find({loginDate:{$gte:ISODate('2017-01-09 00:00:00'),$lte: ISODate('2018-01-011 00:00:00')},loginResult:1,memberLoginname:'13121593711'}).count();

</code></pre>

<pre><code>db.getCollection('memberWeekCountPo').aggregate(
{$match:{subjectId:142}},
{$project:{weekOfyear:1}},
{$group:{_id:"subjectId",doQuestionNum :{$sum:"doQuestionNum"},errorNume:{$sum:"errorNum"}}});
</code></pre>

<pre><code>db.memberLoginLogPo.aggregate([

// 1.filter params todo:loginDate add index
{
$match: {
"loginDate": {
$gte: ISODate('2017-01-09 00:00:00'),
$lte: ISODate('2018-01-011 00:00:00')
},
"loginResult": 1,
}
},
// 2.filter field
{
$project: {
"memberId": 1,
"memberLoginname": 1,
"loginType": 1,
"loginIp": 1,
"loginDate": 1,
"loginResult": 1
}
},
// group by memberId and get member first login result
{
$group: {
_id: "$memberId",
memberLoginname: { $first: "$memberLoginname" },
loginType: { $first: "$loginType" },
loginDate: { $first: "$loginDate" },
loginIp: { $first: "$loginIp" },
loginResult: { $first: "$loginResult" },
}
}
])

//.match(qb.where("status").eq("A"))
//.project("gender _id")
//.unwind("$arrayField")
//.group({ _id: "", count: { $sum: 1 } })
//.sort("-count")
//.limit(5)
</code></pre>

添加索引 background为true后台添加不影响查询

<pre><code>db.getCollection("memberLoginLogPo").createIndex({ "loginDate": 1 }, { "background": true })
</code></pre>

多字段分组及按日期统计

<pre><code>db.memberExtPo.aggregate([
{$match:{"registerDate": {
$gte: ISODate('2018-04-01 00:00:00'),
$lte: ISODate('2018-06-30 23:59:59')
}
}
},

{
$project: {
"platformCode": 1,
"registerDate": 1,
"registerDate": 1,
"new_time_stamp" :{$substr :["$registerDate",0,7]}
}
},
{
$group: {
_id: {"platformCode":"$platformCode","registerDate":"$new_time_stamp"},
platformcode: { $first: "$platformCode" },
memberNum: { $sum:1}
}
}
])

</code></pre>

日期格式为“yyyy-MM-dd hh:mm:ss” $substr :["$registerDate",0,7]  按月统计，subStr函数截取出前七位到月字段