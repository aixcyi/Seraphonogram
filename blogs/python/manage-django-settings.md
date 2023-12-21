# 管理 Django Settings

![作者：砹小翼](https://img.shields.io/badge/Copyright-砹小翼-blue.svg) ![发布时间：2023年12月21日](https://img.shields.io/badge/Release-2023.12.21-purple.svg)

Django 本身可以动态生成配置初值乃至导入初值，但并不建议在运行时 **修改** 配置。本文仅围绕导入配置初值展开。

## 原生方法

- ./manage.py
- ./{service}/wsgi.py
- ./{service}/asgi.py

三个启动文件中都有一个名为 `DJANGO_SETTINGS_MODULE` 的环境变量，默认值是 `"{service}.settings"` ，实际上是一个 Python 包的路径，对应 ./{service}/settings.py 这个文件。

Django 就是在启动时通过这个包路径导入对应的配置代码，构造 `django.conf.settings` 对象。

注意：`settings` 不是一个包，而是一个对象，所以

```python
django.conf.settings import DEBUG  # 不能这样导入

if DEBUG is True:
    pass
```

当需要配置不同环境的 settings 时，一般建立多个不进入版本控制的 ./{service}/settings_*.py 文件，并在不同的环境下将环境变量 `DJANGO_SETTINGS_MODULE` 指向所需的文件。

这个文件可以配置如下：

```python
from service.settings import *

DEBUG = True
SECRET_KEY = "He110, me0w."
ALLOWED_HOSTS = [
    '*',
]
DATABASES['default'] = dict(
    ENGINE='django.db.backends.postgresql',
    NAME='db_name',
    USER='meow',
    PASSWORD='meowpassword',
    HOST='127.0.0.1',
    PORT='5432',
)
```

对于不是直接赋值的变量，可以通过 IDE 跳转到 settings.py 对应的变量。

## django-environ 包

[django-environ](https://pypi.org/project/django-environ/) 是一个第三方包，需要通过 `pip install` 或其它方式安装。它遵循[十二因素方法论](https://www.12factor.net/)，关于这个的解读可以参考[这里](https://ithelp.ithome.com.tw/articles/10233649)。

使用方法为在 settings.py 中导入包：

```python
from environ import Env

BASE_DIR = Path(__file__).parent.parent

env = Env()
env.read_env(BASE_DIR / '.env')

DEBUG = env.bool('DEBUG')
SECRET_KEY = env.str('SECRET_KEY')
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')
DATABASES = {
    'default': env.db('DEFAULT_DATABASE'),
}
```

而 ./.env 文件的写法为：

```ini
DEBUG=true
SECRET_KEY="He110, me0w."
ALLOWED_HOSTS=127.0.0.1,::1
DEFAULT_DATABASE=postgresql://meow:meowpassword@127.0.0.1:5432/db_name
```

但这个文件不能含有中文，否则会报编码错误。虽然可以将环境变量 [`PYTHONUTF8`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONUTF8) 设为 `1` 来缓解，但在多设备多环境的情况下治标不治本，最好的办法还是全英输入。

在多环境下，包的做法是只将 ./.env 载入环境变量并由 `Env` 读取，换句话说，相当于一个环境只能拥有一份配置。这一点可以参阅它的[Quick Start](https://django-environ.readthedocs.io/en/latest/quickstart.html#quick-start)。

在这种情况下，不应该将 ./.env 纳入版本控制，而应该编写不同环境的模板，命名为 ./.env.prod 、./env.dev 之类，然后纳入版本管理；而后在新的环境中，开发人员（或运维人员）根据模板重新编写 ./.env ，最后再启动。

