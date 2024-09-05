INSERT INTO lionmiss.area (id,name,country) VALUES
	 ('1','España','España');
INSERT INTO lionmiss.article (id,discolor) VALUES
	 ('1',0),
	 ('10',0),
	 ('2',0),
	 ('3',0),
	 ('4',0),
	 ('5',0),
	 ('6',0),
	 ('7',0),
	 ('8',0),
	 ('9',0);
INSERT INTO lionmiss.article_area (article,area,title,descrip,price,tax) VALUES
	 ('1','1','Falda estampada flores','Lorem ipsum dolor sit amet consectetur, adipiscing elit netus sem lacinia, faucibus orci parturient.',23.95,21.00),
	 ('10','1','Pantalón recto vestir oficina','Lorem ipsum dolor sit amet consectetur, adipiscing elit netus sem lacinia, faucibus orci parturient.',35.95,21.00),
	 ('2','1','Camisa rayas oficina','Lorem ipsum dolor sit amet consectetur, adipiscing elit netus sem lacinia, faucibus orci parturient.',30.95,21.00),
	 ('3','1','Pantalón corto country',NULL,46.95,21.00),
	 ('4','1','Chaleco elegante oficina',NULL,50.95,21.00),
	 ('5','1','Camiseta friki otaku Naruto','Lorem ipsum dolor sit amet consectetur, adipiscing elit netus sem lacinia, faucibus orci parturient.',60.95,21.00),
	 ('6','1','Vestido otoño ciudad','Lorem ipsum dolor sit amet consectetur, adipiscing elit netus sem lacinia, faucibus orci parturient.',32.95,21.00),
	 ('7','1','Camisa elástica algodón ajustada',NULL,20.95,21.00),
	 ('8','1','Vestido fiesta coctel tarde',NULL,80.95,21.00),
	 ('9','1','Pantalón largo camapana lila','Lorem ipsum dolor sit amet consectetur, adipiscing elit netus sem lacinia, faucibus orci parturient.',21.95,21.00);
INSERT INTO lionmiss.article_area_variant (article,variant,area,label) VALUES
	 ('7','blue','1','azul'),
	 ('7','green','1','verde'),
	 ('7','red','1','rojo'),
	 ('7','yellow','1','amarillo');
INSERT INTO lionmiss.article_instruct (article,instruct,descrip) VALUES
	 ('1','dry_cleaning','no'),
	 ('1','ironing','180º'),
	 ('1','spining','medium'),
	 ('1','whasing','30º'),
	 ('10','dry_cleaning','no'),
	 ('10','ironing','180º'),
	 ('10','spining','medium'),
	 ('10','whasing','30º'),
	 ('2','dry_cleaning','no'),
	 ('2','ironing','180º');
INSERT INTO lionmiss.article_instruct (article,instruct,descrip) VALUES
	 ('2','spining','medium'),
	 ('2','whasing','30º'),
	 ('3','dry_cleaning','no'),
	 ('3','ironing','180º'),
	 ('3','spining','medium'),
	 ('3','whasing','30º'),
	 ('4','dry_cleaning','no'),
	 ('4','ironing','180º'),
	 ('4','spining','medium'),
	 ('4','whasing','30º');
INSERT INTO lionmiss.article_instruct (article,instruct,descrip) VALUES
	 ('5','dry_cleaning','no'),
	 ('5','ironing','180º'),
	 ('5','spining','medium'),
	 ('5','whasing','30º'),
	 ('6','dry_cleaning','no'),
	 ('6','ironing','180º'),
	 ('6','spining','medium'),
	 ('6','whasing','30º'),
	 ('7','dry_cleaning','no'),
	 ('7','ironing','180º');
INSERT INTO lionmiss.article_instruct (article,instruct,descrip) VALUES
	 ('7','spining','medium'),
	 ('7','whasing','30º'),
	 ('8','dry_cleaning','no'),
	 ('8','ironing','180º'),
	 ('8','spining','medium'),
	 ('8','whasing','30º'),
	 ('9','dry_cleaning','no'),
	 ('9','ironing','180º'),
	 ('9','spining','medium'),
	 ('9','whasing','30º');
