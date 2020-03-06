const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "category"`;
  // console.log()
  pool.query(queryText)
  .then((result) => {res.send(result.rows);
  }).catch((err) =>{
    console.log('Error in getting your query', err);
    res.sendStatus(200);
  }); 
});

// add a new favorite 
router.post('/', (req, res) => {
  let queryText = `INSERT INTO category ("url") VALUES ($1)`;
  console.log('req.body in favorite post', req.body);
  pool.query(queryText, [req.body])
  .then(() => { res.sendStatus(200); })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
})

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
