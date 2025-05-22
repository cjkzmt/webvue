<script setup lang="ts">
import { isCollapse } from './isCollapse'
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse">
        <el-menu-item>
          <a href="/" class="logo">
            <img src="@/assets/logo.svg" />
            <h1>新媒体大师</h1>
          </a></el-menu-item
        >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><IEpDataLine /></el-icon><span>项目数据</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">综合数据</el-menu-item>
            <el-menu-item index="1-1">账号数据</el-menu-item>
            <el-menu-item index="1-2">用户数据</el-menu-item>
            <el-menu-item index="1-2">视频数据</el-menu-item>
            <el-menu-item index="1-2">文案数据</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><IEpManagement /></el-icon><span>项目任务</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">综合任务</el-menu-item>
            <el-menu-item index="2-2">文案任务</el-menu-item>
            <el-menu-item index="2-2">视频任务</el-menu-item>
            <el-menu-item index="2-2">素材任务</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><IEpMonitor /></el-icon><span>项目设备</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">手机</el-menu-item>
            <el-menu-item index="2-2">电脑</el-menu-item>
            <el-menu-item index="2-2">手机号</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><IEpMoney /></el-icon><span>项目费用</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">硬件</el-menu-item>
            <el-menu-item index="2-2">租金</el-menu-item>
            <el-menu-item index="2-2">工资</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><IEpsetting /></el-icon><span>项目设置</span>
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="3-1">Option 1</el-menu-item>
            <el-menu-item index="3-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="3-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="3-4">
            <template #title>Option 4</template>
            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>
            <el-icon><IEpSetUp /></el-icon><span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/menus">菜单管理</el-menu-item>
            <el-menu-item index="2-2">租金</el-menu-item>
            <el-menu-item index="2-2">工资</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  //   color: var(--el-text-color-primary);
  //   background: var(--el-color-primary-light-8);
  background-color: #fff;
  height: 100vh;
  width: auto;
}

.el-menu {
  background-color: #fff;
  border-right: none;
  width: 200px;
  white-space: nowrap;
  &.el-menu--collapse {
    & h1 {
      display: none;
    }
    width: 60px;
  }
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  height: 60px;

  img {
    width: 32px;
    height: 32px;
    margin-right: 5px;
    transition: all 0.3s ease; // 可选：添加过渡效果
  }
}
</style>
