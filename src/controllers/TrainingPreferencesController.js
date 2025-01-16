const express = require('express');
const router = express.Router();
const { createTrainingPreferences, updateTrainingPreferences, findTrainingPreferencesByUserId } = require('../repositories/TrainingPreferencesRepository');
const TrainingPreferences = require('../models/TrainingPreferencesModel');
const TrainingPreferencesDto = require('../dtos/TrainingPreferencesDto');

// Webhook route to process incoming POST events
router.post('/training/preferences', async (req, res) => {
  try {
    const userId = req.userId; // Use the userId from authMiddleware
    const { event_type, data } = req.body;

    console.log('Webhook event received:', event_type, data);

    switch (event_type) {
      case 'create':
        // Ensure user_id is overridden with the authenticated userId
        const createUserDTO = new TrainingPreferencesDto({
          ...data,
          user_id: userId, // Force userId from authMiddleware
        });
        const createUserObject = new TrainingPreferences(createUserDTO);

        await createTrainingPreferences(createUserObject);
        console.log('TrainingPreferences created via webhook:', createUserObject);
        res.status(201).send('TrainingPreferences created via webhook');
        break;

      case 'update':
        // Ensure user_id is overridden with the authenticated userId
        const updateUserDTO = new TrainingPreferencesDto({
          ...data,
          user_id: userId, // Force userId from authMiddleware
        });
        const updateUserObject = new TrainingPreferences(updateUserDTO);

        await updateTrainingPreferences(updateUserObject);
        console.log('TrainingPreferences updated via webhook:', updateUserObject);
        res.status(200).send(`User with ID ${updateUserObject.user_id} updated via webhook`);
        break;

      case 'get':
        // Ensure the user can only retrieve their own data
        const user = await findTrainingPreferencesByUserId(userId);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).send(`User with ID ${userId} not found`);
        }
        break;

      default:
        console.warn(`Unhandled webhook event type: ${event_type}`);
        res.status(400).send(`Unhandled event type: ${event_type}`);
        break;
    }
  } catch (err) {
    console.error('Error processing webhook event:', err);
    res.status(500).send('Error processing webhook');
  }
});

module.exports = router;