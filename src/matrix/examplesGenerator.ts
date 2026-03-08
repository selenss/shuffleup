import fs from "fs"
import path from "path"
import { generateMatrix } from "./matrixEngine"
import { loadConfig } from "../framework/configLoader"
import { MockoonManager } from "../framework/mockoonManager"
import { getRandomPort } from "../framework/portManager"
import { waitForServer } from "../framework/waitForServer"

const matrixDir = "src/features/matrix-features"
const generatedDir = "src/features/generated-features"

function buildExamples(rows:any[]) {

  if(!rows.length){
    throw new Error("Matrix is empty.")
  }

  const headers = Object.keys(rows[0])

  const header = `| ${headers.join(" | ")} |`

  const body = rows.map(r =>
    `| ${headers.map(h => r[h]).join(" | ")} |`
  )

  return [header,...body].join("\n")

}

export async function generateExamples() {
  // Clean generated features
  fs.rmSync(generatedDir,{recursive:true,force:true})
  fs.mkdirSync(generatedDir,{recursive:true})

  const port = getRandomPort()
  const mock = new MockoonManager(port)

  try {

    mock.start()

    const baseUrl = `http://localhost:${port}`

    await waitForServer(baseUrl)

    await loadConfig(baseUrl)

    const files = fs.readdirSync(matrixDir)

    for(const file of files){

      if(!file.endsWith(".feature")) continue

      const sourcePath = path.join(matrixDir,file)
      const targetPath = path.join(generatedDir,file)

      const content = fs.readFileSync(sourcePath,"utf8")

      if(!content.includes("@matrix")) continue
      if(!content.includes("<<matrix>>")) continue

      const matrix = generateMatrix()

      const examples = buildExamples(matrix)

      const updated = content.replace("<<matrix>>",examples)

      fs.writeFileSync(targetPath,updated)

      console.log("Generated:",targetPath)

    }

  } finally {

    mock.stop()

  }

}

generateExamples()