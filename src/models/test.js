import config from '../config/main';
import {Site, SiteEntry} from './site';

(async function(){
    console.log("function called...");
    let result = await Site.findById("5b6d3de6a661081f59516fac").populate({path: 'entries', select: "mistri", options: { limit: 20, skip: 1, sort: "-createdAt" }});
    console.log("result is ....\n", result.entries.toObject());
})();
