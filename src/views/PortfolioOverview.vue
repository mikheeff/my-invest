<template>
  <div class="portfolio-overview">
    <div class="portfolio portfolio-overview__portfolio">
      <div class="portfolio__header">
        <div class="portfolio__title-container">
          <h2 class="portfolio__title">Portfolio</h2>
          <input
            class="input"
            type="search"
            placeholder="Search"
          >
        </div>
        <div class="portfolio__controls">
          <button class="button button--primary">Crate</button>
        </div>
      </div>
      <ul class="assets-list portfolio__assets-list">
        <li class="asset-card asset-list__item">
          <div class="asset-card__item-cell asset-card__item-cell--title">
            <span class="asset-card__ticker">FB</span>
            <span class="asset-card__name">Facebook</span>
          </div>
          <div class="asset-card__item-cell">
            <span class="asset-card__item-cell-value">$3,569.11</span>
          </div>
          <div class="asset-card__item-cell">
            <span class="asset-card__item-cell-value">$3,569.11</span>
            <span class="asset-card__item-cell-description">+ 178.2%</span>
          </div>
          <div class="asset-card__item-cell">
            <span class="asset-card__item-cell-value">$3,569.11</span>
            <span class="asset-card__item-cell-description">+ 178.2%</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'PortfolioOverview',
  });
</script>

<style lang="scss" scoped>

  .portfolio-overview {
    display: flex;
  }

  .portfolio {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__header {
      display: flex;
      justify-content: space-between;
      padding: 24px 36px;
    }

    &__title-container {
      display: flex;
      align-items: center;
    }

    &__title {
      font-size: 16px;
      margin-right: 12px;
    }

    .assets-list {
      padding: 0 16px;
    }

    .asset-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12.5px 12px;

      &__item-cell {
        display: flex;
        flex-direction: column;
        margin-right: 100px;

        &:last-child {
          margin-right: 0;
        }

        &--title {
          flex-grow: 1;
        }
      }
    }
  }
</style>
