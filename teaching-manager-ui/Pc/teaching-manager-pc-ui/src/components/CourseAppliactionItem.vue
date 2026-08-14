<!-- 课程申请列表项 -->
<template>
    <div>
        <div class="root" @click="openDialog()">
            <div style="margin-left: 20px;">
                <el-avatar src="https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/001Y6PUIgy1gtqmxu4y9vj61jb0rdk5y02-imagetourl.cloud-1769542436908-4112zb.jpg"></el-avatar>
            </div>
            <div style="margin-left: 10px;">
                <div  class="userName-font">
                    <slot name="userName">用户名</slot>
                </div>
                <div class="application-font">
                    请求<slot name="operation"></slot>一门课程 "<slot name="course">概率论</slot>"
                </div>
            </div>  
            <div class="right">
                <slot name = "courseExaminationName">
                    <el-tag type="warning" size="mini" class="tag">
                        待审批
                    </el-tag>
                </slot>
                <div class="date-font">
                <slot name="dateTime">2023-01-05 12:12:25</slot>
                </div>
            </div>  
        </div>

        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogFormVisible">
            <el-descriptions :title="title" :column="2" border>
                <el-descriptions-item label="课程名称">{{ newData.courseName }}</el-descriptions-item>
                <el-descriptions-item label="教师">{{ newData.teacherName }}</el-descriptions-item>
                <el-descriptions-item label="学分">{{ newData.courseCredit }}</el-descriptions-item>
                <el-descriptions-item label="学时">{{ newData.courseHour }}</el-descriptions-item>
                <el-descriptions-item label="上课时间">{{ newData.courseTime }}</el-descriptions-item>
                <el-descriptions-item label="上课地点">{{ newData.coursePlaceName }}</el-descriptions-item>
                <el-descriptions-item label="课程简介">{{ newData.courseDescription }}</el-descriptions-item>
            </el-descriptions>

            <el-descriptions title="修改前的数据" column="2" border style="margin-top: 20px;" v-if="newData.operationName === '修改'">
                <el-descriptions-item label="课程名称">{{ originalData.name }}</el-descriptions-item>
                <el-descriptions-item label="教师">{{ originalData.teacherName }}</el-descriptions-item>
                <el-descriptions-item label="学分">{{ originalData.credit }}</el-descriptions-item>
                <el-descriptions-item label="学时">{{ originalData.hour }}</el-descriptions-item>
                <el-descriptions-item label="上课时间">{{ originalData.time }}</el-descriptions-item>
                <el-descriptions-item label="上课地点">{{ originalData.placeName }}</el-descriptions-item>
                <el-descriptions-item label="课程简介">{{ originalData.description }}</el-descriptions-item>
            </el-descriptions>

            <div slot="footer" class="dialog-footer" v-if="isShowButton === 'true'">
                <el-button @click="agreeOrNot('未通过')">不通过</el-button>
                <el-button type="primary" @click="agreeOrNot('已通过')">通 过</el-button>
            </div>

        </el-dialog>

    </div>
</template>

<script>
import { getCourseAppliactionById } from '@/api/course-application/course-application.js'
import { examineACourse } from '@/api/course-examination/course-examination.js'
import { getCourseById } from '@/api/course/course.js'
export default {
    data() {
        return {
            dialogFormVisible: false,
            //标题
            title: '详情',
            //申请的新的数据
            newData: {},
            //原来的数据
            originalData: {}
        }
    },
    props: {
        //将课程申请的id传过来
        courseApplicationId: {
            type: String
        },
        //控制审批按钮是否显示
        isShowButton: {
            type: String
        }
    },
    methods: {
        async getCourseInfoById() {
            const res = await getCourseById(this.newData.courseId)
            if (res.data.code === 1) {
                this.originalData = res.data.data
            }
        },
        async openDialog() {
            //打开对话框，利用从父组件中传过来的id获取到相应的数据
            const result = await getCourseAppliactionById(this.courseApplicationId)
            this.newData = result.data.data
            const operationName = result.data.data.operationName
            console.log(this.isShowButton)
            if (this.isShowButton === 'true') {
                switch(operationName) {
                    case '新增':
                        this.title = '申请新增'
                        break
                    case '修改':
                        this.title = '修改后的数据'
                        await this.getCourseInfoById()
                        break
                    case '删除':
                        this.title = '申请删除'
                        break
                    default:
                        break
                }
            }
            this.dialogFormVisible = true
        },
        //是否同意教师的申请
        async agreeOrNot(name) {
            this.newData.courseExaminationName = name
            await examineACourse(this.newData)
            this.dialogFormVisible = false
            this.$emit('refresh')//告知父组件更新页面
            this.$message({
                type: 'success',
                message: '操作成功！'
            })
        }
    }
}
</script>

<style scoped>
    .root {
        position: relative;
        display: flex;
        margin-bottom: 12px;
        width: 100%;
        height: 80px;
        background-color: rgba(250, 249, 249, 0.978);
        border-radius: 7px;
        cursor: pointer;
    }
    .root > div {
        align-self: center;
    }
    .userName-font {
        font-size: small;
        color: rgba(0, 0, 0, 0.695);
        margin-bottom: 2%;
    }
    .application-font {
        font-size: medium;
        font-weight: 550;
        color: rgba(0, 0, 0, 0.77);
    }
    .right {
        position: absolute;
        text-align: right;
        right: 26px;
    }
    .tag {
        text-align: right;
        margin-bottom: 26%;
    }
    .date-font {
        font-size:x-small;
        color: rgba(0, 0, 0, 0.626);
    }
</style>