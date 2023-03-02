const express = require("express")
const router = express.Router();
const authorController = require("../controller/authorController")
const validate = require("../middleware/validate/validate")
const schema = require("../schemas/authorSchema")
const authorization = require("../middleware/authorization/auth")



router.get("/byuserid", authorization.getAccessToRoute, validate(schema.getByUserIdSchema), authorController.getByUserId)
router.get("/bykulupid/:id", authorization.getAccessToRoute, validate(schema.getByKulupIdSchema), authorController.getByClubId)
router.post("/", authorization.getAccessToRoute, validate(schema.addAuthorSchema), authorization.roleControl, authorController.addAuthor)
router.delete("/", authorization.getAccessToRoute, validate(schema.deleteAuthorSchema), authorization.roleControl, authorController.deleteAuthor)
module.exports = router;