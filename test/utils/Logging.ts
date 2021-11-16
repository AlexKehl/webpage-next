import fs from 'fs'
import { exec } from 'child_process'
import util from 'util'

const execP = util.promisify(exec)

export const debug = () => {
  fs.writeFileSync(
    './res.html',
    document.body.innerHTML.replace(/opacity: 0/g, 'opacity: 1')
  )

  execP('chrome-canary-cli reload')
}
