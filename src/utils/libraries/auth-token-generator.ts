import jwt from "jsonwebtoken";
import appConfig from "../../config/app-config";
import User from "../../domain/entities/User";

export type tokenPayload = {
    sub: string
    username: string
}

export default class AuthTokenGenerator {
    private jwtPrivateKey: jwt.Secret;

    constructor() {
        if(!appConfig.jwtPrivateKey){
            console.log("Fatal error: jwt private key is not definned");
            process.exit(1);
        }

        this.jwtPrivateKey = appConfig.jwtPrivateKey as jwt.Secret;
    }

    generate(user: User){
        return jwt.sign({ sub: user.id }, this.jwtPrivateKey, {
            expiresIn: "1d",
        });
    }
}