<template>
  <el-container class="menu-container">
    <!--  topbar   -->
    <el-header><topbar /></el-header>
    <el-container>
      <!-- 边框栏     -->
      <el-aside width="200px">
        <el-menu
          active-text-color="#60A0F2"
          background-color="#ffffff"
          :default-active="$route.path.split('/').pop()"
          text-color="#000000"
          :router="true"
          style="height: 100%"
        >
          <el-menu-item index="user">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="goods">
            <template #title>
              <el-icon><Goods /></el-icon>
              <span>商品管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="swiper">
            <template #title>
              <el-icon><Goods /></el-icon>
              <span>轮播图</span>
            </template>
          </el-menu-item>
          <el-menu-item index="floor">
            <template #title>
              <el-icon><Goods /></el-icon>
              <span>楼层</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--      主要内容区域-   各个模块管理在这里进行变化   就是children中的-->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import topbar from '@/components/topBar';
import { User, Goods } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.menu-container {
  height: 100%;
  .el-header {
    padding: 0;
  }
}
</style>
