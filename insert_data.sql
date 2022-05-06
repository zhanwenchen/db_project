-- Customer
INSERT INTO customer (address, phone, username, `password`, first_name, last_name)
VALUES ('123 Swamp Road', '123-456-7890', 'hippo123', 'hungryhipps', 'Hungry', 'Hippo');

INSERT INTO customer (address, phone, username, `password`, first_name, last_name)
VALUES ('123 Savanna Street', '999-888-7777', 'elephants', 'ivory', 'Eliot', 'Elephant');

INSERT INTO customer (address, phone, username, `password`, first_name, last_name)
VALUES ('110 Treehouse Circle', '000-111-5555', 'always', 'chased', 'Spencer', 'Squirrel');


-- Restaurant
INSERT INTO restaurant (id, address, phone, username, `password`, name)
VALUES (1, '174-184 W Clayton St', '706-549-0810', 'last_resort', 'hangry', 'Last Resort Grill');


INSERT INTO restaurant (id, address, phone, username, `password`, name)
VALUES (2, '1935 S Barnett Shoals Rd', '706-227-7888', 'new_red_bowl', 'double_cooked_pork', 'New Red Bowl');


INSERT INTO restaurant (id, address, phone, username, `password`, name)
VALUES (3, '269 N Hull St #100', '706-543-5515', 'five_athens', 'ribeye', 'FIVE Athens');

-- INSERT INTO restaurant (id, address, phone, username, `password`, name)
-- VALUES (4, '950 Whitehall Rd', '706-613-1616', 'peppinos', 'pizza', 'Peppino\'s Pizzeria');


-- 3. Order (One Customer - One Order)
-- 3.1 Hungry Hippo Orders from Last Resort Grill
INSERT INTO `order` (id, customer_id, restaurant_id) VALUES (1, 1, 1);
INSERT INTO `order` (id, customer_id, restaurant_id) VALUES (2, 2, 2);
INSERT INTO `order` (id, customer_id, restaurant_id) VALUES (3, 3, 3);

-- 4. Inventory
-- 4.1 Last Resort Grill
INSERT INTO inventory (id, restaurant_id, description, price, name, quantity)
VALUES (1, 1, 'fire-grilled black pepper crusted beef tenderloin topped with a delicious shrimp cake & charred tomato butter, homemade yukon mash & sauteed green beans drizzled with balsamic demi', 33.0, 'Hangar Steak', 10);

INSERT INTO inventory (id, restaurant_id, description, price, name, quantity)
VALUES (2, 1, 'boneless short rib roast slow-braised with fresh herbs, served with au jus, sour cream mashed potatoes & topped with salsa veracruz & fried shallots', 22.95, 'Beef Short Rib', 5);

INSERT INTO inventory (id, restaurant_id, description, price, name, quantity)
VALUES (3, 1, 'a southern favorite… fresh farm raised trout dredged in our savory cornbread & pan fried until perfectly golden, served with a jalapeño tartar, creamed corn grits & chargrilled okra', 18.95, 'Cornbread Crusted Trout', 7);

-- 4.2 New Red Bowl
INSERT INTO inventory (id, restaurant_id, description, price, name, quantity)
VALUES (4, 2, 'Cabbage, leeks, hot peppers, black beans, and chili oil', 14.95, 'Double Cooked Pork', 5);

INSERT INTO inventory (id, restaurant_id, description, price, name, quantity)
VALUES (5, 2, 'Pressed bean curd fried with pork and celery', 13.95, 'Shredded Pork with Pressed Tofu', 10);

INSERT INTO inventory (id, restaurant_id, description, price, name, quantity)
VALUES (6, 2, 'Lightly fried chicken fried with dry peppers and long hot green peppers', 13.95, 'Spicy Diced Chicken', 0);

-- 4.3 FIVE Athens
INSERT INTO inventory (id, restaurant_id, description, price, name, quantity)
VALUES (7, 3, 'Pepper Jelly', 10, 'Baked Pimento Cheese', 5);

INSERT INTO inventory (id, restaurant_id, description, price, name, quantity)
VALUES (8, 3, 'American Cheese, French Fries', 16, 'Double Cheeseburger', 20);

INSERT INTO inventory (id, restaurant_id, description, price, name, quantity)
VALUES (9, 3, '12oz aged ribeye. French fries', 34, 'Steak and Fries', 3);


-- 5. Order Item (One Customer - One Order)
-- 5.1 Hungry Hippo Orders Hangar Steak and Trout from Last Resort Grill
INSERT INTO ordered_item (order_id, inventory_id, quantity, notes)
VALUES (1, 1, 1, NULL);

INSERT INTO ordered_item (order_id, inventory_id, quantity, notes)
VALUES (1, 3, 1, 'Allergic to Shrimp');

-- 5.2 Eliot Elephant Orders 2x Double Cooked Pork from New Red Bowl
INSERT INTO ordered_item (order_id, inventory_id, quantity, notes)
VALUES (2, 4, 2, NULL);

-- 5.3 Spencer Squirrel Orders Cheese, Ribeye, and Burger from FIVE Athens
INSERT INTO ordered_item (order_id, inventory_id, quantity, notes)
VALUES (3, 7, 1, NULL);

INSERT INTO ordered_item (order_id, inventory_id, quantity, notes)
VALUES (3, 8, 1, 'Extra Mushroom');

INSERT INTO ordered_item (order_id, inventory_id, quantity, notes)
VALUES (3, 9, 1, NULL);

-- 6. Restaurant Query
select o.id, i.name, oi.quantity, oi.notes, c.first_name, c.last_name from ordered_item oi
join `order` o on oi.order_id = o.id
join inventory i on oi.inventory_id = i.id
join customer c on c.id = o.customer_id
where o.restaurant_id = 1;

-- 7. Customer query
select o.id, i.name, oi.quantity, oi.notes, r.name from ordered_item oi
join `order` o on oi.order_id = o.id
join inventory i on oi.inventory_id = i.id
join restaurant r on r.id = o.restaurant_id
where o.restaurant_id = 1;
