<template>
    <div class="back"> 
        <div>
            <h1>教 务 管 理 系 统</h1>
            <div class="block">
                <el-form ref="ruleForm" label-width="60px" status-icon>
                    <el-form-item label="账号：" prop="pass">
                        <el-input type="text" v-model="form.account" autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="checkPass">
                        <el-input type="password" v-model="form.password" autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="身份：" prop="checkPass">
                        <el-radio v-model="form.authority" label="1">管理员</el-radio>
                        <el-radio v-model="form.authority" label="2">学生</el-radio>
                        <el-radio v-model="form.authority" label="3">教师</el-radio>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0;" label-width="0px">
                        <el-button @click="login()" type="primary" size="small" style="width: 120px;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/login/login.js'
import { saveUserLoginToken, saveUserInfo } from '@/utils/storage.js'
export default {
    name: 'LoginView',
    data() {
        return {
            form: {
                password: '',
                account: '',
                authority: '',
            }
        }
    },
    methods: {
        async login() {
            const result = await login(this.form)
            console.log(result)
            if (result.data.code === 1) {
                await this.saveInfo(result.data.data)
                this.$nextTick(()=> {
                    this.$nextTick(()=>{this.$router.push('/home')})
                })
            } else {
                this.$message({
                    type: 'error',
                    message: '账号或密码错误！'
                })
            }
        },
        //存储后端返回的数据
        async saveInfo(data) {
            saveUserLoginToken(data.token)
            saveUserInfo(data)
        }
    }
}
</script>

<style scoped>
    .back {
        user-select: none;
        position: relative;
        width: 100%;
        height: 100vh;
        text-align: center;
        background-image: url('../../assets/login_bk.png');
    }
    .back > div {
        position: absolute;
        top: 42%;
        left: 80%;
        transform: translate(-50%,-50%);
        width: 30%;
        height: 40%;
    }
    h1 {
        color: white;
        opacity: 0.8;
        margin-bottom: 2%;
    }
    .block {
        margin:0 auto;
        padding: 4% 10%;
        width: 70%;
        background-color: rgba(255, 255, 255,0.8);
        border-radius: 8px;
        box-shadow: 2px 2px 4px 3px #4d4d4875;
    }
</style>