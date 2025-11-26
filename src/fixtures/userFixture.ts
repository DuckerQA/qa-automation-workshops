// fixtures/userFixture.ts
import { test as base } from "@playwright/test";
import { User } from "../models/User";
import { Country } from "../models/Country";
import { randomInt } from "../factories/randomInt.ts";
import { randomString } from "../factories/randomString.ts";
import { randomEmail } from "../factories/randomEmail.ts";

const countries: Country[] = [
  "India",
  "United States",
  "Canada",
  "Australia",
  "Israel",
  "New Zealand",
  "Singapore",
];

export const test = base.extend<{ user: User }>({
  user: async ({}, use) => {
    const titles: ("Mr" | "Mrs")[] = ["Mr", "Mrs"];
    const user: User = {
      title: titles[randomInt(0, titles.length - 1)],
      name: randomString(6),
      firstName: randomString(5),
      lastName: randomString(5),
      email: randomEmail(),
      password: "Test1234!",
      dateOfBirth: {
        day: randomInt(1, 28),
        month: randomInt(1, 12),
        year: randomInt(1970, 2002),
      },
      newsletter: Math.random() > 0.5,
      optin: Math.random() > 0.5,
      company: "TestCompany",
      address1: "123 Test St",
      address2: "Apt " + randomInt(1, 999),
      country: countries[randomInt(0, countries.length - 1)],
      state: "TestState",
      city: "TestCity",
      zipcode: randomInt(10000, 99999).toString(),
      mobileNumber: `+${randomInt(10,99)}${randomInt(100000000, 999999999)}`,
    };

    await use(user);
  },
});
