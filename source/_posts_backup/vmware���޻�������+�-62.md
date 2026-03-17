---
title: vmware未识别网络
date: 2016-08-17 12:29:16.0
updated: 2016-08-17 12:29:16.0
url: /archives/62
categories: 
tags: 
---

问题描述：虚拟机中不能上网，在本机网络连接中vmnet1及vmnet8均显示“网络未连接”
解决：在本机中启动服务VMware NAT service和VMware DHCP service服务启动。