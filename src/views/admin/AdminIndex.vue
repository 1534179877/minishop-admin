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
              <el-icon><Menu /></el-icon>
              <span>分类</span>
            </template>
          </el-menu-item>
          <el-menu-item index="swiper">
            <template #title>
              <el-icon><document-copy /></el-icon>
              <span>推荐</span>
            </template>
          </el-menu-item>
          <el-menu-item index="floor">
            <template #title>
              <el-icon><Fold /></el-icon>
              <span>热门</span>
            </template>
          </el-menu-item>
          <el-menu-item index="item">
            <template #title>
              <el-icon><Goods /></el-icon>
              <span>商品</span>
            </template>
          </el-menu-item>
          <el-menu-item index="order">
            <template #title>
              <el-icon><Sell /></el-icon>
              <span>订单</span>
            </template>
          </el-menu-item>
          <el-menu-item index="review">
            <template #title>
              <el-icon><Notebook /></el-icon>
              <span>意见反馈</span>
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
import {
  User,
  Goods,
  Sell,
  Menu,
  Fold,
  DocumentCopy,
  Notebook,
} from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.menu-container {
  height: 100%;
  .el-header {
    padding: 0;
  }
}
</style>
