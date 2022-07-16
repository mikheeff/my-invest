<template>
  <li class="list-item">
    <div class="list-item__item-cell asset-card__item-cell--title">
      <span class="list-item__ticker">{{ assetName }}</span>
      <span class="list-item__name">{{ description }}</span>
    </div>
    <div class="list-item__item-cell">
      <span class="list-item__item-cell-value">{{ price }}</span>
      <span class="list-item__item-cell-description">{{ amount }}</span>
    </div>
    <div class="list-item__item-cell">
      <span class="list-item__item-cell-value">{{ totalPrice }}</span>
      <span class="list-item__item-cell-description">
        <span
          :class="{'app-label--danger': isNegativeProfit}"
          class="app-label">{{ profit }}</span>
      </span>
    </div>
    <div class="list-item__item-cell">
      <span class="list-item__item-cell-value">{{ currency }}</span>
      <span class="list-item__item-cell-description">{{ country }}</span>
    </div>
  </li>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import MoneyUtils from '@/common/utils/MoneyUtils';
  import { PortfolioPosition } from '@/common/types/Portfolio';
  import { ALL_INSTRUMENTS } from '@/common/constants/allInstruments';
  import { Instrument, InstrumentType } from '@/common/types/Instrument';

  export default Vue.extend({
    name: 'ListItem',
    props: {
      asset: {
        type: Object as PropType<PortfolioPosition>,
        required: true,
      },
    },
    computed: {
      instrumentInfo(): Instrument | undefined {
        return ALL_INSTRUMENTS.find((i) => i.figi === this.asset.figi);
      },
      assetName(): string {
        return this.instrumentInfo ? this.instrumentInfo.name : '';
      },
      country(): string {
        return this.instrumentInfo ? this.instrumentInfo.countryOfRiskName : '';
      },
      currency(): string {
        return this.instrumentInfo ? this.instrumentInfo.currency.toUpperCase() : '';
      },
      description(): string | undefined {
        const typeString = this.asset.instrumentType === InstrumentType.ETF
          ? ` (${this.instrumentInfo?.focusType})` : '';

        return `${this.instrumentInfo?.ticker}${typeString}`;
      },
      price(): string {
        return MoneyUtils.formatCurrencyAmount(this.asset.currentPrice);
      },
      amount(): string {
        return MoneyUtils.getNumberFromAmount(this.asset.quantity).toString();
      },
      totalPrice(): string {
        return MoneyUtils.format(
          MoneyUtils.getPositionTotalAmount(this.asset),
          this.asset.currentPrice.currency,
        );
      },
      isNegativeProfit(): boolean {
        const currentPrice = MoneyUtils.getNumberFromAmount(this.asset.currentPrice);
        const averageBuyPrice = MoneyUtils.getNumberFromAmount(this.asset.averagePositionPrice);
        const delta = currentPrice - averageBuyPrice;

        return Math.sign(delta) === -1;
      },
      profit(): string {
        const currentPrice = MoneyUtils.getNumberFromAmount(this.asset.currentPrice);
        const averageBuyPrice = MoneyUtils.getNumberFromAmount(this.asset.averagePositionPrice);
        const assetQuantity = MoneyUtils.getNumberFromAmount(this.asset.quantity);
        const delta = (currentPrice - averageBuyPrice) * assetQuantity;
        const sign = Math.sign(delta) === -1 ? '-' : '+';
        const deltaString = MoneyUtils.format(Math.abs(delta), this.asset.currentPrice.currency);
        const percents = (1 - (currentPrice / averageBuyPrice)) * 100;
        const percentsFormatted = Math.abs(Math.round(percents * 100) / 100);

        return `${sign}${deltaString} (${sign}${percentsFormatted}%)`;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12.5px 12px;

    &__name {
      color: #868E96;
      font-size: 12px;
      line-height: 14px;
      font-weight: 500;
    }

    &__item-cell {
      display: flex;
      flex-direction: column;
      width: 25%;

      &:last-child {
        margin-right: 0;
      }

      &--title {
        flex-grow: 1;
      }

      &-value {
        display: flex;
        margin-bottom: 4px;
      }

      &-description {
        display: flex;
        color: #868E96;
        font-size: 12px;
        line-height: 14px;
        font-weight: 500;

        .app-label {
          border-radius: 3px;
          padding: 4px;
          color: #343A40;;
          background-color: #20C997;

          &--danger {
            background-color: #FF5271;
          }
        }
      }
    }
  }
</style>
