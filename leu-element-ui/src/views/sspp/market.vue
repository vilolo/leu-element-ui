<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input />
      <el-select>
        <el-option label="item" value="item" />
      </el-select>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name" sortable align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      list: [
        {
          id: 1,
          name: 'bbb'
        },
        {
          id: 2,
          name: 'ccc'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
