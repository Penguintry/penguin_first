package group.teachingmanagerhd.dto.member;
//查询学生信息的类
import group.teachingmanagerhd.vo.member.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueryStudentParam {
    private Integer pageSize;
    private Integer currentPage;
    private Student param;
}
