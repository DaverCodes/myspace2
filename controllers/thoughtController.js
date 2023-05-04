const { Thought, User } = require('../models');

module.exports = {

  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ message: 'bad route'});
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'no thoughts to find here. Maybe you chose the wrong ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'bad route'});
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // Add thought reference to user's thoughts array
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'a thought without a mind to have it cannot be shared with the world.' });
      }

      res.json({message: "Thought has been created"});
    } catch (err) {
      console.log(err);
     res.status(500).json({ message: 'bad route'});
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'no thoughts here' });
      }

      await User.updateMany(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json({ message: 'some minds can be changed' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'no thoughts here' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'bad route'});
    }
  },

  // Add a reaction to a thought
async addReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'that thought doesnt exist' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'bad route'});
  }},

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

    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'bad route'});
  }
}};



