import crypto from "crypto";
import fs from "fs";
import { uploadToCloudinary } from "../utils/cloudnary.service.js";
import { createNewPackageService } from "../models/postModels.js";
import { handelResponse } from "../controller/postController.js";

export const createNewPackage = async (req, res, next) => {
    try {
        let { packageName, packageCategory, displayText, sections } = req.body;

        if (!packageName || !packageCategory || !sections) {
            return res.status(400).json({
                success: false,
                message: "packageName, packageCategory and sections are required",
            });
        }

        // Parse sections
        const parsedSections = JSON.parse(sections);

        // Convert files array to object for easier access
        const filesMap = {};
        if (req.files) {
            req.files.forEach(file => {
                filesMap[file.fieldname] = file;
            });
        }

        // MAIN IMAGE
        let mainImageUrl = null;
        let mainImageId = null;

        if (filesMap.mainImage) {
            const file = filesMap.mainImage;

            const upload = await uploadToCloudinary(file.path, "blogs/main");

            mainImageUrl = upload.secure_url;
            mainImageId = upload.public_id;

            fs.unlinkSync(file.path);
        }

        // SECTION IMAGES
        const finalSections = [];

        for (let i = 0; i < parsedSections.length; i++) {
            const section = parsedSections[i];
            let imageUrl = null;
            let image_id = null;

            if (filesMap[`sectionImage_${i}`]) {
                const file = filesMap[`sectionImage_${i}`];
                const upload = await uploadToCloudinary(file.path, "blogs/sections");

                imageUrl = upload.secure_url;
                image_id = upload.public_id;

                fs.unlinkSync(file.path);
            }

            finalSections.push({
                ...section,
                imageUrl,
                image_id,
            });
        }

        // Create blogId
        const blogId = crypto.randomBytes(8).toString("hex");
        
        const packageData = {
            packageName,
            packageCategory,
            displayText,
            blogId,
            imageUrl: mainImageUrl,
            image_id: mainImageId, // Don't forget to add this!
            sections: finalSections,
        };

        const savedPackage = await createNewPackageService(packageData);

        handelResponse(res, 200, "Package created successfully", savedPackage);
    } catch (err) {
        next(err);
    }
};