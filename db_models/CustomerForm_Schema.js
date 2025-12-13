import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhoneNo: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    customerEmail: {
        type: String,
        required: true,
        trim: true
    },
    travelDestination: {
        type: String,
        required: true,
        trim: true
    },
    travelDate: {
        type: Date,
        required: true
    },
    totalNoOfPersons: {
        type: Number,
        required: true,
        min: 1
    }
});
export default mongoose.model("Customer",customerSchema,"Customer");