"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import LoginModal from "@/components/nav/LoginModal";
import { AuthError, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import SignUpModal from "@/components/nav/SignUpModal"; // TODO: change the import to @ from src import

export default function UserStatusController() {
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const supabase = await createClient();
            const {
                data: { session },
                error,
            } = (await supabase.auth.getSession()) as { data: { session: Session } | { session: null }; error: AuthError };
        };
        setSession(session);
        setError(error);
    }, []);

    console.log("session:", session);
    console.log("error: ", error);

    if (session) {
        return (
            <>
                <p>Welcome back, {session?.user.email}!</p>
                {/* TODO: add sign out functionality */}
                <Button>Sign out</Button>
            </>
        );
    }
    const [loginIsOpen, setLoginIsOpen] = React.useState(false);
    const [signUpIsOpen, setSignUpIsOpen] = React.useState(false);
    if (error || !session) {
        return (
            <>
                <LoginModal open={loginIsOpen} setOpen={setLoginIsOpen} openSignUp={setSignUpIsOpen} />
                <SignUpModal open={signUpIsOpen} setOpen={setSignUpIsOpen} openLogin={setLoginIsOpen} />
            </>
        );
    }
}
