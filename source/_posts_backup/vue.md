---
title: vue
date: 2016-10-16 23:57:01.0
updated: 2016-10-27 00:02:58.0
url: /archives/78
categories: 
tags: vue | 教程 | 组件 | webpack
---

<ol>
    <li>vue-loader安装
<ol>
    <li>npm install vue-loader --save-dev</li>
    <li>webpack-config.js配置
<ol>
    <li>
<pre>{test:/\.vue$/,loader:"babel!vue", exclude: "/node_modules/"},</pre>
其中"babel!vue"中叹号"!"代表连接符，表示两个loader连续执行，执行顺序从有向左，即先执行vue loader再执行babel</li>
</ol>
</li>
</ol>
</li>
    <li>"热运行"，webpack-dev-server
<ol>
    <li>安装 npm install webpack-dev-server --save-dev</li>
    <li>webpack-config.js配置
<ol>
    <li>
<pre>entry:
{
    "index":[__dirname+'/src/jssrc/index.js',,'webpack-dev-server/client?http://127.0.0.1:8080']
},
output: {
    publicPath: "http://127.0.0.1:8080/",
    path: __dirname+'/src/webapp/js',  //输出文件夹
    filename:'[name].js'   //最终打包生成的文件名(just 文件名，不带路径的哦)
},</pre>
</li>
    <li>
<pre>plugins:[
    new HtmlWebpackPlugin({
        // filename: __dirname+'/src/webapp/index.html',//目标文件
        filename:"index.html",//使用webpack-dev-server时配置
        template: __dirname+'/src/html/index.html',//模板文件
        inject:'body',
        hash:true,
        chunks:["index"]
    })

]</pre>
</li>
</ol>
</li>
    <li>访问 localhost:8080</li>
</ol>
</li>
    <li>vue 组件定义
<ol>
    <li>组件定义文件：myage.vue</li>
    <li>组件定义代码
<ol>
    <li>
<pre>&lt;style&gt;

    #myage{color:red}
&lt;/style&gt;
&lt;template&gt;
    &lt;div id="myage"&gt; my age is {{age}}&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export  default{
      data:()=&gt;{
          return {age:18}
      }
  }
&lt;/script&gt;</pre>
</li>
    <li>
<pre>&lt;style&gt;

&lt;/style&gt;
&lt;template&gt;
    &lt;div id="1name"&gt;
        my name is {{name}}
    &lt;/div&gt;
    &lt;/template&gt;
    &lt;script&gt;
        export default{
            props: ['name']

        }
    &lt;/script&gt;</pre>
</li>
</ol>
</li>
    <li>
<pre>父子组件</pre>
<ol>
    <li>
<pre>&lt;template&gt;
    &lt;div id="person"&gt;
        &lt;myage v-bind:age="age"&gt;&lt;/myage&gt;
        &lt;myname v-bind:name="name"&gt;&lt;/myname&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;style&gt;

&lt;/style&gt;
&lt;script&gt;
    import myage from './myage.vue';
    import myname from './myname.vue';
    export default{
        props:["name","age"],
        components:{
            'myage':myage,'myname':myname

        }
    }
&lt;/script&gt;</pre>
</li>
    <li>
<pre>注意：v-bind后面对应的变量是子变量的属性</pre>
</li>
</ol>
</li>
</ol>
</li>
    <li>安装bootstrap font loader
<ol>
    <li>npm install file-loader --save-dev</li>
    <li>webpack.config.js增加配置
<ol>
    <li>
<pre>{test:/\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,loader:"file" }</pre>
</li>
</ol>
</li>
</ol>
</li>
    <li></li>
    <li><a href="https://vuefe.cn/guide/index.html">vue2.0中文手册</a></li>
</ol>