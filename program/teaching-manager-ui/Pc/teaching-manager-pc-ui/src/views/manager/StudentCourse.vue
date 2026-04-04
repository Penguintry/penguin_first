<template>
    <div>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="70vh"
        >
          <el-table-column
              prop="name"
              label="课程名称"
              width="130%">
          </el-table-column>
          <el-table-column
              prop="teacherName"
              label="教师"
              width="130%">
          </el-table-column>
          <el-table-column
              prop="credit"
              label="学分"
              width="130%">
          </el-table-column>
          <el-table-column
              prop="hour"
              label="学时"
              width="130%">
          </el-table-column>
          <el-table-column
              prop="time"
              label="上课时间"
              width="130%">
          </el-table-column>
          <el-table-column
              prop="placeName"
              label="上课地点"
              width="130%">
          </el-table-column>
          <el-table-column
              prop="courseStatusName"
              label="课程状态"
              width="130%">
          </el-table-column>
          <el-table-column
              prop="score"
              label="课程成绩"
              width="130%">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="150%">
                <template v-slot="scope">
                    <el-button
                    size="mini"
                    @click="handleExitCourse(scope.row)"
                    type="warning"
                    plain>退课</el-button>
                </template>
          </el-table-column>
      </el-table>
    </div>
</template>


<script>
import { exitCourse, getAllSelectedCourse } from '@/api/course/course.js'
import { getUserInfo } from '@/utils/storage.js'
export default {
    data() {
        return  {
            studentId: '',
            tableData: []
        }
    },
    created() {
        this.studentId = getUserInfo().id
        this.getAllSelectedCourse()
    },
    methods: {
        //根据学生id查询选课信息
        async getAllSelectedCourse() {
            const result = await getAllSelectedCourse(this.studentId)
            if (result.data.code === 1) {
                this.tableData = result.data.data
            }
        },
        //退课
        async exitCourse(row) {
            const form = {
                courseId: row.courseId,
                studentId: this.studentId
            }
            const result = await exitCourse(form)
            console.log(result)
        },

        //处理退课
        handleExitCourse(row) {
            if (row.courseStatusName === '授课中' || row.courseStatusName === '已结课') {
                this.$message({
                    type: 'warning',
                    message: '授课中和已结课的课程不支持退课！'
                }) 
                return
            } 
            this.$confirm('您确定退选该门课程吗？', '提示', {   
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {   
                await this.exitCourse(row)
                this.$message({
                  type: 'success',
                  message: '退课成功'
                })
                await this.getAllSelectedCourse()
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消退课'
                })   
            })
        }


    }

}
</script>

<style>

</style>