export const Config: any = {}

export async function loadConfig(baseUrl: string) {

  if (Config.loaded) return

  const currency = await fetch(`${baseUrl}/api/currency-flags`).then(r=>r.json())
  const payments = await fetch(`${baseUrl}/api/payments-flags`).then(r=>r.json())

  Config.currencyFlags = currency
  Config.paymentFlags = payments
  Config.loaded = true

}