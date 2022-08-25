import {hash} from "bcrypt";

export default class PasswordEncrypter {
    static async encrypt(password: string){
        return await hash(password, 10);
    }
}