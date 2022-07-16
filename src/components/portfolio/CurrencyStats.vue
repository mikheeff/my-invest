<template>
  <div class="asset-class-stats">
    <h3 class="asset-class-stats__header">
      Currency
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
  import { orderBy } from '@/common/utils/GeneralUtils';

  export default Vue.extend({
    name: 'CurrencyStats',
    components: { DoughnutChart },
    data() {
      return {
        data: {
          datasets: [
            {
              backgroundColor: ['#ABE6CE', '#51E2F5', '#F1D1B5', '#6C5B7B'],
              data: [
                ...orderBy(Array.from(userModule.positionsAmountGroupedByCurrency)
                  .map(([countryName, amount]) => ({
                    amount,
                    name: countryName,
                  })), 'amount', 'desc'),
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
