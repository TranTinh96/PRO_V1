const passport = require("passport")
const passportJWT = require("passport-jwt")
const JwtStrategy = passportJWT.Strategy
const extractJwt = passportJWT.ExtractJwt


//Config passport-JWT
var configJWT = {
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken("token"),
    secretOrKey  : process.env.JWT_KEY_SECRET
 }
 
 passport.use(new JwtStrategy(configJWT, async (token, done) => {
   console.log(configJWT.jwtFromRequest)
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));