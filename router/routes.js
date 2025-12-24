import express from "express"
import { becomeGuideData, createGuide, saveCustomerInfo } from "../controller/postController.js"
import { getAllGuide, getAllPackage, getCustomerRequest, getGuideById, getGuideRequest, getPackageById } from "../controller/getcontroller.js"
import { modifyGuide, modifyPackage} from "../controller/patchController.js"
import { deleteAll, deleteGuide, deletePackage } from "../controller/deleteController.js"
import { upload } from "../middleware/multer.middleware.js";
import { createNewPackage } from "../controller/blog.controller.js"
import { markCustomerRequestVisited, markGuideRequestVisited } from "../controller/patch.markguideRequest.js"
const router = express.Router()



router.post(
  "/v1/save/new/package",
  upload.any(),
  createNewPackage
);
router.post('/v1/save/create/new/guide',createGuide)
router.post('/v1/save/request/new/guide',becomeGuideData)
router.post('/v1/save/customer/details',saveCustomerInfo)

router.get('/v1/get/allpackage',getAllPackage)
router.get('/v1/get/detail/:packageId',getPackageById)
//get all customer request
router.get('/v1/get/all-customer',getCustomerRequest)
//get all guide request
router.get('/v1/get/allGuideRequest',getGuideRequest)

router.get('/v1/get/allGuide',getAllGuide)
router.get('/v1/get/guide/:guideId',getGuideById)

//onclick of a button the ststus of customer request and guide request will marked and should not shown in the ui 
router.patch('/v1/guide-request/mark-visited/:id', markGuideRequestVisited);
router.patch('/v1/customer-request/mark-visited/:id', markCustomerRequestVisited);

router.patch("/v1/modify/package/:packageId",modifyPackage)
router.patch('/v1/modify/guide/:guideId',modifyGuide)

router.delete('/v1/delete/package/:packageId',deletePackage)
router.delete('/v1/delete/guide/:guideId',deleteGuide)
router.delete('/test/production/deleteall/:password',deleteAll)
export default router