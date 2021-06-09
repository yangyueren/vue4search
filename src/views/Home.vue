<template>
  <div class="search-container">
    <div class="title">检索引擎</div>
    <div class="box">
      <el-input
        placeholder="请输入搜索内容"
        v-model="input"
        class="searchClass"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

const fetch = (url, method, data) => {
  return new Promise((resolve, reject) => {
    axios({ url, method, data })
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  name: "Login",

  data() {
    return {
      input: "",
    };
  },

  methods: {
    async post_data() {
      var path = "http://localhost:5000/login";
      const json_data = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };
      await fetch(path, "post", JSON.stringify(json_data)).then((res) => {
        if (res["code"] == 20000) {
          this.$router.push("/dashboard");
        } else {
          alert("密码错误");
        }
      });
    },

    search() {
      console.log(this.input);
    },
  },
};
</script>

<style>
.title {
  font-size: 75px;
  left: 38%;
  position: relative;
  top: 110px;
}
.box {
  position: absolute;
  top: 260px;
  left: 20%;
  width: 60%;
}
.search-container {
  position: absolute;
  width: 100%;
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
</style>

