module.exports = {
    User: class {
        id = "";
        uname = "";
        password = "";
        email = "";
        role = "";
        valid = false;
        constructor(id, uname, password, email, role) {
            this.id = id;
            this.uname = uname;
            this.password = password;
            this.email = email;
            this.role = role;
        }
    }
}
