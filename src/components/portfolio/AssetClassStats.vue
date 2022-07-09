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
              backgroundColor: ['#ABE6CE', '#51E2F5', '#F1D1B5', '#6C5B7B'],
              data: [
                {
                  name: 'Shares',
                  amount: userModule.sharesAmount,
                },
                {
                  name: 'Bonds',
                  amount: userModule.bondsAmount,
                },
                {
                  name: 'Gold',
                  amount: userModule.goldAmount,
                },
                {
                  name: 'Money',
                  amount: userModule.currenciesAmount,
                },
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
