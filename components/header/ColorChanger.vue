<template>
  <div class="style" :class="{show: showStyle}">
    <button class="style-select" @click="showStyle = !showStyle">
      <img src="~assets/icons/color-wheel-icon.svg" alt="Выбрать цвет">
    </button>
    <div class="style-list">
      <div
          class="style-item"
          :style="`background: ${item}`"
          title="Выберите оформление"
          v-for="(item, idx) in styleList"
          @click="selectStyle(item)"
          :key="idx"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
const store = useStore()
const currentStyle = computed<string>(() => store.style)
const styleList = computed<string[]>(() => store.styleList.filter(el => el !== currentStyle.value))
const showStyle = ref<boolean>(false)
const showLang = ref<boolean>(false)

const selectStyle = (item: string): void => {
  store.changeAppStyle(item)
  localStorage.setItem('currentAppStyle', item)
  showStyle.value = !showStyle.value
}
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";
.style {
  position: relative;
  margin-right: 10px;

  &-select {
    display: flex;
    border: none;
    background-color: transparent;
    box-shadow: $shadow-plate;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 28px;
      height: 28px;
    }
  }

  &-list {
    width: 62px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
    padding: 5px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -10px);
    opacity: 0;
    visibility: hidden;
    border-radius: $radius;
    color: $dark-color;
    background-color: $light-color;
    transition: all $transition;
  }

  &-item {
    width: 25px;
    height: 25px;
    cursor: pointer;
    box-shadow: $shadow-plate;
    border-radius: 50%;
  }

  &.show {
    .style-list {
      transform: translate(-50%, 5px);
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
