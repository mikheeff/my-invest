<template>
  <div class="portfolio-overview">
    <div v-if="isLoading">Loading...</div>
    <template v-else>
      <p>Choose your account</p>
      <b-form-radio-group
        id="accounts-group"
        name="accounts-group"
        v-model="userModule.accountId"
        @input="userModule.getAllAssets()"
        :buttons="true">
        <b-form-radio
          v-for="account in userModule.accounts"
          :key="account.id"
          :value="account.id">
          {{ account.name }}
        </b-form-radio>
      </b-form-radio-group>
      <PortfolioStats />
      <PortfolioAssetsList />
    </template>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import PortfolioAssetsList from '@/components/portfolio/PortfolioAssetsList.vue';
  import PortfolioStats from '@/components/portfolio/PortfolioStats.vue';
  import userModule from '@/store/modules/userModule';

  export default Vue.extend({
    name: 'PortfolioOverview',
    components: { PortfolioAssetsList, PortfolioStats },
    data() {
      return {
        userModule,
        isLoading: false,
      };
    },
    created() {
      this.getInfo();
    },
    methods: {
      async getInfo() {
        this.isLoading = true;

        try {
          await userModule.getAccounts();
          userModule.accountId = userModule.accounts[1].id;
          await userModule.getAllAssets();
        } finally {
          this.isLoading = false;
        }
      },
    },
  });
</script>

<style lang="scss" scoped>

  .portfolio-overview {
    display: flex;
    flex-direction: column;
  }

</style>
