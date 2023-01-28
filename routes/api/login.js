const expresss= require('express')
const {handleUserLogin} = require('../../controllers/userLoginController')
const router = expresss.Router()

router.post('/',handleUserLogin)

module.exports = router;