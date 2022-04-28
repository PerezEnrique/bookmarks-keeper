import passport from "passport";
import localStrategy from "../utils/auth-strategies/local-strategy";

passport.use(localStrategy);

export default passport.initialize();
