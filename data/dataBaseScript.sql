CREATE TABLE Users (
  username VARCHAR(50) NOT NULL PRIMARY KEY,
  matricula VARCHAR(50) NOT NULL,
  passwrd VARCHAR(50) NOT NULL,
	email VARCHAR(30) NOT NULL,
	rol int NOT NULL
);
CREATE TABLE Thread (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  board VARCHAR(50) NOT NULL,
  name VARCHAR(200) NOT NULL
);
CREATE TABLE Post (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ThreadId int NOT NULL,
  user VARCHAR(50) NOT NULL,
	content VARCHAR(500) NOT NULL,
	fecha date NOT NULL
);

INSERT INTO Users(username, passwrd, email, rol)
VALUES  ('mikematute', 'mikematute01', 'A00815329', 'mikematute@hotmail.com', '9');

INSERT INTO Thread(id, board, name)
VALUES  (99, 'Main', 'Bienvenidos');

INSERT INTO Thread(id, board, name)
VALUES  (101, 'Test1', 'Welcome'),
(102, 'Test2', 'Alumnos'),
(103, 'Test3', 'Welcome'),
(104, 'Test4', 'Alumnos'),
(105, 'Test5', 'Welcome'),
(106, 'Test6', 'Alumnos'),
(107, 'Test7', 'Welcome');

INSERT INTO Post(ThreadId, user, content, fecha)
VALUES  (99, 'mikematute', 'Bienvenidos al foro chavos. este es un mensaje de bienvenida', '2017-10-24');
