"use strict";
const validarJTW = (req, res, next) => {
    const token = req.header('x-token');
    console.log(token);
    next();
};
module.exports = {
    validarJTW
};
