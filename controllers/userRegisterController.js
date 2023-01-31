const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body || {};
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password is required" });

  const isDuplicateUser = await User.findOne({ username: user }).exec();
  if (isDuplicateUser) return res.sendStatus(409);

  try {
    const hashedPassword = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: user,
      password: hashedPassword,
    });
console.log(result)
    res.status(201).json({
      success: `New user ${user} created`,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { handleNewUser };
