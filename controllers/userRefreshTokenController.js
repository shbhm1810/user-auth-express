const express = require("express");
const userDB = {
  users: require("../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};


const jwt = require("jsonwebtoken");
require("dotenv").config();


const handleRefreshToken =  (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt

console.log(refreshToken)
console.log(userDB.users[0].refreshToken)

  const foundUser = userDB.users.find((person) => person.refreshToken === cookies.jwt);

  if (!foundUser) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded) => {
    if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
    
    const accessToken = jwt.sign(
        { username: decoded.username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );
    
      res.json({accessToken})

  })

};

module.exports = { handleRefreshToken };
