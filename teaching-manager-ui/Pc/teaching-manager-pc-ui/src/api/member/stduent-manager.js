import requst from '@/utils/request.js'

//查询学生信息
export const getStudentsInfo = (queryStudentParam) => {
    return requst.post('/students', queryStudentParam)
}

//新增一条学生信息
export const insertStudentInfo = (form) => {
    return requst.post('/student', form)
}   

//根据id删除学生信息
export const deleteStudentInfo = (studentId) => {
    return requst.delete('/students/' + studentId)
}

//根据id查询学生信息
export const getStudentInfoById = (studentId) => {
    return requst.get('/get/student?studentId=' + studentId)
}

//修改学生信息（后端根据id进行修改）
export const updateStudentInfoById = (form) => {
    return requst.put('/modify/student', form)
}