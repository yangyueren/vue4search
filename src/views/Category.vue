<template>
  <div class="category">
    <el-container>
      <el-header>
        <div style="position: relative; margin-top: 0%; margin-left: 0%">
          <h2 style="font-size: 28px">商品类别：</h2>
          <el-button
            type="text"
            v-for="(
              full_category_path_item, full_category_path_item_index
            ) in category_result.full_category_path"
            :key="full_category_path_item_index"
            @click="get_category(full_category_path_item[0])"
            style="font-size: 20px; padding: 0; color: black"
          >
            {{ full_category_path_item[1] }}
            <i
              v-if="
                full_category_path_item_index <
                category_result.full_category_path.length - 1
              "
              class="el-icon-right"
            ></i>
          </el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-tree
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-aside>
        <el-main>
          <el-row
            v-for="(item, plindex) in category_result.product_list"
            :key="plindex"
          >
            <el-row :gutter="10" style="border-style: none; margin-bottom: 0px;">
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-image
                    style="width: 200px; height: 150px; border-radius: 20px"
                    :src="item.img_url"
                    :preview-src-list="[item.img_url]"
                  >
                  </el-image></div
              ></el-col>
              <el-col :span="16"
                ><div class="grid-content bg-purple">
                  <p>主题：{{ item.title }}</p>
                  <p>标签属性：{{ item.attribute }} </p>
                </div></el-col
              >
            </el-row>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
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

      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },

      category_result: {
        category_id: 5629,
        category_name: "Health_&_Personal_Care",
        full_category_path: [
          [5629, "Health_&_Personal_Care"],
          [6056, "Personal_Care"],
        ],
        child_category: [
          {
            id: 5630,
            name: "Baby_&_Child_Care",
            child_node: [
              {
                id: 5631,
                name: "Babffsy_&_Chfffild_Care",
                child_node: [
                  {
                    id: 5632,
                    name: "dd&_Child_Care",
                    child_node: [],
                  },
                ],
              },
              {
                id: 5640,
                name: "dsdfsdfChild_Care",
                child_node: [],
              },
            ],
          },
          {
            id: 5644,
            name: "Baby_&_Child_Care2",
            child_node: [],
          },
        ],

        keyword: [
          ["-", 233],
          ["oz", 131],
          ["of", 106],
          ["with", 105],
          ["ea", 85],
          ["for", 70],
        ],
        product_list: [
          {
            attribute: " Brand: NULL Price: 0.00",
            img_url:
              "http://ecx.images-amazon.com/images/I/51G%2BRqOCiqL._SY300_.jpg",
            title: "Principles of Mgmt + Oper-CSUF Custom C",
          },
          {
            attribute: " Brand: NULL Price: 0.00",
            img_url:
              "http://ecx.images-amazon.com/images/I/41kbZB047NL._SY300_.jpg",
            title: "Brain Fitness Exercises Software",
          },
          {
            attribute: " Brand: NULL Price: 0.00",
            img_url:
              "http://ecx.images-amazon.com/images/I/51G%2BRqOCiqL._SY300_.jpg",
            title: "Principles of Mgmt + Oper-CSUF Custom C",
          },
          {
            attribute: " Brand: NULL Price: 0.00",
            img_url:
              "http://ecx.images-amazon.com/images/I/41kbZB047NL._SY300_.jpg",
            title: "Brain Fitness Exercises Software",
          },
        ],
      },
    };
  },

  mounted() {
    this.category_result = this.$route.params.category_result;
    console.log('get info function mounted')
    console.log(this.category_result);
    this.data = new Array();
    for (var i = 0; i < this.category_result.child_category.length; i++) {
      // console.log(this.category_result.child_category[i])
      var t = this.add_node(this.category_result.child_category[i]);
      // console.log(t)
      this.data.push(t);
    }
  },

  methods: {
    handleNodeClick(data) {
      console.log(data);
    },

    add_node(cate) {
      var data = {};
      data["label"] = cate["name"];
      if (cate["child_node"].length > 0) {
        data["children"] = new Array();
      }

      for (var i = 0; i < cate["child_node"].length; i++) {
        var ch = this.add_node(cate["child_node"][i]);
        data["children"].push(ch);
      }
      return data;
    },
    get_category(category_id_) {
      console.log(category_id_);
      this.post_category_data(category_id_);
    },

    async post_category_data(cid) {
      var path = "http://10.214.223.9:5000/get_category_info";
      const json_data = {
        category_id: cid,
      };
      console.log('get category info')
      console.log(json_data)
      await fetch(path, "post", JSON.stringify(json_data)).then((res) => {
        console.log(res);
        if (res["code"] == 200) {
          this.$router.push({
            name: "Category",
            params: { category_info: res["msg"] },
          });
        } else {
          alert("查询错误");
        }
      });
    },

    get_category(category_id_) {
      console.log(category_id_);
      this.post_category_data(category_id_);
    },
  },
};
</script>





<style scoped>
.category {
  margin-top: 50px;
  margin-left: 70px;
}

.el-header {
  background-color: transparent;
  margin-bottom: 70px;
  margin-bottom: 48px;
  padding-bottom: 144px;
  border-bottom-style: solid;
  border-width: 2.5px;
  max-width: 95%;
  /* line-height: 60px; */
}

.el-aside {
  width: "150px";
  background-color: transparent;
  border-style: solid;
  border-color: #dcdfe6;
  border-width: 2px;
  border-radius: 15px;
  min-height: 600px;
  margin-top: 20px;
  padding-top: 23px;
  overflow-x: scroll;

  /* line-height: 200px; */
}

.el-main {
  background-color: transparent;
  /* line-height: 160px; */
}
.el-row {
  margin-bottom: 30px;
  border-style: solid;
  border-radius: 20px;
  border-width: 2px;
  border-color: #dcdfe6;
  padding: 20px 20px 20px 20px;
}
</style>

