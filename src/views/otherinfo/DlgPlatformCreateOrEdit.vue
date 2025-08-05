<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/usePlatform'
const formLabelWidth = '140px'
defineExpose({initAndShow})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '平台'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="English" :label-width="formLabelWidth" prop="English">
        <el-input v-model="form.English" autocomplete="off" />
      </el-form-item>
      <el-form-item label="标题字数" :label-width="formLabelWidth" prop="character">
        <el-input v-model="form.character" autocomplete="off" />
      </el-form-item>
      <el-form-item label="关键词数" :label-width="formLabelWidth" prop="keycount">
        <el-input v-model="form.keycount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证信息" :label-width="formLabelWidth" prop="verification">
        <el-input v-model="form.verification" autocomplete="off" />
      </el-form-item>
      <el-form-item label="预发天数" :label-width="formLabelWidth" prop="advance">
        <el-input v-model="form.advance" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证链接" :label-width="formLabelWidth" prop="publishverif">
        <el-input v-model="form.publishverif" autocomplete="off" />
      </el-form-item>


      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model="form.sort" autocomplete="off" />
      </el-form-item>
      <el-form-item label="采集链接" :label-width="formLabelWidth" prop="publishurl">
        <el-input v-model="form.publishurl" autocomplete="off" />
      </el-form-item>
      <el-form-item label="发布链接" :label-width="formLabelWidth" prop="Scrapeurl">
        <el-input v-model="form.Scrapeurl" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提 交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
