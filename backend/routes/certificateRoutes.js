const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

router.post('/request', certificateController.requestCertificate);
router.get('/all', certificateController.getAllCertificates);
router.put('/status/:id', certificateController.updateStatus);

module.exports = router;