import mongoose from "mongoose";


const guideSchema = new mongoose.Schema({
  guideName: {
    type: String,
    required: true,
    trim: true,
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
  guideAddress:{
    type:String,
    required:true,
  },
  guideEmail: {
    type: String,
    required: true,
    trim: true,
  },
  guideExperience: {
    type: Number,
    required: true,
  },
  IsVisited:{
    type:Boolean,
    required:true,
    default:false
  },

},{ timestamps: true });
export default mongoose.model("GuideForm",guideSchema,"Guide_Form")