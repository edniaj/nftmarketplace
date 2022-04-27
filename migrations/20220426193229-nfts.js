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
  return db.createTable('nfts', {
    id: {
      type: 'int',
      unsigned: 'true',
      primaryKey: true,
      autoIncrement: true
    },
    tokenId: {
      type: "int",
      unsigned: true,
      notNull: true
    },
    // status will show if its listed, in auction, launchpad or none
    status: {
      type: 'string',
      length: 100,
      notNull: true
    },
    collection_id:
    {
      type: 'int',
      unsigned: 'true',
      notNull: true,
      foreignKey: {
        name: 'collections_nfts_fk',
        table: 'collections',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    user_id:
    {
      type: 'int',
      unsigned: 'true',
      notNull: true,
      foreignKey: {
        name: 'nfts_users_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },

  });
};

exports.down = function (db) {
  // await db.removeForeignKey('nfts', 'collections_nfts_fk')
  // await db.removeColumn('nfts', 'collection_id')
  return db.dropTable('nfts');
};

exports._meta = {
  "version": 1
};
