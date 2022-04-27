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
  return db.createTable('nfts_traits', {
    id: {
      type: 'int',
      unsigned: 'true',
      primaryKey: true,
      autoIncrement: true
    },
    trait_id:
    {
      type: 'int',
      unsigned: 'true',
      notNull: true,
      foreignKey: {
        name: 'nfts_traits_trait_fk',
        table: 'traits',
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
        name: 'nfts_traits_nft_fk',
        table: 'nfts',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
  })
};

exports.down = function (db) {
  return db.dropTable('nfts_traits');
};

exports._meta = {
  "version": 1
};
