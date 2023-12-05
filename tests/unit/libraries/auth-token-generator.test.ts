import appConfig from "../../../src/config/app-config";
import AuthTokenGenerator from "../../../src/libraries/auth-token-generator";
import User from "../../../src/domain/entities/User";
import jwt from "jsonwebtoken";

describe("AuthTokenGenerator.generate()", () => {
    it("should return a valid JWT", () => {
        const user = new User("1", [], "userPassword", "John Doe");
        const generator = new AuthTokenGenerator();
        
        const token = generator.generate(user);
        const decodedToken = jwt.verify(token, appConfig.jwtPrivateKey as jwt.Secret);
        
        expect(decodedToken).toMatchObject({ sub: user.id })
    })
})