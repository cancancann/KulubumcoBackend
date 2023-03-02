const express = require("express")
const login = require("./auth")
const home = require("./home")
const router = express.Router();
const university = require("./university")
const club = require("./club")
const follow = require("./follow")
const author = require("./author")
const user = require("./user")
const post = require("./post")
const path = require('path')

router.use("/auth", login)
router.use("/home", home)
router.use("/university", university)
router.use("/club", club)
router.use("/follow", follow)
router.use("/author", author)
router.use("/user", user)
router.use("/post", post)
router.use('/uploads/profileimg', express.static(path.join(path.resolve(), '/uploads/profileImg')));

router.get("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Böyle bir sayfa bulunamadı."
    })
})
module.exports = router