<template>
  <client-only>
    <button class="logout" @click="logout" v-if="token">Выход</button>
  </client-only>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
const store = useStore()
const router = useRouter()
const token = computed<string | null>(() => store.token)
const cookieToken = useCookie('token')
const logout = () => {
  store.removeToken()
  localStorage.removeItem('token')
  cookieToken.value = null
  router.push('/login')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.logout {
  display: flex;
  align-items: center;
  color: $light-color;

  &:before {
    content: '';
    display: block;
    margin-right: 15px;
    height: 34px;
    width: 2px;
    background-color: $light-color;
  }
}
</style>