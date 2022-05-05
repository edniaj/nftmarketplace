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
  return db.createTable('deposits', {
    id: {
      type: 'int',
      unsigned: 'true',
      primaryKey: true,
      autoIncrement: true
    },
    nft_id:
    {
      type: 'int',
      unsigned: 'true',
      notNull: true,
      foreignKey: {
        name: 'deposits_nfts_fk',
        table: 'nfts',
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
      unqiue:true,
      foreignKey: {
        name: 'deposits_users_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    datetime: {
      type: 'bigint',
      notNull: true
    },
    txHash: {
      type: 'string',
      length: 250,
      notNull: true
    },
    depositApproved: {
      type: 'string',
      length: 5,
      notNull: false
    }
  });
};

exports.down = function (db) {
  return db.dropTable('deposits');
};

exports._meta = {
  "version": 1
};
