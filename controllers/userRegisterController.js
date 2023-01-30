const userDB = {
    users: require('../model/users.json'),
    setUser: function(data) {this.users = data}
}
const bcrypt = require('bcrypt')

const fsPromises = require('fs').promises
const path = require('path')

const handleNewUser = async (req,res) => {

    const {user,pwd} = req.body || {};
    if(!user || !pwd)
    return res.status(400).json({"message" : "username and password is required"})

    const isDuplicateUser = userDB.users.find(person => person.username === user)
    if(isDuplicateUser) return res.sendStatus(409);

    try {

        const hashedPassword = await bcrypt.hash(pwd,10);

        const newUser = {"username" : user,"password" : hashedPassword, "roles" : {
            "User" : 2001
        }}

        userDB.setUser([...userDB.users,newUser])

        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),
        JSON.stringify(userDB.users))

        console.log(userDB.users)

        res.status(201).json({
            "success": `New user ${user} created`
        })

    }catch(err) 
    {
        res.status(500).json({
            "message" : err.message
        })
    }

}

module.exports = {handleNewUser}