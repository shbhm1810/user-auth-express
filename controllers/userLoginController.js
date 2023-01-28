const express = require("express");
const userDB = {
  users: require("../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleUserLogin = async (req, res) => {
  const { user, pwd } = req.body || {};
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password is required" });

  const foundUser = userDB.users.find((person) => person.username === user);

  if (!foundUser) {
   return res.sendStatus(401);
  }

  const authPassword = bcrypt.compare(pwd, foundUser.password);

  if (authPassword) {
    res.status(201).json({
      success: ` user ${user} logged in`,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleUserLogin };
