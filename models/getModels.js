import Package from "../db_models/blog_Schema.js";
import registeredGuides from "../db_models/Guide_Schema.js"




export const getAllPackageService = async () => {
    try {
        const allPackages = await Package.find()
.select("packageName packageCategory displayText imageUrl blogId"); 
console.log(allPackages);

        return allPackages;
    } catch (error) {
        throw new Error("Failed to fetch packages: " + error.message);
    }
};



export const getPackageByIdService = async (blogId)=>{
    try {
        const packageDetails = await Package.findOne({blogId:blogId})
        console.log(packageDetails)
        return packageDetails
    } catch (error) {
        throw new Error("Failed to fetch the blog"+error.message)
    }
}




export const getAllGuideServices = async ()=>{
    try {
        const allGuide = await registeredGuides.find()
        return allGuide;
    } catch (error) {
        throw new Error("failed to fetch the guide details"+error.message);
    }
}



export const getGuideByIdService = async (guideId)=>{
    try {
        const allGuide = await registeredGuides.findOne({guideId:guideId})
        return allGuide;
    } catch (error) {
        throw new Error("failed too fetch the guide with id"+error.message);
        
    }
}

