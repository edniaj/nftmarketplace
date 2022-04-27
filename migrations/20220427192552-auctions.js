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
  return db.createTable('auctions', {
    id: {
      type: 'int',
      unsigned: 'true',
      primaryKey: true,
      autoIncrement: true
    },
    user_id:
    {
      type: 'int',
      unsigned: 'true',
      notNull: true,
      foreignKey: {
        name: 'auctions_users_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    nft_id:
    {
      type: 'int',
      unsigned: 'true',
      notNull: true,
      foreignKey: {
        name: 'auctions_nfts_fk',
        table: 'nfts',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    datetime: {
      type: 'timestamp',
      notNull: true
    },
    minBidAmount: {
      type: 'decimal',
      notNull: true
    },
    bidInterval: {
      type: 'decimal',
      notNull: true
    },
    startDateTime: {
      type: 'timestamp',
      notNull: true
    },
    endDateTime: {
      type: 'timestamp',
      notNull: true
    },
  });
};

exports.down = function (db) {
  return db.dropTable('auctions');
};

exports._meta = {
  "version": 1
};
