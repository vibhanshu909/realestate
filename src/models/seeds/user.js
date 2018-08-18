import '../../config/main';
import User, { ROLES } from '../user';
// import faker from 'faker';

async function seed(){
    console.log("Seeding...");
    try {
        let u = new User({
            username: "admin",
            password: "admin@123",
            role: ROLES.ADMIN,
        });
        u = await u.save();
    } catch (e) {
        console.log(e);
    }    
    console.log("Finished");
}
seed();
