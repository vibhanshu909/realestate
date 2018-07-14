import '../../config/main';
import User, { ROLES } from '../user';
import faker from 'faker';

async function seed(){
    console.log("Seeding...");
    try {
        for(let i =0; i< 10; i++)
        {
            let u = new User({
                email: faker.internet.email(),
                password: "Hello@123",
                role: ROLES.CLIENT ,
            });
            u = await u.save();
        }

    } catch (e) {
        console.log(e);
    } finally {
    }
    console.log("Finished");
}
seed();
