import currency from "currency.js";

export function getCurrencyConfig(
  locale: string = "pt-BR",
  currency: string = "BRL",
) {
  const parts = Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).formatToParts(1234.5);

  return {
    symbol: parts.find((p) => p.type === "currency")?.value || "",
    decimal: parts.find((p) => p.type === "decimal")?.value || ".",
    separator: parts.find((p) => p.type === "group")?.value || ",",
  };
}

export function currencyFormatter(
  locale: string = "pt-BR",
  currencyCode: string = "BRL",
) {
  const config = getCurrencyConfig(locale, currencyCode);

  return (value: any) =>
    currency(value, {
      symbol: config.symbol,
      decimal: config.decimal,
      separator: config.separator,
    });
}
