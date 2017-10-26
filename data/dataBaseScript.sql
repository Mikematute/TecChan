CREATE TABLE Users (
	fName VARCHAR(30) NOT NULL,
  lName VARCHAR(30) NOT NULL,
  username VARCHAR(50) NOT NULL PRIMARY KEY,
  passwrd VARCHAR(50) NOT NULL,
	email VARCHAR(30) NOT NULL,
	gender VARCHAR(10) NOT NULL,
	country VARCHAR(10) NOT NULL
);
CREATE TABLE Comments (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  comment VARCHAR(200) NOT NULL
);

INSERT INTO Users(fName, lName, username, passwrd, email, gender, country)
VALUES  ('Miguel', 'Rosado', 'mikematute', 'mikematute01', 'mikematute@hotmail.com', 'm', 'Me'),
('Thomas', 'Omaley', 'thomas1961', 'test1', 'thoom1961@jourrapide.com', 'm', 'Me'),
('Sara', 'Pattick', 'saps1963', 'test2', 'saps1963@einrot.com', 'f', 'Me'),
('Oscar', 'Tunskten', 'TheOscar', 'test3', 'osts1936@fleckens.hu', 'm', 'Me'),
('Daniel', 'Vinck', 'daniel1952', 'test4', 'dinvis1952@teleworm.us', 'm', 'Me');

INSERT INTO Comments(username, comment)
VALUES  ('thomas1961', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua [...]'),
('saps1963', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua [...]'),
('TheOscar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua [...]'),
('daniel1952', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua [...]');
