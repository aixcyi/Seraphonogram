# Seraphonogram

羽音，一个基于 VitePress 的博客。

## 开始

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
npm run dev
```

默认向所有访问开放浏览，即 `--host 0.0.0.0`，这是为了方便通过内网穿透服务向其它设备提供开发期间的浏览，以兼容多设备。

### 构建生产环境

```shell
npm run build
npm run preview
```

默认向所有访问开放浏览，即 `--host 0.0.0.0`，这是为了方便通过内网穿透服务向其它设备提供基于本地的生产环境预览，以便及时发现多设备兼容性问题。

### 手动部署

如果已经安装 7z，可以

```shell
vitepress build
7z a ./dist.zip ./dist/*
```

然后将 `dist.zip` 复制到服务器解压，并重启网络服务器（比如 nginx）。

## 开发

```text
.
├─.vitepress    # VitePress 配置
│ └─theme       # VitePress 主题 & 组件
├─cache         # VitePress 缓存
├─dist          # VitePress 打包目录
├─drafts        # 草稿文章（仅出现在本地开发环境中）
│ └─wastepaper  # 废纸篓
├─media         # 媒体文件
├─posts         # 博客文章
├─public        # 静态资源
├─refs          # 快速参考
├─about.md      # 关于
└─index.md      # 首页
```

> - `./media` 中的文件会映射到 URL 中的 `/media/`
> - `./public` 中的文件会映射到 URL 中的 `/`

### 草稿箱功能

「草稿箱」用于在本地预览草稿，该分区的所有 Markdown 文件都会被 git 排除；「草稿箱」内有一个文件夹「废纸篓」用于存放将弃未弃的文章页面。

如需显示其中的页面，需要指定环境变量 `VP_DEBUG` 为任意真值，比如在 `package.json` 中

Windows 下可以指定

```json
{
    "scripts": {
        "dev": "set VP_DEBUG=1 && vitepress dev"
    }
}
```

Linux/Mac 下可以指定

```json
{
    "scripts": {
        "dev": "VP_DEBUG=1 vitepress dev"
    }
}
```

[为什么不使用 Vite 的开发模式？](https://github.com/vuejs/vitepress/discussions/3533)

## 约定

### Frontmatter 约定

- `title` 标题。必填，因为 `pages.data.ts` 不会从正文提取标题。会显示在页面标题、侧边栏、导航栏中。
- `navTitle` 导航标题。选填。如果在 `index.md` 中，会覆盖导航栏的 `title`，如果在其它文件中，则会同时覆盖侧边栏和导航栏的 `title`。
- `lang`：虽然并不使用国际化功能，但为了向前兼容，一般都写上。
- `order`：目录排序，从小到大从前到后排序，在 `index.md` 中定义。
- `publishAt`：首版时间，`yyyy-MM-dd HH:mm` 格式字符串，必填，否则将不会出现在目录中。
- `reviseAt`：修订时间，`yyyy-MM-dd HH:mm` 格式字符串，选填。
- `expires`：保鲜时间，选填。提供一个以天为单位的整数时，显示保鲜进度条及百分比。
- `tags`：文章标签，选填，若需要则必须以字符串数组的方式提供，实际呈现时会自动添加一个文章风格标签。
- `excerpt`：文章简介，Markdown 格式。须放在 Frontmatter 最后一个字段，方便日后迁移。

### 提交消息约定

```text
<scope>/<type>[/<target>]: <short summary>
```

| scope  | 描述                  |
|--------|---------------------|
| page   | 文章、快速参考等的页面。        |
| site   | 站点级别的页面，以及主题、样式、组件。 |
| arch   | 项目的架构与技术栈。          |
| config | 项目运行、构建、测试、调试的配置。   |

| type     | 描述                                                                              |
|----------|---------------------------------------------------------------------------------|
| post     | 发布新文章，或从其它地方迁移历史文章。                                                             |
| revise   | 修订原有文章。<br/>一般不会混合新文章发布，否则应使用 `post`。<br/>与内容无关的代码类修改，参照代码类 `type` 或改用 `style`。 |
| feat     | 提交新代码、新功能。                                                                      |
| perf     | 代码性能优化。                                                                         |
| fix      | 修复已有的功能代码。                                                                      |
| hotfix   | 紧急修复已有的功能代码。                                                                    |
| refactor | 更改已有的功能代码。                                                                      |
| style    | 代码或 Markdown 的格式调整，以及网页样式调整。                                                    |
| chore    | 杂项改动。                                                                           |

## 致谢

- [纸鹿本鹿 / Zhilu](https://github.com/L33Z22L11/)

## 反馈

欢迎加入QQ群聊 [699090940](https://qm.qq.com/q/GEnp3eizCk) 实时反馈、吐槽、交流~
