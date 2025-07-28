<script setup lang="ts">
import { queriedResult, queryCondition, queryScript, handleDelete ,AddTask ,RefreshTask} from '@/composables/useScript'
import { timeFormatter } from '@/utils/timeHandler'
queryCondition.value.getinfo = 'Task'
queryScript()
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
          v-model="queryCondition.ScriptId"
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
      <el-table-column type="index" label="序号" width="70" align="center" />
      <el-table-column prop="AccountTeam" label="发布组" width="80" align="center" />
      <el-table-column
        prop="publishtime"
        label="发布时间"
        width="180"
        align="center"
        :formatter="timeFormatter"
      />
      <el-table-column prop="id" width="80"  label="脚本ID" align="center" />
      <el-table-column label="脚本文案" align="center">
        <template v-slot="{ row }">
          <span v-if="row.linestatus === null || row.linestatus === 'null'">待制作</span>
          <span v-else-if="row.linestatus === 'ENABLE'">完成</span>
          <span v-else-if="row.linestatus === 'DISABLE'">待审核</span>
          <span v-else>{{ row.linestatus }}</span> <!-- 其他情况直接显示原始值 -->
        </template>
      </el-table-column>
      <el-table-column label="视频文案" align="center">
        <template v-slot="{ row }">
          <span v-if="row.copystatus === null || row.copystatus === 'null'">待制作</span>
          <span v-else-if="row.copystatus === 'ENABLE'">完成</span>
          <span v-else-if="row.copystatus === 'DISABLE'">待审核</span>
          <span v-else>{{ row.copystatus }}</span> <!-- 其他情况直接显示原始值 -->
        </template>
      </el-table-column>
      <el-table-column label="视频制作" align="center">
        <template v-slot="{ row }">
          <span v-if="row.videostatus === null || row.videostatus === 'null'">待制作</span>
          <span v-else-if="row.videostatus === 'ENABLE'">完成</span>
          <span v-else-if="row.videostatus === 'DISABLE'">待审核</span>
          <span v-else>{{ row.videostatus }}</span> <!-- 其他情况直接显示原始值 -->
        </template>
      </el-table-column>
      <el-table-column prop="douyin" label="抖音"  align="center" />
      <el-table-column prop="sph" label="视频号"  align="center" />
      <el-table-column prop="kuaishou" label="快手"  align="center" />
      <el-table-column prop="xiaohongshu" label="小红书"  align="center" />
      <el-table-column prop="status" label="任务状态" align="center" />
      <el-table-column label="操作" align="center" width="90" v-slot="{ row }">
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
      @size-change="(pageSize: number) => queryScript({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryScript({ currentPage })"
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
