<script setup lang="ts">
import { isCollapse } from './isCollapse'
import { getUserInfo, logout } from '@/api/users'
import { useTokenStore } from '@/stores/mytoken'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
const router = useRouter()
const userInfo = ref({ portrait: '', userName: '' })
getUserInfo().then((res) => {
  userInfo.value = res.data.content
})
const handleLogout = async () => {
  await ElMessageBox.confirm('是否退出登录？', '提示询问', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.error('已取消')
    return new Promise(() => {})
  })
  await logout().catch(() => {})
  ElMessage.success('退出成功')
  useTokenStore().saveToken()
  router.push({ name: 'login' })
}
</script>

<template>
  <el-header>
    <el-icon @click="isCollapse = !isCollapse">
      <IEpExpand v-show="isCollapse" />
      <IEpFold v-show="!isCollapse" />
    </el-icon>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">promotion management</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="32" :src="userInfo.portrait" />
        <el-icon class="el-icon--right">
          <IEparrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #fff;
  margin: 16px 16px 0; // 上、左、右为16px，下为0
  border-radius: 8px; // 添加圆角
  .el-icon {
    margin-right: 17px;
  }
}
.el-dropdown {
  margin-left: auto;
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .el-avatar {
    width: 32px;
    height: 32px;
  }
}
</style>
