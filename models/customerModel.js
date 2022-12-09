const mongoose = require("mongoose")

const custSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true , "Please mention your name"]
        },
        contact: {
            type: Number,
            required: [true , "Please mention your contact number"]
        },
        email: {
            type: String,
            required: [ true , "Please mention your email ID"]
        },
        password: {
            type: String,
            required: true
    
        }
    },

    {
        timestamps: true

    }
)

module.exports = mongoose.model("Customers" , custSchema)