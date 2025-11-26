import { Country } from "./Country.ts";

export interface User{
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: {day: number, month: number, year: number};
    newsletter: boolean;
    optin: boolean;
    company?: string;
    address1: string;
    address2?: string;
    country: Country;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    title?: string;
}