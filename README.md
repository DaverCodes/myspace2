# MySpace2

This project is an API for a social network web application that allows users to share their thoughts, react to other peoples thoughts, and create a friend list. The API is built using Express.js for routing, a MongoDB database, and the Mongoose ODM. 

## Installation

To run this project on your local machine, you need to have Node.js and MongoDB installed on your computer. Then, follow these steps:

1. Clone this repository to your local machine
2. Open a terminal in the project directory
3. Install the required dependencies using the following command:

```bash
npm install
```

4. Start the application by running:

```bash
npm start
```

This will start the server and sync the Mongoose models to the MongoDB database.

## Usage

After starting the application, you can use a tool like [Insomnia](https://insomnia.rest/) to test the API routes. The following routes are available:

### Users

- GET /api/users - Get all users
- GET /api/users/:id - Get a single user by ID
- POST /api/users - Create a new user
- PUT /api/users/:id - Update a user by ID
- DELETE /api/users/:id - Delete a user by ID

### Thoughts

- GET /api/thoughts - Get all thoughts
- GET /api/thoughts/:id - Get a single thought by ID
- POST /api/thoughts - Create a new thought
- PUT /api/thoughts/:id - Update a thought by ID
- DELETE /api/thoughts/:id - Delete a thought by ID

### Reactions

- POST /api/thoughts/:thoughtId/reactions - Create a new reaction for a thought
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Delete a reaction for a thought

### Friends

- POST /api/users/:userId/friends/:friendId - Add a friend to a user's friend list
- DELETE /api/users/:userId/friends/:friendId - Remove a friend from a user's friend list

### Timestamps

Timestamps for thoughts and reactions are handled by the Mongoose schema.

## Walkthrough Video

Here is a [link to the walkthrough video](https://drive.google.com/file/d/1tQRXxEoF8jUtDLD87TwDJB8ok0A0gLUb/view?usp=sharing) demonstrating the functionality of the App.

## Conclusion

MySpace2 is a successful project that demonstrates how to build and structure a social network API using Express.js and MongoDB. 

# Contact Me!
Questions? Comments? Concerns? You can get a hold of me through my github! https://github.com/DaverCodes