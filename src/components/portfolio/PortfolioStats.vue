<template>
  <div class="portfolio-stats">
    <h1 class="portfolio-stats__title">Stats:</h1>
    <div class="portfolio-stats__content">
      <AssetClassStats />
      <SharesRiskStats />
      <SharesStats />
      <SharesCountriesStats />
      <BondsCountriesStats />
      <CurrencyStats />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import userModule from '@/store/modules/userModule';
  import AssetClassStats from '@/components/portfolio/AssetClassStats.vue';
  import SharesRiskStats from '@/components/portfolio/SharesRiskStats.vue';
  import SharesStats from '@/components/portfolio/SharesStats.vue';
  import SharesCountriesStats from '@/components/portfolio/SharesCountriesStats.vue';
  import BondsCountriesStats from '@/components/portfolio/BondsCountriesStats.vue';
  import CurrencyStats from '@/components/portfolio/CurrencyStats.vue';

  export default Vue.extend({
    name: 'PortfolioStats',
    components: {
      AssetClassStats,
      SharesRiskStats,
      SharesStats,
      SharesCountriesStats,
      BondsCountriesStats,
      CurrencyStats,
    },
    data() {
      return {
        userModule,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .portfolio-stats {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #343A40;
    padding: 16px;

    &__title {
      font-weight: 500;
      font-size: 22px;
      line-height: 32px;
      margin-bottom: 24px;
    }

    .content-item {
      &__container {
        display: flex;
      }

      &__list-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 12px;

        &-key {
          font-weight: 500;
          font-size: 14px;
          line-height: 14px;
        }

        &-value {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          color: #ADB5BD;

          &::before {
            content: '';
            width: 6px;
            height: 6px;
            background-color: #20C997;
            margin-right: 12px;
          }
        }
      }
    }

  }
</style>
