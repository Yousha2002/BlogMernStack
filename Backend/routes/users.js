const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Comment");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");
// Update user
router.put("/:id", verifyToken, async (req, res) => {
  try {
    // Check if password is being updated
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Correcting req.param.id to req.params.id
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // Corrected here
      { $set: req.body },
      { new: true } // This ensures the returned document is the updated one
    );

    res.status(200).json(updatedUser); // Send updated user as the response
  } catch (err) {
    res.status(500).json(err); // Corrected status code to 500 for errors
  }
});

// Delete User Post Comment
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("user has been delete");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
