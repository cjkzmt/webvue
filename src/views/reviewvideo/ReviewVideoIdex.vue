<script setup lang="ts">
import { queriedResult, queryCondition, queryScript, handleDelete ,AddTask ,RefreshTask,EnablesSriptStatus} from '@/composables/useScript'
import { timeFormatter } from '@/utils/timeHandler'
import { ref } from 'vue'
import DlgScriptCreateOrEdit from './DlgReviewVideoCreateOrEdit.vue'
queryCondition.value.getinfo = 'ReviewVideo'
queryScript()
const dlgCreateOrEdit = ref<InstanceType<typeof DlgScriptCreateOrEdit>>()
</script>
<template>
  <el-card style="max-width: auto">
    <template #header>
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center">
    <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
      <el-form-item label="发布天数">
        <el-input
          v-model="queryCondition.Day"
          placeholder="请输入发布天数"
          clearable
          oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/^([2-9]|[1-9][0-9])$/, (match) => Math.min(28, match))"
        />
      </el-form-item>
      <el-form-item label="任务ID">
        <el-input
          v-model="queryCondition.id"
          placeholder="请输入任务ID"
          clearable
          oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/^([2-9]|[1-9][0-9])$/, (match) => Math.min(28, match))"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryScript({ currentPage: 1 })">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-left: auto; display: flex; gap: 10px;">
      <el-button
        class="Createbutton"
        style="margin-top: -19px"
        type="primary"
        @click="RefreshTask()"
        >刷新任务状态</el-button
      >
      <el-button
        class="Createbutton"
        style="margin-top: -19px"
        type="primary"
        @click="AddTask()"
        >批量添加任务</el-button
      >
    </div>
  </div>
    </template>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="删除" align="center" width="170" v-slot="{ row }">
        <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
        <el-button type="primary" @click="dlgCreateOrEdit?.initAndShow(row.id)">编辑</el-button>
      </el-table-column>
      <el-table-column prop="videoname" label="视频文件名" align="center" />
      <el-table-column prop="Font" label="字体" align="center" />
      <el-table-column prop="Music" label="背景音乐" align="center" />
      <el-table-column prop="VoiceOver" label="配音" align="center" />
      <el-table-column label="通过" align="center" width="120" v-slot="{ row }">
        <el-button type="primary" @click="EnablesSriptStatus(row.id)">审核通过</el-button>
      </el-table-column>
      <el-table-column
        prop="publishtime"
        label="发布时间"
        width="180"
        align="center"
        :formatter="timeFormatter"
      />
    <el-table-column prop="id" label="ID" width="60" align="center" />
    <el-table-column prop="TemplateId" label="编号" width="120" align="center" />
    </el-table>
    <el-pagination
      v-model:current-page="queriedResult.current"
      v-model:page-size="queriedResult.size"
      :page-sizes="[30, 80, 150, 200]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queriedResult.total"
      @size-change="(pageSize: number) => queryScript({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryScript({ currentPage })"
    />
    <DlgScriptCreateOrEdit ref="dlgCreateOrEdit" />
  </el-card>
</template>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-self: center;
  margin-top: 17px;
}
</style>
