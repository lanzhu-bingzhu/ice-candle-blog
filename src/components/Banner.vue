<template>
  <div class="w-full max-w-6xl mx-auto">
    <component
      :is="isExternalLink ? 'a' : 'router-link'"
      :href="isExternalLink ? link : undefined"
      :target="isExternalLink ? '_blank' : undefined"
      :rel="isExternalLink ? 'noopener noreferrer' : undefined"
      :to="isExternalLink ? undefined : link"
      class="block overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
    >
      <img :src="image" :alt="alt" class="w-full h-auto object-cover aspect-[21/9]" />
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  image: string
  link: string
  alt?: string
}>()

const isExternalLink = computed(() => {
  return props.link.startsWith('http://') || props.link.startsWith('https://')
})
</script>