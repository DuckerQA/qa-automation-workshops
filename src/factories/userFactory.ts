import { User } from "../models/User.ts";
import { promises as fs } from "fs";

export async function generateUser(sciezka?: string, user?: User, overrides?: Partial<User>) : Promise<User | undefined>{
    let created: User | undefined;
    if(sciezka){
        const data = await fs.readFile(sciezka, "utf-8");
        created = JSON.parse(data) as User;
    }
    if(user) created = user;

    if(created && overrides) created = {...created, ...overrides};

    return created;
}