import { HashProviderInterface } from "src/shared/application/providers/hash-provider.interface";
import { compare, hash } from "bcrypt"

export class BcryptProvider implements HashProviderInterface {


  async compareHash(passwordText: string, passwordHashed: string): Promise<boolean> {
    return compare(passwordText, passwordHashed)
  }

  async generateHash(password: string): Promise<string> {
    return hash(password, 8)
  }
}