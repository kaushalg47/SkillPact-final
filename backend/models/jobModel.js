import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job Title is required"],
    trim: true,
    minlength: [1, "Job title must be at least 1 character long"],
    maxlength: [100, "Job title must be at most 100 character long"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  minqualification: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  duration: {
    type: String,
    trim: true,
  },
  stipend: {
    type: Number, // stipend should be a +ve number
    trim: true,
    min: 0,
  },
  createdby: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true, // Required creator
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  badges: { // made the default array as empty error
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Badge'
      }
    ],
    default: [],
  },
  applications: { // made the default array as empty error
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
      },
    ],
    default: [],
  }

},{timestamps:true});

const Job = mongoose.model('Job', jobSchema);
export default Job;