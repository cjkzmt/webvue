<script setup lang="ts">
import { allPlatform, getAllPlatform, DeletePlatform } from '@/composables/usePlatform'
import { allReleasePlan, getAllReleasePlan, DeleteReleasePlan } from '@/composables/useReleasePlan'
import { allTypeText, getAllTypeText, DeleteTypeText } from '@/composables/useTypeText'
import {
  enabletopic,
  forbidtopic,
  enablecopy,
  forbidcopy,
  enableStatus,
  forbidStatus,
} from '@/api/typetext'
// import { timeFormatter } from '@/utils/timeHandler'
import DlgPlatformCreateOrEdit from './DlgPlatformCreateOrEdit.vue'
import DlgReleasePlanCreateOrEdit from './DlgReleasePlanCreateOrEdit.vue'
import DlgTypeTextCreateOrEdit from './DlgTypeTextCreateOrEdit.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
getAllPlatform()
getAllReleasePlan()
getAllTypeText()
const dlgPlatformCreateOrEdit = ref<InstanceType<typeof DlgPlatformCreateOrEdit>>()
const dlgTypeTextCreateOrEdit = ref<InstanceType<typeof DlgTypeTextCreateOrEdit>>()
const dlgReleasePlanCreateOrEdit = ref<InstanceType<typeof DlgReleasePlanCreateOrEdit>>()

const handletopicChange = async (act: 'ENABLE' | 'DISABLE', id: number) => {
  const action = {
    ENABLE: { msg: '启用', fn: enabletopic },
    DISABLE: { msg: '禁用', fn: forbidtopic },
  }
  const { data } = await action[act].fn(id)
  if (data.code === '000000') {
    ElMessage.success(`${action[act].msg}成功`)
    getAllTypeText()
  } else {
    ElMessage.error(`${action[act].msg}失败`)
    throw new Error(`${action[act].msg}失败`)
  }
}
const handlecopyChange = async (act: 'ENABLE' | 'DISABLE', id: number) => {
  const action = {
    ENABLE: { msg: '启用', fn: enablecopy },
    DISABLE: { msg: '禁用', fn: forbidcopy },
  }
  const { data } = await action[act].fn(id)
  if (data.code === '000000') {
    ElMessage.success(`${action[act].msg}成功`)
    getAllTypeText()
  } else {
    ElMessage.error(`${action[act].msg}失败`)
    throw new Error(`${action[act].msg}失败`)
  }
}
const handleStatusChange = async (act: 'ENABLE' | 'DISABLE', id: number) => {
  const action = {
    ENABLE: { msg: '启用', fn: enableStatus },
    DISABLE: { msg: '禁用', fn: forbidStatus },
  }
  const { data } = await action[act].fn(id)
  if (data.code === '000000') {
    ElMessage.success(`${action[act].msg}成功`)
    getAllTypeText()
  } else {
    ElMessage.error(`${action[act].msg}失败`)
    throw new Error(`${action[act].msg}失败`)
  }
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div
        class="box-card"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <h3>平台列表</h3>
        <el-button class="button" type="primary" @click="dlgPlatformCreateOrEdit?.initAndShow()"
          >添加平台</el-button
        >
      </div>
    </template>
    <el-table :data="allPlatform" border label-width="120px" style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column prop="name" label="平台" align="center" />
      <el-table-column prop="sort" label="排序" align="center" />

      <el-table-column label="操作" align="center" v-slot="{ row }">
        <el-button type="primary" @click="dlgPlatformCreateOrEdit?.initAndShow(row.id)"
          >编辑</el-button
        >
        <el-button type="danger" @click="DeletePlatform(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DlgPlatformCreateOrEdit ref="dlgPlatformCreateOrEdit" />
  </el-card>
  <el-card class="box-card2">
    <template #header>
      <div
        class="box-card2"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <h3>每日发布计划</h3>
        <el-button class="button" type="primary" @click="dlgReleasePlanCreateOrEdit?.initAndShow()"
          >添加计划</el-button
        >
      </div>
    </template>
    <el-table :data="allReleasePlan" border label-width="120px" style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column prop="hour" label="时" align="center" />
      <el-table-column prop="minute" label="分" align="center" />

      <el-table-column label="操作" align="center" v-slot="{ row }">
        <el-button type="primary" @click="dlgReleasePlanCreateOrEdit?.initAndShow(row.id)"
          >编辑</el-button
        >
        <el-button type="danger" @click="DeleteReleasePlan(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DlgReleasePlanCreateOrEdit ref="dlgReleasePlanCreateOrEdit" />
  </el-card>
  <el-card class="box-card3">
    <template #header>
      <div
        class="box-card3"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <h3>文案类型</h3>
        <el-button class="button" type="primary" @click="dlgTypeTextCreateOrEdit?.initAndShow()"
          >添加文案类型</el-button
        >
      </div>
    </template>
    <el-table :data="allTypeText" border label-width="120px" style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column prop="name" label=" 名字" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column label="选题" width="180" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.topicSW"
          class="mb-2"
          active-value="ENABLE"
          inactive-value="DISABLE"
          active-text="启用"
          inactive-text="禁用"
          @change="handletopicChange($event as 'ENABLE' | 'DISABLE', row.id)"
        />
      </el-table-column>
      <el-table-column label="样本" width="180" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.copySW"
          class="mb-2"
          active-value="ENABLE"
          inactive-value="DISABLE"
          active-text="启用"
          inactive-text="禁用"
          @change="handlecopyChange($event as 'ENABLE' | 'DISABLE', row.id)"
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
        <el-button type="primary" @click="dlgTypeTextCreateOrEdit?.initAndShow(row.id)"
          >编辑</el-button
        >
        <el-button type="danger" @click="DeleteTypeText(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DlgTypeTextCreateOrEdit ref="dlgTypeTextCreateOrEdit" />
  </el-card>
</template>

<style lang="scss" scoped>
.box-card {
  width: auto;
  margin-right: 18px;
}
.box-card2 {
  width: auto;
  margin-right: 18px;
  margin-top: 17px;
}
.box-card3 {
  width: auto;
  margin-right: 18px;
  margin-top: 17px;
}
</style>
