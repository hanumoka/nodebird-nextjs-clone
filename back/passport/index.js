const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  //passport login 시 세션에 user id 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 로그인후 요청이 올때마다,  세션 정보로 사용자 조회 => req.user 에 저장
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
