import Vue from 'vue';
import MoneyUtils from '@/common/utils/MoneyUtils';
import Currency from '@/common/types/Currency';

Vue.filter('money', (
  amount: number,
  currency: Currency = Currency.USD,
): string => MoneyUtils.format(amount, currency));
