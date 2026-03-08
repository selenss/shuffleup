
import { BasePage } from "./base.page"
import { pages } from "../config/configs"

export class LoginPage extends BasePage {
  //locators and selectors

  private USERNAME_INPUT = this.locator("#username")
  private PASSWORD_INPUT = this.locator("#password")
  private LOGIN_BUTTON = this.locator("#login_button")

  async navigateToLoginPage(url:string){
    await this.navigate(url)
  }

  async enterUsername(username:string){
    await this.fill(this.USERNAME_INPUT,username)
  }

  async enterPassword(password:string){
    await this.fill(this.PASSWORD_INPUT,password)
  }

  async clickLoginButton(){
    await this.click(this.LOGIN_BUTTON)
    await this.waitForUrl(pages.brands.url)
  }

  async getUsernameFieldVisibility():Promise<boolean>{
    return await this.USERNAME_INPUT.isVisible();
  }

  async getPasswordFieldVisibility():Promise<boolean>{
    return await this.PASSWORD_INPUT.isVisible();
  }

  async getLoginButtonVisibility():Promise<boolean>{
    return await this.LOGIN_BUTTON.isVisible();
  }

  async login(username:string, password:string){
    await this.enterUsername(username)
    await this.enterPassword(password)
    await this.clickLoginButton()
  }
}
