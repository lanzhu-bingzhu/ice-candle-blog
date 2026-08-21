<template>
  <section>
    <div class="container mx-auto">
      <div class="p-16">
        <component
            :is="isExternalLink ? 'a' : 'router-link'"
            :href="isExternalLink ? content.link : undefined"
            :target="isExternalLink ? '_blank' : undefined"
            :rel="isExternalLink ? 'noopener noreferrer' : undefined"
            :to="isExternalLink ? undefined : content.link"
        >
          <div class="relative w-full h-60 overflow-hidden rounded cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-300/50">
            <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url('${content.image}')` }"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>
            <div class="relative z-10 flex h-full items-center px-16">
              <div class="font-bold text-ice-600">
                <h2 class="text-4xl">{{ content.title }}</h2>
                <p class="pt-2">{{ content.description }}</p>
              </div>
            </div>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  content: {
    title: string
    description: string
    image: string
    link: string
  }
}>()

const content = computed(() => {
  return props.content
})

const isExternalLink = computed(() => {
  return props.content.link.startsWith('http://') || props.content.link.startsWith('https://')
})
</script>

<style scoped>

</style>