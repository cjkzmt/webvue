<template>
  <el-container class="layout-container-demo">
    <AppSide />
    <el-container class="header-and-main">
      <AppHeader />
      <el-main>
        <el-scrollbar>
          <RouterView />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppSide from './AppAside.vue'
import AppHeader from './AppHeader.vue'
</script>

<style scoped>
.layout-container-demo {
  background: #f5f5f5;
  height: 100vh;
}
.header-and-main {
  flex-direction: column;
  height: 100vh;
}
.el-main {
  background-color: #fff;
  margin: 16px;
  border-radius: 8px;
  padding-right: 0;
}
</style>
