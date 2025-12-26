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

        // ✅ SAFE parsing
        let parsedSections;
        if (typeof sections === "string") {
            parsedSections = JSON.parse(sections);
        } else {
            parsedSections = sections;
        }

        // Convert files array to map
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
            const upload = await uploadToCloudinary(
                filesMap.mainImage.path,
                "blogs/main"
            );

            mainImageUrl = upload.secure_url;
            mainImageId = upload.public_id;

            fs.unlinkSync(filesMap.mainImage.path);
        }

        // SECTION IMAGES
        const finalSections = [];

        for (let i = 0; i < parsedSections.length; i++) {
            const section = parsedSections[i];

            let imageUrl = null;
            let image_id = null;

            if (filesMap[`sectionImage_${i}`]) {
                const upload = await uploadToCloudinary(
                    filesMap[`sectionImage_${i}`].path,
                    "blogs/sections"
                );

                imageUrl = upload.secure_url;
                image_id = upload.public_id;

                fs.unlinkSync(filesMap[`sectionImage_${i}`].path);
            }

            finalSections.push({
                ...section,
                imageUrl,
                image_id,
            });
        }

        const blogId = crypto.randomBytes(8).toString("hex");

        const packageData = {
            packageName,
            packageCategory,
            displayText,
            blogId,
            imageUrl: mainImageUrl,
            image_id: mainImageId,
            sections: finalSections,
        };

        const savedPackage = await createNewPackageService(packageData);

        handelResponse(res, 200, "Package created successfully", savedPackage);
    } catch (err) {
        next(err);
    }
};
