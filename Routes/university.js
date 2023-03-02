const express = require("express");
const router = express.Router();
const universityController = require("../controller/universityContoller");
const validate = require("../middleware/validate/validate");
const schema = require("../schemas/universitySchema");
const upload = require("../middleware/upload/upload");
const uploadConfig = { folder: "/university" };
const authorization = require("../middleware/authorization/auth");

router
  .route("/")
  .post(
    authorization.getAccessToRoute,
    //upload(uploadConfig).single("media"),
    universityController.create
  );
router
  .route("/")
  .get(validate(schema.getListSchema), universityController.list);
router
  .route("/:id")
  .get(validate(schema.getByIdSchema), universityController.getById);
router
  .route("/search/getByName")
  .get(
    validate(schema.getByNameContainsSchema),
    universityController.getByNameContains
  );
router
  .route("/:id")
  .delete(validate(schema.deleteSchema), universityController.deleteUniversity);

module.exports = router;
