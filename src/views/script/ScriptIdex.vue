<script setup lang="ts">
import { queriedResult, queryCondition, queryScript, handleDelete } from '@/composables/useScript'
// import { enableScript, forbidScript } from '@/api/scripts'
// import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import DlgScriptCreateOrEdit from './DlgScriptCreateOrEdit.vue'
queryCondition.value.Day = 0
queryScript()
const dlgCreateOrEdit = ref<InstanceType<typeof DlgScriptCreateOrEdit>>()

// const handleStatusChange = async (act: 'ENABLE' | 'DISABLE', userId: number) => {
//   const action = {
//     ENABLE: { msg: '审核', fn: enableScript },
//     DISABLE: { msg: '修改', fn: forbidScript },
//   }
//   const { data } = await action[act].fn(userId)
//   if (data.code === '000000') {
//     ElMessage.success(`${action[act].msg}成功`)
//     queryScript()
//   } else {
//     ElMessage.error(`${action[act].msg}失败`)
//     throw new Error(`${action[act].msg}失败`)
//   }
// }



// const timeRange = ref('')
// watch(timeRange, (newTime) => {
//   if (Array.isArray(newTime)) {
//     queryCondition.value.statCreateTime = newTime[0]?.toISOString()
//     queryCondition.value.endCreateTime = newTime[1]?.toISOString()
//   } else {
//     queryCondition.value.statCreateTime = ''
//     queryCondition.value.endCreateTime = ''
//   }
// })
</script>

<template>
  <el-card style="max-width: auto">
    <template #header>
      <div
        class="card-header"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="发布天数">
            <el-input
              v-model="queryCondition.Day"
              placeholder="请输入发布天数"
              clearable
              oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/^([2-9]|[1-9][0-9])$/, (match) => Math.min(28, match))"
            />
          </el-form-item>
          <el-form-item label="状态">
          <el-select v-model="queryCondition.status" placeholder="请选择审核状态" clearable style="width: 100px;">
            <el-option label="全部" value="" />
            <el-option label="未审核" value="DISABLE" />
            <el-option label="已审核" value="ENABLE" />
          </el-select>
        </el-form-item>
          <!-- <el-form-item label="录入时间">
            <el-date-picker
              v-model="timeRange"
              type="datetimerange"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="queryScript({ currentPage: 1 })">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button
          class="Createbutton"
          style="margin-top: -19px"
          type="primary"
          @click="dlgCreateOrEdit?.initAndShow()"
          >添加脚本</el-button
        >
      </div>
    </template>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <!-- <el-table-column type="index" label="序号" width="60" align="center" /> -->
      <!-- <el-table-column prop="VideoTemplate" label="预设模板" width="100" align="center" /> -->
      <el-table-column prop="id" label="ID" width="60" align="center" />
      <el-table-column prop="TemplateId" label="编号" width="120" align="center" />
      <!-- <el-table-column prop="AccountTeam" label="发布组" width="70" align="center" /> -->
      <el-table-column prop="line" label="字幕文案" align="center" />
      <el-table-column prop="covercopy" label="封面文案" width="100" align="center" />
      <!-- <el-table-column prop="visualcopy" label="画面文案" width="100" align="center" /> -->
      <!-- <el-table-column prop="sph" label="视频号"  align="center" /> -->

      <el-table-column prop="displaysubtitles" label="显示字幕" width="100" align="center" />
      <el-table-column prop="subtitlepronunciation" label="字幕读音" width="100" align="center" />
      <el-table-column prop="Font" label="字体" width="100" align="center" />
      <el-table-column prop="Music" label="背景音乐" width="100" align="center" />
      <el-table-column prop="VoiceOver" label="视频配音" width="100" align="center" />
      <!-- <el-table-column
        prop="createdTime"
        label="注册时间"
        width="180"
        align="center"
        :formatter="timeFormatter"
      /> -->
      <!-- <el-table-column label="状态" width="170" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.status"
          class="mb-2"
          active-value="ENABLE"
          inactive-value="DISABLE"
          active-text="已审核"
          inactive-text="未审核"
          @change="handleStatusChange($event as 'DISABLE' | 'ENABLE', row.id)"
        />
      </el-table-column> -->

      <el-table-column label="操作"  width="170"  align="center" v-slot="{ row }">
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
