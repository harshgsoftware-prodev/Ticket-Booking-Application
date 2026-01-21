"use client";

import Link from "next/link";

export default function HomePage() {
    return (
        <div style={{ padding: 40 }}>
            <h1>Ticket Booking Demo</h1>

            <Link href="/register">Register</Link>
            <br />
            <Link href="/login">Login</Link>
        </div>
    );
}
