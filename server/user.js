const db = require('./DB/db.js');

class User {
    constructor(data) {
        this.data = {
            login: data.login,
            password: data.password,
            email: data.email
        }
    }

    async SaveUser() {
        let isLoginUnique = await db.isUnique('users', 'login', this.data.login);
        let isEmailUnique = await db.isUnique('users', 'login', this.data.email);

        if (!isLoginUnique) throw new Error('This login is already taken.');
        if (!isEmailUnique) throw new Error('This email is already registered.');

        return await db.save('users', this.data);
    }

    static async Login(login, password) {
        const user = await db.find('users', 'login', login);
        if (user && user.password === password) {
            user.status = (user.login === 'admin') ? 'admin' : 'user';
            return user;
        } else {
            return null;
        }
    }
    
    static async FindUser(login) {
        const user = await db.find('users', 'login', login);
        if (user) {
            return user;
        } else {
            return null;
        }
    }
}

module.exports = User;