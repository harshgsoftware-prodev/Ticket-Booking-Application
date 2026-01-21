"use client";

import { useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";

import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const register = async () => {
        setError("");
        setLoading(true);

        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
            });

            router.push("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Fill required fields");
        } finally {
            setLoading(false);
        }
    };

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        register();
    };

    return (
        <Flex
            align="center"
            justify="center"
            style={{ minHeight: "100vh", background: "#f9fafb" }}
        >
            <Card size="4" style={{ width: 360 }}>
                <form onSubmit={handleSumbit}>
                    <Flex direction="column" gap="4">
                        <Heading align="center">Create Account</Heading>

                        <Text size="2" color="gray" align="center">
                            Register to book seats
                        </Text>

                        <Flex direction="column" gap="3">
                            <TextField.Root
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

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

                        <Button size="3" disabled={loading}>
                            {loading ? "Creating account..." : "Register"}
                        </Button>

                        {error && (
                            <Text size="2" color="red" align="center">
                                {error}
                            </Text>
                        )}

                        <Text size="2" align="center" color="gray">
                            Already have an account?{" "}
                            <a href="/login" style={{ color: "blue" }}>
                                Login
                            </a>
                        </Text>
                    </Flex>
                </form>
            </Card>
        </Flex>
    );
}
