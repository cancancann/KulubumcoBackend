const multer = require("multer");
const uuid = require("uuid");

const upload = ({ folder }) =>
  multer({
    storage: multer.diskStorage({
      destination: `uploads/${folder}`,
      filename: function (req, file, callback) {
        const [type, extension] = file.mimetype.split("/");
        var date = new Date();
        var d = String(date.getDate()).padStart(2, "0");
        var m = String(date.getMonth() + 1).padStart(2, "0");
        var y = date.getFullYear();
        newDate = d + "_" + m + "_" + y;
        file.filename = `${newDate + "_" + uuid.v4().split("-")[0]}.${extension}`;
        callback(null, file.filename);
      },

    }),
    fileFilter: function (req, file, callback) {
      const fileType = file?.mimetype.split("/")[0];
      const index = req?.rawHeaders.indexOf("Content-Length");
      const size = req?.rawHeaders[index + 1];
      if (fileType == "image" && size > 2097152) {
        callback(new Error("En fazla 2MB fotoğraf yükleyebilirsiniz."), false);
      }
      callback(null, true);
    },
  });

module.exports = upload;