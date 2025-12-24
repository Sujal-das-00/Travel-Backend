import GuideForm from "../db_models/GuideForm_Schema.js";
import Customer from "../db_models/CustomerForm_Schema.js";
export const markGuideRequestVisitedService = async (id) => {
    try {
        return await GuideForm.findOneAndUpdate(
            { _id: id, IsVisited: false },
            { IsVisited: true },
            { new: true }
        );
    } catch (err) {
        throw err;
    }
};

export const markCustomerRequestVisitedService = async (id)=>{
    try {
        return await Customer.findOneAndUpdate(
            { _id: id, IsVisited: false },
            { IsVisited: true },
            { new: true }
        );
    } catch (err) {
        throw err;
    }
}