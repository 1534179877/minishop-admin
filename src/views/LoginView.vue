<template>
  <div class="login">
    <div class="img">
      <img alt="" src="../assets/11.png" />
      <h1>微信商城管理端</h1>
    </div>

    <div class="login-form">
      <h1 style="text-align: center">登录</h1>
      <el-form>
        <el-form-item>
          <el-input
            type="text"
            v-model="userInfo.userName"
            placeholder="输入用户名"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="userInfo.password"
            show-password="true"
            placeholder="输入密码"
            :prefix-icon="Lock"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary" class="login-form-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
// setup 是vue3.2 的一个全新语法 可以查阅相关写论文
import { reactive } from 'vue';
//引入  login这个接口
import { login } from '@/network/user';
//setup中使用 store 和 router
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
//引入 element-plus 的组件
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

// 实例化
const store = useStore();
const router = useRouter();
// 创建响应式的user Info
const userInfo = reactive({
  userName: '',
  password: '',
});
//点击提交  触发的函数
const submit = () => {
  //使用接口
  login(userInfo.userName, userInfo.password)
    .then((res) => {
      /**   接口成功就使用then  res 是返回的数据
       *   上面这个只是说 接口成功
       *   后端定义 200  是代表 数据操作成功
       **/
      if (res.data.status == 200) {
        //保存用户信息到仓库中 ，用于数据持久化
        store.commit('setUserInfo', userInfo);
        //路由跳转  跳转到其他页面
        router.push('/admin/user');
      } else {
        ElMessage({
          type: 'error',
          message: `${res.data.msg}`,
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: 'error',
      });
    });
};
</script>

<style scoped lang="scss">
.login {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  .img {
    z-index: 10;
    position: absolute;
    left: 50px;
    top: 50px;
    img {
      width: 100px;
      height: 100px;
    }
    h1 {
      height: 100%;
    }
  }
  .login-form {
    backdrop-filter: blur(6px);
    position: absolute;
    right: 300px;
    width: 400px;

    .el-form-item:first-child {
      margin-top: 10px;
    }
    .el-input {
      width: 300px;
      margin: auto;
    }
    box-shadow: 2px 2px 2px #6d6e6f;
    .login-form-btn {
      margin: auto;
    }
  }
}
.login:before {
  content: '';
  position: absolute;
  top: -10px;
  right: 48%;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #4481eb, #97cff9);
  transform: translateY(-50%);
}

.login:after {
  content: '';
  position: absolute;
  button: -10px;
  left: 48%;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  z-index: -1;
  background: linear-gradient(-45deg, #4481eb, #04befe);
  transform: translateY(30%);
}
</style>
