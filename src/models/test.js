import propertyTask, { way2sms, awsSns } from '../tasks/property';

(async function () {
  console.log("function called...");
  propertyTask();
  // 7376608584
  // awsSns({to: 8765034689, msg: "Payment due from visit: https://vsquarevision.ml"});
  // way2sms({ to: "8765034689", msg: "hello" })
})()
