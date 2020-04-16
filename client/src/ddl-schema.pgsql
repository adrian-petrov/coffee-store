CREATE TABLE category (
  category_id SMALLSERIAL,
  category_name VARCHAR(20) NOT NULL,
  PRIMARY KEY (category_id)
);

INSERT INTO category (category_id, category_name) 
VALUES
  (nextval('category_category_id_seq'), 'coffee'),
  (nextval('category_category_id_seq'), 'brewing equipment'),
  (nextval('category_category_id_seq'), 'gifts');

CREATE TABLE product (
  product_id SMALLSERIAL,
  category_id SMALLINT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  discount NUMERIC NULL,
  PRIMARY KEY (product_id),
  FOREIGN KEY (category_id) REFERENCES category (category_id),
  CONSTRAINT numbers_are_positive CHECK (
    price > 0
  )
);

CREATE TABLE product_coffee (
  product_id int NOT NULL,
  type VARCHAR(15) NOT NULL,  
  country VARCHAR(50) NULL,
  notes TEXT[] NOT NULL,
  roast INT NOT NULL,
  flavour VARCHAR(25) NOT NULL,
  PRIMARY KEY (product_id),
  FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE CASCADE,
  CONSTRAINT coffe_type CHECK (
    type IN ('single origin', 'blend')
  ),
  CONSTRAINT notes_array_length CHECK (
    cardinality(notes) >= 1 AND cardinality(notes) <= 3
  ),
  CONSTRAINT roast_scale CHECK (
    roast in (1, 2, 3, 4, 5)
  ),
  CONSTRAINT flavour_is_one_of CHECK (flavour IN (
    'fruity',
    'citrus & floral', 
    'nuts & spice',
    'chocolate & caramel'
  ))
);

WITH insert_product AS (
  INSERT INTO product VALUES (
    DEFAULT,
    1,
    'El Carmen Filter Roast',
    'Our best selling single origin.',
    '/images/coffee/coffee_1.jpg',
    7.75,
    null
  )
  RETURNING product_id
)
INSERT INTO product_coffee
  SELECT product_id,
  'single origin',
  'Columbia',
  ARRAY ['vanilla, cocoa, red fruits'],
  4,
  'fruity'
  FROM insert_product
;


