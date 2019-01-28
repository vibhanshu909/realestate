import * as dotenv from 'dotenv'
import * as fs from 'fs'

process.env = {
  ...dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`)),
  ...process.env,
}
import('./main')