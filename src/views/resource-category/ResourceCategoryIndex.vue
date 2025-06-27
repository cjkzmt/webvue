<script setup lang="ts">
import {
  allResourceCategory,
  getAllResourceCategory,
  handleDelete,
} from '@/composables/useResourceCategory'
import { timeFormatter } from '@/utils/timeHandler'
import DlgResourceCategoryCreateOrEdit from './DlgResourceCategoryCreateOrEdit.vue'
import { ref } from 'vue'
getAllResourceCategory()
const dlgCreateOrEdit = ref<InstanceType<typeof DlgResourceCategoryCreateOrEdit>>()
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div
        class="box-card"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <h3>资源类别列表</h3>
        <el-button class="button" type="primary" @click="dlgCreateOrEdit?.initAndShow()"
          >创建类别</el-button
        >
      </div>
    </template>
    <el-table :data="allResourceCategory" border label-width="120px" style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column prop="name" label="类别名称" align="center" />
      <el-table-column
        prop="createdTime"
        :formatter="timeFormatter"
        label="创建时间"
        align="center"
      />
      <el-table-column prop="sort" label="排序" align="center" />
      <el-table-column label="操作" align="center" v-slot="{ row }">
        <el-button type="primary" @click="dlgCreateOrEdit?.initAndShow(row.id)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DlgResourceCategoryCreateOrEdit ref="dlgCreateOrEdit" />
  </el-card>
</template>

<style lang="scss" scoped>
.box-card {
  width: auto;
  margin-right: 18px;
}
</style>
