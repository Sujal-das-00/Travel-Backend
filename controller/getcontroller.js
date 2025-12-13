import { getAllGuideServices, getAllPackageService, getGuideByIdService, getPackageByIdService } from "../models/getModels.js";
import { handelResponse } from "./postController.js";


export const getAllPackage = async(req,res,next)=>{
    try {
        const Allpackage = await getAllPackageService()
        if(!Allpackage){
           return handelResponse(res,404,"Error in fetching the package details")
        }
        handelResponse(res,201,"All package fetched successfully",Allpackage);
    } catch (err) {
        next(err);
    }
}

export const getPackageById = async(req,res,next)=>{
    try {
        const packageData = await getPackageByIdService(req.params.packageId)
         if (!packageData) {
            return res.status(404).json({
            success: false,
            message: "Package not found"
      });
    }
        handelResponse(res,200,"Package Info fetched sucessfully",packageData)
        
    } catch (err) {
        next(err)
    }
}
export const getAllGuide = async (req,res,next)=>{
    try {
        const allGuide = await getAllGuideServices()
        if(!allGuide){
            return res.status(404).json({
            success: false,
            message: "Package not found"
            })
        }
        handelResponse(res,200,"All guide data fetched successfully ",allGuide)
    } catch (err) {
        next(err)
    }
}

export const getGuideById = async (req,res,next)=>{
    try{
        const Guide = await getGuideByIdService(req.params.guideId)
         if (!Guide) {
            return res.status(404).json({
            success: false,
            message: "Guide not found"
      });
    }
        handelResponse(res,200,"Guide Info fetched sucessfully",Guide)
    }catch(err){
        next(err)
    }
}