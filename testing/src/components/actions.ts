"use server";

import { createClient } from "@/lib/supabase/server";

type Credentials = {
    email: string;
    password: string;
};

export type SubmissionResponse = {
    msg: string;
    isError: boolean;
};

export const login = async (formData: FormData): Promise<SubmissionResponse> => {
    const supabase = await createClient();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        throw new Error("Email and password are both required.");
    }

    const credentials: Credentials = { email, password };
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) throw new Error("Login failed: " + error.message);
    return { msg: `Welcome back ${data.user.email}`, isError: false };
};

export const signup = async (formData: FormData): Promise<SubmissionResponse> => {
    const supabase = await createClient();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        throw new Error("Email and password are both required.");
    }

    const credentials: Credentials = { email, password };
    const { data, error } = await supabase.auth.signUp(credentials);

    if (error) throw new Error("Signup failed: " + error.message);
    return { msg: `Success!, ${data.user?.id} with email ${data.user?.email} is signed up!`, isError: false };
};

export const getErrorMessage = async (err: unknown): Promise<string> => {
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    return "An error occurred. Please try again.";
};

export const handleAuth = async (_: SubmissionResponse | null, formData: FormData): Promise<SubmissionResponse> => {
    console.log("✅ handleAuth called");
    const action = formData.get("action")?.toString();
    console.log(`action: ${action}`);

    try {
        if (action == "login") {
            return await login(formData);
        } else if (action == "signup") {
            return await signup(formData);
        } else {
            throw new Error("You need to log in or sign up!");
        }
    } catch (error) {
        return { msg: await getErrorMessage(error), isError: true };
    }
};
