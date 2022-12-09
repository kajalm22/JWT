const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        Customers: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Customers"
        },
        orderName: {
            type: String,
            required: [true , "Please place an order"]
        }, 
        quantity: {
            type: Number,
            required: [true , "Please mention the quantity of  your order"]
        },
        price: {
            type: Number,
            required: true
        }
    },

    {
        timestamps: true
    }
)


module.exports = mongoose.model("Orders" , orderSchema)