<template>
  <div class="w-full relative">
    <component
      :is="isExternalLink ? 'a' : 'router-link'"
      :href="isExternalLink ? link : undefined"
      :target="isExternalLink ? '_blank' : undefined"
      :rel="isExternalLink ? 'noopener noreferrer' : undefined"
      :to="isExternalLink ? undefined : link"
      class="block overflow-hidden duration-500"
    >
      <img :src="image" :alt="alt" class="w-full h-auto object-cover" :class="aspect ? aspect : 'aspect-[21/9]'" />
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  image: string
  link: string
  alt?: string
  aspect?: string
}>()

const isExternalLink = computed(() => {
  return props.link.startsWith('http://') || props.link.startsWith('https://')
})
</script>