<template>
  <div>{{ $route.params.path }}

  </div>
</template>

<script setup>
import { useStore } from '@/store'
const route = useRoute()
const store = useStore()
const servicesList = computed(() => store.servicesList)
const {$translate} = useNuxtApp()

onMounted(() => {
  console.log(servicesList.value.find(el => $translate(el.title) === route.params.path))
})
</script>

<style scoped>

</style>