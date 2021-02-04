<template>
  <div class="app-container">
    <div class="filter-container">

      <el-radio v-for="(item, index) in storeList" :key="item.id" v-model="store" :label="index">{{ item }}</el-radio><br><br>

      <el-radio v-model="type" label="1">keyword</el-radio>
      <el-radio v-model="type" label="2">name</el-radio><br><br>

      <el-input v-model="minPrice" style="width: 200px;" placeholder="最低" />
      <el-input v-model="maxPrice" style="width: 200px;" placeholder="最高" />
      <br>
      <el-input v-model="oversea" style="width: 200px;" placeholder="-1=location, -2=oversea" />
      <br>
      <el-input v-model="newest" style="width: 200px;" placeholder="newest" />
      <br>
      <el-input v-model="keyword" style="width: 200px;" class="filter-item" placeholder="keyword" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable align="center" width="80">
        <template scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="NAME" prop="name" sortable align="center" width="110">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IMG" prop="name" sortable align="center" width="110">
        <template slot-scope="{row}">
          <img v-for="img in row.images" :key="img.id" width="100px" :src="img">
        </template>
      </el-table-column>
      <el-table-column label="PRICE" prop="price" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ctime" prop="ctime" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="days" prop="days" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.days }}</span>
        </template>
      </el-table-column>
      <el-table-column label="sold" prop="sold" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.sold }}</span>
        </template>
      </el-table-column>
      <el-table-column label="avgSold" prop="avgSold" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.avgSold }}</span>
        </template>
      </el-table-column>
      <el-table-column label="soldProfit" prop="soldProfit" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.soldProfit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="avgSoldProfit" prop="avgSoldProfit" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.avgSoldProfit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="historicalSold" prop="historicalSold" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.historicalSold }}</span>
        </template>
      </el-table-column>
      <el-table-column label="avgHistoricalSold" prop="avgHistoricalSold" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.avgHistoricalSold }}</span>
        </template>
      </el-table-column>
      <el-table-column label="soldHistoricalProfit" prop="soldHistoricalProfit" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.soldHistoricalProfit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="avgSoldHistoricalProfit" prop="avgSoldHistoricalProfit" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.avgSoldHistoricalProfit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="avgViewCount" prop="avgViewCount" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.avgViewCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="itemRating" prop="itemRating" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.itemRating }}</span>
        </template>
      </el-table-column>
      <el-table-column label="avgLike" prop="avgLike" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.avgLike }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMarketData } from '@/api/sspp'
export default {
  data: function() {
    return {
      type: '1',
      listLoading: false,
      list: [],
      keyword: '',
      store: 'my',
      minPrice: '',
      maxPrice: '',
      oversea: '',
      newest: 0,
      storeList: {
        my: '马来',
        tw: '台湾',
        th: '泰国',
        br: '巴西',
        sg: '巴西'
      }
    }
  },
  methods: {
    handleFilter() {
      getMarketData({
        keyword: this.keyword,
        store: this.store,
        type: this.type,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        oversea: this.oversea,
        newest: this.newest
      }).then(response => {
        this.list = response.data.goodsList
      }).catch((e) => {})
    }
  }
}
</script>
