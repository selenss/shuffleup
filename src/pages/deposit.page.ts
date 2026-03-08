
import { BasePage } from "./base.page"
import { expect } from "@playwright/test"

export class DepositPage extends BasePage {

  async getDepositForCurrency(currency: string) {
    let defaultDepositTextLocator = this.locator(`span#${currency.toLowerCase()}Balance`)
    return await this.getElementText(defaultDepositTextLocator);
  }

  async clickActionButtonForCurrency(action: string, currency: string, deposit: string) {
    let actionButtonLocator = this.locator(`button[onclick="${action.toLowerCase()}('${currency}')"]`);
    let currencyTextLocator =  this.locator(`div#${currency.toLowerCase()}Block`);
    await this.click(actionButtonLocator, currencyTextLocator, deposit);
  }

  async getCurrentDepositForCurrency(currency: string, deposit: string) {
    let currencyTextLocator =  this.locator(`div#${currency.toLowerCase()}Block`);
    await this.waitForElementVisible(currencyTextLocator);
    return await this.getElementText(currencyTextLocator);
  }
}
