"use client";

import { Button } from "@radix-ui/themes";
import api from "../lib/api";
import { getCurrentUserId } from "../lib/auth";

export default function Seat({ seat, refresh, onSelect }: any) {
    const currentUserId = getCurrentUserId();

    const isLockedByMe =
        seat.status === "LOCKED" && seat.lockedBy === currentUserId;

    const isLockedByOther =
        seat.status === "LOCKED" && seat.lockedBy !== currentUserId;

    const isConfirmByMe =
        seat.status === "CONFIRMED" && seat.confirmedBy === currentUserId;

    const disabled =
        isLockedByOther ||
        (seat.status === "CONFIRMED" && seat.confirmedBy !== currentUserId);

    const lockSeat = async () => {
        if (seat.status !== "AVAILABLE") return;

        await api.post("/seats/lock", { seatId: seat._id });
        onSelect(seat);
        refresh();
    };

    let color = "#22c55e";
    if (isLockedByMe) color = "#facc15";
    if (isLockedByOther) color = "#9ca3af";
    if (seat.status === "CONFIRMED") color = "#ef4444";

    return (
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
    );
}
