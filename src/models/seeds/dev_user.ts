import { User, ROLES } from '../User';
// @ts-expect-error TS(2613): Module '"/home/vibhanshu/Documents/Vibhanshu/Reale... Remove this comment to see the full error message
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
