const { Thought } = require('../models');
const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No User with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove(
        { _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and Thoughts Deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

    async addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
    
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No User found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'No User with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    }