<script setup lang="ts">
import {
  forminstance,
  onSubmit,
  form,
  msgText,
  dialogFormVisible,
  initAndShow,
} from '@/composables/useScript'
const formLabelWidth = '140px'
defineExpose({initAndShow})
import { topFonts, fetchTopFonts } from '@/composables/useFont'
fetchTopFonts()
import { topVoiceOvers, fetchTopVoiceOvers } from '@/composables/useVoiceOver'
fetchTopVoiceOvers()
import { topMusics, fetchTopMusics } from '@/composables/useMusic'
fetchTopMusics()
import { topAccountTeams, fetchTopAccountTeams } from '@/composables/useAccountTeam'
fetchTopAccountTeams()
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '脚本'" width="1500">
    <el-form :model="form" ref="forminstance">
      <el-form-item label="标题描述" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" autocomplete="off"  type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item label="字幕文案" :label-width="formLabelWidth" prop="line">
        <el-input v-model="form.line" autocomplete="off"  type="textarea" :rows="5"  />
      </el-form-item>
      <el-form-item label="显示文案" :label-width="formLabelWidth" prop="subtitle">
        <el-input v-model="form.subtitle" autocomplete="off"  type="textarea" :rows="5" />
      </el-form-item>
      <el-form-item label="字幕读音" :label-width="formLabelWidth" prop="reading">
        <el-input v-model="form.reading" autocomplete="off" type="textarea" :rows="5"  />
      </el-form-item>
      <el-form-item label="视频描述" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" autocomplete="off" type="textarea" :rows="1"  />
      </el-form-item>
      <el-form-item label="视频封面标题" :label-width="formLabelWidth" prop="cover">
        <el-input v-model="form.cover" autocomplete="off" type="textarea" :rows="1"  />
      </el-form-item>
        <el-form-item label="发布日期" :label-width="formLabelWidth" prop="publishtime">
          <el-date-picker
            v-model="form.publishtime"
            type="datetime"
            placeholder="请选择日期和时间"
        />
      </el-form-item>
      <el-form-item label="视频文件名" :label-width="formLabelWidth" prop="videoname">
        <el-input v-model="form.videoname" autocomplete="off" type="textarea" :rows="1"  />
      </el-form-item>
      <el-form-item label="字体" :label-width="formLabelWidth"  prop="FontId">
        <el-select v-model="form.FontId" placeholder="请选择所在手机">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="Font in topFonts"
            :key="Font.id"
            :label="Font.name"
            :value="Font.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="账号组" :label-width="formLabelWidth"  prop="AccountTeamId">
        <el-select v-model="form.AccountTeamId" placeholder="请选择账号组">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="Team in topAccountTeams"
            :key="Team.id"
            :label="Team.number"
            :value="Team.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="背景音乐" :label-width="formLabelWidth"  prop="MusicId">
        <el-select v-model="form.MusicId" placeholder="请选择所在平台">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="Music in topMusics"
            :key="Music.id"
            :label="Music.name"
            :value="Music.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="配音" :label-width="formLabelWidth" prop="VoiceOverId">
        <el-select v-model="form.VoiceOverId" placeholder="请选择绑定手机号">
          <el-option label="未知" :value="-1" />
          <el-option
            v-for="VoiceOver in topVoiceOvers"
            :key="VoiceOver.id"
            :label="VoiceOver.name"
            :value="VoiceOver.id"
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
