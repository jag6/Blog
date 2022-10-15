const express = require('express');
const User = require('../models/userModel');

const contactRouter = express.Router();


contactRouter.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/')
});


module.exports = contactRouter;