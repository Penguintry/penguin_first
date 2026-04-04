import requst from '@/utils/request.js'

//查询所有待审批的数据
export const getWaitExamination = (examinationName) => {
    return requst.get('/wait/examination?examinationName=' + examinationName)
}

//查询所有已审批的数据
export const getAlreadyExamination = (examinationName) => {
    return requst.get('/already/examination?examinationName=' + examinationName)
}

//审批记录
export const examineACourse = (form) => {
    return requst.post('/course/examination', form)
}