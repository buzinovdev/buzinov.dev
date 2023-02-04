<template>
  <button>
    <img src="~assets/icons/email.svg" alt="" v-if="props.icon" v-svg>
    <span>buzinov.dev@yandex.ru</span>
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
    icon: {
      type: String,
      default: null
    }
  }
})
const copy = () => {
  this.$refs.myinput.focus();
  document.execCommand('copy');
}
</script>

<style scoped>

</style>