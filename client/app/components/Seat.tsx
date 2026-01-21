"use client";

import { Button } from "@radix-ui/themes";
import api from "../lib/api";
import Timer from "./Timer";

export default function Seat({ seat, refresh }: any) {
    const lockSeat = async () => {
        await api.post("/seats/lock", { seatId: seat._id });
        refresh();
    };

    const confirmSeat = async () => {
        await api.post("/seats/confirm", { seatId: seat._id });
        refresh();
    };

    const disabled = seat.status !== "AVAILABLE";

    let color = "#22c55e";
    if (seat.status === "LOCKED") color = "#facc15";
    if (seat.status === "CONFIRMED") color = "#ef4444";

    return (
        <div style={{ textAlign: "center" }}>
            <Button
                disabled={disabled}
                onClick={lockSeat}
                style={{
                    padding: 12,
                    backgroundColor: color,
                    borderRadius: 6,
                    cursor: disabled ? "not-allowed" : "pointer",
                }}
            >
                {seat.seatNumber}
            </Button>
            {seat.status === "LOCKED" && (
                <>
                    <Timer expiresAt={seat.lockedExpiresAt} />
                    <Button onClick={confirmSeat}>Confirm</Button>
                </>
            )}
        </div>
    );
}
