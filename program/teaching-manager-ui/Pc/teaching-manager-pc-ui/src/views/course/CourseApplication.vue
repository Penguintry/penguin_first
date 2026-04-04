<template>
    <div class="root">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="user-select: none;">
            <el-tab-pane :label="item.label" :name="item.name" v-for="item in tab" :key="item.id">
                <div class="container">
                    <el-empty description="暂无数据" v-if="applicationData.length === 0"></el-empty>
                    <CourseApplicationItem v-for="item in applicationData" :courseApplicationId="item.courseApplicationId"
                    isShowButton="false" @refresh="refresh" :key="item.courseApplicationId" :if="applicationData.length > 0">
                        <template v-slot:userName>{{ item.teacherName }}</template>
                        <template v-slot:operation> {{ item.operationName }}</template>
                        <template v-slot:course>{{ item.courseName }}</template>
                        <template v-slot:dateTime>{{ item.dateTime }}</template>
                        <template v-slot:courseExaminationName>
                            <el-tag type="warning" size="mini" class="tag" v-if="item.courseExaminationName === tab[1].label">
                                {{ item.courseExaminationName }}
                            </el-tag>
                            <el-tag type="success" size="mini" class="tag" v-if="item.courseExaminationName === tab[2].label">
                                {{ item.courseExaminationName }}
                            </el-tag>
                            <el-tag type="danger" size="mini" class="tag" v-if="item.courseExaminationName === tab[3].label">
                                {{ item.courseExaminationName }}
                            </el-tag>
                        </template>
                    </CourseApplicationItem>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-edit-outline"></i> 申 请</span>
                <CourseApplicationForm></CourseApplicationForm>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import CourseApplicationForm from '@/components/CourseApplicationForm.vue'
import CourseApplicationItem from '@/components/CourseAppliactionItem.vue'
import { 
    getAllApplicationByTeacherId,
    getApplicationByTeacherIdAndExaminationName
} from '@/api/course-application/course-application.js'
import { getUserInfo } from '@/utils/storage.js'
export default {
    data() {
        return {
            activeName: 'all',
            //tab数据项
            tab: [
                {
                    id: '1',
                    label: '全部',
                    name: 'all'
                },
                {
                    id: '2',
                    label: '待审批',
                    name: 'await'
                },
                {
                    id: '3',
                    label: '已通过',
                    name: 'pass'
                },
                {
                    id: '4',
                    label: '未通过',
                    name: 'no-pass'
                }
            ],
            //申请记录
            courseApplication: {
                courseApplicationId: '',        //课程申请id
                teacherId: '',                 //教师id
                teacherName: '',                //教师名称
                courseId: '',                   //课程id
                courseName: '',                 //课程名称
                courseCredit: '',               //课程学分
                courseHour: '',                 //课程学时
                courseTime: '',                 //授课时间
                coursePlaceId: '',              //授课地点id
                coursePlaceName: '',            //授课地点名称
                courseDescription: '',          //课程描述
                courseExaminationId: '',        //审批状态id
                courseExaminationName: '',      //审批状态名称
                operationId: '',                //操作id
                operationName: '',              //操作名称
                dateTime: ''                    //申请时间
            },
            applicationData: []   //申请记录
        }
    },
    components: {
        CourseApplicationForm,
        CourseApplicationItem: CourseApplicationItem
    },
    async created() {
        const userInfo = getUserInfo()
        this.courseApplication.teacherId = userInfo.id
        await this.getAllApplication()
    },
    methods: {
        //更新页面
        refresh() {
            console.log(this.activeName)
            for (let i = 0; i < this.tab.length; i++) {
                if (this.tab[i].name === this.activeName) {
                    this.getConditionApplication(this.tab[i].label)
                    break;
                }
            }
        },
        //获取全部审批项
        async getAllApplication() {
            const result = await getAllApplicationByTeacherId(this.courseApplication.teacherId)
            console.log(result)
            if (result.data.code === 1) {
                this.applicationData = result.data.data
            }
        },
        //根据条件获取相应审批项
        async getConditionApplication(courseExaminationName) {
            const teacherId = this.courseApplication.teacherId
            const result = await getApplicationByTeacherIdAndExaminationName(teacherId,courseExaminationName)
            if (result.data.code === 1) {
                this.applicationData = result.data.data
            }
        },
        //tab栏切换事件
        handleClick(tab) {
            console.log(tab.$options.propsData.name)
            const name = tab.$options.propsData.name
            switch(name) {
                case this.tab[0].name:
                    this.getAllApplication()
                    break
                case this.tab[1].name:
                    this.getConditionApplication(this.tab[1].label)
                    break
                case this.tab[2].name:
                    this.getConditionApplication(this.tab[2].label)
                    break
                case this.tab[3].name:
                    this.getConditionApplication(this.tab[3].label)
                    break
                default:
                    break
            }
        }
    }
}
</script>

<style scoped>
    .container {
        overflow-y: auto;
        height: 76vh;
        width: 100%;
    }
</style>
