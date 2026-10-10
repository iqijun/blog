---
title: maven依赖优先级问题
date: 2018-02-13 16:54:39.0
updated: 2018-02-13 16:54:39.0
url: /archives/442
categories: 
tags:
  - "maven"
  - "依赖"
  - "优先级"
  - "dependencyManagement"
description: "记录Maven依赖版本优先级异常：非Web项目里父POM的dependencyManagement版本最高，Web项目里子POM版本反而优先级更高，原因待查，先留笔记供后续排查。"
---

很奇怪的一个问题 没有搞清楚具体原因 暂时先记下

maven 非web项目 父级pom中 dependencyManagement 的版本号最高

web项目中子pom中版本号优先级高