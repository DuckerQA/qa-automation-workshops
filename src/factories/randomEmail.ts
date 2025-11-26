import { randomInt } from "./randomInt";
export function randomEmail() {
  return `test_${Date.now()}_${randomInt(1000, 9999)}@mail.com`;
}