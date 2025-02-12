# Seraphonogram

羽音，一个基于 VitePress＋VitePress Sidebar＋Element Plus 的独立博客站点。

## 快速开始

### 安装 Node.js 并克隆仓库

目前所用的 Node.js 版本是 20.17.0 LTS，其它版本并未测试，为了避免奇奇怪怪的错误，比较推荐使用这个或更新的版本。

### 安装依赖

```shell
npm install
```

### 配置环境文件

在项目根目录创建 `./.env` 文件，并自定义以下变量（若未配置将隐藏页脚）：

```ini
VITE_FOOTER_MSG = '圣光耀耀 | 圣火昭昭 | 凡此教众 | 喵喵喵喵'
```

### 运行开发环境

```shell
npm run docs:dev
```

默认向所有访问开放浏览，即 `--host 0.0.0.0`，这是为了方便通过内网穿透服务向其它设备提供开发期间的浏览，以兼容多设备。

### 构建生产环境

```shell
npm run docs:build
npm run docs:preview
```

默认向所有访问开放浏览，即 `--host 0.0.0.0`，这是为了方便通过内网穿透服务向其它设备提供基于本地的生产环境预览，以便及时发现多设备兼容性问题。

### 部署

如果已经安装 7z，可以

```shell
vitepress build
7z a ./dist.zip ./dist/*
```

然后将 `dist.zip` 复制到服务器解压，并重启网络服务器（比如 nginx）。

## 架构

### 目录结构简介

```text
.
├─.vitepress    # VitePress 配置
│  └─theme    # VitePress 主题扩展
├─cache    # VitePress 缓存
├─dist    # VitePress 打包目录
└─src
    ├─image    # 图片，对应URL中的 /image/*.*
    ├─public    # 静态资源
    ├─utils    # 工具代码
    ├─components    # 组件代码
    ├─problemset    # 题单文章
    ├─blogs    # 博客文章
    │  ├─problem
    │  ├─record
    │  ├─summary
    │  ├─thinking
    │  └─catalog.md    # 博客目录
    ├─about.md    # 关于
    └─index.md    # 首页
```

### 路由布局

- 博客文章 `./src/blogs` 直接映射到根目录（毕竟域名已经带上 `blog` 了，也就没必要重复）。
- 快速参考的页面会直接映射到根目录，以便节省手动输入的时间。
- 其余页面按照 VitePress 默认进行布局。

## 约定

### 目录命名约定

- 会出现在 URL 中的目录使用单词**单数**命名；
- 不会出现在 URL 中的目录使用单词**复数**命名。

### Frontmatter 约定

- `title` 必填，因为 VitePress Sidebar 没办法从正文提取标题。
- `lang`：虽然并不使用国际化功能，但为了向前兼容，一般都写上。
- `order`：目录排序，从小到大从前到后排序，在 `index.md` 中定义。小于 0 表示代表风格的目录，大于 0 表示其它目录或子目录，0 一般不用。
- `created`：创建时间，`yyyy-MM-dd HH:mm` 格式字符串，必填，否则将不会出现在目录中。
- `updated`：修改时间，`yyyy-MM-dd HH:mm` 格式字符串，选填。
- `expires`：保鲜时间，选填。提供一个以天为单位的整数时，显示保鲜进度条及百分比；提供一个字符串时直接显示字符串。
- `excerpt`：文章简介，约定使用 HTML。
- `tags`：文章标签，选填，若需要则必须以字符串数组的方式提供，实际呈现时会自动添加一个文章风格标签。

### 提交消息约定

采用 [Angular](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-header) 格式。

- `post` 表示发布新文章，或从其它地方迁移历史文章。
- `revise` 表示修改原有文章。一般不会混合新文章发布，如果有，会使用 `post`。
- `feat` 表示提交新代码、新功能。
- `fix` 表示修复原有功能代码。
- `hotfix` 表示紧急修复原有功能代码。
- `refactor` 表示更改原有功能代码。
- `chore` 表示与文章、代码都无关的改动。
- `style` 表示不设计代码逻辑的代码层面改动（一般是格式化等风格变动）。

## 致谢

- [纸鹿本鹿 / Zhilu](https://github.com/L33Z22L11/)

## 反馈

欢迎加入QQ群聊 [699090940](https://qm.qq.com/q/GEnp3eizCk) 实时反馈、吐槽、交流~
