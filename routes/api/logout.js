const expresss= require('express')
const {handleLogout} = require('../../controllers/userLogoutController')
const router = expresss.Router()

router.get('/',handleLogout)

module.exports = router;