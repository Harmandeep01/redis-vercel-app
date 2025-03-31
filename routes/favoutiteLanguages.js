const express = require("express");
const authenticated = require("../middleware/auth.middleware");
const router = express.Router();
const FavouriteLanguage = require("../models/favouriteLanguage");

router.post("/", authenticated, async (req, res) => {
  const { _id: userId } = req.session.user;
  const { languageId } = req.body;

  if (!languageId) {
    return res.status(400).json({
      message: "LanguageID missing!",
    });
  }

  const language = await FavouriteLanguage.findOneAndUpdate(
    {
      user: userId,
    },
    {
      language: languageId,
    },
    {
      upsert: true,
      new: true,
    }
  );
  res.status(200).json({
    language
  })
});

router.get('/', async (req, res) => {
    const {_id : userId} = req.session.user;
    const  favouriteLang = await FavouriteLanguage.findOne({user : userId}).populate(
        ["language"]
    );
    res.status(200).json({
      language : favouriteLang?.language || null
    })
})

// Export the router
module.exports = router;
