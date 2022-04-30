<template>
  <!-- router view 的会被路由替换  vue会根据你的路由去寻找组间 然后替换这个元素  就类似于占个位置 -->
  <router-view />
</template>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
* {
  margin: 0;
  padding: 0;
}
</style>
