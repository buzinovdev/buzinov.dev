<template>
  <div class="field">
    <label for="services" class="label">{{ label }}</label>
    <div class="field-checkbox-group">
      <label
          class="checkbox-label"
          :title="item.label"
          v-for="(item, idx) in items" :key="idx"
          @click.prevent="select(item.value)"
      >
        <input
            class="checkbox-input"
            type="checkbox"
            :name="name"
            :value="item.value"
            :checked="props.value.includes(item.value)"
        >
        <span class="checkbox-decor"></span>
        <span class="checkbox-text">{{ item.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineEmits(['update:value'])
const props = defineProps({
  items: {
    type: Array,
    default: []
  },
  label: {
    type: String,
    default: ''
  },
  value: {
    type: Array,
    default: []
  }
})
const name = "name-" + Math.random()
const select = (value) => {
  if (props.value.includes(value)) {
    const index = props.value.findIndex(el => el.value === value)
    props.value.splice(index,1)
  } else {
    props.value.push(value)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.checkbox {
  &-label {
    display: inline-block;
    position: relative;
    user-select: none;
    margin: 5px;
  }

  &-input {
    display: none;
  }

  &-text {
    display: inline-block;
    color: $light-color;
    padding-left: 30px;
    cursor: pointer;
  }

  &-decor {
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border: 2px solid $main-color;
    border-radius: 4px;

    &::after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: $main-color;
      border-radius: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity $transition;
    }
  }
}

.checkbox-input:checked + .checkbox-decor::after {
  opacity: 1;
}
</style>