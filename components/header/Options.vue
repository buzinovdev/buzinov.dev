<template>
  <div class="header-options">
    <ColorChanger/>
    <!--    <div class="lang" :class="{show: showLang}">
          <button class="lang-select" @click="showLang = !showLang">
            <div class="lang-current">Ru</div>
            <div class="lang-arrow">
              <img src="~assets/icons/arrow.svg">
            </div>
          </button>
          <ul class="lang-list">
            <li class="lang-item">Eng</li>
          </ul>
        </div>-->
    <Logout/>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import ColorChanger from "~/components/header/ColorChanger.vue";
import Logout from "~/components/header/Logout.vue";

const store = useStore()
const showLang = ref<boolean>(false)
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

.header-options {
  display: flex;
  align-items: center;
  gap: 20px;
}

.lang {
  position: relative;

  &-select {
    position: relative;
    border: none;
    background-color: transparent;
    padding: 10px 30px 10px 10px;
  }

  &-current {
    color: $main-color;
    font-weight: 700;
  }

  &-arrow {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    transition: transform $transition;

    img {
      display: flex;
      width: 20px;
      height: 20px;
    }
  }

  &-list {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -10px);
    opacity: 0;
    visibility: hidden;
    padding: 5px;
    border-radius: $radius;
    color: $dark-color;
    background-color: $light-color;
    transition: all $transition;
  }

  &-item {
    padding: 5px 20px;

    & + & {
      border-top: 1px solid $dark-color;
    }
  }

  &.show {
    .lang-arrow {
      transform: translateY(-50%) rotate(180deg);
    }

    .lang-list {
      transform: translate(-50%, 0px);
      opacity: 1;
      visibility: visible;
    }
  }
}
.logout {
  background-color: transparent;
  border: none;
  display: flex;
}
</style>
