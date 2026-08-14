package group.teachingmanagerhd.dto.login;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ModifyPasswordParam extends LoginParam {
    private String userId;      //登录用户id
}
