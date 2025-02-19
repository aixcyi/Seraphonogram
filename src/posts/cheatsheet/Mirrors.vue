<script lang="ts" setup>
import CopyTextField from "@/components/CodeCopyField.vue";
import type { integer } from "@vue/language-server";

const mirrors = [
    { site: 'https://mirrors.ustc.edu.cn/', name: '中国科技大学' },
    { site: 'https://mirrors.tuna.tsinghua.edu.cn/', name: '清华大学' },
    { site: 'https://mirrors.sustech.edu.cn/about/', name: '南方科技大学' },
    { site: 'https://mirrorz.org/', name: 'MirrorZ' },
    { site: 'https://mirrors.huaweicloud.com/os/image', name: '华为云' },
    { site: 'https://developer.aliyun.com/mirror/', name: '阿里云' },
    { site: 'https://mirrors.cloud.tencent.com/', name: '腾讯云' },
    { site: 'https://mirrors.163.com/', name: '网易' },
    { site: 'https://msdn.itellyou.cn/', name: 'MSDN, I Tell You' },
]

const pypiSources = [
    { index: `https://mirrors.ustc.edu.cn/pypi/simple`, name: '中科大' },
    { index: 'https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple', name: '清华大学' },
    { index: 'https://pypi.tuna.tsinghua.edu.cn/simple', name: '清华大学（TUNA 镜像站）' },
    { index: 'https://mirrors.sustech.edu.cn/pypi/web/simple', name: '南方科技大学' },
    { index: 'https://mirrors.cloud.aliyuncs.com/pypi/simple/', name: '阿里云' },
    { index: 'https://mirrors.huaweicloud.com/repository/pypi/simple', name: '华为云' },
    { index: 'https://mirrors.163.com/pypi/simple/', name: '网易' },
    { index: 'https://pypi.douban.com/simple', name: '豆瓣' },
].map(
    item => ({ ...item, host: new URL(item.index).hostname })
)

const npmSources = [
    { registry: 'https://registry.npmjs.org/', name: 'npm 官方' },
    { registry: 'https://npmreg.proxy.ustclug.org/', name: '中科大（只是反向代理）' },
    { registry: 'https://registry.npmmirror.com', name: '淘宝' },
    { registry: 'https://npm.aliyun.com', name: '阿里云' },
    { registry: 'https://mirrors.cloud.tencent.com/npm/', name: '腾讯云' },
    { registry: 'https://mirrors.huaweicloud.com/repository/npm/', name: '华为云' },
    { registry: 'https://mirrors.163.com/npm/', name: '网易' },
].map(
    item => ({ ...item, host: new URL(item.registry).hostname })
)

function isLastMirror(_index: integer): boolean {
    return _index < mirrors.length - 1
}
</script>

<template>
    <RevisionInfo><!-- TODO: 不知道为什么无法传参 -->
        <div class="paragraph">
            常见镜像站点有
            <span v-for="(mirror, index) in mirrors">
                <a :href="mirror.site">{{ mirror.name }}</a>
                <span v-if="isLastMirror(index)">、</span>
            </span>，排名不分先后，站点各有侧重，选择适合即可。以下是不同包管理的镜像源设置：<br/>
        </div>
    </RevisionInfo>

    <h2 id="pypi">PyPI 镜像源</h2>
    <div class="tip custom-block">
        <p class="custom-block-title">查看全局设置</p>
        <p>
            <CopyTextField
                :multiple="true"
                :text="`pip config get global.index-url\npip config get global.trusted-host`">
            </CopyTextField>
        </p>
    </div>
    <div class="info custom-block">
        <p class="custom-block-title">清除全局设置</p>
        <p>
            <CopyTextField
                :multiple="true"
                :text="`pip config unset global.index-url\npip config unset global.trusted-host`">
            </CopyTextField>
        </p>
    </div>
    <p>
        以下所有命令，<br/>
        单行的是安装时的命令，复制后直接接上需要安装的包名即可，比如 <code>requests</code> ；<br/>
        双行的是全局设置的命令，设置之后全局生效；<br/>
        两者选一个复制使用即可。<br/>
    </p>
    <template v-for="src in pypiSources">
        <h3 :id="`pypi.${src.host}`">{{ src.name }}</h3>
        <p>
            <CopyTextField
                :multiple="false"
                :text="`pip install -i ${src.index} --trusted-host ${src.host}`">
            </CopyTextField>
        </p>
        <p>
            <CopyTextField
                :multiple="true"
                :text="`pip config set global.index-url ${src.index}\npip config set global.trusted-host ${src.host}`">
            </CopyTextField>
        </p>
    </template>

    <h2 id="npm">npm 镜像源</h2>
    <div class="tip custom-block">
        <p class="custom-block-title">查看设置</p>
        <p>
            <CopyTextField
                :multiple="false"
                :text="`npm config get registry`">
            </CopyTextField>
        </p>
    </div>
    <div class="info custom-block">
        <p class="custom-block-title">清除设置</p>
        <p>npm 默认就是官方的镜像源。</p>
        <p>
            <CopyTextField
                :multiple="false"
                :text="`npm config set registry https://registry.npmjs.org/`">
            </CopyTextField>
        </p>
    </div>
    <p>
        以下所有命令，<br/>
        第一行是安装时的命令，复制后直接接上需要安装的包名即可，比如 <code>vue</code> ；<br/>
        第二行是全局设置的命令，设置之后全局生效；<br/>
        两者选一个复制使用即可。<br/>
    </p>
    <template v-for="src in npmSources">
        <h3 :id="`npm.${src.host}`">{{ src.name }}</h3>
        <p>
            <CopyTextField
                :multiple="false"
                :text="`npm --registry ${src.registry} install`">
            </CopyTextField>
        </p>
        <p>
            <CopyTextField
                :multiple="false"
                :text="`npm config set registry ${src.registry}`">
            </CopyTextField>
        </p>
    </template>
</template>

<style scoped>
</style>
