<template>
  <div>
    <div class="Mar-Top">
      <span @click="BackOne" class="BackOne">一级商品分类列表</span><div class="nameBox" v-if="!show">=>{{name}}</div>
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="dialogFormVisible=true"
      >添加分类</el-button>
    </div>
    
    <!-- 一级商城界面 -->
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column prop="name" label="商品分类" width="880"></el-table-column>
      <el-table-column label="操作选项">
        <template slot-scope="scope">
          <el-button size="mini" @click="ChangeList(scope.$index, scope.row)">修改分类</el-button>
          <el-button size="mini" @click="LookChildren(scope.$index, scope.row)" v-if="show">查看子分类</el-button>
        </template>
      </el-table-column>
    </el-table>


    <div>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类列表" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择分类" class="Market-right">
              <el-option label="一级分类" value="NumOne"></el-option>
              <!-- <el-option label="二级分类" value="NumTwo"></el-option> -->
            </el-select>
          </el-form-item>

          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="MakeSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 弹窗 -->

  <el-dialog title="修改分类" :visible.sync="FormVisible" width="30%">
  <el-form :model="form">
    <el-form-item label="请输入新分类名">
      <el-input v-model="form.cname" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="FormVisible = false">取 消</el-button>
    <el-button type="primary" @click="MakeOk">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>



<script>
import { getGoodList, addListOne, ChangeListOne} from "../User/Marketing";
export default {
  data() {
    return {
      show:true,//为判断显示二级的bool值
      name:"",//存储name的String
      parentId: "0",//这是parentId用于判断查询的是哪一级
      pageNum: 1,//这是第几页
      pageSize: 5,//这是每页多少个
      total: 0,//总数
      tableData: [],//数据的数组
      categoryId:"",//请求中的categoryId
      dialogTableVisible: false,//判断组件是否显示
      dialogFormVisible: false,//判断组件是否显示
      FormVisible:false,//判断组件是否显示
      formLabelWidth: "120px",//宽度
      form: {
        name: "",
        cname:"",
        region: ""
      }//存储数据到组件中
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val; //改变每页个数
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNum = val; //改变页数
      this.getData();
    },
    getData() {//定义获取数据的方法
      getGoodList({parentId: this.parentId,pageNum: this.pageNum, pageSize: this.pageSize }).then(
        res => {
          // console.log(res);
          if (res.data.status == 0) {
            // console.log(res.data.data.list);
            this.total = res.data.data.total; //数据总数
            this.tableData = res.data.data.list; //数据数组
          } else {
            console.list("获取失败");
          }
        }
      );
    },
    MakeSure() {
      this.dialogFormVisible = false;
      // console.log(this.form.name, this.form.region);
      //发起添加分类的异步请求
        addListOne({parentId: this.parentId,categoryName: this.form.name}).then(res => {
          if (res.status == 200) {
            this.$message({
              message: "恭喜你，添加成功",
              type: "success"
              
            });
            this.getData()
            this.form.name=""
          }else{
            console.log("失败")
          }
        });
       
    },
    MakeOk(){
      this.FormVisible=false
      // console.log(this.form.cname,this.categoryId)
      
      //发起修改请求
      let obj={
        categoryId:this.categoryId,
        categoryName:this.form.cname
      }
      ChangeListOne(obj).then(res=>{
        if(res.data.status==0){
          // console.log(res)
          this.getData()
        }
      })
      this.form.cname=""
    },
    //点击修改分类修改 this.categoryId 的值
    ChangeList(index, row){
      this.FormVisible = true
      // console.log(index,row._id)
      this.categoryId=row._id
    },
    //点击 查看子分类
    LookChildren(index,row){
        // console.log(index,row._id)
        this.parentId = row._id//改变Id
        this.name=row.name//获取name
        this.show=false//改变显示方式
        this.getData()//刷新页面
    },
    //点击 一级商品分类列表 回到初始
    BackOne(){
      this.show=true
      this.parentId=0
      this.getData()
    }
  },
  //页面加载时发送请求
  mounted() {
    this.getData();
  }
};
</script>

<style>
.Mar-Top {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid black;
  line-height: 40px;
  padding-bottom: 15px;
  color: #409eff;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 14px;
}
.Market-right {
  margin-right: 400px;
}
.Market-Change{
  width: 1000px;
}
.BackOne{
    cursor: pointer;
}
.nameBox{
  margin-left: -950px;
  color: #000;
}
</style>