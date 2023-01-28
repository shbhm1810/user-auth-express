const expresss= require('express')
const {handleNewUser} = require('../../controllers/userRegisterController')
const router = expresss.Router()

router.post('/',handleNewUser)

module.exports = router;