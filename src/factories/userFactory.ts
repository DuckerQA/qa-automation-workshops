import { UserContactInfo, UserSignupInfo } from '../models/user.model';

const countries: string[] = [
  'India',
  'United States',
  'Canada',
  'Australia',
  'Israel',
  'New Zealand',
  'Singapore',
];

export async function generateUserSignupInfo(): Promise<UserSignupInfo> {
  const { faker } = await import('@faker-js/faker');
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}

export async function generateUserContactInfo(): Promise<UserContactInfo> {
  const { faker } = await import('@faker-js/faker');
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),

    password: faker.internet.password(),
    dateOfBirth: {
      day: faker.number.int({ min: 1, max: 31 }),
      month: faker.number.int({ min: 1, max: 12 }),
      year: faker.number.int({ min: 1970, max: 2000 }),
    },
    newsletter: faker.datatype.boolean(),
    optin: faker.datatype.boolean(),
    company: faker.helpers.maybe(() => faker.company.name(), {
      probability: 0.7,
    }),
    address1: faker.location.streetAddress(),
    address2: faker.helpers.maybe(() => faker.location.secondaryAddress(), {
      probability: 0.8,
    }),
    country: faker.helpers.arrayElement(countries),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number(),
    title: faker.helpers.maybe(
      () => (faker.datatype.boolean() ? 'Mr.' : 'Mrs.'),
      { probability: 0.8 },
    ),
  };
}

/*
export async function saveToEnv(): Promise<void> {
  const signup = await generateUserSignupInfo();
  const contact = await generateUserContactInfo();

  const envContent = `
USER_NAME=${signup.name}
USER_EMAIL=${signup.email}
FIRST_NAME=${contact.firstName}
LAST_NAME=${contact.lastName}
USER_PASSWORD=${contact.password}
DOB_DAY=${contact.dateOfBirth.day}
DOB_MONTH=${contact.dateOfBirth.month}
DOB_YEAR=${contact.dateOfBirth.year}
COMPANY=${contact.company || ''}
ADDRESS1=${contact.address1}
ADDRESS2=${contact.address2 || ''}
COUNTRY=${contact.country}
STATE=${contact.state}
CITY=${contact.city}
ZIPCODE=${contact.zipcode}
MOBILE=${contact.mobileNumber}
TITLE=${contact.title || ''}
NEWSLETTER=${contact.newsletter}
OPTIN=${contact.optin}
  `;

  await fs.writeFile('.env', envContent.trim());
}
*/
