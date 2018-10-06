import User, { ROLES } from '../user';

export default async function seed() {
    console.log("Seeding...");
    await User.create({
        username: "testing",
        password: "testing@123",
        role: ROLES.ADMIN,
    });    
    console.log("Finished");
}
