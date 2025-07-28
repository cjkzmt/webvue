<script setup lang="ts">
import { ref } from 'vue'
import { allTypeVideo, GetAllTypeVideo, DeleteTypeVideo } from '@/composables/useTypeVideo'
import { allTypeCover, GetAllTypeCover, DeleteTypeCover } from '@/composables/useTypeCover'
import { allTypeSubtitle, GetAllTypeSubtitle, DeleteTypeSubtitle } from '@/composables/useTypeSubtitle'
GetAllTypeVideo()
GetAllTypeCover()
GetAllTypeSubtitle()
import DlgTypeVideoCreateOrEdit from './DlgTypeVideoCreateOrEdit.vue'
import DlgTypeCoverCreateOrEdit from './DlgTypeCoverCreateOrEdit.vue'
import DlgTypeSubtitleCreateOrEdit from './DlgyTpeSubtitleCreateOrEdit.vue'
const dlgTypeVideoCreateOrEdit = ref<InstanceType<typeof DlgTypeVideoCreateOrEdit>>()
const dlgTypeSubtitleCreateOrEdit = ref<InstanceType<typeof DlgTypeSubtitleCreateOrEdit>>()
const dlgTypeCoverCreateOrEdit = ref<InstanceType<typeof DlgTypeCoverCreateOrEdit>>()
</script>

<template>
<el-card class="box-card">
    <template #header>
      <div
        class="box-card"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <h3>视频样式</h3>
        <el-button class="button" type="primary" @click="dlgTypeVideoCreateOrEdit?.initAndShow()"
          >添加视频样式</el-button
        >
      </div>
    </template>
    <el-table :data="allTypeVideo" border label-width="120px" style="width: 100%">
      <el-table-column type="index" label="序号"  width="80" align="center" />
      <el-table-column prop="name" label="视频样式" align="center" />
      <el-table-column prop="videoheight" label="视频高" align="center" />
      <el-table-column prop="videowidth" label="视频宽" align="center" />
      <el-table-column label="操作" align="center" width="200"  v-slot="{ row }">
        <el-button type="primary" @click="dlgTypeVideoCreateOrEdit?.initAndShow(row.id)"
          >编辑</el-button>
        <el-button type="danger" @click="DeleteTypeVideo(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DlgTypeVideoCreateOrEdit ref="dlgTypeVideoCreateOrEdit" />
  </el-card>

  <el-card class="box-card2">
    <template #header>
      <div
        class="box-card2"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <h3>封面样式</h3>
        <el-button class="button" type="primary" @click="dlgTypeCoverCreateOrEdit?.initAndShow()"
          >添加封面样式</el-button
        >
      </div>
    </template>
    <el-table :data="allTypeCover" border label-width="120px" style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="name" label="封面样式" align="center" />
      <el-table-column prop="fixedtitle" label="固定标题" align="center" />
      <el-table-column label="操作" align="center" width="200"  v-slot="{ row }">
        <el-button type="primary" @click="dlgTypeCoverCreateOrEdit?.initAndShow(row.id)"
          >编辑</el-button>
        <el-button type="danger" @click="DeleteTypeCover(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DlgTypeCoverCreateOrEdit ref="dlgTypeCoverCreateOrEdit" />
  </el-card>

  <el-card class="box-card2">
    <template #header>
      <div
        class="box-card2"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <h3>字幕样式</h3>
        <el-button class="button" type="primary" @click="dlgTypeSubtitleCreateOrEdit?.initAndShow()"
          >添加字幕样式</el-button
        >
      </div>
    </template>
    <el-table :data="allTypeSubtitle" border label-width="120px" style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="name" label=" 字幕样式" align="center" />
      <el-table-column prop="fontsize" label=" 字号" align="center" />
      <el-table-column prop="fontcolor" label="字色" align="center" />
      <el-table-column label="操作" align="center" width="200" v-slot="{ row }">
        <el-button type="primary" @click="dlgTypeSubtitleCreateOrEdit?.initAndShow(row.id)"
          >编辑</el-button
        >
        <el-button type="danger" @click="DeleteTypeSubtitle(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DlgTypeSubtitleCreateOrEdit ref="dlgTypeSubtitleCreateOrEdit" />
  </el-card>


</template>

<style lang="scss" scoped>
.box-card {
  width: auto;
  margin-right: 18px;
}
.box-card2 {
  width: auto;
  margin-right: 18px;
  margin-top: 17px;
}
</style>
