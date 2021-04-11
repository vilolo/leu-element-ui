<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row v-if="(type !== '3' && type !== '4')">
        <el-col :span="12">
          <el-radio v-for="(item, index) in storeList" :key="item.id" v-model="shop" :label="index">{{ item }}</el-radio><br><br>

          <el-radio v-model="type" label="1">keyword</el-radio>
          <el-radio v-model="type" label="2">name</el-radio><br><br>

          <el-input v-model="minPrice" style="width: 200px;" placeholder="最低" />
          <el-input v-model="maxPrice" style="width: 200px;" placeholder="最高" />
          <br><br>

          <el-radio v-model="oversea" label="">All</el-radio>
          <el-radio v-model="oversea" label="-1">Location</el-radio>
          <el-radio v-model="oversea" label="-2">Oversea</el-radio><br>

          <!-- <el-input v-model="oversea" style="width: 200px;" placeholder="-1=location, -2=oversea" /> -->
          <br>
          <!-- <el-input v-model="newest" style="width: 200px;" placeholder="newest" /> -->
          <el-input-number v-model="newest" :step="100" />
          <br>
          <el-input v-model="keyword" style="width: 200px;" class="filter-item" placeholder="keyword" />
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter()">
            Search
          </el-button>
          <br>
        </el-col>
        <el-col :span="12">
          <el-radio v-model="dataFrom" label="online">线上</el-radio>
          <el-radio v-model="dataFrom" label="offline">离线</el-radio><br>

          <el-select v-model="cidMy" placeholder="请选择">
            <el-option
              v-for="item in categoryList['my']"
              :key="item.cid"
              :label="item.name"
              :value="item.cid"
            />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter(cidMy, 'my')">
            马来
          </el-button>

          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="openCategory('my')">
            open all my
          </el-button>

          <br>
          <el-select v-model="cidTw" placeholder="请选择">
            <el-option
              v-for="item in categoryList['tw']"
              :key="item.cid"
              :label="item.name"
              :value="item.cid"
            />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter(cidTw, 'tw')">
            台湾
          </el-button>

          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="openCategory('tw')">
            open all tw
          </el-button>

          <br>
          <el-select v-model="cidTh" placeholder="请选择">
            <el-option
              v-for="item in categoryList['th']"
              :key="item.cid"
              :label="item.name"
              :value="item.cid"
            />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter(cidTh, 'th')">
            泰国
          </el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="openCategory('th')">
            open all th
          </el-button>

          <br>
          <el-select v-model="cidSg" placeholder="请选择">
            <el-option
              v-for="item in categoryList['sg']"
              :key="item.cid"
              :label="item.name"
              :value="item.cid"
            />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter(cidSg, 'sg')">
            新加坡
          </el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="openCategory('sg')">
            open all sg
          </el-button>

          <br>
          <el-select v-model="cidBr" placeholder="请选择">
            <el-option
              v-for="item in categoryList['br']"
              :key="item.cid"
              :label="item.name"
              :value="item.cid"
            />
          </el-select>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter(cidBr, 'br')">
            巴西
          </el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="openCategory('br')">
            open all br
          </el-button>

          <el-col>
            <el-button type="success" @click="openCollect">打开商品收藏</el-button>
            <el-button type="warning" @click="openSearchLog">打开查询收藏</el-button>
          </el-col>
        </el-col>
      </el-row>

      <el-radio v-model="currency_type" label="0">原币</el-radio>
      <el-radio v-model="currency_type" label="1">RMB</el-radio>

      <el-button v-if="isSaveBtn" type="danger" @click="saveSearchLog">收藏该查询</el-button>

      <br><br>
      <span v-if=" (typeof(this.$route.query.cname) !== 'undefined') ">
        【 分类：{{ this.$route.query.cname }} 】,
      </span>
      <span>
        <el-tag>商品总数：{{ totalGoods }}</el-tag>,
        <el-tag>广告数：{{ totalAds }}</el-tag>,

        <el-tag v-if="currency_type !== '1'" type="success">收益（平均商品每日收益）：{{ perProductProfit }}</el-tag>,
        <el-tag v-if="currency_type === '1'" type="success">收益（平均商品每日收益）：￥{{ rmb_perProductProfit }}</el-tag>,

        <el-tag type="info">热度（平均商品每日浏览量）：{{ perViewProduct }}</el-tag>,

        <el-tag v-if="currency_type !== '1'" type="danger">转化（商品总平均浏览收益）：{{ avgProfitPerView }}</el-tag>,
        <el-tag v-if="currency_type === '1'" type="danger">转化（商品总平均浏览收益）：￥{{ rmb_avgProfitPerView }}</el-tag>,

        <el-tag type="info">热度（平均商品每日收藏）：{{ avgAvgLike }}</el-tag>,
      </span>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      :header-cell-style="rowClass"
      :cell-style="cellStyle"
      fit
      highlight-current-row
      style="width: 100%;"
      height="800"
      :default-sort="default_sort"
    >
      <el-table-column fixed label="ID" prop="id" sortable align="center" width="50">
        <template scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="NAME" prop="name" sortable align="center" width="120">
        <template slot-scope="{row}">
          <span><el-link type="primary" :href="row.url" target="_blank">{{ row.name }}</el-link></span>
        </template>
      </el-table-column>
      <el-table-column fixed label="IMG" prop="name" sortable align="center" width="110">
        <template slot-scope="{row}">
          <img v-for="img in row.images" :key="img.id" width="100px" :src="img">
        </template>
      </el-table-column>
      <el-table-column
        label="价格"
        prop="price"
        sortable
        align="center"
        width="80"
        :sort-method="(a,b) => sortMethod(a ,b , 'price')"
      >
        <template slot-scope="{row}">
          <span v-if="currency_type !== '1'">{{ row.price }}</span>
          <span v-if="currency_type === '1'">￥{{ row.rmb_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ctime" prop="ctime" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>
            {{ row.ctime }}
            <el-button v-if="(type != 4) && row.isShow" @click="collect(row)">收藏</el-button>
            <el-button v-if="(type == 4)" @click="delCollect(row.did)">删除</el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="days"
        prop="days"
        sortable
        align="center"
        width="80"
        :sort-method="(a,b) => sortMethod(a ,b , 'days')"
      >
        <template slot-scope="{row}">
          <span>{{ row.days }}</span>
        </template>
      </el-table-column>

      <el-table-column style="background:red" align="center" label="近期数据">
        <el-table-column label="销量" style="background:red" prop="sold" sortable align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.sold }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="每日平均销量"
          prop="avgSold"
          sortable
          align="center"
          width="80"
          :sort-method="(a,b) => sortMethod(a ,b , 'avgSold')"
        >
          <template slot-scope="{row}">
            <span>{{ row.avgSold }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收益（10%）"
          prop="soldProfit"
          sortable
          align="center"
          width="80"
          :sort-method="(a,b) => sortMethod(a ,b , 'soldProfit')"
        >
          <template slot-scope="{row}">
            <span v-if="currency_type !== '1'">{{ row.soldProfit }}</span>
            <span v-if="currency_type === '1'">￥{{ row.rmb_soldProfit }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="每日平均收益"
          prop="avgSoldProfit"
          sortable
          align="center"
          width="80"
          :sort-method="(a,b) => sortMethod(a ,b , 'avgSoldProfit')"
        >
          <template slot-scope="{row}">
            <span v-if="currency_type !== '1'">{{ row.avgSoldProfit }}</span>
            <span v-if="currency_type === '1'">￥{{ row.rmb_avgSoldProfit }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column
        label="平均浏览数"
        prop="avgViewCount"
        sortable
        align="center"
        width="80"
        :sort-method="(a,b) => sortMethod(a ,b , 'avgViewCount')"
      >
        <template slot-scope="{row}">
          <span>{{ row.avgViewCount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="历史总数据" align="center">
        <el-table-column label="总销量" prop="historicalSold" sortable align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.historicalSold }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="每日平均销量"
          prop="avgHistoricalSold"
          sortable
          align="center"
          width="80"
          :sort-method="(a,b) => sortMethod(a ,b , 'avgHistoricalSold')"
        >
          <template slot-scope="{row}">
            <span>{{ row.avgHistoricalSold }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总收益"
          prop="soldHistoricalProfit"
          sortable
          align="center"
          width="80"
          :sort-method="(a,b) => sortMethod(a ,b , 'soldHistoricalProfit')"
        >
          <template slot-scope="{row}">
            <span v-if="currency_type !== '1'">{{ row.soldHistoricalProfit }}</span>
            <span v-if="currency_type === '1'">￥{{ row.rmb_soldHistoricalProfit }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="每日平均收益"
          prop="avgSoldHistoricalProfit"
          sortable
          align="center"
          width="80"
          :sort-method="(a,b) => sortMethod(a ,b , 'avgSoldHistoricalProfit')"
        >
          <template slot-scope="{row}">
            <span v-if="currency_type !== '1'">{{ row.avgSoldHistoricalProfit }}</span>
            <span v-if="currency_type === '1'">￥{{ row.rmb_avgSoldHistoricalProfit }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column
        label="转化（总收益/总浏览量）"
        prop="profitPerView"
        sortable
        align="center"
        width="80"
        :sort-method="(a,b) => sortMethod(a ,b , 'profitPerView')"
      >
        <template slot-scope="{row}">
          <span v-if="currency_type !== '1'">{{ row.profitPerView }}</span>
          <span v-if="currency_type === '1'">￥{{ row.rmb_profitPerView }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="平均收藏"
        prop="avgLike"
        sortable
        align="center"
        width="80"
        :sort-method="(a,b) => sortMethod(a ,b , 'avgLike')"
      >
        <template slot-scope="{row}">
          <span>{{ row.avgLike }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="广告词"
        prop="adsKeyword"
        sortable
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.adsKeyword }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="地址"
        prop="shopLocation"
        sortable
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.shopLocation }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评分"
        prop="itemRating"
        sortable
        align="center"
        width="80"
        :sort-method="(a,b) => sortMethod(a ,b , 'itemRating')"
      >
        <template slot-scope="{row}">
          <span>{{ row.itemRating }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMarketData, getCategory, addCollect, delCollect, saveSearchLog } from '@/api/sspp'
export default {
  data: function() {
    return {
      type: typeof (this.$route.query.type) === 'undefined' ? '1' : this.$route.query.type,
      default_sort: this.$route.query.type !== '4' ? { prop: 'avgViewCount', order: 'descending' } : {},
      listLoading: false,
      list: [],
      keyword: this.$route.query.keyword,
      shop: typeof (this.$route.query.shop) === 'undefined' ? 'my' : this.$route.query.shop,
      minPrice: typeof (this.$route.query.minPrice) === 'undefined' ? '' : this.$route.query.minPrice,
      maxPrice: typeof (this.$route.query.maxPrice) === 'undefined' ? '' : this.$route.query.maxPrice,
      oversea: typeof (this.$route.query.oversea) === 'undefined' ? '' : this.$route.query.oversea,
      newest: 0,
      totalGoods: 0,
      totalAds: 0,
      storeList: {
        my: '马来',
        tw: '台湾',
        th: '泰国',
        br: '巴西',
        sg: '新加坡'
      },
      currency_type: typeof (this.$route.query.currency_type) === 'undefined' ? '0' : this.$route.query.currency_type,
      currencyRateList: {
        rmb1_my: 0.6284,
        rmb1_tw: 4.3535,
        rmb1_th: 4.6511,
        rmb1_br: 0.8521,
        rmb1_sg: 0.2064
      },
      categoryList: {
        my: [],
        tw: [],
        th: [],
        sg: [],
        br: []
      },
      cid: this.$route.query.cid,
      cidMy: '',
      cidTw: '',
      cidTh: '',
      cidSg: '',
      cidBr: '',
      dataFrom: typeof (this.$route.query.dataFrom) === 'undefined' ? 'online' : this.$route.query.dataFrom,
      cname: this.$route.query.cname,
      isSaveBtn: false,
      perViewProduct: 0,
      avgProfitPerView: 0,
      rmb_avgProfitPerView: 0,
      perProductProfit: 0,
      rmb_perProductProfit: 0,
      avgAvgLike: 0
    }
  },
  watch: {
    list(newVal, oldVal) {
      if (typeof newVal === 'undefined' || newVal.length === 0) {
        this.isSaveBtn = false
      } else {
        if (this.type !== '4') {
          this.isSaveBtn = true
        }
      }
    }
  },
  created() {
    getCategory({ shop: 'my' }).then(response => {
      this.categoryList['my'] = response.data
    })

    getCategory({ shop: 'tw' }).then(response => {
      this.categoryList['tw'] = response.data
    })

    getCategory({ shop: 'th' }).then(response => {
      this.categoryList['th'] = response.data
    })

    getCategory({ shop: 'sg' }).then(response => {
      this.categoryList['sg'] = response.data
    })

    getCategory({ shop: 'br' }).then(response => {
      this.categoryList['br'] = response.data
    })

    if (typeof (this.$route.query.type) !== 'undefined') {
      this.handleFilter()
    }
  },
  methods: {
    handleFilter(cid, shop) {
      this.list = []
      let type = this.type
      this.listLoading = true
      if (typeof cid !== 'undefined') {
        this.cid = cid
        type = 3
      }
      getMarketData({
        keyword: this.keyword,
        shop: typeof shop === 'undefined' ? this.shop : shop,
        type: type,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        oversea: this.oversea,
        newest: this.newest,
        cids: this.cid,
        dataFrom: this.dataFrom
      }).then(response => {
        for (const index in response.data.goodsList) {
          response.data.goodsList[index].isShow = true

          // 人民币数据
          response.data.goodsList[index].rmb_price = (response.data.goodsList[index].price / this.currencyRateList['rmb1_' + this.shop]).toFixed(2)
          response.data.goodsList[index].rmb_soldProfit = (response.data.goodsList[index].soldProfit / this.currencyRateList['rmb1_' + this.shop]).toFixed(2)
          response.data.goodsList[index].rmb_avgSoldProfit = (response.data.goodsList[index].avgSoldProfit / this.currencyRateList['rmb1_' + this.shop]).toFixed(2)
          response.data.goodsList[index].rmb_soldHistoricalProfit = (response.data.goodsList[index].soldHistoricalProfit / this.currencyRateList['rmb1_' + this.shop]).toFixed(2)
          response.data.goodsList[index].rmb_avgSoldHistoricalProfit = (response.data.goodsList[index].avgSoldHistoricalProfit / this.currencyRateList['rmb1_' + this.shop]).toFixed(2)
          response.data.goodsList[index].rmb_profitPerView = (response.data.goodsList[index].profitPerView / this.currencyRateList['rmb1_' + this.shop]).toFixed(2)
        }
        this.list = response.data.goodsList
        this.totalGoods = response.data.info.total_count
        this.totalAds = response.data.info.total_ads_count
        this.perViewProduct = response.data.info.perViewProduct
        this.perProductProfit = response.data.info.perProductProfit
        this.avgProfitPerView = response.data.info.avgProfitPerView
        this.isSaveBtn = this.isSaveBtn = typeof (this.$route.query.type) === 'undefined'

        this.rmb_perProductProfit = (response.data.info.perProductProfit / this.currencyRateList['rmb1_' + this.shop]).toFixed(2)
        this.rmb_avgProfitPerView = (response.data.info.avgProfitPerView / this.currencyRateList['rmb1_' + this.shop]).toFixed(2)

        this.avgAvgLike = response.data.info.avgAvgLike
      })
      // .catch((e) => {
      //   console.log(e)
      // })
      this.listLoading = false
    },

    openCategory(shop) {
      const c = this.categoryList[shop]
      var d = this.dataFrom
      var os = this.oversea
      var ct = this.currency_type
      for (const i in c) {
        setTimeout(function() {
          window.open('/#/sspp/table?type=3&dataFrom=' + d + '&currency_type=' + ct + '&oversea=' + os + '&cname=' + c[i].name + '&shop=' + shop + '&cid=' + c[i].cid, '_blank')
          // console.log(i)
        }, i * this.randomNum(600, 1200))
      }
    },

    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
          // break
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
          // break
        default:
          return 0
          // break
      }
    },

    sortMethod(a, b, column) {
      return parseFloat(a[column]) > parseFloat(b[column]) ? 1 : -1
    },

    // 设置表头的颜色
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 6) {
        return { background: '#87CEFA', color: 'white' }
      }
      if (rowIndex === 0 && columnIndex === 8) {
        return { background: '#FFDAB9', color: 'white' }
      }
    },

    // 设置指定行、列、具体单元格颜色
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let i = 6
      if (columnIndex === i++) {
        return { background: '#87CEFA' }
      }
      if (columnIndex === i++) {
        return { background: '#90EE90' }
      }
      if (columnIndex === i++) {
        return { background: '#EEE8AA' }
      }
      if (columnIndex === i++) {
        return { background: '#FFDAB9' }
      }
      i++
      if (columnIndex === i++) {
        return { background: '#87CEFA' }
      }
      if (columnIndex === i++) {
        return { background: '#90EE90' }
      }
      if (columnIndex === i++) {
        return { background: '#EEE8AA' }
      }
      if (columnIndex === i++) {
        return { background: '#FFDAB9' }
      }
    },

    collect(row) {
      addCollect({ row: row, shop: this.shop }).then(response => {
        this.$message({
          message: response.msg,
          type: response.code === 20000 ? 'success' : 'error'
        })

        if (response.code === 20000) {
          row.isShow = false
        }
      })
    },

    delCollect(id) {
      delCollect(id).then(response => {
        this.$message({
          message: response.msg,
          type: response.code === 20000 ? 'success' : 'error'
        })

        if (response.code === 20000) {
          // window.location.reload()
          this.handleFilter()
        }
      })
    },

    openCollect() {
      window.open('/#/sspp/table?type=4')
    },

    saveSearchLog() {
      saveSearchLog({
        keyword: this.keyword,
        shop: this.shop,
        type: this.type,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        oversea: this.oversea,
        newest: this.newest,
        cid: this.cid,
        dataFrom: this.dataFrom,
        cname: this.cname
      }).then(response => {
        this.$message({
          message: response.msg,
          type: response.code === 20000 ? 'success' : 'error'
        })
      })
    },

    openSearchLog() {
      window.open('/#/sspp/search-log')
    }
  }
}
</script>
