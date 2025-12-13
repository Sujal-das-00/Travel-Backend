import Package from "../db_models/blog_Schema.js";
import { removeDisallowedFields } from "../utils/disallowedFields.js";
import registeredGuides from "../db_models/Guide_Schema.js"




export const modifyPackageService = async (updateData,packageId) => {
    try {
        console.log(updateData)
        if (!packageId) {
            throw new Error("Package ID is required");
        }
        const disallowedFields = [
            "_id",
            "blogId",
            "createdAt",
            "updatedAt"
        ];

        const updateFields = removeDisallowedFields(updateData, disallowedFields);

        if (Object.keys(updateFields).length === 0) {
            throw new Error("No valid fields provided for update");
        }

        const updatedPackage = await Package.findOneAndUpdate(
            {blogId:packageId},
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedPackage) {
            throw new Error("Package not found");
        }

        return updatedPackage;

    } catch (error) {
        throw error;
    }
};



export const modifyGuideServce = async (guideId,updateData)=>{
    try {
        if(!updateData){
            throw new Error("data is required")
        }
        const disallowedFields = ["_id"];

        const updateFields = removeDisallowedFields(updateData, disallowedFields);

        if (Object.keys(updateFields).length === 0) {
            throw new Error("No valid fields provided for update");
        }

        const updatedGuide = await registeredGuides.findOneAndUpdate(
            {guideId:guideId},
            { $set: updateFields },
            { new: true, runValidators: true }
        );
         if (!updatedGuide) {
            throw new Error("Guide not found");
        }

        return updatedGuide;

    } catch (error) {
        throw error
    }
}