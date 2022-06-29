import { Amount } from '@/common/types/Amount';

export default class MoneyUtils {
  static format(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  static formatAmount(price: Amount): string {
    return this.format(this.getNumberFromAmount(price), price.currency);
  }

  static getNumberFromAmount(price: Amount): number {
    return price.nano / 1000000000 + Number(price.units);
  }
}
