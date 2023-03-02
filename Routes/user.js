const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate/validate");
const auth = require("../middleware/authorization/auth");
const userController = require("../controller/userController");
const schema = require("../schemas/userSchema");

const upload = require("../middleware/upload/upload");
const uploadConfig = { folder: "/club" };

// router.get("/getprofileimage", auth.getAccessToRoute, userController.getProfileImage)
router.get("/getprofileimage", auth.getAccessToRoute, userController.getProfileImage, (req, res, send) => {
  res.send("basarılı")
})

router
  .route("/profile/currentuser")
  .get(
    auth.getAccessToRoute,
    validate(schema.getCurrentUserSchema),
    userController.getCurrentUser
  );
router
  .route("/:id")
  .get(validate(schema.getByIdSchema), userController.getById);

router.put(
  "/",
  auth.getOnlyUserIdFromTokenToBody,
  // validate(schema.editUserSchema),
  //upload(uploadConfig).single("media"),
  userController.EditUser,
  userController.EditUserCookieInfo
);

router
  .route("/password/change")
  .post(
    auth.getAccessToRoute,
    validate(schema.changePasswordSchema),
    userController.changePassword,
    userController.EditUserCookieInfo
  );


router
  .route("/profileimage/update")
  .patch(
    auth.getAccessToRoute,
    userController.updateProfileImage,
    userController.EditUserCookieInfo
  );

module.exports = router;
