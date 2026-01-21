"use client";

import { Button } from "@radix-ui/themes";
import { Seat as SeatType } from "../types/seat";

interface SeatProps {
    seat: SeatType;
    onClick: () => void;
}

export default function Seat({ seat, onClick }: SeatProps) {
    const disabled = seat.status !== "AVAILABLE";

    const background =
        seat.status === "CONFIRMED"
            ? "#9ca3af"
            : seat.status === "LOCKED"
              ? "#fde047"
              : "#4ade80";

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            style={{
                padding: 12,
                background,
                borderRadius: 6,
                cursor: disabled ? "not-allowed" : "pointer",
            }}
        >
            {seat.seatId}
        </Button>
    );
}
