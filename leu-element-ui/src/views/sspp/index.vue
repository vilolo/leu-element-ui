<template>
  <div class="sspp">
    <el-tabs type="border-card">
      <el-tab-pane label="工具">
        <h2 />
        后台：<el-button type="primary" @click="openUrl(urlList.allStore1)">打开第一批</el-button>
        <el-button type="primary" @click="openUrl(urlList.allStore2)">KitiMall</el-button>
        <el-button type="primary" @click="openUrl(urlList.dianxiaomi)">小秘</el-button>
        <el-button type="primary" @click="openUrl(urlList.data)">数据</el-button>
        <el-button type="primary" @click="openUrl(urlList.market)">分析</el-button>

        <h2 />
        店铺：<el-button type="warning" @click="openUrl(urlList.jcz)">Jiangcz</el-button>
        <el-button type="warning" @click="openUrl(urlList.vil)">Vilolo</el-button>
        <el-button type="warning" @click="openUrl(urlList.fei)">xiaofeifei</el-button>
        <el-button type="warning" @click="openUrl(urlList.yp)">youpin</el-button>
        <el-button type="warning" @click="openUrl(urlList.fly)">flyplus</el-button>
        <el-button type="warning" @click="openUrl(urlList.kiti)">kitimall</el-button>

        <h2 />
        工具：<el-button type="success" @click="openUrl(urlList.countPrice)">计价</el-button>
        <el-button type="success" @click="openUrl(urlList.translate)">翻译</el-button>

        <h2 />
        搜索：
        <span>
          <el-col :span="4">
            <el-input v-model="kw" />
          </el-col>
        </span>
        <el-button type="danger" @click="openUrl(urlList.taobao, kw, true)">搜索</el-button>
      </el-tab-pane>
      <el-tab-pane label="模板">
        <el-tabs type="border-card">
          <el-tab-pane label="工具">
            sadf
          </el-tab-pane>
          <el-tab-pane label="工具">
            9999
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="分析">
        分析
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { urlList } from '../../utils/sspp'
import { $URL } from '../../utils/gbk'
export default {
  data() {
    return {
      urlList: urlList,
      kw: ''
    }
  },
  methods: {
    openUrl: function(urlList, keyword, isEncode) {
      if (typeof (keyword) === 'undefined') {
        keyword = ''
      }
      if (keyword.length > 0 && isEncode === true) {
        keyword = $URL.encode(keyword)
      }
      for (const item in urlList) {
        window.open(urlList[item].replace('@keyword@', keyword))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sspp {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
