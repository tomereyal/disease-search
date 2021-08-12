const express = require("express");
const router = express.Router();
const { Disease, DiseaseSynonym } = require("../models/Disease");

router.get("/:id", async (req, res) => {
  const { id } = req.params.id;
  try {
    const response = await Disease.findById(id);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
  }
});
router.get("/", async (req, res) => {
  try {
    const response = await Disease.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .exec();
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
  }
});
router.get("/search/:queryString", async (req, res) => {
  const queryString = req.params.queryString;
  try {
    const response = await Disease.aggregate([
      {
        $search: {
          text: {
            path: "name",
            query: queryString,
            synonyms: "diseasesynonyms",
          },
        },
      },
    ]);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
  }
});
router.post("/searchByMarks", async (req, res) => {
  const { queryArr } = req.body;
  console.log(`queryArr`, queryArr);
  try {
    const filter = { marks: { $all: queryArr } }; //checkout $in vs $all
    const response = await Disease.find(filter);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  //   const { name, info, underlyingDisorder, marks } = req.body;
  try {
    const response = await Disease.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const newDisease = new Disease({ name });
  const response = await Disease.create(newDisease);
  res.send(response);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Disease.findByIdAndDelete(id);
    res.send("deleted disease from collection");
  } catch (error) {
    console.log(`error`, error);
  }
});

//===============================SYNONYMS COLLECTION OF DISEASE===================================

router.post("/synonym", async (req, res) => {
  const { name, synonym } = req.body;
  const newSynonym = new DiseaseSynonym({ synonyms: [name, synonym] });
  const response = await DiseaseSynonym.create(newSynonym);
  res.send(response);
});
router.put("/addWordToSynonym", async (req, res) => {
  console.log(`req.body`, req.body);
  const { querySynonym, newSynonym } = req.body;
  const filter = { synonyms: querySynonym };
  const update = { $push: { synonyms: newSynonym } };
  try {
    const response = await DiseaseSynonym.findOneAndUpdate(filter, update, {
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
    const response = await DiseaseSynonym.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.send(response);
  } catch (error) {}

  //if synonym.synonyms is an empty array, delete the synonym..
});

module.exports = router;
