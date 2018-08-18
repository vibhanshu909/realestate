import '../../config/main';
import {Site, SiteEntry} from '../site';

async function seed(){
    console.log("Seeding...");
    const s = await Site.findById("5b767200bda3680e63bf5f5e");
    for(let i=2; i<= 20; i++){
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
