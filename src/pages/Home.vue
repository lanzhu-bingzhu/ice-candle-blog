<template>
  <div class="home-root min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="relative z-10">
      <!-- 通用楼层循环 -->
      <template v-for="floor in floors" :key="floor.id">
        <SectionFloor v-bind="floor" />
      </template>

      <!-- 备案信息底部 -->
      <Footer />
    </main>
  </div>
</template>

<script setup lang="ts">
import SectionFloor from '@/components/SectionFloor.vue'
import Footer from '@/components/Footer.vue'
import { useHomeData } from '@/composables/useHomeData'
import PageHeader from '@/components/PageHeader.vue'

const { getCategoriesByParent } = useHomeData()

// 准备楼层数据
const floors = [
  {
    id: 'banner',
    title: 'banner',
    props: {
      image: '/images/paintings.jpg',
      link: '/task/painting',
      alt: '特色内容推荐'
    }
  },
  {
    id: 'games',
    title: '游戏',
    description: '游戏相关资料记录和分享',
    items: getCategoriesByParent('games'),
    props: {} as Record<string, never>
  },
  {
    id: 'paintings',
    title: '绘画',
    description: '原创角色、场景插画，笔尖下的世界',
    items: getCategoriesByParent('paintings'),
    props: {} as Record<string, never>
  },
  // {
  //   id: 'acg',
  //   title: 'ACG',
  //   description: '追番记录、漫画与手办收藏',
  //   items: getCategoriesByParent('acg'),
  //   props: {} as Record<string, never>
  // },
  {
    id: 'music',
    title: '音乐',
    description: '喜欢的歌曲，耳机里的世界',
    items: getCategoriesByParent('music'),
    props: {} as Record<string, never>
  },
  // {
  //   id: 'tech',
  //   title: '技术',
  //   description: '前端、工程化，学习与实践的记录',
  //   items: getCategoriesByParent('tech'),
  //   props: {} as Record<string, never>
  // },
  {
    id: 'banner',
    title: 'banner',
    props: {
      image: '/images/GUMI.jpg',
      link: 'https://www.bilibili.com/video/BV1mx41197L6',
      alt: '特色内容推荐'
    }
  }
]
</script>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>