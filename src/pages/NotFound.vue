<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <!-- 顶部 Logo -->
    <PageHeader />

    <!-- 主体内容 -->
    <main class="flex-1 flex items-center justify-center px-4">
      <div class="text-center relative">
        <!-- 背景装饰：几个漂浮的冰晶（纯 CSS 动画） -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <span class="absolute top-10 left-10 text-4xl opacity-20 animate-float delay-100">❄️</span>
          <span class="absolute bottom-20 right-16 text-3xl opacity-20 animate-float delay-300">✨</span>
          <span class="absolute top-1/2 left-1/4 text-5xl opacity-10 animate-float delay-500">🕯️</span>
        </div>

        <!-- 404 大标题 -->
        <h1 class="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent animate-float">
          404
        </h1>

        <!-- 提示文字 -->
        <p class="mt-6 text-xl md:text-2xl text-slate-600 font-medium">
          这个页面被冰封了，暂时无法访问 🧊
        </p>
        <p class="mt-2 text-slate-400">
          你寻找的页面可能不存在，或者已经被移动到其他地方
        </p>

        <!-- 返回按钮 -->
        <router-link to="/" class="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 shadow-sm transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          返回首页
        </router-link>
      </div>
    </main>

    <!-- 底部备案 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>

<style scoped>
.animate-float {
  animation: float 4s ease-in-out infinite;
}
.delay-100 { animation-delay: 0.1s; }
.delay-300 { animation-delay: 0.3s; }
.delay-500 { animation-delay: 0.5s; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>