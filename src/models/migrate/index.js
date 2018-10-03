import { Sites } from '../../connectors/sites';
import { SiteEntries } from '../../connectors/siteEntries';

(async function () {
  console.log("migrate called...");
  const sites = await Sites.all({});
  for (const site of sites) {
    for (const e of site.entries) {
      await SiteEntries.model.findByIdAndUpdate(e, {
        site
      });
    }
  }
  console.log("migration done. please delete the migration file");  
})()