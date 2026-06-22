<template>
  <footer class="w-full py-20 md:py-28 px-4 bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-300">
      <div class="flex flex-col items-center md:items-start gap-1">
        <p>&copy; {{ currentYear }} IceCandle. All rights reserved.</p>
        <p>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="hover:text-blue-500 transition-colors">豫ICP备2022022883号-2</a>
        </p>
        <p>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=41160302000184"
            rel="noreferrer"
            target="_blank"
            class="hover:text-blue-500 transition-colors"
          >
            豫公网安备41160302000184号
          </a>
        </p>
      </div>
      <div class="flex items-center gap-1 text-blue-400">
        <span class="text-lg">❄️🕯️</span>
        <span class="font-display font-semibold text-slate-200">IceCandle</span>
      </div>
      <div class="flex gap-4">
        <a href="https://space.bilibili.com/588046682" class="text-slate-400 hover:text-blue-400 transition-colors" title="Bilibili">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>