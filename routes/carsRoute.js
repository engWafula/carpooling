const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

router.get("/getallcars/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId,"AM THE USERId")
    const cars = await Car.find({ owner: userId });
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallcarstoBook/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cars = await Car.find({ owner: { $ne: userId },status:"active" });
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  try {
    
    const newcar = new Car(req.body);
    await newcar.save();
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;
    car.status = req.body.status

    await car.save();

    res.send("Car details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
