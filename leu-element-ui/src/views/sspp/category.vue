<template>
  <div class="box">
    <el-radio v-model="oversea" label="">All</el-radio>
    <el-radio v-model="oversea" label="-1">Location</el-radio>
    <el-radio v-model="oversea" label="-2">Oversea</el-radio><br>

    <el-radio v-model="fromType" label="online">线上</el-radio>
    <el-radio v-model="fromType" label="offline">离线</el-radio><br>
    <el-tabs @tab-click="handleClick">
      <template v-for="(item, key) in list">
        <el-tab-pane :key="item.$index" :label="key">
          <!-- <el-row v-for="(item, key) in list" v-bind:key="item.$index"> -->
          <el-row v-for="item2 in item" :key="item2.$index">
            <el-button type="primary" @click="openGoods(key,item2.cid, item2.name)">{{ item2.name }}</el-button>
            <el-row v-for="item3 in item2.child" :key="item3.$index">
              <el-button type="success" @click="openGoods(key,item3.cid, item3.name)">{{ item3.name }}</el-button>
              <el-button v-for="item4 in item3.child" :key="item4.$index" type="info" plain @click="openGoods(key,item4.cid, item4.name)">{{ item4.name }}</el-button>
            </el-row>
            <hr>
          </el-row>
        <!-- </el-row> -->
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import { allCategory } from '@/api/sspp'
export default {
  data() {
    return {
      fromType: 'offline',
      list: [],
      oversea: ''
    }
  },
  created() {
    allCategory().then(response => {
      // console.log(response)
      this.list = response.data
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    openGoods(shop, cid, cname) {
      // dataFrom=offline 离线的
      window.open('/#/sspp/table?type=3&dataFrom=' + this.fromType + '&oversea=' + this.oversea + '&cname=' + cname + '&shop=' + shop + '&cid=' + cid, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .box { margin: 10px 20px 0; }
  button {margin: 3px;}
</style>
