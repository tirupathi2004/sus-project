const express = require('express');
const router = express.Router();
const bepoController = require('../controllers/bepoController');
router.post('/recommend', bepoController.recommend);
module.exports = router;