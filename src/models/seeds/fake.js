import '../../config/main';
import { User, ROLES } from '../user';
import Property from '../property';
import { Site } from '../site';
import { SiteEntries } from '../../connectors/siteEntries';
import faker from 'faker';

async function seed() {
    console.log("Seeding...");
    try {
        for (let i = 0; i < 1000; i++) {
            await Property.create({
                name: faker.name.findName(),
                location: faker.address.city(),
                price: faker.commerce.price(),
                buyer: faker.name.findName(),
                buyerNumber: Number(faker.phone.phoneNumberFormat().split("-").join("")),
                totalRecievedAmount: faker.commerce.price(),
                nextDueDate: faker.date.future()
            });
            const user = await User.create({
                username: faker.name.findName(),
                password: "fake@123",
            });
            let site = await Site.create({
                name: faker.commerce.productName(),
                location: faker.address.city(),
                manager: user.id,
                entries: await Promise.all(new Array(600).fill(0).map((e, i) => SiteEntries.create({ mistri: { quantity: i, cost: i } })))
            });
            user.sites.push(site);
            await user.save();
        }
    } catch (e) {
        console.log(e);
    }
    console.log("Finished");
}
seed();
