"use client";

import { useState } from "react";
import api from "../lib/api";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const register = async () => {
        await api.post("/auth/register", {
            name,
            email,
            password,
        });

        router.push("/login");
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Register</h2>

            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <br />

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <Button onClick={register}>Register</Button>
        </div>
    );
}
