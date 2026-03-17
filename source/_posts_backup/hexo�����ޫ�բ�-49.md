---
title: hexo问题记录
date: 2016-07-10 15:57:16.0
updated: 2016-07-10 15:57:16.0
url: /archives/49
categories: 未分类
tags: 
---

&lt;ol&gt;
&lt;li&gt;&lt;p&gt;hexo添加feed插件后报错&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;&lt;figure class=&quot;highlight&quot;&gt;&lt;table&gt;&lt;tr&gt;&lt;td class=&quot;gutter&quot;&gt;&lt;pre&gt;&lt;div class=&quot;line&quot;&gt;1&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;2&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;3&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;4&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;5&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;6&lt;/div&gt;&lt;/pre&gt;&lt;/td&gt;&lt;td class=&quot;code&quot;&gt;&lt;pre&gt;&lt;div class=&quot;line&quot;&gt;FATAL Something&#39;s wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;Template render error: (unknown path) [Line 8, Column 23]&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;Error: Unable to call <code>the return value of (posts[&amp;quot;first&amp;quot;])[&amp;quot;updated&amp;quot;][&amp;quot;toISOStrin&amp;quot;]</code>, which is undefined or falsey&lt;/div&gt;&lt;div class=&quot;line&quot;&gt; at Object.exports.withPrettyErrors (E:\hexo\node_modules\hexo-generator-feed\node_modules\nunjucks\src\lib.js:35:17)&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;    at Obj.extend.render (E:\hexo\node_modules\hexo-generator-feed\node_modules\nunjucks\src\environment.js:374:20)&lt;/div&gt;&lt;div class=&quot;line&quot;&gt; at Hexo.module.exports (E:\hexo\node_modules\hexo-generator-feed\lib\generator.js:33:22)&lt;/div&gt;&lt;/pre&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/figure&gt;
&lt;/code&gt;&lt;/pre&gt;&lt;/li&gt;
&lt;li&gt;&lt;p&gt;添加feed插件后hexo server无法使用&lt;/p&gt;
&lt;p&gt; 原因是在站点的配置文件中添加了 &lt;/p&gt;
 &lt;figure class=&quot;highlight plain&quot;&gt;&lt;table&gt;&lt;tr&gt;&lt;td class=&quot;gutter&quot;&gt;&lt;pre&gt;&lt;div class=&quot;line&quot;&gt;1&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;2&lt;/div&gt;&lt;/pre&gt;&lt;/td&gt;&lt;td class=&quot;code&quot;&gt;&lt;pre&gt;&lt;div class=&quot;line&quot;&gt;plugins:&lt;/div&gt;&lt;div class=&quot;line&quot;&gt;- hexo-generator-feed&lt;/div&gt;&lt;/pre&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/figure&gt;
&lt;p&gt; 去掉改配置，将依赖添加到站点的package.json中即可解决&lt;/p&gt;
&lt;/li&gt;
&lt;li&gt;&lt;p&gt;升级win10后，hexo d 无法部署问题&lt;br&gt; 重新生成公钥，gitbash将公钥默认生成到C:\Windows\System32\config\systemprofile.ssh目录下 需要保证用户对该目录有读写权限&lt;/p&gt;
&lt;/li&gt;
&lt;/ol&gt;