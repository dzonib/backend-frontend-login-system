const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const secretOrKey = require('../config/keys').secretOrKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;


module.exports = passport => {
  passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      return user
        ? done(null, user)
        : done(null, false);
    } catch (e) {
      console.log(`ERROR --> ${e}`);
    }
  }));
}