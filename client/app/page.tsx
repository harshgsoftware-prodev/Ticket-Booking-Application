"use client";

import Link from "next/link";
import { Button, Flex, Heading, Text, Separator } from "@radix-ui/themes";

export default function HomePage() {
    return (
        <Flex direction="column" style={{ minHeight: "100vh" }}>
            {/* Hero Section */}
            <Flex
                direction="column"
                align="center"
                justify="center"
                gap="4"
                px="6"
                style={{
                    flex: 1,
                    background: "linear-gradient(180deg, #ffffff, #f9fafb)",
                }}
            >
                <Heading size="8" align="center">
                    Book Train & Bus Tickets
                </Heading>

                <Text
                    size="4"
                    color="gray"
                    align="center"
                    style={{ maxWidth: 600 }}
                >
                    Experience a real-world ticket booking system with secure
                    seat locking and time-based reservations
                </Text>

                <Flex gap="4" mt="4">
                    <Button size="4" asChild>
                        <Link href="/register">Get Started</Link>
                    </Button>

                    <Button size="4" variant="soft" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
