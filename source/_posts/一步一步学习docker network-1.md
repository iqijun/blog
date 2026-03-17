---
title: 一步一步学习docker network
date: 2017-12-10 17:26:30.0
updated: 2017-12-10 17:28:18.0
url: /archives/419
categories: 
tags: docker | network | connect | link
---

<ol>
<li>查看docker网络</li>
</ol>

<pre><code>root@ubuntu:~# docker network ls 
NETWORK ID          NAME                DRIVER
d2c5ed82c746        app                 bridge              
e60d090c1bab        bridge              bridge              
343f1034b7de        host                host                
bc08ea1517e7        none                null   
</code></pre>

<ol>
<li>创建network</li>
</ol>

<pre><code>root@ubuntu:~# docker network create networkTest
6b4f53154c790fa3f46203dfbae6cd9fbd7e858900ba11fafb3649a98ae9402d
</code></pre>

<ol>
<li>查看指定网络详细信息</li>
</ol>

<pre><code>root@ubuntu:~# docker network inspect networkTest
[
    {
        "Name": "networkTest",
        "Id": "6b4f53154c790fa3f46203dfbae6cd9fbd7e858900ba11fafb3649a98ae9402d",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.19.0.0/16",
                    "Gateway": "172.19.0.1/16"
                }
            ]
        },
        "Internal": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]
</code></pre>

<ol>
<li>创建容器时指定网络</li>
</ol>

<pre><code>root@ubuntu:~# docker run -d --net=app --name db jamtur01/redis
0d280c1773dd656d7673451e01b32f75e639cd0d225e4e548ba8c947cad47564
</code></pre>

<ol>
<li>查看容器运行后网络的变化</li>
</ol>

<pre><code>root@ubuntu:~# docker network inspect app
[
    {
        "Name": "app",
        "Id": "d2c5ed82c7467567c0d503a5cda0b43dbead408f01cc59d4ed2beb50a542af63",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1/16"
                }
            ]
        },
        "Internal": false,
        "Containers": {
            "0d280c1773dd656d7673451e01b32f75e639cd0d225e4e548ba8c947cad47564": {
                "Name": "db",
                "EndpointID": "ff223e97d11bd4482f5bb2bd83a4a68da68a92ca01a4ad9073a77c8baeab7273",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
</code></pre>

可以看到Containers中已经有了名字db的容器并且已分配MacAddress，IPv4Address

<ol>
<li>将已存在的容器添加到指定网络</li>
</ol>

<pre><code>docker network connect netName containerName

</code></pre>

<ol>
<li>从网络中断开一个容器</li>
</ol>

<pre><code>docker network disconnect netName containerName

</code></pre>

<ol>
<li>验证网络是否联通</li>
</ol>

<pre><code>1. 发送请求向ridis中存入数据
root@ubuntu:~# curl -i -H 'Accept:application/json' -d 'name=Foo&amp;status=Bar' http://localhost:32768/json
HTTP/1.1 200 OK 
Content-Type: text/html;charset=utf-8
Content-Length: 29
X-Xss-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Server: WEBrick/1.3.1 (Ruby/2.3.1/2016-04-26)
Date: Fri, 08 Dec 2017 14:05:40 GMT
Connection: Keep-Alive

{"name":"Foo","status":"Bar"}
2.请求redis中的数据
curl -i http://localhost:32768/json
HTTP/1.1 200 OK 
Content-Type: text/html;charset=utf-8
Content-Length: 41
X-Xss-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Server: WEBrick/1.3.1 (Ruby/2.3.1/2016-04-26)
Date: Fri, 08 Dec 2017 14:07:40 GMT
Connection: Keep-Alive

"[{\"name\":\"Foo\",\"status\":\"Bar\"}]

</code></pre>

<ol>
<li>如果容器已经和其他容器网络连接则不能使用connect命令添加到网络</li>
</ol>

<pre><code>root@ubuntu:~# docker network connect app zk1
Error response from daemon: Container sharing network namespace with another container or host cannot be connected to any other network
# 并且不能从host网络移除
root@ubuntu:~# docker network disconnect host zk1
Error response from daemon: Container cannot be disconnected from host network or connected to host network
</code></pre>

<ol>
<li>通过docker链接连接容器（--link）</li>
</ol>

<pre><code># --link需要两个参数一个是要连接容器的名字，一个链接的别名即--link=container1:netName
docker run --name=webapp --link=redis:db -it /bin/bash
</code></pre>

<blockquote>
  docker link链接只能用在同一个宿主机中，如果是多宿主机要使用docker networking 或者 docker Swarm
</blockquote>

<ol>
<li></li>
</ol>