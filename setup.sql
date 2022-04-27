insert into collections (name, address, baseTokenUri, supply, profileUrl, bannerUrl, collectionApproved) values ('cryptopunk', '0xdead','lala', 10000 ,'testimage' ,'test2image'  ,false);
select * from collections;
insert into nfts (tokenId, status, collection_id) values (133,'listing',1);
select * from nfts;