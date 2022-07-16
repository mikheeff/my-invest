export {
  // eslint-disable-next-line import/prefer-default-export
  cloneDeep,
  orderBy,
} from 'lodash';

export const setAmountByCountry = (
  map: Map<string, number>,
  name: string, amount: number,
): Map<string, number> => {
  const currentAmount = map.get(name);

  if (currentAmount !== undefined) {
    return map.set(name, amount + currentAmount);
  }

  return map.set(name, amount);
};
