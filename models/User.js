const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// Define a virtual property 'friendCount' to get the number of friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create the User model based on the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
