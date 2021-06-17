<template>
  <div class="">
    <div class="upload-dialog-content">
        <div class="upload-picture-area">
          <el-upload
            ref="upload"
            action=""
            class="avatar-uploader"
            :http-request="handleUploadAvatar"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
            :on-change="displayAvatar">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="upload-button-area">
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </div>
      </div>
  </div>
</template>


<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name:'UploadAvatar',
  props: [], // 父组件向该组件传递过来的参数，用props接收
  data() {
    //这里存放数据
    return {
      imageUrl:'',
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //在上传到服务器之前执行
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // on-change属性方法，用于将图片从本地传到前端，获取到图片，回显到显示框中
    displayAvatar(file){
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // http-request覆盖默认的上传行为，可以自定义上传的实现
    // 在调用submit的方法时，因为方法已经被重写，会自动触发http-request所绑定的方法，从而获取到file对象
    handleUploadAvatar(file){
      // 当调用this.$refs.upload.submit();的时候会走到http-request属性绑定的方法，就是该方法，这时候需要出发父组件监听的uploadAvatarSubmit方法。将图片对象传出去，这步很重要。
      bus.$emit('uploadAvatarSubmit', file);
    },
    //点击上传到服务器按钮
    submitUpload(){
      this.$refs.upload.submit();
    }
  },
};
</script>



<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>