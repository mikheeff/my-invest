<template>
  <div id="app" class="app">
    <main class="app-main app__main">
      <header class="app-header app__header">
        Portfolio

        <p>Choose your account</p>
        <b-form-radio-group
          id="accounts-group"
          name="accounts-group"
          v-model="userModule.accountId"
          :buttons="true">
          <b-form-radio
            v-for="account in userModule.accounts"
            :key="account.id"
            :value="account.id">
            {{ account.name }}
          </b-form-radio>
        </b-form-radio-group>
      </header>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import userModule from '@/store/modules/userModule';

  interface AppData {
    userModule: typeof userModule;
  }

  export default Vue.extend({
    name: 'App',
    data(): AppData {
      return {
        userModule,
      };
    },
    async created() {
      await userModule.getAccounts();
    },
  });
</script>

<style lang="scss">
  #app {
    display: flex;
    min-height: 100vh;
    width: 100%;
    min-width: 1020px;

    .app-header {
      padding: 12px 36px;
      font-size: 21px;
      border-bottom: 1px solid #343A40;
    }

    .app-main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
