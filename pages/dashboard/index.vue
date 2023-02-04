<template>
  <div class="dashboard">
    <client-only>
      <div class="dashboard-block">
        <div class="dashboard-title">Мои проекты<span class="dashboard-counter">{{ projects.length }}</span></div>
        <div class="dashboard-controls">
          <ControlsBtnLink link="/dashboard/projects/add" text="Добавить проект"/>
          <ControlsBtnLink link="/dashboard/projects" text="Обновить проект"/>
        </div>
      </div>
    </client-only>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import {useStore} from '@/store'
const store = useStore()
store.getProjects()
const projects = computed(() => store.projectsList)
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.dashboard {
  &-block {
    background-color: rgba(0, 0, 0, .5);
    padding: 24px;
    color: $light-color;
    border-radius: $radius;
  }

  &-title {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  &-counter {
    margin-left: 12px;
    color: $main-color;
  }

  &-controls {
    a + a {
      margin-left: 14px;
    }
  }
}
</style>