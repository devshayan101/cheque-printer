/**
 * Converts a number to currency format words
 */
export const numberToWords = (num: number, system: 'indian' | 'international' = 'indian'): string => {
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

  const getLT20 = (n: number) => a[Number(n)];
  const getTens = (n: number) => {
    return b[Math.floor(n / 10)] + " " + a[n % 10];
  };

  const convertIndian = (n: number): string => {
    if (n < 20) return getLT20(n);
    if (n < 100) return getTens(n);
    if (n < 1000)
      return (
        getLT20(Math.floor(n / 100)) + "Hundred " + convertIndian(n % 100)
      );
    if (n < 100000)
      return (
        convertIndian(Math.floor(n / 1000)) + "Thousand " + convertIndian(n % 1000)
      );
    if (n < 10000000)
      return (
        convertIndian(Math.floor(n / 100000)) + "Lakh " + convertIndian(n % 100000)
      );
    return (
      convertIndian(Math.floor(n / 10000000)) + "Crore " + convertIndian(n % 10000000)
    );
  };

  const convertInternational = (n: number): string => {
    if (n < 20) return getLT20(n);
    if (n < 100) return getTens(n);
    if (n < 1000)
      return (
        getLT20(Math.floor(n / 100)) + "Hundred " + convertInternational(n % 100)
      );
    if (n < 1000000)
      return (
        convertInternational(Math.floor(n / 1000)) + "Thousand " + convertInternational(n % 1000)
      );
    if (n < 1000000000)
      return (
        convertInternational(Math.floor(n / 1000000)) + "Million " + convertInternational(n % 1000000)
      );
    return (
      convertInternational(Math.floor(n / 1000000000)) + "Billion " + convertInternational(n % 1000000000)
    );
  };

  let words = system === 'international' ? convertInternational(num) : convertIndian(num);
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

export const formatNumber = (num: number, system: 'indian' | 'international' = 'indian'): string => {
  if (system === 'international') {
    return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  return formatIndianNumber(num);
};
