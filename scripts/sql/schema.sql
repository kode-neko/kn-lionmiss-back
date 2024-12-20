USE lionmiss;

CREATE TABLE article(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	discolor BOOL NOT NULL
);
CREATE TABLE tag(
	name VARCHAR(50) PRIMARY KEY
);
CREATE TABLE article_tag(
	article MEDIUMINT UNSIGNED NOT NULL,
	tag VARCHAR(25) NOT NULL,
	
	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	FOREIGN KEY (tag) REFERENCES tag(name)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(article, tag)
);
CREATE TABLE article_materials(
	article MEDIUMINT UNSIGNED NOT NULL,
	material VARCHAR(50) NOT NULL,
	percentage INT(3) NOT NULL,
	
	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(article, material)
);
CREATE TABLE instruct(
	name VARCHAR(25) PRIMARY KEY
);
CREATE TABLE article_instruct(
	article MEDIUMINT UNSIGNED NOT NULL,
	instruct VARCHAR(25) NOT NULL,
    descrip VARCHAR(25) NOT NULL, 
	
	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	FOREIGN KEY (instruct) REFERENCES instruct(name)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(article, instruct)
);
CREATE TABLE article_variant(
	id MEDIUMINT UNSIGNED NOT NULL,
	article MEDIUMINT UNSIGNED NOT NULL,
	name VARCHAR(100) NOT NULL,

	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,

	PRIMARY KEY(id)
);
CREATE TABLE article_variant_sizes(
	variant MEDIUMINT UNSIGNED NOT NULL,
	size CHAR(10) NOT NULL,
	qty INT NOT NULL,

	FOREIGN KEY (variant) REFERENCES article_variant(id) 
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(variant, size)
);
CREATE TABLE area(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	country VARCHAR(100) NOT NULL,
	locale CHAR(6) NOT NULL,
	currency CHAR(1) NOT NULL,
	dateFormat VARCHAR(50) NOT NULL,
	gen BOOLEAN NOT NULL
);
CREATE TABLE article_area(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	article MEDIUMINT UNSIGNED NOT NULL,
	title TINYTEXT NOT NULL,
	descrip TEXT,
	price DECIMAL(6,2) NOT NULL,
	tax DECIMAL(4, 2) NOT NULL,
	area MEDIUMINT UNSIGNED NOT NULL,
	
	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	FOREIGN KEY (area) REFERENCES area(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	UNIQUE KEY (article, area)
);
CREATE TABLE article_area_variant(
	article_area MEDIUMINT UNSIGNED NOT NULL,
	variant MEDIUMINT UNSIGNED NOT NULL,
	translation VARCHAR(100) NOT NULL,
	
	FOREIGN KEY (article_area) REFERENCES article_area(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	FOREIGN KEY (variant) REFERENCES article_variant(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(article_area, variant)
);

CREATE TABLE cart(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE cart_line(
	cart MEDIUMINT UNSIGNED NOT NULL,
	orderr TINYINT NOT NULL,
	article MEDIUMINT UNSIGNED NOT NULL,
	qty TINYINT(2) NOT NULL,

	FOREIGN KEY (cart) REFERENCES cart(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(orderr, cart, article)
);
CREATE TABLE measures(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	shoulder TINYINT(23) UNSIGNED,
	chest TINYINT(23) UNSIGNED,
	waist TINYINT(23) UNSIGNED,
	hips TINYINT(23) UNSIGNED,
	foot TINYINT(23) UNSIGNED,
	height TINYINT(23) UNSIGNED,
	weight TINYINT(23) UNSIGNED,
	unitsHeight ENUM('cm', 'inch'),
	unitsWeight ENUM('kg', 'lb')
);
CREATE TABLE user(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	userName VARCHAR(100) UNIQUE NOT NULL,
	pass VARCHAR(250) NOT NULL,
	salt VARCHAR(250) NOT NULL,
	email VARCHAR(255) NOT NULL,
	bday VARCHAR(255) NOT NULL,
	sex ENUM('female', 'male'),

	area MEDIUMINT UNSIGNED NOT NULL,
	measures MEDIUMINT UNSIGNED NOT NULL,
	cart MEDIUMINT UNSIGNED NOT NULL,
	
	FOREIGN KEY (area) REFERENCES area(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY (measures) REFERENCES measures(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY (cart) REFERENCES cart(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);
CREATE TABLE comment(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user MEDIUMINT UNSIGNED NOT NULL,
	article MEDIUMINT UNSIGNED NOT NULL,
	title TINYTEXT NOT NULL,
	text TEXT NOT NULL,
	rating TINYINT(1) UNSIGNED NOT NULL,
	
	FOREIGN KEY (user) REFERENCES user(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	UNIQUE(user, article)
);
CREATE TABLE picture(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	ext CHAR(3) NOT NULL,
	src VARCHAR(255) NOT NULL,
	alt TEXT NOT NULL
);
CREATE TABLE picture_article(
	article MEDIUMINT UNSIGNED NOT NULL,
	picture MEDIUMINT UNSIGNED NOT NULL,

	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	FOREIGN KEY (picture) REFERENCES picture(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(article, picture)
);

CREATE TABLE picture_comment(
	comment MEDIUMINT UNSIGNED NOT NULL,
	picture MEDIUMINT UNSIGNED NOT NULL,

	FOREIGN KEY (comment) REFERENCES comment(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	FOREIGN KEY (picture) REFERENCES picture(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(comment, picture)
);
CREATE TABLE address(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user MEDIUMINT UNSIGNED NOT NULL,
	alias VARCHAR(50) NOT NULL,
	name VARCHAR(100) NOT NULL,
	surname VARCHAR(100) NOT NULL,
	address VARCHAR(150) NOT NULL,
	city VARCHAR(100) NOT NULL,
	state VARCHAR(100) NOT NULL,
	country VARCHAR(100) NOT NULL,
	phone CHAR(23),
	obs TEXT,

	FOREIGN KEY (user) REFERENCES user(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
); 
CREATE TABLE user_favs(
	user MEDIUMINT UNSIGNED NOT NULL,
	article MEDIUMINT UNSIGNED NOT NULL,

	FOREIGN KEY (user) REFERENCES user(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(user, article)
);
CREATE TABLE shipping(
	id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user MEDIUMINT UNSIGNED NOT NULL,
	idTracking VARCHAR(36) NOT NULL,
	idPayment VARCHAR(36) NOT NULL,
	payment ENUM('transfer', 'card', 'crypto', 'paypal') NOT NULL,

	FOREIGN KEY (user) REFERENCES user(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE shipping_state(
	id MEDIUMINT UNSIGNED NOT NULL,
	shipping MEDIUMINT UNSIGNED NOT NULL,
	date DATETIME NOT NULL,
	status 
		ENUM(
			'order_recieved', 
			'processing', 
			'shipped', 
			'delivering', 
			'returned',
			'exception'
		) 
		NOT NULL,
	
	FOREIGN KEY (shipping) REFERENCES shipping(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(id, shipping)
);
CREATE TABLE shipping_line(
	orderr INT(4) NOT NULL,
	shipping MEDIUMINT UNSIGNED NOT NULL,
	article MEDIUMINT UNSIGNED NOT NULL,
	qty TINYINT(2) NOT NULL,

	FOREIGN KEY (shipping) REFERENCES shipping(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,

	FOREIGN KEY (article) REFERENCES article(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	
	PRIMARY KEY(shipping, article)
);
