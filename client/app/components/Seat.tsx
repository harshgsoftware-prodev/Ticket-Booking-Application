"use client";

import { Button } from "@radix-ui/themes";
import api from "../lib/api";
import Timer from "./Timer";
import { getCurrentUserId } from "../lib/auth";

export default function Seat({ seat, refresh }: any) {
    const lockSeat = async () => {
        await api.post("/seats/lock", { seatId: seat._id });
        refresh();
    };

    const confirmSeat = async () => {
        await api.post("/seats/confirm", { seatId: seat._id });
        refresh();
    };

    const cancelSeat = async () => {
        await api.post("/seats/cancel", { seatId: seat._id });
        refresh();
    };

    const currentUserId = getCurrentUserId();

    const isLockedByMe =
        seat.status === "LOCKED" && seat.lockedBy === currentUserId;

    const isLockedByOther =
        seat.status === "LOCKED" && seat.lockedBy !== currentUserId;

    const isConfirmByMe =
        seat.status === "CONFIRMED" && seat.confirmedBy === currentUserId;

    const disabled = seat.status === "CONFIRMED" || isLockedByOther;

    let color = "#22c55e";
    if (isLockedByMe) color = "#facc15";
    if (isLockedByOther) color = "#9ca3af";
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
            {isLockedByMe && (
                <>
                    <Timer expiresAt={seat.lockedExpiresAt} />
                    <Button onClick={confirmSeat}>Confirm</Button>
                </>
            )}

            {isConfirmByMe && (
                <Button color="red" variant="soft" onClick={cancelSeat}>
                    Cancel
                </Button>
            )}
        </div>
    );
}
