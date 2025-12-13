import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  guideName: {
    type: String,
    required: true,
    trim: true,
  },
  guideId:{
    type:String,
    require:true,
    trim:true
  },
  guidePhoneNo: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  guidePhoneNo2: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  guideEmail: {
    type: String,
    required: true,
    trim: true,
  },
  guideAddress:{
    type:String,
    required:true,
  },
  guideExperience: {
    type: Number,
    required: true,
  },
  engage: {
    type: Boolean,
    default: false,   
  },
});
export default mongoose.model("registeredGuides",guideSchema,"registeredGuides")



