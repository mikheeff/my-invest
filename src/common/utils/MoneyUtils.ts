import { Amount, CurrencyAmount } from '@/common/types/CurrencyAmount';
import { PortfolioPosition } from '@/common/types/Portfolio';
import Currency from '@/common/types/Currency';

export default class MoneyUtils {
  static format(amount: number, currency: Currency = Currency.USD): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  static formatCurrencyAmount(price: CurrencyAmount): string {
    return this.format(this.getNumberFromAmount(price), price.currency);
  }

  static getNumberFromAmount(price: Amount): number {
    return price.nano / 1000000000 + Number(price.units);
  }

  static getPositionTotalAmount(position: PortfolioPosition): number {
    const assetPrice = this.getNumberFromAmount(position.currentPrice);
    const units = this.getNumberFromAmount(position.quantity);
    return assetPrice * units;
  }
}
