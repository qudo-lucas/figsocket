const jwt = require("jsonwebtoken");
const secret = "fig socken secret secret";

function sign(data) {
    return new Promise((resolve, reject) => {
        jwt.sign(data, secret,(err, token) => {
            if(!err) {
                resolve(token);
            } else {
                reject(err);
            }
        });
    });
}

function verify(token = "") {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if(!err) {
                resolve(decoded);
            } else {
                reject(err);
            }
        });
    });
}

module.exports = {
    sign,
    verify,
};