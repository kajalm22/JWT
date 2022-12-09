const express = require ("express")
const Orders = require("../models/orderModel")
const Customers = require("../models/customerModel")



const createOrder = (async (req , res) => {
    try { 
    const  { orderName , quantity , price } = req.body
    const order = await Orders.create({
        orderName,
        quantity,
        price,
        user: req.user.id
    })

    if(order){
        console.log(order)
        res.status(201).json( {message: "Order placed!"})
    }

    } catch(error){
        res.status(500).json("Something went wrong")
}
})

const getOrders = (async ( req , res) => {
    try {
        const order = await Orders.find({ user: req.user.id})
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message : "Something went wrong while fetching your orders"})
        
    }
})
 




module.exports = { createOrder  , getOrders}