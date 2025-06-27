<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMenus } from '@/composables/useMenus'
const { allMenus, getAllMenus, handleDelete } = useMenus()
const router = useRouter()

getAllMenus()
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button type="primary" @click="router.push({ name: 'menu-create' })">添加菜单</el-button>
      </div>
    </template>
    <el-table :data="allMenus" border label-width="120px" style="width: 100%">
      <el-table-column type="index" label="序号" width="180" align="center" />
      <el-table-column prop="name" label="菜单名称" align="center" />
      <el-table-column prop="level" label="菜单层级" align="center" />
      <el-table-column prop="icon" label="菜单图标" align="center" />
      <el-table-column prop="orderNum" label="排序" align="center" />
      <el-table-column label="操作" align="center" v-slot="scope">
        <el-button
          type="primary"
          @click="router.push({ name: 'menu-edit', params: { id: scope.row.id } })"
          >编辑</el-button
        >
        <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.box-card {
  width: auto;
  margin-right: 18px;
}
</style>
