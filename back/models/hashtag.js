module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8mb4", // 이모티콘 저장을 위해???
      collate: "utf8mb4_general_ci",
    }
  );
  Hashtag.associate = (db) => {};
  return Hashtag;
};
