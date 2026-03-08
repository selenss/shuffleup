import { Given, When, Then } from "@cucumber/cucumber"
import assert from "assert"
import { CustomWorld } from "../framework/world"
import { pages } from "../config/configs"
import { expect } from "@playwright/test"


Given("I navigate to Mock Casino homepage", async function (this: CustomWorld) {
    await this.loginPage.navigate(`${this.baseUrl}`)
})

When("I type username {string}", async function (this: CustomWorld, username: string) {
    await this.loginPage.enterUsername(username)
})

When("I type password {string}", async function (this: CustomWorld, password: string) {
    await this.loginPage.enterPassword(password)
})

When("I click on the login button", async function (this: CustomWorld) {
    await this.loginPage.clickLoginButton()
})

Given("I login with {string} and {string}", async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
    await this.brandsPage.waitForUrl(pages.brands.url)
})

Then("I verify Brands page title", async function (this: CustomWorld) {
    let title = await this.brandsPage.getBrandsPageTitle()
    expect(title).toBe(pages.brands.title)
})

Then("I see brand {string} button", async function (this: CustomWorld, brand) {
    let buttonVisibility = await this.brandsPage.isBrandButtonVisible(brand)
    expect(buttonVisibility).toBeTruthy()
})

Then('I verify login form', async function (this: CustomWorld) {
    expect(await this.loginPage.getUsernameFieldVisibility()).toBeTruthy()
    expect(await this.loginPage.getPasswordFieldVisibility()).toBeTruthy()
    expect(await this.loginPage.getLoginButtonVisibility()).toBeTruthy()
});


Then('I verify Brands page URL', async function (this: CustomWorld) {
    let url = await this.brandsPage.getBrandsPageUrl()
    expect(url).toBe(`${this.baseUrl}${pages.brands.url}`)
});
