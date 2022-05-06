-- 1. Customer
DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
  id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  address VARCHAR(255),
  phone CHAR(12),
  username VARCHAR(255),
  `password` VARCHAR(255),
  first_name VARCHAR(255)
  last_name VARCHAR(255)
);

-- 2. Restaurant
DROP TABLE IF EXISTS restaurant;
CREATE TABLE restaurant (
  id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  address VARCHAR(255),
  phone CHAR(12),
  username VARCHAR(255),
  `password` VARCHAR(255),
  name VARCHAR(255)
);

-- 3. Order
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  customer_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  CONSTRAINT fk_order_customer_id
    FOREIGN KEY (customer_id)
    REFERENCES customer(id),
  CONSTRAINT fk_order_restaurant_id
    FOREIGN KEY (restaurant_id)
    REFERENCES restaurant(id)
);

-- 4. Inventory
DROP TABLE IF EXISTS inventory;
CREATE TABLE inventory (
  id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  restaurant_id INT not null,
  description VARCHAR(255),
  price NUMERIC(2),
  name VARCHAR(255),
  quantity NUMERIC,
  CONSTRAINT fk_inventory_restaurant_id
    FOREIGN KEY (restaurant_id)
    REFERENCES restaurant(id)
);

-- 5. Ordered_Item
DROP TABLE IF EXISTS ordered_item;
CREATE TABLE ordered_item (
  id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  order_id INT NOT NULL,
  inventory_id INT NOT NULL,
  quantity NUMERIC,
  notes VARCHAR(1000),
  CONSTRAINT fk_ordered_item_order_id
    FOREIGN KEY (order_id)
    REFERENCES `order`(id)
);
-- 
-- -- 6. ZC_Menu_Category
-- DROP TABLE IF EXISTS zc_menu_category;
-- CREATE TABLE zc_menu_category (
--   id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
--   name VARCHAR(255)
-- );
