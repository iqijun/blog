---
title: k8s安装及部署步骤
date: 2020-02-15 16:40:54.0
updated: 2020-02-15 16:41:50.0
url: /archives/604
categories: 
tags: k8s入门 | rinetd | pod | k8s
---

国内安装k8s的四种途径：
    1. 使用kubeadmin通过离线镜像安装
    2. 使用阿里公有云平台k8s,钞能力
    3. 通过yum官方仓库安装,上古版本
    4. 二进制包的形式进行安装,kubeasz (github)

安装步骤：
一、 环境配置：
    1. 设置主机名与时区
    timedatectl set-timezone Asia/Shanghai  #都要执行
    hostnamectl set-hostname master   #132执行
    hostnamectl set-hostname node1    #133执行
    hostnamectl set-hostname node2    #137执行
    2. 添加hosts网络主机配置,三台虚拟机都要设置，方便寻找主机
    <code>vim /etc/hosts
    192.168.26.70 master
    192.168.26.73 node1
    192.168.26.77 node2</code>
    3. 关闭防火墙，三台虚拟机都要设置，这一步操作是为了防止在学习阶段由于防火墙造成的各种网络问题，生产环境跳过这一步，
    <code>sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
    setenforce 0
    systemctl disable firewalld
    systemctl stop firewall</code>
二、 安装kubeadmin
    1. 将镜像包上传至服务器每个节点
    <code>mkdir /usr/local/k8s-install
    cd /usr/local/k8s-install</code>
    XFTP上传安装文件
    2. 按每个Centos上安装Docker（安装包模式安装docker，可以换为其他方式安装docker）
    <code>tar -zxvf docker-ce-18.09.tar.gz
    cd docker 
    yum localinstall -y *.rpm
    systemctl start docker
    systemctl enable docker</code>
    3. 确保从cgroups均在同一个从groupfs
    #cgroups是control groups的简称，它为Linux内核提供了一种任务聚集和划分的机制，通过一组参数集合将一些任务组织成一个或多个子系统。<br />
    #cgroups是实现IaaS虚拟化(kvm、lxc等)，PaaS容器沙箱(Docker等)的资源管理控制部分的底层基础。
    #子系统是根据cgroup对任务的划分功能将任务按照一种指定的属性划分成的一个组，主要用来实现资源的控制。
    #在cgroup中，划分成的任务组以层次结构的形式组织，多个子系统形成一个数据结构中类似多根树的结构。cgroup包含了多个孤立的子系统，每一个子系统代表单一的资源
    docker info | grep cgroup 
    如果不是groupfs,执行下列语句
    <code>cat &lt;&lt; EOF &gt; /etc/docker/daemon.json
    {
      "exec-opts": ["native.cgroupdriver=cgroupfs"]
    }
    EOF</code>
    <code>systemctl daemon-reload &amp;&amp; systemctl restart docker</code>
    4. 安装kubeadm
    # kubeadm是集群部署工具
    <code>cd /usr/local/k8s-install/kubernetes-1.14
    tar -zxvf kube114-rpm.tar.gz
    cd kube114-rpm
    yum localinstall -y *.rpm</code>
    5. 关闭交换区 （可以理解为虚拟内存，k8s使用时尽量不使用交换区，防止出现预料之外的问题）
    swapoff -a
    vi /etc/fstab 
    #swap一行注释
    <code>#/dev/mapper/centos-swap swap   swap    defaults        0 0</code>
    6. 配置网桥
    <code>cat &lt;&lt;EOF &gt;  /etc/sysctl.d/k8s.conf
    net.bridge.bridge-nf-call-ip6tables = 1
    net.bridge.bridge-nf-call-iptables = 1
    EOF
    sysctl --system</code>
    7. 通过镜像安装k8s，将k8s的镜像load到docker中，方便后面部署（docker仓库中没有可以免费获取的k8s镜像）
    cd /usr/local/k8s-install/kubernetes-1.14
    docker load -i k8s-114-images.tar.gz
    docker load -i flannel-dashboard.tar.gz
