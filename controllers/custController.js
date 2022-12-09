const Customers = require("../models/customerModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const registerCustomer = (async (req,res)=>{

    const {fullName, email, contact , password} = req.body  

    if(!fullName || !email ||!contact || !password){
        res.status(400).json({ msg : "Please add all the fields"})
        
    }
    const userExists = await Customers.findOne({email})

    if(userExists){
        res.status(400).json({msg : "Customer already Exists"})

        
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    
    const user = await Customers.create({
        fullName,
        email,
        contact,
        password: hashedPassword 
    })

    if(user){
        res.status(201).json({              
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            contact: user.contact,
            password: user.password,
            token: generateToken(user.id)   
        })
    }else{
        res.status(400).json("error")
    }
})


const getCustomers = ( async ( req , res) => {
    try{
    const { _id , fullName , email , contact} = await Customers.findById(req.user.id)
    res.status(200).json(user)
    }catch (error){
        res.status(400).json({msg : "Could not fetch customer details"})
    }
})


const loginCustomer = (async (req,res) =>{

    const {email, password} = req.body

    const user = await Customers.findOne({email:email})

    if(user && (await bcrypt.compare(password, user.password)) ){

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(400).json({msg : "Invalid Credentials"})

        
    }
})

const generateToken = (id) => {                                 

    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {            
        expiresIn: "30d"
    })
}


// const changeUserPassword = ( async ( req , res) => {
//     const { password } = req.body
//     if(!password){
//         res.status(400).json("Please provide your previous password here")
//     }else{
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)
//         // console.log(id)
//     }

// })
module.exports = { registerCustomer , getCustomers , loginCustomer }
