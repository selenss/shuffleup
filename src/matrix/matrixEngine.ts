import { Config } from "../framework/configLoader"

export function generateMatrix() {

  const rows:any[] = []

  const currencyFlags = Config.currencyFlags
  const paymentFlags = Config.paymentFlags

  for (const brand in currencyFlags) {

    for (const currency in currencyFlags[brand]) {

      if (!currencyFlags[brand][currency]) continue

      for (const payment in paymentFlags[brand]) {

        if (!paymentFlags[brand][payment]) continue

        rows.push({
          brand,
          currency,
          payment
        })

      }

    }

  }

  return rows

}