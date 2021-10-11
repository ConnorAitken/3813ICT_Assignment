module.exports = {
    Room: class {
        groupID = -1;
        roomID = -1;
        name = "";
        constructor(groupID, roomID, name, numOfUsers) {
            this.groupID = groupID;
            this.roomID = roomID;
            this.name = name;
        }
    }
}
