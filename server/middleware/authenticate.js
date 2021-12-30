
const jwt = require("jsonwebtoken");
const user = require("../model/userSchema");
const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyToken);
        const rootUser = await user.findOne({ _id: verifyToken._id, "tokens.token": token });
        // console.log(rootUser);
        if (!rootUser) {
            throw new Error('user not found');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();

    } catch (error) {
        res.status(401).send("unauthorized from backend");
        console.log(error);

    }

}
module.exports = Authenticate;