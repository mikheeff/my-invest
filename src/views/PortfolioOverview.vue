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
      <div class="assets-list portfolio__assets-list">
        <div class="asset-card asset-list__item">
          <div class="asset-card__title">
            <span class="asset-card__ticker">FB</span>
            <span class="asset-card__name">Facebook</span>
          </div>
          <img src="@/assets/icons/grow.png">
          <div class="asset-card__price">
            <span class="asset-card__price-count">$3,569.11</span>
            <span class="asset-card__growth">+ 178.2%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="portfolio-overview__side-block">
      <h2>Portfolio Diversity</h2>
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
    width: 66%;

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

    &__title {
      font-size: 16px;
    }

    .assets-list {
      padding: 0 16px;
    }

    .asset-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12.5px 12px;

      &__title {
        display: flex;
        flex-direction: column;
      }

      &__price {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
