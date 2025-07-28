<script setup lang="ts">
import { queriedResult, queryCondition, queryTopicCopy, handleDelete, handleStatusChange } from '@/composables/useTopicCopy'
import { timeFormatter } from '@/utils/timeHandler'
import { ref } from 'vue'
import DlgTopicCopyCreateOrEdit from './DlgTopicCopyCreateOrEdit.vue'
queryTopicCopy()
const dlgCreateOrEdit = ref<InstanceType<typeof DlgTopicCopyCreateOrEdit>>()
import { createTimeRangeWatcher } from '@/utils/Common'
const timeRange = ref<[Date, Date] | ''>('')
createTimeRangeWatcher(queryCondition)(timeRange)
</script>

<template>
  <el-card style="max-width: auto">
    <template #header>
      <div
        class="card-header"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <!-- <el-form-item label="选题样本">
            <el-input v-model="queryCondition.number" placeholder="请输入选题样本" clearable />
          </el-form-item> -->
          <el-form-item label="录入时间">
            <el-date-picker
              v-model="timeRange"
              type="datetimerange"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryTopicCopy({ currentPage: 1 })">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button
          class="Createbutton"
          style="margin-top: -19px"
          type="primary"
          @click="dlgCreateOrEdit?.initAndShow()"
          >添加选题样本</el-button
        >
      </div>
    </template>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <!-- <el-table-column type="index" label="序号" width="70" align="center" /> -->
      <el-table-column prop="id" label="ID" width="50" align="center" />
      <el-table-column prop="text" label="选题样本" align="center" />
      <el-table-column prop="url" label="链接" width="280" align="left" />
      <el-table-column prop="topicnum" label="选题" width="70" align="center" />
      <el-table-column prop="copynum" label="样本" width="70" align="center" />
      <el-table-column prop="TypeText" label="类型" width="70" align="center" />
      <el-table-column prop="Author" label="作者" width="70" align="center" />
      <el-table-column
        prop="createdTime"
        label="注册时间"
        width="180"
        align="center"
        :formatter="timeFormatter"
      />
      <el-table-column label="状态" width="170" align="center" v-slot="{ row }">
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

      <el-table-column label="操作" align="center"  width="170" v-slot="{ row }">
        <el-button type="primary" @click="dlgCreateOrEdit?.initAndShow(row.id)">编辑</el-button>
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
      @size-change="(pageSize: number) => queryTopicCopy({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryTopicCopy({ currentPage })"
    />
    <DlgTopicCopyCreateOrEdit ref="dlgCreateOrEdit" />
  </el-card>
</template>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-self: center;
  margin-top: 17px;
}
</style>
