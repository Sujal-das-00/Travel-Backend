import { markCustomerRequestVisitedService, markGuideRequestVisitedService } from "../models/patch.markGuideVisited.js";
import { handelResponse } from "./postController.js";

export const markGuideRequestVisited = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return handelResponse(res, 400, "Guide Id is required ")
        }
        const visitedGuide = await markGuideRequestVisitedService(id);
        if (!visitedGuide)
            return handelResponse(res, 404, "Id not found")
        return handelResponse(res, 200, "guide visited sucessfully ", visitedGuide);

    } catch (err) {
        next(err);
    }
}

export const markCustomerRequestVisited = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return handelResponse(res, 400, "Customer Id is required ")
        }
        const visitedCustomer = await markCustomerRequestVisitedService(id);
        if (!visitedCustomer)
            return handelResponse(res, 404, "Id not found")
        return handelResponse(res, 200, "guide visited sucessfully ", visitedCustomer);

    } catch (err) {

    }
}