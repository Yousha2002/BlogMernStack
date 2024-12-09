const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

// CREATE
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updateComment = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Added runValidators to validate updates
    );
    res.status(200).json(updateComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json("Comment has been delete");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST COMMENTS
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
