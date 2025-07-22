export const NumberFormat = (num) => {
  const number = Intl.NumberFormat("en-US").format(Number(num));
  return number;
};
