insert into `map` (name, emoji, full_disclosure, member_id) values ('first map', 'U+1F600', true, 1);
insert into `map` (name, emoji, full_disclosure, member_id) values ('second map', 'U+1F600', false , 1);
insert into `category` (name, color, map_id) values ('first category', '#FFFFFF', 1);
insert into `category` (name, color, map_id) values ('second category', '#FFFFFF', 1);
insert into `category` (name, color, map_id) values ('private category', '#FFFFFF', 2);
insert into `place` (name, address, latitude, longitude, description, detail_link, map_id, category_id, member_id) values ('starbucks', 'my hometown', 127.0123, 37.0000000000000, 'first place', 'https://kakaomap', 1, 1, 1);
insert into `place` (name, address, latitude, longitude, description, detail_link, map_id, category_id, member_id) values ('star', 'visited yesterday', 127.00, 37.000, 'second place', 'https://kakaomap', 1, 1, 1);
insert into `member` (nickname, profile_image, email, resource_server) values ('nickname', 'image', 'email', 'GITHUB');
insert into `member` (nickname, profile_image, email, resource_server) values ('nickname2', 'image2', 'email2', 'NAVER');
insert into `member` (nickname, profile_image, email, resource_server) values ('nickname3', 'image3', 'email3', 'NAVER');
insert into `member` (nickname, profile_image, email, resource_server) values ('nickname4', 'image4', 'email4', 'GITHUB');
insert into `group_member` (map_id, member_id, permission_level) values (1, 1, 'HOST');
insert into `group_member` (map_id, member_id, permission_level) values (2, 1, 'HOST');
insert into `group_member` (map_id, member_id, permission_level) values (1, 2, 'MAINTAIN');
insert into `group_member` (map_id, member_id, permission_level) values (1, 3, 'READ');
insert into `comment` (member_id, place_id, content, written_at, modified_at) values (1, 1, "It's Good", NOW(), NOW());
insert into `comment` (member_id, place_id, content, written_at, modified_at) values (2, 1, "It's my favorite place", NOW(), NOW());
insert into `comment` (member_id, place_id, content, written_at, modified_at) values (3, 1, "umm... so so", NOW(), NOW());

