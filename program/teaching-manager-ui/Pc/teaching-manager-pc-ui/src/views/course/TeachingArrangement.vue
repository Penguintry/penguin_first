<template>
    <div class="root">
  
      <!-- 搜素栏 -->
      <el-row  :gutter="20">
        <el-col :span="6">
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
        <el-col :span="6">
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
        <el-col :span="6">
          <div>
            <el-button type="primary" size="small" @click="getInfo">查 询</el-button>
            <el-button type="primary" plain size="small" @click="openDialog()">新 增</el-button>
          </div>
        </el-col>

        <el-col :span="6">
          <div style="padding-top: 8px;">
                <span style="vertical-align: middle;">选 课：</span>
                <el-switch
                    v-model="courseSwitchStatus"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleSwitchChange">
                </el-switch>
          </div>
        </el-col>
      </el-row>
  
      <!-- 数据表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="70vh"
        @selection-change="handleSelectionChange">
          <el-table-column
              prop="name"
              label="课程名称"
              width="125%">
          </el-table-column>
          <el-table-column
              prop="teacherName"
              label="教师"
              width="125%">
          </el-table-column>
          <el-table-column
              prop="credit"
              label="学分"
              width="125%">
          </el-table-column>
          <el-table-column
              prop="hour"
              label="学时"
              width="125%">
          </el-table-column>
          <el-table-column
              prop="time"
              label="上课时间"
              width="125%">
          </el-table-column>
          <el-table-column
              prop="placeName"
              label="上课地点"
              width="125%">
          </el-table-column>
          <el-table-column
              prop="courseStatusName"
              label="课程状态"
              width="125%">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="300%">
              <template v-slot="scope">
                <el-button
                  size="mini"
                  @click="getInfoById(scope.row)"
                  type="primary"
                  plain>排课</el-button>
                  <el-button
                  size="mini"
                  type="warning"
                  plain
                  @click="endCourse(scope.row)">结课</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="deleteCourse(scope.row)"
                  plain>删除</el-button>
              </template>
          </el-table-column>
      </el-table>
  
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
  
      <!-- 对话框（新增） -->
      <el-dialog :title="title" :visible.sync="dialogFormAddVisible" style="width: 60%; margin: -20px auto 0;">
       
        <el-form :model="form" size="small">
          <el-form-item label="课程名称：" label-width="100px">
            <el-input v-model="form.name" autocomplete="off"  style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="教师：" label-width="100px">
            <el-select v-model="form.teacherId" placeholder="请选择教师" style="width: 250px;">
                <el-option v-for="item in teacher" :label="item.name" :value="item.teacherId" :key="item.teacherId"/>
            </el-select>
          </el-form-item>
          <el-form-item label="学分：" label-width="100px">
            <el-select v-model="form.credit" placeholder="请选择学分" style="width: 250px;">
                <el-option v-for="item in credits" :label="item" :value="item" :key="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="学时：" label-width="100px">
            <el-input v-model="form.hour" autocomplete="off"  style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="上课时间：" label-width="100px">
            <el-input v-model="form.time" autocomplete="off"  style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="上课地点：" label-width="100px">
            <el-select v-model="form.placeId" placeholder="请选择地点" style="width: 250px;">
                <el-option v-for="item in place" :label="item.placeName" :value="item.placeId" :key="item.placeId"/>
            </el-select>
          </el-form-item>
          <el-form-item label="简介：" label-width="100px">
            <el-input type="textarea" v-model="form.description"  style="width: 250px; resize: none;"/>
            <!-- <textarea style="resize: none;width: 250px;height: 80px; border: 2px solid rgb(220,223,230);"  v-model="form.description"></textarea> -->
          </el-form-item>
        </el-form>

        <div slot="footer">
          <el-button @click="dialogFormAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertInfo()">确 定</el-button>
        </div>

      </el-dialog>
  
      <!-- 对话框（编辑） -->
      <el-dialog :title="title" :visible.sync="dialogFormEditionVisible" style="width: 60%; margin: 0 auto;">
        
        <el-form :model="form" size="small">
          <el-form-item label="课程名称：" label-width="100px">
            <el-input v-model="form.name" autocomplete="off"  style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="教师：" label-width="100px">
            <el-select v-model="form.teacherId" placeholder="请选择教师" style="width: 250px;">
                <el-option v-for="item in teacher" :label="item.name" :value="item.teacherId" :key="item.teacherId"/>
            </el-select>
          </el-form-item>
          <el-form-item label="学分：" label-width="100px">
            <el-select v-model="form.credit" placeholder="请选择学分" style="width: 250px;">
                <el-option v-for="item in credits" :label="item" :value="item" :key="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="学时：" label-width="100px">
            <el-input v-model="form.hour" autocomplete="off"  style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="上课时间：" label-width="100px">
            <el-input v-model="form.time" autocomplete="off"  style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="上课地点：" label-width="100px">
            <el-select v-model="form.placeId" placeholder="请选择地点" style="width: 250px;">
                <el-option v-for="item in place" :label="item.placeName" :value="item.placeId" :key="item.placeId"/>
            </el-select>
          </el-form-item>
          <el-form-item label="简介：" label-width="100px">
            <el-input type="textarea" v-model="form.description"  style="width: 250px; resize: none;"/>
            <!-- <textarea style="resize: none;width: 250px;height: 80px; border: 2px solid rgb(220,223,230);"  v-model="form.description"></textarea> -->
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEditionVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateInfo()">确 定</el-button>
        </div>
      </el-dialog>
  
    </div>
  </template>
    
  <script>
    import { 
        getCourseByCondition,
        getAllPlace,
        insertANewCourse,
        updateCourse,
        deleteCourse,
        getCourseSwitchStatus,
        updateCourseStatus
    } from '@/api/course/course'
    import { getAllTeacher } from '@/api/member/teacher-manager'
    export default {
      data() {
        return {
            courseSwitchStatus: '',
            //查询参数
            queryStudentParam: {
                pageSize: 10,                   //页面的大小，默认为10
                currentPage: 1,                 //现在所处第几页
                param: {
                    name: '',                   //课程名称
                    teacherName: ''             //教师名称
                }
            },
            selectedDataId: [],                 //被选中的数据id
            selectionStatus: true,              //按钮的状态,false表示可以点击删除,true表示不能点击删除
            dialogFormAddVisible: false,        //控制新增的对话框是否显示
            dialogFormEditionVisible: false,    //控制编辑的对话框是否显示
            total: -1,                          //合计数据    
            tableData: [],                      //表格数据 
            //可选取的学分
            credits: ['1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0'],
            //表单数据
            title: '新增',
            form: {
                name: '',                       //课程名称
                teacherId: '',                  //教师id
                teacherName: '',                //教师名称
                credit: '',                     //学分
                hour: '',                       //学时
                time: '',                       //上课时间
                placeId: '',                    //上课地点id
                placeName: '',                  //上课地点
                description: '',                //课程描述
                courseStatusId: '5',            //课程状态id
                courseStatusName: '待选'         //课程状态
            },
            //上课地点
            place: [],
            //所有教师
            teacher: []
        }
      },
      created() {
        this.getCourseSwitchStatus()
        this.getInfo()
      },
      methods: {
        //向后台获取信息
        async getInfo() {
          const result = await getCourseByCondition(this.queryStudentParam)
          this.tableData = result.data.data
          this.total = result.data.total
          console.log(result)
        },
        //获取选课是否开启的状态信息
        async getCourseSwitchStatus() {
          const result = await getCourseSwitchStatus()
          if (result.data.code === 1) {
            this.courseSwitchStatus = result.data.data
          }
        },  
        //获取所有地点
        async getPlace() {
            const result = await getAllPlace()
            this.place = result.data.data
        },
        //获取所有教师信息
        async getTeacher() {
            const result = await getAllTeacher()
            this.teacher = result.data.data
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
        //批量修改课程状态信息
        async updateCourseStatus(courseSwitchStatus) {
          const result = await updateCourseStatus(courseSwitchStatus)
          console.log(result)
        },
        //处理切换按钮点击事件
        handleSwitchChange(e) {
          console.log(e)
          console.log(this.courseSwitchStatus)
          if (e === '1') {
            this.$confirm('您确定开启选课吗？开启后，所有待选课程将激活，变为可选状态。', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {   
                this.courseSwitchStatus = '1' 
                await this.updateCourseStatus(this.courseSwitchStatus)
                await this.getInfo()
                this.$message({
                  type: 'success',
                  message: '选课已开启'
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消开启'
                })   
                this.courseSwitchStatus = '0'     
            })
          }
          if (e === '0') {
            this.$confirm('您确定关闭选课吗？关闭后，所有可选课程将处于授课状态。', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {   
                this.courseSwitchStatus = '0'  
                await this.updateCourseStatus(this.courseSwitchStatus)
                await this.getInfo()
                this.$message({
                  type: 'success',
                  message: '选课已关闭，开始进入授课'
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消关闭'
                })   
                this.courseSwitchStatus = '1'     
            })
          }
        },  
  
        //打开新增对话框
        openDialog() {
            this.getPlace()
            this.getTeacher()
            this.title = '新增'
            this.form.studentNumber = ''
            this.form.name = ''
            this.form.studentClass = ''
            this.dialogFormAddVisible = true
        },
        //新增一条学生信息 
        async insertInfo() {
          const result = await insertANewCourse(this.form)
          console.log(result)
          this.dialogFormAddVisible = false
          this.$message({
              type: 'success',
              message: '新增成功!'
            })
          await this.getInfo()
        },

        //根据id查询课程信息,打开编辑对话框
        async getInfoById(e) {
            if (e.courseStatusName !== '等待课程安排' && e.courseStatusName !== '待选') {
                this.$message({
                    type: 'warning',
                    message: '课程未处于等待课程安排或待选阶段，不能排课哦~'
                })
                return
            }
            console.log(e)
            this.title = '排课'
            this.form = e
            await this.getPlace()
            await this.getTeacher()
            this.dialogFormEditionVisible = true
        },
        //编辑之后更新一条学生信息
        async updateInfo() {
            if (this.form.placeId == null || this.form.time == null) {
                this.$message({
                    type: 'warning',
                    message: '排课的地点和上课时间不能为空数据！'
                })
                return
            }
            this.form.courseStatusId = '5'
            this.form.courseStatusName = '待选'
            const result = await updateCourse(this.form)
            console.log(result)
            this.dialogFormEditionVisible = false
            await this.getInfo()
            this.$message({
                type: 'success',
                message: '操作成功!'
            })
        },
  
        //结课
        async endCourse(row) {
            if (row.courseStatusName !== '授课中') {
                this.$message({
                    type: 'warning',
                    message: '课程处于授课中才能选择结课哦~'
                })
                return
            }
            this.$confirm('您确定结课吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {   
                this.form = row
                this.form.courseStatusId = '3'
                const result = await updateCourse(this.form)
                console.log(result)
                this.$message({
                type: 'success',
                message: '操作成功!'
                })
                await this.getInfo()
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消操作'
                })        
            })
        },

        //删除一条课程信息
        deleteCourse(row) {
          console.log(row)
          if (row.courseStatusName !== '等待课程安排' && row.courseStatusName !== '待选') {
            this.$message({
                    type: 'warning',
                    message: '课程处在可选、授课中或结课状态，不能删除！'
            })
            return
          }
          this.$confirm('您确定删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {   
            const result = await deleteCourse(row)
            console.log(result)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            await this.getInfo()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })        
          })
        },
        
        //处理数据的选择情况
        handleSelectionChange(e) {
          console.log(e)
          this.selectionStatus = e.length <= 0;
          this.selectedDataId = []
          for (let i = 0; i < e.length; i++) {
            this.selectedDataId.push(e[i].studentId)
          }
          console.log(this.selectedDataId)
        },

      }
    }
  </script>
  
  <style scoped>
    .root {
      text-align: center;
    }
  </style>