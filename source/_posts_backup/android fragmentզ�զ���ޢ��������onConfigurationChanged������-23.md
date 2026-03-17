---
title: android fragment屏幕旋转不执行onConfigurationChanged方法
date: 2016-02-22 23:20:21.0
updated: 2016-02-23 23:06:18.0
url: /archives/23
categories: 
tags: Configuration | 屏幕旋转 | acitivity | fragment | android
---

自学是一段痛苦的路程。。。。  但我们在痛苦中进步

并不是很困难的问题，但百度n久，各种答案都有，唯独差一个能解决问题的，幸好还有google。在stackoverflow中找到了解决方法。

http://stackoverflow.com/questions/5620033/onconfigurationchanged-not-getting-called

英文原文：

Caution: Beginning with Android 3.2 (API level 13), the "screen size" also changes when the device switches between portrait and landscape orientation. Thus, if you want to prevent runtime restarts due to orientation change when developing for API level 13 or higher (as declared by the minSdkVersion and targetSdkVersion attributes), you must include the "screenSize" value in addition to the "orientation" value. That is, you must decalare android:configChanges="orientation|screenSize". However, if your application targets API level 12 or lower, then your activity always handles this configuration change itself (this configuration change does not restart your activity, even when running on an Android 3.2 or higher device).

大概其就是 api level 在13及其以上的时候，在AndroidManifest.xml中要配置 android:configChanges="orientation|screenSize".而不仅仅配置android:configChanges="orientation"

ok,问题解决。 此处并不需要配置 &lt;uses-permission android:name="android.permission.CHANGE_CONFIGURATION"&gt;&lt;/uses-permission&gt;

具体代码可参考：https://github.com/iqijun/fragmetnStudy

&nbsp;