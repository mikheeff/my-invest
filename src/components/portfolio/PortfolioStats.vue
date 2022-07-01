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
              {{ sharesAmount }} (65%)
            </div>
          </div>
          <div class="portfolio-stats__item">
            <div class="portfolio-stats__item-key">
              Bonds
            </div>
            <div class="portfolio-stats__item-value">
              {{ bondsAmount }} (25%)
            </div>
          </div>
          <div class="portfolio-stats__item">
            <div class="portfolio-stats__item-key">
              Gold
            </div>
            <div class="portfolio-stats__item-value">
              {{ goldAmount }}(10%)
            </div>
          </div>
          <div class="portfolio-stats__item">
            <div class="portfolio-stats__item-key">
              Currency
            </div>
            <div class="portfolio-stats__item-value">
              {{ currenciesAmount }}(10%)
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
  import Currency from '@/common/types/Currency';
  import {
    ALL_ETFS,
    CURRENCY_FIGI_MAP,
    FOCUS_TYPE_INSTRUMENT_TYPE_MAP,
  } from '@/common/constants/allInstruments';
  import FocusType from '@/common/types/FocusType';

  export default Vue.extend({
    name: 'PortfolioStats',
    data() {
      return {
        userModule,
      };
    },
    computed: {
      sharesAmount(): string {
        return MoneyUtils
          .format(this.getTotalAmountByInstrumentType(InstrumentType.SHARE), Currency.USD);
      },
      bondsAmount(): string {
        return MoneyUtils
          .format(this.getTotalAmountByInstrumentType(InstrumentType.BONDS), Currency.USD);
      },
      currenciesAmount(): string {
        return MoneyUtils
          .format(this.getTotalAmountByInstrumentType(InstrumentType.CURRENCY), Currency.USD);
      },
      goldAmount(): string {
        const goldPosition = userModule.positions
          .find((pos) => pos.figi === CURRENCY_FIGI_MAP[Currency.GOLD]);

        const etfPositions = userModule.positions
          .filter((position) => {
            const etfInstrument = ALL_ETFS.find((i) => i.figi === position.figi);
            const isSameAssetClass = etfInstrument
              ? etfInstrument.focusType === FocusType.GOLD
              : false;

            return position.instrumentType === InstrumentType.ETF && isSameAssetClass;
          });
        const positions = goldPosition ? [goldPosition, ...etfPositions] : [...etfPositions];

        const goldAmount = positions.reduce((acc, position) => {
          const positionTotalAmount = MoneyUtils.getPositionTotalAmount(position);
          const rate = this.getCurrencyRateToUsd(position.currentPrice.currency);
          const positionAmountInUsd = positionTotalAmount / rate;

          return acc + positionAmountInUsd;
        }, 0);

        return MoneyUtils.format(goldAmount, Currency.USD);
      },
    },
    methods: {
      getTotalAmountByInstrumentType(instrumentType: InstrumentType) {
        const positionsByInstrumentType = userModule.positions
          .filter((position) => position.instrumentType === instrumentType);

        const etfPositions = userModule.positions
          .filter((position) => {
            const etfInstrument = ALL_ETFS.find((i) => i.figi === position.figi);
            const isSameAssetClass = etfInstrument
              ? FOCUS_TYPE_INSTRUMENT_TYPE_MAP[etfInstrument.focusType] === instrumentType
              : false;

            return position.instrumentType === InstrumentType.ETF && isSameAssetClass;
          });

        const positions = [...positionsByInstrumentType, ...etfPositions];

        return positions.reduce((acc, position) => {
          const positionTotalAmount = MoneyUtils.getPositionTotalAmount(position);
          const rate = this.getCurrencyRateToUsd(position.currentPrice.currency);
          const positionAmountInUsd = positionTotalAmount / rate;

          return acc + positionAmountInUsd;
        }, 0);
      },
      getCurrencyRateToUsd(currency: Currency) {
        if (currency === Currency.USD) {
          return 1;
        }

        if (currency === Currency.RUB) {
          return userModule.usdPriceInRub;
        }

        const currencyPosition = userModule.positions
          .find((pos) => pos.figi === CURRENCY_FIGI_MAP[currency]);

        if (!currencyPosition) {
          throw new Error('no such currency');
        }

        const currencyPriceInRub = MoneyUtils.getNumberFromAmount(currencyPosition.currentPrice);

        return currencyPriceInRub / userModule.usdPriceInRub;
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
