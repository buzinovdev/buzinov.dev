<template>
  <button type="button" class="btn">{{ text }}</button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.btn {
  border: none;
  border-radius: $radius;
  color: $dark-color;
  font-weight: 700;
  padding: 15px 35px;
  font-size: .8em;
  text-transform: uppercase;
  text-align: center;
  opacity: .6;
  background: $light-color;
  transition: opacity $transition;

  &:disabled {
    opacity: .5;
  }

  &:hover:enabled {
    opacity: 1;
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
}

@media screen and (min-width: 1024px) {
  .btn:not(:disabled):hover {
    opacity: 1;
  }
}

@media screen and (max-width: 1024px) {
  .btn {
    opacity: 1;
  }
}
</style>