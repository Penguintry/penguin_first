package group.teachingmanagerhd.dto.login;

import lombok.Data;

@Data
public class LoginParam {
    private String account;     //账号（学号/工号）
    private String password;    //密码
    private String authority;   //身份权限
}
