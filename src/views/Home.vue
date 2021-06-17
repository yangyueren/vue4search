<template>
  <div class="search-container">
    <el-image :src="require('@assets/zhejiangdaxue.svg')"></el-image>
    <div class="title">跨媒体知识检索</div>
    <div class="box" v-loading="loading">
      <el-input
        placeholder="请输入搜索内容"
        v-model="input"
        class="searchClass"
        @keyup.enter.native="search"
      >
        <el-button
          slot="append"
          icon="el-icon-picture"
          style="
            border-right-style: solid;
            border-right-color: gray;
            border-radius: 0px;
          "
          @click="upload_img"
        >
        </el-button>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>

    <div
      id="img_uploader_box"
      style="padding-top: 20px; padding-left: 20%; display: none"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="请上传图片: ">
          <el-upload
            class="avatar-uploader"
            action=""
            :on-change="imgBroadcastChange"
            accept="image/jpg,image/png,image/jpeg"
            :show-file-list="false"
            :auto-upload="false"
          >
            <img v-if="form.image_url" :src="form.image_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <!-- <i class="el-icon-close" @click="upload_img" style="width: 40px; height:40px; font-size: 28px; "></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="upload_img" style="margin-left: 30%"
            >取消</el-button
          >
          <!-- <i class="el-icon-close" @click="upload_img" style="width: 40px; height:40px; font-size: 28px; "></i> -->
        </el-form-item>
      </el-form>
      <!-- <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload> -->
    </div>
  </div>
</template>

<script>
import { fetch } from "@/utils/requests_axios";

export default {
  name: "Home",
  data() {
    return {
      input: "",
      loading: false,
      form: {
        image_url: "",
      },
    };
  },

  methods: {
    imgBroadcastChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isLt2M) {
        // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
        console.log("upload file");
        this.uploadImgToBase64(file.raw).then((data) => {
          this.form.image_url = data.result;
        });
      } else {
        this.$message.error("上传封面图片大小不能超过 2MB!");
      }
    },
    uploadImgToBase64(file) {
      //核心方法，将图片转成base64字符串形式
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          // 图片转base64完成后返回reader对象
          resolve(reader);
        };
        reader.onerror = reject;
      });
    },

    async post_data() {
      var path = "/api/search";
      const json_data = {
        text: this.input,
        img: this.form.image_url,
      };
      console.log(this.form.image_url);
      this.loading = true;
      await fetch(path, "post", JSON.stringify(json_data)).then((res) => {
        console.log(res);
        if (res["code"] == 200) {
          this.$router.push({
            name: "Result",
            params: { search_result: res["msg"], input: this.input, image_url: this.form.image_url },
          });
        } else {
          alert("查询错误");
        }
        this.loading = false;
      });
    },

    upload_img() {
      console.log("upload img");
      var target = document.getElementById("img_uploader_box");
      console.log(target.style.display);
      console.log(this.form.image_url);

      if (target.style.display != "none") {
        target.style.display = "none";
        this.form.image_url = "";
      } else {
        target.style.display = "block";
      }
    },

    search() {
      console.log(this.input);
      this.post_data();
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 75px;
  margin-top: 20px;
  margin-bottom: 50px;
  margin-left: 10%;
}
.box {
  position: relative;
  width: 600px;
  padding-left: 20px;
}
.search-container {
  position: relative;
  margin-top: 60px;
  margin-left: 26%;
  width: 600px;
}
.searchClass {
  border: 1px solid #c5c5c5;
  border-radius: 20px;
  background: #f4f4f4;
}
.searchClass .el-input-group__prepend {
  border: none;
  background-color: transparent;
  padding: 0 10px 0 30px;
}
.searchClass .el-input-group__append {
  border: none;
  background-color: transparent;
}
.searchClass .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: none;
  background-color: transparent;
}
.searchClass .el-icon-search {
  font-size: 16px;
}
.searchClass .centerClass {
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: right;
}
.searchClass .line {
  width: 1px;
  height: 26px;
  background-color: #c5c5c5;
  margin-left: 14px;
}
.searchClass:hover {
  border: 1px solid #d5e3e8;
  background: #fff;
}
.searchClass:hover .line {
  background-color: #d5e3e8;
}
.searchClass:hover .el-icon-search {
  color: #409eff;
  font-size: 16px;
}

.form-container {
  width: 700px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.img {
  object-fit: contain;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border-style: dashed;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-style: dashed;
  border-color: #c5c5c5;
}
</style>

