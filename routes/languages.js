const express = require('express');
const router = express.Router();
const path = require('path');
const root = path.join(__dirname, '../public');
const Language = require('../models/Language');
const authenticated = require('../middleware/auth.middleware');

router.get('/', authenticated, async (_, res) => {
    const languages = await Language.find({});
    if(authenticated){
        res.status(200).json({
            languages
        })
    }
})

module.exports = router;
