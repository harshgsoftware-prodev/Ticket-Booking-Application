"use client";

import { useState } from "react";
import api from "../lib/api";
import { saveToken } from "../lib/auth";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const login = async () => {
        const res = await api.post("/auth/login", { email, password });
        saveToken(res.data.token);
        router.push("/booking");
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Login</h2>
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
            <Button onClick={login}>Login</Button>
        </div>
    );
}
