const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password){
    return await bcrypt.hash(password, saltRounds);
}

async function CheckHash(password, hash){
    return await bcrypt.compare(password, hash);
}

module.exports = {
    hashPassword,
    CheckHash
}