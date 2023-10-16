import { hash } from "bcrypt";

export default class PasswordEncrypter {
  async encryptAsync(password: string) {
    return await hash(password, 10);
  }
}
