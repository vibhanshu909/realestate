import '../../config/main';
import {Site, SiteEntry} from '../site';

async function seed(){
    console.log("Seeding...");
    const s = await Site.findById("5b72a1c1623fb67e03fb2763");
    for(let i=3; i<= 100; i++){
        let data = {
            quantity: i,
            cost: i
        };
        s.entries.unshift(await SiteEntry.create({
            mistri: data,
            labour: data,
            eit: data,
            morang: data,
            githi: data,
            cement: data,
            saria: data,
            dust: data,
            other: data
        }));
    }
    await s.save();

    console.log("Finished");
}
seed();
