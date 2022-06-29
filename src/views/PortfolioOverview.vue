<template>
  <div class="portfolio-overview">
    <PortfolioStats />
    <PortfolioAssetsList />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import PortfolioAssetsList from '@/components/portfolio/PortfolioAssetsList.vue';
  import PortfolioStats from '@/components/portfolio/PortfolioStats.vue';

  export default Vue.extend({
    name: 'PortfolioOverview',
    components: { PortfolioAssetsList, PortfolioStats },
  });
</script>

<style lang="scss" scoped>

  .portfolio-overview {
    display: flex;
    flex-direction: column;
  }

</style>
