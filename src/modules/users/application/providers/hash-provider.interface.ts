export interface HashProviderInterface {
  generateHash(password: string): string;
  compareHash(passwordText: string, passwordHashed: string): Promise<boolean>;
}