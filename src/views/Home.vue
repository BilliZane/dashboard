<template>
  <main class="main">
    <div class="container">
      <div class="main__wrap">home</div>
    </div>
  </main>
</template>

<script setup>
import TheAuth from '../views/TheAuth.vue'
</script>

<style lang="scss">
.main {
  padding-top: 15px;
  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>