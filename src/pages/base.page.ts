import { Page, Locator, expect } from "@playwright/test"
import { CustomWorld } from "../framework/world"

export class BasePage {

  protected get page(): Page {
    return this.world.page
  }
  protected world: CustomWorld

  constructor(world: CustomWorld) {
    this.world = world
  }

  locator(selector: string, text?: string): Locator {
    if (text) {
      return this.page.locator(selector, { hasText: text })
    }
    return this.page.locator(selector)
  }

  async waitForElementEnabled(element: Locator): Promise<void> {
    await expect(element).toBeVisible()
    await expect(element).toBeEnabled()
  }

  async waitForElementDisabled(element: Locator): Promise<void> {
    await expect(element).toBeVisible()
    await expect(element).toBeDisabled()
  }

  async waitForElementVisible(element: Locator): Promise<void> {
    await expect(element).toBeVisible()
  }

  async waitForElementHidden(element: Locator): Promise<void> {
    await expect(element).toBeHidden()
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" })
  }

  async click(element: Locator): Promise<void> {
    await expect(element).toBeVisible()
    await expect(element).toBeEnabled()
    await element.click()
  }

  async fill(element: Locator, value: string): Promise<void> {
    await expect(element).toBeVisible()
    await expect(element).toBeEnabled()
    await element.fill(value)
  }

  async getElementText(element: Locator): Promise<string | null> {
    await expect(element).toBeVisible()
    const text = await element.innerText()
    return text.trim()
  }

  async checkElementTextContain(element: Locator, text: String): Promise<void> {
    expect(await this.getElementText(element)).toContain(text);
  }

  async getCurrentUrl(): Promise<string> {
    await this.page.waitForLoadState("domcontentloaded")
    return this.page.url()
  }

  async waitForUrl(urlPart: string): Promise<string> {
    await this.page.waitForURL(`**${urlPart}**`)
    return this.page.url()
  }

  async clickAndSwitchToTab(element: Locator): Promise<void> {
    await expect(element).toBeVisible()
    await expect(element).toBeEnabled()
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      element.click()
    ])
    await newPage.waitForLoadState("domcontentloaded")
    this.world.page = newPage
  }
}