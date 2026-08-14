<!-- 登录之后进入到的页面框架 -->

<template>
    <div>
      <el-container>
        <el-header style="height: 10vh; border-bottom: 1px solid rgba(224, 220, 220, 0.096);">
            <Header></Header>
        </el-header>
        <el-container>
          <el-aside width="220px">
            <NavMenu></NavMenu>
          </el-aside>
          <el-container>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import NavMenu from '@/components/NavMenu.vue'
  export default {
    name: 'LayoutView',
    components: {
      NavMenu,
      Header
  }
  }
  </script>
  
  <style>
    .el-header {
      background-color: #545c64;
      color: white;
      text-align: center;
    }

    .el-aside {
      background-color: #545c64;
      color: #333;
      text-align: center;
      line-height: 200px;
      height: 90vh;
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
      height: 90vh;
     }

    body > .el-container {
      margin-bottom: 40px;
    }

  </style>
  