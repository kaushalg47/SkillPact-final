import mongoose from 'mongoose';

// Extra validation to keep database consistent
const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim: true, // Ensure no leading or trailing spaces
        minlength: 2, // Minimum length of 2 characters
        maxlength: 100,
    },
    description:{
        type:String,
        trim: true, // Ensure no leading or trailing spaces
        maxlength: 500, // Maximum length of 500 characters
    },
    website:{
        type:String,
        trim: true, // Ensure no leading or trailing spaces
    },
    location:{
        type:String,
        trim: true, // Ensure no leading or trailing spaces
    },
    logo:{
        type:String // URL to company logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

const Company = mongoose.model('Company', companySchema);
export default Company;