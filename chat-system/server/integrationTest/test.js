var assert = require('assert');
var app = require('../server.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('Server test', function() {
    // The function passed to before() is called before running the test cases.
    before(function() {
        console.log("before test");
    });

    // The function passed to after() is called after running the test cases.
    after(function() {
        console.log("after test");
    });
    // Create Group Tests
    describe('Test 1.1 /api/create_group', () => {
        it('it should create a new group in "groups"', (done) => {
            chai.request(app).post('/api/create_group').type('form').send({'groupName':"NewGroup"})
                .end((err, res) => {
                    res.body.saved.should.be.true;
                    done();
                });
        });
    });
    describe('Test 1.2 /api/create_group', () => {
        it('it should fail to add a new group (name already exists)', (done) => {
            chai.request(app).post('/api/create_group').type('form').send({'groupName':"NewGroup"})
                .end((err, res) => {
                    res.body.saved.should.be.false;
                    done();
                });
        });
    });
    // Create Room Tests
    describe('Test 2.1 /api/create_room', () => {
        it('it should create a new room in "rooms"', (done) => {
            chai.request(app).post('/api/create_room').type('form').send({'groupID':3, 'roomName':"newRoom"})
                .end((err, res) => {
                    res.body.saved.should.be.true;
                    done();
                });
        });
    });
    describe('Test 2.2 /api/create_room', () => {
        it('it should fail to add a new room (name already exists)', (done) => {
            chai.request(app).post('/api/create_room').type('form').send({'groupID':3, 'roomName':"newRoom"})
                .end((err, res) => {
                    res.body.saved.should.be.false;
                    res.body.exists.should.be.true;
                    done();
                });
        });
    });
    // Create User Tests
    describe('Test 3.1 /api/create_user', () => {
        it('it should create a new user in "users"', (done) => {
            chai.request(app).post('/api/create_user').type('form').send({'userName':"intTest", 'password':"intTest", 'email':"intTest@gmail", 'role':"stdUser"})
                .end((err, res) => {
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
    describe('Test 3.2 /api/create_user', () => {
        it('it should fail to add a new user (name already exists)', (done) => {
            chai.request(app).post('/api/create_user').type('form').send({'userName':"intTest", 'password':"intTest", 'email':"intTest@gmail", 'role':"stdUser"})
                .end((err, res) => {
                    res.body.success.should.be.false;
                    res.body.exists.should.be.true;
                    done();
                });
        });
    });
    // Invite User to Room Tests
    describe('Test 4.1 /api/invite_user', () => {
        it('it should invite a user to a room', (done) => {
            chai.request(app).post('/api/invite_user').type('form').send({'userName':"intTest", 'groupName':"NewGroup", 'roomID':0})
                .end((err, res) => {
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
    describe('Test 4.2 /api/invite_user', () => {
        it('it should fail to invite user (user already in room)', (done) => {
            chai.request(app).post('/api/invite_user').type('form').send({'userName':"intTest", 'groupName':"NewGroup", 'roomID':0})
                .end((err, res) => {
                    res.body.success.should.be.false;
                    res.body.exists.should.be.true;
                    done();
                });
        });
    });
    // Upgrade User to Assis Tests
    describe('Test 5.1 /api/upgrade_to_ass', () => {
        it('it should set the user to be a group assis within specified group', (done) => {
            chai.request(app).post('/api/upgrade_to_ass').type('form').send({'userName':"intTest", 'groupName':"NewGroup"})
                .end((err, res) => {
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
    describe('Test 5.2 /api/upgrade_to_ass', () => {
        it('it should fail to set user to group assis (user not in group)', (done) => {
            chai.request(app).post('/api/upgrade_to_ass').type('form').send({'userName':"super", 'groupName':"NewGroup"})
                .end((err, res) => {
                    res.body.success.should.be.false;
                    res.body.exists.should.be.false;
                    done();
                });
        });
    });
    // Upgrade User's Role Tests
    describe('Test 5.1 /api/upgrade_user', () => {
        it('it should upgrade users role to be SuperAdmin', (done) => {
            chai.request(app).post('/api/upgrade_user').type('form').send({'userName':"intTest", 'role':"SuperAdmin"})
                .end((err, res) => {
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
    describe('Test 5.2 /api/upgrade_user', () => {
        it('it should fail to upgrade users role to GroupAdmin (role already SuperAdmin)', (done) => {
            chai.request(app).post('/api/upgrade_user').type('form').send({'userName':"intTest", 'role':"GroupAdmin"})
                .end((err, res) => {
                    res.body.success.should.be.false;
                    res.body.exists.should.be.true;
                    done();
                });
        });
    });
    // Remove User from Room Tests
    describe('Test 6.1 /api/remove_user', () => {
        it('it should remove user from room', (done) => {
            chai.request(app).post('/api/remove_user').type('form').send({'userName':"intTest", 'groupName':"NewGroup", 'roomID':0})
                .end((err, res) => {
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
    describe('Test 6.2 /api/remove_user', () => {
        it('it should fail remove user from room (user not in room)', (done) => {
            chai.request(app).post('/api/remove_user').type('form').send({'userName':"intTest", 'groupName':"NewGroup", 'roomID':0})
                .end((err, res) => {
                    res.body.success.should.be.false;
                    res.body.exists.should.be.false;
                    done();
                });
        });
    });
    // Remove Room from Rooms Tests
    describe('Test 7.1 /api/remove_room', () => {
        it('it should remove room from rooms', (done) => {
            chai.request(app).post('/api/remove_room').type('form').send({'groupID':3, 'groupName':"NewGroup", 'roomName':"newRoom"})
                .end((err, res) => {
                    res.body.removed.should.be.true;
                    done();
                });
        });
    });
    describe('Test 7.2 /api/remove_room', () => {
        it('it should fail remove room from rooms (room not in rooms)', (done) => {
            chai.request(app).post('/api/remove_room').type('form').send({'groupID':3, 'groupName':"NewGroup", 'roomName':"newRoom"})
                .end((err, res) => {
                    res.body.removed.should.be.false;
                    done();
                });
        });
    });
    // Remove Group from Groups Tests
    describe('Test 8.1 /api/remove_group', () => {
        it('it should remove group from groups', (done) => {
            chai.request(app).post('/api/remove_group').type('form').send({'_id':"6166c8a54f7863d5899ae32e"})
                .end((err, res) => {
                    res.body.removed.should.be.true;
                    done();
                });
        });
    });
    describe('Test 8.2 /api/remove_group', () => {
        it('it should respond 400 as no doc is passed', (done) => {
            chai.request(app).post('/api/remove_group').type('form').send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    // Login Tests
    describe('Test 9.1 /api/auth', () => {
        it('it should successfully login', (done) => {
            chai.request(app).post('/api/auth').type('form').send({'uname':"intTest", 'password':"intTest"})
                .end((err, res) => {
                    res.body.valid.should.be.true;
                    done();
                });
        });
    });
    describe('Test 9.2 /api/auth', () => {
        it('it should fail to login', (done) => {
            chai.request(app).post('/api/auth').type('form').send({'uname':"intTest", 'password':"wrongPassword"})
                .end((err, res) => {
                    res.body.valid.should.be.false;
                    done();
                });
        });
    });
    // Group Info Tests
    describe('Test 10. /api/group_info', () => {
        it('it should get all rooms in the group', (done) => {
            chai.request(app).post('/api/group_info').type('form').send({'id':0})
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    // Load Group Users Tests
    describe('Test 11. /api/load_group_users', () => {
        it('it should get all the users and what rooms they belong to', (done) => {
            chai.request(app).post('/api/load_group_users').type('form').send({'name':"Group1"})
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    // Get Groups Tests
    describe('Test 12. /api/groups', () => {
        it('it should get all groups', (done) => {
            chai.request(app)
                .get('/api/groups')
                .end((err, res) => {
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});