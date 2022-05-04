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
  return db.createTable('auctionGroups', {
    id: {
      type: 'int',
      unsigned: 'true',
      primaryKey: true,
      autoIncrement: true
    },

    startDateTime: {
      type: 'bigint',
      notNull: true
    },
    endDateTime: {
      type: 'bigint',
      notNull: true
    },
  });
};

exports.down = function (db) {
  return db.dropTable("auctionGroups");
};

exports._meta = {
  "version": 1
};
