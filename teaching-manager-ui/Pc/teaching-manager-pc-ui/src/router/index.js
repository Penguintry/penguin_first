import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login.vue'
import Layout from '@/views/Layout.vue'
import Home from '@/views/Home.vue'
import StudentManager from '@/views/member/StudentManager.vue'
import TeacherManager from '@/views/member/TeacherManager.vue'
import CourseApplication from '@/views/course/CourseApplication.vue'
import CourseExamination from '@/views/course/CourseExamination.vue'
import TeacherCourse from '@/views/manager/TeacherCourse.vue'
import StudentCourse from '@/views/manager/StudentCourse.vue'
import TeacherCourseDetail from '@/views/manager/TeacherCourseDetail.vue'
import TeachingArrrangement from '@/views/course/TeachingArrangement.vue'
import SelectCourseCenter from '@/views/course/SelectCourseCenter.vue'
import { checkLogin } from '@/api/login/login.js'
import { getUserInfo } from '@/utils/storage.js'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: "history",
    routes: [
        { 
          path: '/', 
          redirect: '/home'
        },
        { 
          path: '/login', 
          component: Login 
        },
        { 
          path: '/layout', 
          component: Layout, 
          children: [
            { path: '/home', component: Home},
            { path: '/student', component: StudentManager },
            { path: '/teacher', component: TeacherManager },
            { path: '/course/application', component: CourseApplication },
            { path: '/course/examination', component: CourseExamination },
            { path: '/teacher/course', component: TeacherCourse },
            { path: '/student/course', component: StudentCourse },
            { path: '/teacher/course/detail', component: TeacherCourseDetail },
            { path: '/teaching/arrangement', component: TeachingArrrangement },
            { path: '/select/course/center', component: SelectCourseCenter }
          ]
        }

    ]
})

//配置游客可以访问的界面
const touristVisitUrl = ['/login']

//全局路由前置守卫
router.beforeEach( async (to, from, next) => {
  if (touristVisitUrl.includes(to.path)) {
    next()
  } else {
    const userInfo = getUserInfo()
    const result = await checkLogin(userInfo)
    if (result.data.code == 0) {
      next('/login')
      Vue.prototype.$message.error('登录超时，请重新登录！')
    }
    next()
  }
})

export default router