<template>
  <div>
    <!-- 上方 -->
    <div class="Full-Top">
      <div class="Full-TopMain">
        <!-- 选择框 -->
        <el-select v-model="value" class="FUllinput">
          <el-option 
            selected
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 搜索框 -->

        <el-input v-model="input" placeholder="关键字" class="FUllinput"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="Outline_search">搜索</el-button>
      </div>
    </div>
    <!-- 下方 -->
    <div>
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="orderId" label="订单号" width="180"></el-table-column>
          <el-table-column prop="recipient" label="收件人" width="180"></el-table-column>
          <el-table-column prop="address" label="订单状态">
            <template slot-scope="scope">{{scope.row.status?"未付款":"已付款"}}</template>
          </el-table-column>
          <el-table-column prop="allPrice" label="订单总价">
            <template slot-scope="scope">￥{{scope.row.allPrice}}</template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
            <template slot-scope="scope">{{ new Date(scope.row.create_time).toLocaleString()}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link type="primary" @click="LookOrderInfo(scope.row)">查看详情</el-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
      
      <el-pagination background layout="prev, pager, next" :total="total*2" @current-change="handleCurrentChange"></el-pagination>
    </div>
    

    <!-- 详情 -->

    
  </div>
</template>

<script>
import { getOrderList, SearchOrderList } from "../User/Outline";
export default {
  data() {
    return {
      options: [
        {
          value: "orderId",
          label: "按订单号搜索"
        },
        {
          value: "recipient",
          label: "按收件人搜索"
        }
      ],
      tableData: [],
      total:0,
      pageNum: 1,
      pageSize: 5,
      input: "",
      value: ""
    };
  },
  methods: {
    //获取订单数据
    getOrderDate() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getOrderList(obj).then(res => {
        if (res.data.status == 0) {
          console.log(res.data.data.total);
          this.total=res.data.data.total
          this.tableData = res.data.data.list;
        }
      });
    },
    //搜索
    Outline_search() {
      let obj = {
        type: this.value,
        value: this.input,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      SearchOrderList(obj).then(res => {
        this.tableData = res.data.data.list;
      });
    },
    //当前页
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    },
    LookOrderInfo(row){
      console.log(row)
        this.$router.push({path:"/index/orderinfo",query:row})
    }
  },
  mounted() {
    this.getOrderDate();
  }
};
</script>