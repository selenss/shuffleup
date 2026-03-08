
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
    let currencyTextLocator =  this.locator(`div#${currency.toLowerCase()}Block`);
    await this.waitForElementVisible(currencyTextLocator);
    await this.checkElementTextContain(currencyTextLocator, deposit);
    return await this.getElementText(currencyTextLocator);
  }
}
