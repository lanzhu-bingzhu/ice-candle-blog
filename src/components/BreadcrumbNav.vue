<template>
  <nav aria-label="Breadcrumb navigation" class="flex items-center space-x-2 text-sm py-2">
    <template v-for="(item, index) in items" :key="index">
      <span v-if="index > 0" class="text-slate-400 select-none">/</span>
      <router-link v-if="item.to && index < items.length - 1" :to="item.to" class="text-blue-500 hover:text-blue-600 transition-colors">
        {{ item.label }}
      </router-link>
      <span v-else-if="index === items.length - 1" class="text-slate-600 font-medium cursor-default">
        {{ item.label }}
      </span>
      <span v-else class="text-slate-500 cursor-default">{{ item.label }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string | { name: string; params?: Record<string, any> }
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>