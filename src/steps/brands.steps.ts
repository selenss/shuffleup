import { Given, When, Then } from "@cucumber/cucumber"
import assert from "assert"
import { CustomWorld } from "../framework/world"
import { pages } from "../config/configs"
import { expect } from "@playwright/test"

When('I open {string} brand page', async function (this: CustomWorld, brand: string) {
    let brandButtonLocator =  this.brandsPage.locator(`button[onclick="openBrand('${brand}')"]`);
    await this.brandsPage.clickAndSwitchToTab(brandButtonLocator);
    
});

Then('I should see {string} currency text', async function (this: CustomWorld, currency: string) {
    let currencyTextLocator =  this.brandsPage.locator(`div#${currency.toLowerCase()}Block`);
    await this.brandsPage.waitForElementVisible(currencyTextLocator);
    expect(await currencyTextLocator.isVisible()).toBeTruthy()
    expect(await this.brandsPage.getElementText(currencyTextLocator)).toContain(`${currency}:`);
});

Then('I should see {string} payment button', async function (this: CustomWorld, payment: string) {
    let paymentButtonLocator =  this.brandsPage.locator("button", `Pay with ${payment}`);
    await this.brandsPage.waitForElementVisible(paymentButtonLocator);
    expect(await paymentButtonLocator.isVisible()).toBeTruthy()
    expect(await this.brandsPage.getElementText(paymentButtonLocator)).toBe(`Pay with ${payment}`);
});