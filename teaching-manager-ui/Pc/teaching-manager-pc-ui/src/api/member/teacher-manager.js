import requst from '@/utils/request.js'

//查询学院信息
export const getDepartmentInfo = () => {
    return requst.get('/departments')
}

//查询教师信息
export const getTeachersInfo = (queryTeacherParam) => {
    return requst.post('/teachers', queryTeacherParam)
}

//新增一条教师信息
export const insertTeacherInfo = (form) => {
    return requst.post('/teacher', form)
}   

//根据id删除教师信息
export const deleteTeacherInfo = (teacherId) => {
    return requst.delete('/teachers/' + teacherId)
}

//根据id查询教师信息
export const getTeacherInfoById = (teacherId) => {
    return requst.get('/get/teacher?teacherId=' + teacherId)
}

//修改教师信息（后端根据id进行修改）
export const updateTeacherInfoById = (form) => {
    return requst.put('/modify/teacher', form)
}

//获取所有教师的信息
export const getAllTeacher = () => {
    return requst.get('/get/teachers')
}