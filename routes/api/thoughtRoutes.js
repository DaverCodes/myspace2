const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

router.route('/:id/reactions')
  .post(addReaction);

router.route('/:id/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
