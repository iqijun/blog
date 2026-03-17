---
title: 快速搭建vue环境
date: 2017-01-06 22:54:20.0
updated: 2017-01-06 23:39:54.0
url: /archives/172
categories: 
tags: vue | webpack | 环境搭建 | babel
---

<blockquote>
  刚刚开始学习vue，由于经常在两台电脑切换，第一台电脑上是跟着学习视频搭建的，第二台电脑上自己独立搭建遇到些“小问题”，记录此文以备不时之需，也希望能够帮到初学者们
</blockquote>

<ol>
<li>安装node (略)</li>
<li>安装vue 

<ol>
<li>npm install vue --save-dev</li>
</ol></li>
<li>安装webpack

<ol>
<li>npm install webpack --save-dev</li>
<li>webpack配置（见下方webpack-dev-serve）</li>
</ol></li>
<li>安装webpack-dev-server

<ol>
<li>npm install web-dev-server --save-dev</li>
<li>配置文件webpack.config.js</li>
</ol>

<pre><code class="javascript">var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack=require("webpack");
module.exports =
{
    entry:
    {
        "index":[__dirname+'/src/jssrc/index.js',,'webpack-dev-server/client?http://127.0.0.1:8080']
    },
    output: {
        publicPath: "http://127.0.0.1:8080/",
        path: __dirname+'/src/webapp/js',  //输出文件夹
        filename:'[name].js'   //最终打包生成的文件名(just 文件名，不带路径的哦)
    },
    /*devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        port:9090 //端口你可以自定义
    },*/
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    externals: {

    },
    module:{
        loaders:[
            {test:/\.js$/,loader:"babel",query:{compact:true}},
            {test:/\.vue$/,loader:"babel!vue", exclude: "/node_modules/"}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            // filename: __dirname+'/src/webapp/index.html',//目标文件
            filename:"index.html",//使用webpack-dev-server时配置
            template: __dirname+'/src/html/index.html',//模板文件
            inject:'body',
            hash:true,
            chunks:["index"]
        })

    ]

}

</code></pre></li>
<li>安装html-webpack-plugin

<ol>
<li>npm install html-webpack-plugin --save-dev</li>
</ol></li>
<li>安装babel

<ol>
<li>npm install babel-cli babel-loader babel-preset-es2015 --save-dev</li>
<li>babel 配置 .babelrc
<code>javascript
{
"presets": ["es2015"] //解析规则为es2015
}</code></li>
</ol></li>
<li>可能会用到的两个步骤

<ol>
<li>npm install vue-loader --save-dev</li>
<li>npm install vue-template-compiler --save-dev</li>
</ol></li>
<li>package.json中配置script

<pre><code>  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1",
    "webpackRun": "webpack",
    "webpackServer": "webpack-dev-server --inline --hot --content-base ./src/webapp" --config ./webpack.config.js
  }

</code></pre></li>
</ol>