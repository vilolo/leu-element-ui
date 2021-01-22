<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="16">
                <h1>工具：</h1>
            </el-col>
            <el-col :span="16">
                <el-button type="primary" @click="openUrl(urlList.dianxiaomi)">小秘</el-button>
                <el-button type="primary" @click="openUrl(urlList.translate)">翻译</el-button>
                <el-button type="primary" @click="toUrl('http://198.35.45.87:8095/#/market')">平台分析</el-button>
                <el-button type="primary" @click="toPath('/market')">分析2</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="16">
                <h1>店铺：</h1>
            </el-col>
            <el-col :span="16">
                <el-button type="primary" @click="openUrl(urlList.sp1)">第一批</el-button>
                <el-button type="primary" @click="openUrl(urlList.sp2)">第二批</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="16">
                <h1>查询：</h1>
            </el-col>
            <el-col :span="16">
                <el-input v-model="keyword" placeholder="请输入内容"/> <el-button @click="openUrl(urlList.taobao, keyword, true)">搜索</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {urlList} from '../common/urls'
import {$URL} from '../common/gbk'

export default {
    data(){
        return {
            urlList: urlList,
            keyword: ''
        }
    },
    methods:{
      openUrl: function(urlList, keyword, isEncode){
        if (typeof(keyword) === 'undefined'){
            keyword = ''
        }

        if (keyword.length > 0 && isEncode == true){
            keyword = $URL.encode(keyword)
        }

        for (let item in urlList) {
            window.open(urlList[item].replace('@keyword@', keyword))
        }
      },
      toUrl: function(url){
        window.open(url, '_blank');
      },
      toPath: function(path){
        // this.$router.push(path)
        let url = this.$router.resolve({
            path: path
        });
        window.open(url.href, '_blank');
      }
    },
    created(){
      // let url = this.$api.test;
      // this.$post(url, {"a":'aaa'}).then(function (res) {
      //     console.log("=======================")
      //     console.log(res)
      // });
    }
}
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
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
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-input {
    width: 200px;
  }
</style>