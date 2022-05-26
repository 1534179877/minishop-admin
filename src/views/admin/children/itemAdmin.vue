<template>
  <el-button @click="add = !add">新增</el-button>
  <el-table :data="data">
    <el-table-column prop="goods_name" label="商品名字" width="100">
      <template #default="scope">
        <el-popover
          placement="top-start"
          title="商品名字"
          :width="200"
          trigger="hover"
          :content="scope.row.goods_name"
        >
          <template #reference>
            <span
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
              >{{ scope.row.goods_name }}</span
            >
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="goods_price" label="价格" width="100" />
    <el-table-column prop="goods_number" label="商品编号" width="100" />
    <el-table-column prop="cat_id" label="分类编号" width="100" />
    <el-table-column prop="cat_one_id" label="一级分类" width="100" />
    <el-table-column prop="cat_two_id" label="二级分类" width="100" />
    <el-table-column prop="cat_three_id" label="三级分类" width="100" />
    <el-table-column prop="goods_big_logo" label="大图片预览" width="120">
      <template #default="scope">
        <img
          :src="scope.row.goods_big_logo"
          alt=""
          style="width: 120px; height: 60px"
        />
      </template>
    </el-table-column>
    <!--    <el-table-column prop="goods_small_logo" label="小图片预览" width="120">
      <template #default="scope">
        <img
          :src="scope.row.goods_small_logo"
          alt=""
          style="width: 120px; height: 60px"
        />
      </template>
    </el-table-column>-->
    <!--    <el-table-column prop="add_time" label="添加时间" width="120" />-->
    <el-table-column fixed="right" label="选项" width="120">
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
  <el-drawer v-model="add" direction="rtl" size="60%">
    <template #title>
      <h4>新增</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="一级分类">
          <el-input placeholder="输入id" v-model="cat_one_id" />
        </el-form-item>
        <el-form-item label="二级分类">
          <el-input placeholder="输入id" v-model="cat_two_id" />
        </el-form-item>
        <el-form-item label="三级分类">
          <el-input placeholder="输入id" v-model="cat_three_id" />
        </el-form-item>
        <el-form-item label="商品名字">
          <el-input placeholder="输入id" v-model="goods_name" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input placeholder="输入打开方式" v-model="goods_price" />
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
        <el-button @click="cancelClick2">取消</el-button>
        <el-button type="primary" @click="confirmClick2">提交</el-button>
      </div>
    </template>
  </el-drawer>

  <el-drawer v-model="update" direction="rtl">
    <template #title>
      <h4>更新</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="一级分类">
          <el-input placeholder="输入id" v-model="cat_one_id" />
        </el-form-item>
        <el-form-item label="二级分类">
          <el-input placeholder="输入id" v-model="cat_two_id" />
        </el-form-item>
        <el-form-item label="三级分类">
          <el-input placeholder="输入id" v-model="cat_three_id" />
        </el-form-item>
        <el-form-item label="商品名字">
          <el-input placeholder="输入id" v-model="goods_name" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input placeholder="输入打开方式" v-model="goods_price" />
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
import { getitem, updateitem } from '@/network/goods';
import { reactive, ref, toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const update = ref(false);
const add = ref(false);
let itemData = reactive({
  data: [],
});
let activerow = reactive({
  cat_three_id: '',
  cat_one_id: '',
  cat_two_id: '',
  goods_big_logo: '',
  goods_name: '',
  goods_price: '',
  _id: '',
});
const { data } = toRefs(itemData);
const { cat_three_id, cat_one_id, cat_two_id, goods_name, goods_price } =
  toRefs(activerow);
function initTable() {
  getitem().then((res) => {
    itemData.data = res.data.message;
    console.log(data);
  });
}
initTable();

/*function adddata() {
  add.value = !add.value;
}*/

function cancelClick2() {
  add.value = !add.value;
}
function confirmClick2() {
  ElMessageBox.confirm(`确定提交吗 ?`)
    .then(() => {
      ElMessage({
        type: 'success',
        message: '增加成功',
      });
      add.value = !add.value;
    })
    .catch(() => {
      // catch error
    });
}

function cancelClick() {
  update.value = false;
}
//点击确认
function confirmClick() {
  ElMessageBox.confirm(`确定提交吗 ?`)
    .then(() => {
      updateitem(activerow)
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
  console.log(scope);
  //结构赋值
  const {
    cat_three_id,
    cat_one_id,
    cat_two_id,
    goods_big_logo,
    goods_name,
    goods_price,
    _id,
  } = scope;
  activerow.cat_three_id = cat_three_id;
  activerow.cat_one_id = cat_one_id;
  activerow.cat_two_id = cat_two_id;
  activerow.goods_big_logo = goods_big_logo;
  activerow.goods_name = goods_name;
  activerow.goods_price = goods_price;
  activerow._id = _id;
  update.value = true;
}

function deleterow(scope) {
  console.log(scope);
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
  activerow.goods_big_logo = res.data.url;
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
