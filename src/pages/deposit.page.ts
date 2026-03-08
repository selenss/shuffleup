
import { BasePage } from "./base.page"
import { expect } from "@playwright/test"

export class DepositPage extends BasePage {

  async getDepositForCurrency(currency: string) {
    let defaultDepositTextLocator = this.locator(`span#${currency.toLowerCase()}Balance`)
    return await this.getElementText(defaultDepositTextLocator);
  }

  async clickActionButtonForCurrency(action: string, currency: string) {
    let actionButtonLocator = this.locator(`button[onclick="${action.toLowerCase()}('${currency}')"]`);
    await this.click(actionButtonLocator);
  }

  async getCurrentDepositForCurrency(currency: string, deposit: string) {
    let currencyTextLocator = this.locator(`div#${currency.toLowerCase()}Block`);
    let currentBalanceTextLocator = this.locator(`span#${currency.toLowerCase()}Balance`);
    await this.waitForElementVisible(currencyTextLocator);
    await this.waitForElementVisible(currentBalanceTextLocator);
    await expect(currentBalanceTextLocator).toHaveText(deposit);
    return await this.getElementText(currencyTextLocator);
  }
}
