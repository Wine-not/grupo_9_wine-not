SELECT * FROM users;

INSERT INTO db_winenot.users (name, surname, email, password, birthdate, created_at, role_id, address_id) 
VALUES 
	('Gussie', 'Hanster', 'ghanster0@youtube.com', 'nYPXwHQ4', '1948-03-10', '2022-05-10', 1, 2),
    ('Grantley', 'Tomasik', 'gtomasik1@spotify.com', '1JzCvJ', '1938-07-14', '2022-11-06', 2, 3),
    ('Tim', 'Cordy', 'tcordy2@ameblo.jp', 'uCfZKvdv6s', '1901-07-27', '2022-02-19', 2, 4),
    ('Bev', 'Mableson', 'bmableson3@constantcontact.com', 'WH3uSX', '1962-12-23', '2022-08-23', 2, 1),
    ('Norby', 'Livock', 'nlivock4@51.la', 'mF3RJP', '1966-05-28', '2022-03-20', 2, 5);
    
INSERT INTO roles (title) VALUES ('admin'), ('user');

INSERT INTO addresses (address, city, postal_code, country) 
VALUES
	('86 Darwin Park', 'Garden Grove', '92844', 'United States'),
    ('2500 Blaine Place', 'Waco', '76705', 'United States'),
    ('876 Rutledge Crossing', 'Houston', '77281', 'United States'),
    ('2 Schurz Street', 'Los Angeles', '90189', 'United States'),
    ('3394 Comanche Lane', 'Danbury', '06816', 'United States');

INSERT INTO images (path) VALUE ('product_default.jpg');

INSERT INTO regions (name, country) 
VALUES
	('Lujan de Cuyo', 'Argentina'),
    ('Uco Valley', 'Argentina'),
    ('Mendoza', 'Argentina'),
    ('Lunlunta', 'Argentina'),
    ('Los Carneros', 'United States'),
    ('Napa Valley', 'United States'),
    ('Rutherford', 'United States'),
    ('Chablis', 'France'),
    ('Côtes de Provence', 'France');
    
INSERT INTO grapes (name)
VALUES
	('Malbec'),
    ('Chardonnay'),
    ('Grenache'),
    ('Cabernet Sauvignon'),
    ('Syrah'),
    ('Merlot');
    
INSERT INTO brands (name)
VALUES
	('Viña Cobos'),
    ('Luca'),
    ('El enemigo'),
    ('Catena'),
    ('Zuccardi'),
    ('Rombauer Vineyards'),
    ('Roberts + Rogers'),
    ("Stag's Leap Wine Cellars"),
    ('Alexandrie Cellars'),
    ('Régnard'),
    ("Château d'Esclans");
    

INSERT INTO products (name, price, rating, description, stock, in_sale, is_selection, brand_id, grape_id, region_id, image_id)
VALUES
	('Bramare Malbec Lujan de Cuyo', 39.99, 4.4, 'Description pending...', 5, 0, 1, 1, 1, 1, 2),
    ('Old Vine Malbec 2018', 29.99, 4.3, 'Description pending...', 10, 1, 0, 2, 1, 2, 3),
    ('Malbec 2018', 22.99, 4.3, 'Description pending...', 4, 1, 0, 3, 1, 3, 4),
    ('Appellation Lunlunta Malbec 2018', 22.99, 4.2, 'Description pending...', 6, 1, 0, 4, 1, 4, 5),
    ('José Malbec 2016', 29.89, 4.2, 'Description pending...', 8, 0, 1, 5, 1, 2, 6),
    ('Chardonnay 2021', 37.98, 4.4, 'Description pending...', 15, 0, 1, 6, 2, 5, 7),
    ('Reserve Chardonnay 2019', 31.99, 4.4, 'Description pending...', 20, 1, 0, 7, 2, 5, 8),
    ('Karia Chardonnay 2020', 34.99, 4.3, 'Description pending...', 12, 1, 0, 8, 2, 6, 9),
    ('Alexandrie Brut N.V.', 29.99, 4.4, 'Description pending...', 30, 0, 0, 9, 2, 7, 10),
    ('Grand Régnard Chablis 2020', 39.95, 4.3, 'Description pending...', 8, 0, 1, 10, 2, 8, 11);

SELECT * FROM roles;
SELECT * FROM addresses;
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM images;
SELECT * FROM regions;
SELECT * FROM brands ORDER BY id;
SELECT * FROM grapes;

ALTER TABLE users AUTO_INCREMENT = 1;

ALTER TABLE brands AUTO_INCREMENT = 1;
DELETE FROM brands WHERE id < 20;
