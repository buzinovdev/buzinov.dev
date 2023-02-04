<template>
  <div class="project-add">
    <h1 class="title">Выбрать проект</h1>
    <div class="project-inner">
      <div class="project-list" :class="{hovered}">
        <div
            class="project-item card"
            :style="`animation-delay: ${2.3 + (idx+1) * serviceItemsDelay}s;`"
            v-for="(item, idx) in projects"
            :key="idx"
            @mouseover="hovered = true"
            @mouseleave="hovered = false"
        >
          <div class="card-preview">
            <img :src="`/uploads/projects/${$translate(item.title)}/${item.preview}`">
          </div>
          <NuxtLink :to="`/dashboard/projects/${$translate(item.title)}`" class="card-edit">Редактировать</NuxtLink>
          <div class="card-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const router = useRouter()
import {useStore} from '@/store'

const store = useStore()
const hovered = ref<boolean>(false)
const serviceItemsDelay = 0.2
if (store.projectsList.length === 0) {
  store.getProjects()
}
const {data: projects} = useFetch(`${store.apiLink}projects/getProjects`)
const {$translate} = useNuxtApp()
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.project {
  &-inner {
    padding: 8px;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 12px;
    opacity: 0;
    animation: show 2s 2s forwards;
  }

  &-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    overflow: hidden;
    border-radius: 12px;
  }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(50% - 1px);
  animation: showCard 2s 1s forwards;
  opacity: 0;
  transition: all $transition;

  &-title {
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    right: 0;
    font-weight: 700;
    font-size: 16px;
    padding: 10px;
    text-align: center;
    transform: translateY(0);
    opacity: 1;
    color: $dark-color;
    background-color: $light-color;
    transition: all $transition;
  }

  &-edit {
    display: block;
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    font-size: 14px;
    padding: 12px;
    text-align: center;
    transform: translate(-50%, -50%) scale(.1);
    opacity: 0;
    color: $dark-color;
    background-color: $light-color;
    border-radius: $radius;
    transition: all $transition;
  }

  &-preview {
    display: flex;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
    }

    &:before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
      transition: all $transition;
    }
  }
}

@media screen and (min-width: 1024px) {
  .project-list.hovered {
    .card-preview:before {
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .card:not(.show):hover {
    .card-title {
      transform: translateY(120%);
      opacity: 0;
    }

    .card-edit {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
}

@keyframes showCard {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>