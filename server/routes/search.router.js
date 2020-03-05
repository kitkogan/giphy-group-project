const express = require('express');
const router = express.Router();
const axios = require('axios');

//get req to search giphy
router.get('/:string', (req, res) => {
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.params.string}&limit=5`)
    .then((response) => {
        console.log('this is the api response', response)
        res.send(response.data);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;