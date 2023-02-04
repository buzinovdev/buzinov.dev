<template>
  <div class="empty-page">
    <div class="container">
      <div class="empty-content">
        <div class="empty-message">
          <div class="empty-title">Ну вот опять 404!</div>
          <div class="empty-text">Пойду искать куда страница делась</div>
          <nuxt-link class="empty-link" to="/" no-prefetch>Перейти на главную</nuxt-link>
        </div>
        <img class="empty-goose" src="~assets/404/goose.svg">
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'empty'
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.empty {
  &-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    //height: calc(100vh - 80px);
    background: $gradient;
  }

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-message {
    position: relative;
    margin-right: 100px;
  }

  &-title {
    color: $main-color;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 30px;
    text-shadow: 3px 3px 4px rgba(0,0,0,.2);
  }

  &-text {
    color: $light-color;
    font-size: 24px;
    margin-bottom: 100px;
    text-shadow: 1px 1px 2px rgba(0,0,0,.2);
  }

  &-link {
    display: inline-block;
    font-size: 20px;
    color: $light-color;
    padding: 10px 20px;
    border: 2px solid $light-color;
    border-radius: $radius;
  }

  &-goose {
    display: block;
    height: 480px;
  }
}
@media screen and (max-width: 1024px) {
  .empty {
    &-content {
      flex-wrap: wrap-reverse;
    }

    &-message {
      margin-right: 0;
    }

    &-title {
      font-size: 36px;
      margin: 30px 0 10px;
    }

    &-text {
      font-size: 20px;
      margin-bottom: 40px;
    }

    &-link {
      font-size: 16px;
    }

    &-goose {
      height: 360px;
    }
  }
}
@media screen and (max-width: 640px) {
  .empty {
    &-content {
      flex-wrap: wrap-reverse;
    }

    &-message {
      margin-right: 0;
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-title {
      text-align: center;
      font-size: 36px;
      margin: 30px 0 10px;
    }

    &-text {
      text-align: center;
      font-size: 20px;
      margin-bottom: 40px;
    }

    &-link {
      font-size: 16px;
    }

    &-goose {
      height: 240px;
    }
  }
}
</style>
