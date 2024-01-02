# 直接运行 Python 脚本

![著作权归砹小翼所有](https://img.shields.io/badge/Copyright-砹小翼-blue.svg) ![首版于2023年9月5日](https://img.shields.io/badge/Release-2023.09.05-purple.svg)

3.3 版本开始的 Python Windows 安装包中附带了一个文件名为 py.exe 的程序，它可以将调用转发到本地安装的最新版本的 Python，也可以手动指定使用特定版本进行调用。

更重要的是，这个 Python 启动器可以识别 Shebang 行并将调用转向指定的解释器。

更多玩法见[适用于 Windows 的 Python 启动器](https://docs.python.org/zh-cn/3/using/windows.html#python-launcher-for-windows)。

## 命令行执行

### 执行

对于需要用全局解释器运行的脚本，可以在首行添加

```python
#!python3.x
```

即可调用具体版本的Python执行，比如 test.py 内容如下：

```python
#!python3.7
import sys

print(sys.executable)
```

在命令行中执行

```cmd
py test.py
```

或者

```cmd
py.exe test.py
```

会输出

```
C:\Program Files\Python37\python.exe
```

另外，对于需要用虚拟环境中的解释器运行的脚本，可以在首行添加指向具体解释器的地址，比如

```python
#!./venv/Scripts/python
import sys

print(sys.executable)
```

那么即使不激活虚拟环境、直接执行

```cmd
py test.py
```

也可以转向虚拟环境中的解释器：

```
C:\Code\Mine\zeraora-pypi\venv\Scripts\python.exe
```

如果需要省略 py.exe 而直接调用 test.py ，那么配置方法与[双击执行](#双击执行)一节相同。

### 配置

正确安装 3.3 版本或更新的 Python 之后，py.exe 应该会在

```
C:\Windows\py.exe
```

或者

```
C:\Users\{YourName}\AppData\Local\Programs\Python\Launcher\py.exe
```

两个地方。如果没有，那么大概需要重新安装 Python；  
如果有的话，检查一下 **系统环境变量** 看看是否有后者的路径。

## 双击执行

双击执行的实现是需要在[命令行执行](#命令行执行)的基础上配置的，包括在脚本首行添加（虚拟）解释器以及确保 py.exe 可以在命令行中调用。

在 Windows 实现这一点需要修改注册表。使用以下命令可以查看相关注册表条目：

```cmd
reg query "HKCR\.py" /ve
reg query "HKCR\py_auto_file\shell\open\command" /ve
```

当前者的值是 `py_auto_file` 、后者的值是 py.exe 的命令行调用时即可实现。

若不是，那么可以使用以下命令进行修改（需要管理员权限）（修改前注意备份数据）：

```cmd
reg add "HKCR\.py" /ve /d "py_auto_file"
reg add "HKCR\py_auto_file\shell\open\command" /ve /d "\"C:\Windows\py.exe\" \"%1\" %*"
```

若 py.exe 不在

```
C:\Windows\py.exe
```

而是在

```
C:\Users\{YourName}\AppData\Local\Programs\Python\Launcher\py.exe
```

那么修改命令是：

```cmd
reg add "HKCR\.py" /ve /d "py_auto_file"
reg add "HKCR\py_auto_file\shell\open\command" /ve /d "\"C:\Users\{YourName}\AppData\Local\Programs\Python\Launcher\py.exe\" \"%1\" %*"
```

