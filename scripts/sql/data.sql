INSERT INTO lionmiss.article (id,discolor) VALUES
	 ('1',0),
	 ('2',0);
INSERT INTO lionmiss.tag (name) VALUES
	 ('female'),
	 ('dress'),
	 ('short'),
	 ('summer'),
	 ('shirt'),
	 ('pants'),
	 ('winter');
INSERT INTO lionmiss.article_tag (article,tag) VALUES
	 ('1','female'),
	 ('1','dress'),
	 ('1','short'),
	 ('1','summer'),
	 ('2','female'),
	 ('2','shirt'),
	 ('2','pants'),
	 ('2','winter');
INSERT INTO lionmiss.article_materials (article,material,percentage) VALUES
	 ('1','cotton', 30),
	 ('1','rayon', 70),
	 ('2','cotton', 80),
	 ('2','nylon', 20);
INSERT INTO lionmiss.instruct (name) VALUES
	 ('dryCleanning'),
	 ('ironning'),
	 ('spinning'),
	 ('washing');
INSERT INTO lionmiss.article_instruct (article,instruct,descrip) VALUES
	 ('1','washing','30º'),
	 ('1','ironning','180º'),
	 ('1','spinning','1000'),
	 ('1','dryCleanning','no'),
	 ('2','washing','20º'),
	 ('2','ironning','no'),
	 ('2','spinning','800'),
	 ('2','dryCleanning','no');
INSERT INTO lionmiss.article_variant (id,article,name) VALUES
	 ('1','1','red'),
	 ('2','1','black'),
	 ('3','2','yellow');
INSERT INTO lionmiss.article_variant_sizes (variant,size,qty) VALUES
	('1','S',3),
	('1','M',56),
	('1','L',2),
	('1','XL',23),

	('2','S',12),
	('2','M',13),
	('2','L',3),
	('2','XL',20),

	('3','S',3),
	('3','M',56),
	('3','L',2),
	('3','XL',23);
INSERT INTO lionmiss.area (id,name,country,locale,currency,dateFormat,gen) VALUES
		('1','spanish', 'Spain', 'es-ES', '€', 'dd/mm/yyyy', true),
		('2','englishUK', 'United Kingdom', 'en-GB', '£', 'mm/dd/yyyy', true),
		('3','englishUSA', 'USA', 'en-GUS', '$', 'mm/dd/yyyy', false);
INSERT INTO lionmiss.article_area (id,article,title,descrip,price,tax,area) VALUES
	 ('1','1','Vestido noche verano','Lorem ipsum dolor sit amet consectetur adipiscing elit vulputate ultrices potenti conubia convallis.',33.95,21,'1'),
	 ('2','1','Black night summer dress','Lorem ipsum dolor sit amet consectetur adipiscing elit vulputate ultrices potenti conubia convallis.',33.95,21,'2'),
	 ('3','2','Camiseta invierno cálida','Lorem ipsum dolor sit amet consectetur adipiscing elit vulputate ultrices potenti conubia convallis.',33.95,21,'1'),
	 ('4','2','Warm yellow shirt','Lorem ipsum dolor sit amet consectetur adipiscing elit vulputate ultrices potenti conubia convallis.',33.95,21,'2');
INSERT INTO lionmiss.article_area_variant (article_area,variant,translation) VALUES
	 ('1','1', 'Rojo'),
	 ('1','2', 'Negro'),
   ('2','1', 'Red'),
	 ('2','2', 'Black'),
	 ('3','3', 'Negro'),
	 ('4','3', 'Black');

	 INSERT INTO lionmiss.cart (id) VALUES
	 ('1');
INSERT INTO lionmiss.cart_line (cart,orderr,article,qty) VALUES
	('1','1','1',2),
	('1','2','2',1);
INSERT INTO lionmiss.measures (id, shoulder, chest,waist,hips,foot,height,weight,unitsHeight,unitsWeight) VALUES
	 ('1',41,96,76,100,42,174,64,'cm','kg');
INSERT INTO lionmiss.user (id,userName,pass,salt,email,bday,sex,area,measures,cart) VALUES
	 ('1','kodeneko','pass','salt','kodeneko@mail.com','1990-09-18T23:15:00+00:00','female','1','1','1');

INSERT INTO lionmiss.comment (id,user,article,title,text,rating) VALUES
	 ('1','1','1','Incididunt deserunt','Incididunt incididunt magna excepteur nisi officia culpa aliqua',3),
	 ('2','1','2','Excepteur et officia','Anim eiusmod occaecat velit qui ullamco Lorem amet ullamco. Ipsum aliquip proident esse aliquip quis labore aliquip amet. Consectetur exercitation ut sint dolor consequat non enim sit esse voluptate veniam aute tempor.',4);
INSERT INTO lionmiss.picture (id,ext,src,alt) VALUES
	 ('1','png','path/path', 'Aute laborum id dolor duis ipsum anim veniam consequat nulla voluptate voluptate consectetur ipsum magna.'),
	 ('2','png','path/path', 'Qui dolore commodo elit eu pariatur proident.'),
	 ('3','png','path/path', 'Nisi adipisicing fugiat tempor tempor irure nisi non proident.'),
	 ('4','png','path/path', 'Occaecat commodo consequat consectetur officia irure consequat.'),
	 ('5','png','path/path', 'Cillum cupidatat aute non occaecat cupidatat do officia laboris occaecat.');
INSERT INTO lionmiss.picture_article (article,picture) VALUES
	 ('1','1'),
	 ('1','2'),
	 ('2','3'),
	 ('2','4');
INSERT INTO lionmiss.picture_comment (comment,picture) VALUES
	 ('1','5');
INSERT INTO lionmiss.address (id,user,alias,name,surname,address,city,state,country,phone,obs) VALUES
	 ('1','1','Casa','Elena','Nito del Bosque','Amapola 2','Flowerland','Pretty Forest','Spain','4444444','Do irure occaecat ad velit esse ipsum deserunt adipisicing culpa');
INSERT INTO lionmiss.user_favs (user,article) VALUES
	 ('1','1');
INSERT INTO lionmiss.shipping (id,user,idTracking,idPayment,payment) VALUES
	 ('1','1','11-111-111','23999878222221','crypto'),
	 ('2','1','22-222-222','23999878242399987829992122221','card');
INSERT INTO lionmiss.shipping_state (id,shipping,date,status) VALUES
	 ('1','1',"2021-02-25 10:03:46",'order_recieved'),
	 ('2','1',"2021-02-25 10:03:46",'processing'),
	 ('3','2',"2021-02-25 10:03:46",'order_recieved'),
	 ('4','2',"2021-02-25 10:03:46",'processing');
INSERT INTO lionmiss.shipping_line (orderr,shipping,article,qty) VALUES
	 ('1','1','1',2),
	 ('1','2','1',1),
	 ('2','2','2',3);