INSERT INTO lionmiss.article_materials (article,material,percentage) VALUES
	 ('1','cotton',80),
	 ('1','viscose',20),
	 ('10','polyester',80),
	 ('10','viscose',20),
	 ('2','cotton',100),
	 ('3','cotton',60),
	 ('3','linen',40),
	 ('4','rayon',100),
	 ('5','cotton',100),
	 ('6','viscose',100);
INSERT INTO lionmiss.article_sizes (article,`size`) VALUES
	 ('1','L'),
	 ('1','M'),
	 ('1','S'),
	 ('1','XL'),
	 ('1','XS'),
	 ('4','36'),
	 ('4','38'),
	 ('4','40'),
	 ('4','42'),
	 ('7','L');
INSERT INTO lionmiss.article_sizes (article,`size`) VALUES
	 ('7','M'),
	 ('7','S'),
	 ('7','XL');
INSERT INTO lionmiss.article_tag (article,tag) VALUES
	 ('1','bottom'),
	 ('1','female'),
	 ('1','skirt'),
	 ('10','bottom'),
	 ('10','female'),
	 ('10','long'),
	 ('10','trouser'),
	 ('2','long'),
	 ('2','male'),
	 ('2','top');
INSERT INTO lionmiss.article_tag (article,tag) VALUES
	 ('3','bottom'),
	 ('3','female'),
	 ('3','short'),
	 ('4','female'),
	 ('4','male'),
	 ('4','top'),
	 ('5','female'),
	 ('5','male'),
	 ('5','top'),
	 ('6','dress');
INSERT INTO lionmiss.article_tag (article,tag) VALUES
	 ('6','female'),
	 ('6','medium'),
	 ('7','female'),
	 ('7','long'),
	 ('7','top'),
	 ('8','dress'),
	 ('8','female'),
	 ('8','short'),
	 ('9','bottom'),
	 ('9','female');
INSERT INTO lionmiss.article_tag (article,tag) VALUES
	 ('9','long'),
	 ('9','trouser');
INSERT INTO lionmiss.article_variant (article,variant) VALUES
	 ('7','blue'),
	 ('7','green'),
	 ('7','red'),
	 ('7','yellow');
INSERT INTO lionmiss.cart (id,`user`) VALUES
	 ('1','kodeneko@user.es');
INSERT INTO lionmiss.cart_line (cart,line,article,qty) VALUES
	 ('1',1,'2',1),
	 ('1',2,'3',2);
INSERT INTO lionmiss.comment (id,`user`,article,title,`text`,rating) VALUES
	 ('1','kodeneko@user.es','8','Lorem ipsum dolor','Lorem ipsum dolor sit amet consectetur adipiscing elit, sed congue conubia at suspendisse mus turpis dignissim, quam penatibus est facilisi ante pharetra. Erat fusce tristique odio nec vulputate volutpat, blandit bibendum semper nunc lacus imperdiet eros, integer ridiculus nascetur dui nisl.',4);
INSERT INTO lionmiss.comment_pics (comment,pic) VALUES
	 ('1','20120419130822.png');
INSERT INTO lionmiss.instruct (name) VALUES
	 ('dry_cleaning'),
	 ('ironing'),
	 ('spining'),
	 ('whasing');
INSERT INTO lionmiss.measures (id,`user`,shoulder,chest,waist,hips,foot,height,weight,unitsHeight,unitsWeight) VALUES
	 ('1','kodeneko@user.es',42,96,78,100,42,177,66,'cm','kg');
INSERT INTO lionmiss.shipping (id,idTracking,idPayment,payment) VALUES
	 ('1','222-333-444','555-666-7777','card');
INSERT INTO lionmiss.tag (name) VALUES
	 ('bottom'),
	 ('dress'),
	 ('female'),
	 ('long'),
	 ('male'),
	 ('medium'),
	 ('shirt'),
	 ('short'),
	 ('skirt'),
	 ('top');
INSERT INTO lionmiss.tag (name) VALUES
	 ('trouser');
INSERT INTO lionmiss.`user` (email,userName,bday,sex) VALUES
	 ('kodeneko@user.es','kdoeneko','1990-09-18','female'),
	 ('test@test.es','test','1990-01-12','male');
INSERT INTO lionmiss.user_favs (`user`,article) VALUES
	 ('kodeneko@user.es','1'),
	 ('kodeneko@user.es','8');
