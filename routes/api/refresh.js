const expresss= require('express')
const {handleRefreshToken} = require('../../controllers/userRefreshTokenController')
const router = expresss.Router()

router.get('/',handleRefreshToken)

module.exports = router;