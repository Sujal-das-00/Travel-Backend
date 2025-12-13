
import Package from "../db_models/blog_Schema.js";
import registeredGuides from "../db_models/Guide_Schema.js"
import GuideForm from "../db_models/GuideForm_Schema.js"
import Customer from "../db_models/CustomerForm_Schema.js"

export const deletePackageService = async (blogId) => {
    try {
        if (!blogId)
            throw new Error("Package ID is required");
        const deletedData = await Package.deleteOne({ blogId })
        if (deletedData.deletedCount === 0) {
            throw new Error("Package not found or already deleted");
        }
        return deletedData;
    } catch (err) {
        throw err
    }
}


export const deleteGuideService = async (guideId) => {
    try {
        if (!guideId)
            throw new Error("Guide id is required ");
        const deletedData = await registeredGuides.deleteOne({ guideId })

        if (deletedData.deletedCount === 0) {
            throw new Error("Guide not found or already deleted");
        }
        return deletedData;
    } catch (err) {
        throw err;
    }
}


export const deleteAllService = async () => {
    try {
        const [
            deleteGuideData,
            deleteCustomerData,
            deleteGuideFormData,
            deletePackageData
        ] = await Promise.all([
            registeredGuides.deleteMany({}),
            Customer.deleteMany({}),
            GuideForm.deleteMany({}),
            Package.deleteMany({})
        ]);

        return {
            guides: deleteGuideData.deletedCount,
            customers: deleteCustomerData.deletedCount,
            guideForms: deleteGuideFormData.deletedCount,
            packages: deletePackageData.deletedCount
        };

    } catch (error) {
        throw error;
    }
};
