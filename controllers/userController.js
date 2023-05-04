const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

const userController = {

  // Get ALL users
  getUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err,{ message: 'bad route'});
      });
  },

// Get a single user by their ID 
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'This User does not exist. Maybe you obliterated them?' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err,{ message: 'bad route'});
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err,{ message: 'bad route'});
      });
  },

  // update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'This User does not exist. Maybe you obliterated them?' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err,{ message: 'bad route'});
      });
  },

  // remove a user by their _id
  removeUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'This User does not exist. Maybe you obliterated them already?' });
          return;
        }
        res.json(dbUserData, {message: 'User obliterated.. Congrats!'});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err,{ message: 'bad route'});
      });
  },

  // add a friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Either you obliterated them or they never existed.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err,{ message: 'bad route'});
      });
  },

  // remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User or friend does not exist.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err,{ message: 'bad route'});
      });
  },
};

module.exports = userController;
