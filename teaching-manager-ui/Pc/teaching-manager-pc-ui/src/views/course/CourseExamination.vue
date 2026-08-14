<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.label" :name="item.name" v-for="item in tab" :key="item.id">
                <div class="container">
                    <el-empty description="暂无数据" v-if="applicationData.length === 0"></el-empty>
                    <CourseApplicationItem v-for="item in applicationData"  :courseApplicationId="item.courseApplicationId"
                    :isShowButton="isShowButton" @refresh="refresh()" :key="item.courseApplicationId" :if="applicationData.length > 0">
                        <template v-slot:userName>{{ item.teacherName }}</template>
                        <template v-slot:operation> {{ item.operationName }}</template>
                        <template v-slot:course>{{ item.courseName }}</template>
                        <template v-slot:dateTime>{{ item.dateTime }}</template>
                        <template v-slot:courseExaminationName>
                            <el-tag type="warning" size="mini" class="tag" v-if="item.courseExaminationName === '待审批'">
                                {{ item.courseExaminationName }}
                            </el-tag>
                            <el-tag type="success" size="mini" class="tag" v-if="item.courseExaminationName === '已通过'">
                                {{ item.courseExaminationName }}
                            </el-tag>
                            <el-tag type="danger" size="mini" class="tag" v-if="item.courseExaminationName === '未通过'">
                                {{ item.courseExaminationName }}
                            </el-tag>
                        </template>
                    </CourseApplicationItem>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import CourseApplicationItem from '@/components/CourseAppliactionItem.vue'
import { 
    getWaitExamination, 
    getAlreadyExamination
} from '@/api/course-examination/course-examination.js'
export default {
    data() {
        return {
            activeName: 'await',
            isShowButton: 'true',
            //tab数据项
            tab: [
                {
                    id: '1',
                    label: '待审批',
                    name: 'await'
                },
                {
                    id: '2',
                    label: '已审批',
                    name: 'already'         
                }
            ],
            applicationData: []     //申请记录
        }
    },
    components: {
        CourseApplicationItem: CourseApplicationItem
    },
    created() {
        this.getWaitInfo()
    },
    methods: {
        //更新页面
        refresh() {
            console.log(this.activeName)
            if (this.activeName === 'await') {
                this.getWaitInfo(this.tab[0].label)
                this.isShowButton = 'true'
            } 
            if (this.activeName === 'already') {
                this.getAlreadyInfo(this.tab[1].label)
                this.isShowButton = 'false'
            }
        },
        //获取所有待审批的记录
        async getWaitInfo() {
            const result = await getWaitExamination("待审批")
            if (result.data.code === 1) {
                this.applicationData = result.data.data
            }
        },
        //获取所有已经审批了的记录
        async getAlreadyInfo() {
            const result = await getAlreadyExamination("待审批")
            if (result.data.code === 1) {
                this.applicationData = result.data.data
            }
        },
        handleClick(tab) {
            const name = tab.$options.propsData.name
            switch(name) {
                case this.tab[0].name:
                    this.getWaitInfo(this.tab[0].label)
                    this.isShowButton = 'true'
                    break
                case this.tab[1].name:
                    this.getAlreadyInfo(this.tab[1].label)
                    this.isShowButton = 'false'
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