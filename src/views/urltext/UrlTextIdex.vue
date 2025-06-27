<script setup lang="ts">
import { queriedResult, queryCondition, queryUrlText, handleDelete } from '@/composables/useUrlText'
import { enableUrlText, forbidUrlText } from '@/api/urltexts'
import { timeFormatter } from '@/utils/timeHandler'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import DlgUrlTextCreateOrEdit from './DlgUrlTextCreateOrEdit.vue'
queryUrlText()
const dlgCreateOrEdit = ref<InstanceType<typeof DlgUrlTextCreateOrEdit>>()
const handleStatusChange = async (act: 'Unfinished' | 'finished', userId: number) => {
  const action = {
    Unfinished: { msg: '未采集', fn: enableUrlText },
    finished: { msg: '已采集', fn: forbidUrlText },
  }
  const { data } = await action[act].fn(userId)
  if (data.code === '000000') {
    ElMessage.success(`${action[act].msg}成功`)
    queryUrlText()
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
            <el-button type="primary" @click="queryUrlText({ currentPage: 1 })">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button
          class="Createbutton"
          style="margin-top: -19px"
          type="primary"
          @click="dlgCreateOrEdit?.initAndShow()"
          >添加链接</el-button
        >
      </div>
    </template>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column prop="url" label="链接" width="380" align="center" />
      <el-table-column prop="id" label="链接ID" width="180" align="center" />
      <el-table-column prop="Author" label="作者" width="280" align="center" />
      <el-table-column
        prop="createdTime"
        label="注册时间"
        width="180"
        align="center"
        :formatter="timeFormatter"
      />
      <el-table-column label="状态" width="280" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.status"
          class="mb-2"
          active-value="finished"
          inactive-value="Unfinished"
          active-text="已采集"
          inactive-text="未采集"
          @change="handleStatusChange($event as 'Unfinished' | 'finished', row.id)"
        />
      </el-table-column>

      <el-table-column label="操作" align="center" v-slot="{ row }">
        <!-- <el-button type="primary" @click="dlgCreateOrEdit?.initAndShow(row.id)">编辑</el-button> -->
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
      @size-change="(pageSize: number) => queryUrlText({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryUrlText({ currentPage })"
    />
    <DlgUrlTextCreateOrEdit ref="dlgCreateOrEdit" />
  </el-card>
</template>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-self: center;
  margin-top: 17px;
}
</style>
