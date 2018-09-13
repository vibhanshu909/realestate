import mongoose from '../config/main'
import {Sites} from '../connectors/sites';

(async function () {
  console.log("function called...")
  let sites = await(Sites.all({limit: 15, skip: 0}).populate('manager'))  
})()
