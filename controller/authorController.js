
const authorRepository = require("../repository/authorRepository")
const { CustomError } = require("../helpers/error/CustomError.js");

const getByUserId = async (req, res, next) => {
    try {
        const data = await authorRepository.getByUserId(req.body.UserId)
        if (!data) {
            return next(new CustomError("Üye olduğunuz kulup bulunmamaktadır", 404))
        }
        return res.status(200).json({
            success: true,
            message: "Admin Oldugunuz Kulupler",
            data: data
        })
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}
const getByClubId = async (req, res, next) => {
    try {
        const data = await authorRepository.getByClubId(req.params.id)
        if (!data) {
            return next(new CustomError("Kulupte Admin bulunmamaktadır", 405))
        }
        return res.status(200).json({
            success: true,
            message: "Kulupteki adminler",
            data: data
        })
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}
const addAuthor = async (req, res, next) => {
    // ToDo kulup ve kullanıcı kontrolu yapmaya gerek var mı yoksa entity ilişkiden dolayı zaten izin vermez onu mu kullanalım
    try {
        let clubInfo = await authorRepository.getByClubId(req.body.Club)
        let userControl = await clubInfo.find(x => x.UserId === req.body.User)
        if (!userControl) {
            const data = await authorRepository.addAuthor(req.body)
            return res.status(200).json({
                success: true,
                message: "Başarılı bir şekilde eklendi",
                data: data
            })
        } else {
            return next(new CustomError("Bu kişi zaten admin", 405))
        }
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}
const deleteAuthor = async (req, res, next) => {
    // ToDo kulup ve kullanıcı kontrolu yapmaya gerek var mı yoksa entity ilişkiden dolayı zaten izin vermez onu mu kullanalım
    try {
        let clubInfo = await authorRepository.getByClubId(req.body.Club)
        let userControl = await clubInfo.find(x => x.UserId === req.body.User)

        if (!userControl) {
            return next(new CustomError("Böyle bir author bulunamadı", 405))
        }
        if (clubInfo.length <= 1) {
            return next(new CustomError("En az bir admin olmak zorundadır", 405))
        }

        const data = await authorRepository.deleteAuthor(req.body)
        if (data !== null) {
            return res.status(200).json({
                success: true,
                message: "Başarılı bir şekilde silindi",
                data: data
            })
        } else {
            return next(new CustomError("Silme işleminde hata olustu", 405))
        }

    } catch (err) {
        return next(new CustomError(err, 500))
    }
}
module.exports = {
    getByUserId,
    getByClubId,
    addAuthor,
    deleteAuthor
}