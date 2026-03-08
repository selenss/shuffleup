
import { spawn } from "child_process"

export class MockoonManager {

  process:any
  port:number

  constructor(port:number){

    this.port = port

  }

  start(){

    this.process = spawn("npx",[
      "mockoon-cli",
      "start",
      "--data",
      "mock/sample_app_mock.json",
      "--port",
      String(this.port)
    ])

  }

  stop(){

    if(this.process){
      this.process.kill()
    }

  }

}
