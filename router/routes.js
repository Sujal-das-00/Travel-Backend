import express from "express"
import { becomeGuideData, createGuide, saveCustomerInfo } from "../controller/postController.js"
import { getAllGuide, getAllPackage, getCustomerRequest, getGuideById, getGuideRequest, getPackageById } from "../controller/getcontroller.js"
import { modifyGuide, modifyPackage} from "../controller/patchController.js"
import { deleteAll, deleteGuide, deletePackage } from "../controller/deleteController.js"
import { upload } from "../middleware/multer.middleware.js";
import { createNewPackage } from "../controller/blog.controller.js"
import { markCustomerRequestVisited, markGuideRequestVisited } from "../controller/patch.markguideRequest.js"
import { adminLogin } from "../controller/admin.login.controller.js"
import { requireAdmin } from "../middleware/auth.js"
const router = express.Router()



//login routes and logout routes

router.post('/login',adminLogin);

router.post("/logout",requireAdmin, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("admin-session");
    res.json({ success: true });
  });
});



router.post(
  "/v1/save/new/package",
  requireAdmin,
  upload.any(),
  createNewPackage
);
router.post('/v1/save/create/new/guide',requireAdmin,createGuide)

router.post('/v1/save/request/new/guide',becomeGuideData)
router.post('/v1/save/customer/details',saveCustomerInfo)

router.get('/v1/get/allpackage',getAllPackage)
router.get('/v1/get/detail/:packageId',getPackageById)
//get all customer request
router.get('/v1/get/all-customer',requireAdmin,getCustomerRequest)
//get all guide request
router.get('/v1/get/allGuideRequest',requireAdmin,getGuideRequest)

router.get('/v1/get/allGuide',requireAdmin,getAllGuide)
router.get('/v1/get/guide/:guideId',requireAdmin,getGuideById)

//onclick of a button the ststus of customer request and guide request will marked and should not shown in the ui 
router.patch('/v1/guide-request/mark-visited/:id',requireAdmin, markGuideRequestVisited);
router.patch('/v1/customer-request/mark-visited/:id',requireAdmin, markCustomerRequestVisited);

router.patch("/v1/modify/package/:packageId",requireAdmin,modifyPackage)
router.patch('/v1/modify/guide/:guideId',requireAdmin,modifyGuide)

router.delete('/v1/delete/package/:packageId',requireAdmin,deletePackage)
router.delete('/v1/delete/guide/:guideId',requireAdmin,deleteGuide)
// router.delete('/test/production/deleteall/:password',requireAdmin,deleteAll)
export default router
