
import { chromium, firefox, webkit, Browser } from 'playwright'

export async function launchBrowser(): Promise<Browser> {

  const browserType = process.env.BROWSER || "chromium"
  const headed = process.env.HEADED === "true"

  switch(browserType){

    case "firefox":
      return firefox.launch({ headless: !headed })

    case "webkit":
      return webkit.launch({ headless: !headed })

    default:
      return chromium.launch({ headless: !headed })

  }

}
