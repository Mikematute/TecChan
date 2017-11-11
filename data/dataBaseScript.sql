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
VALUES  (101, 'Welcome', 'No se que poner aqui'),
(102, 'Alumnos', 'Opinion sobre la clase de Programacion Web'),
(103, 'Welcome', 'Hola Soy William'),
(104, 'Alumnos', 'Tengo un problema con php'),
(105, 'Welcome', 'Hola soy Analisa'),
(106, 'Alumnos', 'Amo a Oziel y no se como decirle'),
(107, 'Welcome', 'mi nombre es Juan Jose');

INSERT INTO Post(ThreadId, user, content, fecha)
VALUES  (99, 'mikematute', 'Bienvenidos al foro chavos. este es un mensaje de bienvenida', '2017-10-24');

INSERT INTO Post(ThreadId, user, content, fecha)
VALUES  (103, 'mikematute', 'Bienvenidos al foro chavos. este es un mensaje de bienvenida', '2017-10-24'),
(101, 'mikematute', 'No se que poner x2 porque este es de prueba', '2017-10-24'),
(102, 'mikematute', 'La clase es hermosa', '2017-10-24'),
(104, 'mikematute', 'php no me dice que hago mal', '2017-10-24'),
(105, 'mikematute', 'Analisa o Analista. no se que es peor', '2017-10-24'),
(106, 'mikematute', 'Soy su fan y no se que onda', '2017-10-24'),
(107, 'mikematute', 'Y me fui a Google', '2017-10-24'),
(103, 'mikematute', 'Oigan. Se que soy raro pero porfa no me ignoren', '2017-10-25');
