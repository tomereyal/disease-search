const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
const { Mark, MarkSynonym } = require("../models/Mark");

router.get("/:queryString", async (req, res) => {
  const queryString = req.params.queryString;

  const response = await Mark.aggregate([
    {
      $search: {
        text: {
          path: "name",
          query: queryString,
          synonyms: "marksynonyms",
        },
      },
    },
  ]);
  res.send(response);
});

router.post("/create", async (req, res) => {
  const { name, location } = req.body;
  const newMark = new Mark({ name, location });
  const response = await Mark.create(newMark);
  console.log(`response`, response);
  res.send(response);
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Mark.findByIdAndDelete(id);
    res.send("deleted mark from collection");
  } catch (error) {
    console.log(`error`, error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  //   const { name, location } = req.body;
  try {
    const response = await Mark.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
  }
});

//===============================SYNONYMS COLLECTION OF MARKS===================================
router.post("/synonym", async (req, res) => {
  const { name, synonym } = req.body;
  const newSynonym = new MarkSynonym({ synonyms: [name, synonym] });
  const response = await MarkSynonym.create(newSynonym);
  console.log(`response`, response);
  res.send(response);
});
router.put("/addWordToSynonym", async (req, res) => {
  console.log(`req.body`, req.body);
  const { querySynonym, newSynonym } = req.body;
  const filter = { synonyms: querySynonym };
  const update = { $push: { synonyms: newSynonym } };
  try {
    const response = await MarkSynonym.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
  }
});
router.put("/removeWordFromSynonym", async (req, res) => {
  console.log(`req.body`, req.body);
  const { querySynonym } = req.body;
  const filter = { synonyms: querySynonym };
  const update = { $pull: { synonyms: querySynonym } };
  try {
    const response = await MarkSynonym.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.send(response);
  } catch (error) {}

  //if synonym.synonyms is an empty array, delete the synonym..
});

module.exports = router;
