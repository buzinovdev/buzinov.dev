<template>
  <div class="page-login">
    <h1 class="login-title">Авторизация</h1>
    <form class="form" @submit.prevent>
      <Field label="Логин" v-model:value="login"/>
      <Field label="Пароль" v-model:value="password" type="password"/>
      <ControlsBtn text="Войти" :disabled="password.length < 0" @click="loginHandler"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import Field from '@/components/forms/Field'
import {useStore} from '@/store'

const store = useStore()
const cookieToken = useCookie<string>('token', {maxAge: 14400})
const router = useRouter()
const login = ref<string>('')
const password = ref<string>('')
const loginHandler = async () => {
  if (login.value.length < 1) {
    store.setNotify({text: 'Введен некорректный логин', type: 'danger', active: true})
    return
  }
  if (password.value.length < 1) {
    store.setNotify({text: 'Введен некорректный пароль', type: 'danger', active: true})
    return
  }
  await $fetch(`${store.apiLink}auth/login`, {
    method: 'POST',
    body: {
      login: login.value.trim(),
      password: password.value.trim()
    }
  }).then((res) => {
    store.setNotify({text: res.msg, type: res.msgType, active: res.msgActive})
    if (res.status === 200) {
      const {token} = res
      if (token) {
        store.setToken(token)
        localStorage.setItem('token', token)
        cookieToken.value = token
        router.push('/dashboard')
      }
    }
  }).catch(e => {
    console.log(e)
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.page-login {
  height: calc(100vh - 160px);
  max-width: 480px;
}

.login {
  &-title {
    font-size: 3em;
    text-align: center;
    margin-bottom: 4rem;
    color: $light-color;
  }
}

.form {
  width: 100%;
}
</style>