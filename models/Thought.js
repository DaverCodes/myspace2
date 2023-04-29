const { Schema } = require('mongoose');



const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter method to format timestamp on query
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// Create a virtual property `getTags` that gets the amount of tags associated with an Thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = {Thought};
