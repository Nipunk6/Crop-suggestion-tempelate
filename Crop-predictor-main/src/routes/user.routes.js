import { registerUser,loginUser,refreshAccessToken,userLogOut,changePassword,changeAvatar,changeAccountDetails,getCurrentUser } from "../controllers/user.controller.js";



import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";




const router= Router()
router.route("/register").post(
upload.single("avatar"),registerUser
)


router.route("/login").post(loginUser)

router.route("/refresh-access-token").post(refreshAccessToken)


//secured routes
router.route("/change-password").post(verifyJwt,changePassword)

router.route("/current-user").get(verifyJwt,getCurrentUser)

router.route("/change-account-details").patch(verifyJwt,changeAccountDetails)

router.route("/change-avatar").patch(verifyJwt,upload.single("avatar"),changeAvatar)







router.route("/logout").post(verifyJwt,  userLogOut)



export default router