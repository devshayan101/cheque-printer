/**
 * Converts a number to Indian currency format words (e.g., "One Lakh Twenty Thousand...")
 */
export const numberToWords = (num: number): string => {
  if (num === 0) return "";

  const a = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/;

  const getLT20 = (n: number) => a[Number(n)];
  const getTens = (n: number) => {
    return b[Math.floor(n / 10)] + " " + a[n % 10];
  };

  const convert = (n: number): string => {
    if (n < 20) return getLT20(n);
    if (n < 100) return getTens(n);
    if (n < 1000)
      return (
        getLT20(Math.floor(n / 100)) + "Hundred " + convert(n % 100)
      );
    if (n < 100000)
      return (
        convert(Math.floor(n / 1000)) + "Thousand " + convert(n % 1000)
      );
    if (n < 10000000)
      return (
        convert(Math.floor(n / 100000)) + "Lakh " + convert(n % 100000)
      );
    return (
      convert(Math.floor(n / 10000000)) + "Crore " + convert(n % 10000000)
    );
  };

  let words = convert(num);
  // Cleanup extra spaces
  words = words.replace(/\s+/g, " ").trim();
  return `${words} Only`;
};

export const formatIndianNumber = (num: number): string => {
  const x = num.toString();
  const lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  }
  return lastThree;
};
