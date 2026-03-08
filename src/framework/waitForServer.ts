import http from "http"

export async function waitForServer(url: string, timeout = 5000) {

  const start = Date.now()

  while (Date.now() - start < timeout) {

    try {

      await new Promise((resolve, reject) => {

        const req = http.get(url, () => {
          resolve(true)
        })

        req.on("error", reject)

      })

      return

    } catch {

      await new Promise(r => setTimeout(r, 200))

    }

  }

  throw new Error("Mock server did not start")

}