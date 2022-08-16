# -*- coding: utf-8 -*-

__all__ = [
    'GachaException',
    'AuthNotFound',
    'AuthNotAvailable',
    'MaybeDeprecated',
    'RawResponseException',
    'RawRespDecodeError',
    'RawRespTypeError',
]


class GachaException(Exception):
    """Gacha异常的基类。"""

    def __init__(self, message: str, *args, **kwargs):
        self.msg = message

    def __str__(self):
        return self.msg


class AuthNotFound(GachaException):
    """找不到日志或鉴权信息。"""

    def __init__(self):
        self.msg = (
            '在日志文件中找不到鉴权信息。请尝试进入原神，'
            '打开祈愿面板，然后点击左下角的 “历史” 浏览一下。'
        )


class AuthNotAvailable(GachaException):
    """鉴权信息不可用。"""

    def __init__(self, context: str):
        self.msg = '鉴权信息不可用。' + context


class MaybeDeprecated(GachaException):
    """用于表明代码可能已过期的异常。"""

    def __str__(self):
        warning = '若出现此错误，则API大概率已经发生变化，' \
                  '当前代码可能不再适用，请寻求新的解决方案。'
        return super().__str__() + '\n\n' + warning


class RawResponseException(MaybeDeprecated):
    """响应失败。"""

    def __init__(self, message: str):
        self.msg = message


class RawRespDecodeError(MaybeDeprecated):
    """原始响应解码失败。"""

    def __init__(self):
        self.msg = 'HTTP响应解码失败，因为它不是一份合法的JSON字符串。'


class RawRespTypeError(MaybeDeprecated):
    """原始响应类型错误。"""

    def __init__(self, key_name: str):
        self.msg = f'HTTP响应缺少以下字段：{key_name}'
