<template>
  <div class="menu" :class="{show}">
    <div class="menu-inner container">
      <nav class="menu-links">
        <NuxtLink
            class="menu-link"
            v-for="(link, idx) in links"
            :to="link.link"
            no-prefetch
            :key="idx"
            @click.native="store.showMenuAction(false)"
            @mouseover.native="hovered = idx"
            @mouseout.native="hovered = null"
        >{{ link.title }}
        </NuxtLink>
      </nav>
      <div class="menu-description">
        <div
            class="menu-description-box"
            :class="{show: idx === hovered}"
            v-for="(item, idx) in links"
            no-prefetch
            :key="idx">{{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
const store = useStore()
const show = computed(() => store.isShowMenu)
const links = computed(() => store.navigationList)
const hovered = ref(null)
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.menu {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: $bg-menu;
  opacity: 0;
  visibility: hidden;
  transition: all $transition;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  &-inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-top: 85px;
    padding-bottom: 85px;
    display: flex;
    align-items: center;
  }

  &-links {
    display: flex;
    flex-direction: column;
    width: 30%;
    overflow-y: auto;
  }

  &-link {
    display: inline-block;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 3rem;
    color: $main-color;
    font-family: $font-second;
    letter-spacing: 5px;
    padding: 0.5rem;
    transition: padding-left $transition;
  }

  &-description {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin: 0 10%;
    color: $light-color;
    font-family: $font-third;
    font-size: 2rem;
    text-align: center;
    padding: 1rem;
    position: relative;

    &-box {
      opacity: 0;
      position: absolute;
      transform: translateY(20%);
      transition: all $transition;
      font-weight: 700;

      &.show {
        opacity: 1;
        transform: translateY(0%);
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .menu {
    &-links {
      width: 100%;
    }

    &-link {
      text-align: center;
    }

    &-description {
      display: none;
    }
  }
}

@media screen and (max-width: 480px) {
  .menu-link {
    font-size: 2em;
  }
}
</style>