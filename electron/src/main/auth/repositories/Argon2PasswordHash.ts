import argon2 from "argon2";
import { PasswordHasher } from "../model/IPassWordHash";

export class Argon2PasswordHash implements PasswordHasher{
    async hash(password: string): Promise<string> {
        return await argon2.hash(password)
    }
    async compare(plainText: string, hash: string): Promise<boolean> {
        return argon2.verify(hash,plainText)
    }
    
}