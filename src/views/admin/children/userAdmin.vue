<template>
  <div class="container">
    <el-table :data="data">
      <el-table-column prop="_id" label="Date" width="200" />
      <el-table-column prop="userName" label="Name" width="120" />
      <el-table-column prop="password" label="pasword" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button type="text" size="small" @click="update">update</el-button>
          <el-button type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getusers } from '@/network/user';
import { reactive, toRefs } from 'vue';

let userData = reactive({
  data: [],
});
const { data } = toRefs(userData);
function initTable() {
  getusers().then((res) => {
    console.log(res);
    userData.data = res.data.data;
  });
}
initTable();
function update() {}
</script>

<style scoped lang="scss">
.container {
  height: 100%;

  display: flex;
  justify-content: center;
  //align-items: center;
}
</style>
