import { faker } from '@faker-js/faker/locale/en';

import { UserInitModel, UserModel } from '../models/user.model';

function getRandomInitData(): UserInitModel {
  const initUserData: UserInitModel = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
  };
  return initUserData;
}

function prepareRandomUserData(): UserModel {
  const countries = [
    'United States',
    'Canada',
    'Australia',
    'India',
    'Israel',
    'Singapore',
    'New Zealand',
  ];
  const registerUserData: UserModel = {
    password: faker.internet.password(),
    day: faker.number.int({ min: 1, max: 31 }).toString(),
    month: faker.number.int({ min: 1, max: 12 }).toString(),
    year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: countries[Math.floor(Math.random() * countries.length)],
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number(),
  };
  return registerUserData;
}

export { prepareRandomUserData, getRandomInitData };
