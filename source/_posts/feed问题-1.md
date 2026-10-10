---
title: feed问题
date: 2016-07-11 22:17:35.0
updated: 2016-07-11 22:17:35.0
url: /archives/48
categories: 未分类
tags: 
description: "博客记录使用 Hexo 生成 Atom 源并搭配 IFTTT 同步微博时触发器未执行的问题，排查后发现文件确有更新，故障可能源于添加 IFTTT 配方前已部署站点，导致新文章未被及时识别为动态。"
---

&lt;ol&gt;
&lt;li&gt;&lt;p&gt;在发表新文章的时候想利用ifttt分享到微博，增加hexo-genrater-feed插件后，可以生成atom文件，但是并没有触发ifttt的triger&lt;/p&gt;
&lt;p&gt;或许这是个误会。。。。happy and cry in face。。。。添加feed后atom确实有更新，或许是因为添加ifttt recipes之前就执行了hexo的deploy命令&lt;/p&gt;
&lt;/li&gt;
&lt;/ol&gt;