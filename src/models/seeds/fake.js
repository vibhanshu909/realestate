import '../../config/main';
import User, { ROLES } from '../user';
import { Site, SiteEntry } from '../site';
// import faker from 'faker';

async function seed() {
    console.log("Seeding...");
    try {
        for (let i = 0; i < 10; i++) {
            const user = await User.create({
                username: "fake_" + Math.random(),
                password: "fake@123",
            });
            let site = await Site.create({
                name: "fake_" + Math.random(),
                location: "fake_location",
                manager: user.id,
                entries: await Promise.all(new Array(600).fill(0).map((e, i) => SiteEntry.create({ mistri: { quantity: i, cost: i } })))
            });
            user.sites.push(site);
            user.save();
        }
    } catch (e) {
        console.log(e);
    }
    console.log("Finished");
}
seed();
