<template>
  <nav class="app-sidebar">
    <div class="app-sidebar__block">
      Portfolio
    </div>
    <div class="app-sidebar__item"></div>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'AppSidebar',
  });
</script>

<style lang="scss" scoped>

  .app-sidebar {
    height: 100vh;
    width: 272px;
    padding: 20px 16px;
    border-right: 1px solid #343A40;

    &__block {
      padding: 10px 12px;
    }

    &__item {
      padding: 10px 12px;
    }
  }
</style>
