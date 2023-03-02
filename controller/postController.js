const { CustomError } = require("../helpers/error/CustomError")
const postRepository = require("../repository/postRepository")
const paginate = require("../helpers/pagination/paginate")
const clubRepository = require("../repository/clubRepository")


const create = async (req, res, next) => {
    try {
        // TODO: check if user has authority to create a post

        const data = await postRepository.create(req.body)
        if (!data) {
            return res.status(500).json({
                success: false,
                message: "Bir hata oluştu."
            })
        }
        return res.status(201).json({
            success: true,
            message: "Duyuru eklendi.",
            data: data
        })
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}

const getById = async (req, res, next) => {
    try {
        const data = await postRepository.getById(req.params.id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Duyuru bulunamadı."
            })
        }
        return res.status(200).json({
            success: true,
            message: "Duyuru listelendi",
            data: data
        })
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}

const list = async (req, res, next) => {
    try {
        if (req.query.postHeader) {
            const data = paginate(req, await postRepository.getByPostHeaderContains(req.query.postHeader))
            return res.status(200).json({
                success: true,
                message: "Duyurular listelendi",
                data: data
            })
        }
        else {
            const data = paginate(req, await postRepository.getAll())
            return res.status(200).json({
                success: true,
                message: "Duyurular listelendi",
                data: data
            })
        }

    } catch (err) {
        return next(new CustomError(err, 500))
    }
}

const getByClubId = async (req, res, next) => {
    try {

        // check if club exists
        const club = await clubRepository.getById(req.query.clubId)
        if (!club) {
            return res.status(404).json({
                success: false,
                message: "Kulüp bilgisi bulunamadı."
            })
        }

        const data = paginate(req, await postRepository.getByClubId(req.query.clubId))
        return res.status(200).json({
            success: true,
            message: "Duyurular listelendi",
            data: data
        })

    } catch (err) {
        return next(new CustomError(err, 500))
    }
}

const update = async (req, res, next) => {
    try {

        // check if post exists
        const post = await postRepository.getById(req.params.id)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Duyuru bulunamadı."
            })
        }
        req.body.PostHeader = req.body.PostHeader ?? post.PostHeader
        req.body.PostText = req.body.PostText ?? post.PostText

        const data = await postRepository.update({ ...req.body, PostId: req.params.id })
        if (!data) {
            return res.status(500).json({
                success: false,
                message: "Bir hata oluştu"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Duyuru güncellendi.",
            data: data
        })

    } catch (err) {
        return next(new CustomError(err, 500))
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await postRepository.getById(req.params.id)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Duyuru bulunamadı"
            })
        }

        const success = await postRepository.remove(req.params.id)
        if (!success) {
            return res.status(500).json({
                success: false,
                message: "Bilinmeyen bir hata oluştu."
            })
        }
        return res.status(200).json({
            success: true,
            message: "Duyuru silindi.",
            data: post
        })

    } catch (err) {
        return next(new CustomError(err, 500))
    }
}

const getByUserId = async (req, res, next) => {
    try {
        const postlist = await postRepository.getByUserId(req.body)
        if (!postlist) {
            return res.status(404).json({
                success: false,
                message: "Post bulunamadı"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Post listesi başarıyla geitirildi",
                data: postlist
            })
        }
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}
const getByUniversiteId = async (req, res, next) => {
    try {
        const postlist = await postRepository.getByUniversiteId(req.params.id)
        if (!postlist) {
            return res.status(404).json({
                success: false,
                message: "Post bulunamadı"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Post listesi başarıyla geitirildi",
                data: postlist
            })
        }
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}
module.exports = {
    create,
    getById,
    list,
    getByClubId,
    update,
    deletePost,
    getByUserId,
    getByUniversiteId
}