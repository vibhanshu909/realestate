import '../../config/main';
import {Site, SiteEntry} from '../site';

async function seed(){
    console.log("Seeding...");
    let s = null;
    try {
        s = new Site({
            name: "seeded",
            location: "somewhere"
        });
        s = await s.save();
    } catch (e) {
        console.log(e);
    }
    for(let i=1; i< 100; i++){
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
