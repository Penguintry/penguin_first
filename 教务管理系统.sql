create table administrator
(
    administrator_id int auto_increment
        primary key,
    name             varchar(15) null comment '姓名',
    account          varchar(45) null comment '账号',
    password         varchar(45) null comment '密码'
)
    comment '管理员（教务处）';

create table course_examination
(
    course_examination_id int auto_increment
        primary key,
    name                  varchar(20) null comment '审批流程中的名称',
    constraint name_UNIQUE
        unique (name)
)
    comment '课程审批表';

create table course_status
(
    course_status_id int auto_increment
        primary key,
    name             varchar(45) null comment '状态名称'
)
    comment '课程状态';

create table course_switch
(
    course_switch_id int auto_increment
        primary key,
    status           int not null comment '1代表启动选课，0代表关闭选课'
)
    comment '课程的开启与关闭表';

create table department
(
    department_id int auto_increment
        primary key,
    name          varchar(45) null comment '学院名称',
    constraint name_UNIQUE
        unique (name)
)
    comment '学院信息表';

create table operation
(
    operation_id int auto_increment
        primary key,
    name         varchar(30) null comment '操作名称'
)
    comment '用户操作信息表，如新增，删除，修改等';

create table place
(
    place_id int auto_increment
        primary key,
    name     varchar(45) null comment '地点名称'
)
    comment '地点';

create table student
(
    student_id     int auto_increment
        primary key,
    student_number varchar(45)                           null comment '学生学号',
    name           varchar(15)                           null comment '学生姓名',
    student_class  varchar(45)                           null comment '学生班级',
    date_time      datetime    default CURRENT_TIMESTAMP null comment '最后操作时间',
    password       varchar(255) default '123456'          null comment '密码',
    constraint student_number_UNIQUE
        unique (student_number)
)
    comment '学生信息表';

create table courses_students
(
    courses_students_id int auto_increment
        primary key,
    course_id           int   null comment '课程id',
    student_id          int   null comment '学生id',
    score               float null comment '课程成绩',
    constraint students
        foreign key (student_id) references student (student_id)
            on update cascade on delete cascade
)
    comment '课程与学生之间的选择（学生选课，课程被选）';

create index students_idx
    on courses_students (student_id);

create table teacher
(
    teacher_id     int auto_increment
        primary key,
    name           varchar(15)                           null comment '教师姓名',
    teacher_number varchar(45)                           null comment '教师工号',
    department_id  int                                   null comment '学院id',
    date_time      datetime    default CURRENT_TIMESTAMP null comment '最后操作时间',
    password       varchar(45) default '123456'          null comment '密码',
    constraint teacher_number_UNIQUE
        unique (teacher_number),
    constraint teacher_department
        foreign key (department_id) references department (department_id)
)
    comment '教师信息表';

create table course
(
    course_id        int auto_increment
        primary key,
    name             varchar(30)   null comment '课程名称',
    teacher_id       int           null comment '任课教师',
    credit           varchar(5)    null comment '学分',
    hour             varchar(20)   null comment '学时',
    time             varchar(45)   null comment '上课时间(可能需要改进)',
    place_id         int           null comment '地点id',
    description      text          null comment '简介描述',
    course_status_id int           null comment '课程状态',
    is_delete        int default 0 null comment '0代表没有删除，1代表已经删除了。',
    constraint course_place
        foreign key (place_id) references place (place_id)
            on update cascade on delete set null,
    constraint course_status
        foreign key (course_status_id) references course_status (course_status_id),
    constraint course_teacher
        foreign key (teacher_id) references teacher (teacher_id)
            on update cascade on delete set null
)
    comment '课程信息表';

create index course_place_idx
    on course (place_id);

create index course_status_idx
    on course (course_status_id);

create index course_teacher_idx
    on course (teacher_id);

create table course_application
(
    course_application_id int auto_increment
        primary key,
    teacher_id            int                                null comment '教师的id(申请人)',
    course_id             int                                null comment '课程id',
    course_name           varchar(45)                        null comment '课程名称',
    course_credit         varchar(5)                         null comment '学分',
    course_hour           varchar(5)                         null comment '学时',
    course_time           varchar(45)                        null comment '上课时间（可能需要改进）',
    course_place_id       int                                null comment '上课地点id',
    course_description    text                               null comment '课程描述',
    course_examination_id int                                null comment '课程审批状态',
    operation_id          int                                null comment '申请的操作，有新增，修改和删除。',
    date_time             datetime default CURRENT_TIMESTAMP null comment '申请时间',
    constraint course_id_UNIQUE
        unique (course_id),
    constraint application_examination
        foreign key (course_examination_id) references course_examination (course_examination_id),
    constraint application_operation
        foreign key (operation_id) references operation (operation_id),
    constraint application_place
        foreign key (course_place_id) references place (place_id)
            on update cascade on delete set null,
    constraint application_teacher
        foreign key (teacher_id) references teacher (teacher_id)
            on update cascade on delete cascade
)
    comment '课程申请记录表';

create index application_examination_idx
    on course_application (course_examination_id);

create index application_operation_idx
    on course_application (operation_id);

create index application_place_idx
    on course_application (course_place_id);

create index application_teacher_idx
    on course_application (teacher_id);

create index teacher_department_idx
    on teacher (department_id);


INSERT INTO `administrator` (`administrator_id`, `name`, `account`, `password`) VALUES ('1', '管理员', 'root', '123456');

INSERT INTO `course_examination` (`course_examination_id`, `name`) VALUES ('1', '待审批'), ('2', '已通过'), ('3', '未通过');

INSERT INTO `course_status` (`course_status_id`, `name`) VALUES ('1', '等待课程安排'), ('2', '可选'), ('3', '已结课'), ('4', '授课中'), ('5', '待选');

INSERT INTO `course_switch` (`course_switch_id`, `status`) VALUES ('1', '0');

INSERT INTO `department` (`department_id`, `name`) VALUES ('1', '计算机与电子信息学院'), ('2', '工商管理学院'), ('3', '土木工程学院'), ('4', '海洋学院'), ('5', '机械学院'), ('6', '文学院'), ('7', '艺术学院'), ('8', '法学院');

INSERT INTO `operation` (`operation_id`, `name`) VALUES ('1', '新增'), ('2', '修改'), ('3', '删除');

INSERT INTO `place` (`place_id`, `name`) VALUES ('1', '6A-429'), ('2', '东10A-211'), ('3', '西2-102'), ('4', '西3-302'), ('5', '6A-312'), ('6', '6A-520'), ('7', '西3-301'), ('8', '西2-202'), ('9', '东10B-501'), ('10', '6A-211');

UPDATE administrator SET password = HEX(AES_ENCRYPT(password, '2307140202'));
UPDATE teacher SET password = HEX(AES_ENCRYPT(password, '2307140202'));
UPDATE student SET password = HEX(AES_ENCRYPT(password, '2307140202'));