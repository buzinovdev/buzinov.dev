<template>
  <div class="page">
    <h1 class="visually-hidden">Бузинов Андрей web разработчик</h1>
    <div class="about">
      <p class="name">Здравствуйте, меня зовут Андрей.</p>
      <p>Я занимаюсь разработкой сайтов и веб-приложений {{ startDev }} {{$declension(startDev, ['год', 'года', 'лет']) }}.</p>
      <p>За это время я получил немало опыта как при работе с натинвым JavaScript так и с его фреймворком Vue,
        так же работал с UX/UI в Figma.</p>
      <p>Мой стек Vue js в связке с TypeScript.</p>
      <a class="git" href="https://github.com/buzinovdev" target="_blank">Мой GitHub<img
          src="~assets/icons/github.svg" v-svg></a>
    </div>
    <NextLink link="projects" text="Перейти к проектам"/>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
const store = useStore()
const {$declension} = useNuxtApp()
const startDev = computed<number>((): number => store.startDev)
const technologies = computed<string[]>((): string[] => store.devStack)
useHead({
  title: 'Подробнее обо мне',
  meta: [
    { name: 'description', content: 'Подробнее обо мне и том, чем я занимаюсь' }
  ]
})
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

.about {
  font-family: $font-second;
  max-width: 840px;
  margin: 0 auto;

  .name {
    color: $main-color;
    font-size: 4rem;
    line-height: 5rem;
    font-weight: 700;
    margin-bottom: 24px;
  }

  p {
    color: $light-color;
    font-size: 2em;
    line-height: 3rem;
  }
}

.git {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: $light-color;
  transition: color $transition;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 2px;
  margin-top: 3.4rem;

  svg {
    margin-left: 8px;

    path {
      transition: fill $transition;
    }
  }
}
@media screen and (min-width: 1024px) {
  .git:hover {
    color: $main-color;

    svg path {
      fill: $main-color;
    }
  }
}
@media screen and (max-width: 420px) {
  .about {
    .name {
      font-size: 3rem;
      line-height: 4rem;
    }

    p {
      font-size: 1.8rem;
      line-height: 2.5rem;
    }
  }
  .git {
    margin-top: 1.5rem;
  }
}
</style>