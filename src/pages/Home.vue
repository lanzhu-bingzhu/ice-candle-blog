<template>
  <div class="home-root min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="relative z-10">
      <section class="w-full">
        <div class="overflow-hidden duration-500 w-full h-[80dvh] bg-ice-900 flex items-center">
          <div class="w-2/3 max-w-6xl mx-auto">
            <span class="text-8xl font-extrabold tracking-tight text-ice-200">IceCandle</span>
          </div>
        </div>
      </section>
      <!-- 通用楼层循环 -->
      <template v-for="floor in floors" :key="floor.floor_id">
        <SectionFloor v-bind="floor" />
      </template>

      <!-- 备案信息底部 -->
      <Footer />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import SectionFloor from '@/components/SectionFloor.vue'
import Footer from '@/components/Footer.vue'
import { useHomeData } from '@/composables/useHomeData'
import PageHeader from '@/components/PageHeader.vue'

const { floors, loadFloors } = useHomeData()

onMounted(() => {
  loadFloors()
})
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