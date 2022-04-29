<template>
  <div v-for="floor in data" :key="floor._id">
    <h2>{{ floor.floor_title.name }}</h2>
    <el-table :data="floor.product_list">
      <el-table-column prop="name" label="name" width="100" />
      <el-table-column prop="navigator_url" label="navigator_url" width="220" />
      <el-table-column prop="image_src" label="image_src" width="120">
        <template #default="scope">
          <img
            :src="scope.row.image_src"
            alt=""
            style="width: 120px; height: 60px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="open_type" label="open_type" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="updaterow(scope.row, floor)"
            >修改</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-drawer v-model="update" direction="rtl">
    <template #title>
      <h4>更新</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="楼层名字">
          <el-input placeholder="输入名字" v-model="floorname" />
        </el-form-item>
        <el-form-item label="商品名字">
          <el-input placeholder="输入名字" v-model="name" />
        </el-form-item>
        <el-form-item label="打开方式">
          <el-input placeholder="输入打开方式" v-model="open_type" />
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
                jpg/png files with a size less than 500kb
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
import { getfloor, updatefloor } from '@/network/goods';
import { reactive, ref, toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
// eslint-disable-next-line no-unused-vars

let floorData = reactive({
  data: [],
});
let activerow = reactive({
  name: '',
  image_src: '',
  open_type: '',
  navigator_url: '',
  _id: '',
  floorname: '',
});
let floorid = ref('');
const { name, open_type, floorname } = toRefs(activerow);
let update = ref(false);

const { data } = toRefs(floorData);
function initTable() {
  getfloor().then((res) => {
    console.log(res);
    floorData.data = res.data.message;
  });
}

initTable();

//点击取消
function cancelClick() {
  update.value = false;
}
//点击确认
function confirmClick() {
  ElMessageBox.confirm(`确定提交吗 ?`)
    .then(() => {
      updatefloor(activerow, floorid)
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

function updaterow(scope, floor) {
  console.log(floor); // 修改的floor
  console.log(scope); //修改的row
  //结构赋值
  const { name, open_type, navigator_url, image_src, _id } = scope;
  floorid = floor._id;
  activerow.name = name;
  activerow.open_type = open_type;
  activerow.navigator_url = navigator_url;
  activerow.image_src = image_src;
  activerow._id = _id;
  activerow.floorname = floor.floor_title.name;
  update.value = true;
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
  activerow.image_src = res.data.url;
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
