const express = require("express")
const { createOrder, getOrders } = require("../controllers/orderController")
const { checkUserAuth } = require("../middleware/authMiddleware")
const router = express.Router()


router.route("/create").post(checkUserAuth , createOrder )

router.route("/get").get(checkUserAuth ,getOrders )


module.exports = router