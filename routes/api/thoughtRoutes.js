const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// Route for getting all thoughts and creating a new thought
router.route('/')
  .get(getThoughts)    // Retrieves all thoughts
  .post(createThought);    // Creates a new thought

// Route for getting a single thought, updating a thought, and deleting a thought
router.route('/:thoughtId')
  .get(getSingleThought)    // Retrieves a single thought by its ID
  .put(updateThought)    // Updates a thought by its ID
  .delete(deleteThought);    // Deletes a thought by its ID

// Route for adding a reaction to a thought
router.route('/:thoughtId/reactions')
  .post(addReaction);    // Adds a reaction to a thought by its ID

// Route for removing a reaction from a thought
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);    // Removes a reaction from a thought by its ID

module.exports = router;
