interface UserSignupInfo {
  name: string;
  email: string;
}

interface UserContactInfo {
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: { day: number; month: number; year: number };
  newsletter: boolean;
  optin: boolean;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  title?: string;
}

export { UserSignupInfo, UserContactInfo };
