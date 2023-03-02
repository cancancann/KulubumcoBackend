const express = require("express")
const router = express.Router();
const authController = require("../controller/authController");
const validate = require("../middleware/validate/validate")
const schema = require("../schemas/userSchema")
const auth = require("../middleware/authorization/auth")


router.post("/login", validate(schema.postLoginSchema), authController.PostLoginController)
router.post("/register", validate(schema.createSchema), authController.CreateUserControllers)
router.get("/logout", validate(schema.getLogoutSchema), authController.DeleteCookie)
// User Bura için güvenlik lazım gibi
//router.get("/:id", validate(schema.getByIdSchema), authController.getById)
//router.put("/", auth.getAccessToRoute, validate(schema.editUserSchema), authController.EditUser, authController.EditUserCookieInfo)

module.exports = router;