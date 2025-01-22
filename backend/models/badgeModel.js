import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    enum: [
      "Team Player", 
      "Innovative", 
      "Leadership", 
      "Problem Solver", 
      "Hardworking",
      "Creative Thinker",
      "Dependable",
      "Motivator",
      "Efficient",
      "Strategic Planner",
      "Mentor",
      "Collaborator",
      "Visionary",
      "Achiever",
      "Communicator"
    ], // Added more badges
  },
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
