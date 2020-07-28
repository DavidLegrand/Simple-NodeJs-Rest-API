const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/pages')

router.get('/', PagesController.getAllPages);
router.get('/:pageId', PagesController.getPage);

module.exports = router;