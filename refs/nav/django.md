---
title: Django & REST Framework
outline: deep
createAt: 2025-04-10 00:16
updateAt: 2025-05-21 17:11
expires: 365
order: 3
excerpt:
---

<SeeAlsoBar flavor="neck" :refs="[
    { text: 'Django REST Framework', link: 'https://www.django-rest-framework.org/' },
    { text: 'Django 5.2', link: 'https://docs.djangoproject.com/zh-hans/5.2/' },
    { text: 'Django 4.2', link: 'https://docs.djangoproject.com/zh-hans/4.2/' },
    { text: 'Django 3.2', link: 'https://docs.djangoproject.com/zh-hans/3.2/' },
    { text: 'Django 2.2', link: 'https://docs.djangoproject.com/zh-hans/2.2/' },
]"/>

> 1. 这里主要指 Django 和 Django REST Framework 两个框架。
> 2. 按照 [废弃政策](https://docs.djangoproject.com/zh-hans/5.2/internals/release-process/#deprecation-policy)
>    的发行节奏，Django 从 2.0 开始只发行 x.0、x.1 和 x.2 LTS 三个大的子版本。
> 3. 技术选型前可以参考
>    [Python 兼容性](https://docs.djangoproject.com/zh-hans/5.2/faq/install/#what-python-version-can-i-use-with-django)，旧版本的兼容性可以在 **上面** 旧版本的 Django 文档中查到。
> 4. Django 文档非常齐全，首页把文档全部掰碎了摊开，包含新手起步流程和熟手进阶方向，只需按图索骥即可解决大部分问题。
> 5. Django REST Framework 在导航栏把文档划分成“教程”“API 参考”“话题” 三个部分，基本对应新手、进阶、深入三个阶段。

## 配置 {#settings}

> Django 的配置存放在是以一个 Python 包的形式存在，因此你可以借助 Python 语法实现很多操作。

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/settings/" text="Django 配置" />

> 1. 缓存部分：https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#caches
> 2. 数据库部分：https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#databases

<LinkCard href="https://www.django-rest-framework.org/api-guide/settings/"
          text="Settings - Django REST Framework"
          note="Configuration for REST framework is all namespaced inside a single Django setting, named REST_FRAMEWORK." />

> Django REST Framework 的配置亦是存放在 `settings.py` 中，且统一存放在一个变量 `REST_FRAMEWORK` 中。

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/topics/settings/" text="配置 Django 配置" />

> 如何导入配置？如何添加自定义配置？命名风格？对比默认值，我修改过什么配置？

### 区分生产环境 {#environment}

> 1. 假设配置在 `./myproject/settings.py`。
> 2. 复制一份 settings 到 `./myproject/settings_prod.py` 来进行单独修改。
> 3. 设置环境变量
>    ```bat
>    set DJANGO_SETTINGS_MODULE=myproject.settings_prod
>    ```
>    
>    或者在运行时添加参数
>    
>    ```shell
>    python manage.py runserver --settings=myproject.settings_prod
>    ```

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

### Meta {#model-meta}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/options/"
          text="模型 Meta 选项"
          note="模型内部类 Meta 的参考，其用于控制模型的行为，例如表名、约束、排序、抽象等。" />

### 自定义管理器 {#manager}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/topics/db/managers/#custom-managers"
          text="自定义管理器"
          note="Manager 是一种接口，它赋予了 Django 模型操作数据库的能力。Django 应用中每个模型拥有至少一个 Manager。有两种原因可能使你想要自定义 Manager：添加额外的 Manager 方法，修改 Manager 返回的原始 QuerySet。" />

```python
from django.db import models

class ExistenceManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted=False)

class Book(models.Model):
    title = models.CharField('标题', max_length=100)
    deleted = models.BooleanField('已删除', default=False, blank=True)

    objects = models.Manager()  # 默认管理器，在此处声明是为了确保默认情况下可以拿到表中所有数据。
    existences = ExistenceManager()  # 过滤掉已删除的数据。

Book.existences.filter(title__contains='aixcyi')
# 等价于
Book.objects.filter(deleted=False, title__contains='aixcyi')
```

### 查询 {#query}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/topics/db/queries/"
          text="执行查询（注：基本教程）" />

### QuerySet API {#queryset}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/querysets/"
          text="QuerySet API 参考" />

> `QuerySet` 实例的 API 参考。包含
> - 返回和不返回新 `QuerySet` 对象的方法；
> - 适用的运算符 `&`（即 `AND`）、`|`（即 `OR`）、`^`（即 `XOR`）；
> - `Field` 查找器 `Lookup`；
> - 聚合函数 `Sum()` `Count()` `Max()` `Min()` 等；
> - `Q()` `Prefetch()` 等相关查询工具。

### 查询器 Lookup {#lookup}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/querysets/#field-lookups"
          text="内置的 Field 查找">
    字段查找是指定 SQL WHERE 子句的方法。它们被指定为 QuerySet 方法
    <code>filter()</code>、<code>exclude()</code> 和 <code>get()</code> 的关键字参数。
</LinkCard>
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/lookups/"
          text="PostgreSQL 特有的查找" />
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/fields/"
          text="PostgreSQL 特有模型字段"
          note="注：有许多并非特有的查找，比如 ArrayField 重写了的 contains 查询，需要结合具体 PostgreSQL 字段类型浏览。" />

> 一种方便的字段查询方式，格式如 `__contains`。  
> 比如查询 User 表 username 字段是否包含 aixcyi 这段字符串，ORM 方法是
> 
> ```python
> User.objects.filter(username__contains='aixcyi')
> ```
> 
> 对应 SQL 是
> 
> ```sql
> SELECT * FROM user WHERE username LIKE '%aixcyi%';
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

> 比如查询 Goods 表 sale_channels 字段是否包含比特 `2` 或 `16`，ORM 方法是
> 
> ```python
> Goods.objects.filter(sale_channels__hasb=2 | 16)
> ```
> 
> 对应 SQL 是
> 
> ```sql
> SELECT * FROM goods WHERE sale_channels & (2 | 16) != 0;
> ```

### 函数 & 表达式 {#query-expression}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/expressions/"
          text="查询表达式">
    主要围绕 <code>F()</code> <code>Func()</code> <code>Aggregate()</code> <code>Value()</code> <code>Subquery()</code> 等进行说明。<br/>
    查询表达式描述了一个值或一个计算，它可以作为更新、创建、过滤、排序、注解或聚合的一部分。当一个表达式输出一个布尔值时，它可以直接用于过滤器中。有许多内置的表达式（在下面的文档中）可以用来帮助你编写查询。表达式可以组合，或者在某些情况下嵌套，以形成更复杂的计算。
</LinkCard>
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/database-functions/"
          text="数据库函数"
          note="底层数据库提供的函数，在 Django 中作为注解、聚合或过滤器，它们也是表达式，所以可以和其它表达式一起使用和组合，比如聚合函数。" />
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/aggregates/"
          text="PostgreSQL 特有聚合函数"
          note="包括对数组、比特、布尔值、JSONB、字符串的通用聚合函数，以及统计相关的聚合函数。" />
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/expressions/"
          text="PostgreSQL 特有查询表达式" />
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/functions/"
          text="PostgreSQL 特有数据库函数" />

### 数据库约束 {#constraints}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/models/constraints/"
          text="约束参考"
          note="本模块中定义的类可以创建数据库约束。它们被添加到模型中 Meta.constraints 选项中。" />

### 数据库事务 {#transactions}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/topics/db/transactions/"
          text="数据库事务" />

### 原生 SQL 查询 {#sql}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/topics/db/sql/"
          text="执行原生 SQL 查询">
    可以使用 <code>Manager.raw()</code> 来 <b>执行原生查询并返回模型实例</b>，或者完全不用模型层 <b>直接执行自定义</b> SQL。
</LinkCard>

## 视图层 {#view}

### URL & 反向解析 {#routing}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/topics/http/urls/"
          text="URL调度器">
    路由存储在单独的 Python 模块中，一般是 <code>urls.py</code>。当
    Django 服务器接到请求时，会从 <code>settings.ROOT_URLCONF</code>
    声明的 <code>urls.py</code> 中提取路由映射来解析，并按照映射传递给其它 <code>urls.py</code>。
</LinkCard>

### 请求实例 `Request` {#request}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/"
          text="HttpRequest 对象" />
<LinkCard href="https://www.django-rest-framework.org/api-guide/requests/"
          text="Requests - Django REST Framework" />

### 响应实例 `Response` {#response}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/#httpresponse-objects"
          text="HttpResponse 对象" />
<LinkCard href="https://www.django-rest-framework.org/api-guide/responses/"
          text="Responses - Django REST Framework" />

## 兼容性简表 {#compatibility}

### Django

|      | 5.2 | 5.1 | 5.0 | 4.2 | 4.1 | 4.0 | 3.2 | 3.1 | 3.0 | 2.2 | 2.1 | 2.0 |
|:----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 3.13 |  ✔  |  ✔  |     |     |     |     |     |     |     |     |     |     |
| 3.12 |  ✔  |  ✔  |  ✔  |  ✔  |     |     |     |     |     |     |     |     |
| 3.11 |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |     |     |     |     |     |     |     |
| 3.10 |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |     |     |     |     |     |
| 3.9  |     |     |     |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |     |     |     |
| 3.8  |     |     |     |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |     |     |
| 3.7  |     |     |     |     |     |     |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |
| 3.6  |     |     |     |     |     |     |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |
| 3.5  |     |     |     |     |     |     |     |     |     |  ✔  |  ✔  |  ✔  |
| 3.4  |     |     |     |     |     |     |     |     |     |     |     |  ✔  |

### Django REST framework

|      | 5.2 | 5.1 | 5.0 | 4.2 | 4.1 | 4.0 | 3.2 | 3.1 | 3.0 | 2.2 | 2.1 | 2.0 |
|:----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 3.16 |  ✔  |  ✔  |  ✔  |  ✔  |     |     |     |     |     |     |     |     |
| 3.15 |     |     |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |     |     |     |
| 3.14 |     |     |     |     |  ✔  |  ✔  |  ✔  |  ✔  |  ✔  |     |     |     |
| 3.13 |     |     |     |     |     |  ✔  |  ✔  |  ✔  |     |  ✔  |     |     |
| 3.12 |     |     |     |     |     |     |     |     |     |     |     |     |
| 3.11 |     |     |     |     |     |     |     |     |  ✔  |  ✔  |  ✔  |  ✔  |
| 3.10 |     |     |     |     |     |     |     |     |     |  ✔  |  ✔  |  ✔  |
| 3.9  |     |     |     |     |     |     |     |     |     |     |  ✔  |  ✔  |

## 参考 {#references}

<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/topics/auth/customizing/#substituting-a-custom-user-model"
          text="替换一个自定义的 User 模型"
          note="继承不同层次的父 User 可以获得不同的功能，但这需要在数据库创建之前就替换，否则只能使用一对一关系进行关联。" />
<LinkCard href="https://docs.djangoproject.com/zh-hans/5.2/ref/exceptions/"
          text="Django 异常" />


<style scoped>
.LinkCard {
    margin-top: 15px;
}
</style>
