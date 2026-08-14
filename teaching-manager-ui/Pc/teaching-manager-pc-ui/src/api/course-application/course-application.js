import requst from '@/utils/request.js'

//申请新增一门课程
export const applyANewCourse = (form) => {
    return requst.post('/apply/add/course', form)
}

//根据id查询全部申请记录
export const getAllApplicationByTeacherId = (teacherId) => {
    return requst.get('/all/application?teacherId=' + teacherId)
}

//根据id审批状态查询记录
export const getApplicationByTeacherIdAndExaminationName = (teacherId, courseExaminationName) => {
    return requst.get('/application?teacherId=' + teacherId + '&courseExaminationName=' + courseExaminationName)
}

//根据申请id查询一条申请记录
export const getCourseAppliactionById = (courseApplicationId) => {
    return requst.get('/get/application?courseApplicationId=' + courseApplicationId)
}
 
 