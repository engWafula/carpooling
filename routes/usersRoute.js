const express = require("express");
const router = express.Router();
const User = require("../models/userModel")


router.post("/login", async(req, res) => {

      const {username , password} = req.body

      try {
          const user = await User.findOne({username , password})
          if(user) {
              res.send(user)
          }
          else{
              return res.status(400).json(error);
          }
      } catch (error) {
        return res.status(400).json(error);
      }
  
});

router.post("/register", async(req, res) => {
    try {
        const newuser = new User(req.body)
        await newuser.save()
        res.send('User registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }

});
router.patch("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const userData = req.body;
    try {
        // Update the user document with the provided userId
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            userData,
            { new: true, runValidators: true } // Options to return the updated document and run validators
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser); // Send the updated user document in the response
    } catch (error) {
        return res.status(400).json(error);
    }
});


module.exports = router

