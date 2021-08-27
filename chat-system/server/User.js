module.exports = {
    User: class {
        id = "";
        uname = "";
        email = "";
        role = "";
        valid = false;
        constructor(id, uname, email, role) {
            this.id = id;
            this.uname = uname;
            this.email = email;
            this. role = role;
        }
    }
}
