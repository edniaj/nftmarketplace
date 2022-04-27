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

exports.up = function (db) {
  return db.createTable('collections', {
    id: {
      type: 'int',
      unsigned: 'true',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: "string",
      length: 100,
      notNull: true
    },
    address: {
      type: "string",
      length: 50,
      notNull: true
    },
    baseTokenUri: {
      type: "string",
      length: 250,
      notNull: true
    },
    supply: {
      type: "int",
      unsigned: true
    },
    profileUrl: {
      type: "string",
      length: 250
    },
    bannerUrl: {
      type: "string",
      length: 250
    },
    collectionApproved: {
      type: "boolean",
      notNull: true
    }
  }
  );

};

exports.down = function (db) {
  return db.dropTable('collections');
};


exports._meta = {
  "version": 1
};