三、 通过kubeadmin部署k8s集群
    1. master主服务器配置
    kubeadm init --kubernetes-version=v1.14.1 --pod-network-cidr=10.244.0.0/16
    在执行完上面的命令后会提示下一步要执行的命令：如下：
    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    kubectl get nodes
    #查看存在问题的pod
    kubectl get pod --all-namespaces
    #设置全局变量
    #安装flannel网络组件  负责在多个pod之间通讯
    kubectl create -f kube-flannel.yml
    2. 加入NODE节点
    在master主机上执行完kubeadm init 命令后会提示如何加入worker节点，如下：
    kubeadm join 192.168.4.130:6443 --token 911xit.xkp2gfxbvf5wuqz7 \
        --discovery-token-ca-cert-hash sha256:23db3094dc9ae1335b25692717c40e24b1041975f6a43da9f43568f8d0dbac72
    如果忘记token
    在master 上执行kubeadm token list 查看 ，在node上运行
    kubeadm join 192.168.163.132:6443 --token aoeout.9k0ybvrfy09q1jf6 --discovery-token-unsafe-skip-ca-verification
    kubectl get nodes
    3.  Master开启仪表盘（在master节点执行即可）
    <code>kubectl apply -f kubernetes-dashboard.yaml
    kubectl apply -f admin-role.yaml
    kubectl apply -f kubernetes-dashboard-admin.rbac.yaml
    kubectl -n kube-system get svc</code>
    http://192.168.163.132:32000 访问
