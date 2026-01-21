"use client";

import { useState } from "react";
import api from "../lib/api";
import { saveToken } from "../lib/auth";
import { useRouter } from "next/navigation";

import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const login = async () => {
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/login", { email, password });
            saveToken(res.data.token);
            router.push("/booking");
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Invalid email or password",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login();
    };

    return (
        <Flex
            align="center"
            justify="center"
            style={{ minHeight: "100vh", background: "#f9fafb" }}
        >
            <Card size="4" style={{ width: 360 }}>
                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="4">
                        <Heading align="center">Login</Heading>

                        <Text size="2" color="gray" align="center">
                            Sign in to continue booking
                        </Text>

                        <Flex direction="column" gap="3">
                            <TextField.Root
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField.Root
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Flex>

                        <Button size="3" onClick={login} disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        {error && (
                            <Text size="2" color="red" align="center">
                                {error}
                            </Text>
                        )}

                        <Text size="2" align="center" color="gray">
                            Don't have an account?{" "}
                            <a href="/register" style={{ color: "blue" }}>
                                Register
                            </a>
                        </Text>
                    </Flex>
                </form>
            </Card>
        </Flex>
    );
}
