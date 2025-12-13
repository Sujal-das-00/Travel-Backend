import { deleteAllService, deleteGuideService, deletePackageService } from "../models/deleteModels.js";
import { handelResponse } from "./postController.js";

export const deletePackage = async (req, res, next) => {
    try {
        const { packageId } = req.params;
        if (!packageId) {
            return handelResponse(res, 400, "Package id not found in params");
        }
        const deletedPackage = await deletePackageService(packageId);
        if (!deletedPackage) {
            return handelResponse(
                res,
                400,
                "Package can't be deleted db returns = 0"
            );
        }
        handelResponse(res, 200, "Package deleted Sucessfully", deletedPackage);
    } catch (err) {
        next(err);
    }
};




export const deleteGuide = async (req, res, next) => {
    try {
        const { guideId } = req.params;
        if (!guideId) {
            return handelResponse(res, 400, "Guide Id  not found in params");
        }
        const deletedPackage = await deleteGuideService(guideId);
        if (!deletedPackage) {
            return handelResponse(res, 400, "Guide can't be deleted db returns = 0");
        }
        handelResponse(res, 200, "Guide deleted Sucessfully", deletedPackage);
    } catch (err) {
        next(err);
     }
};




export const deleteAll = async(req, res, next)=>{
    const password = req.params.password
    try {
        if(password!=="deleteAllProdData"){
            return handelResponse(res, 400, "Data can't be deleted wrong password");
        }
        const deletedPackage = await deleteAllService();
        if (!deletedPackage) {
            return handelResponse(res, 400, "Data can't be deleted db returns null");
        }
        handelResponse(res, 200, "All data deleted from the database", deletedPackage);
    } catch (err) {
        next(err)
    }
}
