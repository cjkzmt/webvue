<script setup lang="ts">
import { queriedResult, queryCondition, queryComputer, handleDelete,handleStatusChange,handlecreatetextChange,handlecreatevideoChange,handlepublishvideoChange } from '@/composables/useComputer'
import { timeFormatter } from '@/utils/timeHandler'
import { ref } from 'vue'
import DlgPCCreateOrEdit from './DlgPCCreateOrEdit.vue'
const dlgCreateOrEdit = ref<InstanceType<typeof DlgPCCreateOrEdit>>()
queryComputer()
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
          <!-- <el-form-item label="电脑品牌">
            <el-input v-model="queryCondition.Brand" placeholder="请输入电脑品牌" clearable />
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
            <el-button type="primary" @click="queryComputer({ currentPage: 1 })">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button
          class="Createbutton"
          style="margin-top: -19px"
          type="primary"
          @click="dlgCreateOrEdit?.initAndShow()"
          >添加电脑</el-button
        >
      </div>
    </template>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="id" label="电脑ID" width="80" align="center" />
      <el-table-column prop="name" label="电脑名" align="center" />
      <el-table-column prop="uniqueId" label="设备编码" align="center" />
      <el-table-column
        prop="createdTime"
        label="注册时间"
        width="180"
        align="center"
        :formatter="timeFormatter"
      />

      <el-table-column label="文案制作" width="180" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.createtext"
          class="mb-2"
          active-value="ENABLE"
          inactive-value="DISABLE"
          active-text="启用"
          inactive-text="禁用"
          @change="handlecreatetextChange($event as 'ENABLE' | 'DISABLE', row.id)"
        />
      </el-table-column>
      <el-table-column label="视频制作" width="180" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.createvideo"
          class="mb-2"
          active-value="ENABLE"
          inactive-value="DISABLE"
          active-text="启用"
          inactive-text="禁用"
          @change="handlecreatevideoChange($event as 'ENABLE' | 'DISABLE', row.id)"
        />
      </el-table-column>
      <el-table-column label="视频发布" width="180" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.publishvideo"
          class="mb-2"
          active-value="ENABLE"
          inactive-value="DISABLE"
          active-text="启用"
          inactive-text="禁用"
          @change="handlepublishvideoChange($event as 'ENABLE' | 'DISABLE', row.id)"
        />
      </el-table-column>
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
      @size-change="(pageSize: number) => queryComputer({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryComputer({ currentPage })"
    />
    <DlgPCCreateOrEdit ref="dlgCreateOrEdit" />
  </el-card>
</template>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-self: center;
  margin-top: 17px;
}
</style>
