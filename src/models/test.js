import { Sites } from '../connectors/sites';
import { Users } from '../connectors/users';
import { SiteEntries } from '../connectors/siteEntries';
import { User } from './User';

(async function () {
  console.log("dev testing called...");
  console.log(await User.findOne({
    sites: {$in: ['5bc9c6561ab3224aa71af609']}
  }));
})()