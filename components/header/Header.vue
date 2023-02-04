<template>
  <div class="header" >
    <div class="container">
      <div class="header-inner">
        <div class="header-item"><HeaderMenuBtn/></div>
        <div class="header-item"><HeaderLogo/></div>
        <div class="header-item"><HeaderOptions/></div>
      </div>
    </div>
    <HeaderNavigation/>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.header {
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  animation: header 2s 4s forwards;
  opacity: 0;
  box-shadow: $shadow-plate;

  &-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }
  &-item {
    width: 33.33%;
  }
}
@keyframes header {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>