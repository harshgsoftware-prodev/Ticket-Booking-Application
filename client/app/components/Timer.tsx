"use client";

import { useEffect, useRef, useState } from "react";
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
    return <div style={{ fontSize: 12 }}>{time}s</div>;
}
