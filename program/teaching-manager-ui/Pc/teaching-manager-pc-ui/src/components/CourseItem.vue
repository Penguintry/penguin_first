<!-- 课程列表项信息 -->
<template>
    <div class="root" @click="gotoDetail()">
        <div class="photo"></div>
        <div class="title">
            <slot name="title">概率论与数理统计</slot>
        </div>
        <div class="footer">
            <el-button type="text">查看详情</el-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        gotoDetail() {
            this.$emit('gotoCourseDetail')
        }
    }
}
</script>

<style scoped>
    .root {
        position: relative;
        top: 0;
        display: inline-block;
        margin: 21px;
        width: 200px;
        height: 240px;
        border-radius: 10px;
        background-color: rgb(255, 252, 252);
        box-shadow: 2px 2px 20px 1px rgba(180, 177, 177, 0.753);
        cursor: pointer;
        transition: all 400ms;
    }
    .root:hover {
        position: relative;
        top: -2px;
        box-shadow: 2px 2px 20px 2px rgba(122, 122, 122, 0.932);
        transition: all 400ms;
    }
    .photo {
        width: 100%;
        height: 68%;
        border-radius: 10px 10px 0 0;
        background-image: url("https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/1-imagetourl.cloud-1769541751829-zr6evs.jpg");
        background-size: cover;
    }
    .title {
        padding-left: 8px;
        width: 100%;
        height: 16%;
        line-height: 40px;
        font-weight: 550;
    }
    .footer {
        width: 100%;
        height: 16%;
        text-align: right;
        padding-right: 8px;
    }
</style>
