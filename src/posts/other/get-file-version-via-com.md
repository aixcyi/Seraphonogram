---
title: 使用COM对象取文件版本
lang: zh-CN
publishAt: 2016-08-22 15:06
expires: 1096
tags:
    - 开发
    - 易语言
    - 组件对象模型 COM
    - win32api
---

# 使用COM对象取文件版本

<RevisionInfo />

个人认为这种方法代码量少，只需几行即可，表格也无需多填，但需要知道对象和方法名，而且如果未经处理，对象和方法名都将直接暴露，容易被别人修改。

```易语言
.版本 2

.子程序 取文件版本, 文本型, 公开, 本源码改编自易语言资源网(www.5A5X.com)
.参数 文件地址, 文本型
.局部变量 COM对象, 对象
.局部变量 结果, 文本型

COM对象.创建 (“Scripting.FileSystemObject”, )
结果 ＝ COM对象.文本方法 (“GetFileVersion”, 文件地址)
COM对象.清除 ()
返回 (结果)
```
