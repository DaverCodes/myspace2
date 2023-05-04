const { Thought, User } = require('../models');

module.exports = {

  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(thoughts => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'no thoughts to find here. Maybe you chose the wrong ID' });
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
    Thought.create(req.body)
      .then(thought => {
        // Add thought reference to user's thoughts array
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'a thought without a mind to have it cannot be shared with the world.' });
        }
        res.json({message: "Thought has been created"});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thought => {
        if (!thought) {
          res.status(404).json({ message: 'no thoughts here' });
        }
        return User.updateMany(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } }
        );
      })
      .then(() => res.json({ message: 'some minds can be changed' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(thought => {
        if (!thought) {
          res.status(404).json({ message: 'no thoughts here' });
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
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true })

      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'that thought doesnt exist' });
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
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'that thought doesnt exist' });
    }

    res.json(thought);}
     catch (err) {
      res.status(500).json(err);
    }
}};



