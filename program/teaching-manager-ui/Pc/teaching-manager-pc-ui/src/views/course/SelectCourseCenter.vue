<template>
    <div class="root">
  
      <!-- 搜素栏 -->
      <el-row  :gutter="20">
        <el-col :span="8">
          <div>
            <span style="vertical-align: middle;">课程名称：</span>
            <el-input
              placeholder="请输入课程名称"
              style="display: inline-block; width: 60%; vertical-align: middle;"
              size="small"
              v-model="queryStudentParam.param.name"
              >
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span style="vertical-align: middle;">教师：</span>
            <el-input
              placeholder="请输入教师姓名"
              style="display: inline-block; width: 60%; vertical-align: middle;"
              size="small"
              v-model="queryStudentParam.param.teacherName"
              >
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-button type="primary" size="small" @click="getInfo" style="width: 30%;">查 询</el-button>
          </div>
        </el-col>
      </el-row>
  
      <!-- 数据表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="70vh"
        >
            <el-table-column
                prop="name"
                label="课程名称"
                width="150%">
            </el-table-column>
            <el-table-column
                prop="teacherName"
                label="教师"
                width="150%">
            </el-table-column>
            <el-table-column
                prop="credit"
                label="学分"
                width="150%">
            </el-table-column>
            <el-table-column
                prop="hour"
                label="学时"
                width="150%">
            </el-table-column>
            <el-table-column
                prop="time"
                label="上课时间"
                width="150%">
            </el-table-column>
            <el-table-column
                prop="placeName"
                label="上课地点"
                width="170%">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200%">
                <template v-slot="scope">
                <el-button
                    size="mini"
                    type="primary"
                    plain @click="openCourseDetail(scope.row)">详情</el-button>

                <el-button
                    size="mini"
                    @click="selectTheCourse(scope.row)"
                    type="primary"
                    >选课</el-button>

                <!-- <el-button
                    size="mini"
                    @click="exitTheCourse(scope.row)"
                    type="warning"
                   >退课</el-button> -->

                </template>
            </el-table-column>
        </el-table>
  
        <!-- 详情表单 -->
        <el-dialog :visible.sync="dialogFormVisible">
            <el-descriptions title="详情" :column="2" border>
                <el-descriptions-item label="课程名称">{{ detailCourseData.name }}</el-descriptions-item>
                <el-descriptions-item label="教师">{{ detailCourseData.teacherName }}</el-descriptions-item>
                <el-descriptions-item label="学分">{{ detailCourseData.credit }}</el-descriptions-item>
                <el-descriptions-item label="学时">{{ detailCourseData.hour }}</el-descriptions-item>
                <el-descriptions-item label="上课时间">{{ detailCourseData.time }}</el-descriptions-item>
                <el-descriptions-item label="上课地点">{{ detailCourseData.placeName }}</el-descriptions-item>
                <el-descriptions-item label="课程简介">{{ detailCourseData.description }}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryStudentParam.currentPage"
        :page-sizes="[5,10, 15, 20, 25]"
        :page-size="queryStudentParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 14px;">
      </el-pagination>
  
    </div>
  </template>
    
  <script>
    import { getUserInfo } from '@/utils/storage'
    import { 
        getCourseByCondition,
        studentSelectCourse
        // judgeCourseSelectedStatus
        // exitCourse
    } from '@/api/course/course'
    export default {
      data() {
        return {
            //查询参数
            queryStudentParam: {
                pageSize: 10,                   //页面的大小，默认为10
                currentPage: 1,                 //现在所处第几页
                param: {
                    name: '',                   //课程名称
                    teacherName: '',            //教师名称
                    courseStatusId: '2'         //课程状态
                }
            },
            total: -1,                          //合计数据    
            tableData: [],                      //表格数据 
            dialogFormVisible: false,           //控制是否显示详情
            detailCourseData: {},               //详情
            //表单信息
            form: {
                courseId: '',
                studentId: ''
            }
        }
      },
      created() {
        const userInfo = getUserInfo()
        this.form.studentId = userInfo.id
        this.getInfo()
      },
      methods: {
        //向后台获取信息
        async getInfo() {
          const result = await getCourseByCondition(this.queryStudentParam)
          this.tableData = result.data.data
          this.total = result.data.total
        },
        //处理页面大小的改变
        handleSizeChange(e) {
          this.queryStudentParam.pageSize = e
          this.getInfo()
        },
        //处理当前页数的改变
        handleCurrentChange(e) {
          console.log(e)
          this.queryStudentParam.currentPage = e
          this.getInfo()
        },

        //详情表单
        openCourseDetail(row) {
            this.detailCourseData = row
            this.dialogFormVisible = true
        },

        //选课
        selectTheCourse(row) {
            // console.log(row)
            this.$confirm('您确定选择这门课程吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {   
                this.form.courseId = row.courseId
                const result = await studentSelectCourse(this.form)
                if (result.data.code === 1) {
                    this.$message({
                        type: 'success',
                        message: '选课成功！'
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '您已经选择了该课程，可前往我的课程查看'
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消选课'
                })   
            })
        },
      }
    }
  </script>
  
  <style scoped>
    .root {
      text-align: center;
    }
  </style>