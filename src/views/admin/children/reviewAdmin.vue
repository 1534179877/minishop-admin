<template>
  <el-table :data="data">
    <el-table-column prop="time" label="发送时间" width="100" />
    <el-table-column prop="content" label="内容" width="500" />
  </el-table>
</template>

<script setup>
import { reactive, toRefs } from 'vue';

let reviewData = reactive({
  data: [
    { id: '1231252321d', time: '2022年5月15日', content: '体验不错！！' },
    {
      id: '1231252321d',
      time: '2022年5月16日',
      content: '商品很不错！意见买了无数次了！',
    },
    {
      id: '1231252321d',
      time: '2022年5月16日',
      content: '用着体验很不错！！已经用了无数次了！',
    },
  ],
});
const { data } = toRefs(reviewData);
</script>

<style scoped></style>
