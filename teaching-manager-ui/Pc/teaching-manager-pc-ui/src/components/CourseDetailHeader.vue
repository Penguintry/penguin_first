<!-- 课程头部 -->
<template>
    <div class="root">
        <div class="left"></div>
        <div class="right">
            <div class="title">
                <slot name="title">概率论与数理统计</slot>
                <slot name="tag">
                    <el-tag
                        type="warning"
                        size="mini"
                        style="margin-left: 8px;">
                        授课中
                    </el-tag>
                </slot>
            </div>
            <div class="font">
                上课时间：<slot name="time">每周五五六节</slot>
            </div>
            <div class="font">
                上课地点：<slot name="placeName">6A-520</slot>
            </div>
            <div class="font">
                简介：<slot name="description">探讨数学中的概率与统计相关内容</slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .root {
        overflow: hidden;
        width: 100%;
        height: 26vh;
    }
    .left {
        display: inline-block;
        width: 30%;
        height: 100%;
        border-radius: 10px;
        background-image: url('../assets/book.jpg');
        background-repeat: round;
    }
    .right {
        display: inline-block;
        margin-left: 20px;
        padding: 12px;
        width: 54%;
        height: 100%;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
    }
    .title {
        position: relative;
        font-size: 24px;
        font-weight: 550;
    }
    .font {
        padding-top: 10px;
        font-size: x-small;
        color: rgb(84, 82, 82);
    }
</style>