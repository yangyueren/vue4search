<template>
  <div class="result">
    <el-image
      :src="require('@assets/zhejiangdaxue.svg')"
      style="float: left; height: 150px"
    ></el-image>
    <div class="rtitle">跨媒体知识检索</div>
    <div class="rsearch-container">
      <div class="searchbox">
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
        <p v-if="this.search_result">搜索用时：{{this.time_cost}} 秒，共检索出 {{this.search_result.length}} 条结果。</p>
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
            <el-button @click="upload_img" style="margin-left: 11%"
              >取消</el-button
            >
            <!-- <i class="el-icon-close" @click="upload_img" style="width: 40px; height:40px; font-size: 28px; "></i> -->
          </el-form-item>
        </el-form>

      </div>
    </div>

    <div class="contentbox" v-loading="loading">
      <el-row v-for="item in search_result" :key="item.category_id">
        <div class="line-border">
          <div class="grid-content-category">
            <h2 style="margin-left: 20px; margin-bottom: 25px">
              {{ item.category_name }}
            </h2>
          </div>

          <el-col :span="14">
            <div class="grid-content bg-purple-light">
              <el-carousel :interval="40000000" type="card" height="200px">
                <el-carousel-item
                  v-for="(url, url_index) in item.images"
                  :key="url_index"
                >
                  <el-image
                    :src="url"
                    :preview-src-list="[url]"
                    style="height: 100%; border-radius: 20px"
                  >
                  </el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>

          <el-col :span="10">
            <div class="grid-content-keyword">
              <div style="position: relative; margin-top: 0%; margin-left: 20%">
                <el-button
                  type="text"
                  v-for="(
                    full_category_path_item, full_category_path_item_index
                  ) in item.full_category_path"
                  :key="full_category_path_item_index"
                  @click="get_category(full_category_path_item[0])"
                  style="font-size: 14px; padding: 0"
                >
                  {{ full_category_path_item[1] }}
                  <i
                    v-if="
                      full_category_path_item_index <
                      item.full_category_path.length - 1
                    "
                    class="el-icon-right"
                  ></i>
                </el-button>
              </div>
              <h5
                style="
                  position: relative;
                  margin-top: 5%;
                  margin-left: 20%;
                  margin-bottom: 0;
                "
              >
                关键词：
              </h5>
              <p style="margin-left: 20%; margin-top: 3%">{{ item.keyword }}</p>
              <!-- <p v-for="keyword in item.keyword" :key="keyword[1]" style="float: left"> {{ keyword[0]}} &nbsp </p> -->
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>




<script>
import { fetch } from "@/utils/requests_axios";

export default {
  name: "Result",

  data() {
    return {
      input: "",
      loading: false,
      form: {
        image_url: "",
      },
      time_cost: 0.1,

      search_result: [
        {
          category_id: 5629,
          category_name: "Health_&_Personal_Care",
          full_category_path: [
            [5629, "Health_&_Personal_Care"],
            [6056, "Personal_Care"],
          ],
          images: [
            "http://ecx.images-amazon.com/images/I/41Ykoqnw6iL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/41A2MkTqKZL.jpg",
            "http://ecx.images-amazon.com/images/I/21Q72AHTCKL.jpg",
            "http://ecx.images-amazon.com/images/I/4122KHI8QvL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/411WXCHA1WL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/41Ykoqnw6iL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/41A2MkTqKZL.jpg",
            "http://ecx.images-amazon.com/images/I/21Q72AHTCKL.jpg",
            "http://ecx.images-amazon.com/images/I/4122KHI8QvL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/411WXCHA1WL._SY300_.jpg",
          ],
          keyword: [
            ["-", 233],
            ["oz", 131],
            ["of", 106],
            ["with", 105],
            ["ea", 85],
            ["for", 70],
          ],
        },
        {
          category_id: 5649,
          category_name: "Health_&_Personal_Care",
          full_category_path: [
            [5629, "Health_&_Personal_Care"],
            [6056, "Personal_Care"],
          ],
          images: [
            "http://ecx.images-amazon.com/images/I/41Ykoqnw6iL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/41A2MkTqKZL.jpg",
            "http://ecx.images-amazon.com/images/I/21Q72AHTCKL.jpg",
            "http://ecx.images-amazon.com/images/I/4122KHI8QvL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/411WXCHA1WL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/41Ykoqnw6iL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/41A2MkTqKZL.jpg",
            "http://ecx.images-amazon.com/images/I/21Q72AHTCKL.jpg",
            "http://ecx.images-amazon.com/images/I/4122KHI8QvL._SY300_.jpg",
            "http://ecx.images-amazon.com/images/I/411WXCHA1WL._SY300_.jpg",
          ],
          keyword: [
            ["-", 233],
            ["oz", 131],
            ["of", 106],
            ["with", 105],
            ["ea", 85],
            ["for", 70],
          ],
        },
      ],
    };
  },

  mounted() {
    this.search_result = this.$route.params.search_result;
    this.input = this.$route.params.input;
    this.image_url = this.$route.params.image_url;
    console.log(this.search_result);
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
    async post_search_data() {
      var path = "/api/search";
      const json_data = {
        text: this.input,
        img: this.form.image_url
      };
      this.loading = true;
      await fetch(path, "post", JSON.stringify(json_data)).then((res) => {
        console.log(res);
        if (res["code"] == 200) {
          this.search_result = res["msg"];
        } else {
          alert("查询错误");
        }
        this.loading = false;
      });
    },
    async post_category_data(cid) {
      var path = "/api/get_category_info";
      const json_data = {
        category_id: cid,
      };
      console.log("get category data");
      console.log(json_data);
      this.loading = true;
      await fetch(path, "post", JSON.stringify(json_data)).then((res) => {
        console.log(res);
        if (res["code"] == 200) {
          this.$router.push({
            name: "Category",
            params: { category_result: res["msg"] },
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
      this.post_search_data();
    },
    get_category(category_id_) {
      console.log(category_id_);
      this.post_category_data(category_id_);
    },
  },
};
</script>

<style scoped>
.rtitle {
  font-size: 50px;
  left: -45px;
  position: relative;
  top: 37px;
}

.rsearch-container {
  position: relative;
  width: 100%;
  margin-top: 80px;
  margin-left: 120px;
}

.searchbox {
  position: relative;
  width: 60%;
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

.contentbox {
  margin-top: 40px;
  margin-left: 120px;
  width: 80%;
}

.el-row {
  margin-bottom: 20px;
  box-sizing: border-box;
  /* border: aqua; */
  border-width: 1px;
  border-style: solid;
  /* border-radius: initial; */
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-color: antiquewhite;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #fcfcfc;
}
.grid-content-category {
  border-radius: 4px;
  height: auto;
  font-family: sans-serif;
  font-size: 14px;
  vertical-align: middle;
  padding-top: 0;
  text-align: left;
  /* line-height: 10; */
}
.grid-content-keyword {
  border-radius: 4px;
  /* min-height: 36px; */
  height: auto;
  font-family: sans-serif;
  font-size: 20px;
  vertical-align: middle;
  padding-top: 0;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
  /* line-height: 10; */
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: transparent;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: transparent;
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

