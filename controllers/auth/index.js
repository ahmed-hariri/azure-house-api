const { signInRepository, signUpRepository } = require("../../repositories/auth");

/*---> SignUp controller <---*/
const signUpController = async (req, res, next) => {
    // Destructuring
    const { fullName, email, password } = req.body
    console.log(req.body)
    if (!fullName || !email || !password) {
        return res.status(400).type("json").json({ message: `You dont have : ${!fullName ? "fullName" : ""} ${!email ? "email" : ""} ${!password ? "password" : ""}` });
    }
    try {
        const userData = { fullName, email, password }
        const { token, message } = await signUpRepository(userData);
        if (token) {
            return res.status(200).type("json").json({ token, message });
        }
        return res.status(200).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}

/*---> SignIn controller <---*/
const signInController = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).type("json").json({ message: `You dont have : ${!email ? "email" : ""} ${!password ? "password" : ""}` });
    }
    try {
        const userData = { email, password }
        const { token, message } = await signInRepository(userData);
        if (token) {
            return res.status(200).type("json").json({ token, message });
        }
        return res.status(200).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signUpController,
    signInController
};