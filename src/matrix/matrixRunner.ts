import { generateMatrix } from "./matrixEngine"
import { TestMatrixRow } from "./matrixTypes"
import { Then } from "@cucumber/cucumber"

const matrix: TestMatrixRow[] = generateMatrix()

matrix.forEach(({ brand, currency, payment }) => {

  Then(
    `${brand} ${currency} ${payment} should work`,
    async function () {

      await this.brandsPage.openBrand(brand)

      await this.brandsPage.verifyCurrency(currency)

      await this.brandsPage.verifyPayment(payment)

    }
  )

})