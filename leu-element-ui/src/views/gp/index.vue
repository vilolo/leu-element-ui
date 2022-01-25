<template>
  <div class="app-container">
    <template v-for="(item, index) in list">
      <el-container :key="index">
        <el-header style="height: 18px">
          <el-row>
            <el-col :span="10">{{ item.title }}</el-col>
            <el-col :span="10">
              <el-checkbox v-model="item.sign1" :true-label="1" :false-label="0" @change="test(item)">娃哈哈</el-checkbox>
              <el-checkbox v-model="item.sign2" :true-label="1" :false-label="0">奥利奥</el-checkbox>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <img src="https://qiniu.tangzhijiao.com/Fh5i3CyVRgynNrBz03BPSliqCFim">
        </el-main>
      </el-container>
    </template>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      list: [
        { id: 1, title: '1你好你好你好吗', sign1: 1, sign2: 0 },
        { id: 2, title: '2你好你好你好吗', sign1: 1, sign2: 0 }
      ]
    }
  },
  methods: {
    test: function(obj) {
      alert(obj.id)
      alert(obj.sign1)
    }
  }
}
</script>
