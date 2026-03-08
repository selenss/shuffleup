
import { BasePage } from "./base.page"
import { pages } from "../config/configs"

export class BrandsPage extends BasePage {

  private BRANDS_PAGE_TITLE = this.locator("h1")

  async getBrandsPageTitle(){
    return await this.getElementText(this.BRANDS_PAGE_TITLE);
  }

  async getBrandsPageUrl(){
    await this.waitForUrl(pages.brands.url)
    return this.getCurrentUrl();
  }

  async isBrandButtonVisible(brandName:string):Promise<boolean>{
    let brandButtonLocator = this.locator('button', brandName);
    return await brandButtonLocator.isVisible();
  }
}
