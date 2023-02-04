<template>
  <div class="field">
    <label for="email" class="label">{{label}}</label>
    <input
        class="input"
        :value="value"
        :id="id"
        :type="type"
        @input="updateValue"
        v-if="text === false"
    >
    <textarea
        class="input input-message"
        type="textarea"
        :id="id"
        :value="value"
        @input="updateValue"
        v-else
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:value'])
defineProps({
  value: null,
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  text: {
    type: Boolean,
    default: false
  }
})
const id = ref<string>("input-" + Math.random())
const updateValue = (e: Event) => {
  emit('update:value', (e.target as HTMLInputElement).value)
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

</style>