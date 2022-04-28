'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.insert('users',
  ['username', 'password', 'walletAddress'],
  ['admin', 'test', '0x00000000003b413a8c1dea7c80fac2f3f7536a7d'])

};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
