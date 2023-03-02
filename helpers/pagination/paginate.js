const paginate =  (req, data) => {
    let { limit = 10, page = 1 } = req.query;
    const newData = data.slice((page - 1 ) * limit, page * limit)
    return newData; 
  };
  
module.exports = paginate;