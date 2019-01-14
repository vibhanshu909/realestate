import { Sites } from '../connectors/sites';
import { Users } from '../connectors/users';
import SiteTotal from './SiteTotal';
import { SiteEntries } from '../connectors/siteEntries';
import { User } from './User';

(async function () {
  console.log("dev testing called...");
  const user = await Users.all({ username: { $eq: "vibhanshu" } });
  console.log(user);
  const site = new Sites.model({
    name: "test",
    location: "empty",
    manager: user[0].id    
  });
  site.total.push(
    await SiteTotal.create({
      manager: user[0].id
    })
  );
  console.log(site);
  await site.save();
  console.log(site);
})()