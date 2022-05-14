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
  await db.insert('users',
    ['username', 'password', 'walletAddress'],
    ['admin', 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=', '0xdB367A4ff8F136A9c1722E2C512110C2F1Bd0CE4'])

  await db.insert('users',
    ['username', 'password', 'walletAddress'],
    ['Tom', 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=', '0x4d34b0eEb44D334fC00dA400e1E26FeEA6133793'])

  await db.insert('users',
    ['username', 'password', 'walletAddress'],
    ['Tan Ah Gao', 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=', '0xD22830CE924277566138fa82779708B7f28c931e'])

  await db.insert('collections',
    ['name', 'address', 'baseTokenUri', 'supply', 'profileUrl', 'bannerUrl', `description`, 'collectionApproved'],
    ['Moonbird',
      '0x23581767a106ae21c074b2276d25e5c3e136a68b',
      'https://live---metadata-5covpqijaa-uc.a.run.app/metadata/',
      9999,
      'https://lh3.googleusercontent.com/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75=s130',
      'https://lh3.googleusercontent.com/ouzjfA0LotbHC92vuDph9JDeg7Z4ZFo12Pr9GJpfSAZSrnXDOubJn0eTvinwzUTPsWhnLLq5ocjcDSrpNV0_MYIjueVJrzFlE6p0=h200',
      `A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-powered traits. What's more, each Moonbird unlocks private club membership and additional benefits the longer you hold them. We call it nesting - because, obviously.`,
      false])

  await db.insert('collections',
    ['name', 'address', 'baseTokenUri', 'supply', 'profileUrl', 'bannerUrl', `description`, 'collectionApproved'],
    ['Bored Ape Yatch Club',
      '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      'https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/',
      9999,
      'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130',
      'https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h200',
      `The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.`,
      false])

  await db.insert('collections',
    ['name', 'address', 'baseTokenUri', 'supply', 'profileUrl', 'bannerUrl','description', 'collectionApproved'],
    ['Azuki',
      '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      'https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/',
      9999,
      'https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s130',
      'https://lh3.googleusercontent.com/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A=h200',
      `Take the red bean to join the garden. View the collection at azuki.com/gallery.\n
      Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.\n
      We rise together. We build together. We grow together.`,
      false])
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
