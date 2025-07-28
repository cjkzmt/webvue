<script setup lang="ts">
import { queriedResult, queryCondition, queryOllama, handleDelete ,handleStatusChange} from '@/composables/useOllama'
import { timeFormatter } from '@/utils/timeHandler'
import { ref } from 'vue'
queryOllama()
import { createTimeRangeWatcher } from '@/utils/Common'
const timeRange = ref<[Date, Date] | ''>('')
createTimeRangeWatcher(queryCondition)(timeRange)
</script>

<template>
  <el-card style="max-width: auto">
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column prop="name" label="手机名" width="180" align="center" />
      <el-table-column prop="id" label="手机ID" width="180" align="center" />
      <el-table-column prop="Model" label="型号" width="180" align="center" />
      <el-table-column prop="Brand" label="品牌" width="180" align="center" />
      <el-table-column prop="Owner" label="所有人" width="180" align="center" />
      <el-table-column prop="deviceid" label="设备ID" width="180" align="center" />
      <el-table-column prop="sort" label="排序" width="180" align="center" />
      <el-table-column
        prop="createdTime"
        label="注册时间"
        width="180"
        align="center"
        :formatter="timeFormatter"
      />
      <el-table-column label="状态" width="180" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.status"
          class="mb-2"
          active-value="ENABLE"
          inactive-value="DISABLE"
          active-text="启用"
          inactive-text="禁用"
          @change="handleStatusChange($event as 'ENABLE' | 'DISABLE', row.id)"
        />
      </el-table-column>

      <el-table-column label="操作" align="center" v-slot="{ row }">
        <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="queriedResult.current"
      v-model:page-size="queriedResult.size"
      :page-sizes="[30, 80, 150, 200]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queriedResult.total"
      @size-change="(pageSize: number) => queryOllama({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryOllama({ currentPage })"
    />
  </el-card>
</template>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-self: center;
  margin-top: 17px;
}
</style>
