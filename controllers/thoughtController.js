const {Thought , Reaction}  = require('../models');
const User = require('../models/User');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove(
        { _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    async createReaction(req, res) {   
        try {
          const reaction = await Thought.findOneAndUpdate( 
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true });
          res.json(reaction)
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async removeReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No Thought found with that ID :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            res.status(404).json({ message: 'No Thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    }