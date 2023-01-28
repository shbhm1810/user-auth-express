const express = require("express");
const userDB = {
  users: require("../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};


const fsPromises = require('fs').promises
const path = require('path')

const handleLogout =  async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt

    

  const foundUser = userDB.users.find((person) => person.refreshToken === refreshToken);
console.log(foundUser)
  if (!foundUser) {
    res.clearCookie('jwt',{httpOnly: true})
    return res.sendStatus(204);
  }

  // Delete refresh token in DB
  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken:'' };
  userDB.setUser([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );
  res.clearCookie('jwt',{httpOnly: true})
};

module.exports = { handleLogout };
