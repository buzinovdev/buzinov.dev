<template>
  <div class="page-projects">
    <h1 class="title">Мои проекты</h1>
    <div class="project-inner">
      <div class="project-list" :class="{hovered}" v-if="projects.length >0">
        <div
            class="project-item card"
            :class="{show: showProjectInfo === idx + 1}"
            :style="`animation-delay: ${2.3 + (idx+1) * serviceItemsDelay}s;`"
            v-for="(item, idx) in projects"
            :key="idx"
            @mouseover="hovered = true"
            @mouseleave="hovered = false"
        >
          <div class="card-header">
            <button class="card-open-btn" @click="showInfo(idx + 1)">
              {{ showProjectInfo === idx + 1 ? 'Скрыть' : 'Подробнее' }}
            </button>
            <a :href="item.link" class="card-link" target="_blank" v-if="item.ready && item.link.length > 0"><img
                class="card-link-icon" src="~assets/icons/link.svg"></a>
          </div>
          <div class="card-preview">
            <img class="up" :src="`/uploads/projects/${$translate(item.title)}/${item.preview}`" @error="setFallbackImageUrl">
          </div>
          <div class="card-title">{{ item.title }}</div>
          <div class="card-info">
            <div class="card-content">
              <div class="card-label">{{ item.title }}</div>
              <div class="card-category"><span class="label">Категория</span>{{ item.category }}</div>
              <div class="card-stack"><span class="label">Стек</span>{{ item.stack }}</div>
              <div class="card-description"><span class="label">Описание</span>{{ item.description }}</div>
              <div class="card-ready"><span class="label">Проект&nbsp;</span>{{
                  item.ready ? 'завершен' : 'в разработке'
                }}
              </div>
            </div>
          </div>
        </div>
        <div
            class="project-item card"
            :style="`animation-delay: ${2.3 + (projects.length+1) * serviceItemsDelay}s;`"
            :key="projects.length+1"
            v-if="projects.length % 2 !== 0"
        >
          <div class="card-newly">Скоро появятся еще</div>
        </div>
      </div>
      <div class="project-empty" v-else>Проекты скоро появятся</div>
    </div>
    <NextLink link="contacts" text="связаться со мной"/>
  </div>
</template>

<script setup lang="ts">
import {useStore} from '@/store'
const store = useStore()
const {$translate} = useNuxtApp()
const serviceItemsDelay = 0.2
const showProjectInfo = ref<number>(0)
const showInfo = (idx: number): void => {
  showProjectInfo.value = showProjectInfo.value !== idx ? idx : 0
}
const {data: projects} = useFetch(`${store.apiLink}projects/getProjects`) || []
const hovered = ref<boolean>(false)
const setFallbackImageUrl = (event) => {
  event.target.src = require(`~/assets/images/no-img.png`)
}
useHead({
  title: 'Мои проекты',
  meta: [
    {name: 'description', content: 'Ознакомтесь с моими проектами, начатыми и завершенными. Вся кроется в деталях.'}
  ]
})
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

.page-projects {
  .title {
    margin-bottom: 3rem;
    @include animUpToDown;
    animation-delay: 1s;
    font-size: 5rem;
    text-align: left;
  }
}

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

  &-empty {
    color: $light-color;
    font-weight: 300;
    font-size: 2rem;
    padding: 24px;
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

  &-header {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    transform: translateY(-120%);
    opacity: 0;
    transition: all $transition;
  }

  &-title {
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    right: 0;
    font-weight: 700;
    padding: 12px 24px;
    text-align: center;
    transform: translateY(120%);
    opacity: 0;
    color: $dark-color;
    background-color: $light-color;
    transition: all $transition;
    margin: 5px;
    border-radius: $radius;
  }

  &-link,
  &-open-btn {
    display: inline-flex;
    align-items: center;
    border-radius: $radius;
    padding: 8px;
    height: 34px;
    background-color: $light-color;
    box-shadow: $shadow;
    transition: all $transition;
  }

  &-open-btn {
    right: auto;
    left: 6px;
    text-align: center;
    color: $dark-color;
    border: none;
    font-size: 14px;
    font-weight: 300;
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

  &-info {
    position: absolute;
    overflow: hidden;
    color: $dark-color;
    top: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    border-radius: 12px 12px 0 0;
    background-color: $light-color;
    transition: all $transition;

    .label {
      font-weight: 700;

      &:after {
        content: ':';
        display: inline-block;
        margin-right: 5px;
      }
    }
  }

  &-label {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 24px;
  }

  &-content {
    font-size: 16px;
    overflow-y: scroll;
    height: calc(100% - 24px);
    visibility: hidden;
    opacity: 0;
    transition: all $transition;
    padding: 14px 24px 14px;

    & > div {
      line-height: 24px;

      & + div {
        margin-top: 8px;
      }
    }
  }

  &-newly {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $light-color;
    font-weight: 300;
    font-size: 16px;
  }

  &.show {
    opacity: 1;

    .card-header {
      transform: translateY(0%);
      opacity: 1;
    }

    .card-title {
      transform: translateY(120%);
      opacity: 0;
    }

    .card-info {
      top: 20%;
    }

    .card-content {
      visibility: visible;
      opacity: 1;
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
    .card-header {
      transform: translateY(0%);
      opacity: 1;
    }

    .card-preview:before {
      background: rgba(0, 0, 0, 0.1);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(1px);
    }

    .card-title {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  .card-link:hover,
  .card-open-btn:hover {
    background-color: $main-color;
  }
}

@media screen and (max-width: 768px) {
  .page-projects {
    .title {
      font-size: 4rem;
      text-align: center;
    }
  }
  .project-list {
    gap: 5px;
    justify-content: center;
  }
  .card {
    width: 100%;

    &-header {
      transform: translateY(0%);
      opacity: 1;
    }

    &-title {
      transform: translateY(0%);
      opacity: 1;
    }
  }
}

@media screen and (max-width: 420px) {
  .page-projects {
    .title {
      font-size: 3rem;
    }
  }
  .card {
    &-title {
      font-size: 14px;
      padding: 10px;
      border-radius: 12px 12px 0 0;
      margin: 0;
    }

    &-content {
      font-size: 14px;
      padding: 40px 10px 14px;
      height: calc(100% - 64px);
    }

    &-label {
      font-size: 16px;
      display: none;
    }

    &-open-btn {
      font-size: 12px;
    }

    &.show {
      .card-header {
        background-color: $light-color;
      }

      .card-link, .card-open-btn {
        box-shadow: none;
      }

      .card-info {
        top: 0;
        border-radius: 0;
      }
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