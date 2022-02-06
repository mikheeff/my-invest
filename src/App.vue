<template>
  <div id="app">
    <header class="app-header">
      My Invest
    </header>
    <main class="app-main">
      <div class="container">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    min-width: 1020px;

    .app-header {
      padding: 12px 24px;
      font-size: 21px;
      font-weight: 600;
    }

    .app-main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background-color: #f9f9f9;
    }
  }
</style>
