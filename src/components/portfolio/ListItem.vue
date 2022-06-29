<template>
  <li class="list-item">
    <div class="list-item__item-cell asset-card__item-cell--title">
      <span class="list-item__ticker">{{ assetName }}</span>
      <span class="list-item__name">{{ asset.instrumentType }}</span>
    </div>
    <div class="list-item__item-cell">
      <span class="list-item__item-cell-value">{{ price }}</span>
      <span class="list-item__item-cell-description">{{ asset.quantity.units }}</span>
    </div>
    <div class="list-item__item-cell">
      <span class="list-item__item-cell-value">{{ totalPrice }}</span>
      <span class="list-item__item-cell-description">
        <span
          :class="{'app-label--danger': isNegativeProfit}"
          class="app-label">{{ profit }}</span>
      </span>
    </div>
    <div class="asset-card__item-cell">
      <span class="list-item__item-cell-value">$3,569.11</span>
      <span class="list-item__item-cell-description">+ 178.2%</span>
    </div>
  </li>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import MoneyUtils from '@/common/utils/MoneyUtils';
  import { PortfolioPosition } from '@/common/types/Portfolio';
  import userModule from '../../store/modules/userModule';

  export default Vue.extend({
    name: 'ListItem',
    props: {
      asset: {
        type: Object as PropType<PortfolioPosition>,
        required: true,
      },
    },
    computed: {
      assetName(): string {
        const asset = userModule.allInstruments.find((i) => i.figi === this.asset.figi);
        return asset ? asset.name : '';
      },
      price(): string {
        return MoneyUtils.formatAmount(this.asset.currentPrice);
      },
      totalPrice(): string {
        const assetPrice = MoneyUtils.getNumberFromAmount(this.asset.currentPrice);
        const units = Number(this.asset.quantity.units);

        return MoneyUtils.format(assetPrice * units, this.asset.currentPrice.currency);
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
        const delta = (currentPrice - averageBuyPrice) * Number(this.asset.quantity.units);
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
      margin-right: 100px;
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
