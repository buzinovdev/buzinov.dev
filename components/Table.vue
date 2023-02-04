<template>
  <table class="table" v-if="array.head.length > 0">
    <thead>
    <tr>
      <td v-for="item in array.head" :key="item">{{ item }}</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in array.rows" :key="row">
      <td v-for="cell in row" :key="cell">{{ cell }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  array: {
    type: Object,
    default: []
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.table {
  margin: 0 auto;
}

thead {
  font-size: 1.2em;
  font-weight: 700;
}

tr:first-child {
  padding-bottom: 24px;
}

tbody {
  font-size: 0.8em;
}
td {
  padding: 12px 24px;
  color: $light-color;
}
</style>