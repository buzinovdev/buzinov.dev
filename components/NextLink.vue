<template>
  <NuxtLink :to="`/${props.link}`" class="learn-more" v-if="props.link">
    {{ props.text }}<img class="arrow" src="~assets/icons/greeting-arrow.svg" :alt="props.text" v-svg>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: 'Узнать больше'
  },
})
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

.learn-more {
  position: relative;
  bottom: 10px;
  font-size: .8em;
  margin-top: 6rem;
  font-weight: 700;
  color: $light-color;
  font-family: $font-third;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(-50%);
  animation: learn-more 2s 4s forwards;

  svg {
    display: flex;
    margin-top: 5px;

    &:not(:root) {
      overflow: visible
    }

    path {
      transform: translateY(0);
      animation: arrow 2s infinite;
    }

    path:first-child {
      fill: $main-color;
      animation-delay: .1s;
    }

    path:last-child {
      fill: $light-color;
    }
  }
}

@keyframes learn-more {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes arrow {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);

  }
}
</style>