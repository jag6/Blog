import jwt from "jsonwebtoken";
import config from "./config";

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            isAdmin: user.isAdmin
        },
        config.JWT_SECRET
    )
};

export const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken) {
        res.status(401).send({ message: 'Token has not been supplied' });
    }else {
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, config.JWT_SECRET, (err, data) => {
            if(err) {
                res.status(401).send({ message: 'Invalid Token' });
            }else {
                req.user = data;
                next();
            }
        })
    }
};

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    }else {
        res.status(401).send({ message: 'Token not valid for admin user' })
    }
};