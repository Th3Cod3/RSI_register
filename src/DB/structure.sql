CREATE TABLE units (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL UNIQUE,
  abbreviation VARCHAR(5) NOT NULL UNIQUE,
  type VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE shop_categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE  shop_sub_categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL UNIQUE,
  category_id INT NOT NULL ,
  PRIMARY KEY (id)
);

CREATE TABLE shop_packagings (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE shop_prices (
  id INT NOT NULL AUTO_INCREMENT,
  date DATETIME NOT NULL,
  item_id INT NOT NULL,
  price DECIMAL(14,4) NOT NULL,
  created_by INT NOT NULL,
  updated_by INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE shop_discount (
  id INT NOT NULL AUTO_INCREMENT,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  item_id INT NOT NULL,
  created_by INT NOT NULL,
  updated_by INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE shop_items (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(300),
  sub_category_id INT NOT NULL,
  barcode VARCHAR(50) NULL,
  quantity INT NOT NULL,
  bundle_packaging_id INT NULL,
  bundle_quantity INT NULL,
  bundle_volumen INT NOT NULL,
  bundle_unit_id INT NOT NULL,
  packaging_id INT NOT NULL,
  created_by INT NOT NULL,
  updated_by INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE shop_stock (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200),
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  created_by INT NOT NULL,
  updated_by INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE shop_invoices (
  id INT NOT NULL AUTO_INCREMENT,
  invoice_number VARCHAR(15) NOT NULL UNIQUE,
  total DECIMAL(14,4) NOT NULL,
  voided_by INT NULL,
  voided_at INT NULL,
  created_by INT NOT NULL,
  updated_by INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE shop_invoice_items (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  invoice_id INT NOT NULL,
  price DECIMAL(14,4) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE shop_payments (
  id INT NOT NULL AUTO_INCREMENT,
  date DATETIME NOT NULL,
  amount DECIMAL(14,4) NOT NULL,
  payment_method INT NOT NULL,
  created_by INT NOT NULL,
  updated_by INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE shop_payment_methods (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  bank_commision DECIMAL(5,2),
  PRIMARY KEY (id)
);

INSERT INTO shop_packagings (name)
VALUES ("Pakket"),
("Mand"),
("Zakje"),
("Bag"),
("Bakje"),
("Bekertje"),
("Blik"),
("Blikje"),
("Busje"),
("Diversen"),
("Doos"),
("Doosje"),
("Fles"),
("Flesje"),
("Geen"),
("Knijpfles"),
("Knijpflesje"),
("Los"),
("Onbekend"),
("Pak"),
("Pakje"),
("Pot"),
("Potje"),
("Ronde Plastic Tube"),
("RondePlastic Tube"),
("Spuitbusje"),
("Spuitfles"),
("Stickje"),
("Tas"),
("Vat")
("Zak");

INSERT INTO shop_categories (id, name)
VALUES (1, "Alcoholhoudende dranken"),
(2, "Diversen"),
(3, "Eet- en drinkwaren"),
(4, "Lichaamsverzorgingsproducten");

INSERT INTO shop_sub_categories (name, category_id)
VALUES ("Auto accessoires", 2),
("Automotive producten", 2),
("Azijnen", 3),
("Babyproducten", 4),
("Bier", 1),
("Brandy", 1),
("Champagne", 1),
("Dames hygiëneproducten", 4),
("Dranken", 3),
("Feestartikelen", 2),
("Fruitsappen", 3),
("Geur-, kleur- en smaakstoffen", 3),
("Gin", 1),
("Granen", 3),
("Huisdieraccessoires", 2),
("Ingeblikte voedsel", 3),
("Insecticiden", 2),
("Kaarsen", 2),
("Kantoorartikelen", 2),
("Keukengerei", 2),
("Koekjes en beschuiten", 3),
("Koffie of thee", 3),
("Kruiden en specerijen waren", 3),
("Likeur", 1),
("Luchtverfrissers", 2),
("Meel", 3),
("Melkwaren", 3),
("Met alcohol te mengen drankje", 1),
("Mineraalwater", 3),
("Muizenval", 2),
("Oliën", 3),
("Pakket / Mand", 1),
("Pasta", 3),
("Persoonlijke verzorging", 4),
("Peulvruchten", 3),
("Portwijn", 1),
("Rijst", 3),
("Rum", 1),
("Sauzen", 3),
("Schoeisel", 2),
("Schoonheidsproducten", 4),
("Schoonmaakmiddelen", 2),
("Siroop", 3),
("Snacks", 3),
("Soda", 3),
("Soep", 3),
("Speelgoed", 2),
("Suiker", 3),
("Taart bakgerei / Taartdecoratie", 2),
("Tequila", 1),
("Toetje", 3),
("Toilettenpapier", 4),
("Tuinartikelen", 2),
("Verlichtingsartikelen", 2),
("Vodka", 1),
("Voedsel in conservepotten", 3),
("Vuurwater (Aguardiente)", 1),
("Wasmiddelen", 2),
("Water", 3),
("Whisky", 1),
("Wijn (Argentinië)", 1),
("Wijn (Australië)", 1),
("Wijn (Chile)", 1),
("Wijn (Curaçao)", 1),
("Wijn (Duitsland)", 1),
("Wijn (Frankrijk)", 1),
("Wijn (Italië)", 1),
("Wijn (Peru)", 1),
("Wijn (Portugal)", 1),
("Wijn (Spanje)", 1),
("Wijn (Verenigde Staten)", 1);

INSERT INTO units (abbreviation, name, type)
VALUES ("cm.", "centimenter", "Afstand"),
("ft.", "voet", "Afstand"),
("gal.", "gallon", "Massa"),
("gr.", "gram", "Massa"),
("in.", "inch", "Afstand"),
("kg.", "kilogram", "Massa"),
("lb.", "pond", "Massa"),
("m.", "meter", "Afstand"),
("ml.", "mililiter", "Inhoud"),
("oz.", "onz", "Massa"),
("sq. ft.", "vierkante voet", "Inhoud"),
("qt.", "quart", "Inhoud");


water, consumable

items  
name 
co id
