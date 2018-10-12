import { Sites } from '../connectors/sites';
import { SiteEntries } from '../connectors/siteEntries';
import { User } from './user';

(async function () {
  console.log("migrate called...");
  User.findOne();
})()