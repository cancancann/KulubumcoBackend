const validate = (schema) => (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      const val = req.body[key];
      if (typeof val === "string") {
        req.body[key] = val.trim();
      }
    });
  }

  const { value, error } = schema.validate(
    {
      body: req.body,
      query: req.query,
      params: req.params || {},
    },
    { aboutEarly: false }
  );

  if (error) {
    const errors = error.details.map((detail) => {
      const splited = detail.message.split(".")[1];
      return splited ? splited : detail.message;
    });
    //return res.error(errors, 400);
    return res.status(400).json({
      success:false,
      message:errors
    })
  }

  return next();
};


module.exports = validate