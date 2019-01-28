import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ROLES, User } from '../User';
import { createConn } from '../../config/db';

process.env = {
    ...dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`)),
    ...process.env,
}

async function seed() {
    await createConn()
    console.log("Seeding...");
    await User.create({
        username: "admin",
        password: "admin@123",
        role: ROLES.ADMIN,
        stockPermission: true
    });
    console.log("Finished");
}
seed();
