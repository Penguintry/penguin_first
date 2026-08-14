<template>
    <div style="root">
      <el-empty description="暂无课程" v-if="teacherCourse.length === 0"></el-empty>
      <CourseItem v-for="item in teacherCourse" :key="item.courseId" @gotoCourseDetail="goToCourseDetail(item.courseId)">
          <template v-slot:title>{{ item.name }}</template>
      </CourseItem>
    </div>
</template>

<script>
import CourseItem from '@/components/CourseItem.vue'
import { getTeacherCourse } from '@/api/course/course.js'
import { getUserInfo } from '@/utils/storage.js'
export default {
  data() {
    return {
      teacherId: '',
      teacherCourse: []
    }
  },
  components: {
    CourseItem
  },
  created() {
    const userInfo = getUserInfo()
    this.teacherId = userInfo.id
    this.getTeacherCourse()
  },
  methods: {
    async getTeacherCourse() {
        const res = await getTeacherCourse(this.teacherId)
        console.log(res)
        if (res.data.code === 1) {
          this.teacherCourse = res.data.data
        }
    },
    goToCourseDetail(courseId) {
      console.log(courseId)
      this.$router.push({
        path: '/teacher/course/detail',
        query: {courseId}
      })
    }
  }
}
</script>

<style scoped>

</style>

