var assert = require('assert');
var straight_line = require('../linearPoint.js')

describe('Tests for straight_line function', () => {
    describe('Test Case 1 #straight_line()', () => {
        it('it should return 6, for 2 * 1 + 4', () => {
            assert.equal(straight_line(2, 1, 4), 6);

        });
    });
    describe('Test Case 2 #straight_line()', () => {
        it('it should return 4, for 2 * 0 + 4', () => {
            assert.equal(straight_line(2, 0, 4), 4);
        });
    });
    describe('Test Case 3 #straight_line()', () => {
        it('it should return 4, for 2 * 0 + 4', () => {
            assert.equal(straight_line(2, -1, 4), 2);
        });
    });
});