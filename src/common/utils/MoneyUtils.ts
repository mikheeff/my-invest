import { Price } from '@/common/types/Price';

export default class MoneyUtils {
  static format(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  static formatPrice(price: Price): string {
    return this.format(this.getNumberFromPrice(price), price.currency);
  }

  static getNumberFromPrice(price: Price): number {
    return price.nano / 1000000000 + Number(price.units);
  }
}
