<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { VPButton } from "vitepress/theme";

const messages = [
    [ '页面不小心被猫猫嗷呜一口吃掉了', '去看看其它页面吧' ],
    [ '树洞之大，猫猫一口吞……下了！', 'Σ(っ °Д °;)っ' ],
    [ '世上本没有路', '只是走的人多了，也便成了路', '点点这个圆圆的按钮' ],
    [ '前方即将抵达秦朝', '请陛下沐浴更衣登基为秦始皇', '或者' ],
    [ '这也许是岁月史书的一页', '但它或许早已消失于世界树中' ],
    [ '时间就像海绵里的水', '……，总还是会蒸发的', '所以趁此良机' ],
    [ '页面已不知去往何方', '我在这头是寒冬，你在那头还好吗' ],
    [ '别再刷新啦，朋友，这真的是最后一条了', '相信我，秦始皇怎么会骗你呢' ],
]

function getMessage() {
    return messages[Math.floor(Math.random() * messages.length)]
}
</script>

<template>
    <div class="container">
        <div class="main">
            <p class="row">
                <Icon class="icon" height="96" icon="vs:neko"/>
            </p>
            <p class="row quote">
                <template v-for="msg in getMessage()">
                    <span>{{ msg }}</span><br/>
                </template>
            </p>
            <p class="row">
                <VPButton href="/" text="回到树洞" theme="sponsor"/>
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    justify-content: center;

    .main {
        display: block;

        .row {
            text-align: center;
            margin-bottom: 16px;
        }
    }
}

.icon {
    display: inline;
}

.quote {
    color: var(--vp-c-text-2);
}
</style>
