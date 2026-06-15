<template>
  <div class="home-root relative min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <ParticleBackground />

    <main class="snap-container h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <!-- 第一屏：主标识 -->
      <section class="screen flex flex-col items-center justify-center snap-center relative min-h-screen">
        <div class="z-10 px-4 text-center">
          <h1 class="text-6xl md:text-8xl font-display font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg animate-float">
            IceCandle
          </h1>
          <p class="mt-6 text-lg md:text-xl text-slate-600 max-w-md mx-auto leading-relaxed">
            游戏 · 绘画 · ACG · 技术<br/>在冰与烛火之间，探索创造的世界
          </p>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f0f7ff] to-transparent pointer-events-none"></div>
      </section>

      <SectionAnimator>
        <GamesSection />
      </SectionAnimator>

      <SectionAnimator>
        <PaintingsSection />
      </SectionAnimator>

      <SectionAnimator>
        <ACGSection />
      </SectionAnimator>

      <SectionAnimator>
        <MusicSection />
      </SectionAnimator>

      <SectionAnimator>
        <TechSection />
      </SectionAnimator>

      <!-- Footer 屏幕 -->
      <SectionAnimator full-width>
        <section class="w-full flex items-end justify-center min-h-screen">
          <Footer />
        </section>
      </SectionAnimator>

      <!-- <DynamicStatus class="fixed bottom-4 left-0 right-0 z-20" /> -->
    </main>
  </div>
</template>

<script setup lang="ts">
import ParticleBackground from '@/components/ParticleBackground.vue'
// import DynamicStatus from '@/components/DynamicStatus.vue'
import Footer from '@/components/Footer.vue'
import GamesSection from '@/components/sections/GamesSection.vue'
import PaintingsSection from '@/components/sections/PaintingsSection.vue'
import ACGSection from '@/components/sections/ACGSection.vue'
import MusicSection from '@/components/sections/MusicSection.vue'
import TechSection from '@/components/sections/TechSection.vue'
import SectionAnimator from '@/components/SectionAnimator.vue'
</script>

<style scoped>
.snap-container {
  scroll-snap-type: y proximity;
}
.screen {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>