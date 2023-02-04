<template>
  <div class="field">
    <label for="services" class="label">{{ label }}</label>
    <button class="switcher" :class="{enable: props.value}" @click="emit('update:value', !props.value)">
      <span class="switcher-circle"></span>
    </button>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

const emit = defineEmits(['update:value'])
const props = defineProps({
  label: {type: String, default: ''},
  value: {type: Boolean, default: false}
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.field {
  display: flex;
  align-items: center;
}

.label {
  margin: 0 1rem 0 0;
}

.switcher {
  display: flex;
  width: 46px;
  height: 30px;
  border: none;
  border-radius: 25px;
  background-color: hsla(0, 0%, 100%, 0.2);
  padding: 5px;
  position: relative;
  transition: background-color 0.4s ease;

  &-circle {
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: $main-color;
    border-radius: 50%;
    top: 50%;
    transform: translate(0%, -50%);
    transition: transform $transition;
  }
  &.enable .switcher-circle {
    transform: translate(100%, -50%);
  }
}
</style>