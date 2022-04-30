<template>
  <el-table :data="data" row-key="cat_id" lazy border stripe>
    <el-table-column prop="cat_id" label="cat_id" sortable width="180" />
    <el-table-column prop="cat_name" label="cat_Name" width="180" />
    <el-table-column prop="cat_icon" label="图片" width="180">
      <template #default="scope">
        <h1 v-if="scope.row.cat_icon == '/full/none.jpg'">标题无图片</h1>
        <img
          v-else
          :src="scope.row.cat_icon"
          alt=""
          style="width: 120px; height: 60px"
        />
      </template>
    </el-table-column>
    <el-table-column prop="cat_level" label="cat_level" width="180" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click="updaterow(scope)"
          >修改</el-button
        >
        <el-button type="text" size="small" @click="deleterow(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-drawer v-model="update" direction="rtl">
    <template #title>
      <h4>更新</h4>
    </template>
    <template #default>
      <!-- 一级 -->
      <el-form v-if="cat_level == 0">
        <el-form-item label="一级菜单名字">
          <el-input placeholder="输入名字" v-model="cat_name" />
        </el-form-item>
      </el-form>
      <!-- 二级 -->
      <el-form v-else-if="cat_level == 1">
        <el-form-item label="二级菜单名字">
          <el-input placeholder="输入名字" v-model="cat_name" />
        </el-form-item>
      </el-form>
      <!-- 三级 -->
      <el-form v-else>
        <el-form-item label="三级菜单名字">
          <el-input placeholder="输入名字" v-model="cat_name" />
        </el-form-item>
        <el-form-item label="修改图片">
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:7001/upload"
            multiple
            :on-success="success"
            :on-error="error"
            :before-upload="beforeUpload"
          >
            <el-icon class="el-icon--upload"><download /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 3MB
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">提交</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { deletegoods, getgoods, updategoods } from '@/network/goods';
import { toRefs, reactive, ref } from 'vue';

let goodsData = reactive({
  data: [],
});
let activedata = reactive({
  cat_level: 0,
  cat_name: '',
  cat_icon: '',
  cat_id: 0,
  cat_pid: 0,
});
const { data } = toRefs(goodsData);
let { cat_level, cat_name } = toRefs(activedata);
let update = ref(false);

function initTable() {
  getgoods().then((res) => {
    console.log(res);
    goodsData.data = res.data.message;
  });
}
initTable();

//点击取消
function cancelClick() {
  update.value = false;
}
//点击确认
function confirmClick() {
  //elmessagebox 是有确认和取消的那个框 确定 就走then 不确定就走catch
  ElMessageBox.confirm(`确定提交吗 ?`)
    .then(() => {
      updategoods(activedata)
        .then((res) => {
          console.log(res);
          ElMessage({ type: 'success', message: '修改成功！' });
          initTable();
        })
        .catch(() => {});
      update.value = false;
    })
    .catch(() => {
      // catch error
    });
}

function updaterow(scope) {
  activedata.cat_level = scope.row.cat_level;
  activedata.cat_name = scope.row.cat_name;
  activedata.cat_id = scope.row.cat_id;
  activedata.cat_pid = scope.row.cat_pid;
  activedata.cat_icon = scope.row.cat_icon;
  update.value = true;
}

function deleterow(scope) {
  console.log(scope);
  deletegoods(scope).then((res) => {
    console.log(res);
    initTable();
  });
}

//文件上传前验证
function beforeUpload(file) {
  const teststr = RegExp('image/[j,p][p,n][e]*[g]');
  const isType = teststr.test(file.type);
  const isLt1M = file.size / 1024 / 1024 < 3; //文件大小 3MB
  if (!isType) {
    this.$message.error('格式只能是jpg/jpeg/png格式!');
    return false;
  }
  if (!isLt1M) {
    this.$message.error('图片大小不能超过 3MB!');
    return false;
  }
  return true;
}
//上传成功的回调
function success(res) {
  //如果上传成功就返回该图片地址 并设置在activerow中准备进行修改
  console.log(res);
  activedata.cat_icon = res.data.url;
  ElMessage({
    type: 'success',
    message: '上传成功',
  });
}
//上传失败回调
function error() {
  ElMessage({
    type: 'error',
    message: '上传失败',
  });
}
</script>

<style scoped></style>
