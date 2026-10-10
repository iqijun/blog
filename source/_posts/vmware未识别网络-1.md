---
title: vmware未识别网络
date: 2016-08-17 12:29:16.0
updated: 2016-08-17 12:29:16.0
url: /archives/62
categories: 
tags: 
description: "虚拟机无法上网，且本机网络连接中虚拟网卡显示网络未连接时，可进入本机服务管理页面，启动虚拟网络地址转换服务和动态主机配置服务，恢复虚拟网络识别与上网功能。"
---

问题描述：虚拟机中不能上网，在本机网络连接中vmnet1及vmnet8均显示“网络未连接”
解决：在本机中启动服务VMware NAT service和VMware DHCP service服务启动。