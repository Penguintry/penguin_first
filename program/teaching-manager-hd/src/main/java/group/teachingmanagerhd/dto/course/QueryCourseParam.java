package group.teachingmanagerhd.dto.course;

import group.teachingmanagerhd.vo.course.Course;
import lombok.Data;

@Data
public class QueryCourseParam {
    private Integer pageSize;       //页大小
    private Integer currentPage;    //当前页码
    private Course param;           //课程的查询参数
}
