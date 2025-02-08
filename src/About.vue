<script lang="ts" setup>
import { Bottom } from "@element-plus/icons-vue";
import { Icon } from "@iconify/vue";
</script>

<template>
    <h3>昵称与 ID</h3>
    <p>
        <span>　　“砹小翼”是最初的昵称，取双拼拼音得到常用 ID <code>aixcyi</code> 并衍生出域名
        <a href="https://aixcyi.cn/" target="_blank"><code>aixcyi.cn</code></a>
        ，但因为昵称不好叫，工作中一般喊“阿羽”。后来发现一个更好记的域名
        <a href="https://ayuu.cc/" target="_blank"><code>ayuu.cc</code></a>
        ，于是改用 <code>ayuu</code> 作为新的 ID。不过
        <code>aixcyi</code> 已经用了很多年，历史负债多得很，加上新 ID 太短很容易重名，所以会并行使用旧 ID。</span>
    </p>

    <h3>技能树</h3>
    <table>
        <tbody>
        <tr>
            <td style="text-align: end"><h5>后端</h5></td>
            <td>
                <img alt="后端技术栈图标"
                     src="https://skillicons.dev/icons?i=py,django,pycharm,postgres,redis,regex,postman"/>
            </td>
        </tr>
        <tr>
            <td style="text-align: end"><h5>前端</h5></td>
            <td>
                <img alt="前端技术栈图标" src="https://skillicons.dev/icons?i=ts,vue,vite,webstorm,vscode"/>
            </td>
        </tr>
        <tr>
            <td style="text-align: end"><h5>运维</h5></td>
            <td>
                <img alt="运维技术栈图标"
                     src="https://skillicons.dev/icons?i=git,nginx,grafana,bash,github,stackoverflow,ubuntu,windows"/>
            </td>
        </tr>
        <tr>
            <td style="text-align: end"><h5>IntelliJ 插件</h5></td>
            <td>
                <img alt="IntelliJ 技术栈图标" src="https://skillicons.dev/icons?i=kotlin,java,gradle,idea"/>
            </td>
        </tr>
        <tr>
            <td style="text-align: end"><h5>设计创作</h5></td>
            <td>
                <img alt="设计创作类技术栈图标" src="https://skillicons.dev/icons?i=md,obsidian,blender"/>
            </td>
        </tr>
        </tbody>
    </table>

    <h3>捕蛇者说</h3>
    <el-timeline>
        <el-timeline-item color="#A349A4" timestamp="2012 年，暑假">
            偶遇易语言，初窥计算机世界。
        </el-timeline-item>
        <el-timeline-item color="#A349A4" timestamp="2016 年 8 月">
            在博客园发布第一篇博客。
        </el-timeline-item>
        <el-timeline-item color="#A349A4" timestamp="2018 年 10 月">
            初遇
            <Icon class="logo" height="24" icon="logos:python"/>
            ，逐渐领略其它语言的魅力。
        </el-timeline-item>
        <el-timeline-item color="#A349A4" timestamp="2018 年 11 月">
            在精易论坛发布易语言配色器，用于解决 IDE 配色不方便的问题。
        </el-timeline-item>
        <el-timeline-item color="#A349A4" timestamp="2019 年 2 月">
            提前登入校内 Online Judge 刷题，为蓝桥杯 Java 组做准备。
        </el-timeline-item>
        <el-timeline-item color="#A349A4" timestamp="2019 年，暑假">
            使用
            <Icon class="logo" height="24" icon="logos:go"/>
            配合 LiteIDE 学习区块链。
        </el-timeline-item>
        <el-timeline-item color="#A349A4" timestamp="2019 年 10 月">
            带队参加一带一路金砖技能大赛区块链赛项，获团体一等奖第一名。
        </el-timeline-item>
        <el-timeline-item color="#A349A4" timestamp="2020 年 11 月">
            在众多 UI 框架中选定了 JavaFX 来撰写毕业论文、进行答辩。
        </el-timeline-item>
        <el-timeline-item timestamp="2020 年 12 月">
            找到一处名为 GitHub 的乐园，翻开岁月史书 git 的第一页。
        </el-timeline-item>
        <el-timeline-item color="#00A2E8" timestamp="2021 年 3 月">
            进入中山一家跨境电商公司实习，接触到
            <Icon class="logo" height="24" icon="logos:django-icon"/>
            与
            <Icon class="logo" height="24" icon="logos:postgresql"/>
            以及集成开发环境
            <Icon class="logo" height="24" icon="logos:pycharm"/>
            。
        </el-timeline-item>
        <el-timeline-item color="#00A2E8" timestamp="2021 年 6 月">
            带领同事重构公司项目，抽象出仓库管理系统 WMS 与订单管理系统 OMS，使用
            <Icon class="logo" height="24" icon="logos:bootstrap"/>
            为项目增添色彩。
        </el-timeline-item>
        <el-timeline-item color="#00A2E8" timestamp="2021 下半年">
            作为主面试官参与到公司 Django 后端开发岗位面试的技术环节。
        </el-timeline-item>
        <el-timeline-item timestamp="2022 年 2 月">
            发现 Quick Reference 并参与贡献，在名为开源的道路上迈出了第一步。
        </el-timeline-item>
        <el-timeline-item color="#00A2E8" timestamp="2022 年 3 月">
            辗转广州一家公司，承担电商、餐饮、零售、进销存等生态服务的调试优化、解耦拆分、软硬对接、日常维护。
        </el-timeline-item>
        <el-timeline-item color="#FF7F27" timestamp="2023 年 7 月">
            囿于 PyCharm 功能的不全，借助
            <Icon class="logo" height="24" icon="logos:kotlin-icon"/>
            手搓插件 TinySnake 用以解决 Python <code>__all__</code> 的生成和更新。
        </el-timeline-item>
        <el-timeline-item color="#FF7F27" timestamp="2024 年 4 月">
            注册
            <Icon class="logo" height="24" icon="logos:jetbrains"/>
            Marketplace 并正式发布 TinySnake 插件。
        </el-timeline-item>
        <el-timeline-item color="#FF7F27" timestamp="2024 年 7 月">
            受 <a href="https://plugins.jetbrains.com/vendor/fab53479-05ec-4e6d-a40e-05df95be4921">Csense</a> 系列启发，将
            TinySnake 拆分为多个 HooTool 系列小插件。
        </el-timeline-item>
        <el-timeline-item color="#FF7F27" timestamp="2024 年 11 月">
            从零手搓
            <Icon class="logo" height="24" icon="logos:vue"/>
            ＋
            <Icon class="logo" height="24" icon="logos:vitejs"/>
            ＋
            <Icon class="logo" height="24" icon="logos:element"/>
            个人网站并配置
            <Icon class="logo" height="24" icon="logos:nginx"/>
            域名转发，自此轰开前端大门。
        </el-timeline-item>
        <el-timeline-item color="#FF7F27" timestamp="2024 年 12 月">
            按图索骥从 Vue 生态了解到 Vitepress，于是有了这个博客。
        </el-timeline-item>
        <el-timeline-item color="#FF7F27" timestamp="2025 年 2 月">
            主站从
            <a href="https://aixcyi.cn/" target="_blank"><code>aixcyi.cn</code></a>
            迁移到更好记的
            <a href="https://ayuu.cc/" target="_blank"><code>ayuu.cc</code></a>
            。
        </el-timeline-item>
        <el-timeline-item timestamp="现在">
            编码已融入生活，而生活仍在继续……
        </el-timeline-item>
        <el-timeline-item :icon="Bottom" size="large">
            <i>有时明月无人夜，独向昭潭制恶龙</i>
        </el-timeline-item>
    </el-timeline>
</template>

<style scoped>
th, tr {
    background-color: var(--vp-c-bg) !important;
}

td {
    border: none !important;
}

ul {
    list-style: none !important;
}

li {
    margin-top: 0 !important;
}

.logo {
    display: inline;
    vertical-align: middle;
}
</style>
