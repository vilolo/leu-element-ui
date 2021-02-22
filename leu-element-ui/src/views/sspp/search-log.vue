<template>
  <div>
    <el-table
      :data="list"
    >
      <el-table-column fixed label="ID" prop="id" sortable align="center" width="80">
        <template scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="SHOP" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.shop }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="TYPE" prop="type" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ typeList[row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="KEYWORD" prop="keyword" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.keyword }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="ADD_TIME" prop="created_at" sortable align="center">
        <template slot-scope="{row}">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="操作" sortable align="center" width="200">
        <template slot-scope="{row}">
          <el-button type="success" @click="openSearch(row.params)">Open</el-button> <el-button type="danger" @click="delSearchLog(row.id)">Del</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { showSearchLog, delSearchLog } from '@/api/sspp'
export default {
  data() {
    return {
      list: [],
      typeList: {
        '1': 'keyword',
        '2': 'shop',
        '3': 'category'
      }
    }
  },
  created() {
    showSearchLog().then(response => {
      this.list = response.data
    })
  },
  methods: {
    openSearch(params) {
      window.open('/#/sspp/table?' + params, '_blank')
    },
    delSearchLog(id) {
      delSearchLog(id).then(response => {
        this.$message({
          message: response.msg,
          type: response.code === 20000 ? 'success' : 'error'
        })
        if (response.code === 20000) {
          // window.location.reload()
          showSearchLog().then(response => {
            this.list = response.data
          })
        }
      })
    }
  }
}
</script>
