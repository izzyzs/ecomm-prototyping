import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface Product {
    id: number;
    description: string;
    barcode: string;
    category: string;
    price: number;
    inventory: number;
    created_at: string; // ISO string from TIMESTAMPTZ
    updated_at: string;
}

interface HomePageProductProps {
    product: Product;
}

const HomePageProduct = ({ product }: HomePageProductProps) => {
    return (
        <Link href={`/product/${product.id}`}>
            <div className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="h-40 w-full bg-gray-100 mb-4" />
                <h3 className="font-semibold text-center mb-1">{product.description}</h3>
                <p className="text-sm text-gray-600 text-center">${product.price}</p>
                <Button size="sm" className="mt-2">
                    Add to Cart
                </Button>
            </div>
        </Link>
    );
};

export default HomePageProduct;
