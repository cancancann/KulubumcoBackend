const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const auth = require("../middleware/authorization/auth");
const validate = require("../middleware/validate/validate");
const schema = require("../schemas/postSchema");

router
  .route("/")
  .post(
    auth.getAccessToRoute,
    validate(schema.createSchema),
    postController.create
  );

router
  .route("/:id")
  .get(validate(schema.getByIdSchema), postController.getById);

router.route("/").get(validate(schema.getAllSchema), postController.list);
router.route("/getuserid/follow").get(auth.getAccessToRoute, postController.getByUserId)
router.route("/search/getByClubId").get(validate(schema.getByClubIdSchema), postController.getByClubId)
router.route("/getbyuniversityid/:id").get(validate(schema.getByUniversiteIdSchema), postController.getByUniversiteId)
router.route("/:id").patch(auth.getAccessToRoute, validate(schema.updateSchema), postController.update)
router.route("/:id").delete(auth.getAccessToRoute, validate(schema.getByUniversiteIdSchema), postController.getByUniversiteId)

module.exports = router;
