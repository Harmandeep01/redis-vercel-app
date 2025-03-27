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

  const languageSaved = await FavouriteLanguage.findOneAndUpdate(
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
    languageSaved
  })
});

router.get('/', async (req, res) => {
    const {_id : userId} = req.session.user;
    const favouriteLanguage = await FavouriteLanguage.findOne({user : userId}).populate(
        "language"
    );
    return res.status(200).json({
    favouriteLanguage
    })
})

// Export the router
module.exports = router;
