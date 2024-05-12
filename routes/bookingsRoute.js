const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const {sendEmails} = require("../service/emails");
const stripe = require("stripe")(
  "sk_test_51NFtVGSAZAXtdYSkBaDemNewFODLyLvAZ4Cp8oCxI2m1ecvfG2C1cNpm1B6k6lwIQfD2f9Hxt53gG2hNGExnFVK100raNTKWo4"
);

router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });

    // const payment = await stripe.charges.create(
    //   {
    //     amount: req.body.totalAmount * 100,
    //     currency: "inr",
    //     customer: customer.id,
    //     receipt_email: token.email
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
        
    //   }
    // );

    // if (payment) {
      req.body.transactionId = token.id;//payment.source.id;
      const newbooking = new Booking(req.body);
      const data  = (await (await newbooking.save()).populate("user"))
      const car = await Car.findOne({ _id: req.body.car }).populate("owner")
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      console.log(data.car,"am the booking")
      await sendEmails(data.user.username,"Booking successfull","Carpooling booking")
      // await sendEmails(data.car.username,"Booking successfull","Carpooling booking")

      res.send("Your booking is successfull");
    // } else {
    //   return res.status(400).json(error);
    // }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


router.get("/getallbookings/:userId", async(req, res) => {
  const userId = req.params.userId;

  try {
      const bookings = await Booking.find({ user: userId }).populate('car');
      res.send(bookings);
  } catch (error) {
      return res.status(400).json(error);
  }
});

router.get("/getallbookingrequests", async(req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('car')
      .populate('user'); // Populate the user field as well
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});


module.exports = router;