四、 通过界面部署tomcat，如图，填写完表格中的信息点击部署即可完成镜像的部署。
<img src="http://www.full-stacker.com/wp-content/uploads/2020/02/ee7f471d8304ec6208cec93c2c0c83da.png" alt="" />
五、 通过脚本部署tomcat：
    1. 与部署相关的命令：
       <code>kubectl create -f 部署yml文件 #创建部署
        kubectl apply -f 部署yml文件 #更新部署配置 （如果未创建的话，会创建）
        kubectl get pod [-o wide] #查看已部署pod
        kubectl describe pod pod名称 #查看Pod详细信息
        kubectl logs [-f] pod名称 #查看pod输出日志</code>
    2. yml文件的编写
        最简版示例：
        <code>apiVersion: extensions/v1beta1
        kind: Deployment
        metadata: 
          name: tomcat-deploy
        spec:
          replicas: 2 
          template: 
            metadata:
              labels:
                app: tomcat-cluster
            spec:
              containers:
              - name: tomcat-cluster-container
                image: tomcat:latest
                ports:
                - containerPort: 8080</code>
    3. 外部访问tomcat集群
        a. Service服务用于对外暴露应用（service类似于nginx做负载均衡）
        b. 编写service的yml
        <code>apiVersion: v1
        kind: Service
        metadata:
         name: tomcat-service
         labels:
           app: tomcat-service-service
        spec:
         type: NodePort #这里代表是NodePort类型的
         selector:
          app: tomcat-cluster  #这里选择器一定要选择容器的标签
         ports:
         - port: 8000   #集群内部服务之间访问的端口  k8s service所在pod的端口
           targetPort: 8080  # 容器本身暴露的端口
           nodePort: 32500  # 指定暴露到宿主机的端口 通过这个端口可以访问集群中指定的机器</code>
        c. 创建好service后暴漏端口是service容器的端口，而不是宿主机的端口
         在主机外部可以通过192.168.26.70:32500访问tomcat  这种方式是直接访问各个节点，而没有经过service的“负载均衡”
    4. 集群文件共享
        a. 在k8smaster的宿主机上安装nfs
            i. yum install -y nfs-utils rpcbind
            ii. nfs的配置
            vim /etc/exports
            exports内容为：
            /usr/local/data/www-data 192.168.26.70/24(rw,sync)
            参数说明：/usr/local/data/www-data 指定要暴漏的路径
                    192.168.26.70  为该主机的ip地址
                    24为网络掩码
                    （rw,sync）是指明暴漏该路径读写权限，并且是同步的读写
        b. 启动服务：
            i. systemctl start nfs.service    启动nfs服务
            ii. systemctl start rpcbind.service 启动rpcbind服务
            iii. systemctl enable nfs.service 将nfs服务设置为开机启动
            iv. systemctl enable rpcbind.service
        c. 在节点服务器上配置nfs配置
            i. yum install -y nfs-utils
            ii. showmount -e 192.168.26.70  查看是否有主服务器信息
            iii. mount 192.168.26.70:/usr/local/data/www-data /mnt   将主服务器上的共享目录 挂载到/mnt目录
    5. 部署挂载点
        a. 就如同docker的磁盘映射，k8s也可以指定磁盘映射，结合上一步中通过nfs进行集群文件共享，我们便可以实现只修改一次文件，整个集群中文件便全部更新
        b. 挂载点部署实现方式如下：
        <code>apiVersion: extensions/v1beta1
        kind: Deployment
        metadata: 
          name: tomcat-deploy
        spec:
          replicas: 2 
          template: 
            metadata:
              labels:
                app: tomcat-cluster
            spec:
              volumes:  # 说明要进行磁盘映射
              - name: web-app # 映射的名称，与containers中的配置要一致
                hostPath:  # 宿主机上路径
                 path: /mnt # 具体路径
              containers:
              - name: tomcat-cluster-container
                image: tomcat:latest
                ports:
                - containerPort: 8080
                volumeMounts: # container中要挂载目录
                - name: web-app # 和上方的名称对应
                  mountPath: /usr/local/tomcat/webapps/ROOT # 容器中的挂载目录</code>
    6. 使用Rinted(端口转发工具)对外提供Service负载均衡支持
        a. 之前在创建Service是指定了type为NodePort，并且指定了对外暴露的端口为32500，在使用Rinted时需要修改该配置： 
            i. 原tomcat-service.yml配置文件内容如下
            apiVersion: v1
            kind: Service
            metadata:
             name: tomcat-service
             labels:
               app: tomcat-service-service
            spec:
             type: NodePort #这里代表是NodePort类型的
             selector:
              app: tomcat-cluster  #这里选择器一定要选择容器的标签
             ports:
             - port: 8000   #集群内部服务之间访问的端口  k8s service所在pod的端口
               targetPort: 8080  # 容器本身暴露的端口
               nodePort: 32500  # 指定暴露到宿主机的端口 通过这个端口可以访问集群中指定的机器
            ii. 将tomcat-Service内容修改为如下内容，即注释掉typ:NodePort和nodePort暴露的端口
            apiVersion: v1
            kind: Service
            metadata:
             name: tomcat-service
             labels:
               app: tomcat-service-service
            spec:
             # type: NodePort #这里代表是NodePort类型的
             selector:
              app: tomcat-cluster  #这里选择器一定要选择容器的标签
             ports:
             - port: 8000   #集群内部服务之间访问的端口  k8s service所在pod的端口
               targetPort: 8080  # 容器本身暴露的端口
              # nodePort: 32500  # 指定暴露到宿主机的端口 通过这个端口可以访问集群中指定的机器 
        b.  kubectl apply -f tomcat-service.yml 更新service配置
        c. kubectl describe service tomcat-service 查看service详情
            Name:              tomcat-service
            Namespace:         default
            Labels:            app=tomcat-service-service
            Annotations:       kubectl.kubernetes.io/last-applied-configuration:
                                 {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"app":"tomcat-service-service"},"name":"tomcat-service","namesp...
            Selector:          app=tomcat-cluster
            Type:              ClusterIP
            IP:                10.101.53.16
            Port:              <unset>  8000/TCP
            TargetPort:        8080/TCP
            Endpoints:         10.244.1.8:8080,10.244.2.7:8080  #底层两个docker的信息
            Session Affinity:  None
            Events:            <none>
        此时在k8s集群内可以通过ip+port的方式访问集群内的应用，比如上面显示的信息，我们便可以通过10.101.53.16:8000访问tomcat-service服务，tomcat-service便会通过负载均衡算法将请求打到10.244.1.8:8080,10.244.2.7:8080上面。但由于这个ip不是真实的外网ip，仅仅是k8s集群内维护的ip，在k8s集群外侧是无法通过这个ip访问的集群的。
        如何将k8s集群内的ip，端口映射到物理机的ip，端口上呢？---Rineted
        d. Rinetd是Linux操作系统中为重定向传输控制协议工具
        可将源IP端口数据转发至目标IP端口
        在Kubernetes中用于将service服务对外暴露
        e. Rinetd安装步骤
            i. wget http://www.boutell.com/rinetd/http/rinetd.tar.gz 下载源码包（网络问题无法下载）
            ii. tar -zxvf rinetd.tar.gz  解压文件
            iii. cd rinetd/
            iv. sed -i 's/65536/65535/g' rinetd.c  修改rinetd源文件，修改允许映射的端口范围
            v. yum install -y gcc 安装c语言编译器
            vi. make&amp;make install
            vii. vi /etc/rinetd.conf 创建rinetd的配置文件
            0.0.0.0 8000 10.101.53.16 8000        #0.0.0.0 指定任何机器都可以通过8000端口访问到10.101.53.16（k8s中tomcat-service的ip）的8000端口
            viii. rinetd -c /etc/rinetd.conf 加载配置文件，使配置生效
        f. 此时便可以通过宿主机的ip+8000端口访问到tomcat-service的服务了
    7. 到此，便完成了通过k8s部署应用的全部过程