const mongoose = require('mongoose');
const { Schema, Types } = mongoose;


// a reaction Id, a place to put a reaction, a username to make it easier to know who put the reaction there, and a timestamp
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  // this getter is required for the timestamp
  {
    toJSON: {
      getters: true
    }
  }
);

function dateFormat(date) {
  return Intl.DateTimeFormat('en-US').format(date);
}

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
  
// Create a virtual property `reactionCount` that gets the amount of reactions associated with a thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports =  Thought;

