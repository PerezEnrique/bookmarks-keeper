const passport = require("passport");
const localStrategy = require("../utils/auth-strategies/local-strategy");

passport.use(localStrategy);

module.exports = passport.initialize();
