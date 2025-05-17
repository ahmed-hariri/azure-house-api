const express = require("express");
const dotenv = require("dotenv");
const pool = require("./config/db");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/articles");

const app = express();

/* ---> Load environment variables <--- */
dotenv.config();

/* ---> Middlewares <--- */
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

/*---> Mounting the authentication routes on the "/auth" path <---*/
app.use("/auth", authRoutes);

/*---> Mounting the routes on the "/api" path <---*/
app.use("/api", productRoutes);

/* ---> Start Server After Testing DB Connection <--- */
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to MySQL database");
        connection.release();
        app.listen(3000, () => {
            console.log("Server running");
        });
    } catch (err) {
        console.error("Database connection failed:", err);
    }
})();
