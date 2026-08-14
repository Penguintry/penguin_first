<!-- 课程申请表单 -->
<template>
    <div class="root">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="课程名称：">
                <el-input v-model="form.courseName" placeholder="请输入课程名称"/>
            </el-form-item>
            <el-form-item label="课程学分：">
                <el-select v-model="form.courseCredit" placeholder="请选择学分" style="width: 100%;">
                    <el-option v-for="item in credits" :label="item" :value="item" :key="item"/>
                </el-select>
            </el-form-item>
            <el-form-item label="课程学时：">
                <el-input v-model="form.courseHour" placeholder="请输入学时"/>
            </el-form-item>
            <el-form-item label="课程简介：">
                <el-input type="textarea" v-model="form.courseDescription"/>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="onSubmit" style="width: 140px; position: relative;right: 20px;">提 交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { applyANewCourse } from '@/api/course-application/course-application.js'
import { getUserInfo } from '@/utils/storage.js'
export default {
    data() {
      return {
        //可选取的学分
        credits: ['1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0'],
        //表单数据
        form: {
            teacherId: '',                      //教师id
            courseName: '',                     //课程名称
            courseCredit: '',                   //课程学分
            courseHour: '',                     //学时
            courseDescription: '',              //简介描述  
            operationName: '新增',              //操作名称
            courseExaminationName: '待审批'   
        }
      }
    },
    created() {
        this.form.teacherId = getUserInfo().id
    },  
    methods: {
        
        async submitInfo() {
            const result = await applyANewCourse(this.form)
            console.log(result)
        },
        onSubmit() {
            this.$confirm('确定提交吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.submitInfo()
                this.form.courseName = '',
                this.form.courseCredit = '',
                this.form.courseHour = '',
                this.form.courseDescription = '',
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消提交'
                })        
            })
        }
    }
}
</script>

<style scoped>
    .root {
        width: 60vh;
    }
</style>