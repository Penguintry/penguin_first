<!-- 教师课程详情页 -->
<template>
    <div>
        <CourseDetailHeader>
          <template v-slot:title>{{ courseInfo.name }}</template>
          <template v-slot:tag>
            <el-tag
                type="warning"
                size="mini"
                style="margin-left: 8px;"
              >
                {{ courseInfo.courseStatusName }}
            </el-tag>
          </template>
          <template v-slot:time>{{ courseInfo.time }}</template>
          <template v-slot:placeName>{{ courseInfo.placeName }}</template>
          <template v-slot:description>{{ courseInfo.description }}</template>
        </CourseDetailHeader>
        <div>
            <el-tabs>
                <el-tab-pane label="学生列表">
                    <el-table
                    :data="student"
                    height="50vh"
                    style="width: 100%;">
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="220%">
                        </el-table-column>
                        <el-table-column
                            prop="studentNumber"
                            label="学号"
                            width="220%">
                        </el-table-column>
                        <el-table-column
                            prop="studentClass"
                            label="班级"
                            width="220%">
                        </el-table-column>
                        <el-table-column
                            prop="score"
                            label="成绩"
                            width="220%">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template v-slot="scope">
                            <el-button type="text" size="small" @click="setScore(scope.row)">评分</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>


        <!-- 对话框 -->
        <el-dialog title="评分" :visible.sync="dialogFormVisible" style="width: 60%; margin: 0 auto;">
          <el-form :model="form">
            <el-form-item label="成绩：">
              <el-input v-model="form.score" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateStudentScore()">确 定</el-button>
          </div>
      </el-dialog>

    </div>
</template>

<script>
import CourseDetailHeader from '@/components/CourseDetailHeader.vue'
import { getSelectTheCourseStudents, getCourseById, updateStudentScore } from '@/api/course/course.js'
export default {
    data() {
      return {
        dialogFormVisible: false, //控制对话框是否显示
        courseId: '',//课程id
        courseInfo: {}, //课程信息
        student: [],
        form: {
          score: '',  //成绩
          courseId: '',
          studentId: ''
        }
      }
    },
    components: {
        CourseDetailHeader
    },
    created() {
      this.getCourseById()
      this.getSelectTheCourseStudents()
    },
    methods: {
      //查询选择了某门课的学生
      async getSelectTheCourseStudents() {
         const result = await getSelectTheCourseStudents(this.courseId)
         if (result.data.code === 1) {
          this.student = result.data.data
         }
      },
      //根据课程id查询相应的课程信息
      async getCourseById() {
        this.courseId = this.$route.query.courseId
        const result = await getCourseById(this.$route.query.courseId)
        console.log(result)
        if (result.data.code === 1) {
          this.courseInfo = result.data.data
        }
      },

      //评分
      setScore(row) {
        if (this.courseInfo.courseStatusName != '已结课') {
          this.$message({
            type: 'warning',
            message: '课程未结课，不能评分！'
          })
          return
        }
        this.form.courseId = this.courseInfo.courseId
        this.form.studentId = row.studentId
        this.dialogFormVisible = true
      },

      //提交评分（学生成绩）
      async updateStudentScore() {
        await updateStudentScore(this.form)
        this.dialogFormVisible = false
        await this.getSelectTheCourseStudents()
      }

    }
}
</script>

<style scoped>

</style>