import { When, Then } from "@cucumber/cucumber"
import { CustomWorld } from "../framework/world"
import { expect } from "@playwright/test"

Then('I should see default deposit for currency {string} is {string}', async function (this: CustomWorld, currency: string, deposit: string) {
    expect(await this.depositPage.getDepositForCurrency(currency)).toBe(deposit);
});

When('I click {string} button for {string}', async function (this: CustomWorld, action: string, currency: string) {
    await this.depositPage.clickActionButtonForCurrency(action, currency);
});

Then('I see current deposit is {string} {string}', async function (this: CustomWorld, deposit: string, currency: string) {
    expect(await this.depositPage.getCurrentDepositForCurrency(currency, deposit)).toContain(`${currency}: ${deposit}`);
});