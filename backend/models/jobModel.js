import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  minqualification: {
    type: String
  },
  position: {
    type: String
  },
  location: {
    type: String
  },
  duration: {
    type: String
  },
  stipend: {
    type: String
  },
  createdby: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  badges: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Badge'
    }
  ],
  application: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application'
    }
  ]

},{timestamps:true});

const Job = mongoose.model('Job', jobSchema);
export default Job;