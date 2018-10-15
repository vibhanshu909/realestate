import { User, ROLES } from '../User';
import Site from '../Site';

async function seed() {
    console.log("Seeding...");
    await User.create({
        username: "admin",
        password: "admin@123",
        role: ROLES.ADMIN,
    });
    console.log("Finished");
}
seed();
