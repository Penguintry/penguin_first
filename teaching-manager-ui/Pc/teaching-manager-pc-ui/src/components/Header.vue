<template>
    <div class="header">
        <div class="left">
            <img src="../assets/logo.png" alt="logo">
            <span>教 务 管 理 系 统</span>
        </div>
        <div class="right">
            <span>{{ userInfo.name }}</span>
            <el-dropdown :hide-on-click="false" class="el-dropdown-link" style="margin-left: 14px;">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><div @click="open()">修改密码</div></el-dropdown-item>
                    <el-dropdown-item><div @click="logOut()">退出登录</div></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>




        <el-dialog title="修改密码" :visible.sync="dialogFormAddVisible" style="width: 60%; margin: 0 auto;">
            <el-form :model="form" size="small">
                <el-form-item label="新密码：" label-width="100px">
                <el-input v-model="form.password" autocomplete="off"  style="width: 250px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEditionVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyPassword()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
import { getUserInfo, removeUserInfo, removeUserLoginToken } from '@/utils/storage.js'
import { modifyUserPassword } from '@/api/login/login.js'
export default {
    name: 'HeaderMenu',
    data() {
        return {
            userInfo: {},
            dialogFormAddVisible: false,
            form: {
                userId: '',
                password: '',
                authority: ''
            }
        }
    },
    created() {
        this.userInfo = getUserInfo()
    },
    methods: {
        open() {
            this.dialogFormAddVisible = true
        },
        //修改密码
        async modifyPassword() {
            this.form.userId = this.userInfo.id
            this.form.authority = this.userInfo.role
            const result = await modifyUserPassword(this.form)
            if (result.data.code === 1) {
                this.$message({
                    type: "success",
                    message: "修改密码成功！"
                })
            }
            this.form.password = ''
            this.dialogFormAddVisible = false
        },
        //退出登录
        logOut() {
            this.$confirm('确定退出？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {   
                removeUserInfo()
                removeUserLoginToken()
                await this.$router.push('/login')
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消退出'
                })   
            })
        }
    }
}
</script>

<style scoped>
    .header {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        user-select: none;
    }
    .left {
        position: absolute;
        left: 0;
        align-self: center;
        height: 46%;
        font-size: large;
    }
    .left > img {
        height: 100%;
        margin-right: 20px;
    }
    
    .right {
        position: absolute;
        right: 0;
        align-self: center;
        width: 200px;
        height: 54%;
        user-select: none;
        font-size: 12px;
    }

    .el-dropdown-link {
        margin-left: 4px;
        cursor: pointer;
        color: #d4d8dc;
    }

</style>