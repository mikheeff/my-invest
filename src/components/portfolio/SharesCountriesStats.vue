<template>
  <div class="asset-class-stats">
    <h3 class="asset-class-stats__header">
      Shares - countries
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
  import { InstrumentType } from '@/common/types/Instrument';

  export default Vue.extend({
    name: 'SharesCountriesStats',
    components: { DoughnutChart },
    data() {
      return {
        data: {
          datasets: [
            {
              backgroundColor: [
                '#ABE6CE',
                '#51E2F5',
                '#F1D1B5',
                '#6C5B7B',
                '#99B898',
                '#FECEA8',
                '#355C7D',
                '#FF847C',
                '#E84A5F',
                '#2A363B',
                '#034C65',
                '#B09E99',
                '#FEE9E1',
                '#64B6AC',
                '#69A6D1',
                '#E17878',
                '#9DE0AD',
                '#8F9CB3',
                '#AD64F0',
              ],
              data: [
                ...orderBy(Array.from(userModule.getPositionsAmountGroupedByCountry(
                  [
                    ...userModule.sharesPositions,
                    ...userModule.getEtfsPositionsByInstrumentType(InstrumentType.SHARE),
                  ],
                ))
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
