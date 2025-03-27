const { default: mongoose } = require('mongoose');
const dbConnect = require('./dbConnect');


const Language = require('./models/Language');
const fs = require('fs');
const path = require('path');

(async () => {
    const connection = await dbConnect();
    const language = await Language.find({});
    if(language.length !== 0){
        console.log('Languages already added 😔')
       mongoose.disconnect();
        return;
    }
    const parsedLanguages = JSON.parse(
        fs.readFileSync(
            path.resolve(__dirname, './data/languages-from-github.json'),
            'utf-8'
        )
    )
    const languagesToAdd = Object.keys(parsedLanguages).map(key => {
        const name = key;
        const iconKey = parsedLanguages[key];
        const iconUrl = `https://github.com/abranhe/programming-languages-logos/blob/master/src/${iconKey}/${iconKey}.svg`
        return {
            name,
            iconUrl
        }
    })

    try{
        await Language.insertMany(languagesToAdd);
        console.log("🚀 Languages successfully added to MONGOdb");
    }catch(err){
        console.error('Error', e.message)
    }

    console.log({
        parsedLanguages
    })

    mongoose.disconnect();
})();
