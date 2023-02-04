<template>
  <div class="page-start">
    <h1 class="start-title">
      <div class="start-title-left"><span>WEB</span></div>
      <div class="start-title-line"></div>
      <div class="start-title-right"><span>разработчик</span></div>
    </h1>
    <div class="tagline">продуманно и со вкусом</div>
    <NextLink link="about" text="Бузинов Андрей"/>
  </div>
</template>

<script setup>
import NextLink from "../components/NextLink";

useHead({
  title: 'Бузинов Андрей - web разработчик',
  meta: [
    {
      name: 'description',
      content: 'Здравствуйте, меня зовут Андрей. Я занимаюсь разработкой сайтов и веб-приложений. Мой стек Vue/Nuxt js в связке с TypeScript.'
    }
  ],
  //script: [ { children: 'console.log(\'Hello world\')' } ]
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.page-start {
  height: calc(100vh - 160px);
  max-width: 590px;
  .learn-more {
    position: absolute;
    font-size: 1em;
  }
}

.start-title {
  font-weight: 700;
  font-size: 6em;
  font-family: $font-second;
  display: flex;
  align-items: center;
  justify-content: center;

  &-left {
    color: $main-color;
    overflow: hidden;
    margin-right: 5px;
    text-align: right;

    span {
      display: block;
      position: relative;
      z-index: 1;
      padding-left: 10px;
      transform: translateX(100%);
      animation: title-left 2s 1.5s forwards;
    }
  }

  &-right {
    color: $light-color;
    overflow: hidden;
    margin-left: 5px;

    span {
      display: block;
      position: relative;
      z-index: 1;
      padding-right: 10px;
      transform: translateX(-100%);
      animation: title-right 2s 1.5s forwards;
    }
  }

  &-line {
    display: block;
    position: relative;
    z-index: 1;

    &:before {
      content: '';
      display: block;
      height: 88px;
      width: 5px;
      border-radius: 2px;
      background-color: $light-color;
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      transform: translate(-50%, -50%) scaleY(0);
      animation: title-line 2s 1s forwards;
    }
  }
}

.tagline {
  position: relative;
  color: $light-color;
  margin: 1.5rem 8% 0 0;
  opacity: 0;
  font-weight: 300;
  font-size: 2.4em;
  width: 100%;
  text-align: right;
  transform: translateY(-50%);
  animation: tagline 2s 3.1s forwards;
  font-family: $font-second;
}

@keyframes title-left {
  0% {
    margin-right: 5px;
    transform: translateX(100%);
  }
  60% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes title-right {
  0% {
    margin-left: 5px;
    transform: translateX(-100%);
  }
  60% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes title-line {
  0% {
    transform: translate(-50%, -50%) scaleY(0);
    opacity: 0;
  }
  25% {
    opacity: 0.8;
  }
  35%, 65% {
    transform: translate(-50%, -50%) scaleY(.8);
    opacity: 1;
  }
  75% {
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scaleY(0);
    opacity: 0;
  }
}

@keyframes tagline {
  from {
    transform: translateY(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media screen and (max-width: 420px) {
  .start-title {
    font-size: 3.4em;
  }
    .tagline {
      font-size: 1.4em;
      margin: 1.2rem 8% 0 0;
    }
}
</style>