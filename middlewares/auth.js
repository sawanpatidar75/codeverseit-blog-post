const userModel = require("../models/userModel");

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        token = token.split(' ')[1]
        const secretKey = process.env.JWT_SECRET;

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    return res.status(403).json({ message: "Session Time Out", token });
                }
                return res.status(401).json({ message: "Unauthorized", token });
            } else {
                req.decoded = decoded
                const userDetails = await userModel.findById(decoded.id);
                if (!userDetails) {
                    return next(new ErrorHandler('User not found', 404, null));
                }
                req.user = userDetails;
                next()
            }
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};