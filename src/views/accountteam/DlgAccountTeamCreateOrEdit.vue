<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useAccountTeam'
import { fetchTopPhones, topPhones } from '@/composables/usePhone'
import { fetchTopComputer, topComputer } from '@/composables/useComputer'
import { fetchTeamOwners, topTeamOwners } from '@/composables/useTeamOwner'
import { allTypeVideo, GetAllTypeVideo } from '@/composables/useTypeVideo'
import { allTypeCover, GetAllTypeCover} from '@/composables/useTypeCover'
import { allTypeSubtitle, GetAllTypeSubtitle} from '@/composables/useTypeSubtitle'
const formLabelWidth = '140px'
fetchTopComputer()
fetchTeamOwners()
fetchTopPhones()
GetAllTypeVideo()
GetAllTypeCover()
GetAllTypeSubtitle()
defineExpose({initAndShow})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '账号组'" width="500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="所属商家" :label-width="formLabelWidth" prop="TeamOwner_id">
        <el-select v-model="form.TeamOwner_id" placeholder="请选择所属商家">
          <el-option label="未在商家" :value="0" />
          <el-option
            v-for="TeamOwner in topTeamOwners"
            :key="TeamOwner.id"
            :label="TeamOwner.shorthand"
            :value="TeamOwner.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在电脑" :label-width="formLabelWidth" prop="Computer_id">
        <el-select v-model="form.Computer_id" placeholder="请选择所在电脑">
          <el-option label="未在电脑" :value="0" />
          <el-option
            v-for="Computer in topComputer"
            :key="Computer.id"
            :label="Computer.name"
            :value="Computer.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="组号" :label-width="formLabelWidth" prop="number">
        <el-input v-model="form.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="业务范围" :label-width="formLabelWidth" prop="scope">
        <el-input v-model="form.scope" autocomplete="off" />
      </el-form-item>

      <el-form-item label="视频样式" :label-width="formLabelWidth" prop="TypeVideo_id">
        <el-select v-model="form.TypeVideo_id" placeholder="请选择视频样式">
          <el-option label="未在手机" :value="0" />
          <el-option
            v-for="TypeVideo in allTypeVideo"
            :key="TypeVideo.id"
            :label="TypeVideo.name"
            :value="TypeVideo.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面样式" :label-width="formLabelWidth" prop="TypeCover_id">
        <el-select v-model="form.TypeCover_id" placeholder="请选择封面样式">
          <el-option label="未在手机" :value="0" />
          <el-option
            v-for="TypeCover in allTypeCover"
            :key="TypeCover.id"
            :label="TypeCover.name"
            :value="TypeCover.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="字幕样式" :label-width="formLabelWidth" prop="TypeSubtitle_id">
        <el-select v-model="form.TypeSubtitle_id" placeholder="请选字幕样式">
          <el-option label="未在手机" :value="0" />
          <el-option
            v-for="TypeSubtitle in allTypeSubtitle"
            :key="TypeSubtitle.id"
            :label="TypeSubtitle.name"
            :value="TypeSubtitle.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在手机" :label-width="formLabelWidth" prop="Phone_id">
        <el-select v-model="form.Phone_id" placeholder="请选择所在手机">
          <el-option label="未在手机" :value="0" />
          <el-option
            v-for="Phone in topPhones"
            :key="Phone.id"
            :label="Phone.name"
            :value="Phone.id"
          />
        </el-select>
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
