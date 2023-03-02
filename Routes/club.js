const express = require("express");
const router = express.Router();
const clubController = require("../controller/clubController");
const validate = require("../middleware/validate/validate");
const schema = require("../schemas/clubSchema");
const auth = require("../middleware/authorization/auth");
const upload = require("../middleware/upload/upload");
const uploadConfig = { folder: "/club" };

router
  .route("/")
  .post(
    auth.getAccessToRoute,
    //upload(uploadConfig).single("media"),
    clubController.create
  );
router.route("/").get(validate(schema.getListSchema), clubController.search);
router
  .route("/:id")
  .get(validate(schema.getByIdSchema), clubController.getById);
//router.route("/search/getByNameContains").get(validate(schema.getByNameContainsSchema), clubController.getByClubNameContains)
router
  .route("/:id")
  .delete(validate(schema.deleteSchema), clubController.deleteClub);
router
  .route("/:id")
  .patch(validate(schema.updateSchema), clubController.update);
router
  .route("/search/getByUniversityId")
  .get(
    validate(schema.getByUniversityIdSchema),
    clubController.getByUniversityId
  );

module.exports = router;
