import { Sites } from '../connectors/sites';
import { SiteEntries } from '../connectors/siteEntries';

(async function () {
  console.log("migrate called...");
  const entries = await SiteEntries.all({});
  for (const e of entries) {
    await e.save()
    console.log(e);
    const site = await Sites.find({ id: e.site });
    console.log(site);
    if (site) {
      await site.reEval();
      await site.save();
    }
    // break;
  }
  console.log("migration done. please delete the migration file");
})()