<script setup lang="ts">
import { useMenus } from '@/composables/useMenus'
import { useRoute } from 'vue-router'
const { getAllMenus, topMenus, form, onSubmit, getMenuInfoById, msgText } = useMenus()
getAllMenus()
const route = useRoute()
getMenuInfoById(route.params.id as unknown as number)
</script>
<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="菜单名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="菜单路径">
      <el-input v-model="form.href" />
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-select v-model="form.parentId" placeholder="请选择上级菜单">
        <el-option label="顶层菜单" :value="-1" />
        <el-option v-for="menu in topMenus" :key="menu.id" :label="menu.name" :value="menu.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="菜单描述">
      <el-input v-model="form.description" />
    </el-form-item>
    <el-form-item label="图标名称">
      <el-input v-model="form.icon" />
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio-group v-model="form.show">
        <el-radio :value="true">是</el-radio>
        <el-radio :value="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="form.orderNum" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即{{ msgText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.el-form {
  background-color: #fff;
  padding: 70px;
}
</style>
