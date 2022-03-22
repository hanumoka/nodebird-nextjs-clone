module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8mb4", // 이모티콘 저장을 위해???
      collate: "utf8mb4_general_ci",
    }
  );
  Comment.associate = (db) => {};
  return Comment;
};
