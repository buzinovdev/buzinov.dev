<template>
  <div class="page-services">
    <h1 class="title">Предоставляемые услуги</h1>
    <div class="services-list">
      <div
          class="services-item"
          :style="`animation-delay: ${2 + (idx+1) * serviceItemsDelay}s`"
          v-for="(item, idx) in servicesList"
          :key="idx"
      >
<!--          :to="`/service/${$translate(item.title)}`"-->
        <img class="services-picture" :src="`/icons/${item.icon}`" v-svg>
        <span class="services-title">{{ item.title }}</span>
        <span class="services-price">{{ item.price }}</span>
      </div>
    </div>
    <div class="pricing" :style="`animation-delay: ${(servicesList.length +1) / 2 + serviceItemsDelay * 2}s`">
      <h2 class="title">Прайс-лист</h2>
      <div class="pricing-download">Можно скачать прайс-лист в <a
          href="/document/buzinov.dev - Прайс-лист на услуги.docx" download="">формате docx</a>
      </div>
      <Table class="pricing-table" :array="pricing"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Table from "@/components/Table";
import { useStore } from '@/store'
const store = useStore()
const servicesList = computed(() => store.servicesList)
const {$translate} = useNuxtApp()
const serviceItemsDelay = 0.2
const pricing = {
  head: ['Услуга', 'Стоимость'],
  rows: servicesList.value.map(el=> [`${el.title}`,`${el.price}`])
}
</script>

<style lang="scss">
@import "@/assets/styles/_variables.scss";
.page-services {
  .title {
    margin-bottom: 3rem;
  }
}
.services {
  &-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(25% - 30px);

    &:hover {
      .services-picture {
        transform: scale(1.1);
      }
    }
  }

  &-picture {
    transition: transform $transition;
    display: flex;
    margin-bottom: 2rem;
    transform: scale(1);

    path {
      fill: $main-color;
    }
  }

  &-title {
    color: $light-color;
  }
  &-price {
    margin-top: 10px;
  }
}

.pricing {
  width: 100%;
  margin-top: 5rem;

  &-download {
    text-align: center;
    margin-bottom: 2rem;
    color: $light-color;

    a {
      color: $main-color;
    }
  }

  &-table {
    margin-top: 1rem;
  }
}

@media screen and (max-width: 768px) {
  .services-item {
    width: calc(50% - 30px);
  }
}
@media screen and (max-width: 420px) {
  .services {
    &-list {
      gap: 0;
    }

    &-item {
      width: 100%;

      & + & {
        margin-top: 25px;
      }
    }
  }
}
</style>