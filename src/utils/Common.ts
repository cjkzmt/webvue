import { watch, type Ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createTimeRangeWatcher(queryConditionRef: Ref<Record<string, any>>) {
  return (timeRange: Ref<string | [Date, Date]>) => {
    watch(
      timeRange,
      (newTime) => {
        if (Array.isArray(newTime)) {
          queryConditionRef.value.statCreateTime = newTime[0]?.toISOString() ?? ''
          queryConditionRef.value.endCreateTime = newTime[1]?.toISOString() ?? ''
        } else {
          queryConditionRef.value.statCreateTime = ''
          queryConditionRef.value.endCreateTime = ''
        }
      },
      { immediate: true } // 看你是否需要立即执行一次
    )
  }
}

type Action = 'ENABLE' | 'DISABLE'

export const createHandler =
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enableFn: (id: number) => Promise<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    disableFn: (id: number) => Promise<any>,
    refresh: () => void   // 刷新列表的函数，也由调用方决定
  ) =>
  async (act: Action, userId: number) => {
    const actionMap = {
      ENABLE: { msg: '启用', fn: enableFn },
      DISABLE: { msg: '禁用', fn: disableFn }
    }

    try {
      const { data } = await actionMap[act].fn(userId)
      if (data.code === '000000') {
        ElMessage.success(`${actionMap[act].msg}成功`)
        refresh()
      } else {
        ElMessage.error(`${actionMap[act].msg}失败`)
        throw new Error(`${actionMap[act].msg}失败`)
      }
    } catch (e) {
      ElMessage.error(`${actionMap[act].msg}失败`)
      throw e
    }
  }

type DeleteHandlerOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteFn: (id: number) => Promise<any>
  refresh: () => void
  getDisplayName: () => string
}

export const createDeleteHandler =
  ({ deleteFn, refresh, getDisplayName }: DeleteHandlerOptions) =>
  async (id: number) => {
    try {
      await ElMessageBox.confirm(
        `此操作将永久删除该${getDisplayName()}，是否继续？`,
        '提示',
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      )
    } catch {
      ElMessage.info('已取消删除')
      return
    }

    try {
      const { data } = await deleteFn(id)
      if (data.code === '000000') {
        ElMessage.success(`删除${getDisplayName()}成功`)
        refresh()
      } else {
        ElMessage.error(`删除${getDisplayName()}失败`)
        throw new Error(`删除${getDisplayName()}失败`)
      }
    } catch (e) {
      ElMessage.error(`删除${getDisplayName()}失败`)
      throw e
    }
  }

