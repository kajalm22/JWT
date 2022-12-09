const jwt = require("jsonwebtoken")
const customerModel = require("../models/customerModel")
const Customers = require("../models/customerModel")

const checkUserAuth = ( async ( req , res , next)  => {
    let token

    const { authorization } = req.headers

    if(authorization && authorization.startsWith("Bearer")){
        try {
            token = authorization.split(" ")[1]
            console.log("TOKEN" ,token)
            console.log("AUTHORIZATION" ,authorization)

            const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
            console.log(decoded.id)

            req.user = await Customers.findById(decoded.id).select("-password")
            next()
            
        } catch (error) {
            console.log(error)
            res.status(401).json("Unauthorized user!")
        }
    }
    if(!token){
        res.status(400).json("No token provided")
    }
})

module.exports = { checkUserAuth }