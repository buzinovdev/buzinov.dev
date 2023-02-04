<template>
  <div :class="[`notification ${notification.type}`,{anim: notification.active}]">
    <img class="social-icon" :src="require(`~/assets/icons/${notification.type}.svg`)" :alt="notification.type" v-if="notification.active"/>
    <span>{{ notification.text }}</span>
  </div>
</template>

<script setup lang="ts">
import {useStore} from '@/store'
const store = useStore()
const notification = computed(() => store.notify)
const delay = (time: number) => {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}
watch(notification, (currentValue, oldValue) => {
  if (currentValue.active) {
    delay(5000)
        .then(() => {
          store.setNotify({text: notification.value.text, type: notification.value.type, active: false})
          return delay(200)
        })
        .then(() => {
          store.setNotify({text: '', type: '', active: false})
        })
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.notification {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 25px;
  left: 50%;
  background-color: #fff;
  padding: 14px 24px;
  border-radius: $radius-lg;
  visibility: hidden;
  transform: translate(-50%, 200%) scale(.5);
  opacity: 0;
  transition: all $transition;
  box-shadow: 0 .5rem 1rem rgba($dark-color, .15);;

  span {
    color: $light-color;
    font-size: 16px;
    margin-left: 10px;
  }

  &.info {
    background-color: $info;
  }
  &.success {
    background-color: $success;
  }

  &.warning {
    background-color: $warning;
  }

  &.danger {
    background-color: $danger;
  }

  &.anim {
    visibility: visible;
    transform: translate(-50%, 0%);
    opacity: 1;
  }
}

@keyframes anim {
  0% {
    visibility: hidden;
    transform: translate(-50%, 200%) scale(.5);
    opacity: 0;
  }
  10%, 90% {
    visibility: visible;
    transform: translate(-50%, 0%) scale(1);
    opacity: 1;
  }
  100% {
    visibility: hidden;
    transform: translate(-50%, 200%) scale(.5);
    opacity: 0;
  }
}
</style>