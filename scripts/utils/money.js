//this file will contain all the functions related to money
export function formatMoney(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
  }
