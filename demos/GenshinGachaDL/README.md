# Genshin Gacha DL

一个使用Python编写的用于获取原神祈愿记录的工具。

它通过读取客户端本地日志来获得暂时性的权限，来获取你近半年的祈愿记录（抽卡数据）。

⚠ 此项目真的仅供学习交流。

## 用法

将`gacha`文件夹移动到你的项目文件夹根目录，然后按如下方法导入并使用：

```python
from datetime import datetime
from random import random
from time import sleep

from gacha.models import *
from gacha.tools import save_as_uigf_xlsx

collector = GachaCollector()
collector.page_callback = lambda **kwargs: sleep(random())
collector.check()

# -------- 获取半年内的抽卡记录 --------
branch = collector.collect_all()
file = f'./records_{branch.uid}_%Y%m%d_%H%M%S.json'
file = datetime.now().strftime(file)
branch.dumps(file)

# -------- 读取之前汇总的记录 --------
file = f'./records_{branch.uid}.json'
master = Shelf()
master.loads(file)

# -------- 合并到之前汇总的记录 --------
master += branch
master.dumps(file)

# -------- 生成表格 --------
file = f'./records_{branch.uid}.xlsx'
save_as_uigf_xlsx(master, file)
```

## 要求

1. Python 3.9 或以上版本。主要是用到了`type[type]`的新语法。
2. 另见这个demo根目录的：

```shell
pip install -r ./requirements.txt
```

