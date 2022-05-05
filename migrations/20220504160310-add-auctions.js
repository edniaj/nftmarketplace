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

  await db.insert('auctionGroups',
    ['startDateTime', 'endDateTime', 'name'],
    [1651680842, 1651690842, 'Azuki bundle sale'])

  await db.insert('auctionGroups',
    ['startDateTime', 'endDateTime', 'name'],
    [1651680845, 1651695842, 'BAYC HOT SALE 50% DISCOUNT'])

  await db.insert('auctionGroups',
    ['startDateTime', 'endDateTime', 'name'],
    [1651780842, 1652690842, 'MOONBIRD BESTSELLERS'])

  await db.insert('auctions',
    ['nft_id', 'auctionGroup_id', 'user_id', 'minBidAmount', 'bidInterval'],
    [1, 3, 3, 500, 50])

  await db.insert('auctions',
    ['nft_id', 'auctionGroup_id', 'user_id', 'minBidAmount', 'bidInterval'],
    [2, 3, 3, 500, 50])

  

};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
