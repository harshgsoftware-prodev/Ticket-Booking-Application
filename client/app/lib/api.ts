import { Seat } from "../types/seat";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE = "http://localhost:4000/api";

export const fetchSeats = async (): Promise<Seat[]> => {
    const res = await fetch(`${API_BASE}/seats`);

    if (!res.ok) {
        throw new Error(`Failed to fetch seats: ${res.status}`);
    }
    return res.json();
};

export const lockSeat = async (
    seatId: String,
    userId: String,
): Promise<Seat> => {
    const res = await fetch(`${API_BASE}/lock-seat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seatId, userId }),
    });
    if (!res.ok) {
        throw new Error("Seat is not available");
    }
    return res.json();
};

export const confirmSeat = async (
    seatId: string,
    userId: string,
): Promise<Seat> => {
    const res = await fetch(`${API_BASE}/confirm-seat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seatId, userId }),
    });

    if (!res.ok) {
        throw new Error("Seat is not confirm");
    }
    return res.json();
};
