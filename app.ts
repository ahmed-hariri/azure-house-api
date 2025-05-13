import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

const app = express();

/* ---> Load environment variables <--- */
dotenv.config();

/* ---> Middlewares <--- */
app.use(express.json());

/* ---> MySQL Database Connection Configuration <--- */
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

/* ---> Connect to the Database and Start Server <--- */
export default connection.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    app.listen(3000, () => {
        console.log("Hello World!");
    });
});