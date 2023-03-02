const sql = require("mssql");

// db config
const configOdDB = {
  user: "test",
  password: "test",
  server: "localhost",
  database: "DBKULUP",
  trustServerCertificate: true,
};

const createClub = async (insertData) => {
  try {
    const { ClubName, ClubMail, UniversityId, Description, UserId, media } =
      insertData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubName", sql.NVarChar(50), ClubName)
      .input("ClubMail", sql.NVarChar(50), ClubMail)
      .input("UniversityId", sql.Int, UniversityId)
      .input("Description", sql.NVarChar(1000), Description)
      .input("ClubImage", sql.NVarChar, media)
      .query(
        "INSERT INTO TBLCLUBS (ClubName, ClubMail, UniversityId, Description, ClubImage) VALUES (@ClubName, @ClubMail, @UniversityId, @Description, @ClubImage)"
      );
    if (data.rowsAffected.length > 0) {
      data = await pool
        .request()
        .input("ClubMail", sql.NVarChar(50), ClubMail)
        .query("SELECT * FROM TBLCLUBS WHERE ClubMail = @ClubMail");
      let addAdmin = await pool
        .request()
        .input("UserId", sql.Int, UserId)
        .input("ClubId", sql.Int, data.recordset[0].ClubId)
        .query(
          "insert into TBLCLUBADMIN (UserId,ClubId) values (@UserId,@ClubId)"
        );

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

const getByEmail = async (mail) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubMail", sql.NVarChar(50), mail)
      .query("exec getByEmail @ClubMail = @ClubMail");
    return data.recordset[0];
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const getAll = async (userId) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .query(
        "SELECT c.ClubId, (SELECT COUNT(*) FROM TBLFOLLOWS WHERE ClubId = c.ClubId) AS FollowerAmount, c.ClubName, c.ClubMail, c.UniversityId, c.ClubImage, c.Description, u.UniversityName, u.UniversityLogo " +
        "FROM TBLCLUBS c INNER JOIN TBLUNIVERSITIES AS u " +
        "ON c.UniversityId = u.UniversityId " +
        "ORDER BY FollowerAmount DESC"
      );
    if (userId) {
      for (let i = 0; i < data.recordset.length; i++) {
        let followed = false;
        let followData = await pool
          .request()
          .query(
            `SELECT FollowId FROM TBLFOLLOWS where ClubId = ${data.recordset[i].ClubId} AND UserId = ${userId}`
          );
        if (followData.recordset[0]) {
          followed = true;
        }
        data.recordset[i] = {
          ...data.recordset[i],
          isFollowed: followed,
        };
      }
    }
    return data.recordset;
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
      .input("ClubId", sql.Int, id)
      .query(
        "SELECT c.*, (SELECT COUNT(*) FROM TBLFOLLOWS WHERE ClubId = c.ClubId) AS FollowerAmount FROM TBLCLUBS c WHERE c.ClubId = @ClubId"
      );
    return data.recordset[0];
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const getByClubNameContains = async (name, userId) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .query(
        `SELECT c.*, (SELECT COUNT(*) FROM TBLFOLLOWS WHERE ClubId = c.ClubId) AS FollowerAmount FROM TBLCLUBS c WHERE c.ClubName LIKE '%${name}%' ORDER BY FollowerAmount DESC`
      );
    return data.recordset;
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const remove = async (id) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId", sql.Int, id)
      .query("exec removeClub @ClubId=@ClubId");
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const update = async (id, updateData) => {
  try {
    const { ClubName, ClubMail, Description } = updateData;
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("ClubId", sql.Int, id)
      .input("ClubName", sql.NVarChar(50), ClubName)
      .input("ClubMail", sql.NVarChar(50), ClubMail)
      .input("Description", sql.NVarChar(1000), Description)
      .query(
        // "exec updateClub @ClubName=@ClubName, @ClubMail = @ClubMail, @Description = @Description  ,@ClubId = @ClubId "
        "UPDATE TBLCLUBS SET ClubName=@ClubName, ClubMail = @ClubMail, Description = @Description WHERE ClubId = @ClubId"
      );
    if (data.rowsAffected.length > 0) {
      data = await pool
        .request()
        .input("ClubId", sql.Int, id)
        .query("SELECT * FROM TBLCLUBS WHERE ClubId = @ClubId"); // burada hata alısıyor o yüzden böyle kalsın
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

const getByUniversityId = async (universityId, userId) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("UniversityId", sql.Int, universityId)
      .query(
        "SELECT c.ClubId, (SELECT COUNT(*) FROM TBLFOLLOWS WHERE ClubId = c.ClubId) AS FollowerAmount, c.ClubName, c.ClubMail, c.UniversityId, c.ClubImage, c.Description, u.UniversityName, u.UniversityLogo " +
        "FROM TBLCLUBS c INNER JOIN TBLUNIVERSITIES AS u " +
        "ON c.UniversityId = u.UniversityId " +
        "WHERE c.UniversityId=@UniversityId ORDER BY FollowerAmount DESC"
      );
    if (userId) {
      for (let i = 0; i < data.recordset.length; i++) {
        let followed = false;
        let followData = await pool
          .request()
          .query(
            `SELECT FollowId FROM TBLFOLLOWS where ClubId = ${data.recordset[i].ClubId} AND UserId = ${userId}`
          );
        if (followData.recordset[0]) {
          followed = true;
        }
        data.recordset[i] = {
          ...data.recordset[i],
          isFollowed: followed,
        };
      }
    }
    return data.recordset;
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

module.exports = {
  createClub,
  getByEmail,
  getAll,
  getById,
  getByClubNameContains,
  remove,
  update,
  getByUniversityId
};
