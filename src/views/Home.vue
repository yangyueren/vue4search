<template>
  <div class="search-container">
    <div class="title">检索引擎</div>
    <div class="box" v-loading="loading">
      <el-input
        placeholder="请输入搜索内容"
        v-model="input"
        class="searchClass"
        @keyup.enter.native="search"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>

import { fetch } from "@/utils/requests_axios"

export default {
  name: "Home",

  data() {
    return {
      input: "",
      loading: false
    };
  },

  methods: {
    async post_data() {
      var path = "http://10.214.223.9:5000/search";
      const json_data = {
        'text': this.input
      };
      this.loading = true;
      await fetch(path, "post", JSON.stringify(json_data)).then((res) => {
        
        console.log(res)
        if (res["code"] == 200) {
          this.$router.push({ name: 'Result', params: { search_result: res['msg'] }});
        } else {
          alert("查询错误");
        }
        this.loading = false;
      });
    },

    search() {
      console.log(this.input);
      
      this.post_data();
      // this.$router.push({ name: 'Result', params: { ids: "chuancan", }});
      // this.$router.push(
      //   '/result'
      // )
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 75px;
  margin-bottom: 50px;
  margin-left: 20%;
  width: 500px;
}
.box {
  position: relative;
  width: 600px;
}
.search-container {
  position: relative;
  margin-top: 150px;
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
</style>

