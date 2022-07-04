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
    CategoryScale, ChartType, TooltipItem,
  } from 'chart.js';
  import MoneyUtils from '@/common/utils/MoneyUtils';

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
    },
    data() {
      return {
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem: TooltipItem<'doughnut'>) => {
                  const totalAmount = tooltipItem.dataset.data.reduce((acc, el) => acc + el, 0);
                  const percent = (tooltipItem.parsed / totalAmount) * 100;
                  const percentFormatted = Math.abs(Math.round(percent * 100) / 100);

                  return ` ${MoneyUtils.format(Number(tooltipItem.raw))} ${percentFormatted}%`;
                },
              },
            },
          },
        },
      };
    },
  });
</script>
