import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel'; // Ensure this path is correct

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const { id, displayName, emails } = profile;

  try {
    let user = await User.findOne({ googleId: id });
    if (!user) {
      if (emails && emails.length > 0) {
        user = new User({
          googleId: id,
          name: displayName,
          email: emails[0].value
        });
        await user.save();
      } else {
        return done(new Error('No email found'));
      }
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));
