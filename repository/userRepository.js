const sql = require('mssql')

const configOfDB = {
    user: 'test',
    password: 'test',
    server: 'localhost',
    database: 'DBKULUP',
    trustServerCertificate: true,
}
const getById = async (UserId) => {
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('UserId', sql.Int, UserId)
            .query("exec getById @UserId=@UserId");
        if (data.rowsAffected.length > 0) {
            return data.recordset[0];
        }
        else {
            return null
        }
    } catch (error) {
        throw error;
    } finally {
        pool?.close();
        sql?.close();
    }
}
const getByEmail = async (Email) => {
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('Email', sql.NVarChar(50), Email)
            .query("exec getByEmailUser @Email=@Email");
        if (data.rowsAffected.length > 0) {
            return data.recordset[0];
        }
        else {
            return null
        }
    } catch (error) {
        throw error;
    } finally {
        pool?.close();
        sql?.close();
    }
}
const getByUserame = async (Username) => {
    try {

        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('Username', sql.NVarChar(50), Username)
            .query("exec getByUserame @Username=@Username");
        if (data.rowsAffected.length > 0) {
            return data.recordset[0];
        }
        else {
            return null
        }
    } catch (error) {
        throw error;
    } finally {

        pool?.close();
        sql?.close();

    }
}
const updateUser = async (body) => {
    try {
        let { Username, Email, Birthdate, Cinsiyet, UniversityId, Bolum, UserId, media } = body
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('Username', sql.NVarChar(50), Username)
            .input('Email', sql.NVarChar(50), Email)
            .input('UniversityId', sql.Int, UniversityId)
            .input('Birthdate', sql.Date, Birthdate)
            .input('Cinsiyet', sql.NVarChar(5), Cinsiyet)
            .input('Bolum', sql.NVarChar(50), Bolum)
            .input('UserId', sql.Int, UserId)
            .input("ProfileImg", sql.NVarChar, media)
            .query("exec editUser @Username =@Username,@UniversityId=@UniversityId,@Department=@Bolum, @Gender=@Cinsiyet, @Birthdate =@Birthdate,@Email =@Email,@ProfileImg =@ProfileImg,@UserId =@UserId")
        if (data.rowsAffected.length > 0) {
            // data = await pool.request()
            //     .input('UserId', sql.Int, UserId)
            //     .query("select * from TBLUSERS where UserId=@UserId ");
            // bu kısım tek requestte de halledilebilir gibi ama kontrolu zor olabilir !Discuss
            // for (let i = 0; i < data.rowsAffected; i++) {
            //     effectedRow.push(data.recordset[i]);
            // }

            return data.recordset[0];
        }
        else {
            return null
        }
    }
    catch (error) {
        throw error;
    } finally {

        pool?.close();
        sql?.close();

    }
}
const createdUser = async (body) => {
    try {
        let { Username, Userpassword, Email, Birthdate, Cinsiyet, Universite, Bolum } = body
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('Username', sql.NVarChar(50), Username)
            .input('Userpassword', sql.NVarChar(500), Userpassword)
            .input('Email', sql.NVarChar(50), Email)
            .input('Universite', sql.Int, Universite)
            .query("exec createdUser @Username=@Username,@Userpassword=@Userpassword,@Universite=@Universite,@Email=@Email");

        if (data.rowsAffected.length > 0) {
            // data = await pool.request()
            // .input('Username', sql.NVarChar(50), Username)
            // .query("select * from TBLUSERS where Username=@Username ");
            // bu kısım tek requestte de halledilebilir gibi ama kontrolu zor olabilir !Discuss
            // for (let i = 0; i < data.rowsAffected; i++) {
            //     effectedRow.push(data.recordset[i]);
            // }

            return data.recordset[0];
        }
        else {
            return null
        }
    } catch (error) {
        throw error;
    } finally {

        pool?.close();
        sql?.close();

    }
}

const getCurrentUser = async (userData) => {
    try {
        const { UserId } = userData
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input("UserId", sql.Int, UserId)
            .query("exec getCurrentUser @UserId=@UserId")
        return data.recordset[0]

    } catch (error) {
        throw error;
    } finally {

        pool?.close();
        sql?.close();

    }
}

const changePassword = async (UserId, Password) => {
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input("UserId", sql.Int, UserId)
            .input("Password", sql.NVarChar(500), Password)
            .query("exec changePassword @UserId = @UserId,@Password=@Password")
        if (data.rowsAffected.length > 0) {
            // data = await pool.request()
            //     .input("UserId", sql.Int, UserId)
            //     .query("SELECT * FROM TBLUSERS WHERE UserId = @UserId")
            return data.recordset[0] // db de hata oldumu onu denetlemek için. frontend tarafına gönderilmeyecek
        }
        return null;

    } catch (error) {
        throw error;
    } finally {

        pool?.close();
        sql?.close();
    }
}

const getUserByIdWithPassword = async (UserId) => {
    try {
        var pool = await sql.connect(configOfDB);
        var data = await pool.request()
            .input('UserId', sql.Int, UserId)
            .query("exec getUserByIdWithPassword @UserId=@UserId");
        if (data.rowsAffected.length > 0) {
            return data.recordset[0];
        }
        else {
            return null
        }
    } catch (error) {
        throw error;
    } finally {
        pool?.close();
        sql?.close();
    }
}

const updateProfileImage = async (profileImage, userId) => {
    try {
        var pool = await sql.connect(configOfDB)
        var data = await pool.request()
            .input("ProfileImage", sql.NVarChar(), profileImage)
            .input("UserId", sql.Int, userId)
            .query("UPDATE TBLUSERS SET ProfileImg=@ProfileImage WHERE UserId=@UserId")
        if (data.rowsAffected.length > 0) {
            data = await pool.request()
                .input("UserId", sql.Int, userId)
                .query("SELECT u.UserId, u.Username, u.Email, u.Birthdate, u.Gender, u.Department, u.ProfileImg, uni.UniversityId, uni.UniversityName " +
                    "FROM TBLUSERS u INNER JOIN TBLUNIVERSITIES AS uni ON u.UniversityId = uni.UniversityId " +
                    "WHERE UserId = @UserId")
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
const getProfileImg = async (userId) => {
    try {
        var pool = await sql.connect(configOfDB)
        var data = await pool.request()
            .input("UserId", sql.Int, userId)
            .query("Select  ProfileImg from TBLUSERS where UserId=@UserId")
        if (data.rowsAffected.length > 0) {
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
module.exports = {
    getById,
    getByUserame,
    createdUser,
    getByEmail,
    updateUser,
    getCurrentUser,
    changePassword,
    getUserByIdWithPassword,
    updateProfileImage,
    getProfileImg
}

