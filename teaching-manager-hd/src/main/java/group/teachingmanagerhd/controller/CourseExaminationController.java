package group.teachingmanagerhd.controller;
//课程审核控制：教师提交-审批人查询并执行操作-查看审批历史
import group.teachingmanagerhd.dto.application.CourseApplication;
import group.teachingmanagerhd.service.CourseExaminationService;
import group.teachingmanagerhd.utils.ReturnResult.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class CourseExaminationController {

    @Autowired
    CourseExaminationService courseExaminationService;

    //查询所有待审批的数据
    @GetMapping("/wait/examination")
    public Result getWaitExamination(String examinationName) {
        ArrayList<CourseApplication> data = courseExaminationService.getWaitExamination(examinationName);
        return new Result().success(data);
    }

    //查询所有已审批的数据
    @GetMapping("/already/examination")
    public Result getAlreadyExamination(String examinationName) {
        ArrayList<CourseApplication> data = courseExaminationService.getAlreadyExamination(examinationName);
        return new Result().success(data);
    }

    //审批一条记录
    @PostMapping("/course/examination")
    public Result examineACourse(@RequestBody CourseApplication json) {
        try {
            courseExaminationService.examineACourse(json);
            return new Result().success();
        } catch (Exception e) {
            return new Result().error(e.getMessage());
        }
    }

}
