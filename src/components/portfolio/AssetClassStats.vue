<template>
  <div class="asset-class-stats">
    <h3 class="asset-class-stats__header">
      Assets Diversity
    </h3>
    <div class="asset-class-stats__chart">
      <DoughnutChart :chart-data="data"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DoughnutChart from '@/components/DoughnutChart.vue';
  import userModule from '@/store/modules/userModule';

  export default Vue.extend({
    name: 'AssetClassStats',
    components: { DoughnutChart },
    data() {
      return {
        data: {
          labels: ['Shares', 'Bonds', 'Gold', 'Money'],
          datasets: [
            {
              backgroundColor: ['#20C997', '#22B8CF', '#FCC419', '#845EF7'],
              data: [
                userModule.sharesAmount,
                userModule.bondsAmount,
                userModule.goldAmount,
                userModule.currenciesAmount,
              ],
            },
          ],
        },
      };
    },
  });
</script>

<style lang="scss" scoped>

  .asset-class-stats {
    &__header {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 16px;
    }
  }
</style>
