module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    // MySql에는 users 테이블 생성
    "User",
    {
      // id가 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    // User <=> Like(좋아요), User와 Post 사이에 다대다 관계 테이블 <=> Post, 안티패턴같은데...
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    // through: 테이블 명
    // as : 대상 모델의 별칭
    // foreignKey : 상대 테이블 컬럼명
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
