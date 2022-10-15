const express = require('express');
const multer = require('multer');
const { isAuth, isAdmin } = require('../utils');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/images/');
    },
    filename(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const uploadRouter = express.Router();

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    res.status(201).send({ image: `${req.file.originalname}` });
});

module.exports = uploadRouter;