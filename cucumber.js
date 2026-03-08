const timestamp = Date.now()
module.exports = {
  default: {
    paths: [
      "src/features/**/*.feature",
    ],
    require: [
      "src/steps/**/*.ts",
      "src/hooks/**/*.ts",
      "src/framework/world.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress",
      `html:reports/${timestamp}_report.html`
    ],
    parallel: 4,
    publishQuiet: true
  }
}