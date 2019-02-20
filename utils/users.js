class Users {
    constructor() {
        this.users = [];
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var usersNames = users.map((user) => user.name);
        return usersNames;
    }
}

module.exports = { Users };