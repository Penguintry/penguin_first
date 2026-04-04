<template>
    <div>
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="border: none; user-select: none;">
            
            <el-menu-item index="0" @click="$router.push('/home')">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="1" v-if="userInfo.role === '1'">

                <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>人员管理</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="$router.push('/student')">学生管理</el-menu-item>
                    <el-menu-item index="1-2" @click="$router.push('/teacher')">教师管理</el-menu-item>
                </el-menu-item-group>
                
            </el-submenu>


            <el-menu-item index="2" @click="$router.push('/course/examination')" v-if="userInfo.role === '1'">
                <i class="el-icon-s-check"></i>
                <span slot="title">课程审批</span>
            </el-menu-item>

            <el-menu-item index="3" @click="$router.push('/teaching/arrangement')" v-if="userInfo.role === '1'">
                <i class="el-icon-s-management"></i>
                <span slot="title">教学安排</span>
            </el-menu-item>

            <el-menu-item index="4" @click="$router.push('/select/course/center')" v-if="userInfo.role === '2'">
                <i class="el-icon-s-management"></i>
                <span slot="title">选课中心</span>
            </el-menu-item>

            <el-menu-item index="5" @click="$router.push('/student/course')" v-if="userInfo.role === '2'">
                <i class="el-icon-s-order"></i>
                <span slot="title">我的选课</span>
            </el-menu-item>
        

            <el-menu-item index="6" @click="$router.push('/course/application')" v-if="userInfo.role === '3'">
                <i class="el-icon-s-management"></i>
                <span slot="title">课程申请</span>
            </el-menu-item>

            <el-menu-item index="7" @click="$router.push('/teacher/course')" v-if="userInfo.role === '3'">
                <i class="el-icon-s-order"></i>
                <span slot="title">我的课程</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
import { getUserInfo } from '@/utils/storage.js'
export default {
    data() {
        return {
            userInfo: {}
        }
    },
    created() {
        this.getUserInfo()
    },
    methods: {
        //获取本地存储的用户信息
        getUserInfo() {
            const res = getUserInfo()
            this.userInfo = res
        }
    }
}
</script>

<style>

</style>