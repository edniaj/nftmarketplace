'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {


  await db.insert('launchpads',
    ['user_id', 'nft_id', 'startDateTime', 'amount'],
    [1, 1, 1651710869, 5000])


};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
