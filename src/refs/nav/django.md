---
title: Django & REST Framework
lang: zh-CN
outline: deep
publishAt: 2025-04-10 00:16
expires: 365
order: 6
excerpt:
---

<SeeAlsoBar flavor="neck" :refs="[
    { text: 'Django REST Framework', link: 'https://www.django-rest-framework.org/' },
    { text: 'Django 5.2', link: 'https://docs.djangoproject.com/zh-hans/5.2/' },
    { text: 'Django 4.2', link: 'https://docs.djangoproject.com/zh-hans/4.2/' },
    { text: 'Django 3.2', link: 'https://docs.djangoproject.com/zh-hans/3.2/' },
    { text: 'Django 2.2', link: 'https://docs.djangoproject.com/zh-hans/2.2/' },
]"/>

> 1. 按照 [废弃政策](https://docs.djangoproject.com/zh-hans/5.2/internals/release-process/#deprecation-policy)
>    的发行节奏，Django 从 2.0 开始只发行 x.0、x.1 和 x.2 LTS 三个大的子版本。
> 2. Django 文档非常齐全，首页把文档全部掰碎了摊开，包含新手起步流程和熟手进阶方向，只需按图索骥即可解决大部分问题。
> 3. Django REST Framework 在导航栏把文档划分成“教程”“API 参考”“话题” 三个部分，基本对应新手、进阶、深入三个阶段。

## Settings

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/settings/" text="Django 配置" />
<LinkCard href="https://www.django-rest-framework.org/api-guide/settings/"
          text="Settings - Django REST Framework"
          note="Configuration for REST framework is all namespaced inside a single Django setting, named REST_FRAMEWORK." />

> 1. 缓存部分：https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#caches
> 2. 数据库部分：https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#databases
> 3. Django 的 Settings 以一个 Python 包的形式存在，因此你可以借助 Python 语法实现很多操作。

### Settings 的用法 {#settings-conf}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/topics/settings/" text="配置 Django Settings" />

> 1. 如何导入配置？
> 2. 对比默认值，我修改过什么配置？
> 3. 如何添加自定义配置？命名风格？

### 区分生产环境 {#environment}

> 1. 假设配置在 `./myserver/settings.py`。
> 2. 复制一份 settings 到 `./myserver/settings_prod.py` 来进行单独修改。
> 3. 设置环境变量
>
> ```bat
> set DJANGO_SETTINGS_MODULE=myserver.settings_prod
> ```
>
> 或者在运行时添加参数
> ```shell
> python manage.py runserver --settings=myserver.settings_prod
> ```

### 美化配置 {#beautify}

> 因为 Settings 以一个 Python 包的形式存在，因此可以用形参对固定配置加以区分：

```python [./我的项目/settings.py]
DATABASES = {
    'default': dict(
        ENGINE='django.db.backends.postgresql',
        NAME='我的项目',
        USER='postgres',
        PASSWORD='我的密码',
        HOST='localhost',
        PORT='5432',
    ),
}
```

## 模型层 {#model}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/" text="模型 API 参考" />

> 包含字段类型、字段参数、索引、约束、关联、Meta、查询集、查询表达式、条件表达式等与数据库相关的参考。

### 字段类型 {#field-type}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/fields/"
          text="模型字段参考"
          note="本文档包含 Field 类的所有 API 参考，包括 字段选项 和 字段类型。" />
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/fields/"
          text="PostgreSQL 特有模型字段"
          note="所有这些字段都可以从 django.contrib.postgres.field 模块中获得。" />
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/howto/custom-model-fields/"
          text="编写自定义模型字段" />

## 视图层 {#view}

### 请求 {#request}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/"
          text="HttpRequest 对象" />
<LinkCard href="https://www.django-rest-framework.org/api-guide/requests/"
          text="Requests - Django REST Framework" />

### 响应 {#response}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/#httpresponse-objects"
          text="HttpResponse 对象" />
<LinkCard href="https://www.django-rest-framework.org/api-guide/responses/"
          text="Responses - Django REST Framework" />

## 查询 {#queryset}

### 查询器 Lookup {#lookup}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/querysets/#field-lookups"
          text="内置的 Field 查找"
          note="字段查找是指定 SQL WHERE 子句的方法。它们被指定为 QuerySet 方法 filter()、exclude() 和 get() 的关键字参数。" />
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/lookups/"
          text="PostgreSQL 特有的查找" />

> 一种方便的字段查询方式，格式如 `__contains`。  
> 比如查询 User 表 username 字段是否包含 ayuu 这段字符串，ORM 方法是
> 
> ```python
> User.objects.filter(username__contains='ayuu')
> ```
> 
> 对应 SQL 是
> 
> ```sql
> SELECT * FROM user WHERE username LIKE '%ayuu%'
> ```

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/howto/custom-lookups/"
          text="如何编写自定义的查询器" />

```python
from django.db.models import Lookup

class HasBits(Lookup):
      """
      检测字段值是否含有某个或某些比特。
      """
      lookup_name = "hasb"  # 想知道在哪里用过，只需全局搜索 "__hasb="
  
      def as_sql(self, compiler, connection):
          lhs, lhs_params = self.process_lhs(compiler, connection)
          rhs, rhs_params = self.process_rhs(compiler, connection)
          params = lhs_params + rhs_params
          return "%s & %s != 0" % (lhs, rhs), params
```

> 比如查询 Goods 表 sale_channels 字段是否包含比特 `2` 和 `16`，ORM 方法是
> 
> ```python
> Goods.objects.filter(sale_channels__hasb=2 | 16)
> ```
> 
> 对应 SQL 是
> 
> ```sql
> SELECT * FROM goods WHERE sale_channels & 18 != 0
> ```

### 查询表达式 {#query-expression}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/expressions/"
          text="查询表达式"
          note="查询表达式描述了一个值或一个计算，它可以作为更新、创建、过滤、排序、注解或聚合的一部分。当一个表达式输出一个布尔值时，它可以直接用于过滤器中。有许多内置的表达式（在下面的文档中）可以用来帮助你编写查询。表达式可以组合，或者在某些情况下嵌套，以形成更复杂的计算。" />

> 主要围绕 `F()` `Func()` `Aggregate()` `Value()` `Subquery()` 等进行说明。
