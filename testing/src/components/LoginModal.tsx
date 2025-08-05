"use client";
import React from "react";

import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleAuth } from "./actions";
import { Loader, Loader2Icon } from "lucide-react";

const LoginModal = () => {
    const [open, setOpen] = React.useState(false);

    const [state, submitForm, isPending] = React.useActionState(handleAuth, null);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Log In
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Log in to your account</DialogTitle>
                    <DialogDescription>Enter your credentials to access member pricing and benefits.</DialogDescription>
                </DialogHeader>
                <Form className="mt-4 space-y-3" action={submitForm}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" type="email" placeholder="name@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input name="password" type="password" placeholder="••••••••" />
                    </div>
                    <DialogFooter className="flex sm:flex-col items-center justify-between gap-4">
                        <Button type="submit" className="w-full" name="action" value="login">
                            Log In
                        </Button>
                        <div className="h-0 border-2 w-full border-slate-300"></div>

                        <Label className="text-sm text-muted-foreground">Haven't made an account?</Label>
                        <Button type="submit" variant="secondary" className="w-full mt-1" name="action" value="signup" disabled={isPending}>
                            {isPending && <Loader2Icon className="animate-spin" />}
                            {!isPending ? "Sign Up" : "Please wait"}
                        </Button>
                        {state && <Label className={`text-sm text-muted-foreground${state.isError ? " text-red-600" : " text-green-700"}`}>{state.msg}</Label>}
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
