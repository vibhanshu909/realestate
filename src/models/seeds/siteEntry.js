import '../../config/main';
import {Site, SiteEntry} from '../site';

async function seed(){
    console.log("Seeding...");
    const s = await Site.findById("5b8d3774bcba3653a8552cbd");
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
            baalu: data,
            githi: data,
            cement: data,
            saria: data,
            dust: data,
            other: data,
            other2: data,
        }));
    }
    await s.save();

    console.log("Finished");
}
seed();
