// @ts-expect-error TS(7016): Could not find a declaration file for module 'dote... Remove this comment to see the full error message
import * as dotenv from "dotenv";
import * as fs from "fs";

try {
  process.env = {
    ...dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`)),
    ...process.env,
  };
} catch (_) {}

import("./main");
