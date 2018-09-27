import mongoose from '../config/main'
import { Sites } from '../connectors/sites';
import { Properties } from '../connectors/properties';
import {getHash} from './user';
import bcrypt from 'bcrypt';

(async function () {
  console.log("function called...");
  let h=await getHash("vibhanshu");
  console.log(h);
  console.log(await bcrypt.compare("", h))
})()
