<template>
  <el-button @click="add = !add">新增</el-button>
  <el-table :data="data">
    <el-table-column prop="goods_id" label="goods_id" width="100" />
    <!--    <el-table-column prop="navigator_url" label="navigator_url" width="220" />-->
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
        <el-button type="text" size="small" @click="updaterow(scope.row)"
          >修改</el-button
        >
        <el-button type="text" size="small" @click="deleterow(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-drawer v-model="add" direction="ttb" size="50%">
    <template #title>
      <h4>新增</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="商品编号">
          <el-input placeholder="输入id" v-model="newgood.goods_id" />
        </el-form-item>
        <el-form-item label="打开方式">
          <el-select v-model="newgood.open_type" placeholder="选择打开方式">
            <el-option label="navigate" value="navigate" />
            <el-option label="normal" value="normal" />
            <el-option label="test" value="test" />
            <el-option label="smail" value="smail" />
          </el-select>
        </el-form-item>
        <el-form-item label="添加图片">
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
  <el-drawer v-model="update" direction="rtl">
    <template #title>
      <h4>更新</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="商品id">
          <el-input placeholder="输入id" v-model="goods_id" />
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
import { deleteswiper, getswiper, updateswiper } from '@/network/goods';
import { reactive, ref, toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Download } from '@element-plus/icons-vue';

// 定义变量
const update = ref(false);
const add = ref(false);
let swiperData = reactive({
  data: [],
});
let newgood = reactive({
  goods_id: 0,
  image_src: '',
  open_type: '',
  navigator_url: '',
});

let activerow = reactive({
  goods_id: 0,
  image_src: '',
  open_type: '',
  navigator_url: '',
  _id: '',
});
//解构
const { data } = toRefs(swiperData);
let { goods_id, open_type } = toRefs(activerow);
//初始化
function initTable() {
  getswiper().then((res) => {
    swiperData.data = res.data.message;
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
      updateswiper(activerow)
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
// 点击更新按钮
function updaterow(scope) {
  //结构赋值
  const { goods_id, open_type, navigator_url, image_src, _id } = scope;
  activerow.goods_id = goods_id;
  activerow.open_type = open_type;
  activerow.navigator_url = navigator_url;
  activerow.image_src = image_src;
  activerow._id = _id;
  update.value = true;
}

function deleterow(scope) {
  console.log(scope);
  ElMessageBox.confirm(`确定删除吗，删除了就回不来咯 ！`)
    .then(() => {
      deleteswiper(scope._id)
        .then((res) => {
          console.log(res);
          ElMessage({ type: 'success', message: '删除成功！' });
          initTable();
        })
        .catch(() => {});
      update.value = false;
    })
    .catch(() => {
      // catch error
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
