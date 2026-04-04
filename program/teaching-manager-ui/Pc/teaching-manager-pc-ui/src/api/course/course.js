import requst from '@/utils/request.js'

//根据课程id获取一个课程的信息
export const getCourseById = (courseId) => {
    return requst.get('/get/course?courseId=' + courseId)
}

//条件查询课程信息
export const getCourseByCondition = (form) => {
    return requst.post('/get/condition/course', form)
}

//获取地点信息
export const getAllPlace = () => {
    return requst.get('/get/all/place')
}

//新增一门课程
export const insertANewCourse = (form) => {
    return requst.post('/insert/course', form)
}

//更新课程信息
export const updateCourse = (form) => {
    return requst.post('/update/course', form)
}

//删除课程信息
export const deleteCourse = (form) => {
    return requst.post('/delete/course', form)
}

//获取选课的开启或关闭状态
export const getCourseSwitchStatus = () => {
    return requst.get('/course/switch/status')
} 

//批量更新课程的状态信息
export const updateCourseStatus = (courseSwitchStatus) => {
    return requst.put('/update/course/status?courseSwitchStatus=' + courseSwitchStatus)
}

//学生选课
export const studentSelectCourse = (form) => {
    return requst.post('/student/select/course', form)
}

//判断学生是否选择了该门课程
export const judgeCourseSelectedStatus = (form) => {
    return requst.post('/select/course/status', form)
}

//学生退课
export const exitCourse = (form) => {
    return requst.post('/exit/course', form)
}

//根据学生id查询选课信息
export const getAllSelectedCourse = (studentId) => {
    return requst.get('/student/select/course?studentId=' + studentId)
}

//根据教师id查询课程信息
export const getTeacherCourse = (teacherId) => {
    return requst.get('/teacher/course/by/id?teacherId=' + teacherId)
}

//查询选择了某一门课的学生
export const getSelectTheCourseStudents = (courseId) => {
    return requst.get('/get/select/the/course/students?courseId=' + courseId)
}

//学生评分（成绩）
export const updateStudentScore = (form) => {
    return requst.post('/update/student/score', form)
}