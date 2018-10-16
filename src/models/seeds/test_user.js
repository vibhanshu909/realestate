import { mongoose } from '../../config/main';
import { Site } from '../Site';
import { User, ROLES } from '../User';

async function seed() {
    console.log("Seeding...");
    await User.create({
        username: "testing",
        password: "testing@123",
        role: ROLES.ADMIN,
    });
    console.log("Finished");
}
setTimeout(seed, 1000 * 3)
export default seed;