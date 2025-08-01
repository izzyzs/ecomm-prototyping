"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NavBar = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            {/* Navigation bar with logo, links, and login button */}
            <nav className="w-full flex items-center justify-between px-4 py-4 bg-white shadow-md">
                <div className="text-xl font-bold">Beauty Supply</div>
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Home
                    </a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Shop
                    </a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        About
                    </a>
                    {/* Login button opens a modal using Shadcn's Dialog component */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                Log In
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Log in to your account</DialogTitle>
                                <DialogDescription>Enter your credentials to access professional pricing and benefits.</DialogDescription>
                            </DialogHeader>
                            <form className="mt-4 space-y-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="name@example.com" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="••••••••" />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="w-full">
                                        Log In
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
