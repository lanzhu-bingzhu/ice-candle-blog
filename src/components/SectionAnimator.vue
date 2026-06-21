<template>
  <section
    :id="id"
    ref="sectionRef"
    class="screen snap-center relative flex flex-col items-center min-h-screen"
  >
    <div
      class="z-10 w-full transition-all duration-800 ease-out"
      :class="[
        fullWidth ? '' : 'max-w-6xl',
        centerContent ? 'flex-1 flex flex-col items-center justify-center' : '',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      ]"
    >
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

defineProps<{
  fullWidth?: boolean
  centerContent?: boolean
  id?: string
}>()

const sectionRef = ref<HTMLElement>()
const isVisible = ref(false)

useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isVisible.value = true
  },
  { threshold: 0.3 }
)
</script>

<style scoped>
.screen {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
.transition-all.duration-800 {
  transition-property: opacity, transform;
  transition-duration: 800ms;
  transition-timing-function: ease-out;
}
</style>