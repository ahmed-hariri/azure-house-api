const jwt = require("jsonwebtoken");

/*---> Middleware to check if the token is valid <---*/
export const authenticateToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Token not provided!" });
    }
    jwt.verify(token, process.env.JWT_SECRET ?? '', (error, data) => {
        if (error) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.data = data
        next();
    })
}

/*---> Middleware to check if the user is an admin <---*/
export const checkAdmin = (req, res, next) => {
    const userData = req.data
    if (userData?.role === "admin") {
        next();
    }
    else {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
}