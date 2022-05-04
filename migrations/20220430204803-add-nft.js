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
  await db.insert('nfts',
    ['tokenId', 'collection_id', 'user_id', 'status', 'imageUrl'],
    [1, 1, 2, 'notListed', 'https://live---metadata-5covpqijaa-uc.a.run.app/images/1'])

  await db.insert('nfts',
    ['tokenId', 'collection_id', 'user_id', 'status', 'imageUrl'],
    [5000, 1, 3, 'notListed', 'https://live---metadata-5covpqijaa-uc.a.run.app/images/5000'])

  await db.insert('deposits',
    ['user_id', 'nft_id', 'datetime', 'txHash', 'depositApproved'],
    [2, 1, 1651352437443, 'https://etherscan.io/tx/0xa4a8c2d6b3448480269e5ad0d7747124c64c18587f75141c564a161ea7eb86af', 'false'])

  await db.insert('deposits',
    ['user_id', 'nft_id', 'datetime', 'txHash', 'depositApproved'],
    [2, 2, 1651352437450, 'https://etherscan.io/tx/0xfc3ce8bcf67b05fa1e1b3addf6435489598312c050b9122f4734263d3ec9cda3', 'false'])
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
