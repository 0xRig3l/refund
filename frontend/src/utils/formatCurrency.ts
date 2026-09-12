export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    currencySign: "standard",
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function parseCurrency(value: string) {
  const digits = value.replace(/\D/g, "");
  return Number(digits);
}
