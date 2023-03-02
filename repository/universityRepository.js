const sql = require("mssql");

// db config
const configOdDB = {
  user: "test",
  password: "test",
  server: "localhost",
  database: "DBKULUP",
  trustServerCertificate: true,
};

// sql query
const createUniversity = async (insertData) => {
  try {
    const { UniversityName, media } = insertData;

    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      .input("UniversityName", sql.NVarChar(50), UniversityName)
      .input("Media", sql.NVarChar, media)
      .query(
        "exec createUniversity @UniversityName=@UniversityName, @Media= @Media"
      );
    if (data.rowsAffected.length > 0) {
      // data = await pool
      //   .request()
      //   .input("UniversityName", sql.NVarChar(), UniversityName)
      //   .query(
      //     "select * from TBLUNIVERSITIES where UniversityName = @UniversityName"
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

const getAllUniversities = async () => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool.request().query("exec getAllUniversities");
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
      // .input("UniversityId", sql.Int, id)
      .query(`SELECT u.*, (SELECT COUNT(*) FROM TBLCLUBS WHERE UniversityId=${id}) AS ClubAmount FROM TBLUNIVERSITIES u WHERE UniversityId=${id}`);
    return data.recordset[0]
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
};

const getByNameContains = async (name) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      //.input("UniversityName", sql.NVarChar, name)
      .query(`SELECT * FROM TBLUNIVERSITIES WHERE UniversityName LIKE '%${name}%'`)
    return data.recordset
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
}

const remove = async (id) => {
  try {
    var pool = await sql.connect(configOdDB);
    var data = await pool
      .request()
      //.input("UniversityName", sql.NVarChar, name)
      .query(`DELETE FROM TBLUNIVERSITIES WHERE UniversityId=${id}`)
    // birsey donme 
  } catch (err) {
    throw err;
  } finally {
    pool?.close();
    sql?.close();
  }
}

module.exports = {
  createUniversity,
  getAllUniversities,
  getById,
  getByNameContains,
  remove
};
