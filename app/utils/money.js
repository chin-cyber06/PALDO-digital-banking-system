export const BALANCE_MASK = "₱ ******"

/** Format integer centavos as PHP currency: 4825075 -> "₱48,250.75". */
export function formatMoney(centavos) {
  const value = Number(centavos) || 0
  const sign = value < 0 ? "−" : ""
  const text = (Math.abs(value) / 100).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${sign}₱${text}`
}

/**
 * Parse user input ("1,250.5") into integer centavos without float drift.
 * Returns NaN when invalid (empty, letters, or more than 2 decimals).
 */
export function toCentavos(input) {
  const text = String(input ?? "").trim().replace(/,/g, "")
  if (text === "" || text === "." || !/^\d*\.?\d{0,2}$/.test(text)) return NaN
  const [whole = "0", fraction = ""] = text.split(".")
  return Number(whole || "0") * 100 + Number((fraction + "00").slice(0, 2))
}

/** Integer centavos -> plain decimal number (for display math only). */
export const fromCentavos = (centavos) => (Number(centavos) || 0) / 100
