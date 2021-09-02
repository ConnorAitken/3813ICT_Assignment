module.exports = {
    Group: class {
        id = "";
        name = "";
        numOfRooms = "";
        numOfUsers = "";
        constructor(id, name, numOfRooms, numOfUsers) {
            this.id = id;
            this.name = name;
            this.numOfRooms = numOfRooms;
            this.numOfUsers = numOfUsers;
        }
    }
}