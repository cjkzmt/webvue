<script setup lang="ts">
import { queriedResult, queryCondition, queryUsers } from '@/composables/useUsers'
import { enableUser, forbidUser } from '@/api/users'
import { timeFormatter } from '@/utils/timeHandler'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
queryUsers()
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const handleStatusChange = async (act: 'ENABLE' | 'DISABLE', userId: number) => {
  const action = {
    ENABLE: { msg: '启用', fn: enableUser },
    DISABLE: { msg: '禁用', fn: forbidUser },
  }
  const { data } = await action[act].fn(userId)
  if (data.code === '000000') {
    ElMessage.success(`${action[act].msg}成功`)
    queryUsers()
  } else {
    ElMessage.error(`${action[act].msg}失败`)
    throw new Error(`${action[act].msg}失败`)
  }
}
const timeRange = ref('')
watch(timeRange, (newTime) => {
  if (Array.isArray(newTime)) {
    queryCondition.value.statCreateTime = newTime[0]?.toISOString()
    queryCondition.value.endCreateTime = newTime[1]?.toISOString()
  } else {
    queryCondition.value.statCreateTime = ''
    queryCondition.value.endCreateTime = ''
  }
})
</script>

<template>
  <el-card style="max-width: auto">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="手机号">
            <el-input v-model="queryCondition.phone" placeholder="请输入手机号" clearable />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="timeRange"
              type="datetimerange"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryUsers({ currentPage: 1 })">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="180" align="center" />
      <el-table-column label="头像" width="180" align="center" v-slot="{ row }">
        <el-avatar :size="50" :src="row.portrait || circleUrl" />
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="180" align="center" />
      <el-table-column prop="phone" label="手机号" width="180" align="center" />
      <el-table-column
        prop="createdTime"
        label="注册时间"
        width="180"
        align="center"
        :formatter="timeFormatter"
      />
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

      <el-table-column label="操作" width="180" align="center">
        <el-button type="defauly">分配角色</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="queriedResult.current"
      v-model:page-size="queriedResult.size"
      :page-sizes="[10, 30, 60, 100]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queriedResult.total"
      @size-change="(pageSize: number) => queryUsers({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryUsers({ currentPage })"
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
