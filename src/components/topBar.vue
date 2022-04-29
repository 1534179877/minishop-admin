<template>
  <el-header class="topbar">
    <div class="container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item index="1" route="/admin" @click="gotomain"
          >商城管理</el-menu-item
        >
        <el-sub-menu index="2">
          <template #title>看板</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">Info</el-menu-item>
        <el-menu-item index="4">Orders</el-menu-item>
      </el-menu>
    </div>
    <div>
      <div class="user_cont">
        <h3 style="margin-right: 3px">{{ userName }}</h3>
        <el-avatar :size="50" :src="circleUrl" :fit="fill" />
        <el-button @click="loginout">loginout</el-button>
      </div>
    </div>
  </el-header>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
//通过userStore定义 store
const store = useStore();
const router = useRouter();
//状态管理
const userName = computed(() => store.getters.getUserInfo);

const circleUrl = 'http://localhost:8080/src/assets/header.png';

function gotomain() {
  router.push('/admin');
}
function loginout() {
  router.push('/');
}
</script>

<style scoped>
.topbar {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}

.user_cont {
  display: flex;
  align-items: center;
}
.user_cont el-button {
}
.user_cont span {
  line-height: 100%;
}
.topbar_menu a {
  display: inline-block;
  color: #fff;
  margin-right: 17px;
  text-decoration: none;
  line-height: 100%;
  text-align: center;
}
.topbar_menu a:last-child {
  margin-right: 0;
}
.el-menu-demo {
  height: 100%;
}
</style>
