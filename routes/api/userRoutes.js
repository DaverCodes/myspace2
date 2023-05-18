const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// Route for getting all users and creating a new user
router.route('/')
  .get(getUsers)    // Retrieves all users
  .post(createUser);    // Creates a new user

// Route for getting a single user, updating a user, and deleting a user
router.route('/:userId')
  .get(getSingleUser)    // Retrieves a single user by their ID
  .put(updateUser)    // Updates a user by their ID
  .delete(removeUser);    // Deletes a user by their ID

// Route for adding a friend to a user
router.route('/:userId/friends/:friendId')
  .post(addFriend);    // Adds a friend to a user by their IDs

// Route for removing a friend from a user
router.route('/:userId/friends/:friendId')
  .delete(removeFriend);    // Removes a friend from a user by their IDs

module.exports = router;
