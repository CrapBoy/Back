<template>
  <div>
    <div class="Custom_Top">
      <el-button type="primary" @click="CreateUser">创建用户</el-button>
    </div>

    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="create_time" label="注册时间">
          <template slot-scope="scope">{{new Date(scope.row.create_time).toLocaleString()}}</template>
        </el-table-column>
        <el-table-column label="权限角色">
          <template slot-scope="scope">{{ getRole(scope.row.role_id) }}</template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="CustonChange(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" @click="CustonDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="45%" center>
      <el-form
        :model="UserCheck"
        status-icon
        ref="UserFrom"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="UserCheck.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="UserCheck.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="Number" v-model="UserCheck.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model.number="UserCheck.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="class">
          <el-select v-model="UserCheck.class" placeholder="请选择">
            <el-option v-for="item in roles" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="CustomEmit">取 消</el-button>
        <el-button type="primary" @click="MakeSureUser('UserFrom')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="Visible" width="45%">
      <el-form
        :model="UserChange"
        status-icon
        ref="UserFrom"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="UserChange.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="Number" v-model="UserChange.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model.number="UserChange.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="class">
          <el-select v-model="UserChange.role_id" placeholder="请选择">
            <el-option v-for="item in roles" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="ChangeUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList, DeleteUser, AddUser, UpdateUser } from "../User/Custom";
export default {
  data() {
    return {
      tableData: [],
      roles: [],
      dialogVisible: false,
      Visible: false,
      pageNum: 1,
      pageSize: 5,
      total: 0,
      value: "",
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { len: 11, message: "长度为11个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      UserCheck: {
        username: "",
        password: "",
        phone: "",
        email: "",
        class: ""
      },
      UserChange: {
        username: "",
        password: "",
        phone: "",
        email: "",
        class: ""
      }
    };
  },
  methods: {
    //获取用户
    getData() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getUserList(obj).then(res => {
        this.tableData = res.data.data.list;
        this.roles = res.data.data.roles;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getData();
    },
    //修改用户
    CustonChange(index, row) {
      console.log(row);
      this.UserChange = row;
      this.Visible = true;
    },
    //删除用户
    CustonDelete(index, row) {
      // console.log(row._id)
      this.$confirm("此操作将删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //删除请求
          DeleteUser({ userId: row._id }).then(res => {
            if (res.data.status == 0) {
              this.getData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getRole(role) {
      let Roleid = this.roles.find(item => {
        return item._id == role;
      });
      return Roleid.name;
    },
    //创建用户界面
    CreateUser() {
      this.dialogVisible = true;
    },
    //确认创建用户
    MakeSureUser(formName) {
      // console.log(this.UserCheck);
      let obj = {
        username: this.UserCheck.username,
        password: this.UserCheck.password,
        phone: this.UserCheck.phone,
        email: this.UserCheck.email,
        role_id: this.UserCheck.class
      };

      this.$refs[formName].validate(valid => {
        if (valid) {
          AddUser(obj).then(res => {
            console.log(res);
            if (res.data.status == 0) {
              this.getData();
              this.UserCheck = {};
              this.dialogVisible = false;
            } else if (res.data.status == 1) {
              this.$message({
                message: "用户名已存在",
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    CustomEmit() {
      this.dialogVisible = false;
      this.UserCheck = {};
    },
    //确认修改
    ChangeUser() {
      console.log(1111);
      console.log(this.UserChange._id);
      let obj = {
        _id: this.UserChange._id,
        username: this.UserChange.username,
        phone: this.UserChange.phone,
        email: this.UserChange.email,
        role_id: this.UserChange.class
      };
      // 发送请求
      UpdateUser(obj).then(res => {
        if (res.data.status == 0) {
          this.getData();
          this.Visible = false;
          this.$message({
            message: "更新成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "警告，用户已存在",
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
.Custom_Top {
  text-align: left;
  margin-bottom: 20px;
}
</style>