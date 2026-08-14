# 教务管理系统

基于 **Spring Boot + Vue2** 的前后端分离教务管理系统，实现了管理员、教师、学生三种角色的协同工作，涵盖**人员管理、课程申请与审批、教学安排、学生选课、成绩录入**等完整业务闭环。

> 本项目为《数据库原理及安全》课程的课程设计，数据库部分实现了敏感信息加密存储（密码 AES 加密、JWT 鉴权）。

---

## 目录

- [功能简介](#功能简介)
- [技术栈](#技术栈)
- [系统架构](#系统架构)
- [项目结构](#项目结构)
- [数据库设计](#数据库设计)
- [接口说明](#接口说明)
- [安全设计](#安全设计)
- [快速开始](#快速开始)
- [默认账号](#默认账号)

---

## 功能简介

系统按角色提供不同功能模块：

### 管理员（role: 1）
| 模块 | 说明 |
|------|------|
| 人员管理 | 学生管理、教师管理：支持条件查询、分页、新增、批量/单条删除、编辑 |
| 课程审批 | 查看教师的课程申请（新增/修改/删除），对待审批记录执行「通过 / 不通过」操作 |
| 教学安排 | 课程维护：新增课程、排课（设置时间/地点）、结课、删除；以及选课总开关控制（开启后待选→可选，关闭后可选→授课中） |

### 教师（role: 3）
| 模块 | 说明 |
|------|------|
| 课程申请 | 填写课程信息提交「新增课程」申请，按审批状态（待审批/已通过/未通过）查看申请记录及详情 |
| 我的课程 | 以卡片形式展示名下课程，进入课程详情查看选课学生列表，课程结课后可为学生评分 |

### 学生（role: 2）
| 模块 | 说明 |
|------|------|
| 选课中心 | 浏览当前处于「可选」状态的课程，查看详情并选课 |
| 我的选课 | 查看已选课程、上课时间地点及成绩，未开课/未结课的课程可退课 |

所有角色登录后均可在顶栏 **修改密码**、**退出登录**。

---

## 技术栈

| 层次 | 技术 |
|------|------|
| 前端 | Vue 2.6、Vue Router 3.6、Vuex 3.6、Element UI 2.15、Axios 1.6、@vue/cli 5 |
| 后端 | Java 17、Spring Boot 3.1.5、MyBatis 3.0.2（注解 + XML 混用）、Maven |
| 数据库 | MySQL 8 |
| 安全 | JWT（jjwt 0.9.1）、MySQL AES_ENCRYPT / AES_DECRYPT 密码加密 |
| 其他 | Lombok、fastjson 2.0、B/S 前后端分离架构 |

---

## 系统架构

```
┌─────────────────────┐         HTTP / JSON          ┌──────────────────────┐
│   Vue2 SPA 前端       │ ────── RESTful API ───────▶ │   Spring Boot 后端     │
│  · Element UI        │                             │  · Controller →        │
│  · Vuex / Router     │ ◀───── 统一响应 Result ────  │    Service → Mapper    │
│  · Axios (baseURL)   │        + JWT 请求头          │  · JWT 登录拦截器       │
└─────────────────────┘                             └──────────┬───────────┘
                                                               │ MyBatis
                                                      ┌────────▼───────────┐
                                                      │  MySQL 8 数据库     │
                                                      │ (teaching-manager) │
                                                      └────────────────────┘
```

**请求流程：**
1. 前端 Axios 请求拦截器自动携带 `Authorization` 头（JWT Token）。
2. 后端 `LoginCheckInterceptor` 对所有接口进行登录校验（除 `/login`、`/check/login` 外），Token 无效返回 `NOT_LOGIN`。
3. Controller 接收参数 → Service 处理业务 → Mapper 访问数据库。
4. 统一以 `Result { code, message, data }` 格式返回；分页列表额外携带 `total` 字段。

---

## 项目结构

```
.
├── 教务管理系统.sql                     # 数据库建表脚本 + 初始数据
├── teaching-manager-hd/               # 后端（Spring Boot）
│   ├── pom.xml
│   └── src/main/
│       ├── java/group/teachingmanagerhd/
│       │   ├── TeachingManagerhdApplication.java   # 启动类（默认端口 8080）
│       │   ├── config/                             # CorsConfig 跨域、WebConfig 拦截器注册
│       │   ├── controller/                         # 接口入口（5 个 Controller）
│       │   ├── service/  service/impl/             # 业务逻辑层
│       │   ├── mapper/                             # MyBatis Mapper 接口
│       │   ├── dto/                                # 数据传输对象（请求参数封装）
│       │   ├── vo/                                 # 视图对象（返回数据封装）
│       │   ├── interceptor/LoginCheckInterceptor   # JWT 登录校验拦截器
│       │   └── utils/                              # JwtUtil、统一响应 Result/ResultWithTotal
│       └── resources/
│           ├── application.properties              # 数据库连接等配置
│           └── group/teachingmanagerhd/mapper/     # CourseMapper.xml / MemberMapper.xml
└── teaching-manager-ui/Pc/teaching-manager-pc-ui/  # 前端（Vue2）
    ├── vue.config.js                               # devServer 端口 9902
    └── src/
        ├── main.js  App.vue                        # 入口
        ├── router/index.js                         # 路由 + 登录前置守卫
        ├── store/index.js                          # Vuex
        ├── utils/                                  # request.js、storage.js、element-ui.js
        ├── api/                                    # 接口封装（按模块）
        ├── components/                             # 通用组件
        └── views/                                  # 页面（login/member/course/manager）
```

---

## 数据库设计

数据库名：`teaching-manager`。共 **11 张表**：

| 表名 | 说明 | 关键字段 / 外键 |
|------|------|----------------|
| `administrator` | 管理员（教务处） | name、account、password |
| `teacher` | 教师信息 | teacher_number、name、`department_id` → department |
| `student` | 学生信息 | student_number、name、student_class |
| `department` | 学院信息 | name |
| `course` | 课程信息 | name、credit、hour、time、`teacher_id`→teacher、`place_id`→place、`course_status_id`→course_status、is_delete |
| `place` | 上课地点 | name |
| `course_status` | 课程状态字典 | 等待课程安排 / 可选 / 已结课 / 授课中 / 待选 |
| `course_switch` | 选课开关（全局状态） | status（1 开启 / 0 关闭） |
| `course_examination` | 审批状态字典 | 待审批 / 已通过 / 未通过 |
| `operation` | 操作字典 | 新增 / 修改 / 删除 |
| `course_application` | 课程申请记录 | 申请教师、课程信息、`course_examination_id`、`operation_id`、`course_place_id`、date_time |
| `courses_students` | 选课关系表 | course_id、student_id、score（成绩），联合唯一 |

**表间关系：**

```
department 1 ──── n teacher 1 ──── n course n ──── n student   (经 courses_students)
place     n ──── 1 course 1 ──── n course_application 1 ──── 1 operation
course_status n ──── 1 course   course_application n ──── 1 course_examination
```

**关键设计点：**
- 课程状态流转：`等待课程安排` →（管理员排课）→ `待选` →（开启选课）→ `可选` →（关闭选课）→ `授课中` →（结课）→ `已结课`。
- 成绩存放在 `courses_students.score`，由任课教师在课程结课后录入。
- 课程申请表 `course_id` 唯一，审批「新增」通过后回填生成的课程 id。

---

## 接口说明

统一响应格式：

```json
// 成功
{ "code": 1, "message": "success", "data": { } }
// 失败
{ "code": 0, "message": "错误信息", "data": null }
// 分页列表（ResultWithTotal）
{ "code": 1, "message": "success", "data": [ ], "total": 100 }
```

### 登录认证
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/login` | 登录，返回 `{ role, token, name, id }` |
| POST | `/check/login` | 校验 Token 与用户信息是否被篡改 |
| POST | `/modify/user/password` | 修改密码（按角色路由到对应表） |

### 课程模块
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/get/course` | 按 courseId 查询课程详情 |
| POST | `/get/condition/course` | 条件分页查询课程 |
| GET | `/get/all/place` | 查询所有上课地点 |
| POST | `/insert/course` | 新增课程 |
| POST | `/update/course` | 更新课程（含排课、结课） |
| POST | `/delete/course` | 删除课程 |
| GET | `/course/switch/status` | 获取选课开关状态 |
| PUT | `/update/course/status` | 批量更新课程状态（1 开启选课 / 0 关闭选课） |
| POST | `/student/select/course` | 学生选课 |
| POST | `/select/course/status` | 判断学生是否已选某课 |
| POST | `/exit/course` | 学生退课 |
| GET | `/student/select/course` | 按学生 id 查询已选课程（含成绩） |
| GET | `/get/select/the/course/students` | 按课程 id 查询选课学生列表 |
| POST | `/update/student/score` | 录入学生成绩 |
| GET | `/teacher/course/by/id` | 按教师 id 查询其名下课程 |

### 成员模块（管理员）
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/departments` | 查询所有学院 |
| POST | `/teachers` | 条件分页查询教师 |
| GET | `/get/teachers` | 查询全部教师 |
| POST | `/teacher` | 新增教师 |
| DELETE | `/teachers/{teacherIds}` | 批量删除教师（id 用逗号分隔） |
| GET | `/get/teacher` | 按 teacherId 查询教师 |
| PUT | `/modify/teacher` | 修改教师信息 |
| POST | `/students` | 条件分页查询学生 |
| POST | `/student` | 新增学生 |
| DELETE | `/students/{studentIds}` | 批量删除学生 |
| GET | `/get/student` | 按 studentId 查询学生 |
| PUT | `/modify/student` | 修改学生信息 |

### 课程申请模块（教师）
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/apply/add/course` | 提交「新增课程」申请 |
| GET | `/all/application` | 按教师 id 查询全部申请 |
| GET | `/application` | 按教师 id + 审批状态查询申请 |
| GET | `/get/application` | 按申请 id 查询申请详情 |

### 课程审批模块（管理员）
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/wait/examination` | 查询待审批记录 |
| GET | `/already/examination` | 查询已审批记录 |
| POST | `/course/examination` | 执行审批（通过后按操作类型自动新增/修改/删除课程） |

---

## 安全设计

1. **密码加密存储**：密码入库时经 `AES_ENCRYPT(密码, '2307140202')` 加密后以 `HEX` 保存；登录时用 `AES_DECRYPT` 解密比对。默认密码 `123456`。
2. **JWT 令牌认证**：登录成功后签发 HS512 签名的 Token（有效期 3 小时），携带用户 id、姓名、角色；`LoginCheckInterceptor` 拦截所有接口（除登录相关），校验失败返回 `NOT_LOGIN`。
3. **登录防篡改**：`/check/login` 会比对 Token 内声明与前端传入的用户信息，防止登录信息被篡改。
4. **统一 CORS 配置**：`CorsConfig` 允许跨域请求，`OPTIONS` 预检请求放行。
5. **输入防御**：MyBatis 使用 `#{}` 预编译参数，避免 SQL 注入；登录校验失败不返回敏感字段。

---

## 快速开始

### 1. 初始化数据库
在 MySQL 8 中创建数据库并导入建表脚本：

```sql
CREATE DATABASE `teaching-manager` DEFAULT CHARACTER SET utf8mb4;
```

然后执行项目根目录的 `教务管理系统.sql`（含建表与初始数据）。

### 2. 配置后端
编辑 `teaching-manager-hd/src/main/resources/application.properties`，修改为本地数据库连接信息：

```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/teaching-manager
spring.datasource.username=root
spring.datasource.password=root
```

### 3. 启动后端
使用 IDE 运行 `TeachingManagerhdApplication`，或命令行：

```bash
cd teaching-manager-hd
./mvnw spring-boot:run        # Windows 下使用 mvnw.cmd
```

后端默认监听 **8080** 端口。

### 4. 配置前端
编辑 `teaching-manager-ui/Pc/teaching-manager-pc-ui/src/utils/request.js`，将 `baseURL` 指向后端地址（默认 `http://127.0.0.1:8080/`）。

### 5. 启动前端

```bash
cd teaching-manager-ui/Pc/teaching-manager-pc-ui
npm install
npm run serve
```

前端开发服务器运行在 **http://localhost:9902**。

> 生产部署可执行 `npm run build` 后将 `dist/` 静态资源部署到任意 Web 服务器。

---

## 默认账号

| 身份 | 账号 | 密码 |
|------|------|------|
| 管理员 | `root` | `123456` |
| 学生 | 学生学号（如 `2024001`） | `123456`（初始） |
| 教师 | 教师工号 | `123456`（初始） |

> 学生 / 教师默认密码 `123456` 由建表脚本写入，登录后可在顶栏「修改密码」中更改。
