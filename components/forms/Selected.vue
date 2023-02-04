<template>
  <div class="field" v-if="list.length > 0">
    <label for="email" class="label">{{ props.label }}</label>
    <input
        class="input"
        type="text"
        :id="id"
        v-model="searchingValue"
        :placeholder="placeholder ? placeholder : 'Вводите подсказку или фразу полностью'"
        @input="searchingShow = (searchingValue.length > 0)"
    >
    <div class="selected" :class="{show: searchingList.length > 0 && searchingShow}">
      <ul class="selected-list">
        <li
            class="selected-item"
            @click="selectItem(item.title)"
            v-for="(item,idx) in searchingList"
            :key="idx"
        >{{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from '@/store'
const store = useStore()
const emit = defineEmits(['update:value'])
const props = defineProps({
  value: null,
  label: {
    type: String,
    default: ''
  },
  text: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: []
  }
})
const id = ref<string>("input-" + Math.random())
const searchingValue = ref<string>('')
const searchingList = computed<any[]>(() => props.list.filter(el => el.title.toLowerCase().includes(searchingValue.value.toLowerCase())))
const searchingShow = ref<boolean>(false)
const currentStyle = computed<string>(() => store.style)
const selectItem = (item: string): void => {
  searchingValue.value = item
  searchingShow.value = false
  emit('update:value', item)
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.field {
  position: relative;
  .input::placeholder {
    color: $light-color;
  }
}
.selected {
  position: absolute;
  z-index: 1;
  max-height: 220px;
  width: 100%;
  top: 110%;
  border-radius: $radius;
  box-shadow: $shadow;
  overflow-y: scroll;
  background: v-bind(currentStyle);
  transition: all $transition;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-5%);

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &-list {
    background-color: hsla(0, 0%, 100%, 0.2);
  }

  &-item {
    color: $light-color;
    font-size: 16px;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color $transition;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.4);
    }
  }
}
</style>