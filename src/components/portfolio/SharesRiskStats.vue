<template>
  <div class="shares-risk-stats">
    <h3 class="shares-risk-stats__header">
      Shares - etfs / particular shares
    </h3>
    <div class="shares-risk-stats_chart">
      <DoughnutChart :chart-data="data"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DoughnutChart from '@/components/DoughnutChart.vue';
  import userModule from '@/store/modules/userModule';

  export default Vue.extend({
    name: 'SharesRiskStats',
    components: { DoughnutChart },
    data() {
      return {
        data: {
          labels: [
            'Shares Etfs',
            'Particular shares',
            // ...userModule.sharesPositions.map((pos) => ALL_INSTRUMENTS
            //   .find((i) => i.figi === pos.figi)?.name),
          ],
          datasets: [
            {
              backgroundColor: ['#20C997', '#22B8CF'],
              data: [
                userModule.sharesEtfsAmount,
                userModule.particularSharesAmount,
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
