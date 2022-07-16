<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles || {}"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Doughnut } from 'vue-chartjs/legacy';

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale, TooltipItem,
  } from 'chart.js';
  import MoneyUtils from '@/common/utils/MoneyUtils';
  import { ChartItem } from '@/common/types/ChartItem';

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  export default Vue.extend({
    name: 'DoughnutChart',
    components: {
      Doughnut,
    },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartId: {
        type: String,
        default: 'doughnut-chart',
      },
      datasetIdKey: {
        type: String,
        default: 'label',
      },
      width: {
        type: Number,
        default: 300,
      },
      height: {
        type: Number,
        default: 300,
      },
      cssClasses: {
        default: '',
        type: String,
      },
      styles: {
        type: Object,
        default: null,
      },
      plugins: {
        type: Array,
        default: () => [],
      },
      totalAmount: {
        type: Number,
        default: null,
      },
    },
    data() {
      return {
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          parsing: {
            key: 'amount',
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: ({ dataset, parsed, raw }: TooltipItem<'doughnut'>) => {
                  const data = dataset.data as unknown as ChartItem[];
                  const element = raw as ChartItem;
                  const totalAmount = this.totalAmount ?? data
                    .reduce((acc, el) => acc + el.amount, 0);
                  const percent = (parsed / totalAmount) * 100;
                  const percentFormatted = Math.abs(Math.round(percent * 100) / 100);

                  return ` ${element.name} ${MoneyUtils.format(Number(parsed))} (${percentFormatted}%)`;
                },
              },
            },
          },
        },
      };
    },
  });
</script>
