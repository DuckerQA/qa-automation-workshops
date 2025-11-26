import { test as base} from "@playwright/test";
import { User } from "../models/User";
import { generateUser } from "../factories/userFactory";
import path from "path";
import { promises as fs } from "fs";

type MyFixtures = {
    user: User;
}

export const test = base.extend<MyFixtures>({
    user: async({}, use) =>{
        const usersFolder = path.resolve(__dirname, "../testData/");

        const jsonFiles = (await fs.readdir(usersFolder)).filter(f=>f.endsWith(".json"));

        const randomFile = jsonFiles[Math.floor(Math.random() * jsonFiles.length)];
        const data = await fs.readFile(path.join(usersFolder, randomFile), "utf-8");
        const user = JSON.parse(data) as User;

        await use(user);
    }
});