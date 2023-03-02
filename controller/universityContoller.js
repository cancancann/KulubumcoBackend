// repository import et
const universityRepository = require("../repository/universityRepository");
const { CustomError } = require("../helpers/error/CustomError.js");
const validate = require("../helpers/validate/validate")
const schema = require("../schemas/universitySchema")

const create = async (req, res, next) => {
  try {
    // TODO: daha önce eklenmiş mi? kontrol et
    const { success, message } = validate(schema.createSchema, req)
    if (!success) {
      return res.status(400).json({
        success: false,
        message: message
      })
    }
    // if(req.file?.filename) {
    //   req.body.media = req.file?.filename
    // }

    if (req.files && req.files.media !== null) {
      const buffer = Buffer.from(req.files?.media.data, 'base64')
      const base64str = buffer.toString("base64")
      req.body.media = base64str
    }
    const data = await universityRepository.createUniversity(req.body);
    if (!data) {
      return res.status(500).json({
        success: false,
        message: "Bir hata olustu",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Universite eklendi",
      data: data,
    });
  } catch (err) {
    return next(new CustomError(err, 500));
  }
};

const list = async (req, res, next) => {
  try {
    const data = await universityRepository.getAllUniversities();
    return res.status(200).json({
      success: true,
      message: "Universiteler listelendi",
      data: data,
    });
  } catch (err) {
    return next(new CustomError(err, 500));
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await universityRepository.getById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Universite bulunamadı",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Universite listelendi",
      data: data,
    });
  } catch (err) {
    return next(new CustomError(err, 500));
  }
};

const getByNameContains = async (req, res, next) => {
  try {
    const data = await universityRepository.getByNameContains(req.query.name)
    return res.status(200).json({
      success: true,
      message: "Universiteler listelendi",
      data: data
    })
  } catch (err) {
    return next(new CustomError(err, 500));
  }
};

const deleteUniversity = async (req, res, next) => {
  try {
    // data mevcut mu? kontrol et.
    const data = await universityRepository.getById(req.params.id)
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Universite bulunamadı."
      })
    }
    await universityRepository.remove(req.params.id)
    return res.status(200).json({
      success: true,
      message: "Universite silindi",
      data: data
    })
  } catch (err) {
    return next(new CustomError(err, 500));
  }
}

module.exports = {
  create,
  list,
  getById,
  getByNameContains,
  deleteUniversity
};
