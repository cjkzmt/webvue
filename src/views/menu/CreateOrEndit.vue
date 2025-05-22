<script setup lang="ts">
import { useMenus } from '@/composables/useMenus'
const { getAllMenus, topMenus } = useMenus()
getAllMenus()
</script>
<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
