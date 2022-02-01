const { user } = require("../models");
const crypto = require("crypto");
const db = require("../models");

module.exports = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { nickname, password } = req.body;
    const salt = crypto.randomBytes(64).toString("base64");
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 100, 64, "sha512")
      .toString("base64");
    const userData = await user.create(
      {
        nickname,
        password: hashedPassword,
      },
      { transaction: t }
    );
    await user.create(
      {
        nickname: "random",
        password: "1234",
      },
      { transaction: t }
    );
    await t.commit();
    res.json({ userData });
  } catch (err) {
    await t.rollback();
    console.log(err);
  }
};
