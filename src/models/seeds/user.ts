import '../../config/main';
import { User, ROLES } from '../User';

async function seed(){
    console.log("Seeding...");
    try {
        let u = new User({
            username: "kkassociates",
            password: "k9936535955ka",
            role: ROLES.ADMIN,
        });
        u = await u.save();
    } catch (e) {
        console.log(e);
    }    
    console.log("Finished");
}
seed();
