const express = require("express");
const User = require('../model/User')


const handleLogout =  async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt

    

  const foundUser = await User.findOne({refreshToken});
  if (!foundUser) {
    res.clearCookie('jwt',{httpOnly: true})
    return res.sendStatus(204);
  }

  // Delete refresh token in DB
  foundUser.refreshToken = ''

  const result = await foundUser.save();


  res.clearCookie('jwt',{httpOnly: true})
  res.sendStatus(204);
};

module.exports = { handleLogout };
