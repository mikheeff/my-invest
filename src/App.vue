<template>
  <div id="app" class="app">
    <main class="app-main app__main">
      <header class="app-header app__header">
        Portfolio

        <p>Choose your account</p>
        <b-form-radio-group
          id="accounts-group"
          name="accounts-group"
          :checked="accountId"
          @input="handleAccountSelect(accountId)"
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
    accountId: string | null;
    userModule: typeof userModule;
  }

  export default Vue.extend({
    name: 'App',
    data(): AppData {
      return {
        accountId: null,
        userModule,
      };
    },
    async created() {
      await userModule.getAccounts();
      this.accountId = userModule.accounts[0].id;
      this.getAssets();
    },
    methods: {
      handleAccountSelect(accountId: string) {
        this.accountId = accountId;
        this.getAssets();
      },
      getAssets() {
        userModule.getAllAssets(this.accountId);
      },
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
      padding: 12px 24px;
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
