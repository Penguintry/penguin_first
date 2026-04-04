<!-- 首页 -->
<template>
    <div>
        <div class="block" style="background-color: rgb(27, 29, 31);">
            <el-carousel height="500px">
            <el-carousel-item>
                <div style="background-image: url('https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/001Y6PUIgy1gtqmxtvgjcj61lu0u0h2502-imagetourl.cloud-1769542436929-pvz3qt.jpg');"></div>
            </el-carousel-item>
            <el-carousel-item>
                <div style="background-image: url('https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/6b8c14f8gy1hc2vdg5dr8j21gk0nj7ax-imagetourl.cloud-1769541752113-gxgtks.jpg');"></div>
            </el-carousel-item>
            <el-carousel-item>
                <div style="background-image: url('https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/1-imagetourl.cloud-1769541751829-zr6evs.jpg');"></div>
            </el-carousel-item>
            <el-carousel-item>
                <div style="background-image: url('https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/001Y6PUIgy1gtqmxtnuylj61lu0u07hs02-imagetourl.cloud-1769542436863-vapqka.jpg');"></div>
            </el-carousel-item>
            </el-carousel>
        </div>
        <div style="width: 100%;">
            <el-calendar v-model="value"></el-calendar>
        </div>

    </div>
</template>


<script>
export default {
    name: 'HomeView',
    data() {
      return {
        value: new Date()
      }
    }
}
</script>

<style scoped>
    .block div {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }
</style>