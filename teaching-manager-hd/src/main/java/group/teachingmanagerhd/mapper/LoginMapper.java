package group.teachingmanagerhd.mapper;

import group.teachingmanagerhd.dto.login.ModifyPasswordParam;
import group.teachingmanagerhd.vo.member.Administrator;
import group.teachingmanagerhd.vo.member.Student;
import group.teachingmanagerhd.vo.member.Teacher;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface LoginMapper {

    //查询需要登录的管理员信息
    @Select("select * from administrator where account = #{account} and AES_DECRYPT(UNHEX(password), '2307140202') = #{password}")
    Administrator administratorLogin(String account, String password);

    /* 查询需要登录的学生信息 */
    @Select("select * from student where student_number = #{account} and AES_DECRYPT(UNHEX(password), '2307140202') = #{password}")
    Student studentLogin(String account, String password);

    /* 查询需要登录的教师信息 */
    @Select("select * from teacher where teacher_number = #{account} and AES_DECRYPT(UNHEX(password), '2307140202') = #{password}")
    Teacher teacherLogin(String account, String password);

    /* 更新管理员的密码 */
    @Update("update administrator set password = #{password} where administrator_id = #{userId}")
    void updateAdministratorPassword(ModifyPasswordParam data);

    /* 更新学生的密码 */
    @Update("update student set password = #{password} where student_id = #{userId}")
    void updateStudentPassword(ModifyPasswordParam data);

    /* 更新教师的信息 */
    @Update("update teacher set password = #{password} where teacher_id = #{userId}")
    void updateTeacherPassword(ModifyPasswordParam data);

}

