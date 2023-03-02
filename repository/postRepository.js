const sql = require("mssql");

// db config
const configOdDB = {
  user: "test",
  password: "test",
  server: "localhost",
  database: "DBKULUP",
  trustServerCertificate: true,
};

const create = async (insertData) => {
  try {
    const { ClubId, PostHeader, PostText, UserId } = insertData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId", sql.Int, ClubId)
      .input("PostHeader", sql.NVarChar(50), PostHeader)
      .input("PostText", sql.NVarChar(300), PostText)
      .input("UserId", sql.Int, UserId)
      .query(
        "exec createPost @ClubId=@ClubId,@PostHeader=@PostHeader,@PostText=@PostText,@UserId=@UserId"
        // "INSERT INTO TBLPOSTS (ClubId, PostHeader, PostText, UserId) VALUES (@ClubId, @PostHeader, @PostText, @UserId)"
      );
    if (data.rowsAffected.length > 0) {
      // data = await pool
      //   .request()
      //   .input("ClubId", sql.Int, ClubId)
      //   .input("UserId", sql.Int, UserId)
      //   .input("PostHeader", sql.NVarChar(50), PostHeader)
      //   .query(
      //     "SELECT p.*, c.ClubName, u.UserName, uni.UniversityName FROM TBLPOSTS p " +
      //     "INNER JOIN TBLCLUBS AS c ON p.ClubId = c.ClubId " +
      //     "INNER JOIN TBLUSERS AS u ON p.UserId = u.UserId " +
      //     "INNER JOIN TBLUNIVERSITIES AS uni ON c.UniversityId = uni.UniversityId " +
      //     "WHERE p.UserId=@UserId AND p.ClubId=@ClubId AND p.PostHeader=@PostHeader"
      //   );
      return data.recordset[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const getById = async (id) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("PostId", sql.Int, id)
      .query(
        "exec getByPostId @PostId=@PostId"
      );
    return data.recordset[0];
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const getAll = async () => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .query(
        "exec getAllPost"
      );
    return data.recordset;
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
}

const getByClubId = async (ClubId) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId", sql.Int, ClubId)
      .query(
        "exec getByClubIdPost @ClubId=@ClubId"
      );
    return data.recordset;
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
}

const getByUserId = async (body) => {
  try {
    const { UserId } = body
    var pool = await sql.connect(configOdDB)
    var data = await pool.request()
      .input("UserId", sql.Int, UserId)
      .query("select uni.UniversityName,TBLPOSTS.PostHeader,TBLPOSTS.PostText,TBLPOSTS.CreatedAt,TBLPOSTS.PostId,club.ClubName from TBLPOSTS inner join TBLCLUBS  as club on club.ClubId =TBLPOSTS.ClubId inner join TBLUNIVERSITIES as uni on club.UniversityId= uni.UniversityId where TBLPOSTS.ClubId  in(select ClubId from TBLFOLLOWS where UserId=@UserId) order by TBLPOSTS.CreatedAt desc ")
    if (data.rowsAffected.length > 0) {
      // data = await pool.request()
      //   .input("PostId", sql.Int, PostId)
      //   .query(
      //     "SELECT p.*, c.ClubName, u.UserName, uni.UniversityName FROM TBLPOSTS p " +
      //     "INNER JOIN TBLCLUBS AS c ON p.ClubId = c.ClubId " +
      //     "INNER JOIN TBLUSERS AS u ON p.UserId = u.UserId " +
      //     "INNER JOIN TBLUNIVERSITIES AS uni ON c.UniversityId = uni.UniversityId " +
      //     "WHERE p.PostId=@PostId"
      //   );
      return data.recordset
    } else {
      return null;
    }

  } catch (err) {
    throw err
  } finally {
    sql?.close()
    pool?.close()
  }
}
const update = async (updateData) => {
  try {
    const { PostId, PostHeader, PostText } = updateData
    var pool = await sql.connect(configOdDB)
    var data = await pool.request()
      .input("PostId", sql.Int, PostId)
      .input("PostHeader", sql.NVarChar(50), PostHeader)
      .input("PostText", sql.NVarChar(300), PostText)
      .query("exec updatePost @PostHeader=@PostHeader, @PostText=@PostText, @PostId=@PostId")
    if (data.rowsAffected.length > 0) {
      // data = await pool.request()
      //   .input("PostId", sql.Int, PostId)
      //   .query(
      //     "SELECT p.*, c.ClubName, u.UserName, uni.UniversityName FROM TBLPOSTS p " +
      //     "INNER JOIN TBLCLUBS AS c ON p.ClubId = c.ClubId " +
      //     "INNER JOIN TBLUSERS AS u ON p.UserId = u.UserId " +
      //     "INNER JOIN TBLUNIVERSITIES AS uni ON c.UniversityId = uni.UniversityId " +
      //     "WHERE p.PostId=@PostId"
      //   );
      return data.recordset[0]
    } else {
      return null;
    }

  } catch (err) {
    throw err
  } finally {
    sql?.close()
    pool?.close()
  }
}

const remove = async (postId) => {
  try {
    var pool = await sql.connect(configOdDB)
    var data = await pool.request()
      .input("PostId", sql.Int, postId)
      .query("exec removePost @PostId=@PostId")
    if (data.rowsAffected.length > 0) {
      return true
    } else {
      return false
    }
  } catch (err) {
    throw err
  } finally {
    sql?.close()
    pool?.close()
  }
}

const getByPostHeaderContains = async (postHeader) => {
  try {
    var pool = await sql.connect(configOdDB)
    var data = await pool.request()
      .query(`SELECT p.*, c.ClubName, u.UserName, uni.UniversityName FROM TBLPOSTS p ` +
        `INNER JOIN TBLCLUBS AS c ON p.ClubId = c.ClubId ` +
        `INNER JOIN TBLUSERS AS u ON p.UserId = u.UserId ` +
        `INNER JOIN TBLUNIVERSITIES AS uni ON c.UniversityId = uni.UniversityId ` +
        `WHERE p.PostHeader LIKE '%${postHeader}%' `)
    return data.recordset
  } catch (err) {
    throw err
  } finally {
    sql?.close()
    pool?.close()
  }
}
const getByUniversiteId = async (UniversityId) => {
  try {
    var pool = await sql.connect(configOdDB)
    var data = await pool.request()
      .input("UniversityId", sql.Int, UniversityId)
      .query("select uni.UniversityName,TBLPOSTS.PostHeader,TBLPOSTS.PostText,TBLPOSTS.CreatedAt,TBLPOSTS.PostId,TBLCLUBS.ClubName from TBLPOSTS inner join TBLCLUBS  on       TBLCLUBS.ClubId =TBLPOSTS.ClubId inner join TBLUNIVERSITIES as uni on TBLCLUBS.UniversityId= uni.UniversityId where TBLCLUBS.UniversityId in(select UniversityId from TBLUNIVERSITIES where UniversityId=@UniversityId) order by TBLPOSTS.CreatedAt desc")
    return data.recordset
  } catch (err) {
    throw err
  } finally {
    sql?.close()
    pool?.close()
  }
}
module.exports = {
  create,
  getById,
  getAll,
  getByClubId,
  update,
  remove,
  getByPostHeaderContains,
  getByUserId,
  getByUniversiteId
};
