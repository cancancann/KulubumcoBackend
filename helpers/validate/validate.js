const validate = (schema, req) => {
    if (!schema) throw new Error('Schema göndermeyi unuttun');
    if (!req) throw new Error('req göndermeyi unuttun');
    const { value, error } = schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params || {},
      },
      { abortEarly: false }
    );
    if (error) {
      const errors = error.details.map((detail) => {
        const splited = detail.message.split('.')[1];
        return splited ? splited : detail.message;
      });
      return {
        success: false,
        message: errors,
      };
    }
    return {
      success: true,
      message: 'success!',
    };
  };
  
  module.exports = validate;