const express = require("express")
const {   registerCustomer, getCustomers, loginCustomer } = require("../controllers/custController")
const { checkUserAuth } = require("../middleware/authMiddleware")
const router = express.Router()


// router.route("/changePassword").post()

router.route("/register").post(registerCustomer)

router.route("/get").get( checkUserAuth, getCustomers)

router.route("/login").post(loginCustomer)



module.exports = router