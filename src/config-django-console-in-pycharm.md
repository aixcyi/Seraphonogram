# 配置 Django 控制台

![著作权归砹小翼所有](https://img.shields.io/badge/Copyright-砹小翼-blue.svg) ![首版于2024年1月24日](https://img.shields.io/badge/Release-2024.01.24-purple.svg)

在 PyCharm 社区版中将 Python 控制台配置为 Django 控制台。所谓的 Django 控制台是一个可以让你以命令行交互形式执行诸如 `User.objects.filter(is_active=True).get(id=1)` 等语句的控制台窗口。

## 1、打开设置页

中文环境下搜索“控制台”：

![设置页面](../../images/django-console-search-cn.png)

Search "console" by settings searcher if you are using English:

![Settings Page](../../images/django-console-search-en.png)

## 2、设置启动脚本

```python
import sys; print('Python %s on %s' % (sys.version, sys.platform))
import django; print('Django %s' % django.get_version())
sys.path.extend([WORKING_DIR_AND_PYTHON_PATHS])
if 'setup' in dir(django): django.setup()
```

也就是专业版中省去引入 `django_manage_shell` 之后的启动脚本（Starting script）。

![设置启动脚本](../../images/django-console-starting-script.png)

## 3、设置环境变量

展开上方的环境一栏（Environment）找到环境变量（Environment variables），填入你的 settings 的包地址 `DJANGO_SETTINGS_MODULE=my_service.settings` 。

![配置环境变量](../../images/django-console-env-var.png)

## 4、启动！

在左侧的工具栏找到 Python 控制台（Python Console），打开选项卡即可启动。

