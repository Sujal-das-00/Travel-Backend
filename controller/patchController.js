import { handelResponse } from "./postController.js";
import { modifyPackageService, modifyGuideServce } from "../models/patchModels.js";
export const modifyPackage = async (req, res, next) => {
    try {
        const { packageId } = req.params;

        if (!packageId) {
            return handelResponse(res, 400, "Package ID is required");
        }
        let updateData = { ...req.body };
        if (typeof updateData.sections === 'string') {
            try {
                updateData.sections = JSON.parse(updateData.sections);
            } catch (error) {
                return handelResponse(res, 400, "Invalid JSON format in sections");
            }
        }
        if (req.files) {
            updateData.files = req.files;
        }
        const updatedPackage = await modifyPackageService(updateData, packageId);
        if (!updatedPackage) {
            return handelResponse(res, 404, "Package not found");
        }
        handelResponse(res, 200, "Package Modified", updatedPackage);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const modifyGuide = async (req, res, next) => {
    try {
        const guideId = req.params.guideId;
        const updatedata = req.body;
        console.log(guideId)
        if (!guideId) {
            return handelResponse(res, 400, "please enter Guide Id is required ")
        }
        const updatedGuide = await modifyGuideServce(guideId, updatedata);
        if (!updatedGuide) {
            return handelResponse(res, 400, "Guide not found");
        }
        handelResponse(res, 200, "Guide Updated Sucessfuly", updatedGuide)
    } catch (err) {
        next(err)
    }
}

