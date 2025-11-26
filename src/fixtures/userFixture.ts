// fixtures/userFixture.ts
import { test as base } from "@playwright/test";
import { User } from "../models/User";
import { Country } from "../models/Country";
import { generateUser } from "../factories/userFactory.ts";

export const test = base.extend<{ user: User }>({
  user: async ({}, use) => {
    const user:User = await generateUser();

    await use(user);
  },
});
