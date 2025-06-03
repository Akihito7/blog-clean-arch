export interface HashProviderInterface {
  generateHash(password: string): Promise<string>;
  compareHash(passwordText: string, passwordHashed: string): Promise<boolean>;
}