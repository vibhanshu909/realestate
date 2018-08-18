import config from '../config/main';
import {Site, SiteEntry} from './site';
import {User} from './user';
import crud from '../connectors/crud';

(async function(){
    console.log("function called...");
    // let result = await Site.findById("5b6d3de6a661081f59516fac").populate({path: 'entries', select: "mistri", options: { limit: 20, skip: 1, sort: "-createdAt" }});
    // let result = await Site.find().skip(0).limit(15).sort({createdAt: -1}).populate('manager');
    // console.log("result is ....\n", result);
    const Sites = crud(Site);
    let result = await Sites.find({id: "5b753099d7291867eb2ac41f"}).populate('manager');
    console.log("result is ....\n", result);
    result = await Site.populate(await Sites.create({name: ""+ Math.random(), location: ""+ Math.random(), manager: "5b740bbbac02cf3bac7e50aa"}),{path: "manager"});
    console.log("result is ....\n", result);
    result = await (await Sites.create({name: ""+ Math.random(), location: ""+ Math.random(), manager: "5b740bbbac02cf3bac7e50aa"})).populate({path: "manager"});
    console.log("result is ....\n", result);
})();
