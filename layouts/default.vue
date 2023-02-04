<template>
  <div class="main">
    <Header/>
    <NuxtPage class="page" :class="{hide}"/>
    <Notification/>
  </div>
</template>

<script setup lang="ts">
import Notification from "@/components/Notification.vue";
import {useStore} from '@/store'
const route = useRoute()
const store = useStore()
const hide = computed<boolean>(() => store.isShowMenu)
const currentStyle = computed<string>(() => store.style)
onBeforeMount(() => {
  const style = localStorage.getItem('currentAppStyle') || currentStyle.value
  const token = localStorage.getItem('token') || null
  store.changeAppStyle(style)
  store.setToken(token)
})
useHead({
  link: [{
    rel: 'canonical', href: `https://buzinov.dev${route.path}`
  }],
  meta: [
    {property: "og:site:name", content: "Бузинов Андрей - web разработчик"},
    {property: "og:locale", content: "ru_RU"},
    {property: "og:image", content: "Скрин сайта для ссылок - нужно сделать"},
    {property: "og:image:alt", content: "Web разработчик"}
  ]
})
</script>
<style lang="scss">
.main,
.header {
  background: v-bind(currentStyle);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.page-enter-from {
  transform: scale(.5);
}

.page-leave-to {
  transform: scale(1.5);
}
</style>