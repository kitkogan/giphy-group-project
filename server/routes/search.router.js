const express = require('express');
const router = express.Router();
const axios = require('axios');


//get req to search giphy
router.get('/', (req, res) => {
    console.log('REQBOD', req.params);
    
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${querySearch}&limit=5`)
    .then((response) => {
        res.send(response.data);
    }).catch((err) => {
        console.log(err);
    })
})

router.post('/', (req, res) => {
    console.log('req.body', req.body);
    querySearch = req.body;
    console.log('querysearch', querySearch)
})

module.exports = router;