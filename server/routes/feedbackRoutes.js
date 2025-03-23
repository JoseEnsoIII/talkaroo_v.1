const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Submit feedback
router.post('/', feedbackController.submitFeedback);

// Get all feedback
router.get('/', feedbackController.getFeedback);

module.exports = router;