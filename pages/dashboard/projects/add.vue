<template>
  <div class="project-add">
    <h1 class="title">Добавить новый проект</h1>
    <form class="form" @submit.prevent>
      <Field label="Название проекта" v-model:value="title"/>
      <Field label="Ссылка на проект (при наличии)" v-model:value="link"/>
      <Selected label="Категория проекта" v-model:value="category" :list="categories"/>
      <Files label="Выбрать превью" :multiple="false" v-model:value="preview"/>
      <Field label="Описание проекта" :text="true" v-model:value="description"/>
      <Field label="Стек технологий" :text="true" v-model:value="stack"/>
      <Switcher label="Проект завершен" v-model:value="isReady"/>
      <div class="form-controls">
        <ControlsBtn class="success" text="Сохранить" :disabled="checkedForm" @click="addProject"/>
        <ControlsBtn class="danger" text="Отменить" @click="router.push('/dashboard')"/>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Files from "~/components/forms/Files.vue";
definePageMeta({
  middleware: 'auth'
})
import Switcher from "~/components/forms/Switcher.vue";
import Field from '~/components/forms/Field'
import Selected from '~/components/forms/Selected'
const router = useRouter()
import { useStore } from '@/store'
const store = useStore()
const cookieToken = useCookie<string>('token')
const {data:categories} = await useFetch(`${store.apiLink}projects/getCategories`)
const title = ref<string>('')
const isReady = ref<boolean>(false)
const link = ref<string>('')
const category = ref<string>('')
const preview = ref<FormData>()
const description = ref<string>('')
const stack = ref<string>('')
const {$translate} = useNuxtApp()
const checkedForm = computed<boolean>(() => !(title.value.length > 0 && isReady && category.value.length > 0 && description.value.length > 0 && stack.value.length > 0))
const addProject = async () => {
  const uploadFiles: string[] = []
  await $fetch(`${store.apiLink}upload`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${cookieToken.value}`},
    body: preview.value
  }).then((res) => {
    if (res?.status === 200) {
      uploadFiles.push(...res.files)
    }
  }).catch(e => console.log(e))
  await $fetch(`${store.apiLink}projects/add`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${cookieToken.value}`
    },
    body: {
      title: title.value.trim(),
      dir: $translate(title.value.trim()),
      ready: isReady.value,
      link: link.value.trim(),
      category: category.value.trim(),
      preview: uploadFiles[0] || '',
      description: description.value.trim(),
      stack: stack.value.trim(),
    }
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    store.getProjects()
    router.push('/dashboard')
  }).catch(e => console.log(e))
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.form {
  width: 100%;
}
</style>