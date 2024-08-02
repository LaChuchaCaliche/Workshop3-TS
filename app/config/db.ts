// conexion con la base de datos
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"pharmay_database",
    port: 3306,
    password: "Campeon28."
});

async function getConnection(){
    try{
        const connection = await pool.getConnection();
        console.log("db conected");
        return connection;
    }
    catch (error){
        console.log("Db connection error",error);
        throw error;
    }
};
getConnection();
export {pool};