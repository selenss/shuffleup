
import { Before, After, AfterAll } from "@cucumber/cucumber"
import { CustomWorld } from "../framework/world"

Before(async function(this:CustomWorld){

  await this.init()

})

After(async function(this:CustomWorld){

  await this.cleanup()

})
