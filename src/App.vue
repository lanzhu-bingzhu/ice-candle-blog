<script setup lang="ts">
import FullscreenLoading from '@/components/FullscreenLoading.vue'
import { useLoading } from '@/composables/useLoading'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Ice Candle - 个人网站',
  meta: [
    { name: 'description', content: 'Ice candle - 个人兴趣分享网站，主要分享有关游戏、绘画和编程的个人心得。' },
    { name: 'keywords', content: '个人网站,游戏评测,绘画,ACG,前端开发,技术博客,ica candle,lanzhubingzhu' },
  ],
})

const { loading, loadingText } = useLoading()
</script>

<template>
  <router-view></router-view>
  <FullscreenLoading :loading="loading" :text="loadingText" />
</template>
