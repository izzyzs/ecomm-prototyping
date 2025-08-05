-- ENUMS
CREATE TYPE fulfillment AS ENUM ('NDD', 'SDD', 'PU');
CREATE TYPE status AS ENUM ('CANCELLED', 'PLACED', 'READY_FOR_PICKUP', 'ON_ROUTE', 'COMPLETE');
CREATE TYPE role AS ENUM ('ADMIN', 'DRIVER', 'FLOOR');

-- USER
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    professional BOOLEAN NOT NULL DEFAULT false,
    email TEXT NOT NULL UNIQUE
);

-- EMPLOYEE
CREATE TABLE "Employee" (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role role NOT NULL
);

-- PRODUCT
CREATE TABLE "Product" (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    barcode TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    inventory INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ORDER
CREATE TABLE "Order" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES "User"(id),
    date TIMESTAMPTZ NOT NULL,
    fulfillment fulfillment NOT NULL DEFAULT 'PU',
    status status NOT NULL,
    pickup_time TIMESTAMPTZ,
    employee_id INTEGER REFERENCES "Employee"(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ADDRESS
CREATE TABLE "Address" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL
    -- Orders will reference this address through a many-to-one or many-to-many design, handled in application logic
);

-- ORDER_PRODUCT (join table)
CREATE TABLE "OrderProduct" (
    order_id INTEGER NOT NULL REFERENCES "Order"(id),
    product_id INTEGER NOT NULL REFERENCES "Product"(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (order_id, product_id)
);

-- CART
CREATE TABLE "Cart" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES "User"(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CART_ITEM
CREATE TABLE "CartItem" (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES "Cart"(id),
    product_id INTEGER NOT NULL REFERENCES "Product"(id),
    quantity INTEGER NOT NULL
);

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

-- CREATE TABLE public.Address (
--   id integer NOT NULL DEFAULT nextval('"Address_id_seq"'::regclass),
--   userId integer NOT NULL,
--   street text NOT NULL,
--   city text NOT NULL,
--   state text NOT NULL,
--   zip text NOT NULL,
--   CONSTRAINT Address_pkey PRIMARY KEY (id)
-- );
-- CREATE TABLE public.Cart (
--   id integer NOT NULL DEFAULT nextval('"Cart_id_seq"'::regclass),
--   userId integer NOT NULL,
--   updatedAt timestamp without time zone NOT NULL,
--   CONSTRAINT Cart_pkey PRIMARY KEY (id),
--   CONSTRAINT Cart_userId_fkey FOREIGN KEY (userId) REFERENCES public.User(id)
-- );
-- CREATE TABLE public.CartItem (
--   id integer NOT NULL DEFAULT nextval('"CartItem_id_seq"'::regclass),
--   cartId integer NOT NULL,
--   productId integer NOT NULL,
--   quantity integer NOT NULL,
--   CONSTRAINT CartItem_pkey PRIMARY KEY (id),
--   CONSTRAINT CartItem_cartId_fkey FOREIGN KEY (cartId) REFERENCES public.Cart(id),
--   CONSTRAINT CartItem_productId_fkey FOREIGN KEY (productId) REFERENCES public.Product(id)
-- );
-- CREATE TABLE public.Employee (
--   id integer NOT NULL DEFAULT nextval('"Employee_id_seq"'::regclass),
--   username text NOT NULL,
--   password text NOT NULL,
--   role USER-DEFINED NOT NULL,
--   CONSTRAINT Employee_pkey PRIMARY KEY (id)
-- );
-- CREATE TABLE public.Order (
--   id integer NOT NULL DEFAULT nextval('"Order_id_seq"'::regclass),
--   user_id integer NOT NULL,
--   date timestamp without time zone NOT NULL,
--   fulfillment USER-DEFINED NOT NULL DEFAULT 'PU'::"Fulfillment",
--   status USER-DEFINED NOT NULL,
--   pickup_time timestamp without time zone,
--   employee_id integer,
--   createdAt timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   updatedAt timestamp without time zone NOT NULL,
--   address_id integer,
--   CONSTRAINT Order_pkey PRIMARY KEY (id),
--   CONSTRAINT Order_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.Employee(id),
--   CONSTRAINT Order_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.Address(id),
--   CONSTRAINT Order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.User(id)
-- );
-- CREATE TABLE public.OrderProduct (
--   order_id integer NOT NULL,
--   product_id integer NOT NULL,
--   createdAt timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   updatedAt timestamp without time zone NOT NULL,
--   CONSTRAINT OrderProduct_pkey PRIMARY KEY (order_id, product_id),
--   CONSTRAINT OrderProduct_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.Product(id),
--   CONSTRAINT OrderProduct_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.Order(id)
-- );
-- CREATE TABLE public.Product (
--   id integer NOT NULL DEFAULT nextval('"Product_id_seq"'::regclass),
--   description text NOT NULL,
--   barcode text NOT NULL,
--   category text NOT NULL,
--   price double precision NOT NULL,
--   inventory integer NOT NULL DEFAULT 0,
--   createdAt timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   updatedAt timestamp without time zone NOT NULL,
--   CONSTRAINT Product_pkey PRIMARY KEY (id)
-- );
-- CREATE TABLE public.User (
--   id integer NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
--   first_name text NOT NULL,
--   last_name text NOT NULL,
--   professional boolean NOT NULL DEFAULT false,
--   email text NOT NULL,
--   CONSTRAINT User_pkey PRIMARY KEY (id)
-- );
-- CREATE TABLE public._prisma_migrations (
--   id character varying NOT NULL,
--   checksum character varying NOT NULL,
--   finished_at timestamp with time zone,
--   migration_name character varying NOT NULL,
--   logs text,
--   rolled_back_at timestamp with time zone,
--   started_at timestamp with time zone NOT NULL DEFAULT now(),
--   applied_steps_count integer NOT NULL DEFAULT 0,
--   CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id)
-- );