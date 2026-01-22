"use client";

import { Flex, Button, Text, Avatar } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { logout } from "../lib/auth";
import api from "../lib/api";

export default function TopBar() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        api.get("/users/me")
            .then((res) => setUser(res.data))
            .catch(() => {});
    }, []);

    return (
        <Flex justify="between" align="center" style={{ marginBottom: 20 }}>
            {/* App Title */}
            <Text size="4" weight="bold">
                Ticket Booking
            </Text>

            {/* User Info + Logout */}
            <Flex align="center" gap="3">
                {user && (
                    <Flex align="center" gap="2">
                        <Avatar
                            fallback={user.name?.[0]?.toUpperCase()}
                            radius="full"
                        />
                        <Flex direction="column" gap="0">
                            <Text size="2" weight="medium">
                                {user.name}
                            </Text>
                            <Text size="1" color="gray">
                                {user.email}
                            </Text>
                        </Flex>
                    </Flex>
                )}

                <Button color="red" variant="soft" onClick={logout}>
                    Logout
                </Button>
            </Flex>
        </Flex>
    );
}
