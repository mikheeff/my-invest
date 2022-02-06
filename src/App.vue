<template>
  <div id="app" class="app">
    <AppSidebar class="app__sidebar" />
    <main class="app-main app__main">
      <header class="app-header app__header">
        Portfolio
      </header>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AppSidebar from '@/components/AppSidebar.vue';

  export default Vue.extend({
    name: 'App',
    components: { AppSidebar },
  });
</script>

<style lang="scss">
  #app {
    display: flex;
    min-height: 100vh;
    width: 100%;
    min-width: 1020px;

    .app-header {
      padding: 12px 24px;
      font-size: 21px;
      height: 113px;
      border-bottom: 1px solid #343A40;
    }

    .app-main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
