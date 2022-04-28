<template>
  <el-upload
    class="upload-demo"
    drag
    action="http://localhost:7001/upload"
    multiple
    :on-success="success"
    :on-error="error"
    :before-upload="beforeUpload"
  >
    <el-icon><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { ElMessage } from 'element-plus';

function beforeUpload(file) {
  console.log(file);
  const teststr = RegExp('image/[j,p][p,n][e]*[g]');
  const isType = teststr.test(file.type);
  const isLt1M = file.size / 1024 / 1024 < 3;
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
function success() {
  ElMessage({
    type: 'success',
    message: '上传成功',
  });
}
function error() {
  ElMessage({
    type: 'error',
    message: '上传失败',
  });
}
</script>

<style scoped></style>
