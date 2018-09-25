import mongoose from '../config/main'
import { Sites } from '../connectors/sites';
import { Properties } from '../connectors/properties';

(async function () {
  console.log("function called...")
  // let { Properties } = await import("../connectors/properties");
  let result = await Properties.all({
    query: {
      nextDueDate: new Date((function () {
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const d = now.getDate();
        return y + "-" +
          (m < 10 ? "0" + m : m) + "-" +
          (d < 10 ? "0" + d : d);
      })())
    }
  });
  console.log(result);
})()
