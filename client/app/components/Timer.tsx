"use client";

import { useEffect, useState } from "react";

export default function Timer({ expiresAt }: any) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = new Date(expiresAt).getTime() - Date.now();
            setTime(Math.max(0, Math.floor(diff / 1000)));
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);
    return <div style={{ fontSize: 12 }}>{time}s</div>;
}
