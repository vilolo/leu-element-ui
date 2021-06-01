<template>
  <div class="sspp">
    <el-tabs type="border-card">
      <el-tab-pane label="工具">
        <h2 />
        后台：<el-button type="primary" @click="openUrl(urlList.allStore1)">打开第一批</el-button>
        <el-button type="primary" @click="openUrl(urlList.allStore2)">KitiMall</el-button>
        <el-button type="primary" @click="openUrl(urlList.dianxiaomi)">小秘</el-button>
        <el-button type="primary" @click="openUrl(urlList.yuncang)">小云</el-button>
        <el-button type="primary" @click="openUrl(urlList.data)">数据</el-button>
        <el-button type="primary" @click="openUrl(urlList.market)">分析</el-button>
        <el-button type="primary" @click="openUrl(urlList.subaccount)">子母</el-button>

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
        <el-button type="success" @click="openUrl(urlList.allCategory)">所有分类</el-button>

        <h2 />
        搜索：
        <span>
          <el-col :span="4">
            <el-input v-model="kw" />
          </el-col>
        </span>
        <el-button type="danger" @click="openUrl(urlList.taobao, kw, true)">搜索</el-button><br><br>
        <el-row>
          <el-radio v-for="(item, index) in storeList" :key="item.id" v-model="shop" :label="index">{{ item }}</el-radio><br><br>
          <el-input
            v-model="keywords"
            :autosize="{ minRows: 10}"
            type="textarea"
          />
          <el-button type="primary" @click="searchKws">搜索</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="模板">
        <stemplate />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { urlList } from '../../utils/sspp'
import { $URL } from '../../utils/gbk'
import Stemplate from '@/components/Sspp/Stemplate'
export default {
  components: {
    Stemplate
  },
  data() {
    return {
      urlList: urlList,
      kw: '',
      keywords: '',
      storeList: {
        my: '马来',
        tw: '台湾',
        th: '泰国',
        br: '巴西',
        sg: '新加坡'
      },
      shop: 'my'
    }
  },
  methods: {
    openUrl: function(urlList, keyword, isEncode) {
      if (typeof (keyword) === 'undefined') {
        keyword = ''
      }
      const oldkeyword = keyword
      if (keyword.length > 0 && isEncode === true) {
        keyword = $URL.encode(keyword)
      }
      for (const item in urlList) {
        if (urlList[item].indexOf('@keyword@') > -1) {
          window.open(urlList[item].replace('@keyword@', keyword))
        } else {
          window.open(urlList[item].replace('@oldkeyword@', oldkeyword))
        }
      }
    },
    searchKws() {
      const arr = this.keywords.split('\n')
      console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        const kw = arr[i].replace(/(^\s*)|(\s*$)/g, '')
        if (kw) {
          window.open('/#/sspp/table?type=1&oversea=-2&keyword=' + kw + '&shop=' + this.shop, '_blank')
        }
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
