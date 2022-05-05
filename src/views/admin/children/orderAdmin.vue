<template>
  <el-table :data="data">
    <el-table-column prop="order_id" label="订单编号" width="100" />
    <el-table-column prop="order_time" label="下单时间" width="100">
      <template #default="scope">
        <span>{{ timeDateTrans(scope.row.order_time) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="order_price" label="订单价格" width="100" />
    <el-table-column prop="person" label="收货人姓名" width="150" />
    <el-table-column prop="address" label="订单地址" width="220" />
    <el-table-column prop="phone" label="收货人电话" width="120" />
    <el-table-column prop="order_type" label="订单状态" width="120">
      <template #default="scope">
        <span>{{ scope.row.order_type ? '未付款' : '已付款' }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click="updaterow(scope.row)">{{
          scope.row.order_type ? '发货' : '已发货'
        }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { getorder, updateorder } from '@/network/goods';
import { reactive, toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
//import { computed } from "vue";

// 定义变量
let orderData = reactive({
  data: [],
});

let activerow = reactive({
  order_type: 1,
  _id: '',
});

//解构
const { data } = toRefs(orderData);
//初始化
function initTable() {
  getorder().then((res) => {
    orderData.data = res.data.message;
  });
}
initTable();

function timeDateTrans(time) {
  let date = new Date(parseInt(time.toString().substr(0, time.length)));
  return (
    date.getFullYear().toString() +
    '年 ' +
    (date.getMonth() + 1).toString() +
    '月 ' +
    date.getDate().toString() +
    '日 ' +
    date.getHours().toString() +
    '时 ' +
    date.getMinutes().toString() +
    '分 ' +
    date.getSeconds().toString() +
    '秒'
  );
}

// 点击更新按钮
function updaterow(scope) {
  if (scope.order_type == 0) {
    ElMessageBox.confirm('确定已经发货了吗？')
      .then(() => {
        updateorder(activerow)
          .then((res) => {
            console.log(res);
            ElMessage({ type: 'success', message: '修改成功！' });
            initTable();
          })
          .catch(() => {});
      })
      .catch(() => {
        // catch error
      });
  } else {
    ElMessage({
      type: 'error',
      message: '已经确定发货了',
    });
  }

  //结构赋值
}
</script>

<style scoped></style>
