const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({

    name : {type : String , required : true} ,
    owner : {type : mongoose.Schema.Types.ObjectID , ref:'users'},
    image : {type : String , required : true} , 
    capacity : {type : Number , required : true},
    fuelType : {type : String , required : true} , 
    bookedTimeSlots : [
        {
            from : {type : String , required : true},
            to : {type : String , required : true}
        }
    ] , 

    rentPerHour : {type : Number , required : true}


}, {timestamps : true}

)
const carModel = mongoose.model('cars' , carSchema)
module.exports = carModel