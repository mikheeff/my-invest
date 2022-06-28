<template>
  <li class="list-item">
    <div class="list-item__item-cell asset-card__item-cell--title">
      <span class="list-item__ticker">{{ assetName }}</span>
      <span class="list-item__name">{{ asset.instrumentType }}</span>
    </div>
    <div class="list-item__item-cell">
      <span class="list-item__item-cell-value">$3,569.11</span>
      <span class="list-item__item-cell-description">{{ asset.quantity.units }}</span>
    </div>
    <div class="list-item__item-cell">
      <span class="list-item__item-cell-value">$3,569.11</span>
      <span class="list-item__item-cell-description">+ 178.2%</span>
    </div>
    <div class="asset-card__item-cell">
      <span class="list-item__item-cell-value">$3,569.11</span>
      <span class="list-item__item-cell-description">+ 178.2%</span>
    </div>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue';
  import userModule from '../store/modules/userModule';

  export default Vue.extend({
    name: 'ListItem',
    props: {
      asset: {
        type: Object,
        required: true,
      },
    },
    computed: {
      assetName(): string {
        const asset = userModule.allInstruments.find((i) => i.figi === this.asset.figi);
        return asset ? asset.name : '';
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

      &-description {
        color: #868E96;
        font-size: 12px;
        line-height: 14px;
        font-weight: 500;
      }
    }
  }
</style>
