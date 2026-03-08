import { setWorldConstructor, World } from "@cucumber/cucumber"
import { Browser, BrowserContext, Page } from "playwright"
import { launchBrowser } from "./browserFactory"
import { MockoonManager } from "./mockoonManager"
import { getRandomPort } from "./portManager"
import { waitForServer } from "./waitForServer"
import { LoginPage } from "../pages/login.page"
import { BrandsPage } from "../pages/brands.page"
import { DepositPage } from "../pages/deposit.page"
import { loadConfig } from "./configLoader"

export class CustomWorld extends World {

  browser!: Browser
  context!: BrowserContext
  page!: Page

  loginPage!: LoginPage
  brandsPage!: BrandsPage
  depositPage!: DepositPage

  mock!: MockoonManager
  port!: number
  baseUrl!: string

  async init() {

    // generate unique port for this scenario
    this.port = getRandomPort()

    // start mock server
    this.mock = new MockoonManager(this.port)
    this.mock.start()

    this.baseUrl = `http://localhost:${this.port}`

    // wait until mock server is ready
    await waitForServer(this.baseUrl)

    // load config from mock server
      await loadConfig(this.baseUrl)

    // launch browser (chromium / firefox / webkit)
    this.browser = await launchBrowser()

    // create isolated context
    this.context = await this.browser.newContext()

    // create page
    this.page = await this.context.newPage()

    this.loginPage = new LoginPage(this)
    this.brandsPage = new BrandsPage(this)
    this.depositPage = new DepositPage(this)

  }

  async cleanup() {

    try {

      await this.page?.close()

      await this.context?.close()

      await this.browser?.close()

    } finally {

      // ensure mock server always stops
      this.mock?.stop()

    }

  }

}

setWorldConstructor(CustomWorld)