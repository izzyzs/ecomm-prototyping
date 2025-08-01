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
