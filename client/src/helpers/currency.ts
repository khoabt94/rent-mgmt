export const currencyFormatter = (num?: number | string): string => {
  let formatted;
  let roundedNum = num;
  if (typeof num === 'number') {
    roundedNum = num.toFixed(0);
  }
  if (!roundedNum || roundedNum === -1 || roundedNum === '-1') {
    formatted = '0';
  } else {
    formatted = roundedNum.toString();
    formatted = formatted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return formatted;
};
