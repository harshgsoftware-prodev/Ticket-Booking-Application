"use client";

import { useEffect, useState } from "react";

interface TimerProps {
    expiresAt: string;
}

export default function Timer({ expiresAt }: TimerProps) {
    const [secondLeft, setSecondLeft] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = new Date(expiresAt).getTime() - Date.now();
            setSecondLeft(Math.max(0, Math.floor(diff / 1000)));
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);
    return <div>Time Left: {secondLeft}</div>;
}
