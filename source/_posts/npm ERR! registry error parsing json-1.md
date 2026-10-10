---
title: npm ERR! registry error parsing json
date: 2017-01-08 14:49:56.0
updated: 2017-01-08 14:49:56.0
url: /archives/176
categories: 未分类
tags:
  - "error"
  - "npm"
  - "update"
  - "npm源"
  - "npm ERR!"
  - "registry error parsing json"
description: "在执行 npm update 时出现 npm ERR! registry error parsing json 报错，表示 npm 源返回了无法正常解析的 JSON 数据，可通过 npm config set registry 切换至 cnpmjs 等可用源解决。"
---

在执行npm update时报错npm ERR! registry error parsing json

[caption id="" align="alignnone" width="613"]<a href="http://ogjeqevbh.bkt.clouddn.com/full-stacker/blog/npm.png"><img class="size-sup_wechat_big" src="http://ogjeqevbh.bkt.clouddn.com/full-stacker/blog/npm.png" alt="npm ERR! registry error parsing json" width="613" height="547" /></a> npm ERR! registry error parsing json[/caption]

只需重新设置npm 源，如：npm config set registry http://registry.cnpmjs.org

&nbsp;