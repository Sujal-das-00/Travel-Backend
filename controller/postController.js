import { becomeGuideDataServices, createGuideServices, createNewPackageService, saveCustomerInfoServices } from "../models/postModels.js";

export const handelResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};



export const createGuide = async (req, res, next) => {
    const registeredGuideData = req.body;
    try {
        if (!registeredGuideData.guideName || !registeredGuideData.guideId || !registeredGuideData.guideEmail || !registeredGuideData.guideAddress) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details for the Guide.",
            })
        }
        const Guide = await createGuideServices(registeredGuideData);
        handelResponse(res, 200, "Guide registered successfully", Guide);
    } catch (err) {
        next(err)
    }
}

export const becomeGuideData = async (req, res, next) => {
    const { guideName, guideEmail, guideAddress } = req.body;
    const newGuideApplicationData = req.body;
    try {
        if (!guideName || !guideEmail || !guideAddress) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details for the Guide.",
            })
        }
        const newGuide = await becomeGuideDataServices(newGuideApplicationData);
        handelResponse(res, 200, "Guide data is sent sucessfully", newGuide);
    } catch (err) {
        next(err)
    }
}

export const saveCustomerInfo = async (req, res, next) => {
    const customerData = req.body;
    const { customerName, customerPhoneNo, customerEmail } = req.body;

    try {
        if (!customerName || !customerPhoneNo || !customerEmail) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details.",
            })
        }
        const newCustomer = await saveCustomerInfoServices(customerData);
        handelResponse(res,201,"Traveller data sent sucessfully.");
    } catch (err) {
        next(err)
    }
}