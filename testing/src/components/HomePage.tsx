// "use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Star } from "lucide-react";
import NavBar from "./NavBar";
import { createClient } from "@/lib/supabase/server";

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

/**
 * A React component that renders the home page of a beauty supply store.
 *
 * It demonstrates how to combine Shadcn UI components with Tailwind CSS to create
 * a responsive layout. The page features a navigation bar with a login button
 * that triggers a modal, a hero section, a professional benefits section, and a
 * sample product grid. Each section is mobile‑first and scales gracefully on
 * larger screens.
 */
const HomePage = async () => {
    const supabase = await createClient();
    const { data: products } = await supabase.from("Product").select("*");

    return (
        <>
            <NavBar />

            {/* Hero section highlighting the store's mission */}
            <section className="relative bg-gradient-to-r from-pink-100 via-rose-50 to-orange-50 py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Discover Your Beauty Essentials</h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 mb-6">
                    Explore our curated selection of professional‑grade hair and skin products tailored for salons and beauty enthusiasts.
                </p>
                <Button size="lg">Shop Now</Button>
            </section>

            {/* Professional benefits section */}
            <section className="py-16 px-6 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Benefits for Professionals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center p-6 border rounded-lg">
                        <Briefcase className="h-10 w-10 text-pink-500 mb-3" />
                        <h3 className="font-semibold mb-1">Wholesale Pricing</h3>
                        <p className="text-sm text-center text-gray-600">Access exclusive bulk pricing on top brands.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 border rounded-lg">
                        <Users className="h-10 w-10 text-pink-500 mb-3" />
                        <h3 className="font-semibold mb-1">Dedicated Support</h3>
                        <p className="text-sm text-center text-gray-600">Personalized service for salon owners and stylists.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 border rounded-lg">
                        <Star className="h-10 w-10 text-pink-500 mb-3" />
                        <h3 className="font-semibold mb-1">Rewards Program</h3>
                        <p className="text-sm text-center text-gray-600">Earn points on every purchase for future discounts.</p>
                    </div>
                </div>
            </section>

            {/* Example product grid */}
            <section className="py-16 px-6 bg-pink-50">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {products?.map((product: Product, idx) => (
                        <div key={idx} className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-40 w-full bg-gray-100 mb-4" />
                            <h3 className="font-semibold text-center mb-1">Product {idx + 1}</h3>
                            <p className="text-sm text-gray-600 text-center">${product.price}</p>
                            <Button size="sm" className="mt-2">
                                Add to Cart
                            </Button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default HomePage;
