---
title: jsonp请求响应成功，但进入到error函数
date: 2016-11-02 11:14:46.0
updated: 2016-11-12 22:39:13.0
url: /archives/94
categories: 
tags: jsonp | 200 | error | success
---

发送jsop请求，请求发送成功，http状态码为200，但依然进入error函数，纠结万分。
先贴代码：

js代码如下：

<pre><code class="javascript">$.ajax({
url:url,
dataType:"jsonp",
// async:false, jsonp不支持async:false
method:"get",
success:function(data){
$("#headDiv").append(headView.htmlBuild(data));
},
error:function(data){
console.info(data);
}
});
</code></pre>

服务端代码如下：java实现

<pre><code class="java">public String isLogin(HttpServletRequest request,HttpServletResponse response){
try {
String callback = request.getParameter("callback");

//此处不应使用map
Map json = new HashMap();
json.put("isLogin", isLogin);
if(isLogin){
Long memberId = LoginStateUtil.getMemberId(request);
MemberVo memberVo = memberService.findById(memberId);
json.put("memberName", memberVo.getUsername());
}
callback += "("+json+")";
return callback;
} catch (Exception e) {
logger.error("系统异常：", e);
return "";
}
}

</code></pre>

进入error函数，控制打印返回值：

<pre><code>Object {readyState: 4, responseText: "jQuery111307915938625407029_1478056043394({isLogin=false})", status: 200, statusText: "OK"}
</code></pre>

调整服务端代码

<pre><code class="java">public String isLogin(HttpServletRequest request,HttpServletResponse response){
try {
String callback = request.getParameter("callback");

//此处有更改
JSONObject json = new JSONObject();
json.put("isLogin", isLogin);
if(isLogin){
Long memberId = LoginStateUtil.getMemberId(request);
MemberVo memberVo = memberService.findById(memberId);
json.put("memberName", memberVo.getUsername());
}
callback += "("+json+")";
return callback;
} catch (Exception e) {
logger.error("系统异常：", e);
return "";
}
}

</code></pre>

此时请求可以正常响应，在success函数中打印请求返回的data：

<pre><code>Object {isLogin: false}
</code></pre>

简单总结：

由于后台响应数据格式错误导致进入到error函数
另附相关博文一篇《<a href="http://www.cnblogs.com/vimsk/archive/2013/01/29/2877888.html">一次关于JSONP的小实验与总结</a>》