const sql = require("mssql");

// db config
const configOdDB = {
  user: "test",
  password: "test",
  server: "localhost",
  database: "DBKULUP",
  trustServerCertificate: true,
};

const createFollow = async (insertData) => {
  try {
    const { UserId, ClubId } = insertData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("UserId", sql.Int, UserId)
      .input("ClubId", sql.Int, ClubId)
      .query(
        "exec createFollow @UserId=@UserId,@ClubId=@ClubId"
      );
    if (data.rowsAffected.length > 0) {
      return data.recordset[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  } finally {
    sql?.close();
    pool?.close();
  }
};

const getByUserIdAndClubId = async (searchData) => {
  try {
    const { UserId, ClubId } = searchData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("UserId", sql.Int, UserId)
      .input("ClubId", sql.Int, ClubId)
      .query(
        "exec getByUserIdAndClubId @UserId=@UserId,@ClubId=@ClubId"
      );
    return data.recordset[0];
  } catch (err) {
    throw err;
  } finally {
    sql?.close();
    pool?.close();
  }
};

const remove = async (removeData) => {
  try {
    const { UserId, ClubId } = removeData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("UserId", sql.Int, UserId)
      .input("ClubId", sql.Int, ClubId)
      .query(
        "exec removeFollows  @UserId = @UserId ,@ClubId = @ClubId"
      );
    if (data.rowsAffected.length > 0) {
      return true
    } else {
      return false
    }
  } catch (err) {
    throw err;
  } finally {
    sql?.close();
    pool?.close();
  }
};

const getFollowsByUserId = async (userId) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("UserId", sql.Int, userId)
      .query(
        "exec getFollowsByUserId @UserId=@UserId"
      );
    return data.recordset;
  } catch (err) {
    throw err;
  } finally {
    sql?.close()
    pool?.close()
  }
};

const getFollowersByClubId = async (clubId) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId", sql.Int, clubId)
      .query(
        "exec getFollowersByClubId @ClubId = @ClubId"
      );
    return data.recordset
  } catch (err) {
    throw err;
  } finally {
    sql?.close();
    pool?.close();
  }
};

module.exports = {
  createFollow,
  getByUserIdAndClubId,
  remove,
  getFollowsByUserId,
  getFollowersByClubId
};
