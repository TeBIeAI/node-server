const jwt = require('jsonwebtoken');

class BaseComponent {
    constructor() { }

    static key = "hanchao"

    getToken = (userObj) => {
        const token = jwt.sign(userObj, this.key, {
            expiresIn: 180,//3分钟过期
            //algorithm: 'RS256'//加密算法
        });
    }

    token = (token) => {
        //解码
        jwt.verify(token, this.key, function (err, decoded) {
            console.log(err)
            console.log(decoded)
        })
    }
}
