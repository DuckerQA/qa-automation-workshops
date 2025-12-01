import { UserSignupInfo, UserContactInfo } from "../models/user.model.ts";


const countries: string[] = [
  "India",
  "United States",
  "Canada",
  "Australia",
  "Israel",
  "New Zealand",
  "Singapore",
];

export async function generateUserSignupInfo(): Promise<UserSignupInfo>{
    const { faker } = await import("@faker-js/faker");
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
    }
}

export async function generateUserContactInfo(): Promise<UserContactInfo>{
    const { faker } = await import("@faker-js/faker");
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        
        password: faker.internet.password(),
        dateOfBirth: {
            day: faker.number.int({min: 1, max: 31}),
            month: faker.number.int({min: 1, max: 12}),
            year: faker.number.int({min: 1970, max: 2000})
        },
        newsletter: faker.datatype.boolean(),
        optin: faker.datatype.boolean(),
        company: faker.helpers.maybe(()=> faker.company.name(), {probability: 0.7}),
        address1: faker.location.streetAddress(),
        address2: faker.helpers.maybe(()=> faker.location.secondaryAddress(), {probability: 0.8}),
        country: faker.helpers.arrayElement(countries),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.phone.number(),
        title: faker.helpers.maybe(
            () => faker.datatype.boolean() ? "Mr." : "Mrs.",
            { probability: 0.8 }
        )
    }
}

