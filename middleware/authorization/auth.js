const { CustomError } = require("../../helpers/error/CustomError")
const jwt = require("jsonwebtoken")
const { getByUserId } = require("../../repository/authorRepository")

const getAccessToRoute = async (req, res, next) => {
    const { KulubumCo } = req.cookies
    if (KulubumCo) {
        try {
            const decodedToken = jwt.verify(KulubumCo, process.env.SECRET_KEY)
            const { Username, UserId } = decodedToken
            req.body.Username = Username
            req.body.UserId = UserId

            return next();
        } catch (error) {
            return next(new CustomError(error, 400))
        }
    } else {
        return next(new CustomError("Giriş yapınız", 400))
    }
}
const getOnlyUserIdFromTokenToBody = async (req, res, next) => {
    const { KulubumCo } = req.cookies
    if (KulubumCo) {
        try {
            const decodedToken = jwt.verify(KulubumCo, process.env.SECRET_KEY)
            const { UserId } = decodedToken
            req.body.UserId = UserId
            return next();
        } catch (error) {
            return next(new CustomError(error, 400))
        }
    } else {
        return next(new CustomError("Giriş yapınız", 400))
    }
}
const roleControl = async (req, res, next) => {

    let data = await getByUserId(req.body.UserId)
    if (data) {
        let ClubId = req.body.Club
        let control = await data.find(a => a.ClubId === ClubId)
        if (control) {
            return next()
        } else {
            return next(new CustomError("Yetkiniz yoktur", 400))
        }
    } else {
        return next(new CustomError("Yetkiniz yoktur", 400))
    }
}

const getUserIdFromToken = (token) => {
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            const { UserId } = decodedToken
            return UserId
        } catch (error) {
            return null;
        }
    } else {
        return null
    }
}

module.exports = {
    getAccessToRoute,
    roleControl,
    getUserIdFromToken,
    getOnlyUserIdFromTokenToBody
}