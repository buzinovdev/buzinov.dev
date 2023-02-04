<template>
  <div class="field">
    <label for="email" class="label">{{ label }}</label>
    <div class="file-container">
      <div class="file-box">
        <input class="file" :id="id" type="file" name="avatar" :multiple="multiple" @change="handleFileSelection"/>
        Выберите или перетащите файл{{ multiple ? 'ы' : '' }}
      </div>
      <ul class="file-list" v-for="(file,idx) in files">
        <li class="file-item">
          Файл&nbsp;{{ idx + 1 }}: {{ file.name }}
          <button class="file-remove" @click="removeFile(idx)"></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  }
})
const id = ref<string>("file-" + Math.random())
const files = ref([]);
const handleFileSelection = (e: Event) => {
  const formData = new FormData();
  const uploadedFiles: any = (e.target as HTMLInputElement).files;
  if (!props.multiple) {
    files.value = []
  }
  for (let i = 0; i < uploadedFiles.length; i++) {
    files.value.push(uploadedFiles[i]);
  }
  if (props.name) {
    formData.append('name', props.name);
  }
  for (let i = 0; i < files.value.length; i++) {
    formData.append('images[' + i + ']', files.value[i]);
  }
  emit('update:value', formData)
}
const removeFile = (fileKey: number) => {
  files.value.splice(fileKey, 1)
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.file {

  &-container {
    border-radius: $radius;
    padding: 12px;
    background-color: hsla(0, 0%, 100%, 0.2);
  }

  &-box {
    text-align: center;
    position: relative;
    overflow: hidden;
    color: $light-color;
    font-size: 16px;
    padding: 24px 12px;
    border-radius: $radius;
    background-color: hsla(0, 0%, 100%, 0.4);

    input {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      opacity: 0.0;
      filter: alpha(opacity=0);
      font-size: 300px;
      height: 200px;
    }
  }

  &-list {
    margin-top: 1rem;
  }

  &-item {
    display: flex;
    align-items: center;
    color: $light-color;
    font-size: 16px;

    & + & {
      margin-top: 12px;
    }
  }

  &-remove {
    position: relative;
    width: 30px;
    height: 30px;
    background: $danger;
    border-radius: 50%;
    border: none;
    margin-left: 14px;

    &:before, &:after {
      display: block;
      width: 16px;
      height: 2px;
      border-radius: 10px;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #fff;
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>