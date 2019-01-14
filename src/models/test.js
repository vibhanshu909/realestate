import { Sites } from '../connectors/sites';
import { SiteEntries } from '../connectors/siteEntries';
import { User } from './User';

(async function () {
  console.log("migrate called...");
  User.findOne();
})()