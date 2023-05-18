const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    // Retrieve all thoughts from the database
    Thought.find()
      .then(thoughts => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single thought
  getSingleThought(req, res) {
    // Retrieve a single thought by its ID
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'No thoughts found. Please check the ID.' });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a thought
  createThought(req, res) {
    // Create a new thought based on the request body
    Thought.create(req.body)
      .then(thought => {
        // Add the thought's reference to the user's thoughts array
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'A thought cannot be shared without a user.' });
        }
        res.json({ message: "Thought has been created" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a thought
  deleteThought(req, res) {
    // Delete a thought by its ID and remove its reference from the user's thoughts array
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thought => {
        if (!thought) {
          res.status(404).json({ message: 'No thoughts found.' });
        }
        return User.updateMany(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } }
        );
      })
      .then(() => res.json({ message: 'Thought has been deleted.' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a thought
  updateThought(req, res) {
    // Update a thought by its ID with the provided data in the request body
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(thought => {
        if (!thought) {
          res.status(404).json({ message: 'No thoughts found.' });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    // Add a reaction to a thought by its ID
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'The thought does not exist.' });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      // Remove a reaction from a thought by its ID and the reaction's ID
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'The thought does not exist.' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
