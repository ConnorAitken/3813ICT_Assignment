module.exports = {
    Room: class {
        groupID = -1;
        roomID = -1;
        name = "";
        numOfUsers = -1;
        constructor(groupID, roomID, name, numOfUsers) {
            this.groupID = groupID;
            this.roomID = roomID;
            this.name = name;
            this.numOfUsers = numOfUsers;
        }
    }
}
