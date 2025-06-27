<script setup lang="ts">
import { queriedResult, queryCondition, queryPNumber, handleDelete } from '@/composables/usePNumber'
import { enablePNumber, forbidPNumber } from '@/api/pnumbers'
import { timeFormatter } from '@/utils/timeHandler'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import DlgPNumberCreateOrEdit from './DlgPNumberCreateOrEdit.vue'
queryPNumber()
const dlgCreateOrEdit = ref<InstanceType<typeof DlgPNumberCreateOrEdit>>()
const handleStatusChange = async (act: 'ENABLE' | 'DISABLE', userId: number) => {
  const action = {
    ENABLE: { msg: '启用', fn: enablePNumber },
    DISABLE: { msg: '禁用', fn: forbidPNumber },
  }
  const { data } = await action[act].fn(userId)
  if (data.code === '000000') {
    ElMessage.success(`${action[act].msg}成功`)
    queryPNumber()
  } else {
    ElMessage.error(`${action[act].msg}失败`)
    throw new Error(`${action[act].msg}失败`)
  }
}
const timeRange = ref('')
watch(timeRange, (newTime) => {
  if (Array.isArray(newTime)) {
    queryCondition.value.statCreateTime = newTime[0]?.toISOString()
    queryCondition.value.endCreateTime = newTime[1]?.toISOString()
  } else {
    queryCondition.value.statCreateTime = ''
    queryCondition.value.endCreateTime = ''
  }
})
</script>

<template>
  <el-card style="max-width: auto">
    <template #header>
      <div
        class="card-header"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="手机号">
            <el-input v-model="queryCondition.number" placeholder="请输入手机号" clearable />
          </el-form-item>
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
            <el-button type="primary" @click="queryPNumber({ currentPage: 1 })">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button
          class="Createbutton"
          style="margin-top: -19px"
          type="primary"
          @click="dlgCreateOrEdit?.initAndShow()"
          >添加手机号</el-button
        >
      </div>
    </template>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column prop="number" label="手机号" width="180" align="center" />
      <el-table-column prop="Owner" label="所有人" width="180" align="center" />
      <el-table-column prop="rent" label="月租" width="180" align="center" />
      <el-table-column prop="Phone" label="所在手机" width="180" align="center" />
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
      @size-change="(pageSize: number) => queryPNumber({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryPNumber({ currentPage })"
    />
    <DlgPNumberCreateOrEdit ref="dlgCreateOrEdit" />
  </el-card>
</template>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-self: center;
  margin-top: 17px;
}
</style>
