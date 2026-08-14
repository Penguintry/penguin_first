<template>
  <div class="root">

    <!-- 搜素栏 -->
    <el-row  :gutter="20">
      <el-col :span="6">
        <div>
          <span style="vertical-align: middle;">学号：</span>
          <el-input
            placeholder="请输入学号"
            style="display: inline-block; width: 60%; vertical-align: middle;"
            size="small"
            v-model="queryStudentParam.param.studentNumber"
            >
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <span style="vertical-align: middle;">姓名：</span>
          <el-input
            placeholder="请输入姓名"
            style="display: inline-block; width: 60%; vertical-align: middle;"
            size="small"
            v-model="queryStudentParam.param.name"
            >
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <span style="vertical-align: middle;">班级：</span>
          <el-input
            placeholder="请输入班级"
            style="display: inline-block; width: 60%; vertical-align: middle;"
            size="small"
            v-model="queryStudentParam.param.studentClass"
            >
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-button type="primary" size="small" @click="getInfo">查 询</el-button>
          <el-button type="primary" size="small" @click="openDialog()">新 增</el-button>
          <el-button type="danger" @click="deleteSelectedData()" plain :disabled ="selectionStatus" size="small">删 除</el-button>
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
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
            prop="studentNumber"
            label="学号"
            width="200%">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="200%">
        </el-table-column>
        <el-table-column
            prop="studentClass"
            label="班级"
            width="200%">
        </el-table-column>
        <el-table-column
            prop="dateTime"
            label="最后操作时间"
            width="300%">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作">
            <template v-slot="scope">
            <el-button
              size="mini"
              @click="getInfoById(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogFormAddVisible" style="width: 50%; margin: 0 auto;">
      <el-form :model="form">
        <el-form-item label="学号：" label-width="60px">
          <el-input v-model="form.studentNumber" autocomplete="off"  style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" label-width="60px">
          <el-input v-model="form.name" autocomplete="off"  style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="班级：" label-width="60px">
          <el-input v-model="form.studentClass" autocomplete="off" style="width: 250px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 对话框（编辑） -->
    <el-dialog :title="title" :visible.sync="dialogFormEditionVisible" style="width: 50%; margin: 0 auto;">
      <el-form :model="form">
        <el-form-item label="学号：" label-width="60px">
          <el-input v-model="form.studentNumber" autocomplete="off"  style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" label-width="60px">
          <el-input v-model="form.name" autocomplete="off"  style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="班级：" label-width="60px">
          <el-input v-model="form.studentClass" autocomplete="off" style="width: 250px;"></el-input>
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
    getStudentsInfo, 
    insertStudentInfo, 
    deleteStudentInfo,
    getStudentInfoById,
    updateStudentInfoById 
  } from '@/api/member/stduent-manager'
  export default {
    data() {
      return {
        //查询参数
        queryStudentParam: {
          pageSize: 10,                   //页面的大小，默认为10
          currentPage: 1,                 //现在所处第几页
          param: {
            studentNumber: '',            //学号
            name: '',                     //姓名
            studentClass: ''              //班级
          }
        },
        selectedDataId: [],               //被选中的数据id
        selectionStatus: true,            //按钮的状态,false表示可以点击删除,true表示不能点击删除
        dialogFormAddVisible: false,      //控制新增的对话框是否显示
        dialogFormEditionVisible: false,  //控制编辑的对话框是否显示
        total: -1,                        //合计数据    
        tableData: [],                    //表格数据 
        //表单数据
        title: '新增',
        form: {
          studentId: '',                  //学生id
          studentNumber: '',              //学号
          name: '',                       //姓名
          studentClass: ''                //学生班级
        }
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      //向后台获取信息
      async getInfo() {
        const result = await getStudentsInfo(this.queryStudentParam)
        this.tableData = result.data.data
        this.total = result.data.total
        console.log(result)
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

      //打开新增对话框
      openDialog() {
        this.title = '新增'
        this.form.studentNumber = ''
        this.form.name = ''
        this.form.studentClass = ''
        this.dialogFormAddVisible = true
      },
      //新增一条学生信息 
      async insertInfo() {
        const result = await insertStudentInfo(this.form)
        console.log(result)
        this.dialogFormAddVisible = false
        this.$message({
            type: 'success',
            message: '新增成功!'
          })
        await this.getInfo()
      },

      //根据id查询学生信息,打开编辑对话框
      async getInfoById(e) {
        const result = await getStudentInfoById(e.studentId)
        console.log(result)
        this.title = '编辑'
        this.form.studentId = result.data.data.studentId
        this.form.studentNumber = result.data.data.studentNumber
        this.form.name = result.data.data.name
        this.form.studentClass = result.data.data.studentClass
        this.dialogFormEditionVisible = true
      },
      //编辑之后更新一条学生信息
      async updateInfo() {
        const result = await updateStudentInfoById(this.form)
        console.log(result)
        this.dialogFormEditionVisible = false
        await this.getInfo()
        this.$message({
            type: 'success',
            message: '操作成功!'
        })
      },

      //删除一条学生信息
      handleDelete(row) {
        console.log(row)
        this.$confirm('您确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {   
          const result = await deleteStudentInfo(row.studentId)
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
      //删除所选中的数据
      deleteSelectedData() {
        this.$confirm('您确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await deleteStudentInfo(this.selectedDataId)
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
      }
    }
  }
</script>

<style scoped>
  .root {
    text-align: center;
  }
</style>