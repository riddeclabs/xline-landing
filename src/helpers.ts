export const pct = (v: number) =>
  Intl.NumberFormat('en', { style: 'percent' }).format(v);
export const cur = (v: number) =>
  Intl.NumberFormat('en', { useGrouping: true }).format(v);
