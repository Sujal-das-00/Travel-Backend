import Package from "../db_models/blog_Schema.js";
import registeredGuides from "../db_models/Guide_Schema.js"
import GuideForm from "../db_models/GuideForm_Schema.js"
import Customer from "../db_models/CustomerForm_Schema.js"

export const createNewPackageService = async (packageData) => {
  try {
    if (!packageData || Object.keys(packageData).length === 0) {
      throw new Error("Package data is required");
    }
    if (packageData.packageName) {
      const exists = await Package.findOne({
        packageName: packageData.packageName,
      });
      if (exists) {
        throw new Error("Package with this name already exists");
      }
    }
    
    const pkg = new Package(packageData);
    const saved = await pkg.save();
    console.log(saved)
    return saved;
  } catch (error) {
    throw error;
  }
};



export const createGuideServices = async (registeredGuideData) => {
    try {
        if (!registeredGuideData || Object.keys(registeredGuideData).length === 0) {
            throw new Error("Guide data is required");
        }
        const guide = new registeredGuides(registeredGuideData)
        const registeredGuide = await guide.save();
        return registeredGuide;

    } catch (error) {
        throw error;
    }
};




export const becomeGuideDataServices =  async (becomeGuideDataServices)=>{
    try {
         if (!becomeGuideDataServices || Object.keys(becomeGuideDataServices).length === 0) {
            throw new Error("Guide data is required please fill the fields");
        }
        const GuideApplication = new GuideForm(becomeGuideDataServices);
        const newGuideApplication = await GuideApplication.save();
        return newGuideApplication;
    } catch (error) {
        throw error;
    }
}





export const saveCustomerInfoServices = async (customerData)=>{
    try {
        if (!customerData || Object.keys(customerData).length === 0) {
            throw new Error("Customer data is required.");
        }
        const Traveller = new Customer(customerData);
        const newTraveller = await Traveller.save();
        return newTraveller;
    } catch (error) {
        throw error;
    }
}