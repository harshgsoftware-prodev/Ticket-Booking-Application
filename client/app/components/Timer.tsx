"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Flex } from "@radix-ui/themes";
import api from "../lib/api";

export default function Timer({ expiresAt, onExpire }: any) {
    const [time, setTime] = useState(0);
    const expiredRef = useRef(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            const diff = new Date(expiresAt).getTime() - Date.now();
            const seconds = Math.max(0, Math.floor(diff / 1000));
            setTime(seconds);

            if (seconds === 0 && !expiredRef.current) {
                expiredRef.current = true;
                await api.post("/seats/cancel-my-locked");
                onExpire?.();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);

    const color = time <= 10 ? "red" : time <= 20 ? "amber" : "green";

    return (
        <Flex direction="column" align="center" gap="2" style={{ width: 220 }}>
            <Badge color={color} size="2">
                ⏳ {time}s remaining
            </Badge>
        </Flex>
    );
}
