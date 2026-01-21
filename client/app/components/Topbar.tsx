"use client";

import { Flex, Button, Text } from "@radix-ui/themes";
import { logout } from "../lib/auth";

export default function TopBar() {
    return (
        <Flex justify="between" align="center" style={{ marginBottom: 20 }}>
            <Text size="4" weight="bold">
                Ticket Booking
            </Text>

            <Button color="red" variant="soft" onClick={logout}>
                Logout
            </Button>
        </Flex>
    );
}
