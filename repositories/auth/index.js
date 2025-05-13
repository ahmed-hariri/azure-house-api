const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../config/db');

/*---> Handle user registration (SignUp) <---*/
const signUpRepository = async (userData) => {
    const { fullName, email, password } = userData;

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length > 0) {
            return { token: null, message: "Email already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)",
            [fullName, email, hashedPassword]
        );

        const [newUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign(
            { id: newUser[0].id, fullName, email },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        return { token, message: "Account has been created!" };
    } catch (error) {
        console.error("Error creating account:", error);
        return { token: null, message: `Error creating account: ${error}` };
    }
};

/*---> Handle user login (SignIn) <---*/
const signInRepository = async (userData) => {
    const { email, password } = userData;

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return { token: null, message: "Account not found!" };
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { token: null, message: "Invalid credentials!" };
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        return { token, message: "Login successful!" };
    } catch (error) {
        console.error("Error logging in:", error);
        return { token: null, message: `Error logging in: ${error}` };
    }
};

module.exports = {
    signUpRepository,
    signInRepository
};