CREATE USER 'lionmiss-admin'@'%' IDENTIFIED BY '1234qwerty';
CREATE USER 'lionmiss-user'@'%' IDENTIFIED BY 'qwerty1234';
GRANT ALL PRIVILEGES ON lionmiss.* TO 'lionmiss-admin'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON lionmiss.* TO 'lionmiss-user'@'%';