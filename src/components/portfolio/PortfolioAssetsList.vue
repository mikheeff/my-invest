<template>
  <div class="portfolio portfolio-assets-list">
    <div class="portfolio__header">
      <div class="portfolio__title-container">
        <h2 class="portfolio__title">Portfolio</h2>
        <input
          class="input"
          type="search"
          placeholder="Search"
        >
      </div>
    </div>
    <ul class="assets-list portfolio__assets-list">
      <ListItem
        v-for="asset in userModule.positions"
        :key="asset.figi"
        :asset="asset"
        class="asset-list__item">
      </ListItem>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ListItem from '@/components/portfolio/ListItem.vue';
  import userModule from '@/store/modules/userModule';

  export default Vue.extend({
    name: 'PortfolioAssetsList',
    components: { ListItem },
    data() {
      return {
        userModule,
      };
    },
  });
</script>

<style lang="scss" scoped>
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
      padding: 0 36px;
    }
  }
</style>
