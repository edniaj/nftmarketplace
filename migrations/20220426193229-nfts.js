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
  return db.createTable('nfts', {
    id: {
      type: 'int',
      unsigned: 'true',
      primaryKey: true,
      autoIncrement: true
    },
    tokenId: {
      type: "integer",
      unsigned: true,
      notNull: true
    },
    // status will show if its listed, in auction, launchpad or none
    status: {
      type: 'string',
      length: 100,
      notNull: true
    }, 
    collectionId:
    {
      type: 'int',
      unsigned: true,
      length: 10,
      notNull: true,
      foreignKey: {
        name: 'collectionts_nfts_fk',
        table: 'collections',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          collectionId: 'id'
        }
      }
    }

  });
};

exports.down = function (db) {
  return db.dropTable('nfts');
};

exports._meta = {
  "version": 1
};
