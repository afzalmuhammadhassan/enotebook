const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Note = require("../models/Note");

router.get("/api/note", (req, res) => {
  res.status(200).send("Noets");
});

router.get("/api/note/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const note_1 = await Note.findById(id);
    res.status(200).send(note_1);
  } catch (error) {
    res.status(401).send("Sorry, an internal error occured in server");
  }
});

router.delete(
  "/api/note/deletenote/:id",
  fetchUser,
  async (req, res) => {
    try {
      const id = req.params.id;
      let note_1 = await Note.findById(id);
      if(!note_1){
        return res.status(400).send("Not found")
      }
      const user = req.user.id;
      if(!user == note_1.user)
      {
        return res.status(401).send("Invalid token")
      }
      const updated_note = await Note.findByIdAndDelete(id,{new : true});
      res.status(200).send(updated_note);
    } catch (error) {
      res.status(500).send("Sorry, an internal error occured in serverr");
    }
  }
);

router.put(
  "/api/note/updatenote/:id",
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const id = req.params.id;
      let note_1 = await Note.findById(id);
      if(!note_1){
        return res.status(400).send("Not found")
      }
      const user = req.user.id;
      if(!user == note_1.user)
      {
        return res.status(401).send("Invalid token")
      }
      const updated_note = await Note.findByIdAndUpdate(id,{$set:{title,description,tag}},{new : true});
      res.status(200).send(updated_note);
    } catch (error) {
      res.status(500).send("Sorry, an internal error occured in serverr");
    }
  }
);

router.post(
  "/api/note/createnote",
  fetchUser,
  [
    body("title", "Title is required field").notEmpty(),
    body("description", "description shold be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(500).json(result);
      }
      const { title, description, tag } = req.body;
      console.log("after title");
      const user = req.user.id;
      const note_1 = new Note({ title, description, tag, user });
      const save_result = await note_1.save();
      res.status(200).send(save_result);
    } catch (error) {
      res.status(500).send("Sorry, an internal error occured in serverr");
    }
  }
);

module.exports = router;
