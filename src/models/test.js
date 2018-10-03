import propertyTask, { way2sms, awsSns } from '../tasks/property';
import { Sites } from '../connectors/sites';
(async function () {
  console.log("function called...");
  console.log(await Sites.all({}))
})()
