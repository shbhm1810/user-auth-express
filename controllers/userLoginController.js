const express = require("express");
const User = require('../model/User')
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const fsPromises = require("fs").promises;
const path = require("path");

const handleUserLogin = async (req, res) => {
  const { user, pwd } = req.body || {};
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password is required" });

  const foundUser = await User.findOne({username:user}).exec()

  if (!foundUser) {
    return res.sendStatus(401);
  }

  const authPassword = bcrypt.compare(pwd, foundUser.password);

  if (authPassword) {
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

   foundUser.refreshToken = refreshToken
   
   await foundUser.save()
      

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleUserLogin };
