---
title: ngnix internal
date: 2018-08-11 16:32:10.0
updated: 2018-08-11 16:32:10.0
url: /archives/468
categories: 杂谈
tags: 
---

表示只能nginx内部转发的请求能使用，包含

•<span class="Apple-converted-space">  </span>指令error_page重定向的请求。

• ngx_http_ssi_module模块中使用include virtual指令创建的某些子请求。

• ngx_http_rewrite_module模块中使用rewrite指令修改的请求。

一个防止错误页面被用户直接访问的例子：

error_page 404 /404.html;

location<span class="Apple-converted-space">  </span>/404.html {

internal;

}