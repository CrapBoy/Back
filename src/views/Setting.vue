<template>
  <div>
    <!-- 上方 -->
    <div class="Setting_Top">
      <el-button type="primary" @click="CreateClassUser">创建角色</el-button>
    </div>
    <!-- 主区域 -->
    <template>
      <el-table :data="ClassData" border style="width: 100%">
        <el-table-column prop="name" label="角色名称" width="280"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="220">
          <template slot-scope="scope">{{new Date(scope.row.create_time).toLocaleString()}}</template>
        </el-table-column>
        <el-table-column prop="auth_time" label="授权时间" width="220">
          <template slot-scope="scope">{{new Date(scope.row.auth_time).toLocaleString()}}</template>
        </el-table-column>
        <el-table-column prop="auth_name" label="授权人" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="SetClass(scope.$index,scope.row)">设置权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      class="Setting_nav"
      background
      layout="prev, pager, next"
      :total="total*2"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <!-- 创建用户 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入用户名</span>
      <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SettingSure">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加权限 -->

    <el-dialog title="设置权限" :visible.sync="Visible" width="30%" center>
      <div style="text-align:center">
        <el-tag>当前设置角色:{{User}}</el-tag>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-tree
          :data="CheckRoleData"
          show-checkbox
          node-key="id"
          :default-checked-keys="defaultChecked"
          :props="defaultProps"
          ref="tree"
        ></el-tree>
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="updateRoleData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getClassList,
  addClassList,
  menuList,
  updateRole
} from "../User/Setting";
export default {
  data() {
    return {
      ClassData: [],
      User: "",
      input: "",
      pageNum: 1,
      pageSize: 5,
      total: 0,
      defaultProps: {
        children: "children",
        label: "label"
      },
      role: {
        auth_name: "admin"
      },
      CheckRoleData: [],
      defaultChecked: [],
      dialogVisible: false,
      Visible: false
    };
  },
  methods: {
    //数据
    getData() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getClassList(obj).then(res => {
        if (res.data.status == 0) {
          // console.log(res.data.data.total);
          this.total = res.data.data.total;
          this.ClassData = res.data.data.list;
        }
      });
    },
    // 打开创建用户的组件
    CreateClassUser() {
      this.dialogVisible = true;
    },
    //确认创建
    SettingSure() {
      //  发送请求
      let obj = {
        roleName: this.input
      };
      addClassList(obj).then(res => {
        if (res.data.status == 0) {
          console.log(res);
          this.getData();
          this.dialogVisible = false;
        }
      });
    },
    //设置权限页面显示
    SetClass(index, row) {
      // console.log(row);
      this.defaultChecked = row.menus;
      this.$refs.tree.setCheckedKeys(this.defaultChecked);
      this.role._id = row._id;
      this.User = row.name;
      this.Visible = true;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
      console.log(`当前页: ${val}`);
    },
    //递归初始tree
    initCheckRoleData(menuList) {
      return menuList.map(item => {
        if (item.children) {
          let children = this.initCheckRoleData(item.children);
          return {
            id: item.key,
            label: item.title,
            children
          };
        } else {
          return {
            id: item.key,
            label: item.title
          };
        }
      });
    },
    //确定设置权限
    updateRoleData() {
      this.Visible = false;
      this.role.menus = this.$refs.tree.getCheckedKeys();
      this.role.auth_time = new Date().getTime();
      updateRole(this.role).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: "success",
            message: "角色权限更新成功！",
            center: true
          });
          this.getData();
        } else {
          this.$message({
            type: "error",
            message: "角色权限更新失败！",
            center: true
          });
        }
      });
    }
  },
  mounted() {
    this.getData();
    this.CheckRoleData = this.initCheckRoleData(menuList);
  }
};
</script>

<style>
.Setting_Top {
  text-align: left;
  margin-bottom: 20px;
}
.Setting_nav {
  margin-top: 50px;
}
.AddClassMsg {
  text-align: center;
}
</style>