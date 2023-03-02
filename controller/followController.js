const { CustomError } = require("../helpers/error/CustomError.js");
const followRepository = require("../repository/followRepository");
const clubRepository = require("../repository/clubRepository");
const userRepository = require("../repository/userRepository");
const paginate = require("../helpers/pagination/paginate")
const auth = require("../middleware/authorization/auth")

const follow = async (req, res, next) => {
  try {
    const user = await userRepository.getById(req.body.UserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    const club = await clubRepository.getById(req.body.ClubId);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Kulup bulunamadı",
      });
    }

    const followData = await followRepository.getByUserIdAndClubId(req.body);
    if (!followData) {
      // Kullanıcı kulubu takip etmiyor. Takip etsin

      const data = await followRepository.createFollow(req.body);
      if (!data) {
        return res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
      return res.status(201).json({
        success: true,
        message: "Kulup takip edildi",
        data: data,
        followStatus: true
      });
    } else {
      // kullanıcı kulubu takip ediyor, takibi geri çek
      await followRepository.remove(req.body);
      return res.status(200).json({
        success: true,
        message: "Takip bırakıldı",
        data: followData,
        followStatus: false
      });
    }
  } catch (err) {
    return next(new CustomError(err, 500));
  }
};

const getFollowListByUserId = async (req, res, next) => {
  let userId;
  try {
    if (!req.query.userId) {
      if (!req.headers.cookie) {
        return next(new CustomError("hem query hem de cookie içinde userid yok.", 400))
      }
      userId = await auth.getUserIdFromToken(req.headers.cookie.split("=")[1]);
    } else {
      userId = req.query.userId
    }
    // check if user exists
    const user = userRepository.getById(userId).then(// bazı hatalar var düzeltilmesi gereken Büyük problemler
      res => res
    )
      .catch(err => {
        return next(new CustomError(err, 500));
      })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    const data = paginate(req, await followRepository.getFollowsByUserId(userId));

    return res.status(200).json({
      success: true,
      message: "Takipler listelendi",
      data: data,
    });
  } catch (err) {
    return next(new CustomError(err, 500));
  }
};

const getFollowersByClubId = async (req, res, next) => {
  try {
    const club = await clubRepository.getById(req.query.clubId);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Kulup bulunamadı",
      });
    }
    const data = paginate(req, await followRepository.getFollowersByClubId(req.query.clubId));
    return res.status(200).json({
      success: true,
      message: "Takipçiler listelendi",
      data: data,
    });
  } catch (err) {
    return next(new CustomError(err, 500));
  }
};

module.exports = {
  follow,
  getFollowListByUserId,
  getFollowersByClubId,
};
