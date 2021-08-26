module.exports = {
    User: class {
        id = "";
        uname = "";
        bdate = "";
        age = "";
        email = "";
        upwd = "";
        valid = false;
        constructor(id, uname, bdate, age, email, upwd) {
            this.id = id;
            this.uname = uname;
            this.bdate = bdate;
            this.age = age;
            this.email = email;
            this. upwd = upwd;
        }
    }
}
