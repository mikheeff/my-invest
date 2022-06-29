<template>
  <div class="portfolio-stats">
    <h1 class="portfolio-stats__title">Stats:</h1>
    <div class="portfolio-stats__content">
      <div class="portfolio-stats__content-item">
        <h3 class="portfolio-stats__item-header">
          Assets Diversity
        </h3>
        <div class="portfolio-stats__item-list">
          <div class="portfolio-stats__item">
            <div class="portfolio-stats__item-key">
              Shares
            </div>
            <div class="portfolio-stats__item-value">
              {{ sharesAmount }}(65%)
            </div>
          </div>
          <div class="portfolio-stats__item">
            <div class="portfolio-stats__item-key">
              Bonds
            </div>
            <div class="portfolio-stats__item-value">
              (25%)
            </div>
          </div>
          <div class="portfolio-stats__item">
            <div class="portfolio-stats__item-key">
              Gold
            </div>
            <div class="portfolio-stats__item-value">
              (10%)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import userModule from '@/store/modules/userModule';
  import { InstrumentType } from '@/common/types/Instrument';
  import MoneyUtils from '@/common/utils/MoneyUtils';

  export default Vue.extend({
    name: 'PortfolioStats',
    data() {
      return {
        userModule,
      };
    },
    computed: {
      sharesAmount() {
        const shares = userModule.positions
          .filter((position) => position.instrumentType === InstrumentType.SHARE);

        return shares.reduce((acc, share) => acc + MoneyUtils.getPositionTotalAmount(share), 0);
      },
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

    &__content-item {
      width: 270px;
    }

    &__item-header {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 16px;
    }

    &__item {
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
</style>
