---
title: Obsidian插件使用记录
date: 2023-07-01 12:09:50.583
updated: 2023-07-01 12:09:50.583
url: /archives/687
categories: 杂谈
tags: 笔记工具 | 工具
---

# Dataview

## 查看“周报”目录下的所有的文件

``` dataview
list 
from "周报"
sort file.ctime desc

```

## 查看“周报”目录下所有未完成的任务
> 暂未实现按时间排序
``` dataview
task 
from "周报"
where !completed
```


