<script setup lang="ts">
import FullscreenLoading from '@/components/FullscreenLoading.vue'
import { useLoading } from '@/composables/useLoading'
const { loading, loadingText } = useLoading()
</script>

<template>
  <router-view></router-view>
  <FullscreenLoading :loading="loading" :text="loadingText" />
</template>
